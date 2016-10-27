module.exports = {
    entry: {
        'markrun': './index.js'
    },
    externals: {
        'jsonlint': 'JSON'
    },
    output: {
        path: './browser',
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
