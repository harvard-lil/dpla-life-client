define([
  'models/shelf',
  'mock/shelf'
], function(ShelfModel, ShelfMock) {

  describe('Shelf Model', function() {
    var shelf, spy;

    it('has a valid mock', function() {
      spy = jasmine.createSpy('on error event');
      shelf = new ShelfModel();
      shelf.on('error', spy);
      shelf.set(ShelfMock());
      expect(spy).not.toHaveBeenCalled();
    });
  });
});