## Thread スレッド

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-Ruby技術者認定試験の書籍写経メモ %})

- Procとも関連が強い
- マルチスレッドとかいうアレです
- 1.9からネイティブスレッドを用いて実装されている
- 現在の実装では Giant VM Lock を有しているため、同時に実行されるネイティブスレッドは常に1つ
- プログラムの実行と同時に生成されるスレッドをメインスレッドと呼ぶ。このメインスレッドが終了する時には他のスレッドも含め終了する
- スレッドの実行はスケジューリングされており、優先順位付きのラウンドロビン・スケジューリングという方式
- 現在実行中のスレッドをカレントスレッドと呼ぶ
- 非常に奥が深い。基本的な動作が分かってればおｋ

### スレッドの生成

#### Thread.new

- Thread.new にブロックを渡すとThreadクラスのオブジェクトでもあるスレッドが生成される
- 引数も渡せる

```ruby
Thread.new { sleep 1 }
=> #<Thread:0x007ff7860df748>

Thread.new(3) { |num| sleep num }
=> #<Thread:0x007ff7860d5748>
```

#### Thread.start Thread.fork

- 基本的に Thread.new と同じだが、Threadクラスを継承したサブクラスを開始する時に
  - new メソッドだとサブクラスのinitializeが呼ばれる
  - start fork メソッドだとサブクラスのinitializeが呼ばれない

```ruby
class TestThread < Thread
  def initialize
    p 'I am TestThread#initialize'
    super # 必須
  end
end

TestThread.new { p 'I am TestThread.new' }
"I am TestThread#initialize"
"I am TestThread.new"
=> #<TestThread:0x007ff785977258>

TestThread.fork { p 'I am TestThread.fork' }
"I am TestThread.fork"
=> #<TestThread:0x007ff7858242e8>
```

### スレッドの状態

#### Thread#status

| run      | 実行中、実行可能 | 生成直後や、runメソッド、wakeupメソッドで起こされたスレッドはこの状態になる |
| sleep    | 一時停止中       | stopメソッドやjoinメソッドにより一時停止されたスレッドはこの状態になる      |
| sborting | 終了処理中       | killメソッドなどで終了されるスレッドは一時的にこの状態になる                |
| false    |                  | killメソッドで終了したり、正常終了したスレッドはfalseを返す                 |
| nil      |                  | 例外などで異常終了したスレッドはnilを返す                                   |

```ruby
t = Thread.new do
  sleep 1
  p "I am #{t.status}"
  #=> "I am run"
end

t.status
#=> "sleep"

sleep 2

t.status
#=> false
```

- ちなみに、スレッド中でsleepしている間は一時停止状態、statusは"sleep" らしい
- これは、別のスレッドから "run" を観測するのは無理って事なんじゃないかと思ったけどどうなんでしょう？

```ruby
t = Thread.new do
  sleep 1
end

t.status
=> "sleep"
```

#### Thread#alive?

スレッドが生きているかどうか

```ruby
t = Thread.new do
  sleep 1
end

t.alive?
#=> true

sleep 2

t.alive?
#=> false
```

#### Thread#stop?

スレッドが終了しくは一時停止状態かどうか

```ruby
t = Thread.new do
  sleep 1
  p "I am stop? => #{t.stop?}"
  #=> "I am stop? => false"
end

t.stop?
#=> true

sleep 2

t.stop?
#=> true
```

### スレッドの一時停止

#### Thread.stop

生成したスレッドは実行中となり、その内部で Thread.stopを使うか、thread#joinメソッドにより他のスレッドを待っている場合に一時停止状態となる

```ruby
t = Thread.new do
  Thread.stop
  p 'I am wakeup!'
end
=> #<Thread:0x007fa1759bc198>

t.status
=> "sleep"
```

### スレッドの再開

#### thread#run thread#wakeup

- スレッドを再開するには run wakeupメソッドを使う
- run メソッドは具に再開する
- wakeup メソッドは実行待ち状態にする

