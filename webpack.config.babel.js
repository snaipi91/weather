import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const BUILD_PATH    = path.resolve(__dirname, './public');
const SOURCE_PATH   = path.resolve(__dirname, './src');
const SERVER_PATH   = path.resolve(__dirname, './src/api/index');
const ENTRY         = path.resolve(__dirname, './src/index.js');

console.log(path.resolve(__dirname, "node_modules"));

module.exports = {

    entry: ENTRY,

    output: {
        filename: 'bundle.js',
        library: "vendor",
        path: BUILD_PATH
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
        })
    ],

    devServer: {
        contentBase: SOURCE_PATH,
        compress: true,
        port: 9000
    },

    devtool: "inline-source-map"
};