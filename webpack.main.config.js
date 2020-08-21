const path = require('path')

module.exports = {
    target: 'electron-main',
    entry: { 
        main: './src/main.js',
    },
    output: {
        path: path.resolve('./build'),
        filename: '[name].js'
    },
    resolve: {
        modules: [
            path.resolve('./node_modules')
        ]
    }
}