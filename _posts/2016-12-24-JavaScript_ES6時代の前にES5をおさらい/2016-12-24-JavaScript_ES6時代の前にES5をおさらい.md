## JavaScript ES6時代の前にES5をおさらい

Chrome55で確認

### ECMAScript

| ES1 | 1997 |
| ES2 | 1998 |
| ES3 | 1999 |
| ES4 | 失敗 |
| ES5 | 2009/12 |
| ES5 | 2015 |

### typeof

- typeof はアホなブラウザ等でウソをつく場合がある
- toString はウソをつかない
- しかし各オブジェクトの toString は上書きされている可能性があるので
- Object.prototype.toString を利用する

```js
Object.prototype.toString.call("".trim)
=> "[object Function]"

Object.prototype.toString.call("moko")
=> "[object String]"
```

### レガシーなイベント制御

```html
<body onclick="temp();">
```

とか

```js
body.onclick = function(){};
```

とか

```js
form1.onsubmit = function() {
  if(check()) {
    return false;
  }
};
```

こんなの

- これは旧文明の遺跡の壁画で発見される古いコードです
- こういうコードは書いてはいけません

### ナウいイベント制御

#### イベントフェーズ

| フェーズ名         |                                                                               |
| ---                | ---                                                                           |
| キャプチャフェーズ | DOMツリーをルート要素から発生要素まで辿り全ての要素でイベント発火しようとする |
| ターゲットフェーズ | 発生要素でイベント発火しようとする                                            |
| バブリングフェーズ | DOMツリーをルート要素まで遡り全ての要素でイベント発火しようとする             |

#### addEventListener にて3番目の引数にてフェーズを指定出来る

```js
// キャプチャフェーズで click イベント発火
object.addEventListener("click", function(){}, true);

//ターゲットフェーズ、バブリングフェーズで click イベント発火
object.addEventListener("click", function(){}, false);
```

ちなみにこの第3引数は省略可能(デフォでfalse)ではある筈だが、全てのブラウザでそうとは限らないので省略しない方がよす

#### イベント伝搬制御

return false;

- レガシー(キャプチャフェーズが無かった頃の負の遺産)
- その要素のイベントをキャンセル
- 親要素へのイベントバブリングをキャンセルする(子要素へはどうなってる？)

e.preventDefault();

- その要素のイベントをキャンセル
- 例えば onSubmit で値チェックして post をキャンセルしたり

e.stopPropagation();

- 次(親or子)要素への伝播をキャンセル
- 例えば親要素と自分に click バブリングフェーズイベントが設定してある場合、自分の click  イベントの発火のみで済ませようとしたり

#### forループ

こうじゃないぞ！

```js
var data = [1, 2, 3];

for (var i = 0; i < data.length; i++) {
  console.log(data[i]);
}
```

こう書けよ！１０倍以上早いぞ！(chrome53調べ)

```js
var data = [1, 2, 3];

for (var i = 0, l = data.length; i < l; i++) {
  console.log(data[i]);
}
```

#### undefined の判定

まず、undefined は window.undefined の事を言っているんだよな？これはOKか？

```js
window.undefined === undefined
=> true
```

かつては window.undefined が再定義可能であった為、他の方法が考案され使われていた。

```js
var a

typeof a === "undefined"
=> true

Object.prototype.toString.call(a) === "[object Undefined]"
=> true
```

ところが window.undefined が再定義可能だったのは遠い昔の話となり、今なら(常識的な実行環境なら)破壊されることはない

```js
var a

a === undefined
=> true

undefined = "test"
=> "test"

undefined
=> undefined

undefined === a
=> true
```

ところが、ローカルスコープ内では当然ローカル変数として定義可能であるので注意せよ

```js
(function() {
  var a;
  var undefined = "test";
  
  console.log(undefined)
  => "test"

  console.log(a === undefined)
  ==> false
})();
```

まぁ、 window.defined を使うか、上記の typeof, Object.prototype.toString を使っておけば心配要らないだろうと思われる

```js
(function() {
  var a;
  var undefined = "test";
  
  console.log(undefined);
  => "test"

  console.log(a === window.undefined);
  ==> true
})();
```

