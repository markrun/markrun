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

## Code snippets render data

    ````js
    document.getElementById('demoA').innerHTML = 'change demoA text'
    ````
    <div id="demoA">demoA</div>

    <!-- {
        MlastRun: false
    } -->
    ````js
    document.getElementById('demoB').innerHTML = 'change demoB text'
    ````
    <div id="demoB">demoB</div>

> `M` at the beginning of is makrun rendering method

| attr | default | example | desc |
|------|---------|---------|------|
| MlastRun `Boolean` | `true` | `false` `true` | Script append body  |

## options

### options.template

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

### options.compile

```shell
npm i babel babel-preset-es2015 babel-preset-react -D
```

```js
var babel = require('babel')
var content = markrun.string(function () {
/*!
<!-- {some: 'abc'} -->
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
            /*!
            source:
                ReactDOM.render(
                    (<div>markrun</div>),
                    document.getElementById('demo')
                )
            data: {some: 'abc'}
            */
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
compile[lang] Should be returned

```js
{
    lang: 'css',
    code: 'body{font-size:12px;}'
}
{
    lang: 'js',
    code: 'console.log(1)'
}
{
    lang: 'html',
    code: '<div>hello</div>'
}
```

### Turns async function into sync

> DeAsync turns async function into sync, implemented with a blocking mechanism by calling Node.js event loop at JavaScript layer. The core of deasync is writen in C++.

```shell
npm i deasync -D
```

```js
var deasync = require('deasync');
var cp = require('child_process');
var exec = deasync(cp.exec);
// output result of ls -la
try{
    console.log(exec('ls -la'));
}
catch(err){
    console.log(err);
}
// done is printed last, as supposed, with cp.exec wrapped in deasync; first without.
console.log('done');
```

## 🔨 development

```shell
npm run test
```
