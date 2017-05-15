/**
 * Created by Андрей on 15.05.2017.
 */
const express              = require('express');
const bodyParser           = require('body-parser');
const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const compiler = webpack('../webpack.config.babel.js');
const port = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(webpackDevMiddleware(webpack(compiler), {
        noInfo: true
}));

app.get('/page/show', function(req, res){
    res.send('hello world');
});

app.listen(port, function() {
    console.log(`Server run on ${port} port`);
});