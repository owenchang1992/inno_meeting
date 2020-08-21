const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { DefinePlugin } = require('webpack')

module.exports = (env={}, argv={}) => ({
    module: {
        rules: require('./module.rules')(env, argv)
    },
    plugins: [
        env.analyse ? new BundleAnalyzerPlugin() : null,  
        new HtmlWebpackPlugin({
            template: './src/index.html',
          }),
        argv.mode === "production"
            ? new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }) : null,
        new  DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(argv.mode)
            }    
        })      
    ].filter(
        plugin => {
            console.log(plugin)
            return plugin !== null
        }
    ),
    resolve: {
        extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"]
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
})