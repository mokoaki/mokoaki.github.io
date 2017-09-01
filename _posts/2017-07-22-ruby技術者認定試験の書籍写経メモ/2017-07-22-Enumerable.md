## Enumerable モジュール

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-ruby技術者認定試験の書籍写経メモ %})

### 何に使われているのか、何に使うのか

- ArrayクラスやHashクラスにincludeされているモジュール
- 多くの有用なメソッドをクラスに追加します。どのくらい追加されるかというと、下にメソッド一覧がありますが、それだけでもびっくりする程です
- 全てのメソッドがeachメソッドを元に定義されているため、eachメソッドさえ定義すれば後は勝手に多くのメソッドが使えるようになります
- これまで無意識に様々なメソッドを使ってきたが、実はEnumerable先生に大変お世話になっていた、という事

### 自作のクラスにeachメソッドだけ自力で実装する

めんどくさいんでクラスメソッドでいきます

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

もちろん他のメソッドは実装してないから使えません

```ruby
Moko.map { |item| item }
=> NoMethodError: undefined method 'map'
```

```ruby
Moko.methods
=> [:each, :new, :allocate, ...]
# 何か色々ありますけどね、Objectクラス周辺から継承した、オブジェクトとして生きていく為の基本的なメソッド達が
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
- いつも使ってるあのメソッドが使えるようになります

### Enumerable#map Enumerable#collect

メソッドの評価結果の配列を新しく生成する

```ruby
Moko.map { |item| item }
=> [1, 2, 3, 4, 5]

Moko.collect { |item| item ** 2 }
=> [1, 4, 9, 16, 25]
```

配列もEnumerableをインクルードしているので同様な処理が可能である

```ruby
[10, 20, 30, 40, 50].map { |item| item + 1 }
=> [11, 21, 31, 41, 51]
```

### Enumerable#to_a Enumerable#entries

レシーバの各要素を集めて配列で返す

```ruby
Moko.to_a
=> [1, 2, 3, 4, 5]

Moko.entries
=> [1, 2, 3, 4, 5]
```

ちなみに Array#to_a はselfを返す Array#entries は新たな配列を返す

```ruby
a = [1, 2, 3, 4, 5]

a.object_id
=> 70287686268180

a.to_a
=> [1, 2, 3, 4, 5]

a.entries
=> [1, 2, 3, 4, 5]

a.to_a.object_id
=> 70287686268180

a.entries.object_id
=> 70287686231180
```

### Enumerable#each_with_index

要素と0から始まるインデックスをブロックに渡して評価する

```ruby
Moko.each_with_index { |item, index| p "#{item} - #{index}" }
"1 - 0"
"2 - 1"
"3 - 2"
"4 - 3"
"5 - 4"
=> Moko
```

```ruby
[10, 20, 30, 40, 50].each_with_index { |item, index| p ({item => index}) }
{10=>0}
{20=>1}
{30=>2}
{40=>3}
{50=>4}
=> [10, 20, 30, 40, 50]
```

### Enumerable#inject Enumerable#reduce

与えた初期値と要素をブロックで連続評価して最終的な値を返す

```ruby
Moko.inject(0) do |result, item|
  p "{ result: #{result}, item: #{item} }"
  result += item
end
"{ result: 0,  item: 1 }"
"{ result: 1,  item: 2 }"
"{ result: 3,  item: 3 }"
"{ result: 6,  item: 4 }"
"{ result: 10, item: 5 }"
=> 15
```

初期値を与えなければ、第1引数と第2引数に要素の1番目と2番目が入り、初回の評価を飛ばす

```ruby
Moko.reduce do |result, item|
  p "{ result: #{result}, item: #{item} }"
  result += item
end
"{ result: 1,  item: 2 }"
"{ result: 3,  item: 3 }"
"{ result: 6,  item: 4 }"
"{ result: 10, item: 5 }"
=> 15
```

```ruby
[10, 20, 30, 40, 50].reduce do |result, item|
  p "{ result: #{result}, item: #{item} }"
  result += item
