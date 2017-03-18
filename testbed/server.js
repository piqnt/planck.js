var Path = require('path');
var FS = require('fs');
var Express = require('express');
var Browserify = require('browserify-middleware');
// var ServeIndex = require('serve-index');
var Handlebars = require('handlebars');

var app = Express();

app.set('port', process.env.PORT || 6587);

app.use('/dist/planck.js', Browserify('./lib/index.js', {standalone : 'planck'}));
app.use('/dist/planck-with-testbed.js', Browserify('./testbed/index.js', {standalone : 'planck'}));

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
