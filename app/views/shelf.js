define([
  'underscore',
  'jquery',
  'mediator',
  'settings',
  'views/base',
  'text!templates/shelf.html',
  'text!templates/stackview-book.html',
  'stackview',
  'views/bookPreview'
], function(
  _,
  $,
  mediator,
  settings,
  BaseView,
  ShelfTemplate,
  StackViewBookTemplate
) {

  var ShelfView = BaseView.extend({
    el: '.app-main',
    template: _.template(ShelfTemplate),

    events: {
      'click .stack-item': 'loadPreview'
    },

    initialize: function(options) {
      BaseView.prototype.initialize.call(this, options);
      StackView.get_types().book.template = StackViewBookTemplate;
      StackView.defaults.book.min_height_percentage = 85;
      this.loadShelfStack();
    },

    loadShelfStack: function() {
      var self = this;

      $.ajax({
        url: settings.get('searchURL'),
        datatype: 'json',
        data: {
          ids: self.model.get('book_ids')
        },
        success: function(data) {
          self.$('.stackview').stackView({
            data: data,
            ribbon: self.model.get('name')
          });
        },
        error: function() {
          // TODO
        }
      });
    },

    loadPreview: function(event) {
      var $target = $(event.target).closest('.stack-item');
      var id = $target.data('stackviewItem')['_id'];

      mediator.trigger('preview:load', id);
      event.preventDefault();
    }
  });

  return ShelfView;
});