end
"{ result: 10, item: 20 }"
"{ result: 30, item: 30 }"
"{ result: 60, item: 40 }"
"{ result: 100, item: 50 }"
=> 150
```

### Enumerable#each_cons

要素を引数の数の長さの配列で1つずつずらしながらブロックで評価します

```ruby
Moko.each_cons(3) { |items| p items }
[1, 2, 3]
[2, 3, 4]
[3, 4, 5]
=> nil
```

```ruby
[10, 20, 30, 40, 50].each_cons(3) { |items| p items }
[10, 20, 30]
[20, 30, 40]
[30, 40, 50]
=> nil
```

### Enumerable#each_slice

要素を引数の長さの配列に分けてブロックで評価します

```ruby
Moko.each_slice(2) { |items| p items }
[1, 2]
[3, 4]
[5]
=> nil
```

```ruby
[10, 20, 30, 40, 50].each_slice(2) { |items| p items }
[10, 20]
[30, 40]
[50]
=> nil
```

### Enumerable#reverse_each

要素を引数の長さの配列に分けてブロックで評価します

```ruby
Moko.reverse_each { |items| p items }
5
4
3
2
1
=> Moko
```

```ruby
[10, 20, 30, 40, 50].reverse_each { |items| p items }
50
40
30
20
10
=> [10, 20, 30, 40, 50]
```

### Enumerable#all?

全ての要素が真値であればtrueを返す

```ruby
Moko.all?
=> true
```

```ruby
[10, 20, nil, 40, 50].all?
=> false
```

ブロックを渡すと評価の結果が全て真値であればtrueを返す

```ruby
Moko.all? { |item| item.even? }
=> false
```

```ruby
[10, 20, 30, 40, 50].all? { |item| item.even? }
=> true
```

### Enumerable#any?

- 要素が1つでも真値であればtrueを返す
- 真値であると判断された以降の要素は評価されない

```ruby
Moko.any?
=> true
```

```ruby
[10, 20, nil, 40, 50].any?
=> false
```

ブロックを渡すと評価の結果が1つでも真値であればtrueを返す

```ruby
Moko.any? { |item| item.even? }
=> true
```

nil.even? はエラーになるはずだが、 10.even? が真値になった時点でその後の評価は行われないためエラーにはならない

```ruby
[10, nil, 30, 40, 50].any? { |item| item.even? }
=> true
```

### Enumerable#none?

- 要素が1つでも真値であればfalseを返す
- 真値であると判断された以降の要素は評価されない

```ruby
Moko.none?
=> false
```

```ruby
[nil, false].none?
=> true
```

ブロックを渡すと評価の結果が1つでも真値であればfalseを返す

```ruby
Moko.none? { |item| item.even? }
=> false
```

nil.even? はエラーになるはずだが、 19.even? が偽値になった時点でその後の評価は行われないためエラーにはならない

```ruby
[10, 19, nil, 40, 50].none? { |item| item.even? }
=> false
```

### Enumerable#one?

- 要素が1つだけ真値であればtrueを返す
- 真値が2つ以上あると判断された以降の要素は評価されない

```ruby
Moko.one?
=> false
```

```ruby
[nil, false].one?
=> true
```

ブロックを渡すと評価の結果が1つだけ真値であればfalseを返す

```ruby
Moko.one? { |item| item.even? }
=> false
```

nil.even? はエラーになるはずだが、20.even? で2つ目の真値になった時点でその後の評価は行われないためエラーにはならない

```ruby
[10, 20, nil, 40, 50].one? { |item| item.even? }
=> false
```

### Enumerable#member? Enumerable#include?

== メソッドで同値と判断された要素が存在する場合trueを返す

```ruby
Moko.member?(5)
=> true
```

```ruby
[10, 20, 30, 40].include?(50)
=> false
```

### Enumerable#find Enumerable#detect

- ブロックを評価し最初に真値と評価された要素を返す
- 探偵は犯人を見つけだすんです！

```ruby
Moko.find do |item|
  item.even?
end
=> 2
```

nil.even? はエラーになるはずだが、 10.even? で真値になった時点でその後の評価は行われないためエラーにはならない

```ruby
[10, nil, 30, 40].detect do |item|
  item.even?
end
=> 10
```

### Enumerable#find_all Enumerable#select

ブロックを評価し真値と評価された要素の配列を返す

```ruby
Moko.find_all do |item|
  item.even?
end
=> [2, 4]
```

```ruby
[10, 19, 30, 40].select do |item|
  item.even?
end
=> [10, 30, 40]
```

### Enumerable#reject

ブロックを評価し偽値と評価された要素の配列を返す

```ruby
Moko.reject do |item|
  item.even?
