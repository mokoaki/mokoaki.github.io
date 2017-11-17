## Node.js verup

- nodebrewをアップデート

[2017-09-29-nodebrew_verup]({% post_url 2017-09-29-nodebrew_verup %})

- node ver確認

```sh
$ node -v
```

- npm ver確認

```sh
$ npm --version
```

- npm verup

```sh
$ npm update -g npm
```

- package.jsonを見てverupの必要があるかとか確認

```sh
$ npm outdated
```

- package.jsonを見てverupする

update じゃないんだ・・？

```sh
$ npm install
```

- package.jsonを見てインスコされているパッケージを確認する

深さも指定できる

```sh
$ npm list --depth=0
```

- 参考

あれ・・？どこだっけ
