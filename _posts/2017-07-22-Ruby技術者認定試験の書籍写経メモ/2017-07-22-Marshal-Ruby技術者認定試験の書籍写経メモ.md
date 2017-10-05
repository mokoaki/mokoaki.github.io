## Marshal

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-Ruby技術者認定試験の書籍写経メモ %})

- Rubyのオブジェクトを文字列化し、IOに書き出したり読み戻したりできる
- 文字列化したデータのことを「マーシャルデータ」と言ったりする
- 例えばRails等でセッション変数をクッキーやDBに登録する時に利用される
- 書き出せないクラスがあり、書き出すオブジェクトには一部制限がある

#### Marshal.dump メソッド

このメソッドで文字列化できない以下のようなオブジェクトが指定された時にはTypeErrorが発生する

- 名前の付いてないクラスやモジュール　ArgumentErrorが発生する
- システムがオブジェクトの状態を保持するようなIOクラス、Dirクラス、Fileクラスなど
- MatchDataクラス、Procクラス、Threadクラスのようなもの
- クラスメソッドを定義したオブジェクト・・・？特異メソッドには名前がついてないから無理、という事か？
- 上記オブジェクトを間接的に指定しているオブジェクト。たとえば初期値をブロックで指定したハッシュなど

```ruby
Marshal.dump({a: 1, b: 2})
=> "\x04\b{\a:\x06ai\x06:\x06bi\a"
```

2つめの引数にIOクラスとそのサブクラスのオブジェクトを指定するとそのオブジェクトに直接書き出す

```ruby
file = File.open('./temp.txt', 'w+') # 読み込み、上書き書き込みモード
=> #<File:./temp.txt>

Marshal.dump({a: 1, b: 2}, file)
=> #<File:./temp.txt>

file.close
=> nil
```

#### Marshal#loadメソッド

文字列化したデータからRubyのオブジェクトを復元する

```ruby
data = Marshal.dump({a: 1, b: [1, 2, 3]})
=> "\x04\b{\a:\x06ai\x06:\x06b[\bi\x06i\ai\b"

Marshal.load(data)
=> {:a=>1, :b=>[1, 2, 3]}
```

引数に文字列ではなくIOオブジェクトを指定するとそのオブジェクトから直接読み戻す

```ruby
file = File.open('./temp.txt', 'r') # 読み込み、上書き書き込みモード
=> #<File:./temp.txt>

Marshal.load(file)
=> {:a=>1, :b=>2}

file.close
=> nil
```
