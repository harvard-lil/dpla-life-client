define([
  'collections/shelves',
  'views/shelves',
  'mock/shelf',
  'mediator'
], function(ShelfCollection, ShelvesView, MockShelf, mediator) {

  describe('Shelves View', function() {
    var shelves;

    beforeEach(function() {
      setFixtures('<div class="app-main" />');
      shelves = new ShelvesView({
        collection: new ShelfCollection([ MockShelf() ]) });
    });

    it('renders the shelves template', function() {
      expect(shelves.$('.shelves-list')).toExist();
    });

    describe('#viewShelf', function() {
      it ('triggers navigate:shelf event', function() {
        var spy = jasmine.createSpy('on shelf navigation');
        mediator.on('navigate:shelf', spy);
        shelves.$('.view-shelf').first().click();
        expect(spy).toHaveBeenCalledWith(shelves.collection.at(0).get('id'));
      });
    });
  });
});