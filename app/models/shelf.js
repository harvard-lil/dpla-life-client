define([
  'backbone',
  'settings'
], function(Backbone, settings) {

  var ShelfModel = Backbone.Model.extend({
    urlRoot: settings.get('shelfURL')
  });

  return ShelfModel;
});