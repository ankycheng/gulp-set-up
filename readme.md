# Gulp 配置分享

## 資料夾結構

|- source/
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- sass/all.sass
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- jade/index.jade
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- js/main.js
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- images/
|- public/
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- index.html
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- css
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- js
|- gulpfile.js
|- package.json
|- node_modules/
|- bower_components/

## 概念：

在 source 中編輯 Jade, sass 與 js 檔，Gulp會自動編譯並持續監聽檔案變更，將編譯過後的檔案輸出至 public 資料夾中。

### 套件安裝：

#### 使用npm

#### 套件一覽：

[autoprefixer](https://www.npmjs.com/package/autoprefixer): 自動增加Css prefix
[babel-core](https://www.npmjs.com/package/babel-core): es6 自動編譯工具
babel-preset-env : babel 環境
babel-preset-es2015 : babel 環境
bower : 前端套件管理工具
browser-sync : 自動更新檔案變動
gulp : 自動化前端編譯工具
gulp-babel : 在 gulp 上使用 babel
gulp-clean : 自動移除檔案/資料夾
gulp-clean-css : 壓縮 css
gulp-concat : 將多個 source 檔案輸出至單一目的檔案
gulp-gh-pages : 一鍵部屬至github page
gulp-if : 在 gulp 中使用判斷流程
gulp-imagemin : 壓縮圖片
gulp-jade : 編譯 jade 檔案
gulp-load-plugins : 引用 'gulp' 開頭的套件不需要require，只需要加上 '$' 即可
gulp-minify-css : 壓縮css，不再支援，使用 gulp-clean-css
gulp-plumber : 編譯出錯時 gulp 不停止
gulp-postcss : 根據版本編譯 css
gulp-sass : 編譯sass/scss
gulp-sequence : 
gulp-sourcemaps : 
gulp-uglify : 壓縮 js 檔
main-bower-files : 
minimist : 

Ref: <https://css-tricks.com/gulp-for-beginners/>