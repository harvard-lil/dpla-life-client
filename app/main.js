require.config({
  paths: {
    backbone: 'libs/backbone/backbone',
    jquery: 'libs/jquery/jquery',
    JSON: 'libs/json2/json2',
    stackview: 'libs/stackview/stackview',
    text: 'libs/require/text',
    underscore: 'libs/underscore/underscore'
  },

  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    JSON: {
      exports: 'JSON'
    },

    stackview: {
      deps: ['jquery']
    },

    underscore: {
      exports: '_'
    }
  }
});

require([
  'jquery',
  'views/app'
], function($, app) {
  $(function() {
    app.init();
  });
});