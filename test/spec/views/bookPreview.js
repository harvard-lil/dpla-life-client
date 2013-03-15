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

    it('triggers book navigation when view button clicked', function() {
      var spy = jasmine.createSpy('on book navigation');
      mediator.on('navigate:book', spy);
      preview.$('.view-book').click();
      expect(spy).toHaveBeenCalledWith(book.get('source_id'));
    });
  });
});