define([
  'underscore',
  'backbone',
  'mediator',
  'models/book',
  'models/user',
  'collections/shelves',
  'views/index',
  'views/searchResults',
  'views/book',
  'views/shelves'
], function(
  _,
  Backbone,
  mediator,
  BookModel,
  UserModel,
  ShelfCollection,
  IndexView,
  SearchResultsView,
  BookView,
  ShelvesView
) {
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
      'search/:term': 'search',
      'books/:id': 'showBook',
      'shelves/': 'showShelves'
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
    },

    showShelves: function() {
      var user = UserModel.currentUser();
      var shelves = new ShelfCollection();

      if (!user) {
        return mediator.trigger('navigate:index');
      }

      shelves.userID = user.id;
      shelves.fetch({
        success: function(collection, response, options) {
          switchMain(ShelvesView, { collection: shelves });
        },
        error: function(collection, xhr, options) {
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
    },

    'navigate:shelves': function() {
      appRouter.navigate('shelves/', { trigger: true });
    }
  });

  // Navigate away from user-owned views on logout
  mediator.on('user:logout', function() {
    if (mainView && mainView.privateToUser) {
      mediator.trigger('navigate:index');
    }
  });

  return appRouter;
});