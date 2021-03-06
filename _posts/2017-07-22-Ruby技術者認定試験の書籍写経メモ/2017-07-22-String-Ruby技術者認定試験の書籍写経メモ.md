## String 文字列

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-Ruby技術者認定試験の書籍写経メモ %})

1.9よりStringオブジェクトはエンコーディング情報を保持するようになった。この為、Stringオブジェクトのメソッドは1文字を単位として動くように変わった

#### 主な文字コード

| UTF-8       | 主に使用されている文字コード                                                  |
| EUC-JP      | 古いUNIXシステムで利用されていたコード                                        |
| JIS         | JISで策定された7bit文字のみを使った文字コード                                 |
| Shift_JIS   | マルチバイト文字とASCII文字を切り替えることなく使用できるようにした文字コード |
| Windows-31J | 主にWindowsで使われていたShift-JISの亜種                                      |
| US-ASCII    | ASCII文字だけで構成されている文字コード                                       |

### 文字列のエンコーディングの取得

#### string#encoding

- Encodingクラスのインスタンスを返す
- 全ての文字列リテラルは半角だからとかそういうことは関係なく、デフォルトのエンコーディングにてオブジェクト化される

```ruby
'abcde'.encoding
=> #<Encoding:UTF-8>

'ハゲ'.encoding
=> #<Encoding:UTF-8>

'abcde'.encode('EUC-JP').encoding
=> #<Encoding:EUC-JP>

'abcde'.encode('EUC-JP').encoding.name
=> "EUC-JP"
```

### 文字列のエンコーディングの変更

String#encode String#Encode!

```ruby
'aaa'.encode('EUC-JP').encoding
=> #<Encoding:EUC-JP>
```

### 文字列のASCIIコードを取得

文字列の最初の一文字のコードポイント(1文字を表す整数のコード)を返す。ASCII範囲内ならASCIIコードが、色んな文字列ならそのエンコードに従った値になる

```ruby
'abc'.ord
=> 97

'あいう'.ord
=> 12354
```

### 文字列の比較

| ==      | そ                            |
| >       | の                            |
| >=      | ま                            |
| <       | ん                            |
| <=      | ま                            |
| <=>     | 件のUFO演算子 左が大きければ1 |
| casecmp | 文字の大小を無視してUFO演算子 |

### 文字列と異なるクラスのオブジェクトの比較

== メソッドのみ、異なるクラスのオブジェクトと比較できるが、型の自動変換は行われないので結果はfalseとなる

```ruby
'100' == 100
=> false

'100' >= 100
ArgumentError: comparison of String with 100 failed
```

### 文字列の比較時のエンコーディング

- 文字列の比較のときにもエンコーディングを意識する必要がある
- == eql? メソッドは両者が同じエンコーディングでなければfalseを返す。ただし、ASCII文字しか含んでいない場合にはtrueを返す

```ruby
'もこ' == 'もこ'
=> true

'もこ' == 'もこ'.encode('EUC-JP')
=> false

'ABC' == 'ABC'.encode('EUC-JP')
=> true
```

### 文字列の分割

- split メソッドは文字列や正規表現にて文字列を分割する
- 引数に空文字を与えると1文字ごとに分割する

```ruby
'abcde'.split('c')
=> ["ab", "de"]

'abcde'.split('')
=> ["a", "b", "c", "d", "e"]

'ab1cd2ef3gh'.split(/\d/)
=> ["ab", "cd", "ef", "gh"]
```

- 第2引数を与えると、その値だけ分割した時点で分割を終了する
- 引数の値が0の場合は省略時と同じ動作をする
- 引数の値が大きい場合は分割される数と同じ場合と同じ値を返す

```ruby
'a_a_a'.split('_', 0)
=> ["a", "a", "a"]

'a_a_a'.split('_', 1)
=> ["a_a_a"]

'a_a_a'.split('_', 2)
=> ["a", "a_a"]

'a_a_a'.split('_', 3)
=> ["a", "a", "a"]

'a_a_a'.split('_', 4)
=> ["a", "a", "a"]
```

- 配列の末尾に並ぶ空文字列の要素は省略される
- 第2引数で操作が可能
- 分割最大数と同じ値、分割最大数より大きい値、負の値の時には要素が省略されない
- 大事な事なのでもう一度 -1 は使える子

