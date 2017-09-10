## JavaScript ES6時代の前にES5をおさらい 組み込みオブジェクト Error

Chrome55で確認

```js
var e1 = new Error("untara error");

var e2 = new EvalError("untara error");
var e3 = new RangeError("untara error");
var e4 = new ReferenceError("untara error");
var e5 = new SyntaxError("untara error");
var e6 = new TypeError("untara error");
var e7 = new URIError("untara error");

throw new Error("untara error");
throw new e1;
```

下記は Error.prototypeに定義されている

#### name

```js
// error名(コンストラクタ名)を返す

(new Error()).name
=> "Error"

(new EvalError()).name
=> "EvalError"
```

#### message

```js
// 追加のエラー情報を返す

(new Error("untara error")).message
=> "untara error"
```
