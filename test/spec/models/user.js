define([
  'models/user',
  'mock/user'
], function(UserModel, UserMock) {

  describe('User Model', function() {
    var user, spy;

    it('has a valid mock', function() {
      spy = jasmine.createSpy('on error event');
      user = new UserModel();
      user.on('error', spy);
      user.set(UserMock());
      expect(spy).not.toHaveBeenCalled();
    });
  });
});