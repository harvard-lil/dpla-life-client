define(['underscore'], function(_) {
  var idNdx = 1;

  return function(attributes) {
    return _.extend({
      rating: 5,
      comment: 'Lorem Ipsum Dolor'
    }, attributes);
  };
});