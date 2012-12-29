define(['underscore'], function(_) {
  return function(attributes) {
    return _.extend({
      email: 'user@example.org'
    }, attributes);
  };
});