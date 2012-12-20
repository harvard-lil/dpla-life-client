define([
  'backbone',
  'views/appNav',
  'views/appSearch',
  'JSON',
  'router'
], function(Backbone, AppNavView, AppSearchView) {

  var app = {
    init: function() {
      app.nav = new AppNavView();
      app.search = new AppSearchView();
      Backbone.history.start();
    }
  };

  return app;
});