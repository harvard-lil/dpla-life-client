define([
  'underscore',
  'jquery',
  'mediator',
  'settings',
  'models/user',
  'views/base',
  'text!templates/shelf.html',
  'text!templates/stackview-book.html',
  'text!templates/stackview-shelf-book.html',
  'stackview',
  'views/bookPreview',
  'jquery-ui'
], function(
  _,
  $,
  mediator,
  settings,
  UserModel,
  BaseView,
  ShelfTemplate,
  StackViewBookTemplate,
  StackViewShelfBookTemplate
) {

  var ShelfView = BaseView.extend({
    el: '.app-main',
    template: _.template(ShelfTemplate),

    events: {
      'click .stack-item-link': 'loadPreview',
      'click .stack-item-delete': 'removeFromShelf'
    },

    initialize: function(options) {
      BaseView.prototype.initialize.call(this, options);
      mediator.on('user:login user:logout', _.bind(this.redraw, this));
    },

    render: function() {
      BaseView.prototype.render.call(this);
      var user = UserModel.currentUser();

      if (user && user.get('id') === this.model.get('user_id')) {
        StackView.get_types().book.template = StackViewShelfBookTemplate;
      }
      else {
        StackView.get_types().book.template = StackViewBookTemplate; 
      }
      StackView.defaults.book.min_height_percentage = 85;
      this.loadShelfStack();
    },

    loadShelfStack: function() {
      var self = this;

      $.ajax({
        url: settings.get('searchURL'),
        datatype: 'json',
        data: {
          ids: self.model.get('book_ids')
        },
        success: function(data) {
          var user = UserModel.currentUser();
          
          self.$('.stackview').stackView({
            data: data,
            ribbon: self.model.get('name')
          });
          if (user && user.get('id') === self.model.get('user_id')) {
            self.makeShelfSortable();
          }
        },
        error: function() {
          // TODO
        }
      });
    },

    loadPreview: function(event) {
      var $target = $(event.target).closest('.stack-item');
      var id = $target.data('stackviewItem')['_id'];

      mediator.trigger('preview:load', id);
      event.preventDefault();
    },

    removeFromShelf: function(event) {
      var self = this;
      var $target = $(event.target).closest('.stack-item');
      var id = $target.data('stackviewItem')['_id'];
      var userToken = UserModel.currentUser().get('token');

      this.model.save({
        book_ids: _.without(this.model.get('book_ids'), id)
      }, {
        headers: {
          'Authorization': 'Token token=' + userToken
        },
        success: function() {
          self.$('.stackview').stackView('remove', $target);
        },
        error: function() {
          // TODO
        }
      });

      event.preventDefault();
    },

    makeShelfSortable: function() {
      var self = this;
      var $stackview = this.$('.stackview');
      var $stackItems = $stackview.find('.stack-items');

      $stackItems.disableSelection();
      $stackItems.sortable({
        containment: 'parent',

        start: function(event, ui) {
          $stackItems.css('overflow-x', 'hidden');
        },

        stop: function(event, ui) {
          $stackItems.css('overflow-x', 'auto');
        },

        update: function(event, ui) {
          var book_ids = [];
          var userToken = UserModel.currentUser().get('token');

          $stackItems.sortable('disable');
          $stackItems.find('.stack-item').each(function() {
            book_ids.push($(this).data('stackviewItem')['_id']);
          });

          self.model.save({
            book_ids: book_ids
          }, {
            headers: {
              'Authorization': 'Token token=' + userToken
            },
            success: function() {
              $stackItems.sortable('enable');
              // TODO
            },
            error: function() {
              // TODO
            }
          });

          $stackview.stackView('zIndex');
        }
      });
    }
  });

  return ShelfView;
});