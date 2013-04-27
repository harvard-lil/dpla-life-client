define([
  'underscore',
  'jquery',
  'mediator',
  'models/user',
  'views/base',
  'views/shelfForm',
  'views/appConfirm',
  'views/appNotify',
  'text!templates/shelf.html',
  
], function(
  _,
  $,
  mediator,
  UserModel,
  BaseView,
  ShelfFormView,
  appConfirm,
  appNotify,
  ShelfTemplate
) {

  var ShelfView = BaseView.extend({
    className: 'shelf-controls',
    template: _.template(ShelfTemplate),

    events: {
      'click .edit-shelf': 'editShelf',
      'click .delete-shelf': 'deleteShelf'
    },

    render: function() {
      var currentUser = UserModel.currentUser();
      if (currentUser && currentUser.get('id') === this.model.get('user_id')) {
        BaseView.prototype.render.call(this);
        $('.stack-wrapper').prepend(this.el);
      }
      else {
        this.destroy();
      }
    },

    editShelf: function(event) {
      mediator.trigger('modal:show', ShelfFormView, {
        model: this.model
      });
      event.preventDefault();
    },

    deleteShelf: function(event) {
      var userToken = UserModel.currentUser().get('token');
      var shelf = this.model;
      var shelfName = shelf.get('name');

      appConfirm({
        message: 'Are you sure you want to delete this shelf?',
        confirmText: 'Yes, Delete Shelf',
        onConfirm: function() {
          shelf.destroy({
            headers: {
              'Authorization': 'Token token=' + userToken
            },
            success: function() {
              appNotify.notify({
                type: 'notice',
                message: shelfName + ' shelf has been deleted.'
              });
              mediator.trigger('navigate:index');
              mediator.trigger('user:sync');
            },
            error: function(model, xhr, options) {
              appNotify.notify({
                type: 'error',
                message: 'There was a problem deleting this shelf.'
              });
            }
          });
        }
      });
      event.preventDefault();
    }
  });

  return ShelfView;
});