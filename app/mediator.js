define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var Mediator = {};
  _.extend(Mediator, Backbone.Events);
  return Mediator;
});