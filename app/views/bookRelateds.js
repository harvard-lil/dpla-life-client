define([
  'underscore',
  'settings',
  'views/base',
  'views/stack',
  'text!templates/bookRelateds.html'
], function(_, settings, BaseView, StackView, BookRelatedsTemplate) {

  var BookRelatedsView = BaseView.extend({
    template: _.template(BookRelatedsTemplate),

    initialize: function(options) {
      BaseView.prototype.initialize.call(this, options);
      this.loadNeighbors();
    },

    loadNeighbors: function() {
      var self = this;

      var onError = function() {
        self.$('.on-shelves-with').remove();
      };

      var onSuccess = function(data) {
        self.subviews.push(new StackView({
          el: '.on-shelves-with',
          data: data,
          ribbon: 'On Shelves With'
        }));
      };

      $.ajax({
        url: settings.get('neighborsURL', this.model.get('source_id')),
        datatype: 'json',
        success: onSuccess,
        error: onError
      });
    }
  });

  return BookRelatedsView;
});