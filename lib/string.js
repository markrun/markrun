/*
    string([
    'demo',
    'nimo'
    ])
    output:
        demo
        nimo

    string(function () {\/*!
    1
    2
    3
    *\/})
    output:
    1
    2
    3
    4
*/
module.exports = function (data) {
    if (Array.isArray(data)) {
        return data.join('\n')
    }
    return data.toString()
        .replace(/^[^\/]+\/\*!?/, '')
        .replace(/\*\/[^\/]+$/, '')
        .replace(/^[\s\xA0]+/, '').replace(/[\s\xA0]+$/, '').trim()
}
