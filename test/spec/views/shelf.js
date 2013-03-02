define([
  'models/shelf',
  'mock/shelf',
  'views/shelf',
  'views/stack'
], function(ShelfModel, ShelfMock, ShelfView, StackView) {

  describe('Shelf View', function() {
    var shelfModel = new ShelfModel(ShelfMock());
    var shelfView;

    beforeEach(function() {
      setFixtures('<div class="app-main" />');
      shelfView = new ShelfView({ model: shelfModel });
    });

    it('renders the shelf template', function() {
      expect(shelfView.$('.stack-wrapper')).toExist();
    });
  });
});