```ruby
t = Thread.new do
  Thread.stop
  p 'I am wakeup!'
end

t.status
#=> "sleep"

p t.run
#=> "I am wakeup!"

t.status
#=> false
```

#### スレッドの終了

スレッドを終了するには以下のメソッドを使う

| kill        | exit  |                                          |
| kill!       | exit! | 次節で説明する、ensure節を実行しない     |
| Thread.kill |       | 指定したスレッドのexitメソッドを呼び出す |
| Thread.exit |       | カレントスレッドのexitメソッドを呼び出す |

```ruby
t = Thread.new do
  Thread.stop
  p 'I am wakeup!'
end

t.status
=> "sleep"

t.kill
=> #<Thread:0x007fb32c81a8d0 sleep_forever>

t.status
=> false
```

```ruby
t = Thread.new do
  Thread.stop
  p 'I am wakeup!'
end

t.status
=> "sleep"

Thread.kill(t)
=> #<Thread:0x007fb32b8db428 sleep_forever>

t.status
=> false
```

```ruby
t = Thread.new do
  Thread.exit
  p 'I am wakeup!'
end

t.status
=> false
```

### スレッド終了時のensure節

- スレッド生成時にensure説がある場合、スレッドが終了する時に実行される
- 正常終了だけでなく、他のスレッドからkillされた時にも実行される
- でもkill!メソッドで終了された時には実行されない
- メインスレッドのみ、kill!されてもensure節を実行する

```ruby
t = Thread.new do
  begin
    Thread.stop
    p 'I am wakeup!'
  ensure
    p 'I am dead'
  end
end

t.status
=> false

t.kill(t)
=> #<Thread:0x007fc7558aed18@(irb):20 sleep_forever>
"I am dead"

t.status
=> false
```

### スレッド中の例外

