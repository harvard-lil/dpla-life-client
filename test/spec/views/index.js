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
      expect(index.$('.stack-view')).toExist();
    });
  });
});