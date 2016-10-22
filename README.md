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

## options

### template

```js
markrun(content, {
    template: markrun.string(function () {
/*!
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%= title %></title>
</head>
<body>
<%= content %>
</body>
</html>
*/
    })
})
```

### compile

```shell
npm i babel babel-preset-es2015 babel-preset-react -D
```

```js
var babel = require('babel')
var content = markrun.string(function () {
/*!
````js
ReactDOM.render(
    (<div>markrun</div>),
    document.getElementById('demo')
)
````
*/
})
markrun(content, {
    compile: {
        'js': function (source, data) {
            var code = babel.transform(source, {
                presets: [
                     require('babel-preset-es2015'),
                     require('babel-preset-react')
                ]
            }).code
            return {
                lang: 'js',
                code: code
            }
        }
    }
})
```
> compile[lang] Should be returned `lang: js css html` `code: Run in the browser's code`

## 🔨 development

```shell
npm run test
```
