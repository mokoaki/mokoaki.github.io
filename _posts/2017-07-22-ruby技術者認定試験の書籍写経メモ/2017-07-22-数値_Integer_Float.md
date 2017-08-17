## 数値 Numeric, Integer, Fixnum, Bignum, Float, Rational, Complex

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-ruby技術者認定試験の書籍写経メモ %})

### Fixnum と Bignum

2.3までは

```ruby
(10 ** 18).class #=> Fixnum # 固定長整数
(10 ** 24).class #=> Bignum # 可変長整数
```

と、なっていた。大きい数字は自動的にBignumになっていた

しかし2.4からIntegerに統一された

```ruby
(10 ** 18).class #=> Integer
(10 ** 24).class #=> Integer
```

### とりあえず適当にクラスツリー

2.1

```txt
Object
  Numeric
    Integer
      Fixnum
        Rational (この2つがFixnumの下にあるのは資料のミスかもしれない)
        Complex
      Bignum
    Float
```

2.4

```txt
Object
  Numeric
    Integer
    Float
    Rational
    Complex
```

### Numericクラス

- 数値を表す抽象クラス
- 他の数値クラスはみんなこのクラスを継承している
- 整数はInteger(Fixnum, Bignum)
- 1.9からComplex(複素数), Rational(有理数)を扱うクラスが組み込みクラスとなった
- 浮動小数点はFloat、計算過程で誤差が発生するので注意
- シフト演算やビット演算のように少数では処理できない演算はFloatクラスへは実装されていない(当然)

#### 数値の切り捨て、切り上げ

これは・・・暗記しろと言うんですか？

| ceil     | 自分以上の整数の内、最小のもの | プラスの方向の次の整数   |
| floor    | 自分以下の整数の内、最大のもの | マイナスの方向の次の整数 |
| round    | 自分に近い整数                 | 小数点以下を四捨五入     |
| truncate | 0に近い整数                    | ばっさり切り捨て         |

#### 数値の絶対値

```ruby
-5.abs
#=> 5
```

#### 数値を使った繰り返し、イテレータ

- step
- upto
- downto
- times
- 他にも

こんな感じになる

```ruby
1.5.step(10, 3.3) { |c| p c } => 1.5, 4.8, 8.1
3.times { |c| p c } => 0, 1, 2
4.upto(8) { |c| p c } => 4, 5, 6, 7, 8
```

### Integerクラス

#### べき乗

```ruby
2 ** 10
#=> 1024
```

#### 除算

整数同士の除算は戻り値も除算になる。事を忘れないように

```ruby
10 / 3
#=> 3

10 / 3.0
#=> 3.3333333333333335

10.0 / 3
#=> 3.3333333333333335
```

#### アスキーコードに対応する文字を取得

```ruby
67.chr
#=> "C"

299.chr
RangeError: 299 out of char range
```

#### 次の整数、前の整数

普通に考えれば使わないメソッドではあるが、関数型プログラミングとかで使うんじゃないかな

- 次の整数 next(succ) ※ successor == 後継者
- 前の整数 pred ※ predecessor == 前任者

```ruby
10.next
=> 11

10.succ
=> 11

10.pred
=> 9
```

#### 剰余

```ruby
10 % 3
#=> 1

10.modulo(3) # モジュロ、余剰演算
#=> 1

2.5 % 0.8
#=> 0.09999999999999987 # おお、誤差は出たけどFloatでもイケるんだね
```

#### ビット演算

| \| | 論理和 |
| &  | 論理積 |
| ^ | 排他的論理和 |
| ~ | 否定 |
| << | 左シフト |
| >> | 右シフト |
