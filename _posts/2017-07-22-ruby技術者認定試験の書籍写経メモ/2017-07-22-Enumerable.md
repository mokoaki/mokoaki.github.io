## Enumerable モジュール

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-ruby技術者認定試験の書籍写経メモ %})

### 何に使われているのか、何に使うのか

- ArrayクラスやHashクラスにincludeされているモジュール
- 多くの有用なメソッドをクラスに追加します。どのくらい追加されるかというと、下にメソッド一覧が載せましたが、それだけでもびっくりする程です
- 全てのメソッドがeachメソッドを元に定義されているため、eachメソッドさえ定義すれば後は勝手に多くのメソッドが使えるようになります
- これまで無意識に様々なメソッドを使ってきたが、実はEnumerable先生に大変お世話になっていた、という事

### 自作のクラスにeachメソッドだけ自力で実装する

```ruby
class Moko
  class << self
    def each
      1.upto(5) do |index|
        yield(index)
      end
    end
  end
end
```

こいつのeachは1から5までを引数にブロック評価するだけのつまらないものですが、テスト用なんで許して下さい

```ruby
Moko.each { |item| p item }
1
2
3
4
5
=> 1
```

もちろん他のメソッドは実装されてません

```ruby
Moko.map { |item| item }
=> NoMethodError: undefined method 'map'
```

### eachメソッドだけ自力で実装した自作のクラスに、Enumerableモジュールをincludeする

```ruby
class Moko
  class << self
    include Enumerable

    def each
      1.upto(5) do |index|
        yield(index)
      end
    end
  end
end
```

完了です。メソッドを確認してみると**何かいっぱいメソッドが増えてます**よ！ これみんな使えるようになりました

```ruby
Moko.methods
# =>
:all?
:any?
:chunk
:chunk_while
:collect
:collect_concat
:count
:cycle
:detect
:drop
:drop_while
:each_cons
:each_entry
:each_slice
:each_with_index
:each_with_object
:entries
:find
:find_all
:find_index
:first
:flat_map
:grep
:grep_v
:group_by
:include?
:inject
:lazy
:map
:max
:max_by
:member?
:min
:min_by
:minmax
:minmax_by
:none?
:one?
:partition
:reduce
:reject
:reverse_each
:select
:slice_after
:slice_before
:slice_when
:sort
:sort_by
:sum
:take
:take_while
:to_a
:to_h
:uniq
:zip
```

- 大事な事なのでもう一度言います
- eachメソッドを定義して
- Enumerableモジュールをincludeするだけで
- 多数の有用なメソッドが使えるようになります

### Enumerable#map Enumerable#collect メソッド

メソッドの評価結果の配列を新しく生成する

```ruby
Moko.map { |item| item }
=> [1, 2, 3, 4, 5]

Moko.collect { |item| item ** 2 }
=> [1, 4, 9, 16, 25]
```
