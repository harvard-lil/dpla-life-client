define([
  'collections/review',
  'mock/review',
  'views/reviews',
], function(ReviewCollection, ReviewMock, ReviewsView) {

  describe('Reviews View', function() {
    var reviewList = new ReviewCollection([ ReviewMock(), ReviewMock() ]);
    var reviewsView;

    beforeEach(function() {
      setFixtures('<div class="book-reviews" />');
      reviewsView = new ReviewsView({ collection: reviewList });
    });

    it('renders the reviews template', function() {
      expect(reviewsView.$('.reviews-list')).toExist();
    });
  });
});