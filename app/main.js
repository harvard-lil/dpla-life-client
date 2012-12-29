require.config({
  paths: {
    backbone: 'libs/backbone/backbone',
    jquery: 'libs/jquery/jquery',
    'jquery.serialize-object': 'libs/jquery/jquery.serialize-object',
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

    'jquery.serialize-object': {
      deps: ['jquery']
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