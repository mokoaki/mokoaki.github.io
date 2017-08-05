## JavaScript 正規表現メモ

### Version
Chromeが55の頃の話です

### 正規表現オブジェクト

```js
var reg_exp = new RegExp("[AB]0[12]", 'gmi');

var reg_exp = new RegExp("[AB]0[12]");
reg_exp.global = true;
reg_exp.ignoreCase = true;
reg_exp.multiline = true;
```

### 正規表現リテラル

```js
var reg_exp = /[AB]0[12]/gmi;
var reg_exp = /[AB]0[12]/;
```

### RegExpオブジェクトオプション

- global: g
  - 検索文字列全体について繰り返して一致を検索するか
  - グローバルではない方はローカル正規表現と言うような言わないような感じです
- ignoreCase: i
  - 大文字と小文字の違いを無視
- multiline: m
  - 行をまたいだ検索を行うか
- lastIndex
  - 検索開始位置指定（オブジェクト生成後に変更可能）
- source
  - フラグ無しの正規表現パターンを格納している => "[AB]0[12]"

### 正規表現パターン

| パターン | 説明 |
| --- | --- |
| /abc/ | abc にマッチ |
| /[abc]/ | a か b か c にマッチ |
| /[a-c]/ | a から c にマッチ |
| /[^abc]/ | a でも b でも c でもない文字にマッチ |
| /^abc/ | ローカル正規表現では文字列の頭を表し、グローバルでは行頭を表す |
| /abc$/ | ローカル正規表現では文字列の尻を表し、グローバルでは行末を表す |
| /a?/ | 無くてもいいし、1回だけ出現する |
| /a+/ | 1回以上出現する |
| /a*/ | 0回以上出現する |
| /a{5}/ | 5回の繰り返し |
| /a{5,10}/ | 5回以上10回以下の繰り返し |
| /a{5,}/ | 5回以上の繰り返し |
| /a(?=b)/ | 次にbがあるaにマッチ |
| /a(?!b)/ | 次がbではないaにマッチ |
| 控えめなマッチ | 繰り返し演算子は最大数マッチしようとするが<br>? を付けることにより最小限のマッチで済まそうとする <br>"abcabcab".match(/a.\*c/)<br>=> ["abcabc"]<br>"abcabcab".match(/a.\*?c/)<br>=> ["abc"] |
| /\t/ | タブ |
| /\r/ | キャリッジリターン |
| /\f/ | ラインラインフィード |
| /\n/ | 改行 |
| /\uxxxx/ | ユニコード文字 |
| /./ | **改行以外**のあらゆる文字 （.を改行にマッチさせる方法はJavaScriptには無い） |
| /\d/ | [0-9] すべての数字 |
| /\D/ | [^0-9] 数字以外のあらゆる文字 |
| /\w/ | [A-Za-z0-9] すべての英数字 |
| /\W/ | [^A-Za-z0-9] 英数字以外のあらゆる文字 |
| /\s/ | ユニコード空白文字(スペース,全角スペース,タブ,改行 等) |
| /\S/ | ユニコード空白文字以外のあらゆる文字 |
| /\b/ | 単語の境界にマッチする(スペース、句読点 等) |
| /\B/ | /b の逆 |
| /moko\|hage/ | moko か hage  |
| /moko(A\|B)/ | mokoA か mokoB （カッコは副次効果でキャプチャも作成する） |
| /moko(?:A\|B)/ | mokoA か mokoB （キャプチャを作成しない） |
| /moko(A\|B)hage\1/ | mokoAhageA か mokoBhageB （キャプチャを後方参照する） |
| $1, $2, $3... | 変換後文字にて後方参照を指定する（キャプチャ） |
| $& | 変換後文字にて後方参照を指定する（マッチ文字列） |

### RegExpオブジェクトメソッドとStringの正規表現関係メソッド

#### RegExpオブジェクトのメソッド
```js
RegExp.test(String)
RegExp.exec(String) // ローカル正規表現時には String.match(RegExp) と同じ動作をする（ぽい）
```

#### Stringオブジェクトのメソッド
```js
String.match(RegExp) // ローカル正規表現時には RegExp.exec(String) と同じ動作をする（ぽい）
String.search(RegExp)
String.replace(RegExp)
String.split(RegExp)
```

#### RegExp#test(String)
マッチするかどうかが知りたいだけならこれ
```js
/moko\d/.test("moko1 moko2 moko3")
=> true
```

