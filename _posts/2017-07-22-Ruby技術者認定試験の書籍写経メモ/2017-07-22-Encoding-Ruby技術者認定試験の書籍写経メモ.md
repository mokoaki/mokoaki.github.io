## Encoding エンコーディング

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-Ruby技術者認定試験の書籍写経メモ %})

### エンコーディング情報を扱うクラス、この情報はStringクラスだけじゃなく、IOクラスでも使ったりする

### 主なエンコーディング

```ruby
Encoding.constants
=> [...] # いっぱい出る
```

| Encoding::UTF-8       | UTF-8                                                                            |
| Encoding::EUC_JP      | EUC-JP 今どき使ってる人居んの？                                                  |
| Encoding::ISO_2022_JP | JIS Rubyではダミーらしい                                                         |
| Encoding::Shift_JIS   | SHIFT_JIS                                                                        |
| Encoding::Windows_31J | Shift_JISの亜種 CP932とも言う Encoding::CP932 でも参照可能                       |
| Encoding::ASCII       | US-ASCII Encoding::US_ASCII でも参照可能                                         |
| Encoding::ASCII_8BIT  | ASCII互換 文字コードを持たないデータ、単なるバイト列として扱いたい場合に利用する |

#### 規定の外部エンコーディング

入出力における、規定の外部エンコーディング。何も指定されてければUTF-8としてファイルを読んだりするよ

```ruby
Encoding.default_external
=> #<Encoding:UTF-8>
```

### エンコーディングの互換性

互換性があればエンコーディングを、互換性がない場合はnil

```ruby
Encoding.compatible?(Encoding::UTF_8, Encoding::US_ASCII)
=> #<Encoding:UTF-8>

Encoding.compatible?(Encoding::UTF_8, Encoding::Shift_JIS)
=> nil
```

互換性のあるエンコーディングの場合は文字列を結合できる

```ruby
'もこ' + 'もこ'
=> "もこもこ"

'もこ' + 'もこ'.encode('EUC-JP')
=> incompatible character encodings: UTF-8 and EUC-JP (Encoding::CompatibilityError)
```

どちらか一方がASCII文字列しか含んでいないのであればエンコーディングに互換性がなくとも結合できる

```ruby
'もこ' + 'love'.encode('EUC-JP')
=> "もこlove"
```
