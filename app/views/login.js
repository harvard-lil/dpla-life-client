define([
  'underscore',
  'settings',
  'jquery',
  'mediator',
  'models/user',
  'views/base',
  'text!templates/login.html',
  'jquery.serialize-object'
], function(_, settings, $, mediator, UserModel, BaseView, LoginTemplate) {

  var LoginView = BaseView.extend({
    template: _.template(LoginTemplate),

    events: {
      'submit form': 'submit'
    },

    submit: function(event) {
      this.clearErrors();
      $.ajax({
        url: settings.get('sessionURL'),
        type: 'POST',
        data: this.$('form').serializeObject(),
        success: _.bind(this.success, this),
        error: _.bind(this.error, this)
      });
      event.preventDefault();
    },

    success: function(userJSON) {
      mediator.trigger('user:login', new UserModel(userJSON));
      mediator.trigger('modal:hide');
    },

    error: function(xhr) {
      var message = "Your email or password is incorrect.";

      this.$('.form-errors').append('<li>' + message + '</li>');
      mediator.trigger('modal:center');
    },

    clearErrors: function() {
      this.$('.form-errors').text('');
    }
  });

  return LoginView;
});