define([
  'underscore',
  'mediator',
  'views/base',
  'text!templates/appSearch.html',
  'jquery.infieldlabel'
], function(_, mediator, BaseView, AppSearchTemplate) {

  var AppSearchView = BaseView.extend({
    el: '.app-search',
    template: _.template(AppSearchTemplate),

    events: {
      'submit form': 'submit'
    },

    render: function() {
      BaseView.prototype.render.call(this);
      this.$('label').inFieldLabels();
    },

    submit: function(event) {
      var query = this.$('#id_query').val();
      var type = this.$('#id_type').val();

      event.preventDefault();
      if (!query) return;

      mediator.trigger('navigate:search', type, query);
    }
  });

  mediator.on('app:init', function() {
    new AppSearchView();
  });

  return AppSearchView;
});