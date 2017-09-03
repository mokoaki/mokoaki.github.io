## JavaScript ES6時代の前にES5をおさらい 組み込みオブジェクト Date

Chrome55で確認

```js
// 引数を省略すると０が指定されたことになる
var d1 = new Date(2016, 11, 25, 20, 24, 10, 500);
// タイムスタンプも渡せる
var d2 = new Date(1485343450500);
// 引数なしは現在の日時
var d3 = new Date();
// 文字列も渡せる（フォーマットはどっかに書いてるだろ）
var d4 = new Date("May 4, 2008")
var d5 = new Date("2016/12/25 20:28:35")

// プリミティブの数値とは、そりゃもちろん違うものだが、
// プリミティブからメソッドを呼び出そうとするとインタプリタがDateオブジェクトをこっそり作ってくれている
```

### Dateコンストラクタ

#### parse(date_string)

```js
// 文字列からタイムスタンプを返す

Date.parse("2016/12/25 20:28:35")
=> 1482665315000
```

#### UTC(y, m, d, h, mi, se, mil)

```js
// 文字列からUTCのタイムスタンプを返す

Date.UTC(2016, 11, 25, 20, 28, 35, 500)
=> 1482697715500
```

下記は Date.prototypeに定義されている

#### toString

```js
// 文字列表記を返す

(new Date(2016, 11, 25, 1, 0, 0)).toString()
=> "Sun Dec 25 2016 01:00:00 GMT+0900 (JST)"
```

#### toUTCString

```js
// UTCの文字列表記を返す

(new Date(2016, 11, 25, 1, 0, 0)).toUTCString()
=> "Sat, 24 Dec 2016 16:00:00 GMT"
```

#### toDateString()

```js
// toString()の日付部分を返す

(new Date(2016, 11, 25, 1, 0, 0)).toDateString()
=> "Sun Dec 25 2016"
```

#### toTimeString()

```js
// toString()の時間部分を返す

(new Date(2016, 11, 25, 1, 0, 0)).toTimeString()
=> "01:00:00 GMT+0900 (JST)"
```

#### toLocaleString()

```js
// ロケールに従って、人に優しい表現を返す

(new Date(2016, 11, 25, 1, 0, 0)).toLocaleString()
=> "2016/12/25 1:00:00"
```

#### toLocaleDateString()

```js
// ロケールに従って、人に優しいtoLocaleString()の日付部分を返す

(new Date(2016, 11, 25, 1, 0, 0)).toLocaleDateString()
=> "2016/12/25"
```

#### toLocaleTimeString()

```js
// ロケールに従って、人に優しいtoLocaleString()の時間部分を返す

(new Date(2016, 11, 25, 1, 0, 0)).toLocaleTimeString()
=> "1:00:00"
```

#### getTime()

```js
// タイムスタンプを取得

(new Date(2016, 11, 25, 1, 0, 0)).getTime()
=> 1482595200000
```

#### setTime()

```js
// 新たな日付の設定
// 自己破壊してまでメソッドにする意味がわからない

var d1 = new Date(2016, 11, 25, 1, 0, 0);

d1.toLocaleString()
=> "2016/12/25 1:00:00"

d1.setTime(d1.getTime() + 1000)

d1.toLocaleString()
=> "2016/12/25 1:00:01"
```

#### getYear()

```js
// 頭がおかしいので使いません

(new Date(2016, 11, 25, 1, 0, 0)).getYear()
=> 116
```

#### getFullYear()

```js
// ４桁年を返す
// 省略するがsetもある
// getMonthもある
// getDateもある
// getHourもある
// getMinutesもある
// getSecondsもある
// getMillisecondsもある

(new Date(2017, 0, 1, 1, 0, 0)).getFullYear()
=> 2017
```

#### getUTCFullYear()

```js
// UTCの４桁年を返す
// 省略するがsetもある
// getUTCMonthもある
// getUTCDateもある
// getUTCHourもある
// getUTCMinutesもある
// getUTCSecondsもある
// getUTCMillisecondsもある

(new Date(2017, 0, 1, 1, 0, 0)).getUTCFullYear()
=> 2016
```

#### getDay()

```js
// 曜日を返す(0-6)
// getUTCDayもある

(new Date(2017, 0, 1, 1, 0, 0)).getDay()
=> 0
```

```js
// あれ？
Date.now();
```
