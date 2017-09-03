## JavaScript ES6時代の前にES5をおさらい 組み込みオブジェクト Object

Chrome55で確認

```js
({}) === ({})
=> false

({}) == ({})
=> false

// (´・ω・｀) こういうもんなのね

var o1 = new Object();
var o2 = Object();
var o3 = {};
// こいつらは同じもん・・のはずどうやって確かめよう・・
```

```js
var s1 = new Object("string");
=> Stringオブジェクト

var n1 = new Object(1);
=> Numberオブジェクト
// こういう事も出来るが推奨されない　ていうかやるな
```

```js
Object.prototype
// 全てのオブジェクトのプロトタイプ　全ての祖先　元凶

Object.prototype.hage = "ハゲっす！";

({}).hage
=> ハゲっす！

(function(){}).hage
=> ハゲっす！
```

下記は Object.ptototypeに定義されている

```js
Objectコンストラクタ関数への参照
Object.prototype.constructor === Object
=> true
```

```js
// オブジェクトの文字列表現を返す
// これは継承したオブジェクトでオーバーライドされている可能性が高い

({}).toString()
=> "[object Object]"

(new Date()).toString()
=> "Sat Dec 24 2016 19:30:40 GMT+0900 (JST)"
```

```js
// オブジェクトの「現状のロケールにマッチした」文字列表現を返す
// これは継承したオブジェクトでオーバーライドされている可能性が高い

({}).toLocaleString()
=> "[object Object]"

(new Date()).toLocaleString()
=> "2016/12/24 19:30:43"
```

```js
// 自分自身を返す
// これは継承したオブジェクトでオーバーライドされている可能性が高い

({}).valueOf()
=> Object {}

(new Number(1)).valueOf()
=> 1

(new Date()).valueOf()
=> 1482575522830
```

```js
// そのオブジェクト自身が持っているプロパティかどうか

({a: 1}).a
=> 1

({a: 1}).hasOwnProperty("a")
=> true

({a: 1}).hasOwnProperty("b")
=> false

({a: 1}).toString()
=> "[object Object]"

({a: 1}).hasOwnProperty("toString")
=> false
```

```js
// 自分(prototype)が引数の祖先に含まれているかどうか
// （未確認）引数がオブジェクトかプリミティブかどうかの判定にも使える？

Object.prototype.isPrototypeOf(new String())
=> true

String.prototype.isPrototypeOf(new String())
=> true

Number.prototype.isPrototypeOf(new String())
=> false

Object.prototype.isPrototypeOf(function(){})
=> true

Object.prototype.isPrototypeOf({})
=> true

Object.prototype.isPrototypeOf(1)
=> false

Object.prototype.isPrototypeOf("a")
=> false
```
