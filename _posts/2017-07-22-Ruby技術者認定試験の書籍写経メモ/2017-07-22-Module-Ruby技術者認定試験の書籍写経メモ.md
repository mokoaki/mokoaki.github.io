## Module クラス

[Ruby技術者認定試験の書籍写経メモ]({% post_url 2017-07-22-Ruby技術者認定試験の書籍写経メモ %})

### 機能をひとまとめにした [モジュール]({% post_url 2017-07-22-クラス、オブジェクト指向、メソッド探索経路-Ruby技術者認定試験の書籍写経メモ %}#mix-in) の為のクラス

- 有用なメソッドが多数定義されている
- クラスのクラスであるClassクラスはこのModuleクラスを継承しているため、全てのクラスでこの有用なメソッドが利用できる

### モジュールを使った機能の追加

[Mix-in]({% post_url 2017-07-22-クラス、オブジェクト指向、メソッド探索経路-Ruby技術者認定試験の書籍写経メモ %}#mix-in) の辺りに書いてあります

### 定数に関するメソッド

| Module.constants        |
| レシーバ.constants      |
| レシーバ.const_defined? |
| レシーバ.const_get      |
| レシーバ.const_set      |
| レシーバ.remove_const   |
| レシーバ.const_missing  |

#### Module.constants メソッド

その時点で定義されている定数一覧を取得する

```ruby
Module.constants
=> [:Integer, :Float] # 大量の配列
```

#### constants メソッド

特定のクラスやモジュールで定義されている定数の一覧を取得する

```ruby
Regexp.constants
=> [:IGNORECASE, :EXTENDED, :MULTILINE, :FIXEDENCODING, :NOENCODING]
```

#### const_defined? メソッド

特定のクラスやモジュールで、指定した定数が定義されているかどうか

```ruby
Regexp.const_defined?(:IGNORECASE)
=> true

Regexp.const_defined?(:HAGE)
=> false
```

#### const_get メソッド

特定のクラスやモジュールの定数の値を取り出す

```ruby
Regexp.const_get(:IGNORECASE)
=> 1

Regexp::IGNORECASE
=> 1
```

#### const_set メソッド

特定のクラスやモジュールの定数の値を設定する

```ruby
Regexp.const_get(:HAGE)
=> NameError: uninitialized constant Regexp::HAGE

Regexp::HAGE
=> NameError: uninitialized constant Regexp::HAGE

Regexp.const_set(:HAGE, true)

Regexp.const_get(:HAGE)
=> true

Regexp::HAGE
=> true
```

#### remove_const メソッド

- 特定のクラスやモジュールの定数を取り除く
- privateメソッド

クラスメソッドから自らの定数を消させる

```ruby
class Moko
  HAGE = true

  class << self
    def remove
      remove_const(:HAGE)
    end
  end
end

Moko.const_get(:HAGE)
=> true

Moko::HAGE
=> true

Moko.remove
=> true

Moko.const_get(:HAGE)
=> NameError: uninitialized constant Moko::HAGE

Moko::HAGE
=> NameError: uninitialized constant Moko::HAGE
```

sendメソッドから無理やり定数を消す

```ruby
class Moko
  HAGE = true
end

Moko.const_get(:HAGE)
=> true

Moko::HAGE
=> true

Moko.send(:remove_const, :HAGE)
=> true

Moko.const_get(:HAGE)
=> NameError: uninitialized constant Moko::HAGE

Moko::HAGE
=> NameError: uninitialized constant Moko::HAGE
```

#### const_missing メソッド

- 継承チェーンを駆け上った末のBasicObjectでも定数が見つからない場合、呼び出し元のオブジェクトの#const_missingが呼び出される
- この#const_missingも継承チェーンを駆け上り、BasicObject#const_missingまで到達すると例外NameErrorが発生する
- 各クラスのconst_missingメソッドをオーバーライドする事で、継承チェーン全てをチェックしてもメソッドが見つからない場合の動作をフックすることができる

```ruby
class Moko
  class << self
    def const_missing(const_name)
      p const_name
      return 'hage-!'
    end
  end
end

Moko::Hoge
:Hoge
=> "hage-!"
```

### メソッドを設定する

#### インスタンスメソッドの一覧を取得

| instance_methods           |
| public_instance_methods    |
| protected_instance_methods |
| private_instance_methods   |

[オブジェクトが持つインスタンスメソッドインスタンス変数]({% post_url 2017-07-22-クラス、オブジェクト指向、メソッド探索経路-Ruby技術者認定試験の書籍写経メモ %}#オブジェクトが持つインスタンスメソッドインスタンス変数を確認する)

#### メソッドの可視性の変更

| public    |
| protected |
| private   |

[メソッドの可視性]({% post_url 2017-07-22-クラス、オブジェクト指向、メソッド探索経路-Ruby技術者認定試験の書籍写経メモ %}#メソッドの可視性)

#### アクセッサメソッド

| attr_reader  |
| attr_writer  |
| attr_ccessor |
| attr         |

[アクセッサメソッド]({% post_url 2017-07-22-クラス、オブジェクト指向、メソッド探索経路-Ruby技術者認定試験の書籍写経メモ %}#アクセッサメソッドの生成を行うメソッド)

#### メソッドの別名を定義する

| alias_method |

- [メソッドに別名を付ける]({% post_url 2017-07-22-クラス、オブジェクト指向、メソッド探索経路-Ruby技術者認定試験の書籍写経メモ %}#メソッドに別名を付ける)
- alias との違いは、aliasは予約語であり直接メソッドを指定できるのに対し、alias_method メソッドでありメソッド名を文字列で指定できる事

正直、その違いだけならどっちでもいいや！と思う

```ruby
class Moko1
  def zura
    p true
  end

  alias hage zura
  # alias :hage :zura #これでもいい
end

Moko1.new.hage
=> true
```

```ruby
class Moko2
  def zura
    p true
  end

  alias_method :hage, :zura
  # alias_method 'hage', 'zura' # これでもいい
end

Moko2.new.hage
=> true
```

こんな風に使うんかねー？

```ruby
class Oyaji
  def method1
    'oyaji'
  end
end

class Moko < Oyaji
  alias_method :original_method, :method1

  def method1
    'moko ' + original_method
  end
end

Moko.new.method1
=> "moko oyaji"
```

### 評価する

| eval          | 現在のコンテキストで評価します                 |
| module_eval   | 指定したモジュールのコンテキストで評価します   |
| class_eval    | 指定したクラスのコンテキストで評価します       |
| instance_eval | 指定したオブジェクトのコンテキストで評価します |

**module_evalメソッドはclass_evalの別名です**

#### 文字列をRubyコードとして評価する

```ruby
eval('Regexp')
=> Regexp
end
```

```ruby
Regexp.class_eval('IGNORECASE')
=> 1
```

```ruby
a = /moko/i

a.instance_eval('inspect')
=> "/moko/i"
```

#### ブロックをクラス定義やモジュール定義の中のコードであるように実行する

例えばこの例はインスタンスメソッドになる

```ruby
//.hage
=> NoMethodError: undefined method 'hage'

Regexp.class_eval do
  def hage
    'hage-!'
  end
end

//.hage
=> "hage-!"
```

例えばこの例は特異メソッドになる

```ruby
a = //

a.instance_eval do
  def hage
    'hage-!'
  end
end

a.hage
=> "hage-!"

//.hage
=> NoMethodError: undefined method 'hage' for //:Regexp
```

### 引数を渡して評価したい

| module_exec   | 指定したモジュールのコンテキストで評価します   |
| class_exec    | 指定したクラスのコンテキストで評価します       |
| instance_exec | 指定したオブジェクトのコンテキストで評価します |

**module_execメソッドはclass_execの別名です**

#### ブロックをクラス定義やモジュール定義の中のコードであるように実行する with 引数

こんな使い方はしないと思います、無理矢理な例でスンマセン

```ruby
//.hage
=> NoMethodError: undefined method 'hage'

Regexp.class_exec(10) do |num|
  @@test = num

  def hage
    "hage#{@@test}"
  end
end

//.hage
=> "hage10"
```

```ruby
a = //

a.instance_exec(10) do |num|
  @test = num

  def hage
    "hage#{@test}"
  end
end

a.hage
=> "hage10"

//.hage
=> NoMethodError: undefined method 'hage' for //:Regexp
```

### クラス変数を扱う

| class_variables         |
| class_variable_defined? |
| class_variable_get      |
| class_variable_set      |
| remove_class_variable   |

#### class_variables メソッド

クラス変数の一覧を取得

```ruby
class Moko
  @@homo = true
  @@hage = true
end

Moko.class_variables
=> [:@@homo, :@@hage]
```

#### class_variable_defined? メソッド

指定されたクラス変数が定義されているかどうか

```ruby
class Moko
  @@homo = true
  @@hage = true
end

Moko.class_variable_defined?(:@@homo)
=> true

Moko.class_variable_defined?(:@@test)
=> false
```

#### class_variable_get メソッド

指定されたクラス変数を取得

```ruby
class Moko
  @@homo = true
  @@hage = true
end

Moko.class_variable_get(:@@homo)
=> true

Moko.class_variable_get(:@@test)
=> NameError: uninitialized class variable @@test in Moko
```

#### class_variable_set メソッド

指定されたクラス変数を設定

```ruby
class Moko
  @@homo = true
  @@hage = true
end

Moko.class_variable_get(:@@test)
=> NameError: uninitialized class variable @@test in Moko

Moko.class_variable_set(:@@test, true)

Moko.class_variable_get(:@@test)
=> true

Moko.class_variables
=> [:@@homo, :@@hage, :@@test]
```

#### remove_class_variable メソッド

指定されたクラス変数を取り除く

```ruby
class Moko
  @@homo = true
  @@hage = true
end

Moko.class_variables
=> [:@@hage, :@@homo]

Moko.remove_class_variable(:@@homo)

Moko.class_variables
=> [:@@hage]
```

### モジュールの機能を取り込む

| include          |
| extend           |
| included         |
| extended         |
| include?         |
| included_modules |
| autoload         |
| autoload?        |

#### include メソッド

- 指定されたモジュールに対応する無名クラスを作成し、自分のクラスとスーパークラスとの間に組み入れる
- メジャーな使い方としてはインスタンスメソッド追加
- 詳しくは [Mix-in]({% post_url 2017-07-22-クラス、オブジェクト指向、メソッド探索経路-Ruby技術者認定試験の書籍写経メモ %}#mix-in)

#### extend メソッド

- 指定されたモジュールに対応する特異クラスを作成し、自分と自分のクラスの間に組み入れる
- メジャーな使い方としては特異メソッド追加
- 詳しくは [extendメソッド]({% post_url 2017-07-22-クラス、オブジェクト指向、メソッド探索経路-Ruby技術者認定試験の書籍写経メモ %}#extendメソッド)

#### included メソッド

- モジュールがincludeされた後に自動的に実行されるメソッド
- includeされたらついでにmodule内に定義されたモジュールをextendしてクラスメソッドも同時に追加する、みたいな例がぐぐったらあった

```ruby
module Module1
  class << self
    def included(object)
      p "#{object} #{object.class}"
    end
  end
end

class Moko
  include Module1
end
=> "Moko Class"
```

#### extended メソッド

モジュールがextendされた後に自動的に実行されるメソッド

```ruby
module Module1
  class << self
    def extended(object)
      p "#{object} #{object.class}"
    end
  end
end

class Moko
  extend Module1
end
=> "Moko Class"
```

#### include? メソッド

モジュールがincludeされているかどうか

```ruby
module Module1
end

class Moko
  include Module1
end

Moko.include?(Module1)
=> true
```

#### included_modules メソッド

- クラスやモジュールがincludeしているモジュールの一覧を配列で取得
- スーパークラスがincludeしているモジュールも配列に含まれる

```ruby
module Module1
end

class Moko
  include Module1
end

Moko.included_modules
=> [Module1, Kernel]
```

#### autoload メソッド

未定義の定数が参照された時に移動的に特定のファイルをロードするように設定する

この段落は "./module.rb" が存在する、という前提で書かれています

```ruby
module Module1
  def hage
    'hage-!'
  end
end
```

- Module1が参照されたら './module.rb' を読み込むように設定
- 直後にincludeにてModule1を参照、autoloadにより './module.rb' が自動ロードされ、モジュールが定義され、includeされる
- Moko.new.hageメソッドが呼び出される

```ruby
class Moko
  autoload(:Module1, './module.rb')
  include Module1
end

Moko.new.hage
=> "hage-!"
```

#### autoload? メソッド

指定した定数がオートロード対象でまだロードされていない場合はそのパスを、オートロード後やオートロード対象ではない時にはnilを返す

- :Module1がオートロード対象かどうか表示、オートロード対象ではない為、nil が表示される
- Module1が参照されたら './module.rb' を読み込むようにオートロードを設定する
- :Module1がオートロード対象かどうか表示、オートロード対象の為 "./module.rb" が表示される
- Moko.new.hageメソッドが呼び出されるが、Module1がincludeされていない為にメソッドが見つからない
- :Module1がオートロード対象かどうか表示、オートロード対象の為 "./module.rb" が表示される
- includeにてModule1を参照、autoloadにより './module.rb' が自動ロードされ、モジュールが定義され、includeされる
- :Module1がオートロード対象かどうか表示、既にオートロードされている為 nil が表示される
- Moko.new.hageメソッドが呼び出される

```ruby
class Moko
  p autoload?(:Module1)
  autoload(:Module1, './module.rb')
  p autoload?(:Module1)
end
=> nil
=> "./module.rb"

Moko.new.hage
=> NoMethodError: undefined method 'hage'

class Moko
  p autoload?(:Module1)
  include Module1
  p autoload?(:Module1)
end
=> "./module.rb"
=> nil

Moko.new.hage
=> "hage-!"
```

- "const_missing Module1" が表示されずに、Moko.new.hageの実行に成功したという事は、Module1がオートロードされて問題なくincludeされた、という事
- "const_missing Module2" が表示された、という事は、Module2が見つからないのでconst_missingが呼び出された、という事
- 以上の事から、先にautoloadが働き、オートロード後に定数が見つからなければconst_missingが呼び出される、という事

```ruby
class Moko
  def self.const_missing(const_name)
    p "const_missing #{const_name}"
  end

  autoload(:Module1, './module.rb')

  include Module1
  include Module2
end
=> "const_missing Module2"

Moko.new.hage
=> "hage-!"
```

### モジュール関数

#### まずは、モジュール関数とはなんぞや？

組み込みライブラリのMathモジュールは、モジュールのメソッドを直接呼んでもいいし、includeしてメソッドを呼び出してもいい。こういうメソッドの事をモジュール関数といいます

```ruby
Math.sqrt(2)
=> 1.4142135623730951

# sqrt(2)
# => NoMethodError: undefined method 'sqrt'

include Math
=> Object

sqrt(2)
=> 1.4142135623730951
```

#### モジュール関数はどうやって作る？

まずは、includeしてからmethod_nameを呼び出すには　普通にこうしますよね

```ruby
module ModuleName
  def method_name
    true
  end
end

include ModuleName

method_name
=> true
```

ModuleName.method_name でモジュールのメソッドをインスタンス化することなく呼び出したいなら

```ruby
module ModuleName
  class << self
    def method_name
      true
    end
  end
end

ModuleName.method_name
=> true
```

上記の2つを同時にやりたいなら　こうですね

```ruby
module ModuleName
  class << self
    def method_name
      true
    end
  end

  def method_name
    true
  end
end

ModuleName.method_name
=> true

# method_name
# => NameError: undefined local variable or method `method_name'

include ModuleName

method_name
=> true
```

DRYじゃねえ！これは絶対失敗だ

#### module_function メソッド

- モジュール内で使用可能
- module_function :method_name のようにメソッド名を続けて呼び出すとそのメソッドがモジュール関数になる
- module_function を引数なしで呼び出すとインスタンスメソッドが定義されるたびにモジュール関数になる
- モジュール関数となったメソッドは
  - privateになる
  - 同名の特異メソッドが定義される

#### モジュール関数を作る

これだけ！

```ruby
module ModuleName
  module_function

  def method_name
    true
  end
end

ModuleName.method_name
=> true

# method_name
# NameError: undefined local variable or method 'method_name'

include ModuleName

method_name
=> true
```

#### Module.ancestors メソッド

- 継承チェーンを配列で返す
- 特異クラスは配列に含まれない
- includeしたモジュールは配列に含まれる
- extendしたモジュール（特異クラス）は配列に含まれない
- \[自分, 自分#included_module, 親, 親#included_module, Object, Kernel, BasicObject\] のような感じの配列になる

```ruby
module OyajiModule1
end

module OyajiModule2
end

class Oyaji
  include OyajiModule1
  extend  OyajiModule2
end

module MokoModule1
end

module MokoModule2
end

class Moko < Oyaji
  include MokoModule1
  extend  MokoModule2
end

Moko.ancestors
=> [Moko, MokoModule1, Oyaji, OyajiModule1, Object, Kernel, BasicObject]
```
