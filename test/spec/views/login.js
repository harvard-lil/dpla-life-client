define([
  'mediator',
  'mock/user',
  'views/login'
], function(mediator, UserMock, LoginView) {

  describe('Login View', function() {
    var login;

    beforeEach(function() {
      setFixtures('<div class="test-target" />');
      login = new LoginView({ el: '.test-target' });
    });

    it('renders the login template', function() {
      expect(login.$('form')).toExist();
    });

    describe('#success', function() {
      var spy;

      it('closes the modal', function() {
        spy = jasmine.createSpy('on modal close');
        mediator.on('modal:hide', spy);
        login.success(UserMock());
        expect(spy).toHaveBeenCalled();
      });

      it('triggers the user:login event', function() {
        spy = jasmine.createSpy('on user login');
        mediator.on('user:login', spy);
        login.success(UserMock());
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('#error', function() {
      it('displays form errors', function() {
        login.error();
        expect(login.$('.form-errors')).not.toBeEmpty();
      });
    });
  });
});