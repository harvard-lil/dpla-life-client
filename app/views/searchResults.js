define([
  'underscore',
  'settings',
  'mediator',
  'views/base',
  'text!templates/searchResults.html',
  'text!templates/stackview-book.html',
  'stackview'
], function(
  _,
  settings,
  mediator,
  BaseView,
  SearchResultsTemplate,
  StackViewBookTemplate
) {

  var SearchResultsView = BaseView.extend({
    el: '.app-main',
    template: _.template(SearchResultsTemplate),

    events: {
      'click .stack-item': 'loadPreview'
    },

    render: function() {
      BaseView.prototype.render.call(this);

      StackView.get_types().book.template = StackViewBookTemplate;
      StackView.defaults.book.min_height_percentage = 85;
      this.$('.stackview').stackView({
        url: settings.get('searchURL'),
        query: this.options.query,
        jsonp: true,
        ribbon: this.options.query
      });
    },

    loadPreview: function(event) {
      var $target = $(event.target).closest('.stack-item');
      var id = $target.data('stackviewItem')['_id'];

      mediator.trigger('preview:load', id);
      event.preventDefault();
    }
  });

  return SearchResultsView;
});