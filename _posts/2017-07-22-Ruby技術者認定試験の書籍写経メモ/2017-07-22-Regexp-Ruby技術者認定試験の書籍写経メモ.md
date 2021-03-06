## Regexp 正規表現

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-Ruby技術者認定試験の書籍写経メモ %})

### 正規表現オブジェクトを生成する

| 正規表現リテラル       | /moko/             |                        |
| 正規表現クラスメソッド | Regexp.new('moko') | Regexp.compile('moko') |
| パーセント記法         | %r(moko)i          |                        |

### 正規表現リテラル

#### 正規表現リテラルのオプション

| i | 大文字小文字の無視                                    |
| m | マルチラインモード 「.」 が改行にマッチするようになる |
| x | 空白やコメントを無視                                  |
| n | 謎の刺客　今は触れない                                |

i 大文字小文字の無視

```ruby
/moko/ === 'MOKO'
=> false

/moko/i === 'MOKO'
=> true
```

m 改行を . でマッチさせるオプション

```ruby
/\Aa.*a\z/ === "a\na"
=> false

/\Aa.*a\z/m === "a\na"
=> true
```

x 空白やコメントの無視（反則スレスレだぜ！すげえ！）

```ruby
/\da\da\d/ === '0a0a0'
=> true

/\d a \d a \d/x === '0a0a0'
=> true

/
 \d # 0-9
 a  # a
 \d # 0-9
 a  # a
 \d # 0-9
/x ===  '0a0a0'
=> true
```

### 正規表現クラスメソッド

```ruby
Regexp.new('moko')
Regexp.compile('moko')
```

#### 正規表現クラスメソッドのオプション

| Regexp::IGNORECASE    | 大文字小文字の無視                                |
| Regexp::MULTILINE     | マルチラインモード . が改行にマッチするようになる |
| Regexp::EXTENDED      | 空白やコメントを無視                              |
| Regexp::FIXEDENCODING | 謎の刺客　今は触れない                            |
| Regexp::NOENCODING    | 謎の刺客　今は触れない                            |

```ruby
Regexp.new('moko', Regexp::IGNORECASE)
=> /moko/i

Regexp.new('moko', Regexp::MULTILINE)
=> /moko/m

Regexp.new('moko', Regexp::EXTENDED)
=> /moko/x
```

論理和によって複数指定も可能

```ruby
Regexp.new('moko', Regexp::IGNORECASE | Regexp::MULTILINE)
=> /moko/mi
```

「マッチングする時の文字コードを第3引数で指定することも出来ます」らしいのだが、ぐぐっても良く判らなかった・・ 1.9で無くなったとかじゃねえのこれ・・

### パーセント記法

```ruby
%r(moko)i
=> /moko/i
```

### 正規表現オブジェクトでマッチングする

| regexp#match? | true / false                   |
| regexp#===    | true / false                   |
| regexp#match  | MatchData / nil                |
| regexp#=~     | マッチ箇所のインデックス / nil |

#### regexp#match? メソッド

- マッチした場合は true
- マッチしなかった場合は false

```ruby
/moko/.match?('moko')
=> true

/moko/.match?('hage')
=> false
```

#### regexp#=== メソッド

- マッチした場合は true
- マッチしなかった場合は false

```ruby
/moko/ === 'moko'
=> true

/moko/ === 'hage'
=> false
```

#### regexp#match メソッド

- マッチした場合は MatchDataオブジェクト
- マッチしなかった場合は nil

```ruby
/moko/.match('moko')
=> #<MatchData "moko">

/moko/.match('hage')
=> nil
```

#### MatchDataオブジェクトって何に使うんよ

とりあえず [0] [1] 辺りでアクセスしてみると、マッチ文字列、キャプチャが取得できる

```ruby
match_data = /(\d+)b(\d+)c(\d+)/.match('a123b456c789d')
=> #<MatchData "123b456c789" 1:"123" 2:"456" 3:"789">

match_data[0]
=> "123b456c789"

match_data[1]
=> "123"

match_data[2]
=> "456"

match_data[3]
=> "789"
```

他にも便利なメソッドありそう

#### regexp#=~ メソッド

- マッチした場合は マッチ箇所のインデックス
- マッチしなかった場合は nil