しかし、未定義な変数をチェックする場合に問題が

```js
a === window.undefined
=> Uncaught ReferenceError: a is not defined

Object.prototype.toString.call(a) === "[object Undefined]"
=> Uncaught ReferenceError: a is not defined

typeof a === "undefined"
=> true
```

未定義な変数にアクセスしようとしている時点でそれはおかしいことであり（タイプミスとか？） toString,　window.undefined を使っておけば未定義エラーチェックにもなるかもしれない、結局は状況に応じて使い分ける事になるんだろうと思う


これでどうや！

```js
var a = a;
Object.prototype.toString.call(a);
=> "[object Undefined]"
```







// JavaScript は頭おかしいので色々注意
false == "";
=> true

false === ""
=> false

// == を使う事は99%無い。

// 型チェックはしっかり自前で行う。 JavaScriptは信用するな

typeof Infinity
=> "number"

Object.prototype.toString.call(Infinity)
=> "[object Number]"

typeof NaN
=> "number"

Object.prototype.toString.call(NaN)
=> "[object Number]"

typeof undefined
=> "undefined"

Object.prototype.toString.call(undefined)
=> "[object Undefined]"

typeof []
=> "object"

typeof {}
=> "object"

Object.prototype.toString.call([])
=> "[object Array]"

Object.prototype.toString.call({})
=> "[object Object]"

// false と判断されるものは以下。それ以外は true となる

!!""
=> false

!!null
=> false

!!undefined
=> false

!!0
=> false

!!NaN
=> false

!!false
=> false


// もちろん遅延評価する

var a = 1;

true || (a = 2)
console.log(a)
=> 1

true && (a = 2)
console.log(a)
=> 2

// memo
var a; // 元のaの値が破壊されないので安全に初期化できる しかし実行系によって違うかも 確認
Object.prototype.toString.call(a);
=> "[object Undefined]"

未定義でもかかってこい！

// JavaScriptではこういうのは使わないほうがいいね
moko = moko || 10

// なぜなら
moko = 0;
moko = moko || 10;
soncole.log(moko);
=> 10

// 0でも初期化されるとかアホかと

// NaN はあたまおかしいオブジェクトです
typeof NaN
=> "number"

Object.prototype.toString.call(NaN)
=> "[object Number]"

NaN === NaN
=> false

NaN !== NaN
=> true

// NaNの判定

//isNaN はあたまおかしいので使うな　絶対ニダ
isNaN(NaN)
=> true

isNaN("a")
=> true

isNaN({})
=> true

// EC6なら
Number.isNaN(NaN)
=> true

Number.isNaN("a")
=> false

Number.isNaN({})
=> false

// レガシー環境なら、NaN === NaN => false であることを逆手に取る方法も
function isReallyNaN(x) {
  return x !== x;
}

// isFiniteを使ってもいいかもしれない

isFinite(NaN)
=> false

isFinite(1)
=> true


// 型はしっかり確認しようね　暗黙の型変換に頼ってはいけない

1 + undefined
=> NaN

1 + null
=> 1

'' + undefined
=> "undefined"

"" + null
=> "null"

// Arrayのクセ

typeof []
=> "object"

// ES5以降なら
Array.isArray([])
=> true

// レガシー環境なら
Object.prototype.toString.call([])
=> "[object Array]"


// 配列にfor-inループは注意
var arr = ["a", "b", "c"];
arr.moko = "moko";
arr["hage"] = "hage";

arr;
=> ["a", "b", "c"]

for (var i in arr) {
  console.log(i + " " + arr[i])
}

=> 0 a
=> 1 b
=> 2 c
=> moko moko
=> hage hage

// Array#forEach か、通常のforループを使った方が安全かもよ

//その変数は まともな数値か？
typeof num; //未定義じゃないよな？
typeof Infinity
=> "number" // typeofは役に立たなそう

Object.prototype.toString.call(Infinity)
=> "[object Number]" //お前もか

isFinite(Infinity)
=> false

isFinite(NaN)
=> false

isFinite("a")
=> false

isFinite(1)
=> true

// isFiniteさん最高！


// parseIntには必ず基数を指定しろ　ハゲるぞ
parseInt("10")
=> 10

