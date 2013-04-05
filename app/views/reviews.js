define([
  'underscore',
  'mediator',
  'jquery',
  'JSON',
  'views/appNotify',
  'views/appConfirm',
  'settings',
  'models/user',
  'models/review',
  'views/base',
  'text!templates/reviews.html',
  'jquery.serialize-object'
], function(
  _, 
  mediator,
  $,
  JSON,
  appNotify,
  appConfirm,
  settings, 
  UserModel, 
  ReviewModel, 
  BaseView, 
  ReviewsTemplate
  ) {

  var ReviewsView = BaseView.extend({
    el: '.book-reviews',
    template: _.template(ReviewsTemplate),

    events: {
      'submit .new-review form': 'submitReview',
      'click .delete-review': 'deleteReview'
    },

    initialize: function(options) {
      var self = this;

      this.helpers = {
        currentUser: function() {
          return UserModel.currentUser();
        },
        userHasReview: function() {
          var user = UserModel.currentUser();
          if (user) {
            return options.collection.some(function(review) {
              return review.get('user').id === user.id;
            });
          }
        },
        reviewsWithComments: function() {
          return options.collection.filter(function(review) {
            return review.get('comment');
          });
        },
        averageRating: function() {
          var reviews = options.collection.reject(function(review) {
            return review.get('rating') == null;
          });
          var total = reviews.reduce(function(memo, review) {
            return memo + review.get('rating');
          }, 0);
          var avg;

          if (reviews.length) {
            avg = total / reviews.length;
            return Math.round(avg * 2) / 2;
          }
          return null; // No reviews with ratings
        }
      };
      BaseView.prototype.initialize.call(this, options);
      mediator.on('user:login user:logout', _.bind(this.redraw, this));
      options.collection.on('remove change', _.bind(this.redraw, this));
    },

    submitReview: function(event) {
      var reviewObject = this.$('.new-review form').serializeObject().review;
      var userToken = UserModel.currentUser().get('token');

      this.clearErrors();
      this.options.collection.create(reviewObject, {
        url: this.options.collection.url(),
        headers: {
          'Authorization': 'Token token=' + userToken
        },
        error: _.bind(this.error, this)
      });
      event.preventDefault();
    },

    error: function(model, response, options) {
      var errors = [{message: response}];
      var $formErrors = this.$('.form-errors');
      
      if (response.responseText) {
        errors = JSON.parse(response.responseText).errors;
      }
      _.each(errors, function(error) {
        $formErrors.append('<li>' + error.message + '</li>');
      });
    },

    clearErrors: function() {
      this.$('.form-errors').text('');
    },

    deleteReview: function(event) {
      var userToken = UserModel.currentUser().get('token');
      var reviewID = $(event.target).closest('.review').data('reviewid');
      var review = this.options.collection.get(reviewID);

      appConfirm({
        message: 'Are you sure you want to delete your review?',
        confirmText: 'Yes, Delete Review',
        onConfirm: function() {
          review.destroy({
            headers: {
              'Authorization': 'Token token=' + userToken
            },

            success: function() {
              appNotify.notify({
                type: 'notice',
                message: 'Your review has been deleted.'
              });
            },

            error: function() {
              appNotify.notify({
                type: 'error',
                message: 'Something went wrong when trying to delete your review.'
              });
            }
          });
        }
      });
      event.preventDefault();
    }
  });

  return ReviewsView;
});