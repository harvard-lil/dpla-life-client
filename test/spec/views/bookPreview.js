define([
  'mediator',
  'models/book',
  'mock/book',
  'views/bookPreview'
], function(mediator, BookModel, BookMock, BookPreviewView) {

  describe('Book Preview View', function() {
    var book = new BookModel(BookMock());
    var preview;

    beforeEach(function() {
      setFixtures('<div class="app-preview" />');
      preview = new BookPreviewView({ model: book });
    });

    it('renders the book-preview template', function() {
      expect(preview.$('.book-preview')).toExist();
    });
  });
});