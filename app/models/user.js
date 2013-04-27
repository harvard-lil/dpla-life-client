define([
  'backbone',
  'settings',
  'mediator',
  'jquery',
  'JSON',
  'jquery.cookie'
], function(Backbone, settings, mediator, $, JSON) {
  var appUser;
  var UserModel = Backbone.Model.extend({
    urlRoot: settings.get('userURL')
  });

  var syncAppUser = function() {
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
        userJSON = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
          mediator.trigger('user:login', new UserModel(userJSON));
        }
        else {
          mediator.trigger('user:logout');
        }
      }
    });
  };
  
  UserModel.currentUser = function() {
    return appUser;
  };

  mediator.on('app:init user:sync', function() {
    syncAppUser();
  });

  mediator.on('user:login', function(user) {
    user.unset('password').unset('password_confirmation');
    appUser = user;
    $.cookie('user', user, { secure: settings.get('secure') });
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
    mediator.trigger('confirm', {
      message: 'Are you sure you want to delete your account?',
      confirmText: 'Yes, Delete Account',
      onConfirm: function() {
        user.destroy({
          headers: {
            'Authorization': 'Token token=' + user.get('token')
          },

          success: function() {
            appUser = null;
            mediator.trigger('user:logout');
          },

          error: function() {
            mediator.trigger('app:notify', {
              type: 'error',
              message: 'Something went wrong trying to delete your account.'
            });
          }
        });
      }
    });
  });

  mediator.on('user:update', function(attrs) {
    if (!appUser) return;

    appUser.save(attrs, {
      headers: {
        'Authorization': 'Token token=' + appUser.get('token')
      },

      success: function() {
        $.cookie('user', appUser, { secure: settings.get('secure') });
        mediator.trigger('app:notify', {
          type: 'success',
          message: 'Settings updated.'
        });
      },

      error: function() {
        mediator.trigger('app:notify', {
          type: 'error',
          message: 'Something went wrong trying to update your settings.'
        });
      }
    });
  });

  return UserModel;
});