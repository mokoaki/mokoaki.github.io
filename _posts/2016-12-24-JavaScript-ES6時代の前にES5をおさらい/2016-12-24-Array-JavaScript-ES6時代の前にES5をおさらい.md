## JavaScript ES6時代の前にES5をおさらい 組み込みオブジェクト Array

Chrome55で確認

```js
var a1 = new Array(1, 2, 3);
var a2 = [1, 2, 3];
// こいつらは同じもん・・のはずどうやって確かめよう・・

// こんなこともできる
var a3 = new Array(3)
=> [undefined, undefined, undefined]
```

下記は Array.ptototypeに定義されている

```js
// length
// 要素の長さ

[1,2,3,4].length
=> 4
```

```js
// concat
// 配列の連結

a = [1, 2]

a.concat(3)
=> [1, 2, 3]

// 自己破壊はしない
a
=> [1, 2]

// この動作は把握しておくといいかも
a.concat(3, [4], [5, 6], [7, [8, 9]])
=> [1, 2, 3, 4, 5, 6, 7, [8, 9]]
```

```js
// join
// 配列を連結して文字列に変換

[1,2,3,4].join("-")
=> "1-2-3-4"

// 引数を省略するとカンマで連結する　頭おかしい
[1,2,3,4].join()
=> "1,2,3,4"

// 頭おかしいので注意
[1,2,3,[4, 5]].join("-")
"1-2-3-4,5"
```

```js
// pop
// 最後の要素を取り除く　自己破壊
var a = [1, 2, 3]

a.pop()
=> 3

a
=> [1, 2]
```

```js
// push
// 引数を末尾に追加する　もちろん自己破壊
// 戻り値は追加後の配列の長さ

var a = [1, 2, 3]

a.push(4)
=> 4

a
=> [1, 2, 3, 4]

// 複数追加できる
var a = [1, 2, 3]

a.push(4, 5)
=> 5

a
=> [1, 2, 3, 4, 5]
```

```js
// reverse
// ひっくり返す　自己破壊

var a = [1, 2, 3]

a.reverse()
=> [3, 2, 1]

a
=> [3, 2, 1]
```

```js
// shift
// 先頭の要素を取り除く　もちろん自己破壊

var a = [1, 2, 3]

a.shift()
=> 1

a
=> [2, 3]
```

```js
// slice(strt_index, end_index)
// 配列の一部を返す
// end_indexで指定した位置の文字は帰らない、取扱にちょっと違和感がある
// マイナスが指定できる事の副作用か何かと思えば許せる？

var a = ["a", "b", "c", "d", "e"]

a.slice(2, 4)
=> ["c", "d"]

a
=> ["a", "b", "c", "d", "e"]

a.slice(2)
=> ["c", "d", "e"]

a.slice(2, -1)
=> ["c", "d"]
```

```js
// sort
// 自己破壊
// コールバックで手の込んだソートも可能　安全なソートに見えるけど未確認

var a = [1, 2, 3, 3, 2, 1]

a.sort()
=> [1, 1, 2, 2, 3, 3]

a
=> [1, 1, 2, 2, 3, 3]

[[1, 1], [2, 2], [3, 3], [4, 3], [5, 2], [6, 1]].sort(function(a, b){
  if (a[1] > b[1]) return 1 ;
  if (a[1] < b[1]) return -1 ;
  return 0;
})
=> [[1, 1], [6, 1], [2, 2], [5, 2], [3, 3], [4, 3]]

[[1, 1], [2, 2], [3, 3], [4, 3], [5, 2], [6, 1]].sort(function(a, b){
  return a[1] > b[1];
})
=> [[1, 1], [6, 1], [2, 2], [5, 2], [3, 3], [4, 3]]

// 安全ソートかどうかは後で調べるっす
```

```js
// splice
// 配列の要素を別（の長さの要素）に置き換える　もちろん自己破壊
// 戻り値は置き換えられた要素の配列

var a = [1, 2, 3, 4, 5]

a.splice(2, 2, "a", "b")
=> [3, 4]

a
=> [1, 2, "a", "b", 5]

// 要素の削除も可能ということ
var a = [1, 2, 3, 4, 5]

a.splice(2, 2)
=> [3, 4]

a
=> [1, 2, 5]

// 要素の挿入も可能ということ
var a = [1, 2, 3, 4, 5]

a.splice(2, 0, "a")
=> []

a
=> [1, 2, "a", 3, 4, 5]
```

#### unshift

```js
// 先頭に要素を追加　もちろん自己破壊
// 戻り値は追加後の配列の長さ

var a = [1, 2, 3]

a.unshift(0)
=> 4

a
=> [0, 1, 2, 3]

// 複数追加できる
var a = [1, 2, 3]

a.unshift(-1, 0)
=> 5

a
=> [-1, 0, 1, 2, 3]
```

#### forEach (ECMA 5)

```js
// そのまんまeach
var a = [1, 2, 3];

a.forEach(function(hoge){
  console.log(hoge);
});
=> 1
=> 2
=> 3

a.forEach((hoge) => {
  console.log(hoge);
});
=> 1
=> 2
=> 3
```

#### reduce (ECMA 5)

```js
// 配列の要素それぞれにおいて、前回の関数の実行の戻り値を保持しつつ関数を実行し、最終的な戻り値を返す
// inject はないっぽい
// reduceRight もあるよ

[1, 2, 3].reduce(function(previousValue, currentValue, index, array){
  return previousValue + currentValue;
}, 0)
=> 6

// 初期値を与えないとpreviousValueに1つめ、currentValueに2つめが入った状態でスタートするイメージ
[1, 2, 3].reduce(function(previousValue, currentValue){
  console.log("previousValue: " + currentValue + " currentValue: " + currentValue);
  return previousValue + currentValue;
})
=> previousValue: 1 currentValue: 2
=> previousValue: 3 currentValue: 3
=> 6

// 初期値を与えたときにはpreviousValueに初期値、currentValueに1つめが入った状態でスタートするイメージ
[1, 2, 3].reduce(function(previousValue, currentValue){
  console.log("previousValue: " + previousValue + " currentValue: " + currentValue);
  return previousValue + currentValue;
}, 0) // この 0 が初期値ね
=> previousValue: 0 currentValue: 1
=> previousValue: 1 currentValue: 2
=> previousValue: 3 currentValue: 3
=> 6

// index は現在のカレントのindex を返す つまり初期値がない場合には1から始まるので注意
// array にはレシーバの配列が入る　使いたければ使えばいいんじゃないかな
[1, 2, 3].reduce(function(previousValue, currentValue, index, array){
  console.log("index: " + index + " array: " + array);
  return previousValue + currentValue;
})
=> index: 1 array: [1, 2, 3]
=> index: 2 array: [1, 2, 3]
=> 6
```
