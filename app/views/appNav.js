define([
  'underscore',
  'mediator',
  'views/base',
  'views/login',
  'views/signup',
  'text!templates/appNav.html'
], function(_, mediator, BaseView, LoginView, SignupView, AppNavTemplate) {

  var AppNavView = BaseView.extend({
    el: '.app-nav',
    template: _.template(AppNavTemplate),

    events: {
      'click .app-login': 'showLoginModal',
      'click .app-signup': 'showSignupModal'
    },

    showLoginModal: function(event) {
      mediator.trigger('modal:show', LoginView);
      event.preventDefault();
    },

    showSignupModal: function(event) {
      mediator.trigger('modal:show', SignupView);
      event.preventDefault();
    }
  });

  return AppNavView;
});