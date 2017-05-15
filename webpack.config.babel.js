import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const BUILD_PATH    = path.resolve(__dirname, './public');
const SOURCE_PATH   = path.resolve(__dirname, './src');
const SERVER_PATH   = path.resolve(__dirname, './src/api/index');
const ENTRY         = path.resolve(__dirname, './src/index.js');

const NODE_ENV = process.env.NODE_ENV || 'DEVELOPMENT';

module.exports = {

    entry: ENTRY,

    output: {
        filename: 'bundle.js',
        path: BUILD_PATH
    },

    devServer: {
        contentBase: './src'
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
                use: ['babel-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Weather service',
            filename: 'index.html',
            template: SOURCE_PATH + '/index.html'
        }),

        new webpack.DefinePlugin([
            NODE_ENV, JSON.stringify(NODE_ENV)
        ])
    ],

    devtool: "inline-source-map"
};