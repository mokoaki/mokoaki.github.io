## Dirクラス IOクラス Fileクラス

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-ruby技術者認定試験の書籍写経メモ %})

- この辺りは駆け足で進みます
- 書籍もおざなりな説明で理解が進まない悔しい
- 中の人も同じ気持ちなんだとは思う

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

### ファイルに書き込む

もう上記しちゃいましたけど File#write でファイルに書き込めます。

他にも同じようなメソッドはあるので [IO](#ioへの出力) 辺りで説明します

```ruby
file.write('書き込みたい内容')
```

### 入出力時のエンコーディング

詳しくは [IO](#エンコーディング) の辺りで説明します

```ruby
Encoding.default_external
=> #<Encoding:UTF-8>

File.open('README.txt') do |file|
  p file.read.encoding
end
=> #<Encoding:UTF-8>
```

### ファイルの内容を読み込む他のメソッド

File#read 以外にも gets readlines メソッドなどがあります、
[IO](#エンコーディング) の辺りで説明します

### ファイルの属性を取得する

クラスメソッドとインスタンスメソッド、どっちにもあったりする。評価結果は同一

| File.path(path)     | フルパスを取得                                            |
| File.basename(path) | ファイル名を取得                                          |
| File.dirname(path)  | ディレクトリ名を取得                                      |
| File.extname(path)  | 拡張子を取得                                              |
| File.split(path)    | ディレクトリ名とファイル名の配列を取得                    |
| File.stat(path)     | ファイルの属性を示す File::Statクラスのオブジェクトを返す |
| File.lstat(path)    | ファイルの属性を示す File::Statクラスのオブジェクトを返す |
| File.atime(path)    | 最終アクセス時刻                                          |
| File.ctime(path)    | 状態が変更された時間                                      |
| File.mtime(path)    | 最終更新時刻                                              |

| file#path  | ファイルのフルパスを取得                                  |
| file#stat  | ファイルの属性を示す File::Statクラスのオブジェクトを返す |
| file#lstat | ファイルの属性を示す File::Statクラスのオブジェクトを返す |
| file#atime | 最終アクセス時刻                                          |
| file#ctime | 状態が変更された時間                                      |
| file#mtime | 最終更新時刻                                              |

他にもメソッドはいっぱいある

### ファイルの属性を設定する

| File.chmod(path) | ファイルのパーミッション変更 |
| File.chown(path) | ファイルの所有者変更         |

| file#chmod | ファイルのパーミッション変更 |
| file#chown | ファイルの所有者変更         |

他にもメソッドはいっぱいある

### ファイルの最終アクセス時刻、更新時刻を設定する

これはFileのクラスメソッドを使います（おそらく他にもある）

```ruby
File.utime(Time.now, Time.now, 'README.txt')
```

### ファイルをテストする

- 存在確認、ディレクトリなのかファイルなのかの判定などたくさんのメソッドがあります
- これらは FileTestモジュールのメソッドと同じものです リファレンスに一度目を通しておくといいでしょう
- 同じメソッドが別のクラスから使える、と言うのは逆に言うと、今どのクラスのメソッドを使っているのか迷子になりそうだと言うことです

| File.exists?(path)     | パスが存在しているかどうか |
| File.file?(path)       | ファイルかどうか           |
| File.directory?(path)  | ディレクトリかどうか       |
| File.symlink?(path)    | シンボリックリンクかどうか |
| File.executable?(path) | 実行可能かどうか           |
| File.readable?(path)   | 読み取り可能かどうか       |
| File.writable?(path)   | 書き込み可能かどうか       |
| File.size(path)        | ファイルサイズ             |


| FileTest.exists?(path)     | パスが存在しているかどうか |
| FileTest.file?(path)       | ファイルかどうか           |
| FileTest.directory?(path)  | ディレクトリかどうか       |
| FileTest.symlink?(path)    | シンボリックリンクかどうか |
| FileTest.executable?(path) | 実行可能かどうか           |
| FileTest.readable?(path)   | 読み取り可能かどうか       |
| FileTest.writable?(path)   | 書き込み可能かどうか       |
| FileTest.size(path)        | ファイルサイズ             |

しかも、他にもメソッドはいっぱいある

### ファイルのパスを絶対パスに展開する

カレントからの相対位置を絶対パスに変換するって事かね？

```ruby
File.expand_path('README.txt')
=> 'full_path/README.txt'
```

### ファイルを削除する

| File.delete(path)|
| File.dunlink(path)|

### ファイルを切り詰める

fileオブジェクトのインスタンスメソッドにもあるようです

| File.truncate(path, 0) |
| file#truncate(0)       |

### ファイル名をリネームする

| File.rename('README.txt', 'README.md') |

### ファイルをロックする

| file#flock(File::LOCK_EX) |

ぶっちゃけ、システムに依存してるらしく、「ぐぐれ」だそうです

## IOクラス

- ファイルやプロセスなどの基本的な入出力を備えたクラス
- STDIN(標準入力) STDOUT(標準出力) STDERR(標準エラー出力) もこのIOクラスのオブジェクト
- Fileクラスのスーパークラスでもあります

### IOを開く

- 「ファイルを開くにはKernelモジュールのopenメソッドを使います」
- 「IO.openメソッドでも同様にファイルを開くことができます」

どれを使えばいいのよ・・そしてIO.openはエラーになるんだけど・・

- モードやエンコーディングを指定したい時は [このあたり](#ファイルを開く時のモード) を参照

```ruby
path = 'README.txt'

open(path)
=> #<File:/Users/mokoaki/.../README.md>

Kernel.open(path)
=> #<File:/Users/mokoaki/.../README.md>

File.open(path)
=> #<File:/Users/mokoaki/.../README.md>

IO.open(path)
=> TypeError: no implicit conversion of String into Integer
```

### IOクラスを使ってコマンドの実行結果を得る

- openメソッドで | に続いてコマンドを指定するとコマンドの出力結果を得ることができる
- IOオブジェクトが返る
- IOオブジェクトを読むにはreadメソッド
- 入力のエンコーディングが設定されていない場合は Encoding.default_external が使用される

```ruby
io = open('| pwd')
=> #<IO:fd 16>

io_read = io.read
=> "/Users/mokoaki\n"

io_read.encoding
=> #<Encoding:UTF-8>
```

### IOオブジェクトに書き込む

には、writeメソッドを使う

```ruby
STDOUT.write('123456789')
123456789=> 9
```

### IOオブジェクトを閉じる

```ruby
io = open('| pwd')
io.close
```

ていうか、閉じ忘れ防止の為にブロック使ってね

```ruby
open('| pwd') do |io|
  io.read
end
```

### パイプを開く

- IO.popenメソッドを使うとコマンドをサブプロセスとして実行し、そのプロセスと入出力のパイプを開く事ができます

お、おう、動かないんですけど・・

```ruby
IO.popen('grep -i ruby') do |io|
  io.write('I am a ruby process')
  io.close_write

  p io.read
end
```

- close_write メソッドは書き込み用のIOを閉じるメソッド
- close_read メソッドは読み込み用のIOを閉じるメソッド

### あぁ、辛い

### IOからの入力

| IO.read       | io#read     |               |
| IO.foreach    | io#each     | io#each_lines |
| io#readlines  |             |               |
| io#readline   | io#gets     |               |
| io#each_byte  |             |               |
| io#getbyte    | io#readbyte |               |
| io#each_char  |             |               |
| io#getc       | io#readchar |               |

- readメソッドで長さを指定したときのみバイナリ読み込みとなる為、エンコーディングがASCII-8BITとなる
- それ以外は
  - IOオブジェクトに内部エンコーディングが指定されているなら外部エンコーディングから内部エンコーディングへ変換される
  - IOオブジェクトに内部エンコーディングが指定されていないなら外部エンコーディングが内部エンコーディングで使用される
- IO.read とio#read は共にIOから内容を読み込みます。長さが指定されているならその長さだけ読み込みます

#### read メソッド

```ruby
IO.read(path, 10).encoding
=> #<Encoding:ASCII-8BIT>
```

#### IO.foreach io#each io#each_lines メソッド

1行毎にブロックに渡して評価する

```ruby
IO.foreach(path) do |line|
  p line
end

open(path) do |io|
  io.each do |line|
    p line
  end
end
```

#### io#readlines メソッド

各行を直接配列で取得

```ruby
open(path) do |io|
  io.readlines
end
```

#### io#readline io#gets メソッド

メソッド実行の度に1行読み込む

```ruby
open(path) do |io|
  io.readline #=> "1行目"
  io.readline #=> "2行目"
end
```

#### io#each_byte メソッド

1バイト毎にブロックに渡して評価する

```ruby
open(path) do |io|
  io.each_byte do |byte|
    p byte
  end
end
```

#### io#getbyte io#readbyte メソッド

メソッド実行の度に1バイト読み込む

```ruby
open(path) do |io|
  io.getbyte #=> "1バイト目"
  io.getbyte #=> "2バイト目"
end
```

#### io#each_char メソッド

1文字毎にブロックに渡して評価する

```ruby
open(path) do |io|
  io.each_char do |char|
    p char
  end
end
```


#### io#getc io#readchar メソッド

メソッド実行の度に1バイト読み込む

```ruby
open(path) do |io|
  io.getc #=> "1文字目"
  io.getc #=> "2文字目"
end
```

### 空ファイルやEOFになった時の振る舞い

上記の読み込みメソッド達は同じような処理内容で名前が違うメソッドがありますが、ファイル末端に達したときや空ファイルだった時の振る舞いが違ったりします

| IO.read      |              | 空ファイルの場合は "" 長さが指定されている場合は nil |
| IO.readlines |              | 空ファイルの場合は []                                |
| IO.foreach   |              | ブロックが実行されない                               |
| io#each      | io#each_byte | EOFであれば何もしない                                |
| io#getc      | io#gets      | nil                                                  |
| io#read      |              | 長さが指定されている場合は nil されていない場合は "" |
| io#readchar  | io#readline  | EOFErrorが発生                                       |
| io#readlines |              | []                                                   |
| io#getbyte   |              | nil                                                  |
| io#readbyte  |              | EOFErrorが発生                                       |

こんなん暗記するのは無理

### IOへの出力

| write  |
| puts   |
| print  |
| printf |
| putc   |
| \<<    |
| flush  |






a
