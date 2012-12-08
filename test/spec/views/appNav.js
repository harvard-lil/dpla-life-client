define([
  'views/appNav'
], function(AppNavView) {

  describe('App Nav View', function() {
    var nav;

    beforeEach(function() {
      setFixtures('<div class="app-nav" />');
      nav = new AppNavView();
    });

    it('renders the app-nav template', function() {
      expect(nav.$('li')).toExist();
    });
  });
});