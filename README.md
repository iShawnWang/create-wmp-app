# create-wmp-app

[![](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/create-wmp-app)[![](https://img.shields.io/bundlephobia/min/react.svg)](https://github.com/iShawnWang/create-wmp-app)

微信小程序基础工程

# 特点

1. 对比其它脚手架, 没啥突出的优势
2. 干净, 没有一堆乱七八糟没卵用的东西
3. dev 模式下, gulp watch 重新编译贼快

# 工程

1. [npm](https://www.npmjs.com/)
2. [less](https://github.com/gulp-community/gulp-less)
3. [es6 babel](https://github.com/babel/gulp-babel)
4. [imagemin 图片压缩](https://www.npmjs.com/package/gulp-imagemin) [htmlmin wxml 压缩](https://github.com/jonschlinkert/gulp-htmlmin) [webpack js 压缩](https://webpack.js.org/guides/production/#minification)
5. [westore](https://github.com/Tencent/westore)

# 安装

`npm install -g create-wmp-app`

# 使用

1. `create-wmp-app`
2. `cd 工程目录`
3. `npm install`

# 启动小程序

### 开发

1. `npm run dev`
2. 小程序开发者工具 打开 `dist` 目录

### 发布

1. `npm run build`
2. 小程序工具上传即可