```ruby
'a,b,,'.split(',')
=> ["a", "b"]

'a,b,,'.split(',', 0)
=> ["a", "b"]

'a,b,,'.split(',', 1)
=> ["a,b,,"]

'a,b,,'.split(',', 2)
=> ["a", "b,,"]

'a,b,,'.split(',', 3)
=> ["a", "b", ","]

'a,b,,'.split(',', 4)
=> ["a", "b", "", ""]

'a,b,,'.split(',', 5)
=> ["a", "b", "", ""]

'a,b,,'.split(',', -1)
=> ["a", "b", "", ""]
```

### 文字列の切り出し

- [] slice slice! メソッドに数値を渡し、場所を指定して文字列を切り出す
- slice!は元の文字列から破壊的に切り出す

```ruby
'abcde'[2]
=> "c"

'abcde'.slice(2)
=> "c"

'abcde'[-2]
=> "d"

'abcde'.slice(-2)
=> "d"
```

```ruby
'ab8de'[/\d/]
=> "8"

'ab8de'.slice(/\d/)
=> "8"
```

```ruby
a = 'abcde'

a.slice!(2)
=> "c"

a
=> "abde"
```

範囲オブジェクトを渡すと該当する範囲が対象になる

```ruby
'abcde'[1..3]
=> "bcd"

'abcde'.slice(1..3)
=> "bcd"

a = 'abcde'

a.slice!(1..3)
=> "bcd"

a
=> "ae"
```

- 範囲の指定は範囲オブジェクトだけではなく、開始位置、長さ　で渡すこともでき
- 特に開始位置はマイナスを渡すと末尾から数えた数になる、といういつものあの動きをする
- 文字列よりも長い長さが渡されても可能な部分だけ返してくれる

```ruby
'abcde'[1, 3]
=> "bcd"

'abcde'.slice(1, 3)
=> "bcd"

a = 'abcde'

a.slice!(1, 3)
=> "bcd"

a
=> "ae"
```

- 文字列で指定すると元の文字列に含まれていればその部分を、含まれていなければnilを返す
- 最初に一致した箇所だけが対象
- ぶっちゃけ使わない

```ruby
'abcdeabcde'['bc']
=> "bc"

'abcdeabcde'.slice('bc')
=> "bc"

a = 'abcdeabcde'

a.slice!('bc')
=> "bc"

a
=> "adeabcde"
```

- 正規表現でも指定できるらしい
- 最初に一致した箇所だけが対象
- ぶっちゃけ使わない

```ruby
'abcdeabcde'[/bc/]
=> "bc"

'abcdeabcde'.slice(/bc/)
=> "bc"

a = 'abcdeabcde'

a.slice!(/bc/)
=> "bc"

a
=> "adeabcde"
```

### 文字列の変更

- 文字列の一部分を変更することができる
- []= メソッドには前項でやったような色々な指定方法が使える
- insert メソッドもあるよ たぶん使わないけど

```ruby
a = 'abcdeabcde'
a[3] = '_hage_'
a
=> "abc_hage_eabcde"

a = 'abcdeabcde'
a[3, 2] = '_hage_'
a
=> "abc_hage_abcde"

a = 'abcdeabcde'
a[3..4] = '_hage_'
a
=> "abc_hage_abcde"

a = 'abcdeabcde'
a['bc'] = '_hage_'
a
=> "a_hage_deabcde"

a = 'abcdeabcde'
a[/bc/] = '_hage_'
a
=> "a_hage_deabcde"
```

```ruby
a = 'abcdeabcde'
a.insert(3, '_hage_')
a
=> "abc_hage_deabcde"
```

### 文字列の一部を置換

| sub      | sub!     |
| gsub     | gsub!    |
| tr       | tr!      |
| tr_s     | tr_s!    |
| delete   | delete!  |
| squeeze  | squeeze! |
| replace  | 　       |

- それぞれ置換した文字列を返すが、!が付いているメソッドは元の文字列を破壊的に変更する
- replaceメソッドはそれ自体が破壊的なので!は付いていない

#### sub sub! メソッド

