define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var BaseView = Backbone.View.extend({
    initialize: function(options) {
      Backbone.View.prototype.initialize.call(this, options);
      this.subviews = [];
      if (options && options.template) {
        this.template = options.template;
      }
      this.render();
    },

    render: function() {
      var data = {
        model: this.model ? this.model : {},
        collection: this.collection ? this.collection : {},
        helpers: this.helpers ? this.helpers: {}
      };
      this.$el.html(this.template(data));
    },

    destroy: function() {
      _.invoke(this.subviews, 'destroy');
      this.undelegateEvents();
      this.remove();
    },

    clear: function() {
      _.invoke(this.subviews, 'destroy');
      this.undelegateEvents();
      this.$el.empty();
    }
  });

  return BaseView;
});