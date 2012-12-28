define([
  'views/signup'
], function(SignupView) {

  describe('Signup View', function() {
    var signup;

    beforeEach(function() {
      setFixtures('<div class="test-target" />');
      signup = new SignupView({ el: '.test-target' });
    });

    it('renders the signup template', function() {
      expect(signup.$('form')).toExist();
    });
  });
});