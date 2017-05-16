/**
 * Created by Андрей on 15.05.2017.
 */
const express              = require('express');
const path                 = require('path');
const bodyParser           = require('body-parser');
const webpack              = require('webpack');
const webpackConfig        = require('../webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const compiler = webpack(webpackConfig);
const port = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(webpackDevMiddleware(compiler));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log(`Server run on ${port} port`);
});