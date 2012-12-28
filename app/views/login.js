define([
  'underscore',
  'views/base',
  'text!templates/login.html'
], function(_, BaseView, LoginTemplate) {

  var LoginView = BaseView.extend({
    template: _.template(LoginTemplate)
  });

  return LoginView;
});