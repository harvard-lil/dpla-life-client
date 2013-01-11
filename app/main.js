require.config({
  paths: {
    backbone: 'libs/backbone/backbone',
    jquery: 'libs/jquery/jquery',
    'jquery.serialize-object': 'libs/jquery/jquery.serialize-object',
    'jquery.cookie': 'libs/jquery/jquery.cookie',
    'jquery.infieldlabel': 'libs/jquery/jquery.infieldlabel',
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
    },

    underscore: {
      exports: '_'
    }
  }
});

require([
  'jquery',
  'mediator',
  'router',
  'jquery.cookie',
  'views/appNav',
  'views/appSearch',
  'views/modal',
  'models/user'
], function($, mediator) {
  $.cookie.json = true;

  $(function() {
    mediator.trigger('app:init');
    Backbone.history.start();
  });
});