define([
  'underscore',
  'mediator',
  'settings',
  'collections/review',
  'views/base',
  'views/reviews',
  'text!templates/book.html'
], function(
  _,
  mediator,
  settings,
  ReviewCollection,
  BaseView,
  ReviewsView,
  BookTemplate
) {

  var BookView = BaseView.extend({
    el: '.app-main',
    template: _.template(BookTemplate),

    initialize: function(options) {
      BaseView.prototype.initialize.call(this, options);
      var reviews = new ReviewCollection();
      var self = this;

      reviews.bookID = this.model.get('_id');
      reviews.fetch({
        success: function(collection, response, options) {
          self.subviews.push(new ReviewsView({ collection: collection }));
        },
        error: function(collection, xhr, options) {
          // TODO
        }
      });
    }
  });

  return BookView;
});