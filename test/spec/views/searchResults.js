define([
  'views/searchResults'
], function(SearchResultsView) {

  describe('Search Results View', function() {
    var results;

    beforeEach(function() {
      setFixtures('<div class="app-main" />');
      results = new SearchResultsView({
        query: 'foo'
      });
    });

    it('renders the search results template', function() {
      expect(results.$('.stackview')).toExist();
    });

    it('creates the search StackView', function() {
      waitsFor(function() {
        return $('.stackview li').length;
      }, 'StackView items to load');
    });
  });
});