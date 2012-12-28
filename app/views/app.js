define([
  'backbone',
  'views/appNav',
  'views/appSearch',
  'views/modal',
  'JSON',
  'router'
], function(Backbone, AppNavView, AppSearchView, ModalView) {

  var app = {
    init: function() {
      app.nav = new AppNavView();
      app.search = new AppSearchView();
      app.modal = new ModalView();
      Backbone.history.start();
    }
  };

  return app;
});