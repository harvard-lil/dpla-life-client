define([
  'backbone',
  'settings'
], function(Backbone, settings) {

  var ReviewModel = Backbone.Model.extend({
    urlRoot: settings.get('reviewURL'),
    
    validate: function(attributes) {
      if (!attributes.rating && !attributes.comment) {
        return 'Reviews must have a rating, a comment, or both.';
      }
    }
  });

  return ReviewModel;
});