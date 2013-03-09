define([
  'underscore',
  'jquery',
  'mediator',
  'settings',
  'models/user',
  'views/base',
  'views/appNotify',
  'views/appConfirm',
  'views/stack',
  'views/covers',
  'text!templates/shelf.html',
  'text!templates/stackview-shelf-book.html',
  'views/bookPreview',
  'jquery-ui'
], function(
  _,
  $,
  mediator,
  settings,
  UserModel,
  BaseView,
  appNotify,
  appConfirm,
  StackView,
  CoversView,
  ShelfTemplate,
  StackViewShelfBookTemplate
) {

  var ShelfView = BaseView.extend({
    el: '.app-main',
    template: _.template(ShelfTemplate),

    events: {
      'click .stack-item-link': 'loadPreview',
      'click .stack-item-delete': 'removeFromShelf',
      'click .stack-layout-options a': 'layoutAs',
    },

    initialize: function(options) {
      this.stackType = 'stackview';
      this.helpers = {
        isActiveType: _.bind(function(type) {
          return this.stackType === type ? 'active' : '';
        }, this)
      };
      BaseView.prototype.initialize.call(this, options);
      mediator.on('user:login user:logout', _.bind(this.redraw, this));
    },

    render: function() {
      BaseView.prototype.render.call(this);
      this.loadShelfStack();
    },

    renderStack: function(data) {
      var user = UserModel.currentUser();
      var owned = user && user.get('id') === this.model.get('user_id');
      var bookTemplate;

      if (owned) {
        bookTemplate = StackViewShelfBookTemplate;
      }
      _.invoke(this.subviews, 'clear');
      this.subviews = [];
      if (this.stackType === 'stackview') {
        this.subviews.push(new StackView({
          el: '.stack-wrapper',
          data: data,
          ribbon: this.model.get('name'),
          bookTemplate: bookTemplate
        }));
        if (owned) {
          this.makeShelfSortable();
        }
      }
      else if (this.stackType === 'covers') {
        this.subviews.push(new CoversView({
          el: '.stack-wrapper',
          data: data,
          ribbon: this.model.get('name')
        }));
      }
    },

    loadShelfStack: function() {
      var onError = function() {
        appNotify.notify({
          type: 'error',
          message: 'Something went wrong trying to load the books for this shelf.'
        });
      };

      if (this.model.get('book_ids') && this.model.get('book_ids').length) {
        $.ajax({
          url: settings.get('searchURL'),
          datatype: 'json',
          data: { ids: this.model.get('book_ids') },
          success: _.bind(this.renderStack, this),
          error: onError
        });
      }
      else {
        this.renderStack({
          docs: [],
          num_found: 0
        })
      }
    },

    loadPreview: function(event) {
      var $target = $(event.target).closest('.stack-item');
      var id = $target.data('stackviewItem')['source_id'];

      mediator.trigger('preview:load', id);
      event.preventDefault();
    },

    removeFromShelf: function(event) {
      var self = this;
      var $target = $(event.target).closest('.stack-item');
      var id = $target.data('stackviewItem')['source_id'];
      var userToken = UserModel.currentUser().get('token');

      var onConfirm = function() {
        self.model.save({
          book_ids: _.without(self.model.get('book_ids'), id)
        }, {
          headers: {
            'Authorization': 'Token token=' + userToken
          },
          success: function() {
            self.$('.stackview').stackView('remove', $target);
          },
          error: function() {
            appNotify.notify({
              type: 'error',
              message: 'Something went wrong trying to remove that book from this shelf.'
            });
          }
        });
      }

      appConfirm({
        message: 'Are you sure you want to take that book off the shelf?',
        confirmText: 'Yes, Remove Book',
        onConfirm: onConfirm
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
            book_ids.push($(this).data('stackviewItem')['source_id']);
          });

          self.model.save({
            book_ids: book_ids
          }, {
            headers: {
              'Authorization': 'Token token=' + userToken
            },
            success: function() {
              $stackItems.sortable('enable');
            },
            error: function() {
              appNotify.notify({
                type: 'error',
                message: 'Something went wrong sorting the books on this shelf. Sorting is disabled until the page is reloaded.'
              });
            }
          });

          $stackview.stackView('zIndex');
        }
      });
    },

    layoutAs: function(event) {
      var $target = $(event.target);
      var type = $target.data('type');

      event.preventDefault();
      if ($target.hasClass('active')) return;

      this.$('.stack-layout-options a').removeClass('active');
      $target.addClass('active');
      this.stackType = type;
      this.loadShelfStack();
    }
  });

  return ShelfView;
});