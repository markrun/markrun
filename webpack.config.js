module.exports = {
    entry: {
        'markrun': './index.js'
    },
    externals: {
        'jsonlint': 'JSON',
        'fs': 'fs',
        'path': 'path'
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
