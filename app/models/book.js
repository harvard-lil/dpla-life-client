define([
  'backbone',
  'settings'
], function(Backbone, settings) {

  var BookModel = Backbone.Model.extend({
    urlRoot: settings.get('bookURL')
  });

  return BookModel;
});