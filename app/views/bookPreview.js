define([
  'underscore',
  'mediator',
  'models/book',
  'views/base',
  'text!templates/bookPreview.html'
], function(_, mediator, BookModel, BaseView, BookPreviewTemplate) {

  var BookPreviewView = BaseView.extend({
    el: '.app-preview',
    template: _.template(BookPreviewTemplate)
  });
  var currentPreview;

  mediator.on('preview:load', function(id) {
    var book = new BookModel({ id: id });

    book.fetch({
      success: function(model, response, options) {
        if (currentPreview) {
          currentPreview.clear();
        }
        currentPreview = new BookPreviewView({ model: model });
      },

      error: function(model, xhr, options) {
        // TODO
      }
    });
  });

  return BookPreviewView;
});