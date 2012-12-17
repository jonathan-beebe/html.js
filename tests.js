QUnit.config.autostart = false;

require.config({
  paths: {
    // Major libraries
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    html: 'html',

    // Require.js plugins
    text: 'lib/require/text',
    css: 'lib/require/css',
  },

  shim: {
    underscore: {
      exports: '_'
    }
  }
});

// Let's kick off the application

require([
  'underscore',

  // everything below shoud be a test module with a run method
  'tests/creating',
  'tests/method-calling',
  'tests/form',
  'tests/nestedElements.js',

], function (_) {

  QUnit.start();

  // isolate the arguments that are test modules and run 'em
  var tests = Array.prototype.slice.call(arguments, 1);

  _.each(tests, function(test) {
    test.run();
  });

});
