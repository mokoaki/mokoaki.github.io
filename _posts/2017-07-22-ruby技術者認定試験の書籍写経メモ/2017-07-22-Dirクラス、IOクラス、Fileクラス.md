## Dirクラス IOクラス Fileクラス

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-ruby技術者認定試験の書籍写経メモ %})

## Dirクラス

ディレクトリの移動、作成、ファイル一覧など、ディレクトリを扱うクラス

### ディレクトリを開く

それは Dirクラスのインスタンスを取得する という事

```ruby
dir = Dir.open('/usr/local/bin')
=> #<Dir:/usr/local/bin>
```

#### ファイル一覧の取得

```ruby
dir = Dir.open('/usr/local/bin')

dir.each do |path|
  p path
end
# 大量のパスが表示される
```

#### 開いたパスはちゃんと閉じる

Dir以外でも言える事だとは思うが、パスの開きっぱなしはファイルディスクリプタがどうのとか、絶対によろしくないのでちゃんと閉じる

```ruby
dir = Dir.open('/usr/local/bin')

dir.close
```

ていうか、Dir#openメソッドはブロックを取ることができ、ブロックが終了したら自動的にcloseしてくれるので、それ以外の書き方は積極的に使う理由がない場合は使わないようにしましょう

```ruby
Dir.open('/usr/local/bin') do |dir|
  dir.each do |path|
    p path
  end
  # 大量のパスが表示される
end
```

### カレントディレクトリの取得

```ruby
Dir.pwd
=> "/Users/mokoaki"

Dir.getwd
=> "/Users/mokoaki"
```

#### カレントディレクトリを移動する

#### Dir.chdir メソッド

- カレントディレクトリを引数で指定したディレクトリに変更する
- 指定がない場合、環境変数HOME, LOGDIRが設定されていればそのディレクトリに移動する
- ブロックが渡された場合は、ブロック終了時に元のディレクトリに戻る

```ruby
Dir.chdir('/Users/mokoaki')
=> 0

Dir.pwd
=> "/Users/mokoaki"

Dir.chdir('/usr/local/bin') do |_dir|
  p Dir.pwd
end
=> "/usr/local/bin"

Dir.pwd
=> "/Users/mokoaki"
```

#### ディレクトリの作成

適当にこんな感じだよくらいで

```ruby
Dir.mkdir('ディレクトリパス')

Dir.mkdir('ディレクトリパス', 0755)
```

### ディレクトリの削除

適当にこんな感じだよくらいで

```ruby
Dir.rmdir('ディレクトリパス')
Dir.unlink('ディレクトリパス')
Dir.delete('ディレクトリパス')
```

## Fileクラス

IOクラスの子クラスであり、ファイルの読み取り、書き込み、新規作成、削除などファイルを扱うクラス

### ファイルを開く

- File.new, File.open でファイルが開く事ができる
- それは Fileクラスのインスタンスを取得する という事
- File#read でファイル内容を読み込む
- もちろんcloseを忘れずに

```ruby
file = File.new('README.txt')

file.read
=> "aaaaaaa"

file.close
```

もちろんブロックが使えるので、以降はブロックを使ってclose忘れが無いようにしましょう

```ruby
File.open('README.txt') do |file|
  p file.read
end
=> "aaaaaaa"
```

#### ファイルを開く時のモード

File.open 時の第2引数はモードを指定できます

| "r"  | 読み込みモード | デフォルト                                                     |
| "w"  | 書き込みモード | 既存ファイルは上書き                                           |
| "a"  | 追記モード     | 書き込み位置はファイルの末尾                                   |
| "r+" | 読み書きモード | 読み書き位置はファイルの最初から                               |
| "w+" | 読み書きモード | 読み書き位置はファイルの最初から　既存ファイルは上書き         |
| "a+" | 読み書きモード | 読み込み位置はファイルの最初から　書き込み位置はファイルの末尾 |

モードの後ろに読み込み時のエンコーディング、内部処理のエンコーディングを指定できる

```ruby
# 外部（読み込むファイル）はshift_jis
# 内部処理はUTF-8
# のような指定ができる

# file = File.open('shift_jis.txt', 'r:shift_jis:utf-8')

# file.read
# => "UTF-8の文字列"
```

ファイルに書き込む時にも同様な指定ができる

```ruby
# 外部（書き込むファイル）はshift_jis
# 内部処理はEUC-JP
# のような指定ができる

# file = File.open('shift_jis.txt', 'w+:shift_jis:euc-jp')

# file.write("EUC-JPからSHIFT_JISへ変換される文字列".encode('euc-jp'))

# file.read
# => "EUC-JPからSHIFT_JISへ変換される文字列" # shift_jisに変換されて書き込まれる
```

#### ファイルに書き込む

もう上記しちゃいましたけど File#write でファイルに書き込めます。

他にも同じようなメソッドはあるので [IO](#write) 辺りで説明します

```ruby
file.write('書き込みたい内容')
```

#### 入出力時のエンコーディング

詳しくは [IO](#エンコーディング) の辺りで説明します

```ruby
Encoding.default_external
=> #<Encoding:UTF-8>

File.open('README.txt') do |file|
  p file.read.encoding
end
=> #<Encoding:UTF-8>
```

#### ファイルの内容を読み込む他のメソッド

File#read 以外にも gets readlines メソッドなどがあります、
[IO](#エンコーディング) の辺りで説明します

#### ファイルの属性を取得する













## IOクラス

ファイルやプロセスなどの入出力を扱うクラス























a
