const Path = require('path');
const FS = require('fs');
const Express = require('express');
// var ServeIndex = require('serve-index');
const Webpack = require('webpack');
const WebpackMiddleware = require('webpack-dev-middleware');
const Handlebars = require('handlebars');

const compiler = Webpack([
  {
    entry: {
      'planck': './lib/index.js',
      'planck-with-testbed': './testbed/index.js',
    },
    output: {
      library: 'planck',
      filename: '[name].js',
    },
    optimization: {
      minimize: false
    },
    plugins: [
      new Webpack.DefinePlugin({
        DEBUG: JSON.stringify(false),
        ASSERT: JSON.stringify(true),
      }),
    ],
  }
]);
var app = Express();

app.set('port', process.env.PORT || 6587);

app.use(WebpackMiddleware(compiler, {
  publicPath: '/dist/',
  compress: false,
}));

app.use(Express.static(Path.resolve(__dirname, '..')));

app.get('/example/:name?', function (req, res, next) {
  var pname = req.params.name || '';
  var script = '';
  var examples = FS.readdirSync('./example/')
    .filter(function(file) {
      return file.endsWith('.js');
    })
    .map(function(file) {
      var name = file.replace(/\.[^.]+$/, '');
      var url = '/example/' + name;
      var selected = false;
      if (name.toLowerCase() == pname.toLowerCase()) {
        script = '/example/' + file;
        selected = true;
      }
      return {name: name, url: url, selected: selected};
    });

  var page = Handlebars.compile(FS.readFileSync('./testbed/index.hbs') + '');
  res.send(page({
    script: script,
    examples : examples
  }));
});

app.get('/', function (req, res, next) {
  res.redirect('/example/')
});

// app.use(ServeIndex(__dirname, {
//   icons : true,
//   css : 'ul#files li{float:none;}' // not actually working!
// }));

app.listen(app.get('port'), function() {
  console.log('Checkout http://localhost:' + app.get('port'));
});
