## ruby-build Verup

- Homebrewをアップデート

[Homebrew_verup]({% post_url 2017-09-29-homebrew_verup %})

- rbenv インストール可能Ver一覧

```sh
$ rbenv install --list
```

- ruby install

```sh
$ MAKE_OPTS="-j $(sysctl -n hw.ncpu)" CONFIGURE_OPTS="--disable-install-doc" rbenv install 2.3.4 -v
# (memo) MAKE_OPTS="-j 4" CONFIGURE_OPTS="--disable-install-doc" rbenv install 2.3.5 -v
```

- インストールされているruby一覧

```ruby
$ rbenv versions
```

- ruby Ver 確定

```sh
$ rbenv global 2.2.0
```

- ruby Ver 確認

```sh
$ ruby -v
```

- メモ 削除

```sh
$ rbenv uninstall 2.1.2
```

- 参考

あれ・・？どこだっけ
