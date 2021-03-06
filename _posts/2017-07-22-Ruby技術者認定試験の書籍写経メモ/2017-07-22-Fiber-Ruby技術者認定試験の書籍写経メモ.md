## Fiber ファイバ

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-Ruby技術者認定試験の書籍写経メモ %})

- 1.9で追加された
- 別言語ではコルーチン・セミコルーチンと呼ばれる軽量スレッドを提供する
- 明示的に指定しない限りコンテキストが切り替わらない
- 並列処理の切り替えを指定できる、指定しなければならない
- Fiber.yield で親スレッドに返り値と処理を返して止まって待つ。 親スレッドから#resumeメソッドで動け！と指定してあげる
- 非常に奥が深い。基本的な動作が分かってればおｋ

```ruby
f = Fiber.new do
  Fiber.yield('result 1') # この行により、元のスレッドに処理が移る 戻り値はresult1
  Fiber.yield('result 2') # この行により、元のスレッドに処理が移る 戻り値はresult2
  nil
end

# この時点で、ファイバは実行されていない

f.resume
=> "result 1"

f.resume
=> "result 2"

f.resume
=> nil # ファイバ終わった！

f.resume
FiberError: dead fiber called
```

呼び出す頻度を偏らせてみる

```ruby
fiber1 = Fiber.new do
  (1..3).each do |index|
    Fiber.yield("fiber1 (#{index})") # この行により、元のスレッドに処理が移る 戻り値はi
  end

  nil
end

fiber2 = Fiber.new do
  (1..6).each do |index|
    Fiber.yield("fiber2 (#{index})") # この行により、元のスレッドに処理が移る 戻り値はi
  end

  nil
end

fiber1.resume
=> "fiber1 (1)"
fiber2.resume
=> "fiber2 (1)"
fiber2.resume
=> "fiber2 (2)"
fiber1.resume
=> "fiber1 (2)"
fiber2.resume
=> "fiber2 (3)"
fiber2.resume
=> "fiber2 (4)"
fiber1.resume
=> "fiber1 (3)"
fiber2.resume
=> "fiber2 (5)"
fiber2.resume
=> "fiber2 (6)"

fiber1.resume
=> nil
fiber2.resume
=> nil

fiber1.resume
=> FiberError: dead fiber called
fiber2.resume
=> FiberError: dead fiber called
```
