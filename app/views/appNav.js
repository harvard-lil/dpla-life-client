define([
  'underscore',
  'mediator',
  'views/base',
  'views/login',
  'views/signup',
  'views/userSettings',
  'text!templates/appNav-loggedOut.html',
  'text!templates/appNav-loggedIn.html'
], function(
  _,
  mediator,
  BaseView,
  LoginView,
  SignupView,
  UserSettingsView,
  LoggedOutTemplate,
  LoggedInTemplate
) {

  var AppNavView = BaseView.extend({
    el: '.app-nav',

    events: {
      'click .app-login': 'showLoginModal',
      'click .app-signup': 'showSignupModal',
      'click .app-settings': 'showUserSettingsModal',
      'click .app-logout': 'logout',
      'click .app-shelves': 'showShelves'
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
    },

    showShelves: function(event) {
      mediator.trigger('navigate:shelves');
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