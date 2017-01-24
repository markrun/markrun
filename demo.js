var markrun = require('./index')
var fs = require('fs')
var html = markrun(markrun.string(function () {/*!

# title

````js
console.log(1)
````

*/}))

fs.writeFileSync(__dirname + '/demo.html', html)
