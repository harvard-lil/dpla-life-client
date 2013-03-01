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
      var opts = _.extend({ el: '.modal-container' }, options);
      _.each(this.subviews, function(subview) {
        subview.clear();
      });
      this.subviews = [];
      this.subviews.push(new ViewClass(opts));
      this.$el.addClass('showing');
      this.center();
      this.$('input:not([type=hidden])').first().focus();
    },

    hide: function() {
      this.$el.removeClass('showing');
    },

    center: function() {
      var $wrapper = this.$('.modal-wrapper');
      var modalWidth = this.$el.width();
      var modalHeight = this.$el.height();
      var wrapperWidth = $wrapper.outerWidth();
      var wrapperHeight = $wrapper.outerHeight();
      var left = (modalWidth - wrapperWidth) / 2;
      var top = (modalHeight - wrapperHeight) / 2;

      left = left < 0 ? 0 : left;
      top = top < 0 ? 0 : top;

      $wrapper.css({
        left: left,
        top: top
      });
    },

    _handleClick: function(event) {
      var overlayClicked = event.target === this.el;
      var closeClicked = $(event.target).is('.modal-close');

      if (overlayClicked || closeClicked) {
        this.hide();
        event.preventDefault();
      }
    }
  });

  mediator.on('app:init', function() {
    new ModalView();
  });

  return ModalView;
});