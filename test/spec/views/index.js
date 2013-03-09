define([
  'views/index'
], function(IndexView) {

  describe('Index View', function() {
    var index;

    beforeEach(function() {
      setFixtures('<div class="app-main" />');
      index = new IndexView();
    });

    it('renders the index template', function() {
      expect(index.$('.stack-wrapper')).toExist();
    });

    it('creates the default homepage StackView', function() {
      waitsFor(function() {
        return index.$('.stackview li').length;
      }, 'StackView items to load');
    });
  });
});