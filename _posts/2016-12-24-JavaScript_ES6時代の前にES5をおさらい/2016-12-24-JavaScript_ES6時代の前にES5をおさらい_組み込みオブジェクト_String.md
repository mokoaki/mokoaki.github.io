## JavaScript ES6時代の前にES5をおさらい 組み込みオブジェクト String

Chrome55で確認

```js
// 何に使うの？
// 気にすんな

var s1 = new String("a");

s1 === "a"
=> false

// プリミティブの数値とは、そりゃもちろん違うものだが、
// プリミティブからメソッドを呼び出そうとするとインタプリタがStringオブジェクトをこっそり作ってくれている
```

### Stringコンストラクタ

#### fromCharCode(code1, code2...)

```js
// 文字コード群から文字列を作る
// へーそうなんだ

String.fromCharCode(97, 98, 99)
=> "abc"
```

下記は String.prototypeに定義されている

#### length

```js
// 文字列の長さを返す

'abc'.length
=> 3

"あいう".length
=> 3
```

#### charAt(pos)

```js
// 指定した位置の文字を返す

"abc".charAt(1)
=> "b"

"あいう".charAt(1)
=> "い"
```

#### charCodeAt(pos)

```js
// 指定した位置の文字コードを返す

"abc".charCodeAt(1)
=> "98"

"あいう".charCodeAt(1)
=> 12356
```

#### concat(str1, str2...)

```js
// 末尾に引数を連結した文字を返す
// 自己破壊ではない

"abc".concat("d", "e")
=> "abcde"
```

#### indexOf(need, start_index)

```js
// 検索する　見つかった位置を返す
// 見つからなかったら -1 を返す
// 検索開始位置も指定できる
// needは正規表現も使える

"abcdeabcde".indexOf("z")
=> -1

"abcdeabcde".indexOf("d")
=> 3

"abcdeabcde".indexOf("d", 4)
=> 8
```

#### lastIndexOf(need, start_index)

```js
// 末尾から検索する　見つかった位置を返す
// 見つからなかったら -1 を返す
// 検索開始位置も指定できる

"abcdeabcde".lastIndexOf("z")
=> -1

"abcdeabcde".lastIndexOf("d")
=> 8

"abcdeabcde".lastIndexOf("d", 7)
=> 3
```

#### localeCompare(need)

```js
// 現在のロケールに従って（注意）文字列を比較、 -1, 0, 1 を返す

"b".localeCompare("a")
=> 1

"b".localeCompare("b")
=> 0

"b".localeCompare("c")
=> -1
```

#### match(regexp)

```js
// 正規表現オブジェクトでマッチした要素の配列を返す
// グローバル表現に注意

"a1b2c3".match(/[a-z]/g)
=> ["a", "b", "c"]

"a1b2c3".match(/[a-z]/)
=> ["a"]
```

#### replace(need, replacement)

```js
// 文字列を置き換える
// needは正規表現も使える
// replacementはコールバックも使える
// 更にキャプチャとか使って結構な処理が可能

// 最初に見つかった文字列だけぽい
"ab bb cb".replace("b", "z")
=> "az bb cb"

"ab bb cb".replace(/[b]/, "z")
=> "az bb cb"

"ab bb cb".replace(/[b]/g, "z")
=> "az zz cz"

"ab bb cb".replace(/[ac]/g, function(target){
  return "(" + target + " => " + target.toUpperCase() + ")";
})
=> "(a => A)b bb (c => C)b"
```


#### search(need)

```js
// 検索する　最初に見つかった位置を返す
// 見つからなかったら -1 を返す
// needは正規表現も使える

"ab bb cb".search("b")
=> 1

"ab bb cb".search("z")
=> -1

"ab bb cb".search(/[b]/)
=> 1

"ab bb cb".search(/[z]/)
=> -1

"ab bb cb".search(/[b]/g)
=> 1

"ab bb cb".search(/[z]/g)
=> -1
```

#### slice(start_index, end_index)

```js
// 部分文字列を返す
// マイナスも指定できるよ
// endで指定した文字は含まれない
// end_indexを省略すれば右端まで返す

"abcde".slice(0)
=> "abcde"

"abcde".slice(0, 1)
=> "a"

"abcde".slice(0, 0)
=> ""

"abcde".slice(0, -1)
=> "abcd"

"abcde".slice(1)
=> "bcde"

"abcde".slice(1, 1)
=> ""

"abcde".slice(1, 0)
=> ""

"abcde".slice(1, -1)
=> "bcd"

"abcde".slice(-3)
=> "cde"

"abcde".slice(-3, 1)
=> ""

"abcde".slice(-3, 0)
=> ""

"abcde".slice(-3, -1)
=> "cd"
```

#### split(separator, limit)

```js
// 文字列を配列に
// separatorは正規表現も使える
// limitで分割最大数を指定できるが、存在意義は不明

"a,b,c".split(",")
=> ["a", "b", "c"]

"a,b,c".split("")
=> ["a", ",", "b", ",", "c"]

"abcde".split(/bd/)
=> ["a", ",", "b", ",", "c"]

"abcde".split(/[bd]/)
=> ["a", "c", "e"]

"abcde".split(/[bd]/g)
=> ["a", "c", "e"]

// limit は指定した数で切る、ぽい　何に使うの？
"abcde".split("", 3)
=> ["a", "b", "c"]
```

#### substring


ちょっとおせっかいなので、slice()を使っておけばおｋ

```js
// 部分文字列を返す
// slice()と似ている
// マイナスや不正な値は0とみなして処理する
// 文字列より長い数値は文字列の長さが指定されたように振る舞う
// end > start のときには無駄に気を使って入れ替えてくれる
// end_indexを省略すれば右端まで返す

"abcde".substring(0)
=> "abcde"

"abcde".substring(0, 1)
=> "a"

"abcde".substring(0, 0)
=> ""

"abcde".substring(0, -1)
=> ""

"abcde".substring(1)
=> "bcde"

"abcde".substring(1, 1)
=> ""

"abcde".substring(1, 0)
=> "a"

"abcde".substring(1, -1)
=> "a"

"abcde".substring(-3)
=> "abcde"

"abcde".substring(-3, 1)
=> "a"

"abcde".substring(-3, 0)
=> ""

"abcde".substring(-3, -1)
=> ""
```

#### toLowerCase()

```js
// 小文字に変換して返す
// 自己破壊ではない
// toLocaleLowerCase() もある　ロケールがどうのこうの

"ABC".toLowerCase()
=> "abc"

"ＡＢＣ".toLowerCase()
=> "ａｂｃ"
```

#### toUpperCase()

```js
// 大文字に変換して返す
// 自己破壊ではない
// toLocaleUpperCase() もある　ロケールがどうのこうの

"abc".toUpperCase()
=> "ABC"

"ａｂｃ".toUpperCase()
=> "ＡＢＣ"
```
