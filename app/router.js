define([
  'backbone'
], function(Backbone) {
  
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      
    }
  });
  var appRouter = new Router();

  return appRouter;
});