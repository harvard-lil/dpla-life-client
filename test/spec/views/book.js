define([
  'models/book',
  'mock/book',
  'views/book'
], function(BookModel, BookMock, BookView) {

  describe('Book View', function() {
    var book;

    beforeEach(function() {
      setFixtures('<div class="app-main" />');
      book= new BookView({ model: new BookModel(BookMock()) });
    });

    it('renders the book template', function() {
      expect(book.$('.book-page')).toExist();
    });
  });
});