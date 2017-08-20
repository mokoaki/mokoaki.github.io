## 例外 Exception

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-ruby技術者認定試験の書籍写経メモ %})

- 全ての例外のスーパークラス
- エラー発生時やraiseした場合にこのクラスのオブジェクトが生成される

### 自作の例外クラスを作る

```ruby
class MyError < RuntimeError; end

begin
  raise MyError
rescue => e
  p e
end
```

### 例外オブジェクトを生成するには、newメソッドかexceptionメソッドを使います

エラーメッセージを指定することができる

```ruby
class MyError < RuntimeError; end

begin
  raise MyError.new('hage-!')
rescue => ex
  p ex
end
```

```ruby
class MyError < RuntimeError; end

begin
  raise MyError.exception('hage-!')
rescue => ex
  p ex
end
#<MyError: hage-!>
```

結果は一緒に思えるんだけど、何が違うのか、どれを使うのがナウいのか分からん

| raise MyError, 'hage-!'           |
| raise MyError.new('hage-!')       |
| raise MyError.exception('hage-!') |

なんとなくnewでいいかなーとは思ってるんだけど

```ruby
raise MyError
MyError: hage-!

raise MyError.new
MyError: hage-!

raise MyError.exception
MyError: hage-!
```

### 例外オブジェクトに設定されているメッセージの取得

exception#message exception#to_s メソッドで取得ができる

```ruby
class MyError < RuntimeError; end

begin
  raise MyError.exception('hage-!')
rescue => ex
  p ex.message
  p ex.to_s
end
"hage-!"
"hage-!"
```

### 例外オブジェクトのバックトレースの取得

exception#backtrace メソッドで配列で取得ができる

```ruby
class MyError < RuntimeError; end

begin
  raise MyError.exception('hage-!')
rescue => ex
  p ex.backtrace
end
=> ["(irb):......."] # 大量の配列
```

### バックトレースの設定

それまでのバックトレースは上書きされてしまう

```ruby
class MyError < RuntimeError; end

begin
  raise MyError.exception('hage-!')
rescue => ex
  ex.set_backtrace('backtrace 1')
  p ex.backtrace
end
=> ["backtrace 1"]
```

```ruby
class MyError < RuntimeError; end

begin
  raise MyError.exception('hage-!')
rescue => ex
  ex.set_backtrace(['backtrace 1', 'backtrace 2'])
  p ex.backtrace
end
=> ["backtrace 1", "backtrace 2"]
```

```ruby
class MyError < RuntimeError; end

begin
  raise MyError.exception('hage-!')
rescue => ex
  ex.set_backtrace(['backtrace 1', 'backtrace 2'] + ex.backtrace)
  p ex.backtrace
end
=> ["backtrace 1", "backtrace 2", "(irb):......."] # 大量の配列
```