parseInt("10", 10)
=> 10

parseInt("010")
=> 8 // JavaScript実装により結果が変わるが、8進数として変換される

parseInt("010", 8)
=> 8

// encodeURI とencodeURLCompenent の違い

var url = "http://mokoaki7.net?homo=モホだお&hage=ハゲだお"

// URLとして有効な [: // ? . = &] あたりは変換しない
encodeURI(url)
=> "http://mokoaki7.net?homo=%E3%83%A2%E3%83%9B%E3%81%A0%E3%81%8A&hage=%E3%83%8F%E3%82%B2%E3%81%A0%E3%81%8A"

// 記号等も変換する [a-z 0-9 .] はそのまま　他にも変換されない文字はある）
encodeURIComponent(url)
=> "http%3A%2F%2Fmokoaki7.net%3Fhomo%3D%E3%83%A2%E3%83%9B%E3%81%A0%E3%81%8A%26hage%3D%E3%83%8F%E3%82%B2%E3%81%A0%E3%81%8A"

try {
  var moko = 1 / 0;
}
catch (e) {
  console.log(e.name); 
  console.log(e.message);

  throw new RangeError("Division by zero"); 

  // 色んなErrorオブジェクト
  // throw new Error("Division by zero"); 
  // throw new EvalError("aaa"); 
  // throw new ReferenceError("aaa"); 
  // throw new SyntaxError("aaa"); 
  // throw new TypeError("aaa"); 
  // throw new TRIError("aaa"); 

  // オブジェクトを返すこともできる
  // throw {
  //   a: "aaa",
  //   b: "bbb",
  // }
}
finaliy {
  console.log("owata");
}


new Number(1)
Number(1)
new String(1)
String(1)
new Boolean(true)
Boolean(true)

何が違う？
new あり コンストラクタを利用し、ラッパーオブジェクトを返す。別に使用しなくてもいい気がする
new なし コンストラクタを関数として使用する。戻り値はその型のリテラル

他にも
Object()
Array()
Function()
Date()
RegExp()
Error()

とかいろいろある。それぞれクセがあったりする

// この2つの違い

function F() {
  console.log(this);
}
F();
=> window
=> undefined

function F() {
  console.log(this);
}
new F();
=> F()
=> F()

この２つはF()をコンストラクタとして使用している。
newを付けない場合は、F()内のthisはwindowとなり、
newを付けた場合は、F()をthisとした新しいObjectを作り、それが戻り値となる。

では次はどうだ？

function F() {
  function C() {
    return this;
  }
  return C();
}
F();
=> window

function F() {
  function C() {
    return this;
  }
  return C();
}
new F();
=> window

まず、new を付けようが付けまいが、C()内のthisはwindowであり、
newを付けない場合は、そのままthisであるwindowが戻り、
newを付けた場合は、戻り値がObjectなのでそれが新しいObjectとして戻る。つまりそれはWindow。



function C() {
  this.a = 1;
  return false;
}
new C()
=> C

function C() {
  this.a = 1;
  return false;
}
C()
=> false

newを付けない場合は、そのまま関数として使用、戻り値は false。そして予期せぬグローバル変数window.aの定義が行われる。危険。
newを付けた場合は、戻り値がObjectでは無いので、コンストラクタをCとする新しいオブジェクトが返却される。 Classからインスタンスを作ったイメージ。return falseは要らないけど。


この辺はかなりややこしい。訳がわからなくなる。多分上記は間違っているか、言葉足らずである。信用するな。

// .sort()は単純に比較してるんだろうね
[3, 1, 2, [3, 1, 2]].sort()
=> [1, 2, 3, [3, 1, 2]]

// .join() は 各項目にtoString()してるっぽいね
[3, 1, 2, [3, 1, 2]].join("-")
"3-1-2-3,1,2"






コンストラクタのprototypeにメソッドを追加する
下記4つは実は同じような事をしようとしている

// 1
function Moko() {}
var moko = new Moko();
Moko.prototype.hage = function() {
  return true;
};
moko.hage()
=> true;
Moko === moko.constructor
=> true

// 2
function Moko() {}
var moko = new Moko();
moko.constructor.prototype.hage = function() {
  return true;
};
moko.hage()
=> true;
Moko === moko.constructor
=> true

