define([
  'views/shelves'
], function(ShelvesView) {

  describe('Shelves View', function() {
    var shelves;

    beforeEach(function() {
      setFixtures('<div class="app-main" />');
      shelves = new ShelvesView();
    });

    it('renders the shelves template', function() {
      expect(shelves.$('.shelves-list')).toExist();
    });

    describe('#createShelf', function() {
      it ('needs specs', function() {
        expect('Implemented').toBeFalsy();
      });
    });

    describe('#updateShelf', function() {
      it ('needs specs', function() {
        expect('Implemented').toBeFalsy();
      });
    });

    describe('#deleteShelf', function() {
      it ('needs specs', function() {
        expect('Implemented').toBeFalsy();
      });
    });

    describe('#viewShelf', function() {
      it ('needs specs', function() {
        expect('Implemented').toBeFalsy();
      });
    });
  });
});