define([
  'underscore',
  'mediator',
  'JSON',
  'settings',
  'models/user',
  'models/review',
  'views/base',
  'text!templates/reviews.html',
  'jquery.serialize-object'
], function(
  _, 
  mediator,
  JSON,
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
      'submit .new-review form': 'submitReview'
    },

    initialize: function(options) {
      this.helpers = {
        currentUser: function() {
          return UserModel.currentUser();
        },
        userHasReview: function() {
          var user = UserModel.currentUser();
          if (user) {
            return options.collection.where({ user_id: user.id}).length;
          }
        }
      };
      BaseView.prototype.initialize.call(this, options);
      mediator.on('user:login user:logout', _.bind(this.redraw, this));
      options.collection.on('change', _.bind(this.redraw, this));
    },

    submitReview: function(event) {
      var reviewObject = this.$('.new-review form').serializeObject().review;
      var userToken = UserModel.currentUser().get('token');

      this.clearErrors();
      var ret = this.options.collection.create(reviewObject, {
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
    }
  });

  return ReviewsView;
});