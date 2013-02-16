define([
  'jquery',
  'views/appConfirm',
  'views/modal'
], function($, appConfirm, ModalView) {

  describe('Confirm View', function() {
    var confirmSpy, denySpy;

    beforeEach(function() {
      confirmSpy = jasmine.createSpy('on confirm');
      denySpy = jasmine.createSpy('on deny');
      setFixtures('<div class="app-modal" />');
      new ModalView();

      appConfirm({
        message: 'Test message',
        confirmText: 'Test yes',
        denyText: 'Test no',
        onConfirm: confirmSpy,
        onDeny: denySpy
      });
    });

    it('displays the message', function() {
      expect($('.confirm-message')).toHaveText('Test message');
    });

    it('uses the confirm text in the confirm button', function() {
      expect($('.confirm-action')).toHaveText('Test yes');
    });

    it('uses the deny text in the deny button', function() {
      expect($('.deny-action')).toHaveText('Test no');
    });

    it('shows the confirmation modal', function() {
      expect($('.app-modal')).toHaveClass('showing');
    });

    describe('when confirmed', function() {
      beforeEach(function() {
        $('.app-modal .confirm-action').click();
      });

      it('runs the onConfirm callback', function() {
        expect(confirmSpy).toHaveBeenCalled();
      });

      it('closes the confirm dialog', function() {
        expect($('.app-modal')).not.toHaveClass('showing');
      });
    });

    describe('when denied', function() {
      beforeEach(function() {
        $('.app-modal .deny-action').click();
      });

      it('runs the onDeny callback', function() {
        expect(denySpy).toHaveBeenCalled();
      });

      it('closes the confirm dialog', function() {
        expect($('.app-modal')).not.toHaveClass('showing');
      });
    });
  });
});