define([
  'underscore',
  'views/base',
  'text!templates/shelves.html'
], function(
  _,
  BaseView,
  ShelvesTemplate
) {

  var ShelvesView = BaseView.extend({
    el: '.app-main',
    template: _.template(ShelvesTemplate),
    privateToUser: true,

    render: function() {
      BaseView.prototype.render.call(this);
      this.$('.new-shelf-form label').inFieldLabels();
    }
  });

  return ShelvesView;
});