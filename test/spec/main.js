require.config({
  baseUrl: '../app',
  paths: {
    spec: '../test/spec',
    mock: '../test/mock',
    jquery: 'libs/jquery/jquery',
    'jquery-ui': 'libs/jquery/jquery-ui',
    'jquery.serialize-object': 'libs/jquery/jquery.serialize-object',
    'jquery.chosen': 'libs/jquery/jquery.chosen.min',
    'jquery.cookie': 'libs/jquery/jquery.cookie',
    'jquery.infieldlabel': 'libs/jquery/jquery.infieldlabel',
    'jquery.qtip': 'libs/jquery/jquery.qtip.min',
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

    'jquery-ui': {
      deps: ['jquery']
    },

    'jquery.serialize-object': {
      deps: ['jquery']
    },

    'jquery.chosen': {
      deps: ['jquery']
    },

    'jquery.cookie': {
      deps: ['jquery', 'JSON']
    },

    'jquery.infieldlabel': {
      deps: ['jquery']
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
  'spec/models/book',
  'spec/models/review',
  'spec/models/shelf',
  'spec/models/user',
  'spec/views/appConfirm',
  'spec/views/appNav',
  'spec/views/appSearch',
  'spec/views/base',
  'spec/views/bookPreview',
  'spec/views/bookReader',
  'spec/views/covers',
  'spec/views/index',
  'spec/views/login',
  'spec/views/modal',
  'spec/views/reviews',
  'spec/views/shelf',
  'spec/views/signup',
  'spec/views/stack',
  'spec/views/userSettings'
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