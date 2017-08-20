## Enumerable モジュール

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-ruby技術者認定試験の書籍写経メモ %})

### 何に使われているのか、何に使うのか

- ArrayクラスやHashクラスにincludeされているモジュール
- 多くの有用なメソッドをクラスに追加します。どのくらい追加されるかというと、下の方に代表的なメソッドが載っていますが、それだけでもびっくりする程です
- 全てのメソッドがeachメソッドを元に定義されているため、eachメソッドさえ定義すれば後は勝手に多くのメソッドが使えるようになります
- これまで無意識に様々なメソッドを使ってきたが、実はEnumerable先生に大変お世話になっていた、という事

### 自作のクラスにeachメソッドだけ自力で実装する

```ruby
class Moko
  def each
    1.upto(5) do |i|
      yield(i)
    end
  end
end
```

こいつのeachはブロックに1から5までを引数に評価するだけのつまらないものですが、テスト用なんで許して下さい

```ruby
Moko.new.each { |item| p item }
1
2
3
4
5
=> 1
```

もちろん他のメソッドは実装されてません

```ruby
Moko.new.map { |item| item }
=> NoMethodError: undefined method 'map'
```

### 自作のクラスにeachメソッドだけ自力で実装し、Enumerableモジュールをincludeする

```ruby
class Moko
  include Enumerable

  def each
    1.upto(5) do |i|
      yield(i)
    end
  end
end
```

完了です。メソッドを確認してみると**何かいっぱいメソッドが増えてます**よ！ これみんな使えるようになりました

```ruby
[:max, :min, :to_a, :to_h, :include?, :find, :entries, :sort, :sort_by, :grep, :grep_v, :count, :detect, :find_index, :find_all, :select, :reject, :collect, :map, :flat_map, :collect_concat, :inject, :reduce, :partition, :group_by, :first, :all?, :any?, :one?, :none?, :minmax, :min_by, :max_by, :minmax_by, :member?, :each_with_index, :reverse_each, :each_entry, :each_slice, :each_cons, :each_with_object, :zip, :take, :take_while, :drop, :drop_while, :cycle, :chunk, :slice_before, :slice_after, :slice_when, :chunk_while, :sum, :uniq, :lazy]
```

- 大事な事なのでもう一度言います
- eachメソッドを定義して
- Enumerableモジュールをincludeするだけで
- 多数の有用なメソッドが使えるようになります

### Enumerable#map Enumerable#collect メソッド

メソッドの評価結果の配列を新しく生成する

```ruby
Moko.new.map { |item| item }
=> [1, 2, 3, 4, 5]

Moko.new.collect { |item| item ** 2 }
=> [1, 4, 9, 16, 25]
```
