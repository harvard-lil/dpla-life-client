define([
  'views/covers'
], function(CoversView) {

  describe('Covers View', function() {
    var covers;

    beforeEach(function() {
      setFixtures('<div class="stack-wrapper" />');
      covers = new CoversView();
    });

    it('renders the covers template', function() {
      expect('Implemented').toBeFalsy();
    });
  });
});