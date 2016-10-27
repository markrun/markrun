module.exports = {
    entry: {
        'markrun': './index.js'
    },
    output: {
        path: './',
        filename: "[name].js",
        libraryTarget: 'umd',
        library: 'markrun'
    },
}
