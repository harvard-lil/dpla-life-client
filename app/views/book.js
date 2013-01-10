define([
  'underscore',
  'mediator',
  'views/base',
  'text!templates/book.html'
], function(_, mediator, BaseView, BookTemplate) {

  var BookView = BaseView.extend({
    el: '.app-main',
    template: _.template(BookTemplate)
  });

  return BookView;
});