define([
  'underscore',
  'jquery',
  'views/base',
  'text!templates/stackview.html',
  'text!templates/stackview-book.html',
  'stackview'
], function(_, $, BaseView, StackTemplate, StackViewBookTemplate) {
  
  window.StackView.defaults.book.min_height_percentage = 66;

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
      if (options.fullHeight) {
        $(window).resize(_.bind(this._resize, this));
      }
      this.$('.stackview')
        .on('stackview.pageload', _.bind(this._highlightCurrent, this))
        .on('stackview.pageload', _.bind(this._qtipify, this));
    },

    render: function() {
      BaseView.prototype.render.call(this);
      window.StackView.get_types().book.template = this.options.bookTemplate;
      if (this.options.selectFirstBook) {
        this.$('.stackview').one('stackview.pageload', _.bind(function() {
          this.$('.stack-item-link').first().click();
        }, this));
      }
      this.$('.stackview').stackView(this.options);
      if (this.options.fullHeight) {
        this._resize();
      }
    },

    _resize: function() {
      var $stack = this.$('.stackview');
      var windowHeight = window.innerHeight ?
                         window.innerHeight :
                         $(window).height();
      var targetHeight = Math.max(windowHeight - $stack.offset().top, 520);
      $stack.height(targetHeight);
    },

    _highlightCurrent: function() {
      var pivot = this.options.pivot
      if (!pivot) return;

      this.$('.stack-item').filter(function() {
        return $(this).data('stackviewItem').source_id === pivot;
      }).addClass('stack-pivot');
    },

    _qtipify: function() {
      this.$('.stack-item-link:not(.qtipped)').addClass('qtipped').qtip();
    }
  });

  return StackView;
});