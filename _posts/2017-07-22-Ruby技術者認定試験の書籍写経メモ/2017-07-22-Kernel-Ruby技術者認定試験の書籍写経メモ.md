## Kernel

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-Ruby技術者認定試験の書籍写経メモ %})

### 何に使われているのか、何に使うのか

全てのクラスのスーパークラスである、Objectにインクルードされている為、全てのクラスでKernelモジュールのメソッドが使用できる

### Kernel#print, Kernel#puts, Kernel#p

どれも標準出力に表示するけど、ちょっとずつ違う

| print | 複数の引数を取る | 改行しない       | to_s    | 戻り値はnil        | 引数のオブジェクトを文字列にして標準出力に出力                 |
| puts  | 複数の引数を取る | 引数毎に改行する | to_s    | 戻り値はnil        | 引数のオブジェクトを文字列に変換し、改行を加えて標準出力に出力 |
| p     | 複数の引数を取る | 引数毎に改行する | inspect | 戻り値は引数の配列 | 引数のオブジェクトを分かりやすい文字列にして標準出力に出力する |

### Kernel#require, Kernel#require_relative, Kernel#load

- require
  - 何度実行しても一度しか実行しない
  - ファイルの拡張子などを補完する
  - 「ライブラリをインポートする為に使う」

- require_relative
  - 相対パスのrequire

- load
  - 呼び出されるなら何度でも実行する
  - ファイルの拡張子などを補完しない
  - 「コードを実行する為に使う」
  - 第2引数に true を指定すると無名モジュールに包んだ状態でコードを実行し、終了後は無名モジュールは破棄される。定数や名前空間を汚染させない

- ファイルの探し方
  - 絶対パス指定
    - そのまんま読みに行く
  - 相対パス指定
    - $LOAD_PATH を順番に検索する
    - RUBYLIB を順番に検索する

### 桁数とかフォーマット

- Kernel#sprintf
- Kernel#format
- String#%

3つとも同じ動作ぽいね、エイリアスなのかどうかぐぐってみたけどよくわからなかったよ

とりあえず format 使っとけって感じだよ

```ruby
sprintf('result: %#b', 16) #=> "result: 0b10000"
sprintf('result: %#o', 16) #=> "result: 020"
sprintf('result: %#x', 16) #=> "result: 0x10"
sprintf('result: %#X', 16) #=> "result: 0X10"
sprintf('result: %2d', 1)   #=> "result:  1"
sprintf('result: %2d', 10)  #=> "result: 10"
sprintf('result: %02d', 1)  #=> "result: 01"
sprintf('result: %02d', 10) #=> "result: 10"
sprintf('result: %5.2f', 12.5)   #=> "result: 12.50"
sprintf('result: %5.2f', 12.56)  #=> "result: 12.56"
sprintf('result: %5.2f', 12.567) #=> "result: 12.57" # 繰り上がっている

format('result: %#b', 16) #=> "result: 0b10000"
format('result: %#o', 16) #=> "result: 020"
format('result: %#x', 16) #=> "result: 0x10"
format('result: %#X', 16) #=> "result: 0X10"
format('result: %2d', 1)   #=> "result:  1"
format('result: %2d', 10)  #=> "result: 10"
format('result: %02d', 1)  #=> "result: 01"
format('result: %02d', 10) #=> "result: 10"
format('result: %5.2f', 12.5)   #=> "result: 12.50"
format('result: %5.2f', 12.56)  #=> "result: 12.56"
format('result: %5.2f', 12.567) #=> "result: 12.57" # 繰り上がっている

'result: %#b' % 16 #=> "result: 0b10000"
'result: %#o' % 16 #=> "result: 020"
'result: %#x' % 16 #=> "result: 0x10"
'result: %#X' % 16 #=> "result: 0X10"
'result: %2d' % 1   #=> "result:  1"
'result: %2d' % 10  #=> "result: 10"
'result: %02d' % 1  #=> "result: 01"
'result: %02d' % 10 #=> "result: 10"
'result: %5.2f' % 12.5   #=> "result: 12.50"
'result: %5.2f' % 12.56  #=> "result: 12.56"
'result: %5.2f' % 12.567 #=> "result: 12.57" # 繰り上がっている
```

ちなみに文字列でもイケる

```ruby
sprintf('result: %5.2f', '12.567') #=> "result: 12.57"
format('result: %5.2f', '12.567')  #=> "result: 12.57"
'result: %5.2f' % '12.567'         #=> "result: 12.57"
```

### Kernelのprivateメソッド、publicメソッド

- Kernel#print みたいなレシーバがない、ないのが構文として正当な感じがするでしょ的なメソッドはprivateメソッドになっていて
- Kernel#to_s みたいなレシーバがある、ていうか無いと困るよね的なメソッドはpublicメソッドになっている

```ruby
Kernel.public_instance_methods(false).grep(/\A(p|print|puts|to_s)\z/)
=> [:to_s]

Kernel.private_instance_methods(false).grep(/\A(p|print|puts|to_s)\z/)
=> [:print, :puts, :p]

Kernel.protected_instance_methods(false)
=> []
```

- つまり、Kernel 配下のメソッドは全てのオブジェクトのメソッドであるが
- :print, :puts, :p とかのメソッドはprivateメソッドなので秘匿されている（その方がエエやろ的な感じで）

無理やり呼び出すと普通に実行される

```ruby
1.send(:p, 'aaa')
"aaa"
=> "aaa"

''.send(:print, "aaa\nbbb\n")
aaa
bbb
=> nil
```
