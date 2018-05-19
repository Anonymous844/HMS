const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");  
const webpack = require('webpack');
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            { 
                test: /\.css$/, 
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8033,
        host: "localhost",
        hot: true,
        proxy: {
            "/api/index.php": "http://localhost:8080"
        }
    }
};
