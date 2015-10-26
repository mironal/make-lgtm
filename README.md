# (っ＞ω＜c)

1. メニューバーから起動する
2. 以下の方法のどれかで画像を貼り付ける
 - D & D
 - 右クリックでクリップボードからペースト
 - 画像 URL から読み込み
3. LGTM とかの文字をオーバライド
4. 右クリックで画像をクリップボードにコピー
5. Slack とか github に貼り付ける

### 良さ ≡└(┐卍^o^)卍

- 画像を保存しないのでどっかのディレクトリがごちゃごちゃにならない
- electron と React.js で作った
- メニューバーに常駐してる

### 使い方 ＿|￣| Σ･∴’、-=≡( ՞ਊ ՞)

```sh
npm install electron-prebuilt -g
git clone <this repo>
cd <this repo>
electron .
```

### 実行ファイルの作り方

```sh
npm install electron-prebuilt -g
git clone <this repo>
cd <this repo>
npm run-script pack

# mac -> Make LGTM!-darwin-x64/Make LGTM!.app
# win -> Make LGTM!-win32-x64/Make LGTM!.exe
```

### SS (´ . .̫ . `)

![ss](doc/ss.png)

![flow](doc/flow.gif)
