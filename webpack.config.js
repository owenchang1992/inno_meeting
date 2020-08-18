const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env={}, argv={}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true
                        }
                    }
                ]
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)/i,
                use: 'file-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    argv.mode === "production"
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader', 
                    {
                        loader: 'css-loader', options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader', options: {
                            sourceMap: true
                        }
                    } 
                ]
            }
        ]
    },
    plugins: [
        argv.mode === 'development' ? new HtmlWebpackPlugin : null,
        argv.mode === "production"
            ? new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }) : null
    ].filter(
        plugin => !!plugin
    ),
    devtool: 'source-map'
})