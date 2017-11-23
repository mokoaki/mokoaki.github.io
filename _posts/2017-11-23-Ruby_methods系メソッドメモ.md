## Ruby methods系メソッドメモ

まとめないと覚えられない

- 全てのメソッドは同じもの
- レシーバとメソッドが定義されているオブジェクトがどのような関係にあるか、の我々の都合で使い分けているだけ

| Object# | singleton_methods          | レシーバのシングルトンクラスのメソッド (public + protected) を返す  | 引数(false)でレシーバのシングルトンクラス以外は対象外 |
|         |                            |                                                                     |                                                       |
| Object# | methods                    | レシーバのクラスのメソッド (public + protected) を返す              | 引数(false)でsingleton_methods(false)を返す 変態      |
|         |                            |                                                                     |                                                       |
| Object# | protected_methods          | レシーバのクラスのメソッドを返す 3兄弟                              | 引数(false)でスーパークラスは対象外                   |
| Object# | private_methods            | レシーバのクラスのメソッドを返す 3兄弟                              | 引数(false)でスーパークラスは対象外                   |
| Object# | public_methods             | レシーバのクラスのメソッドを返す 3兄弟                              | 引数(false)でスーパークラスは対象外                   |
|         |                            |                                                                     |                                                       |
| Module# | instance_methods           | レシーバ (class \|\| module) のメソッド (public + protected) を返す | 引数(false)でスーパークラスは対象外                   |
| Module# | public_instance_methods    | レシーバ (class \|\| module) のメソッドを返す 3兄弟                 | 引数(false)でスーパークラスは対象外                   |
| Module# | protected_instance_methods | レシーバ (class \|\| module) のメソッドを返す 3兄弟                 | 引数(false)でスーパークラスは対象外                   |
| Module# | private_instance_methods   | レシーバ (class \|\| module) のメソッドを返す 3兄弟                 | 引数(false)でスーパークラスは対象外                   |

### 全てのオブジェクトが持っているメソッド達

何でかというとObjectクラス(Kernel)に定義されているから

| Object# | singleton_methods |
| Object# | methods           |
| Object# | protected_methods |
| Object# | private_methods   |
| Object# | public_methods    |

#### やはり彼は特別、特異さん( ･`ω･´)

- singleton_methods
  - 引数(true \|\| 省略)
    - レシーバのシングルトンクラスのメソッド (public \|\| protected) を返す
    - レシーバのシングルトンクラスのスーパークラスにあるメソッドも含める
    - private_singleton_methods のようなメソッドは定義されていないので singleton_class.private_methods(false) な感じで取得する
  - 引数(false)
    - レシーバのシングルトンクラスのメソッドを返す
    - methods(false) と同じ動作になる

#### レシーバのクラスのメソッド(いわゆるインスタンスメソッド)が欲しいなら

感覚的なメソッドじゃない気がする彼は個性的

- methods
  - 引数(true \|\| 省略)
    - レシーバのクラスのメソッド (public_methods + protected_methods) を返す
    - レシーバのクラスのスーパークラスにあるメソッドも含める
  - 引数(false)
    - レシーバのシングルトンクラスのメソッドを返す
    - singleton_methods(false) と同じ動作になる

三兄弟

- protected_methods
  - レシーバのクラスのprotectedなメソッドを返す
    - 引数が(true \|\| 省略)
      - レシーバのクラスのスーパークラスにあるメソッドも含める
    - 引数が(false)
      - レシーバのクラスのメソッドのみを返す
- private_methods
  - レシーバのクラスのprivateなメソッドを返す
    - 引数が(true \|\| 省略)
      - レシーバのクラスのスーパークラスにあるメソッドも含める
    - 引数が(false)
      - レシーバのクラスのメソッドのみを返す
- public_methods
  - レシーバのクラスのpublicなメソッドを返す
    - 引数が(true \|\| 省略)
      - レシーバのクラスのスーパークラスにあるメソッドも含める
    - 引数が(false)
      - レシーバのクラスのメソッドのみを返す

### (いわゆる)クラスオブジェクトのみが持っているメソッド達

- なぜかというとModuleクラスに定義されているから
- つまり、レシーバは class か module のどちらかであろう

| Module# | instance_methods           |
| Module# | public_instance_methods    |
| Module# | protected_instance_methods |
| Module# | private_instance_methods   |

個性のある子・・でも、この子は感覚的に解りやすい子だ！

- instance_methods
  - レシーバのメソッド (public_methods + protected_methods) を返す
    - 引数(true \|\| 省略)
      - レシーバのスーパークラスにあるメソッドも含める
    - 引数が(false)
      - レシーバのメソッドのみを返す

三兄弟

- public_instance_methods
  - レシーバのpublicなメソッドを返す
    - 引数が(true \|\| 省略)
      - レシーバのスーパークラスにあるメソッドも含める
    - 引数が(false)
      - レシーバのメソッドのみを返す
- protected_instance_methods
  - レシーバのprotectedなメソッドを返す
    - 引数が(true \|\| 省略)
      - レシーバのスーパークラスにあるメソッドも含める
    - 引数が(false)
      - レシーバのメソッドのみを返す
- private_instance_methods
  - レシーバのprivateなメソッドを返す
    - 引数が(true \|\| 省略)
      - レシーバのスーパークラスにあるメソッドも含める
    - 引数が(false)
      - レシーバのメソッドのみを返す
