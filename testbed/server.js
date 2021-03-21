const path = require('path');
const fs = require('fs');
const express = require('express');
// var ServeIndex = require('serve-index');
const hbs = require('handlebars');
const rollup = require('rollup');

const app = express();

app.set('port', process.env.PORT || 6587);

app.use(express.static(path.resolve(__dirname, '..')));

app.get('/example/:name?', function (req, res, next) {
  var pname = req.params.name || '';
  var script = '';
  var examples = fs.readdirSync('./example/')
    .filter(function(file) {
      return file.endsWith('.js');
    })
    .map(function(file) {
      var name = file.replace(/\.[^.]+$/, '');
      var url = '/example/' + name;
      var selected = false;
      if (name.toLowerCase() === pname.toLowerCase()) {
        script = '/example/' + file;
        selected = true;
      }
      return {name: name, url: url, selected: selected};
    });

  var page = hbs.compile(fs.readFileSync('./testbed/index.hbs') + '');
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


const loadConfigFile = require('rollup/dist/loadConfigFile');

loadConfigFile(path.resolve(__dirname, '../rollup.config.js')).then(
  async ({ options, warnings }) => {
    console.log(`We currently have ${warnings.count} warnings`);
    warnings.flush();

    options = options
      .filter(opt => opt.output[0].file.indexOf('.min.js') === -1)
      .map(opt => ({...opt, treeshake: false }));

    const watcher = rollup.watch(options);

    watcher.on('event', event => {
      console.log(event.code);
      switch (event.code) {

        case 'START': // the watcher is (re)starting
          console.log('Start build', event);
          break;

        case 'BUNDLE_START': // building an individual bundle

          // * event.input will be the input options object if present
          // * event.outputFiles cantains an array of the "file" or
          //   "dir" option values of the generated outputs

          console.log('Start bundle', event);
          break;

        case 'BUNDLE_END': // finished building a bundle

          // * event.input will be the input options object if present
          // * event.outputFiles cantains an array of the "file" or
          //   "dir" option values of the generated outputs
          // * event.duration is the build duration in milliseconds
          // * event.result contains the bundle object that can be
          //   used to generate additional outputs by calling
          //   bundle.generate or bundle.write. This is especially
          //   important when the watch.skipWrite option is used.
          // You should call "event.result.close()" once you are done
          // generating outputs, or if you do not generate outputs.
          // This will allow plugins to clean up resources via the
          // "closeBundle" hook.

          console.log('End bundle', event);

          event.result && event.result.close();
          break;

        case 'END': // finished building all bundles
          console.log('End build', event);
          break;

        case 'ERROR': // encountered an error while bundling

          // * event.error contains the error that was thrown
          // * event.result is null for build errors and contains the
          //   bundle object for output generation errors. As with
          //   "BUNDLE_END", you should call "event.result.close()" if
          //   present once you are done.

          console.log('Error');
          console.log(event);

          event.result && event.result.close();
          break;
      }
    });

    // // stop watching
    // watcher.close();
  }
);