- スレッドの中で例外が発生した時、その例外をrescueで捕捉しなかった場合、そのスレッドは警告無しで終了される
- 例外が無視されたスレッドを [#join](#スレッドの終了を待つ) メソッドにて待っているスレッドがある場合は、そのスレッドにて同じ例外が発生する

例外を補足しなければ、何の警告も出さないで終了する（してしまう）

```ruby
Thread.new { raise StandardError }
=> #<Thread:0x007fc755a2fc50@(irb):41 run>
```

メインスレッドからjoinメソッドでthread1の終了を待っていたら、thread1にて例外StandardErrorが発生、メインスレッドのrescueにて補足された例

```ruby
thread1 = Thread.new do
  sleep 1
  raise StandardError
end

begin
  thread1.join
rescue StandardError => ex
  p "I am #{ex}"
end
=> "I am  StandardError"
```

#### スレッドの中で例外が発生した場合、プログラム自体を終了させるには

- Thread.abort_on_exceptionにtrueを設定
- 特定のスレッドのabort_on_exceptionにtrueを設定
- グローバル変数 $DEBUGをtrueにし、プログラムを -d オプション付きで実行する

この例はirbでは実行できないっす

```ruby
p Thread.abort_on_exception
#=> false

Thread.new do
  raise StandardError
end

sleep 1

p 'I am alive!'
#=> 'I am alive!'
```

```ruby
p Thread.abort_on_exception
#=> false

Thread.abort_on_exception = true
#=> true

Thread.new do
  raise StandardError
end

sleep 1

p 'I am alive!'
=> in 'block in <main>': StandardError (StandardError)
```

```ruby
t = Thread.new do
  raise StandardError
end

p t.abort_on_exception

t.abort_on_exception = true

sleep 1

p 'I am alive!'
=> in 'block in <main>': StandardError (StandardError)
```

#### スレッド内で例外を発生させる

#### thread#raise

そのまんま

```ruby
t = Thread.new do
  begin
    sleep 1
  rescue StandardError => ex
    p "I am #{ex}"
  end
end

t.raise StandardError
=> "I am StandardError"
```

### スレッドのリスト

最初はメインスレッドだけが存在している

#### Thread.list

```ruby
Thread.list
=> [#<Thread:0x007ff36387f128 run>]

Thread.new { Thread.stop }

Thread.list
=> [#<Thread:0x007ff36387f128 run>, #<Thread:0x007ff36489e9a0 sleep_forever>]
```

#### メインスレッドとカレントスレッドの取得

```ruby
Thread.main
=> #<Thread:0x007f934907f128 run>

Thread.new do
  p Thread.current
end
=> #<Thread:0x007f934a806648 run>

Thread.current
=> #<Thread:0x007f934907f128 run>

Thread.list
=> [#<Thread:0x007f934907f128 run>, #<Thread:0x007f93499c6d08 sleep_forever>]
```

### スレッドのデッドロック

- スレッドが複数ある
- 全てのスレッドが停止状態
- IO待ちのスレッドは存在しない

場合に、デッドロックとみなされfatalが発生、プログラムが終了する

```ruby
Thread.list
=> [#<Thread:0x007ff36387f128 run>]

Thread.new { Thread.stop }

Thread.list
=> [#<Thread:0x007ff36387f128 run>, #<Thread:0x007ff36489e9a0 sleep_forever>]

Thread.stop
=> fatal: No live threads left. Deadlock?
=> 2 threads, 2 sleeps current:0x007f9348c06500 main thread:0x007f9348c06500
```

### 他のスレッドに実行権を渡す

#### Thread.pass

どう使うんだ・・こんな感じでいいのか・・・？

```ruby
Thread.new do
  (1..10).each do |index|
    sleep rand / 10
    Thread.pass
    p "I am thread1 (#{index})"
  end
end

Thread.new do
  (1..10).each do |index|
    sleep rand / 10
    Thread.pass
    p "I am thread2 (#{index})"
  end
end

=>
"I am thread2 (1)"
"I am thread1 (2)"
"I am thread2 (2)"
"I am thread1 (3)"
"I am thread1 (4)"
"I am thread1 (5)"
"I am thread2 (3)"
"I am thread1 (6)"
"I am thread1 (7)"
"I am thread2 (4)"
"I am thread1 (8)"
"I am thread1 (9)"
"I am thread2 (5)"
"I am thread2 (6)"
"I am thread1 (10)"
"I am thread2 (7)"
"I am thread2 (8)"
"I am thread2 (9)"
"I am thread2 (10)"
```

### スレッドの終了を待つ

#### thread#join

指定したスレッドの実行終了までカレントスレッドを停止する事ができる

```ruby
t = Thread.new do
  p 'thread start'
  sleep 1
  p 'thread end'
end

t.join

p 'wait'

#=> "thread start"
#=> "thread end"
#=> "wait"
```

#### thread#value

指定したスレッドの終了までカレントスレッドを停止し、スレッドのブロックの戻り値を返す

```ruby
threads = []

threads << Thread.new do
  sleep rand
  'thread1'
end

threads << Thread.new do
  sleep rand
  'thread2'
end

threads.each do |thread|
  p thread.value
end
"thread1"
"thread2"
```

### スレッドの優先度

#### thread#priority

- デフォルトは０
- 数字が大きいほど優先度が高い
- 子スレッドは親スレッドの値を引き継ぐ

```ruby

thread1 = Thread.new do
  Thread.stop
  sleep 1
  p 'thread1'
end

thread2 = Thread.new do
  Thread.stop
  sleep 1
  p 'thread2'
end

thread3 = Thread.new do
  Thread.stop
  sleep 1
  p 'thread3'
end

thread1.priority = 1
thread2.priority = 3
thread3.priority = 2

thread1.wakeup
thread2.wakeup
thread3.wakeup

#=>
"thread1"
"thread3"
"thread2"
```

### スレッド固有のデータ

#### thread#[] thread#key? thread#keys

使い所がよくわからないけど、ハッシュみたいなアクセスができる

```ruby
t = Thread.new {}
=> #<Thread:0x007feaf40d7d70@(irb):262 run>

t.keys
=> []

t.key?(:hage)
=> false

t[:hage]
=> nil

t[:hage] = true
=> true

t.key?(:hage)
=> true

t.keys
=> [:hage]

t[:hage]
=> true
```
