define([
  'mediator',
  'mock/user',
  'models/user',
  'views/signup'
], function(mediator, UserMock, UserModel, SignupView) {

  describe('Signup View', function() {
    var signup, user;

    beforeEach(function() {
      setFixtures('<div class="test-target" />');
      signup = new SignupView({ el: '.test-target' });
      user = new UserModel(UserMock());
    });

    it('renders the signup template', function() {
      expect(signup.$('form')).toExist();
    });

    describe('#success', function() {
      var spy;

      it('closes the modal', function() {
        spy = jasmine.createSpy('on modal close');
        mediator.on('modal:hide', spy);
        signup.success(user);
        expect(spy).toHaveBeenCalled();
      });

      it('triggers the user:login event', function() {
        spy = jasmine.createSpy('on user login');
        mediator.on('user:login', spy);
        signup.success(user);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('#error', function() {
      it('displays form errors', function() {
        signup.error(null, {responseText:'{"errors":[{"message":"Lorem"}]}'});
        expect(signup.$('.form-errors')).not.toBeEmpty();
      });
    });
  });
});