define([
  'underscore',
  'mediator',
  'views/base',
  'text!templates/userSettings.html'
], function(_, mediator, BaseView, UserSettingsTemplate) {

  var UserSettingsView = BaseView.extend({
    template: _.template(UserSettingsTemplate),

    events: {
      'click .delete-user': 'deleteUser',
      'submit .user-update-form': 'updateUser'
    },

    deleteUser: function(event) {
      mediator.trigger('modal:hide');
      mediator.trigger('user:destroy', this.model);
      event && event.preventDefault();
    },

    updateUser: function(event) {
      var userAttrs = this.$('.user-update-form').serializeObject();

      mediator.trigger('user:update', userAttrs);
      mediator.trigger('modal:hide');
      event && event.preventDefault();
    }
  });

  return UserSettingsView;
});