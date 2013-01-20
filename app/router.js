define([
  'underscore',
  'backbone',
  'mediator',
  'models/book',
  'views/index',
  'views/searchResults',
  'views/book'
], function(
  _,
  Backbone,
  mediator,
  BookModel,
  IndexView,
  SearchResultsView,
  BookView
) {
  var mainView;

  var switchMain = function(MainClass, options) {
    if (mainView && mainView.clear) {
      mainView.clear();
    }
    console.log(MainClass);
    mainView = new MainClass(options);
  }

  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'search/:term': 'search',
      'books/:id': 'showBook'
    },

    index: function() {
      switchMain(IndexView);
    },

    search: function(term) {
      switchMain(SearchResultsView, { query: term });
    },

    showBook: function(id) {
      var book = new BookModel({ id: id });

      book.fetch({
        success: function(model, response, options) {
          switchMain(BookView, { model: model });
        },
        error: function(model, xhr, options) {
          // TODO
        }
      });
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
    },

    'navigate:book': function(id) {
      appRouter.navigate('books/' + id, { trigger: true });
    }
  });

  return appRouter;
});