define([
  'underscore',
  'settings',
  'mediator',
  'views/base',
  'views/stack',
  'text!templates/index.html',
  'text!templates/stackview-book.html',
  'views/bookPreview'
], function(
  _,
  settings,
  mediator,
  BaseView,
  StackView,
  IndexTemplate,
  StackViewBookTemplate
) {

  var IndexView = BaseView.extend({
    el: '.app-main',
    template: _.template(IndexTemplate),

    events: {
      'click .stack-item-link': 'loadPreview'
    },

    render: function() {
      BaseView.prototype.render.call(this);
      _.invoke(this.subviews, 'clear');
      this.subviews = [
        new StackView({
          el: '.stack-wrapper',
          url: settings.get('indexStackURL'),
          query: settings.get('indexSearchTerm'),
          jsonp: true,
          ribbon: settings.get('indexStackRibbon')
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

  return IndexView;
});