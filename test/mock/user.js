define(['underscore'], function(_) {
  return function(attributes) {
    return _.extend({
      email: 'user@example.org',
      token: '1234567890abcdef'
    }, attributes);
  };
});