const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = (env={}, argv={}) => ({
    module: {
        rules: require('./module.rules')(env, argv)
    },
    plugins: [
        env.analyse ? new BundleAnalyzerPlugin() : null,  
        argv.mode === 'development' ? new HtmlWebpackPlugin : null,
        argv.mode === "production"
            ? new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }) : null  
    ].filter(
        plugin => {
            console.log(plugin)
            return plugin !== null
        }
    ),
    devtool: 'source-map'
})