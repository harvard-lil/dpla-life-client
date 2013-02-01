define([
  'underscore',
  'mediator',
  'views/appNav',
  'views/login',
  'views/signup',
  'views/userSettings',
  'models/user',
  'mock/user',
  'text!templates/appNav-loggedOut.html',
  'text!templates/appNav-loggedIn.html'
], function(
  _,
  mediator,
  AppNavView,
  LoginView,
  SignupView,
  UserSettingsView,
  UserModel,
  UserMock,
  LoggedOutTemplate,
  LoggedInTemplate
) {

  describe('App Nav View', function() {
    var nav;

    beforeEach(function() {
      setFixtures('<div class="app-nav" />');
    });

    describe('when logged out', function() {
      beforeEach(function() {
        nav = new AppNavView({ template: _.template(LoggedOutTemplate) });
      });

      it('renders the logged-out template', function() {
        expect(nav.$('.app-login')).toExist();
      });

      it('launches login modal when login link clicked', function() {
        var spy = jasmine.createSpy('on login modal');
        mediator.on('modal:show', spy);
        nav.$('.app-login').click();
        expect(spy).toHaveBeenCalledWith(LoginView);
      });

      it('launches signup modal when signup link clicked', function() {
        var spy = jasmine.createSpy('on signup modal');
        mediator.on('modal:show', spy);
        nav.$('.app-signup').click();
        expect(spy).toHaveBeenCalledWith(SignupView);
      });
    });

    describe('when logged in', function() {
      beforeEach(function() {
        nav = new AppNavView({
          template: _.template(LoggedInTemplate),
          model: new UserModel(UserMock())
        });
      });

      it('renders the logged-in template', function() {
        expect(nav.$('.app-logout')).toExist();
      });

      it('logs user out when logout link clicked', function() {
        var spy = jasmine.createSpy('on user logout');
        mediator.on('user:logout', spy);
        nav.$('.app-logout').click();
        expect(spy).toHaveBeenCalled();
      });

      it('launches user settings modal when settings clicked', function() {
        var spy = jasmine.createSpy('on user settings modal');
        mediator.on('modal:show', spy);
        nav.$('.app-settings').click();
        expect(spy).toHaveBeenCalledWith(UserSettingsView, {
          model: nav.model
        });
      });
    });
  });
});