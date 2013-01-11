define([
  'underscore',
  'mediator',
  'views/base',
  'text!templates/userSettings.html'
], function(_, mediator, BaseView, UserSettingsTemplate) {

  var UserSettingsView = BaseView.extend({
    template: _.template(UserSettingsTemplate),

    events: {
      'click .delete-user': 'deleteUser'
    },

    deleteUser: function(event) {
      mediator.trigger('user:destroy', this.model);
      mediator.trigger('modal:hide');
      event && event.preventDefault();
    }
  });

  return UserSettingsView;
});