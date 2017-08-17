## 数値 Integer, Float

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-ruby技術者認定試験の書籍写経メモ %})

2.3までは

```ruby
(10 ** 18).class #=> Fixnum # 固定長整数
(10 ** 24).class #=> Bignum # 可変長整数
```

だった

大きい数字は自動的にBignumになっていた

2.4からIntegerに統一された

```ruby
(10 ** 18).class #=> Integer
(10 ** 24).class #=> Integer
```

とりあえず適当にクラスツリー
```txt
Object
  Numeric
    Integer
      Fixnum
      Bignum
    Float
```
