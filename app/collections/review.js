define([
  'backbone',
  'settings',
  'models/review'
], function(Backbone, settings, ReviewModel) {

  var ReviewCollection = Backbone.Collection.extend({
    model: ReviewModel,
    url: function() {
      return settings.get('bookReviewsURL', this.bookID);
    }
  });

  return ReviewCollection;
});