## JavaScript ES6時代の前にES5をおさらい 組み込み関数

Chrome55で確認

###組み込み関数

#### グローバル

```js
parseInt("1a", 10)
=> 1

parseInt("FF")
=> NaN

parseInt("FF", 16)
=> 255
```

```js
parseFloat("1.1")
=> 1.1

parseFloat("1.0") === 1
=> true

parseFloat("1.1a")
=> 1.1
```

```js
isNaN(NaN)
=> true

isNaN("a")
=> true

isNaN(undefined)
=> true

isNaN(false)
=> false

isNaN(null)
=> false

isNaN(1)
=> false

// isNaNはあんまり信用しない方がいいと思う　ていうか使わない
```

```js
isFinite(Infinity)
=> false

isFinite(-Infinity)
=> false

isFinite("1")
=> true

isFinite(1)
=> true

isFinite("1a")
=> false

// isFiniteは信用していいと思う　感覚的に分かりやすい
// まともな数値、まともな数値に変換できる文字列の時にtrue
```

```js
encodeURIComponent("http://mokoaki.net/head?hage=@ハゲ")
=> "http%3A%2F%2Fmokoaki.net%2Fhead%3Fhage%3D%40%E3%83%8F%E3%82%B2"

decodeURIComponent("http%3A%2F%2Fmokoaki.net%2Fhead%3Fhage%3D%40%E3%83%8F%E3%82%B2")
=> "http://mokoaki.net/head?hage=@ハゲ"

// [:/]とかそのあたりもエンコードする
```

```js
encodeURI("http://mokoaki.net/head?hage=@ハゲ")
=> "http://mokoaki.net/head?hage=@%E3%83%8F%E3%82%B2"

decodeURI("http://mokoaki.net/head?hage=@%E3%83%8F%E3%82%B2")
=> "http://mokoaki.net/head?hage=@ハゲ"

// 最低限のエンコードしてくれるような感じだよね
```

```js
eval("console.log('hage')")
=> hage

// 当然の如く、evalは危険なので本当に必要な箇所以外では使わない　ていうか使わない
```
