define([
  'underscore',
  'jquery',
  'mediator',
  'settings',
  'models/user',
  'collections/review',
  'views/base',
  'views/reviews',
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
  BookTemplate
) {

  var BookView = BaseView.extend({
    el: '.app-main',
    template: _.template(BookTemplate),

    events: {
      'submit .add-to-shelf-form': 'addBookToShelf'
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

      reviews.bookID = this.model.get('_id');
      reviews.fetch({
        success: function(collection, response, options) {
          self.subviews.push(new ReviewsView({ collection: collection }));
        },
        error: function(collection, xhr, options) {
          // TODO
        }
      });
    },

    addBookToShelf: function(event) {
      var shelfID = this.$('.add-to-shelf-form [name="shelf_id"]').val();
      var bookID = this.model.get('_id');
      var userToken = UserModel.currentUser().get('token');

      $.ajax({
        type: 'post',
        url: settings.get('shelfPushURL', shelfID),
        data: { book_id: bookID },
        headers: {
          'Authorization': 'Token token=' + userToken
        },
        success: function() {
          // TODO: App notify
        },
        error: function() {
          // TODO: App notify
        }
      });
      event.preventDefault();
    }
  });

  return BookView;
});