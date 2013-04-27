define([
  'views/index',
  'mediator'
], function(IndexView, mediator) {

  describe('Index View', function() {
    var index, spy;

    beforeEach(function() {
      spy = jasmine.createSpy('on stack load');
      setFixtures('<div class="app-preview" />');
      mediator.on('stack:load', spy);
      index = new IndexView();
    });

    it('renders the index template', function() {
      expect(index.$('.index-welcome')).toExist();
    });

    it('creates the default homepage StackView', function() {
      expect(spy).toHaveBeenCalled();
    });
  });
});