define([
  'views/stack'
], function(StackView) {

  describe('Stack View', function() {
    beforeEach(function() {
      setFixtures('<div class="target" />')
    });

    it('requires either a data option or url option', function() {
      expect(function() {
        new StackView({ el: '.target' });
      }).toThrow();
    });

    it('renders the stackview template', function() {
      var sv = new StackView({ el: '.target', data: [] });
      expect(sv.$('.stackview')).toExist();
    });

    it('invokes the stackview jQuery plugin', function() {
      var sv = new StackView({ el: '.target', data: [] });
      expect(sv.$('.stackview .ribbon')).toExist();
    });
  });
});