指定したパターンに最初にマッチした箇所を指定した文字列に変更する

```ruby
'abcabc'.sub('bc', '_hage_')
=> "a_hage_abc"

'abcabc'.sub(/bc/, '_hage_')
=> "a_hage_abc"

a = 'abcabc'
a.sub!('bc', '_hage_')
a
=> "a_hage_abc"
```

#### gsub gsub! メソッド

指定したパターンにマッチした箇所を全て指定した文字列に変更する

```ruby
'abcabc'.gsub('bc', '_hage_')
=> "a_hage_a_hage_"

'abcabc'.gsub(/bc/, '_hage_')
=> "a_hage_a_hage_"

a = 'abcabc'
a.gsub!('bc', '_hage_')
a
=> "a_hage_a_hage_"
```

また、ブロックを取ることもでき、実行結果へと置換される

```ruby
'abcabc'.sub('bc') do |match_data|
  "_#{match_data}_"
end
=> "a_bc_abc"
```

```ruby
'1_2_3'.gsub(/\d/) do |match_data|
  match_data.to_i + 5
end
=> "6_7_8"
```

#### tr tr! tr_s tr_s! メソッド

- tr は指定したパターンに含まれる文字を検索し、それを特定の文字列やパターンに併せて置換する
- tr_s はそれに加え、パターンにマッチした箇所で重複する文字を1文字に圧縮する

```ruby
'abcdef'.tr('b-d', 'B-D')
=> "aBCDef"

'abcdef'.tr('b-d', 'L-N')
=> "aLMNef"

'abcdef'.tr('bcd', 'BCD')
=> "aBCDef"
```

変換後の文字数が多い場合は無視される

```ruby
'abcdef'.tr('bcd', 'BCD=')
=> "aBCDef"

'abcdef'.tr('b-d', 'B-D')
=> "aBCDDf"
```

変換前の文字数が多い場合は変換後の前の文字が使用されるっぽい

```ruby
'abcdef'.tr('bcde', 'BCD')
=> "aBCDDf"

'abcdef'.tr('b-e', 'B-D')
=> "aBCDDf"
```

tr_sはこんな感じ

```ruby
'aabbccddeeff'.tr_s('b-d', 'B-D')
=> "aaBCDeeff"

'aabbccddeeff'.tr_s('b-d', 'L-N')
=> "aaLMNeeff"

'aabbccddeeff'.tr_s('b-e', 'B-D')
=> "aaBCDff"
```

#### delete delete! メソッド

- 指定したパターンにマッチする文字を検索し削除する
- 正規表現とはちょっと違う感じのマッチ
- 複数のパターンを指定すると全てのパターンに含まれる文字列のみ削除する（＆条件）

| ^      | 先頭にある場合、その条件全て「ではない」事が条件になる |
| a-c    | a, b, c                                                |
| da-ce  | d, a, b, c, e                                          |
| a-     | a, -                                                   |
| 13-57  | 1, 3, 4, 5, 7                                          |
| -56    | -, 5, 6                                                |
| b-d-f  | b, c, d, -, f                                          |
| ab-d-f | a, b, c, d, -, f                                       |

```ruby
'aabbccddee'.delete('b')
=> "aaccddee"

'aabbccddee'.delete('a-c')
=> "ddee"

'aabbccddee'.delete('a-c', 'b-d')
=> "aaddee"
```

#### squeeze squeeze! メソッド

- 指定した文字が複数並んでいたら1文字に圧縮する
- 複数のパターンを指定すると全てのパターンに含まれる文字列のみ圧縮する
- 文字を指定しなければ全てが対象

```ruby
'aabbccddaabbccdd'.squeeze('b')
=> "aabccddaabccdd"

'aabbccddaabbccdd'.squeeze('a-c')
=> "abcddabcdd"

'aabbccddaabbccdd'.squeeze('a-c', 'b-d')
=> "aabcddaabcdd"

'aabbccddaabbccdd'.squeeze
=> "abcdabcd"
```

#### replace メソッド

- 置換ではなく、指定した文字列で自分自身の内容を破壊的に変更する
- object_idを変えたくない！時に使う？
- ぶっちゃけ使わない

