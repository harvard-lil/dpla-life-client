define([
  'models/book',
  'mock/book',
  'views/bookReader'
], function(BookModel, BookMock, BookReaderView) {

  describe('Book Reader View', function() {
    var book = new BookModel(BookMock());
    var reader;

    beforeEach(function() {
      setFixtures('<div class="target" />');
      reader = new BookReaderView({
        el: '.target',
        model: book
      });
    });

    it('renders the book reader template', function() {
      expect(reader.$('.book-reader')).toExist();
    });
  });
});