#### RegExp#exec(String)
マッチ箇所毎に何か処理を行いたい場合や、マッチ文字列が必要な場合
```js
/moko\d/.exec("moko1, moko2, moko3")
=> ["moko1"]

// キャプチャを使ってみる
/moko(\d)/.exec("moko1, moko2, moko3")
=> ["moko1", "1"]

// グローバル正規表現の時は色々な情報を取得できる。例えばイテレート出来る
var RegExp = /(moko)(\d)/g;
var text   = "moko1 moko2 moko3";
var match_object;

while ((match_object = RegExp.exec(text)) !== null) {
  console.log(match_object);
}
=> ["moko1", "moko", "1", index: 0, input: "moko1 moko2 moko3"]
=> ["moko2", "moko", "2", index: 6, input: "moko1 moko2 moko3"]
=> ["moko3", "moko", "3", index: 12, input: "moko1 moko2 moko3"]
```

#### String#match(RegExp)
マッチした文字列が要る場合等
```js
"moko1 moko2 moko3".match(/moko\d/)
=> ["moko1"]

// グローバル正規表現なら配列が得られる
"moko1 moko2 moko3".match(/moko\d/g)
=> ["moko1", "moko2", "moko3"]

// キャプチャ有り
"moko1 moko2 moko3".match(/moko(\d)/)
=> ["moko1", "1"]

// グローバル正規表現（キャプチャ有り）
// matchのグローバルは戻り値にキャプチャに関するものは含まれない
"moko1 moko2 moko3".match(/moko(\d)/g)
=> ["moko1", "moko2", "moko3"]

// カッコは本来、グループ化の意味で、副作用的にキャプチャも作成される。逆に言うと作成されてしまう。ので、
// キャプチャが必要無い場合は ?: でキャンセルできる
"moko1 moko2 moko3".match(/moko(1|2)/)
=> ["moko1", "1"]

"moko1 moko2 moko3".match(/moko(?:1|2)/)
=> ["moko1"]

"moko1 moko2 moko3".match(/moko(1|2)/g)
=> ["moko1", "moko2"]

"moko1 moko2 moko3".match(/moko(?:1|2)/g)
=> ["moko1", "moko2"]
```

#### String#search(RegExp)
マッチした文字列の位置を取得したい
```js
"moko1 moko2 moko3".search(/moko1/)
=> 0

"moko1 moko2 moko3".search(/moko2/)
=> 6

// グローバル正規表現時
// 意味は無いよね
"moko1 moko2 moko3 moko2".search(/moko2/g)
=> 6
```

#### String#replace(RegExp, String)
マッチした文字列を置換する
```js
"moko1 moko2 moko3".replace(/moko\d/, "hage")
=> "hage moko2 moko3"

"moko1 moko2 moko3".replace(/moko\d/g, "hage")
=> "hage hage hage"

// 後方参照系を利用して置換してみる
"moko1 moko2 moko3".replace(/moko([13])/g, "hage-$1-hage")
=> "hage-1-hage moko2 hage-3-hage"

"moko1 moko2 moko3".replace(/moko[13]/g, "hage-$&-hage")
=> "hage-moko1-hage moko2 hage-moko3-hage"

// コールバック関数を利用してみる
// つまりString.replace()は第二引数に functionも受け付ける、と言うこと

// コールバック引数は可変長になる
// 1   マッチした文字列
// 2-  [キャプチャ対象]
// n-1 マッチ位置
// n   検索対象文字列全て

// そして、コールバック関数の戻り値が置換後の文字列になる

"moko1 moko2 moko3".replace(/moko([13])/g, function() {
  console.log(arguments);
  return "hage" + arguments[2];
})
=> ["moko1", "1", 0, "moko1 moko2 moko3"]
=> ["moko3", "3", 12, "moko1 moko2 moko3"]
=> "hage0 moko2 hage12"

"aaa_bbb_ccc".replace(/_([a-z])/g, function(_, str) {
  return str.toUpperCase();
})
=> "aaaBbbCcc"

"aaaBbbCcc".replace(/([A-Z])/g, function(_, str) {
  return "_" + str.toLowerCase();
});
=> "aaa_bbb_ccc"
```

#### String#split(RegExp)
マッチした正規表現にて分割、配列にする
```js
"amoko1bmoko2cmoko3d".split(/moko[13]/)
=> ["a", "bmoko2c", "d"]

// グローバル正規表現時
// 意味は無いよね
"amoko1bmoko2cmoko3d".split(/moko[13]/g)
=> ["a", "bmoko2c", "d"]
```

#### どうでもいいけど
```js
String.match(String)
String.search(String)
String.replace(String)
String.split(String)

// で呼び出しても インタプリタが勝手に

String.match(new RegExp(String))
String.search(new RegExp(String))
String.replace(new RegExp(String))
String.split(new RegExp(String))

// としてくれるらしいので、文字列も指定できるらしいよ
// まぁ暗黙の型変換、バグの温床ですね。頼らないようにしましょう
```
