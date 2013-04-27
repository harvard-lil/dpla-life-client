define([
  'underscore',
  'mediator',
  'models/user',
  'collections/shelves',
  'views/base',
  'views/login',
  'views/signup',
  'views/userSettings',
  'views/appNotify',
  'views/shelvesDropdown',
  'text!templates/appNav-loggedOut.html',
  'text!templates/appNav-loggedIn.html'
], function(
  _,
  mediator,
  UserModel,
  ShelfCollection,
  BaseView,
  LoginView,
  SignupView,
  UserSettingsView,
  appNotify,
  ShelvesDropdownView,
  LoggedOutTemplate,
  LoggedInTemplate
) {

  var AppNavView = BaseView.extend({
    el: '.app-nav',

    events: {
      'click .app-login': 'showLoginModal',
      'click .app-signup': 'showSignupModal',
      'click .app-settings': 'showUserSettingsModal',
      'click .app-logout': 'logout'
    },

    initialize: function(options) {
      BaseView.prototype.initialize.call(this, options);
      if (this.model) {
        this.loadShelvesDropdown();
      }
      mediator.on('shelves:refresh', _.bind(this.loadShelvesDropdown, this));
    },

    loadShelvesDropdown: function() {
      var shelves = new ShelfCollection();
      var self = this;

      shelves.userID = this.model.get('id');
      shelves.fetch({
        success: function(collection, response, options) {
          self.subviews.push(new ShelvesDropdownView({
            collection: collection
          }));
        },
        error: function(collection, xhr, options) {
          appNotify.notify({
            type: 'error',
            message: 'Something went wrong trying to load your shelves.'
          });
        }
      });
    },

    showLoginModal: function(event) {
      mediator.trigger('modal:show', LoginView);
      event.preventDefault();
    },

    showSignupModal: function(event) {
      mediator.trigger('modal:show', SignupView);
      event.preventDefault();
    },

    showUserSettingsModal: function(event) {
      mediator.trigger('modal:show', UserSettingsView, {
        model: this.model
      });
      event.preventDefault();
    },

    logout: function(event) {
      mediator.trigger('user:logout');
      event.preventDefault();
    }
  });

  var appNav;

  mediator.on('user:login', function(user) {
    if (appNav) appNav.clear();
    appNav = new AppNavView({
      template: _.template(LoggedInTemplate),
      model: user
    });
  });

  mediator.on('user:logout', function() {
    if (appNav) appNav.clear();
    appNav = new AppNavView({ template: _.template(LoggedOutTemplate) });
  });

  return AppNavView;
});