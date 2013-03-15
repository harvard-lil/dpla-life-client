define([
  'underscore',
  'jquery',
  'mediator',
  'settings',
  'models/user',
  'collections/review',
  'views/base',
  'views/reviews',
  'views/bookReader',
  'views/appNotify',
  'text!templates/book.html'
], function(
  _,
  $,
  mediator,
  settings,
  UserModel,
  ReviewCollection,
  BaseView,
  ReviewsView,
  BookReaderView,
  appNotify,
  BookTemplate
) {

  var BookView = BaseView.extend({
    el: '.app-main',
    template: _.template(BookTemplate),

    events: {
      'submit .add-to-shelf-form': 'addBookToShelf',
      'click .book-viewer a': 'loadBookReader'
    },

    initialize: function(options) {
      this.helpers = {
        currentUser: function() {
          return UserModel.currentUser();
        }
      };
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
        data: { book_id: bookID },
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
    },

    loadBookReader: function(event) {
      mediator.trigger('modal:show', BookReaderView, { model: this.model });
      event.preventDefault();
    }
  });

  return BookView;
});