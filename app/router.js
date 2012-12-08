define([
  'backbone',
  'views/index'
], function(Backbone, IndexView) {
  
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      new IndexView();
    }
  });
  var appRouter = new Router();

  return appRouter;
});