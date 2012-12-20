define([
  'views/appSearch'
], function(AppSearchView) {

  describe('App Search View', function() {
    var search;

    beforeEach(function() {
      setFixtures('<div class="app-search" />');
      search = new AppSearchView();
    });

    it('renders the app-search template', function() {
      expect(search.$('form')).toExist();
    });
  });
});