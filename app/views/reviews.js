define([
  'underscore',
  'mediator',
  'settings',
  'models/user',
  'models/review',
  'views/base',
  'text!templates/reviews.html',
  'jquery.serialize-object'
], function(
  _, 
  mediator, 
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
      var self = this;

      this.helpers = {
        currentUser: function() {
          return UserModel.currentUser();
        }
      };
      BaseView.prototype.initialize.call(this, options);
      mediator.on('user:login user:logout', function() {
        self.clear();
        self.render();
      });
    },

    submitReview: function(event) {
      var reviewObject = this.$('.new-review form').serializeObject().review;
      var userToken = UserModel.currentUser().get('token');

      var ret = this.options.collection.create(reviewObject, {
        url: this.options.collection.url(),
        headers: {
          'Authorization': 'Token token=' + userToken
        },
      });
      event.preventDefault();
    }
  });

  return ReviewsView;
});