define([
  'models/shelf',
  'mock/shelf',
  'views/shelf'
], function(ShelfModel, ShelfMock, ShelfView) {

  describe('Shelf View', function() {
    var shelfModel = new ShelfModel(ShelfMock());
    var shelfView;

    beforeEach(function() {
      setFixtures('<div class="app-main" />');
      shelfView = new ShelfView({ model: shelfModel });
    });

    it('renders the shelf template', function() {
      expect(shelfView.$('.stackview')).toExist();
    });
  });
});