end
=> [1, 3, 5]
```

```ruby
[10, 19, 30, 40].reject do |item|
  item.even?
end
=> [19]
```

### Enumerable#grep

ブロックを評価しパターンマッチする(引数.===(要素)メソッドの結果が真値)要素の配列を返す

```ruby
Moko.grep(1..3)
=> [1, 2, 3]
```

```ruby
['a', '20', '3c', '40', 50].grep(/\d/)
=> ["20", "3c", "40"]
```

### Enumerable#sort

- 要素を <=> 比較して昇順に並び替えた配列を返す
- 全ての要素が <=> メソッドに対応している必要がある
- たぶん安全なソートです

```ruby
Moko.sort
=> [1, 2, 3, 4, 5]
```

```ruby
[20, 40, 50, 10, 30].sort
=> [10, 20, 30, 40, 50]
```

ブロックを渡すとブロックが引数を2つ取り、評価の結果(1, 0, -1)にて並び替えた要素の配列を返す

```ruby
Moko.sort do |a, b|
  (a % 2) <=> (b % 2)
end
=> [2, 4, 1, 3, 5]
```

```ruby
['aa', 'aaaa', 'aaaaa', 'a', 'aaa'].sort do |a, b|
  a.length <=> b.length
end
=> ["a", "aa", "aaa", "aaaa", "aaaaa"]
```

### Enumerable#sort_by

- 要素をブロックにて評価した結果を <=> 比較して昇順に並び替えた要素の配列を返す
- 要素をブロックにて評価した結果全てが <=> メソッドに対応している必要がある
- たぶん安全なソートです

```ruby
Moko.sort_by do |item|
  item % 2
end
=> [2, 4, 1, 3, 5]
```

```ruby
[{id: 20}, {id: 40}, {id: 50}, {id: 10}, {id: 30}].sort_by do |item|
  item[:id]
end
=> [{:id=>10}, {:id=>20}, {:id=>30}, {:id=>40}, {:id=>50}]
```

### Enumerable#max Enumerable#min

- 要素を <=> 比較して最大値、最小値を返す
- 全ての要素が <=> メソッドに対応している必要がある

```ruby
Moko.max
=> 5
```

```ruby
[20, 40, 50, 10, 30].min
=> 10
```

ブロックを渡すとブロックが引数を2つ取り、評価の結果(1, 0, -1)にて比較した最大値、最小値の要素を返す

```ruby
Moko.max do |a, b|
  (10 % a) <=> (10 % b)
end
=> 4
```

```ruby
['aa', 'aaaa', 'aaaaa', 'a', 'aaa'].min do |a, b|
  a.length <=> b.length
end
=> "a"
```

### Enumerable#max_by Enumerable#min_by

- 要素をブロックにて評価した結果を <=> 比較した最大値、最小値の要素を返す
- 要素をブロックにて評価した結果全てが <=> メソッドに対応している必要がある
- たぶん安全なソートです

```ruby
Moko.max_by do |item|
  10 % item
end
=> 4
```

```ruby
[{id: 20}, {id: 40}, {id: 50}, {id: 10}, {id: 30}].min_by do |item|
  item[:id]
end
=> {:id=>10}
```

### Enumerable#count

- 要素の数を返す

```ruby
Moko.count
=> 5
```

```ruby
[{id: 20}, {id: 40}, {id: 50}, {id: 10}, {id: 30}].count
=> 5
```

### Enumerable#first Enumerable#last

- 引数に指定した数値の長さの配列を要素の先頭、末尾から返す
- 引数を省略すると先頭、末尾の要素を返す

```ruby
Moko.first
=> 1
```

```ruby
[{id: 20}, {id: 40}, {id: 50}, {id: 10}, {id: 30}].last(2)
=> [{:id=>10}, {:id=>30}]

