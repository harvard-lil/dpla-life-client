require.config({
  baseUrl: '../app',
  paths: {
    spec: '../test/spec',
    mock: '../test/mock',
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    text: 'libs/require/text',
    JSON: 'libs/json2/json2',
    stackview: 'libs/stackview/stackview'
  },

  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    JSON: {
      exports: 'JSON'
    },

    stackview: {
      deps: ['jquery']
    }
  },

  urlArgs: "bust=" + (new Date()).getTime()
});

/* One spec file for each module in the app. */
require([
  'jquery',
  'backbone',
  'JSON',
  'router',
  'spec/views/appNav',
  'spec/views/appSearch',
  'spec/views/base',
  'spec/views/index',
  'spec/views/searchResults'
], function($, Backbone) {
  var jasmineEnv = jasmine.getEnv();
  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.updateInterval = 1000;
  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  $(function() {
    window.location.hash = '';
    Backbone.history.start({ silent: true });
    jasmineEnv.execute();
  });
});