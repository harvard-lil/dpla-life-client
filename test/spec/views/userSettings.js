define([
  'mediator',
  'models/user',
  'mock/user',
  'views/userSettings'
], function(mediator, UserModel, UserMock, UserSettingsView) {

  describe('User Settings View', function() {
    var user, userSettings;

    beforeEach(function() {
      user = new UserModel(UserMock());
      setFixtures('<div class="test-target" />');
      userSettings = new UserSettingsView({
        el: '.test-target',
        model: user
      });
    });

    it('renders the user settings template', function() {
      expect(userSettings.$('.user-settings')).toExist();
    });

    describe('#deleteUser', function() {
      it('closes the modal', function() {
        spy = jasmine.createSpy('on modal close');
        mediator.on('modal:hide', spy);
        userSettings.deleteUser();
        expect(spy).toHaveBeenCalled();
      });

      it('triggers the user:destroy event', function() {
        spy = jasmine.createSpy('on user destroy');
        mediator.on('user:destroy', spy);
        userSettings.deleteUser();
        expect(spy).toHaveBeenCalledWith(user);
      });
    });
  });
});