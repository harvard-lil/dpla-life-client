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
  // Production and all-environment settings
  var settings = {
    indexSearchTerm: 'foo',
    indexStackRibbon: 'Index Stack'
  };

  // Dev settings
  if (window.location.host.indexOf('localhost') !== -1) {
    _.extend(settings, {
      bookURL: 'http://localhost:3000/books',
      indexStackURL: 'http://localhost:3000/search',
      searchURL: 'http://localhost:3000/search',
      userURL: 'http://localhost:3000/users',
      sessionURL: 'http://localhost:3000/session'
    });
  }
  // GH staging settings
  else if (window.location.host.indexOf('imakewebthings.com') !== -1) {
    _.extend(settings, {
      bookURL: 'http://dpla-life-service-dev.herokuapp.com/books',
      indexStackURL: 'http://dpla-life-service-dev.herokuapp.com/search',
      searchURL: 'http://dpla-life-service-dev.herokuapp.com/search',
      userURL: 'http://dpla-life-service-dev.herokuapp.com/users',
      sessionURL: 'http://dpla-life-service-dev.herokuapp.com/session'
    });
  }

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