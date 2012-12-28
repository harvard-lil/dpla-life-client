define([
  'underscore',
  'backbone',
  'views/base',
  'views/modal',
  'mediator'
], function(_, Backbone, BaseView, ModalView, mediator) {

  describe('Modal View', function() {
    var ViewClass = BaseView.extend({
      template: _.template('<p><%= model.get("foo") %></p>')
    });
    var modal, spy;

    beforeEach(function() {
      setFixtures('<div class="app-modal" />');
      modal = new ModalView();
    });

    it('renders the modal template', function() {
      expect(modal.$('.modal-container')).toExist();
    });

    describe('#show(ViewClass, options)', function() {
      var spy;

      beforeEach(function() {
        spy = jasmine.createSpy('on center method');
        modal.center = spy;
        modal.show(ViewClass, {
          model: new Backbone.Model({ foo: 'bar' })
        });
      });

      it('renders the subview in the modal container', function() {
        expect(modal.$('.modal-container p')).toHaveText('bar');
      });

      it('adds the showing class to the modal', function() {
        expect(modal.$el).toHaveClass('showing');
      });

      it('adds the subview to subviews array', function() {
        expect(modal.subviews[0] instanceof ViewClass).toBeTruthy();
      });

      it('centers the container', function() {
        expect(spy).toHaveBeenCalled();
      });

      it('can be triggered through modal:show event', function() {
        modal.hide();
        mediator.trigger('modal:show', ViewClass, {
          model: new Backbone.Model({ foo: 'bar' })
        });
        expect(modal.$el).toHaveClass('showing');
      });
    });

    describe('#hide', function() {
      beforeEach(function() {
        modal.show(ViewClass, {
          model: new Backbone.Model({ foo: 'bar' })
        });
        modal.hide();
      });

      it('clears out the modal container', function() {
        expect(modal.$('.modal-container')).toBeEmpty();
      });

      it('removes all subviews', function() {
        expect(modal.subviews.length).toEqual(0);
      });

      it('removes showing class from modal', function() {
        expect(modal.$el).not.toHaveClass('showing');
      });

      it('can be triggered through modal:hide event', function() {
        modal.show(ViewClass, {
          model: new Backbone.Model({ foo: 'bar' })
        });
        mediator.trigger('modal:hide');
        expect(modal.$el).not.toHaveClass('showing');
      });

      it('can be triggered by clicking the overlay', function() {
        modal.show(ViewClass, {
          model: new Backbone.Model({ foo: 'bar' })
        });
        modal.$el.click();
        expect(modal.$el).not.toHaveClass('showing');
      });
    });

    describe('#center', function() {
      beforeEach(function() {
        modal.show(ViewClass, {
          model: new Backbone.Model({ foo: 'bar' })
        });
        modal.$el.css({
          width: 100,
          height: 100
        });
        modal.$('.modal-container').css({
          width: 50,
          height: 50,
          position: 'absolute'
        });
        modal.center();
      });

      it('centers container within the modal', function() {
        expect(modal.$('.modal-container')).toHaveCss({
          left: '25px',
          top: '25px'
        });
      });

      it('limits left and top to 0 or positive values', function() {
        modal.$el.css({
          width: 30,
          height: 30
        });
        modal.center();
        expect(modal.$('.modal-container')).toHaveCss({
          left: '0px',
          top: '0px'
        });
      });

      it('can be triggered through modal:center event', function() {
        modal.$el.css({
          width: 60,
          height: 60
        });
        mediator.trigger('modal:center');
        expect(modal.$('.modal-container')).toHaveCss({
          left: '5px',
          top: '5px'
        });
      });
    });
  });
});