define([
  'underscore',
  'settings',
  'views/base',
  'text!templates/searchResults.html',
  'stackview'
], function(_, settings, BaseView, SearchResultsTemplate) {

  var SearchResultsView = BaseView.extend({
    el: '.app-main',
    template: _.template(SearchResultsTemplate),

    render: function() {
      BaseView.prototype.render.call(this);
      this.$('.stackview').stackView({
        url: settings.get('searchURL'),
        query: this.options.query,
        jsonp: true,
        ribbon: this.options.query
      });
    }
  });

  return SearchResultsView;
});