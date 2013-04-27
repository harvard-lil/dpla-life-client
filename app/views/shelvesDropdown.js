define([
  'underscore',
  'mediator',
  'models/shelf',
  'views/base',
  'views/shelfForm',
  'text!templates/shelvesDropdown.html'
], function(
  _,
  mediator,
  ShelfModel,
  BaseView,
  ShelfFormView,
  ShelvesDropdownTemplate
) {

  var ShelvesDropdownView = BaseView.extend({
    el: '.shelves-dropdown',
    template: _.template(ShelvesDropdownTemplate),

    events: {
      'click .new-shelf': 'newShelf'
    },

    initialize: function(options) {
      BaseView.prototype.initialize.call(this, options);
      this.collection.on('change', _.bind(this.redraw, this));
    },

    newShelf: function(event) {
      mediator.trigger('modal:show', ShelfFormView, {
        model: new ShelfModel(),
        collection: this.collection
      });
      event.preventDefault();
    }
  });

  return ShelvesDropdownView;
});