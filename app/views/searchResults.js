define([
  'underscore',
  'settings',
  'mediator',
  'views/base',
  'views/stack',
  'text!templates/searchResults.html',
  'text!templates/stackview-book.html',
], function(
  _,
  settings,
  mediator,
  BaseView,
  StackView,
  SearchResultsTemplate,
  StackViewBookTemplate
) {

  var SearchResultsView = BaseView.extend({
    el: '.app-main',
    template: _.template(SearchResultsTemplate),

    events: {
      'click .stack-item-link': 'loadPreview'
    },

    render: function() {
      BaseView.prototype.render.call(this);

      _.invoke(this.subviews, 'clear');
      this.subviews = [
        new StackView({
          el: '.stack-wrapper',
          url: settings.get('searchURL'),
          jsonp: true,
          query: this.options.query,
          ribbon: this.options.query,
          search_type: this.options.type,
          selectFirstBook: true,
          fullHeight: true
        })
      ];
    },

    loadPreview: function(event) {
      var $target = $(event.target).closest('.stack-item');
      var id = $target.data('stackviewItem')['source_id'];

      mediator.trigger('preview:load', id);
      event.preventDefault();
    }
  });

  return SearchResultsView;
});