define([
  'underscore',
  'mediator',
  'views/base',
  'views/login',
  'text!templates/appNav.html'
], function(_, mediator, BaseView, LoginView, AppNavTemplate) {

  var AppNavView = BaseView.extend({
    el: '.app-nav',
    template: _.template(AppNavTemplate),

    events: {
      'click .app-login': 'showLoginModal'
    },

    showLoginModal: function(event) {
      mediator.trigger('modal:show', LoginView);
      event.preventDefault();
    }
  });

  return AppNavView;
});