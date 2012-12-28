define([
  'underscore',
  'views/base',
  'text!templates/signup.html'
], function(_, BaseView, SignupTemplate) {

  var SignupView = BaseView.extend({
    template: _.template(SignupTemplate)
  });

  return SignupView;
});