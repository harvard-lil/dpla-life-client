define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
], function($, _, Backbone, BaseView) {

  describe('Base View', function() {
    var base;

    beforeEach(function() {
      setFixtures('<div class="target" />');
      base = new BaseView({
        el: '.target',
        model: new Backbone.Model({ foo: 'bar' }),
        collection: new Backbone.Collection([
          new Backbone.Model({ lorem: 'ipsum' })
        ]),
        template: _.template('<p><%= model.get("foo") %></p>\
          <div><%= collection.at(0).get("lorem") %></div>')
      });
    });

    describe('#initialize', function() {
      it('renders on init', function() {
        expect(base.$('p')).toExist();
      });
    });

    describe('#render', function() {
      var render = function() {
        base.$el.empty();
        base.render();
      }

      it('uses the "template" attribute as the template', function() {
        render();
        expect(base.$('p')).toHaveText('bar');
      });

      it('extends template data with "helpers" methods', function() {
        base.helpers = {
          foo: function() {
            return 'baz';
          }
        };
        base.template = _.template('<span><%= helpers.foo() %></span>');
        render();
        expect(base.$('span')).toHaveText('baz');
      });

      it('extends template data with collection', function() {
        expect(base.$('div')).toHaveText('ipsum');
      });
    });

    describe('#destroy', function() {
      var spy;

      beforeEach(function() {
        spy = jasmine.createSpy('on click');
        base.delegateEvents({
          'click': spy
        });
      });

      it('undelegates all events', function() {
        base.destroy();
        base.$el.click();
        expect(spy).not.toHaveBeenCalled();
      });

      it('removes the view from the DOM', function() {
        base.destroy();
        expect($('.target')).not.toExist();
      });

      it('calls destroy on any subviews', function() {
        var child = new BaseView({
          model: {},
          template: _.template('')
        });
        var childSpy = jasmine.createSpy('on child destroy');
        child.destroy = childSpy;
        base.subviews.push(child);
        base.destroy();
        expect(childSpy).toHaveBeenCalled();
      });
    });

    describe('#clear', function() {
      var spy;

      beforeEach(function() {
        spy = jasmine.createSpy('on click');
        base.delegateEvents({
          'click': spy
        });
      });

      it('undelegates all events', function() {
        base.clear();
        base.$el.click();
        expect(spy).not.toHaveBeenCalled();
      });

      it('removes children of the element from the DOM', function() {
        base.clear();
        expect(base.$('p')).not.toExist();
      });

      it('calls destroy on any subviews', function() {
        var child = new BaseView({
          model: {},
          template: _.template('')
        });
        var childSpy = jasmine.createSpy('on child destroy');
        child.destroy = childSpy;
        base.subviews.push(child);
        base.clear();
        expect(childSpy).toHaveBeenCalled();
      });
    });
  });
});