// 3
function Moko() {}
Moko.prototype = {
  hage: function() {
    return true;
  }
};
var moko = new Moko();
moko.hage()
=> true
Moko === moko.constructor
=> false
// 動くけど、 Moko.prototypeを オブジェクト{hage: function(){}} で上書きしてしまっているので、
// もはや moko.constructor は Moko ではない（で正しい？）

// 4
function Moko() {}
var moko = new Moko();
moko.constructor.prototype = {
  hage: function() {
    return true;
  }
};
moko.hage()
=> Uncaught TypeError: moko.hage is not a function
Moko === moko.constructor
=> false
// mokoを先に作っているが、mokoが参照しているのは変更される前の moko.constructor.prototype（Moko.prototype） なのでそこには hageメソッドは存在しない。
// Moko.prototypeを上書きしていないので、moko.constructor は Moko

// まぁ、3,4 みたいに prototypeを丸々上書きすると参照がずれるので、メソッドを追加しとけってことでおｋ？ 

// あー！上記はウソを書いている！　難しい！





// enumerable だか　列挙可能だか　そういう話

var array = [1, 2, 3];

array;
=> [1, 2, 3]

for (var i in array) {
  console.log(i);
}
=> 0
=> 1
=> 2
// うむ、予想通りの動きだ

array.hage = true;

array;
=> [1, 2, 3]

for (var i in array) {
  console.log(i);
}
=> 0
=> 1
=> 2
=> hage
// なん・・だと・・？

array.propertyIsEnumerable("hage") 
=> true
// hageは列挙可能だからこうなる

array.propertyIsEnumerable("length") 
=> false
// ちなみにlengthとかデフォのやつはちゃんと考えられていて列挙不可能になっている

Object.defineProperty(array, "hage", {
  enumerable: false,
});
// hageを列挙不可能にしましょう

for (var i in array) {
  console.log(i);
}
=> 0
=> 1
=> 2
// ホイおｋ

// ぶっちゃけ、ほんとうに必要じゃなければ、for in を使わなきゃいいんだよってこった

// ちなみに、


function Moko(name, color) {
  this.name = name;
  this.color = color;
  this.someMethod = function() {return 1;};
}

Moko.prototype.price = 100;
Moko.prototype.rating = 3;

var moko = new Moko("moko", "dark");

// for in はprototypeに定義されているプロパティも列挙可能であれば列挙する
for (var i in moko) {
  console.log(i + ": " + moko[i]);
}
=> name: moko
=> color: dark
=> someMethod: function () {return 1;}
=> price: 100
=> rating: 3

// 自分がそのプロパティのオーナーかどうか判断したり
for (var i in moko) {
  if(moko.hasOwnProperty(i)) {
    console.log(i + ": " + moko[i]);
  }
}
=> name: moko
=> color: dark
=> someMethod: function () {return 1;}

// propertyIsEnumerable はprototypeに定義されているものは列挙可能かどうかに係わらず、falseになる
for (var i in moko) {
  if(moko.propertyIsEnumerable(i)) {
    console.log(i + ": " + moko[i]);
  }
}
=> name: moko
=> color: dark
=> someMethod: function () {return 1;}





function Moko() {
  this.name = "moko";
}

Moko.prototype.hage = true;

var moko = new Moko();

moko.name;
=> "moko"

moko.hage;
=> true

moko.constructor.prototype;
=> {
  hage: true;
}
// hage が見えるのはコンストラクタのプロトタイプに定義されているから。これは基本。

moko.constructor = "a";
// コンストラクタ参照を壊す　もうプロトタイプの助けは得られないのか(´；ω；｀)

moko.hage;
=> true
// まだ使える・・だと・・？

Object.getPrototypeOf(moko)
=> {
  hage: true;
}
// getPrototypeOfで確認するとプロトタイプはまだリンクされている。

// つまり、moko.constructor からのプロトタイプの検索は内部では使われていない。
// 簡単に破壊できるし、デベロッパ確認用だとかそういう意味合いだと思っておけばおｋ

// ここから__proto__ だとかの話になっていくんだろうけど
// IEだとそもそも存在してない。
