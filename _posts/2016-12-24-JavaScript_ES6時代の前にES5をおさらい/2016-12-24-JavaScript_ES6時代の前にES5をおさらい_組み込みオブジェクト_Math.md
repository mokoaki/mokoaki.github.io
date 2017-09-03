## JavaScript ES6時代の前にES5をおさらい 組み込みオブジェクト Math

Chrome55で確認

```js
// コンストラクタを使用してオブジェクトを作成したりはしない
// 定数や算術計算関数を利用するよ

typeof Math.protottpe
=> undefined

typeof Math
=> object
```

下記は Math

#### 定数いっぱい

```js
Math.E => 2.718281828459045
Math.LN10 => 2.302585092994046
Math.LN2 => 0.6931471805599453
Math.LOG2E => 1.4426950408889634
Math.LOG10E => 0.4342944819032518
Math.PI => 3.141592653589793
Math.SQRT1_2 => 0.7071067811865476
Math.SQRT2 => 1.4142135623730951
```

#### 三角関数

```js
Math.acos(x)
Math.asin(x)
Math.atan(x)
Math.atan2(y, x)
Math.cos(x)
Math.sin(x)
Math.tan(x)
```

#### round(x)

```js
// 最も近い整数を返す
// 四捨五入とも違うぽい
// 閾値(0.5とか)では、正数も負数も正の方向の正数になる

Math.round(-1.51) => -2
Math.round(-1.5) => -1 // 注意
Math.round(-1.49) => -1
Math.round(-1.01) => -1
Math.round(-1) => -1
Math.round(-0.99) => -1
Math.round(-0.51) => -1
Math.round(-0.5) => -0 // 注意
Math.round(-0.49) => -0
Math.round(-0.01) => -0
Math.round(0) => 0
Math.round(0.01) => 0
Math.round(0.49) => 0
Math.round(0.5) => 1 // 注意
Math.round(0.51) => 1
Math.round(0.99) => 1
Math.round(1) => 1
Math.round(1.01) => 1
Math.round(1.49) => 1
Math.round(1.5) => 2 // 注意
Math.round(1.51) => 2
```

#### floor(x)

```js
// 数値を切り捨てる
// 負数は負の方向の整数になる

Math.floor(-1.51) => -2
Math.floor(-1.5) => -2
Math.floor(-1.49) => -2
Math.floor(-1.01) => -2
Math.floor(-1) => -1
Math.floor(-0.99) => -1
Math.floor(-0.51) => -1
Math.floor(-0.5) => -1
Math.floor(-0.49) => -1
Math.floor(-0.01) => -1
Math.floor(0) => 0
Math.floor(0.01) => 0
Math.floor(0.49) => 0
Math.floor(0.5) => 0
Math.floor(0.51) => 0
Math.floor(0.99) => 0
Math.floor(1) => 1
Math.floor(1.01) => 1
Math.floor(1.49) => 1
Math.floor(1.5) => 1
Math.floor(1.51) => 1
```

#### ceil(x)

```js
// 数値を切り上げる
// 正数も負数も正の方向の整数になる

Math.ceil(-1.51) => -1
Math.ceil(-1.5) => -1
Math.ceil(-1.49) => -1
Math.ceil(-1.01) => -1
Math.ceil(-1) => -1
Math.ceil(-0.99) => 0
Math.ceil(-0.51) => -0
Math.ceil(-0.5) => -0
Math.ceil(-0.49) => -0
Math.ceil(-0.01) => -0
Math.ceil(0) => 0
Math.ceil(0.01) => 1
Math.ceil(0.49) => 1
Math.ceil(0.5) => 1
Math.ceil(0.51) => 1
Math.ceil(0.99)  => 1
Math.ceil(1) => 1
Math.ceil(1.01)  => 2
Math.ceil(1.49) => 2
Math.ceil(1.5) => 2
Math.ceil(1.51) => 2
```

#### max(num1, num2...)

```js
// 可変長引数を取り、最も大きい数値を返す
// 数値以外が含まれていた場合、戻り値がNaNになる

Math.max(1, 2, 3, 4, 5)
=> 5

Math.max("a", 2, 3, 4, 5)
=> NaN
```

#### min(num1, num2...)

```js
// 可変長引数を取り、最も小さい数値を返す
// 数値以外が含まれていた場合、戻り値がNaNになる

Math.min(1, 2, 3, 4, 5)
=> 1

Math.min("a", 2, 3, 4, 5)
=> NaN
```

#### abs(x)

```js
// 絶対値を返す

Math.abs(-7)
=> 7
```

#### exp(x)

```js
// 指数関数 Math.Eのx乗を返す

Math.exp(2)
=> 7.38905609893065
```

#### log(x)

```js
// xの自然対数を返す

Math.log(2)
=> 0.6931471805599453
```

#### sqrt(x)

```js
// xの平方根を返す

Math.sqrt(2)
=> 1.4142135623730951
```

#### pow(x, y)

```js
// xのy乗の結果を返す

Math.pow(3, 3)
=> 27
```

#### random()

```js
// 0から<1の間のランダムな数値を返す

Math.random()
=> 0.45689959234353705
```
