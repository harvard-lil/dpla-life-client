define([
  'underscore',
  'mediator',
  'views/base',
  'text!templates/appNotify.html',
  'text!templates/appNotification.html'
], function(_, mediator, BaseView, AppNotifyTemplate, NotificationTemplate) {
  
  var notificationTemplate = _.template(NotificationTemplate);
  var AppNotifyView = BaseView.extend({
    el: '.app-notify',
    template: _.template(AppNotifyTemplate),

    initialize: function(options) {
      BaseView.prototype.initialize.call(this, options);
    },

    notify: function(options) {
      var $notification = $(notificationTemplate(options));

      $notification.hide();
      this.$('.app-notifications').append($notification);
      $notification.fadeIn(300).delay(3000).fadeOut(300, function() {
        $notification.remove();
      });
    }
  });
  var appNotify = new AppNotifyView();

  mediator.on('app:notify', function(options) {
    appNotify.notify(options);
  });

  return appNotify;
});