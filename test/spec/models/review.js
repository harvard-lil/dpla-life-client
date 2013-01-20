define([
  'models/review',
  'mock/review'
], function(ReviewModel, ReviewMock) {

  describe('Review Model', function() {
    var review, errorSpy;

    beforeEach(function() {
      errorSpy = jasmine.createSpy('on error event');
      review = new ReviewModel();
      review.on('error', errorSpy);
      review.set(ReviewMock());
    });

    it('has a valid mock', function() {
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it('must have either a rating or a comment', function() {
      review.set({
        rating: null,
        comment: null
      });
      expect(errorSpy).toHaveBeenCalled();
    });
  });
});