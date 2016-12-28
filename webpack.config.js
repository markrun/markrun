var path = require('path')
module.exports = {
    entry: {
        'markrun': './index.js'
    },
    resolve: {
        alias: {
            'highlight.js': __dirname + '/lib/browser-hljs'
        }
    },
    externals: {
        'fs': 'fs'
    },
    output: {
        path: './dist',
        filename: "[name].js",
        libraryTarget: 'umd',
        library: 'markrun'
    },
    module: {
       loaders: [
           {
               test: /\.json$/,
               loader: "json"
           }
       ]
   }
}
