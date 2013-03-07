define([
  'backbone',
  'settings',
  'models/book'
], function(Backbone, settings, BookModel) {

  var BookCollection = Backbone.Collection.extend({
    model: BookModel
  });

  return BookCollection;
});