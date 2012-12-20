define([
  'underscore',
  'settings',
  'views/base',
  'text!templates/index.html',
  'stackview'
], function(_, settings, BaseView, IndexTemplate) {

  var IndexView = BaseView.extend({
    el: '.app-main',
    template: _.template(IndexTemplate),

    render: function() {
      BaseView.prototype.render.call(this);
      this.$('.stackview').stackView({
        url: settings.get('indexStackURL'),
        jsonp: true,
        ribbon: settings.get('indexStackRibbon')
      });
    }
  });

  return IndexView;
});