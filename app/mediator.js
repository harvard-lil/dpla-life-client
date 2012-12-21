define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var mediator = {};
  _.extend(mediator, Backbone.Events);
  return mediator;
});