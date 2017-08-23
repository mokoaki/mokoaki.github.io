## Comparable

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-ruby技術者認定試験の書籍写経メモ %})

### 何に使われているのか、何に使うのか

- Integerクラス等にincludeされているモジュール
- Enumerableに比べれば地味ですけど比較用のメソッドを定義してくれる
- 全てのメソッドが<=>メソッドを元に定義されているため、<=>メソッドさえ定義すれば比較用メソッドが使えるようになります

### 自作のクラスに <=> メソッドだけ自力で実装する

```ruby
class Moko
  attr_reader :id

  def initialize(id)
    @id = id
  end

  def <=>(other)
    id <=> other.id
  end
end
```

こいつの<=>はつまらないものですが、テスト用なんで許して下さい

```ruby
Moko.new(5) <=> Moko.new(4)
=> 1

Moko.new(5) <=> Moko.new(5)
=> 0

Moko.new(5) <=> Moko.new(6)
=> -1
```

もちろん他のメソッドは実装してないから使えません

```ruby
Moko.new(5) < Moko.new(4)
NoMethodError: undefined method '<'
```

### <=>メソッドだけ自力で実装した自作のクラスに、Comparableモジュールをincludeする

```ruby
class Moko
  include Comparable
  attr_reader :id

  def initialize(id)
    @id = id
  end

  def <=>(other)
    id <=> other.id
  end
end
```

完了です。メソッドを確認してみると何かメソッドが増えてます　微妙に増えてます

```ruby
Moko.methods
:<
:>
:<=
:>=
:between?
:clamp
```

# ぱぱっと説明しちゃいます

```ruby
Moko.new(3) < Moko.new(6)
=> true

Moko.new(3) > Moko.new(6)
=> false

Moko.new(3) <= Moko.new(6)
=> true

Moko.new(3) >= Moko.new(6)
=> false
```

数値もComparableをインクルードしているので同様な処理が可能である・・まぁ今まで意識せずに使ってきたんだけど

```ruby
6 < 3
=> false

6 > 3
=> true

6 <= 3
=> false

6 >= 3
=> true

6 >= 6
=> true

6 <= 6
=> true
```

#### Comparable#between?

引数で指定した下限、上限の範囲内であればtrueを返す

```ruby
Moko.new(3).between?(Moko.new(2), Moko.new(5))
=> true
```

```ruby
1.between?(2, 5)
=> false

3.between?(2, 5)
=> true

7.between?(2, 5)
=> false
```

#### Comparable#clamp

- 2.4で追加された
- 範囲内であればレシーバを返す
- 下限を超えていれば下限の値を返す
- 上限を超えていれば上限の値を返す
- 引数の順番は下限、上限の順番

```ruby
Moko.new(1).clamp(Moko.new(2), Moko.new(5))
=> #<Moko:0x007fd166836640 @id=2>

Moko.new(3).clamp(Moko.new(2), Moko.new(5))
=> #<Moko:0x007fd1669c6de8 @id=3>

Moko.new(7).clamp(Moko.new(2), Moko.new(5))
=> #<Moko:0x007fd167842660 @id=5>
```

```ruby
15.clamp(20, 30)
=> 20

25.clamp(20, 30)
=> 25

35.clamp(20, 30)
=> 30
```
