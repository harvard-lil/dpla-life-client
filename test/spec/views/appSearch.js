define([
  'mediator',
  'views/appSearch'
], function(mediator, AppSearchView) {

  describe('App Search View', function() {
    var search;

    beforeEach(function() {
      setFixtures('<div class="app-search" />');
      search = new AppSearchView();
    });

    it('renders the app-search template', function() {
      expect(search.$('form')).toExist();
    });

    describe('#submit', function() {
      var spy;

      beforeEach(function() {
        spy = jasmine.createSpy('on navigate:search');
        mediator.on('navigate:search', spy);
      });

      it('does nothing if query is blank', function() {
        search.$('#id_query').val('');
        search.$('form').submit();
        expect(spy).not.toHaveBeenCalled();
      });

      it('navigates to search if query is non-blank', function() {
        search.$('#id_query').val('foo');
        search.$('form').submit();
        expect(spy).toHaveBeenCalledWith('keyword', 'foo');
      });
    });
  });
});