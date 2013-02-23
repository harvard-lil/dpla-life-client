define([
  'underscore',
  'mediator',
  'JSON',
  'models/user',
  'views/base',
  'text!templates/signup.html',
  'jquery.serialize-object'
], function(_, mediator, JSON, UserModel, BaseView, SignupTemplate) {

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
      var errors = JSON.parse(xhr.responseText).errors;
      var $formErrors = this.$('.form-errors');
      
      _.each(errors, function(error) {
        $formErrors.append('<li>' + error.message + '.</li>');
      });
      mediator.trigger('modal:center');
    },

    clearErrors: function() {
      this.$('.form-errors').text('');
    }
  });

  return SignupView;
});