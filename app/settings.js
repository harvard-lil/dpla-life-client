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
  // Environment agnostic settings
  var settings = {
    indexSearchTerm: 'foo',
    indexStackRibbon: 'Index Stack',

    bookURL: function() {
      return settings.apiRoot + '/books';
    },
    bookReviewsURL: function(bookID) {
      return [settings.bookURL(), bookID, 'reviews'].join('/');
    },
    indexStackURL: function() {
      return settings.apiRoot + '/search';
    },
    reviewURL: function() {
      return settings.apiRoot + '/reviews';
    },
    searchURL: function() {
      return settings.apiRoot + '/search';
    },
    sessionURL: function() {
      return settings.apiRoot + '/session';
    },
    userURL: function() {
      return settings.apiRoot + '/users';
    }
  };

  // Dev settings
  if (window.location.host.indexOf('localhost') !== -1) {
    _.extend(settings, {
      apiRoot: 'http://localhost:3000'
    });
  }
  // GH staging settings
  else if (window.location.host.indexOf('imakewebthings.com') !== -1) {
    _.extend(settings, {
      apiRoot: 'http://dpla-life-service-dev.herokuapp.com'
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