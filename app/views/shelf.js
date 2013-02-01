define([
  'underscore',
  'views/base',
  'text!templates/shelf.html'
], function(
  _,
  BaseView,
  ShelfTemplate
) {

  var ShelfView = BaseView.extend({
    el: '.app-main',
    template: _.template(ShelfTemplate)
  });

  return ShelfView;
});