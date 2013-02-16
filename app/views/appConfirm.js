define([
  'underscore',
  'jquery',
  'mediator',
  'views/base',
  'views/modal',
  'text!templates/confirm.html'
], function(_, $, mediator, BaseView, ModalView, ConfirmTemplate) {

  var defaults = {
    confirmText: 'Yes',
    denyText: 'No',
    message: 'Are you sure you want to do that?',
    onConfirm: $.noop,
    onDeny: $.noop
  };

  var ConfirmView = BaseView.extend({
    template: _.template(ConfirmTemplate),

    events: {
      'click .confirm-action': 'confirm',
      'click .deny-action': 'deny'
    },

    initialize: function(options) {
      this.options = $.extend({}, this.options, defaults, options);
      BaseView.prototype.initialize.call(this, options);
    },

    render: function() {
      this.$el.html(this.template(this.options));
    },

    confirm: function(event) {
      this.options.onConfirm();
      mediator.trigger('modal:hide');
      event.preventDefault();
    },

    deny: function(event) {
      this.options.onDeny();
      mediator.trigger('modal:hide');
      event.preventDefault();
    }
  });

  var confirm = function(options) {
    mediator.trigger('modal:show', ConfirmView, options);
  };

  mediator.on('confirm', confirm);

  return confirm;
});