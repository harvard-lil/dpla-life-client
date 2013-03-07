define([
  'underscore',
  'collections/books',
  'views/base',
  'mediator',
  'text!templates/covers.html'
], function(_, BookCollection, BaseView, mediator, CoversTemplate) {

  var CoversView = BaseView.extend({
    template: _.template(CoversTemplate),

    events: {
      'click .cover-item': 'loadPreview'
    },

    initialize: function(options) {
      if (options.data == null) {
        throw new Error('Data option required');
      }
      this.collection = new BookCollection(options.data.docs);
      BaseView.prototype.initialize.call(this, options);
    },

    loadPreview: function(event) {
      var $target = $(event.target).closest('.cover-item');
      var id = $target.data('bookid');

      mediator.trigger('preview:load', id);
      event.preventDefault();
    },
  });

  return CoversView;
});