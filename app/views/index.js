define([
  'underscore',
  'views/base',
  'text!templates/index.html'
], function(_, BaseView, IndexTemplate) {

  var IndexView = BaseView.extend({
    el: '.app-main',
    template: _.template(IndexTemplate)
  });

  return IndexView;
});