```ruby
a = 'aabbcc'

a.object_id
=> 70253388501640

a.replace('hage')

a
=> "hage"

a.object_id
=> 70253388501640
```

### 文字列の連結

異なるエンコーディングの文字列を連結しようとした時にはエラー、異なるエンコーディングだがASCII文字列なら結合可能、なのはもう説明しなくてもいいですよね

#### + メソッド

文字列を結合した新しいオブジェクトを生成する

```ruby
'abc' + 'def'
=> "abcdef"
```

#### \<< concat メソッド

元のオブジェクトを破壊的に追加する

```ruby
a = 'abc'

a.concat('def')

a
=> "abcdef"
```

```ruby
a = 'abc'

a << 'def'

a
=> "abcdef"
```

#### * メソッド

文字列を指定した数値の数だけ繰り返した文字列を生成する

```ruby
'abc' * 5
=> "abcabcabcabcabc"
```

### 大文字、小文字への変換

メソッドの末尾に ! が付いているのは破壊的メソッドであり、レシーバ自体を変更するメソッド、なのはもう説明しなくてもいいですよね

| capitalize | capitalize! |
| upcase     | upcase!     |
| downcase   | downcase!   |
| swapcase   | swapcase!   |

#### capitalize capitalize! メソッド

文字列のアタマだけを大文字に、それ以外を小文字に変換する

```ruby
'aBcDeFg'.capitalize
=> "Abcdefg"
```

#### upcase upcase! downcase downcase! メソッド

文字列を全て大文字、小文字に変換する

```ruby
'aBcDeFg'.upcase
=> "ABCDEFG"

'aBcDeFg'.downcase
=> "abcdefg"
```

#### swapcase swapcase! メソッド

文字列の大文字を小文字に、小文字を大文字に変換する

```ruby
'aBcDeFg'.swapcase
=> "AbCdEfG"
```

### 文字列の先頭や末尾にある空白文字を削除する

| chomp  | chomp!  |
| strip  | strip!  |
| lstrip | lstrip! |
| rstrip | rstrip! |
| chop   | chop!   |

#### chomp chomp! メソッド

- 末尾から改行コードを1つ取り除く
- 文字列を引数として渡すと、その文字を改行コードとみなして処理する
- 空文字を引数として渡すと、複数の改行コードをいっぺんに消す、しかし対象は [\r\n, \n] だけ　←何この挙動あたまおかしい

```ruby
"abcabc\n".chomp
=> "abcabc"

'abcabc'.chomp('bc')
=> "abca"

'abcabc'.chomp('ab')
=> "abcabc"
```

```ruby
"abcabc\n\n".chomp
=> "abcabc\n"

'abcabcc'.chomp('c')
=> "abcabc"

'abcabccc'.chomp('cc')
=> "abcabc"
```

```ruby
"abcabc\n\n".chomp('')
=> "abcabc"

"abcabc\r\n\r\n".chomp('')
=> "abcabc"

"abcabc\r\n\r".chomp('')
=> "abcabc\r\n\r"

"abcabc\r\n\r\n\r\r\n".chomp('')
"abcabc\r\n\r\n\r"
```

正直、文字列の末尾の改行を消したいなら挙動の不審なchompは使うべきじゃなく、こう書くべきなんじゃないかと思うんだがどうだろうか

```ruby
"abc \n abc \r\n abc \r\n\r\r\n".sub(/\R+\z/, '')
=> "abc \n abc \r\n abc "
```

#### strip strip! lstrip lstrip! rstrip rstrip! メソッド

先頭と末尾、先頭、末尾にある空白文字を取り除く

```ruby
"\nabcabc\nabcabc\n".strip
=> "abcabc\nabcabc"

"\nabcabc\nabcabc\n".lstrip
=> "abcabc\nabcabc\n"

"\nabcabc\nabcabc\n".rstrip
=> "\nabcabc\nabcabc"
```

#### chop chop!

末尾の文字を取り除く

```ruby
"abcd".chop
=> "abc"

"abcd".chop.chop
=> "ab"
```

\\r\\n だけは1つの改行として処理される

```ruby
"Hage\r\n".chop
=> "Hage"

"Hage\n".chop
=> "Hage"

"Hage\r".chop
=> "Hage"

"Hage\n\r".chop
=> "Hage\n"
```

