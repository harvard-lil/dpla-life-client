define([
  'backbone',
  'settings',
  'models/shelf'
], function(Backbone, settings, ShelfModel) {

  var ShelfCollection = Backbone.Collection.extend({
    model: ShelfModel,
    url: function() {
      return settings.get('userShelvesURL', this.userID);
    }
  });

  return ShelfCollection;
});