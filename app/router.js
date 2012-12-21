define([
  'underscore',
  'backbone',
  'mediator',
  'views/index',
  'views/searchResults'
], function(_, Backbone, mediator, IndexView, SearchResultsView) {
  var mainView;

  var switchMain = function(MainClass, options) {
    if (mainView && mainView.clear) {
      mainView.clear();
    }
    mainView = new MainClass(options);
  }

  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'search/:term': 'search'
    },

    index: function() {
      switchMain(IndexView);
    },

    search: function(term) {
      switchMain(SearchResultsView, { query: term });
    }
  });

  var appRouter = new Router();

  // Let other modules trigger navigation changes without creating circular
  // dependencies, using the mediator object to pass events.
  mediator.on({
    'navigate:index': function() {
      appRouter.navigate('', { trigger: true });
    },

    'navigate:search': function(term) {
      appRouter.navigate('search/' + term, { trigger: true });
    }
  });

  return appRouter;
});