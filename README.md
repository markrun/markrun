# markrun

> Let your markdown to run, ````js to <pre> & <script>

[![Build Status](https://api.travis-ci.org/markrun/markrun.svg)](https://travis-ci.org/markrun/markrun)
[![NPM version](https://img.shields.io/npm/v/markrun.svg?style=flat)](https://npmjs.org/package/markrun)
[![NPM downloads](http://img.shields.io/npm/dm/markrun.svg?style=flat)](https://npmjs.org/package/markrun)

## 📦 Install

```shell
npm i markrun -D
```

## 📄 Usage

`markrun(md [,options])`

```js
var markrun = require('markrun')
var content = markrun(
    markrun.string(function () {
/*!
````js
document.title = new Date().getTime()
````
*/
    })
)
var fs = require('fs')
var path = require('path')
fs.writeFileSync(path.join(__dirname, 'demo.html'))
```

> You can use ES6 [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) replace markrun.string

## 🔨 development

```shell
npm run test
```
