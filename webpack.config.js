module.exports = {
    entry: {
        'markrun': './index.js'
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
