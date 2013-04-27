define([
  'underscore',
  'backbone',
  'models/user'
], function(_, Backbone, UserModel) {

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
      var helpers = _.extend({
        currentUser: function() {
          return UserModel.currentUser();
        }
      }, this.helpers);
      var data = {
        model: this.model ? this.model : {},
        collection: this.collection ? this.collection : {},
        helpers: helpers
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
    },

    redraw: function() {
      this.clear();
      this.render();
      this.delegateEvents();
    }
  });

  return BaseView;
});