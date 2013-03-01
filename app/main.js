require.config({
  paths: {
    backbone: 'libs/backbone/backbone',
    jquery: 'libs/jquery/jquery',
    'jquery-ui': 'libs/jquery/jquery-ui',
    'jquery.serialize-object': 'libs/jquery/jquery.serialize-object',
    'jquery.cookie': 'libs/jquery/jquery.cookie',
    'jquery.infieldlabel': 'libs/jquery/jquery.infieldlabel',
    modernizr: 'libs/modernizr/modernizr',
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

    'jquery-ui': {
      deps: ['jquery']
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

    modernizr: {
      exports: 'Modernizr'
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
  'models/user',
  'modernizr'
], function($, mediator) {
  $.cookie.json = true;

  $(function() {
    // Need to load or not load the user before we can init the router
    var start = function() {
      Backbone.history.start();
      mediator.off('user:login user:logout', start);
    };
    mediator.on('user:login user:logout', start);
    mediator.trigger('app:init');
  });
});