## JavaScript ES6時代の前にES5をおさらい 組み込みオブジェクト Function

Chrome55で確認

```js
function f1(a, b) { return a + b; }
var f2 = function(a) { return a + b; }
var f3 = new Function("a", "b", "return a + b;")

// こいつらはほぼ同じもん　ホイスト（巻き上げ）されるかどうか、クロージャの作られ方が変わってくる
// まぁ、new Function を使う事はまず無い　ていうか使うな
```

下記は Function.ptototypeに定義されている

#### apply(this_obj, params_array)

```js
// thisを束縛した上で関数を呼び出す
// thisを参照している関数を上手く騙して使う仕組み
// params_array は可変長の引数の配列
// 固定長の引数を使用したい場合はapply()ではなくcall()を使用する

function f1() {
  console.log(this);
  console.log(arguments);
}

f1.apply(window, [1, 2]);
=> Window
=> [1, 2] // Arguments object

f1.apply([], [1, 2]);
=> []
=> [1, 2] // Arguments object

// 使い所がある例かどうかは別として、配列のmaxを取りたい時にMath.maxを乗っ取る、なんて事も出来たりする
// この時、thisは関係ないのでnullを入れてる
Math.max.apply(null, [1, 2, 3, 2, 1])
=> 3
```

#### call(this_obj, params1, params2...)

```js
// thisを束縛した上で関数を呼び出す
// thisを参照している関数を上手く騙して使う仕組み
// 可変長の配列を引数に使用したい場合はcall()ではなくapply()を使用する

function f1() {
  console.log(this);
  console.log(arguments);
}

f1.call(window, [1, 2]);
=> Window
=> [1, 2] // Arguments object

f1.call([], [1, 2]);
=> []
=> [1, 2] // Arguments object
```

#### bind(this_obj)

```js
// thisを束縛した新たな関数を返す
// thisを参照している関数を上手く騙して使う仕組み

function f1() {
  console.log(this);
}

var f2 = f1.bind(window)
f2()
=> Window

var f2 = f1.bind([])
f2()
=> []
```

#### length

```js
// 関数が欲しがってる引数の数

function f1() {}
f1.length
=> 0

function f2(a) {}
f2.length
=> 1

function f3(a, b) {}
f3.length
=> 2
```

#### メソッドではないが一応 arguments

```js
// 関数内部で参照できる、呼び出された時の引数の配列（ではなくArguments object）
// ECMAScript的にいずれ非推奨になると思われ

function f1() {
  console.log(arguments);
}
f1(1)
=> [1] // Arguments object

f1("a", "b")
=> ["a", "b"] // Arguments object
```
