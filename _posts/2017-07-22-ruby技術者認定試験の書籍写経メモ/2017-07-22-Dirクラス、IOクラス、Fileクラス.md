## Dirクラス IOクラス Fileクラス

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-ruby技術者認定試験の書籍写経メモ %})

## Dirクラス

ディレクトリの移動、作成、ファイル一覧など、ディレクトリを扱うクラス

### ディレクトリを開く

それは ディレクトリクラスのインスタンスを取得する という事

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

## IOクラス

ファイルやプロセスなどの入出力を扱うクラス

## Fileクラス

IOクラスの子クラスであり、ファイルの読み取り、書き込み、新規作成、削除などファイルを扱うクラス























a
