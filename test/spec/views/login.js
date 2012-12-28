define([
  'views/login'
], function(LoginView) {

  describe('Login View', function() {
    var login;

    beforeEach(function() {
      setFixtures('<div class="test-target" />');
      login = new LoginView({ el: '.test-target' });
    });

    it('renders the login template', function() {
      expect(login.$('form')).toExist();
    });
  });
});