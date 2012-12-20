define([
  'underscore',
  'views/base',
  'text!templates/appSearch.html'
], function(_, BaseView, AppSearchTemplate) {

  var AppSearchView = BaseView.extend({
    el: '.app-search',
    template: _.template(AppSearchTemplate)
  });

  return AppSearchView;
});