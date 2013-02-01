define(['underscore'], function(_) {
  var id_ndx = 1;

  return function(attributes) {
    return _.extend({
      id: id_ndx++,
      email: 'user@example.org',
      token: '1234567890abcdef',
      display_name: 'Anonymous'
    }, attributes);
  };
});