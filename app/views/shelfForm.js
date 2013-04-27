define([
  'underscore',
  'mediator',
  'settings',
  'models/user',
  'views/base',
  'text!templates/shelfForm.html'
], function(_, mediator, settings, UserModel, BaseView, ShelfFormTemplate) {

  var ShelfFormView = BaseView.extend({
    template: _.template(ShelfFormTemplate),

    events: {
      'submit form': 'submit'
    },

    initialize: function(options) {
      this.helpers = {
        header: _.bind(function() {
          return this.model.isNew() ? 'New Shelf' : 'Edit Shelf';
        }, this)
      };
      BaseView.prototype.initialize.call(this, options);
    },

    submit: function(event) {
      var currentUser = UserModel.currentUser();

      this.clearErrors();
      if (this.model.isNew()) {
        this.model.urlRoot = settings.get(
          'userShelvesURL',
         currentUser.get('id')
        );
      }
      this.model.save(this.$('form').serializeObject().shelf, {
        headers: {
          'Authorization': 'Token token=' + currentUser.get('token')
        },
        success: _.bind(this.success, this),
        error: _.bind(this.error, this)
      });
      if (this.collection) {
        this.collection.add(this.model);
      }

      event.preventDefault();
    },

    success: function(model, response, options) {
      mediator.trigger('modal:hide');
      $('.ribbon').text(model.get('name'));
      mediator.trigger('user:sync');
    },

    error: function(model, xhr, options) {
      console.log(arguments)
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

  return ShelfFormView;
});