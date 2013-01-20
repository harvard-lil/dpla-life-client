define([
  'models/book',
  'mock/book'
], function(BookModel, BookMock) {

  describe('Book Model', function() {
    var book, spy;

    it('has a valid mock', function() {
      spy = jasmine.createSpy('on error event');
      book = new BookModel();
      book.on('error', spy);
      book.set(BookMock());
      expect(spy).not.toHaveBeenCalled();
    });
  });
});