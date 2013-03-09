define([
  'views/covers'
], function(CoversView) {

  describe('Covers View', function() {
    var covers;

    beforeEach(function() {
      setFixtures('<div class="stack-wrapper" />');
      covers = new CoversView({
        el: '.stack-wrapper',
        data: { docs: [] }
      });
    });

    it('renders the covers template', function() {
      expect(covers.$('.coverview')).toExist();
    });
  });
});