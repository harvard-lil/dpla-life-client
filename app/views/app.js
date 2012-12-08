define([
  'backbone',
  'views/appNav',
  'JSON',
  'router'
], function(Backbone, AppNavView) {

  var app = {
    init: function() {
      app.nav = new AppNavView();
      Backbone.history.start();
    }
  };

  return app;
});