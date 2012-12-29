define([
  'underscore',
  'mediator',
  'models/user',
  'views/base',
  'text!templates/signup.html',
  'jquery.serialize-object'
], function(_, mediator, UserModel, BaseView, SignupTemplate) {

  var SignupView = BaseView.extend({
    template: _.template(SignupTemplate),

    events: {
      'submit form': 'submit'
    },

    submit: function(event) {
      var user = new UserModel();

      this.clearErrors();
      user.save(this.$('form').serializeObject(), {
        success: _.bind(this.success, this),
        error: _.bind(this.error, this)
      });

      event.preventDefault();
    },

    success: function(model, response, options) {
      mediator.trigger('user:login', model);
      mediator.trigger('modal:hide');
    },

    error: function(model, xhr, options) {
      this.$('.form-errors').text('Some Error!');
    },

    clearErrors: function() {
      this.$('.form-errors').text('');
    }
  });

  return SignupView;
});