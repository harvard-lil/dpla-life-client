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
      setFixtures('<div class="stack-wrapper" />');
      shelfView = new ShelfView({ model: shelfModel });
    });
  });
});