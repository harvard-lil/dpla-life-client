define([
  'underscore',
  'mediator',
  'views/base',
  'text!templates/appSearch.html'
], function(_, mediator, BaseView, AppSearchTemplate) {

  var AppSearchView = BaseView.extend({
    el: '.app-search',
    template: _.template(AppSearchTemplate),

    events: {
      'submit form': 'submit'
    },

    submit: function(event) {
      var query = this.$('#id_query').val();

      event.preventDefault();
      if (!query) return;

      mediator.trigger('navigate:search', query);
    }
  });

  return AppSearchView;
});