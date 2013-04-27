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
    el: '.app-preview',
    template: _.template(IndexTemplate),

    render: function() {
      BaseView.prototype.render.call(this);
      mediator.trigger('stack:load', {
        url: settings.get('indexStackURL'),
        query: settings.get('indexSearchTerm'),
        jsonp: true,
        ribbon: settings.get('indexStackRibbon'),
        fullHeight: true
      });
    }
  });

  return IndexView;
});