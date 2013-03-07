define([
  'underscore',
  'views/base',
  'text!templates/stackview.html',
  'text!templates/stackview-book.html',
  'stackview'
], function(_, BaseView, StackTemplate, StackViewBookTemplate) {

  var StackView = BaseView.extend({
    template: _.template(StackTemplate),

    initialize: function(options) {
      if (options.data == null && options.url == null) {
        throw new Error('Stack data or url is required');
      }
      if (options.bookTemplate == null) {
        options.bookTemplate = StackViewBookTemplate;
      }
      BaseView.prototype.initialize.call(this, options);
    },

    render: function() {
      BaseView.prototype.render.call(this);
      window.StackView.get_types().book.template = this.options.bookTemplate;
      window.StackView.defaults.book.min_height_percentage = 85;
      this.$('.stackview').stackView(this.options);
    }
  });

  return StackView;
});