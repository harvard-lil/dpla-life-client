require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    text: 'libs/require/text',
    JSON: 'libs/json2/json2'
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