define([
  'underscore',
  'settings',
  'mediator',
  'views/base',
  'text!templates/index.html',
  'text!templates/stackview-book.html',
  'stackview',
  'views/bookPreview'
], function(
  _,
  settings,
  mediator,
  BaseView,
  IndexTemplate,
  StackViewBookTemplate
) {

  var IndexView = BaseView.extend({
    el: '.app-main',
    template: _.template(IndexTemplate),

    events: {
      'click .stack-item': 'loadPreview'
    },

    render: function() {
      BaseView.prototype.render.call(this);

      StackView.get_types().book.template = StackViewBookTemplate;
      this.$('.stackview').stackView({
        url: settings.get('indexStackURL'),
        query: settings.get('indexSearchTerm'),
        jsonp: true,
        ribbon: settings.get('indexStackRibbon')
      });
    },

    loadPreview: function(event) {
      var $target = $(event.target).closest('.stack-item');
      var id = $target.data('stackviewItem')['_id'];

      mediator.trigger('preview:load', id);
      event.preventDefault();
    }
  });

  return IndexView;
});