### 文字列を逆順にする

#### reverse reverse! メソッド

```ruby
"abcd".reverse
=> "dcba"
```

### 文字列のサイズを取得する

| length   |
| size     |
| count    |
| empty?   |
| bytesize |

#### length size メソッド

文字数を返す　（所謂）全角でも半角でも1文字は1と数える

```ruby
"abcd".length
=> 4

"abcd".size
=> 4
```

#### count メソッド

指定した文字に該当する文字の数を返す

```ruby
"ababa".count('a')
=> 3

"abcdeabcde".count('a-c')
=> 6
```

#### empty? メソッド

文字列が空かどうかを返す

```ruby
''.empty?
=> true

' '.empty?
=> false
```

#### bytesize メソッド

文字列のバイトサイズを返す

```ruby
'a'.bytesize
=> 1

'あ'.bytesize
=> 3

'𠀋'.bytesize # JIS X 0213の第3,4水準漢字の一部がUTF-8で4バイトとなる
=> 4
```

### 文字列の割付

| center |
| ljust  |
| rjust  |

正直、使ったことない

```ruby
'moko'.center(20, '=')
=> "========moko========"

'moko'.ljust(20, '=')
=> "moko================"

'moko'.rjust(20, '=')
=> "================moko"
```

### 非表示文字列を変換する

#### dump メソッド

文字列の中にある改行コードやタブ文字などの非表示文字列をバックスラッシュ記法に置き換えた文字列を返す

```ruby
a = "a\tb\tc\n"

puts a
a	b	c

puts a.dump
"a\tb\tc\n"
```

#### 文字列をアンパックする

