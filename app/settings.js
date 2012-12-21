/*
Global settings object. Settings can either be a static property:

  foo: 'bar'
  baz: 1

Or a function:

  foo: function() { return 1; }

In either case, settings are accessed via the "get" method returned from
this module.

  settings.get('foo');

If the setting is a function that accepts arguments, those arguments can be
passed as additional arguments to .get:

  foo: function(n) { return n+1; }
  
  settings.get('foo', 4); // returns 5
*/

define(['underscore'], function(_) {
  var settings = {
    indexSearchTerm: 'foo',
    indexStackURL: 'http://localhost:3000/search',
    indexStackRibbon: 'Index Stack',

    searchURL: 'http://localhost:3000/search'
  };

  return {
    get: function(key) {
      var setting = settings[key];
      if (_.isFunction(setting)) {
        return setting(Array.prototype.slice.call(arguments, 1));
      }
      return setting;
    }
  }
});