```ruby
/moko/ =~ 'moko'
=> 0

/moko/ =~ 'hage'
=> nil
```

また、string#=~ も同じ動作をする

```ruby
'moko' =~ /moko/
=> 0

'moko' =~ /hage/
=> nil
```

### 謎の ~ メソッド

- ~ メソッドは $_ とマッチングするメソッドである
- マッチした場合は マッチ箇所のインデックスを返す
- マッチしなかった場合は nil
- ぶっちゃけ使わないだろこれ

```ruby
$_ = 'moko'

~ /moko/
=> 0

~ /hage/
=> nil
```

### 正規表現の特殊文字をエスケープする

正規表現ではピリオド[.]やカッコ等でマッチングする場合、これらの文字をエスケープする必要がある。これらのエスケープを自動的に行うのが下記のメソッドである

| Regexp.escape |
| Regexp.quote  |

```ruby
Regexp.escape('hash[:hage]')
=> "hash\\[:hage\\]"

Regexp.escape('hash[:hage]').class
=> String

Regexp.new(Regexp.escape('hash[:hage]')) === 'hash[:hage]'
=> true
```

エスケープを行うというよりは、エスケープ済みの文字列を生成する、といった感じか

### マッチした結果を取得する

最後に行った正規表現のマッチ結果は下記に保存されている

| Regexp.last_match |
| $~                |

```ruby
/moko/ === 'moko'
=> true

Regexp.last_match
=> #<MatchData "moko">

$~
=> #<MatchData "moko">
```

#### Regexp.last_match $~ は MatchData なので整数を与えるとマッチ結果が得られる

| Regexp.last_match(0) | Regexp.last_match[0] | マッチした箇所  |
| Regexp.last_match(1) | Regexp.last_match[1] | キャプチャ箇所1 |
| Regexp.last_match(2) | Regexp.last_match[2] | キャプチャ箇所2 |
| Regexp.last_match(3) | Regexp.last_match[3] | キャプチャ箇所3 |

特殊変数の方でもイケる

| $~[0] | マッチした箇所  |
| $~[1] | キャプチャ箇所1 |
| $~[2] | キャプチャ箇所2 |
| $~[3] | キャプチャ箇所3 |

```ruby
/(\d+)b(\d+)c(\d+)/ === 'a123b456c789d'
=> true

Regexp.last_match(0)
=> "123b456c789"

Regexp.last_match[1]
=> "123"

$~[2]
=> "456"

$~[3]
=> "789"
```

