define([
  'mediator',
  'views/appNav',
  'views/login',
  'views/signup'
], function(mediator, AppNavView, LoginView, SignupView) {

  describe('App Nav View', function() {
    var nav;

    beforeEach(function() {
      setFixtures('<div class="app-nav" />');
      nav = new AppNavView();
    });

    it('renders the app-nav template', function() {
      expect(nav.$('li')).toExist();
    });

    it('launches login modal when login link clicked', function() {
      var spy = jasmine.createSpy('on login modal');
      mediator.on('modal:show', spy);
      nav.$('.app-login').click();
      expect(spy).toHaveBeenCalledWith(LoginView);
    });

    it('launches signup modal when signup link clicked', function() {
      var spy = jasmine.createSpy('on login modal');
      mediator.on('modal:show', spy);
      nav.$('.app-signup').click();
      expect(spy).toHaveBeenCalledWith(SignupView);
    });
  });
});