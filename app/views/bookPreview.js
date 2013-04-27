define([
  'underscore',
  'mediator',
  'settings',
  'models/book',
  'models/user',
  'collections/review',
  'views/base',
  'views/appNotify',
  'views/bookReader',
  'views/reviews',
  'views/bookRelateds',
  'text!templates/bookPreview.html'
], function(
  _,
  mediator,
  settings,
  BookModel,
  UserModel,
  ReviewCollection,
  BaseView,
  appNotify,
  BookReaderView,
  ReviewsView,
  BookRelatedsView,
  BookPreviewTemplate
) {

  var BookPreviewView = BaseView.extend({
    el: '.app-preview',
    template: _.template(BookPreviewTemplate),

    events: {
      'click .read-book': 'loadBookReader',
      'submit .add-to-shelf-form': 'addBookToShelf',
    },

    initialize: function(options) {
      BaseView.prototype.initialize.call(this, options);
      var reviews = new ReviewCollection();
      var self = this;

      reviews.bookID = this.model.get('source_id');
      reviews.fetch({
        success: function(collection, response, options) {
          self.subviews.push(new ReviewsView({ collection: collection }));
        },
        error: function(collection, xhr, options) {
          appNotify.notify({
            type: 'error',
            message: 'Something went wrong trying to load reviews.'
          });
        }
      });

      this.subviews.push(new BookRelatedsView({
        el: '.book-relateds',
        model: this.model
      }));
    },

    loadBookReader: function(event) {
      mediator.trigger('modal:show', BookReaderView, { model: this.model });
      event.preventDefault();
    },

    addBookToShelf: function(event) {
      var $shelfFormElement = this.$('.add-to-shelf-form [name="shelf_id"]');
      var shelfID = $shelfFormElement.val();
      var shelfName = $shelfFormElement.find('option:selected').text();
      var bookID = this.model.get('source_id');
      var bookName = this.model.get('title');
      var userToken = UserModel.currentUser().get('token');

      $.ajax({
        type: 'post',
        url: settings.get('shelfPushURL', shelfID),
        data: { id: bookID },
        headers: {
          'Authorization': 'Token token=' + userToken
        },
        success: function() {
          appNotify.notify({
            type: 'success',
            message: bookName + ' added to ' + shelfName + ' shelf.'
          });
        },
        error: function() {
          appNotify.notify({
            type: 'error',
            message: 'Something went wrong trying to add ' + bookName +
                     ' to ' + shelfName + ' shelf.'
          });
        }
      });
      event.preventDefault();
    }
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
        appNotify.notify({
          type: 'error',
          message: 'Something went wrong trying to load that book.'
        });
      }
    });
  });

  mediator.on('preview:redraw', function() {
    if (currentPreview) {
      currentPreview.redraw();
    }
  });

  return BookPreviewView;
});