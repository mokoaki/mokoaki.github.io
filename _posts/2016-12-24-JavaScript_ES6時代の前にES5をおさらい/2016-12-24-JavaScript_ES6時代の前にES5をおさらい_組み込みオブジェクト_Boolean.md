## JavaScript ES6時代の前にES5をおさらい 組み込みオブジェクト Boolean

Chrome55で確認

```js
// 使いません　使うな
// 特にメソッドは持っていない
// Objectから継承したメソッドがあるだけ
// 使いません
// 使うな

var b1 = new Boolean;
b1.valueOf()
=> false
b1.valueOf() === false
=> true
!!b1
=> true // ここ注意！ false的な属性を持っているとしてもオブジェクトなので真になるぞ！

var b2 = new Boolean(false);
b2.valueOf()
=> false
b2.valueOf() === false
=> true
!!b2
=> true // ここ注意！ false的な属性を持っているとしてもオブジェクトなので真になるぞ！

var b3 = new Boolean(true);
b3.valueOf()
=> true
b3.valueOf() === true
=> true
!!b3
=> true // ここ注意！ trueな属性を持っているかどうかよりも、オブジェクトなので真になるぞ！
```
