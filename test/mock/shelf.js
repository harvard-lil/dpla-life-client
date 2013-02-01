define(['underscore'], function(_) {
  var idNdx = 1;

  return function(attributes) {
    return _.extend({
      id: idNdx++,
      name: "Mock Shelf",
      description: 'Lorem Ipsum Dolor',
      user_id: 1,
      book_ids: [1,2,3,4,5]
    }, attributes);
  };
});