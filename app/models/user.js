define([
  'backbone',
  'settings',
  'mediator',
  'jquery'
], function(Backbone, settings, mediator, $) {
  var UserModel = Backbone.Model.extend({
    urlRoot: settings.get('userURL')
  });
  var appUser;

  mediator.on('app:init', function() {
    var userJSON = $.cookie('user');

    if (!userJSON) {
      return mediator.trigger('user:logout');
    }

    mediator.trigger('user:login', new UserModel(userJSON));
  });

  mediator.on('user:login', function(user) {
    appUser = user;
    $.cookie('user', user);
  });

  mediator.on('user:logout', function() {
    if (appUser) {
      $.ajax({
        url: settings.get('sessionURL'),
        type: 'DELETE',
        headers: {
          'Authorization': 'Token token=' + appUser.get('token')
        }
      });
    }
    
    appUser = null;
    $.removeCookie('user');
  })

  return UserModel;
});