- (ﾟДﾟ)ﾊｧ?
- [Array#pack]({% post_url 2017-07-22-Array-Ruby技術者認定試験の書籍写経メモ %}#配列をパックする) メソッドでパックされた文字列を指定されたテンプレートに従ってアンパックします
- MIMEエンコードされた文字列のデコード、バイナリデータから数値への変換等に利用する
- 詳しくは「ぐぐれ」だとさ

本当は以下の様になる筈なのだが、RubyのVerが違うからか、うまくアンパックできなかった。

```ruby
'440r440T4408'.unpack('m')
=> ["\xE3\x83\xAB\xE3\x83\x93\xE3\x83\xBC"]

a = '440r440T4408'.unpack('m').first
=> "\xE3\x83\xAB\xE3\x83\x93\xE3\x83\xBC"

# アンパックされた文字列のエンコードはASCII-8BITになり、エンコーディングを設定してあげなければならない
a.force_encoding('UTF-8')
=> "ルビー"
```

### 文字列内での検索

| include? |
| index    |
| rindex   |
| match    |
| scan     |

#### include? メソッド

指定された文字列を含んでいるか

```ruby
'abcabc'.include?('ca')
=> true
```

#### index メソッド

- 指定された文字列を先頭から探して最初に見つかった位置
- 第2引数で検索開始場所を指定できる
- 正規表現も使える

```ruby
'abc1abc2abc'.index('abc')
=> 0

'abc1abc2abc'.index('abc', 5)
=> 8

'abc1abc2abc'.index(/\d/)
=> 3
```

#### rindex メソッド

- 指定された文字列を末尾から探して最初に見つかった位置
- 第2引数で検索開始場所を指定できる
- 正規表現も使える

```ruby
'abc1abc2abc'.rindex('abc')
=> 8

'abc1abc2abc'.rindex('abc', 3)
=> 0

'abc1abc2abc'.rindex(/\d/)
=> 7
```

#### match メソッド

指定された正規表現によるマッチングを行い、[MatchDataオブジェクト]({% post_url 2017-07-22-Regexp-Ruby技術者認定試験の書籍写経メモ %}#MatchDataオブジェクト)を返す

```ruby
'abc1abc2abc'.match(/[a-c]/)
=> #<MatchData "a">

'abc1abc2abc'.match(/\d/)
=> #<MatchData "1">
```

#### scan メソッド

- 指定された正規表現によるマッチングを行い、マッチした文字列の配列を返す
- 文字列を指定することもできる
- ブロックを渡すこともできる (マッチした文字列をブロックに渡して評価し、全体の戻り値は配列ではなく、自分自身になる)

```ruby
'abc1abc2abc'.scan(/[a-c]/)
=> ["a", "b", "c", "a", "b", "c", "a", "b", "c"]

'abc1abc2abc'.scan('a')
=> ["a", "a", "a"]

'abc1abc2abc'.scan(/\d/) do |match|
  p match.to_i + 5
end
6
7
=> "abc1abc2abc"
```

### 次の文字列

| succ        |
| next        |
| pred は無い |

数字のようにアルファベット順に桁上りが発生したら左の文字が変化する

```ruby
'aa'.succ
=> "ab"

'az'.next
=> "ba"
```

### 文字列に対する繰り返し

| each_line | lines         |
| each_byte | bytes         |
| each_char | chars         |
| upto      | downto は無い |

#### each_line lines メソッド

- 改行文字までを1つ(1行)のデータとして各行毎に処理を繰り返す
- 行の区切り文字を指定する事もできる
- each メソッドも在るようなことも書いてあったが、見つからなかった(？)

```ruby
"a\na".each_line { |a| p a }
=> "a\n"
=> "b"

"a\nbaba".lines('b') { |a| p a }
=> "a\nb"
=> "ab"
=> "a"
```

#### each_byte bytes メソッド

文字列をバイト毎に処理を繰り返す

```ruby
'aあa'.each_byte { |a| p a }
=> 97
=> 227
=> 129
=> 130
=> 97
```

#### each_char char メソッド

文字列を1文字毎に処理を繰り返す

```ruby
'aあa'.chars { |a| p a }
=> "a"
=> "あ"
=> "a"
```

#### upto メソッド

自分自身の文字列から指定された文字列まで、succメソッドで生成される次の文字列を使用して繰り返す

```ruby
'a'.upto('d') { |a| p a }
=> "a"
=> "b"
=> "c"
=> "d"
```

### 他のクラスへの変換

| hex    | 　     |
| oct    | 　     |
| to_f   | 　     |
| to_i   | 　     |
| to_s   | to_str |
| to_sym | intern |

#### hex メソッド

- 文字列が16進数であるとして数値に変換する
- 接頭辞 0x, 0X, _ は無視される
- 変換できない文字がある場合はそれ以降が無視される

```ruby
'f'.hex
=> 15

'0x10'.hex
=> 16
```

#### oct メソッド

- 文字列が8進数であるとして数値に変換する
- 8進数以外の文字も接頭辞に応じて変換してくれる謎機能付き
- 変換できない文字がある場合はそれ以降が無視される

```ruby
'7'.oct
=> 7

'10'.oct
=> 8

'0b10'.oct # 2進数
=> 2

'0x10'.oct # 16進数
=> 16
```

#### to_i メソッド

- 引数を省略すると文字列が10進数であるとして数値に変換する
- 変換できない文字がある場合はそれ以降が無視される
- 引数を渡すとその数字を底としてn進数変換してくれる

```ruby
'1'.to_i
=> 1

nil.to_i
=> 0

''.to_i
=> 0

'0b1'.to_i
=> 0

'0b1'.to_i(2)
=> 1

'0x10'.to_i
=> 0

'0x10'.to_i(16)
=> 16
```

#### to_f メソッド

- 10進数の小数であるとしてFloatオブジェクトに変換する
- 変換できない文字がある場合はそれ以降が無視される

```ruby
'1.23'.to_f
=> 1.23

nil.to_f
=> 0.0

''.to_f
=> 0.0

'0b1'.to_f
=> 0.0

'0x10'.to_f
=> 0.0
```

#### to_s to_str メソッド

自分自身を返す

```ruby
a = 'aa'

a.equal?(a.to_s)
=> true

a.equal?(a.to_str)
=> true
```

#### to_sym intern メソッド

- 文字列に対応するシンボルを返す
- 空文字やヌル文字を含む文字列の場合はArgumentError・・・あれ？落ちないぞ？RubyのVerupで落ちなくなったのかな？


```ruby
'a'.to_sym
=> :a

''.to_sym
=> :""

"\n\t\v".intern
=> :"\n\t\v"
```
