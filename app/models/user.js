define([
  'backbone',
  'settings',
  'mediator',
  'jquery',
  'jquery.cookie'
], function(Backbone, settings, mediator, $) {
  var appUser;
  var UserModel = Backbone.Model.extend({
    urlRoot: settings.get('userURL')
  });
  
  UserModel.currentUser = function() {
    return appUser;
  };

  mediator.on('app:init', function() {
    var userJSON = $.cookie('user');

    if (!userJSON) {
      return mediator.trigger('user:logout');
    }

    $.ajax({
      url: settings.get('sessionURL'),
      type: 'GET',
      headers: {
        'Authorization': 'Token token=' + userJSON.token
      },
      complete: function(xhr) {
        if (xhr.status === 200) {
          mediator.trigger('user:login', new UserModel(userJSON));
        }
        else {
          mediator.trigger('user:logout');
        }
      }
    });
  });

  mediator.on('user:login', function(user) {
    user.unset('password').unset('password_confirmation');
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
      appUser = null;
    }
    
    $.removeCookie('user');
  });

  mediator.on('user:destroy', function(user) {
    user.destroy({
      headers: {
        'Authorization': 'Token token=' + user.get('token')
      },

      success: function() {
        appUser = null;
        mediator.trigger('user:logout');
      },

      error: function() {
        // TODO
      }
    });
  });

  return UserModel;
});