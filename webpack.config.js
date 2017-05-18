const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_PATH    = path.resolve(__dirname, './public');
const SOURCE_PATH   = path.resolve(__dirname, './src');
const ENTRY         = path.resolve(__dirname, './src/index.js');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

    entry: [
        'webpack-hot-middleware/client?path=http://localhost:9000/__webpack_hmr&reload=true',
        ENTRY
    ],

    output: {
        filename: 'bundle.js',
        path: BUILD_PATH
    },

    devServer: {
        contentBase: './public'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },

            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: ['react-hot-loader/webpack', 'babel-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Weather service',
            filename: 'index.html',
            template: SOURCE_PATH + '/index.html'
        }),

        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),

        new webpack.DefinePlugin([
            NODE_ENV, JSON.stringify(NODE_ENV)
        ])
    ],

    resolve: {
        extensions: ['.js', '.jsx'], //**Change
        modules: [
            'node_modules'
        ]
    },

    devtool: "cheap-module-eval-source-map"
};