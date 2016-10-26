var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')

var deasync = require('deasync')
var MemoryFS = require("memory-fs")
var ProxyFileSystem = require('proxy-fs')
var webpack = require("webpack")
var path = require('path')
var deasync = require('deasync')
var mfs = new MemoryFS()
var extend = require('extend')

/*
    @param {object} settings
    @param {string} settings.path  "/user/nimo/Document/some/a.js"
    @param {object} settings.webpackConfig
    @param {string} settings.content `console.log(1)`
*/
var compiler = deasync(function (settings, callback) {
    var webpackConfig = extend(true, {
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: true,
        version: true,
        cached: false,
        cachedAssets: false,
        reasons: false,
        source: false,
        errorDetails: false
    }, settings.webpackConfig)
    webpackConfig.entry = settings.path
    webpackConfig.output = webpackConfig.output || {}
    webpackConfig.output.path = '/'
    webpackConfig.output.filename = 'output.js'

    mfs.mkdirpSync(path.dirname(settings.path))
    mfs.writeFileSync(settings.path, settings.content)

    var compiler = webpack(webpackConfig)
    compiler.inputFileSystem = new ProxyFileSystem(function (readpath) {
        if (readpath == settings.path) {
            return {
                path: readpath,
                fileSystem: mfs
            }
        }
    })
    compiler.outputFileSystem = mfs
    compiler.run(function(err, stats) {
        if (err) {
            console.log(err)
            return
        }
        if (stats.hasErrors()) {
            console.log(stats.compilation ? stats.compilation.errors : null)
            return
        }
        // 输出
        callback(null ,mfs.data['output.js'].toString())
    })
})


describe('webpack.js', function() {
    describe('# basic', function() {
        it('should return webpack code', function() {
            var file = util.read('webpack', 'basic')
            util.eql(
                markrun(file.md,{
                    compile: {
                        'js': function (source, data) {
                            var code = compiler({
                                path: file.path + '.md',
                                content: source,
                                webpackConfig: {}
                            })

                            return {
                                lang: 'js',
                                code: code
                            }
                        }
                    }
                }),
                file.html,
                file.path
            )
        })
    })
})
