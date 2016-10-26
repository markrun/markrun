# 📝 markrun

> Let your markdown to run, \`\`\`\`js to &lt;pre&gt; & &lt;script&gt;

[![Build Status](https://api.travis-ci.org/markrun/markrun.svg)](https://travis-ci.org/markrun/markrun) [![NPM version](https://img.shields.io/npm/v/markrun.svg?style=flat)](https://npmjs.org/package/markrun) [![NPM downloads](http://img.shields.io/npm/dm/markrun.svg?style=flat)](https://npmjs.org/package/markrun)

![preview](/doc/media/preview.png)

## 📦 Install

```shell
npm i markrun -D
```
> engines node >= 0.11.0

```html
<script src="http://markrun.github.com/ajax/libs/markrun/0.1.0/markrun.js" ></script>
```

## 📄 Usage

`markrun(md [,props])`

```js
var markrun = require('markrun')
var html = markrun("````js\n document.title = new Date().getTime() \n````")

var fs = require('fs')
var path = require('path')
fs.writeFileSync(path.join(__dirname, 'demo.html'), html)
```

> [defaultProps](./lib/defaultProps.js)

## markrun.string

> You can use ES6 [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) replace markrun.string

    markrun.string(function() {/*!
    ````js
    console.log("markrun")
    ````
    */})

```js
markrun.string([
'````js',
'console.log("markrun")',
'````'
])
```

## props

### props.template


    var template = markrun.string(function () {/*!

    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%= title %></title>
    <% if (theme === 'bs') {%>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css">
    <%= } %>
    </head>
    <body>
    <%= content %>
    </body>
    </html>

    */})

    var content = markrun.string(function () {/*!

    # some

    <!--
    MARKRUN-DATA
    {
        "theme": "bs"
    }
    -->

    ```js
    console.log('markrun')
    ```

    */})

```js
markrun(content, {
    templateDefaultData: {
        theme: '',
        keywords: '',
        description: ''
    },
    template: template
})
```

### props.compile

```shell
npm i babel babel-preset-es2015 babel-preset-react -D
```

    var content = markrun.string(function () {/*!

    <!-- {some: 'abc'} -->
    ````js
    ReactDOM.render(
        (<div>markrun</div>),
        document.getElementById('demo')
    )
    ````

    */})

```js

var babel = require('babel')
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

`compile[lang]` Should be returned

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

#### Turns async function into sync

> If compile function need asynchronous operations, Please use deasync

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

## props.markdownParser

| attr | default | example | desc |
|-----|----------|---------|------|
| marked | `false` | `require('marked')`` | markdown parser |

```js
markrun(content, {
    markdownParser: require('marked')
})
```

if `marked` is `false`, Use [./lib/marked.js](./lib/marked.js).

## Code snippets render data

    ````js
    document.getElementById('demoA').innerHTML = 'change demoA text'
    ````
    <div id="demoA">demoA</div>

    <!-- {
        markrun_lastrun: false
    } -->
    ````js
    document.getElementById('demoB').innerHTML = 'change demoB text'
    ````
    <div id="demoB">demoB</div>


| attr | default | example | desc |
|------|---------|---------|------|
| markrun_lastrun `Boolean` | `true` | `false` `true` | Script append body  |

> `markrun_` at the beginning of is makrun rendering method.

[About render data](./render-data.md)

## MARKRUN-HTML

    var content = markrun.string(function() {/*!

    abc
    <!-- MARKRUN-HTML
    This text is display
    -->
    123

    */})

```js
markrun(content)
/*
abc
This text is display
123
*/
```

## props.highlight

```js
var highlight = require('highlight.js')
makrun(content, {
    highlight: function (source) {
        return highlight.highlightAuto(source).value
    }
})
```

## 🔨 Development

```shell
npm i
npm run test
# or mocha -w
```
