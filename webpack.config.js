const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env={}, argv={}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        argv.mode === "development" ? new HtmlWebpackPlugin : null
    ].filter(
        plugin => !!plugin
    ),
    devtool: "source-map"
})