[特殊変数]({% post_url 2017-07-22-変数、定数、予約語、演算子関係-Ruby技術者認定試験の書籍写経メモ %}#特殊変数)でもアクセスできる

| $& | マッチした箇所     |
| $1 | キャプチャ箇所1    |
| $2 | キャプチャ箇所2    |
| $3 | キャプチャ箇所3    |
| $+ | キャプチャ箇所最後 |

```ruby
/(\d+)b(\d+)c(\d+)/ === 'a123b456c789d'
=> true

$&
=> "123b456c789"

$1
=> "123"

$2
=> "456"

$3
=> "789"

$+
=> "789"
```

### 正規表現の論理和を求める Regexp.union

複数の正規表現を結合し、そのどれかにマッチするような正規表現を求める

```ruby
Regexp.union(/moko/, /MOKO/)
=> /(?-mix:moko)|(?-mix:MOKO)/

Regexp.union(/moko/, /MOKO/) === 'moko'
=> true

Regexp.union(/moko/, /MOKO/) === 'MOKO'
=> true
```

もちろん引数は3つ以上でもイケる

### 正規表現オブジェクトのオプションや属性を取得する

取得はできるが・・変更はできないっぽい？

| regexp#options   |
| regexp#casefold? |
| regexp#kcode     |
| regexp#source    |

#### regexp#options メソッド

正規表現を生成する時に設定したオプションである、

- Regexp::IGNORECASE
- Regexp::MULTILINE
- Regexp::EXTENDED

の論理和を返す

```ruby
/moko/i.options
=> 1

/moko/m.options
=> 4

/moko/x.options
=> 2
```

Regexp::IGNORECASE が設定されているか？

```ruby
/moko/i.options & Regexp::IGNORECASE == Regexp::IGNORECASE
=> true
```

Regexp::MULTILINE が設定されているか？

```ruby
/moko/m.options & Regexp::MULTILINE == Regexp::MULTILINE
=> true
```

Regexp::EXTENDED が設定されているか？

```ruby
/moko/x.options & Regexp::EXTENDED == Regexp::EXTENDED
=> true
```

#### regexp#casefold? メソッド

- オプション Regexp::IGNORECASE が設定されているかどうか
- なんで Regexp::IGNORECASE だけ特別扱いなのん？他に比べてよく使う？

```ruby
/moko/.casefold?
=> false

/moko/i.casefold?
=> true
```

#### regexp#kcode メソッド

正規表現オブジェクトがコンパイルされている文字コードを取得・・だったらしいんだけど、**このメソッドはもう存在しない**。1.9で無くなったんじゃねえかな

```ruby
/moko/u.kcode
=> 'utf8'
```

#### regexp#source メソッド

似たような文字列を返すものに to_s と inspect があるが

| regexp#source  | 正規表現の元となった文字列表現を返す                               |
| regexp#to_s    | 他の正規表現に埋め込んでも意味が保たれるような形式                 |
| regexp#inspect | オプション付きで自然な読みやすい形式となるが、元の意味は保たれない |

```ruby
/moko/i.source
=> "moko"

/moko/i.to_s
=> "(?i-mx:moko)"

/moko/i.inspect
=> "/moko/i"
```

inspectが読みやすくていいなーとは思うんだが

### Ruby版 正規表現パターン

[正規表現パターン]({% post_url 2017-09-09-Ruby-正規表現メモ %}#正規表現パターン)

### 正規表現の特殊変数覚えてる？

- [特殊変数の一覧]({% post_url 2017-07-22-変数、定数、予約語、演算子関係-Ruby技術者認定試験の書籍写経メモ %}#特殊変数)
- 特に `&' の3つは英字キーボードでもこんな感じの並びなので覚えやすいかも？

```ruby
/bb/ === 'aabbcc'

$` #=> "aa" # マッチ箇所より前
$& #=> "bb" # マッチ箇所
$' #=> "cc" # マッチ箇所より後
```

### POSIX文字クラス ブラケット表現

たぶんここは出題範囲外

| /[[:alnum:]]/  | 英数字 (Letter \| Mark \| Decimal_Number) |
| /[[:alpha:]]/  | 英字 (Letter \| Mark) |
| /[[:ascii:]]/  | ASCIIに含まれる文字 (0000 - 007F) |
| /[[:blank:]]/  | スペースとタブ (Space_Separator \| 0009) |
| /[[:cntrl:]]/  | 制御文字 (Control \| Format \| Unassigned \| Private_Use \| Surrogate) |
| /[[:digit:]]/  | 数字 (Decimal_Number) |
| /[[:graph:]]/  | 空白以外の表示可能な文字(つまり空白文字、制御文字、以外) ([[:^space:]] && ^Control && ^Unassigned && ^Surrogate) |
| /[[:lower:]]/  | 小文字 (Lowercase_Letter) |
| /[[:print:]]/  | 表示可能な文字(空白を含む) ([[:graph:]] \| Space_Separator) |
| /[[:punct:]]/  | 句読点 (Connector_Punctuation \| Dash_Punctuation \| Close_Punctuation \| Final_Punctuation \| Initial_Punctuation \| Other_Punctuation \| Open_Punctuation) |
| /[[:space:]]/  | 空白、改行、復帰 (Space_Separator \| Line_Separator \| Paragraph_Separator \| 0009 \| 000A \| 000B \| 000C \| 000D \| 0085) |
| /[[:upper:]]/  | 大文字 (Uppercase_Letter) |
| /[[:xdigit:]]/ | 16進表記で使える文字 (0030 - 0039 \| 0041 - 0046 \| 0061 - 0066) |
| /[[:word:]]/   | 単語構成文字 (Letter \| Mark \| Decimal_Number \| Connector_Punctuation) |

```ruby
' 　 mo ko 　 '.gsub(/\A[[:blank:]]+|[[:blank:]]+\z/, '')
=> "mo ko"
```
