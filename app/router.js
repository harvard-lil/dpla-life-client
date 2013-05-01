define([
  'underscore',
  'backbone',
  'mediator',
  'settings',
  'models/book',
  'models/user',
  'models/shelf',
  'collections/shelves',
  'views/base',
  'views/index',
  'views/shelf',
  'views/stackedMain',
  'views/appNotify',
  'text!templates/faq.html',
  'text!templates/privacy.html',
  'text!templates/stackview-book.html',
  'text!templates/stackview-shelf-book.html'
], function(
  _,
  Backbone,
  mediator,
  settings,
  BookModel,
  UserModel,
  ShelfModel,
  ShelfCollection,
  BaseView,
  IndexView,
  ShelfView,
  StackedMainView,
  appNotify,
  FaqTemplate,
  PrivacyTemplate,
  SVBookTemplate,
  SVOwnedTemplate
) {
  var mainView;
  var inStackedMode = false;
  var appRouter;

  var setMain = function(MainClass, options) {
    if (!inStackedMode || MainClass !== StackedMainView) {
      if (mainView && mainView.clear) {
        mainView.clear();
      }
      mainView = new MainClass(options);
    }
    inStackedMode = MainClass === StackedMainView;
  };

  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'search/:type/:term': 'search',
      'books/:id': 'showBook',
      'shelves/:id': 'showShelf',
      'faq/': 'showFaq',
      'privacy/': 'showPrivacy'
    },

    index: function() {
      setMain(StackedMainView);
      mainView.subviews.push(new IndexView());
    },

    search: function(type, term) {
      var decodedTerm = decodeURIComponent(term);
      
      setMain(StackedMainView);
      mediator.trigger('stack:load', {
        url: settings.get('searchURL'),
        jsonp: true,
        query: decodedTerm,
        ribbon: decodedTerm,
        search_type: type,
        selectFirstBook: true,
        fullHeight: true
      });
    },

    showBook: function(id) {
      setMain(StackedMainView);
      mediator.trigger('preview:load', id);
    },

    showShelf: function(id) {
      var shelf = new ShelfModel({ id: id });

      shelf.fetch({
        success: function(model, response, options) {
          var fresh = !inStackedMode;
          var currentUser = UserModel.currentUser();
          var shelfOwned = currentUser && 
                           currentUser.get('id') === model.get('user_id');
          var shelfTemplate = shelfOwned ? SVOwnedTemplate : SVBookTemplate;

          setMain(StackedMainView);
          mediator.trigger('stack:load', {
            url: settings.get('searchURL'),
            query: model.get('book_ids').join(','),
            ribbon: model.get('name'),
            jsonp: true,
            search_type: 'ids',
            fullHeight: true,
            selectFirstBook: fresh,
            bookTemplate: shelfTemplate,
            sortable: shelfOwned,
            model: model
          });
          mainView.subviews.push(new ShelfView({
            model: model
          }));
        },
        error: function(model, xhr, options) {
          appNotify.notify({
            type: 'error',
            message: 'Something went wrong trying to load that shelf.'
          });
        }
      });
    },

    showFaq: function() {
      setMain(BaseView, {
        el: '.app-main',
        template: _.template(FaqTemplate)
      });
    },

    showPrivacy: function() {
      setMain(BaseView, {
        el: '.app-main',
        template: _.template(PrivacyTemplate)
      });
    }
  });

  appRouter = new Router();

  // Let other modules trigger navigation changes without creating circular
  // dependencies, using the mediator object to pass events.
  mediator.on({
    'navigate:index': function() {
      appRouter.navigate('', { trigger: true });
    },

    'navigate:search': function(type, term) {
      var encodedTerm = encodeURIComponent(term);
      appRouter.navigate(
        ['search', type, encodedTerm].join('/'),
        { trigger: true }
      );
    },

    'navigate:book': function(id) {
      appRouter.navigate('books/' + id, { trigger: true });
    },

    'navigate:shelf': function(id) {
      appRouter.navigate('shelves/' + id, { trigger: true });
    }
  });

  // Navigate away from user-owned views on logout
  mediator.on('user:logout', function() {
    if (mainView && mainView.privateToUser) {
      mediator.trigger('navigate:index');
    }
  });

  mediator.on('user:logout user:login', function() {
    if (inStackedMode) {
      mediator.trigger('stack:redraw');
      mediator.trigger('preview:redraw');
    }
  });

  mediator.on('stack:refresh', function() {
    if (inStackedMode) {
      mediator.trigger('stack:redraw');
    }
  });

  return appRouter;
});