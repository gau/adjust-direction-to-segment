# README

選択したセグメントの両端アンカーポイントから伸びる方向線の角度を、アンカーポイント同士を結んだ直線の角度に合わせます。


<div class="fig center" style="margin-bottom: 20px;"><img src="http://www.graphicartsunit.com/saucer/images/adjust-direction-to-segment/eye.png" alt="イメージ" class="noshadow"></div>


### 更新履歴

* 0.5.0：新規作成（公開）

----

### 対応バージョン

* Illustrator CS5／CS6／CC／CC 2014／CC 2015／CC 2015.3

----

### ダウンロード

* [スクリプトをダウンロードする](https://github.com/gau/adjust-direction-to-segment/archive/master.zip)

----

### インストール方法

1. ダウンロードしたファイルを解凍します。
2. 所定の場所に「ハンドルの角度をセグメントに揃える.jsx」をコピーします。Windows版ではお使いのIllustratorの種類によって保存する場所が異なりますのでご注意ください。
3. Illustratorを再起動します。
4. `ファイル > スクリプト > ハンドルの角度をセグメントに揃える`と表示されていればインストール成功です。

#### ファイルをコピーする場所

| OS | バージョン | フォルダの場所 |
|:-----|:-----|:-----|
| Mac | 全 | /Applications/Adobe Illustrator *(ver)*/Presets/ja_JP/スクリプト/ |
| 32bit Win | CS5まで | C:\Program Files\Adobe\Adobe Illustrator *(ver)*\Presets\ja_JP\スクリプト\ |
| 64bit Win | CS5, CS6（32bit版） | C:\Program Files (x86)\Adobe\Adobe Illustrator *(ver)*\Presets\ja_JP\スクリプト\ |
| 64bit Win | CS6（64bit版）以降 | C:\Program Files\Adobe\Adobe Illustrator *(ver)* (64 Bit)\Presets\ja_JP\スクリプト\ |

* *(ver)*にはお使いのIllustratorのバージョンが入ります
* 本スクリプトは、CS4以前では動作を検証しておりません

----

### 直線と曲線をなめらかに切り替えるときの問題

<div class="fig center"><img src="http://www.graphicartsunit.com/saucer/images/adjust-direction-to-segment/fig01.png" alt="滑らかな曲線と直線の切り替え" class="noshadow"></div>

S字型のパスを作成しているとき、ラインを直線から曲線、または、曲線から直線へなめらかに切り替えたいことがあります。こういうときは、直線部分の角度と曲線を構成する方向線が同じ角度にするのがポイントです。これで、もっともなめらかに直線と曲線を移行できます。

<div class="fig center"><img src="http://www.graphicartsunit.com/saucer/images/adjust-direction-to-segment/fig02.png" alt="滑らかでない曲線と直線の切り替え" class="noshadow"></div>

しかし、ロゴデザインやトレースなどでは、角度や曲線の具合を微調整しながら作業します。いったん直線と方向線の角度を正確に合わせていたとしても、微調整のなかで角度が少しずつ変わり、ずれが生じてくることはとてもよくあります。こうなると、直線と曲線の境目に不自然な角が出てきたり、直線が微妙に膨らんでしまったりします。美しくない上に、角度を合わせるのも容易ではありません。こういった作業をよく行う人は、「あるある！」って言いたくなることでしょう。

----

### このスクリプトを使うと

<div class="fig center"><img src="http://www.graphicartsunit.com/saucer/images/adjust-direction-to-segment/fig03.png" alt="このスクリプトを使うと" class="noshadow"></div>

2点のアンカーポイントの角度を計測し、その両端アンカーポイントから伸びる方向線の傾きを揃えます。こうすることで、いつでも曲線と直線の切り替えをなめらかにできます。

----

### 使い方

<div class="fig center"><img src="http://www.graphicartsunit.com/saucer/images/adjust-direction-to-segment/fig04.png" alt="使い方" class="noshadow"></div>

［ダイレクト選択ツール］を使って、直線にしたいセグメントのみ、または、セグメント両端のアンカーポイント2点を選択し、スクリプトを実行します。

----

### 方向線の長さについて

<div class="fig center"><img src="http://www.graphicartsunit.com/saucer/images/adjust-direction-to-segment/fig05.png" alt="左右のハンドルの長さを統一" class="noshadow"></div>

初期設定では、元の方向線とアンカーポイントとの直線距離を維持しながら、角度のみを変更します。左右どちらの方向線も、それぞれの長さを維持できます。スクリプトの設定項目をカスタマイズすると（後述）、曲線側の方向線の長さを直線側に統一させることも可能です。

----

### 方向線の連動について

<div class="fig center"><img src="http://www.graphicartsunit.com/saucer/images/adjust-direction-to-segment/fig06.png" alt="左右のハンドルを連動して動作" class="noshadow"></div>

初期設定では、ひとつのアンカーポイントから出ている2本の方向線は連動して動き、それぞれ相対する角度となります。スクリプトの設定項目をカスタマイズすると（後述）、曲線側の方向線は変更せず、直線側のみの角度を動かすことも可能です。

----

### 設定をカスタマイズする

スクリプトの5〜8行目にある`synchronize`、`sameLength `、`smooth`、`showAlert`の値を変更することで、挙動をカスタマイズすることが可能です。

| キー | 初期値 | 型 | 内容 |
|:-----|:-----|:-----|:-----|
| synchronize | true | boolean | 同一アンカーポイントから伸びる方向線を連動して動かす（`true`動かす｜`false`動かさない）|
| sameLength | false | boolean | 同一アンカーポイントから伸びる方向線の長さを統一する（`true`統一する｜`false`元の長さそのまま）|
| smooth | false | boolean | 角度を変えたあとのアンカーポイントをスムーズポイントに設定する。`synchronize`が`true`のときのみ有効（`true`する｜`false`しない）|
| showAlert | true | boolean | オブジェクトやセグメントなどの選択などが適切でない場合に警告を表示する（`true`する｜`false`しない）|

----

### 注意

* 対象となるのは1セグメントのみです。複数セグメントを同時に処理はできません。
* 連続する2つのアンカーポイント、または、単一のセグメントのみが選択された状態でないと、処理は実行されません。
* 処理対象のオブジェクトは単一のパスのみです。グループ、複合パス、シンボル、テキストなどは無視します。複数パスが選択されているときは、その中のひとつを処理対応として認識します（スクリプト側で最初に取得できたPathItem）。
* オブジェクトの種類や構造によって意図しない結果になることもあります。

----

### 免責事項

* このスクリプトを使って起こったいかなる現象についても制作者は責任を負えません。すべて自己責任にてお使いください。
* CS5からCC 2015.3で動作の確認はしましたが、OSのバージョンやその他の状況によって実行できないことがあるかもしれません。もし動かなかったらごめんなさい。

----

### ライセンス

* ハンドルの角度をセグメントに揃える.jsx
* Copyright (c) 2016 Toshiyuki Takahashi
* Released under the MIT license
* [http://opensource.org/licenses/mit-license.php](http://opensource.org/licenses/mit-license.php)
* Created by Toshiyuki Takahashi ([Graphic Arts Unit](http://www.graphicartsunit.com/))
* [Twitter](https://twitter.com/gautt)

