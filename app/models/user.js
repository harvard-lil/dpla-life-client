define([
  'backbone',
  'settings'
], function(Backbone, settings) {
  var UserModel = Backbone.Model.extend({
    urlRoot: settings.get('userURL')
  });

  return UserModel;
});