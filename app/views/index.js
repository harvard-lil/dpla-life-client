define([
  'underscore',
  'jquery',
  'settings',
  'views/base',
  'text!templates/index.html',
  'text!templates/stackview-book.html',
  'stackview'
], function(_, $, settings, BaseView, IndexTemplate, StackViewBookTemplate) {

  var IndexView = BaseView.extend({
    el: '.app-main',
    template: _.template(IndexTemplate),

    render: function() {
      BaseView.prototype.render.call(this);

      StackView.get_types().book.template = StackViewBookTemplate;
      console.log(StackView.get_types().book.template);
      this.$('.stackview').stackView({
        url: settings.get('indexStackURL'),
        query: settings.get('indexSearchTerm'),
        jsonp: true,
        ribbon: settings.get('indexStackRibbon')
      });
    }
  });

  return IndexView;
});