[{id: 20}, {id: 40}, {id: 50}, {id: 10}, {id: 30}].last
=> {:id=>30}
```

### Enumerable#take

- 引数に指定した数値の長さの配列を要素の先頭から返す
- 引数は省略できない
- ぶっちゃけ使わない

```ruby
Moko.take(3)
=> [1, 2, 3]
```

```ruby
[{id: 10}, {id: 20}, {id: 30}, {id: 40}, {id: 50}].take(3)
=> [{:id=>10}, {:id=>20}, {:id=>30}]
```

### Enumerable#drop

- 引数に指定した数値の長さの配列を要素の先頭から取り除いた配列を返す
- 引数は省略できない

```ruby
Moko.drop(3)
=> [4, 5]
```

```ruby
[{id: 10}, {id: 20}, {id: 30}, {id: 40}, {id: 50}].drop(3)
=> [{:id=>40}, {:id=>50}]
```

### Enumerable#cycle

- 引数に指定した数値の数だけ先頭にループしてブロックを評価する
- 引数を省略すると無限ループ

```ruby
Moko.cycle(2) { |item| p item }
1
2
3
4
5
1
2
3
4
5
=> nil
```

```ruby
[{id: 20}, {id: 40}].cycle { |item| p item }
{:id=>20}
{:id=>40}
{:id=>20}
{:id=>40}
{:id=>20}
{:id=>40}
#............無限ループ
```

### Enumerable#group_by

要素をブロックにて評価した結果をキーにした、同じキーを持つ要素を配列としたハッシュを返す

```ruby
Moko.group_by do |item|
  5 % item
end
=> {0=>[1, 5], 1=>[2, 4], 2=>[3]}
```

```ruby
[{id: 10}, {id: 20}, {id: 10}, {id: 20}, {id: 30}].group_by do |item|
  item[:id]
end
=> {10=>[{:id=>10}, {:id=>10}], 20=>[{:id=>20}, {:id=>20}], 30=>[{:id=>30}]}
```

### Enumerable#zip

- 自分自身と引数の配列から1つずつ取り出して配列を作り、それを要素とした配列を返す
- 引数は複数与えられる
- 自分自身の長さと同じの長さの配列になる

```ruby
Moko.zip(['a', 'b', 'c', 'd', 'e'])
=> [[1, "a"], [2, "b"], [3, "c"], [4, "d"], [5, "e"]]
```

```ruby
[10, 20, 30, 40, 50].zip([:a, :b, :c, :d], [:A, :B, :C, :D, :E, :F])
=> [[10, :a, :A], [20, :b, :B], [30, :c, :C], [40, :d, :D], [50, nil, :E]]
```

### Enumerable#take_while

要素をブロックにて評価した結果が偽値になった時点でループを終了し、それまでの要素の配列を返す

```ruby
Moko.take_while do |item|
  item < 4
end
=> [1, 2, 3]
```

```ruby
[1, 1, 1, 2, 2, 2].take_while do |item|
  item == 1
end
=> [1, 1, 1]

[{id: 2}, {id: 4}, {id: 6}, {id: 9}, {id: 10}].take_while do |item|
  item[:id].even?
end
=> [{:id=>2}, {:id=>4}, {:id=>6}]
```

### Enumerable#drop_while

要素をブロックにて評価した結果が偽値になった時点でループを終了し、それ以前の要素を取り除いた配列を返す

```ruby
Moko.drop_while do |item|
  item != 3
end
=> [3, 4, 5]
```

```ruby
[1, 1, 1, 2, 2, 2].drop_while do |item|
  item == 1
end
=> [2, 2, 2]

[{id: 2}, {id: 4}, {id: 6}, {id: 9}, {id: 10}].drop_while do |item|
  item[:id].even?
end
=> [{:id=>2}, {:id=>4}, {:id=>6}]
```

### Enumerable#lazy

- 他のメソッド（主に配列を返す系？）が遅延評価をするように再定義される
- 遅延評価になるとそれぞれのメソッドが配列ではなく Enumerable::lazy を返すようになる
- 使い所によっては便利かもしれない
- 毎回評価をやり直すっぽい？

```ruby
a = Moko.lazy.find_all do |item|
  p 'hyouka chu'
  item.even?
end
=> #<Enumerator::Lazy: #<Enumerator::Lazy: Moko>:find_all>

a.to_a
"hyouka chu"
"hyouka chu"
"hyouka chu"
"hyouka chu"
"hyouka chu"
=> [2, 4]

b = a.map { |item| item ** 2}
=> #<Enumerator::Lazy: #<Enumerator::Lazy: #<Enumerator::Lazy: Moko>:find_all>:map>

a.to_a
"hyouka chu"
"hyouka chu"
"hyouka chu"
"hyouka chu"
"hyouka chu"
=> [2, 4]

b.to_a
"hyouka chu"
"hyouka chu"
"hyouka chu"
"hyouka chu"
"hyouka chu"
=> [4, 16]
```
