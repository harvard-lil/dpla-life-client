define([
  'underscore',
  'jquery',
  'mediator',
  'views/base',
  'text!templates/modal.html'
], function(_, $, mediator, BaseView, ModalTemplate) {

  var ModalView = BaseView.extend({
    el: '.app-modal',
    template: _.template(ModalTemplate),

    container: '.modal-container',

    events: {
      'click': '_handleClick'
    },

    initialize: function(options) {
      BaseView.prototype.initialize.call(this, options);
      mediator.on('modal:show', _.bind(this.show, this));
      mediator.on('modal:hide', _.bind(this.hide, this));
      mediator.on('modal:center', _.bind(this.center, this));

      $(window).resize(_.throttle(_.bind(this.center, this), 100));
    },

    show: function(ViewClass, options) {
      var opts = _.extend({ el: this.container }, options);

      this.subviews.push(new ViewClass(opts));
      this.$el.addClass('showing');
      this.center();
    },

    hide: function() {
      this.$el.removeClass('showing');
      _.each(this.subviews, function(subview) {
        subview.clear();
      });
      this.subviews = [];
    },

    center: function() {
      var $container = this.$(this.container);
      var modalWidth = this.$el.width();
      var modalHeight = this.$el.height();
      var containerWidth = $container.width();
      var containerHeight = $container.height();
      var left = (modalWidth - containerWidth) / 2;
      var top = (modalHeight - containerHeight) / 2;

      left = left < 0 ? 0 : left;
      top = top < 0 ? 0 : top;

      $container.css({
        left: left,
        top: top
      });
    },

    _handleClick: function(event) {
      if (event.target === this.el) {
        this.hide();
      }
    }
  });

  return ModalView;
});