define([
  'underscore',
  'views/base',
  'text!templates/appNav.html'
], function(_, BaseView, AppNavTemplate) {

  var AppNavView = BaseView.extend({
    el: '.app-nav',
    template: _.template(AppNavTemplate)
  });

  return AppNavView;
});