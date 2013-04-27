define([
  'underscore',
  'jquery',
  'mediator',
  'settings',
  'models/user',
  'views/base',
  'views/appConfirm',
  'views/appNotify',
  'text!templates/stackview.html',
  'text!templates/stackview-book.html',
  'stackview',
  'jquery-ui'
], function(
  _,
  $,
  mediator,
  settings,
  UserModel,
  BaseView,
  appConfirm,
  appNotify,
  StackTemplate,
  StackViewBookTemplate
) {
  
  window.StackView.defaults.book.min_height_percentage = 66;

  var StackView = BaseView.extend({
    el: '.stack-wrapper',
    template: _.template(StackTemplate),

    events: {
      'click .stack-item-delete': 'removeFromShelf'
    },

    initialize: function(options) {
      if (options.data == null && options.url == null) {
        throw new Error('Stack data or url is required');
      }
      if (options.bookTemplate == null) {
        options.bookTemplate = StackViewBookTemplate;
      }
      BaseView.prototype.initialize.call(this, options);
      if (options.fullHeight) {
        $(window).resize(_.bind(this._resize, this));
      }
      this.$('.stackview')
        .on('stackview.pageload', _.bind(this._highlightCurrent, this))
        .on('stackview.pageload', _.bind(this._qtipify, this));
      if (options.sortable) {
        this._makeShelfSortable();
      }
    },

    render: function() {
      BaseView.prototype.render.call(this);
      window.StackView.get_types().book.template = this.options.bookTemplate;
      if (this.options.selectFirstBook) {
        this.$('.stackview').one('stackview.pageload', _.bind(function() {
          var $first = this.$('.stack-item').first().addClass('stack-pivot');
          if (!$first.length) { return; }
          var id = $first.data('stackviewItem').source_id;
          mediator.trigger('preview:load', id);
        }, this));
      }
      this.$('.stackview').stackView(this.options);
      if (this.options.fullHeight) {
        this._resize();
      }
    },

    removeFromShelf: function(event) {
      var self = this;
      var $target = $(event.target).closest('.stack-item');
      var bookID = $target.data('stackviewItem')['source_id'];
      var userToken = UserModel.currentUser().get('token');

      var onConfirm = function() {
        $.ajax({
          type: 'delete',
          url: settings.get('shelfRemoveURL', self.model.get('id'), bookID),
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
      };

      appConfirm({
        message: 'Are you sure you want to take that book off the shelf?',
        confirmText: 'Yes, Remove Book',
        onConfirm: onConfirm
      });

      event.preventDefault();
    },

    _resize: function() {
      var $stack = this.$('.stackview');
      var windowHeight = window.innerHeight ?
                         window.innerHeight :
                         $(window).height();
      var targetHeight;
      if ($stack.length) {
        targetHeight = Math.max(windowHeight - $stack.offset().top, 520);
      }
      $stack.height(targetHeight);
    },

    _highlightCurrent: function() {
      var pivot = this.options.pivot;
      if (!pivot) return;

      this.$('.stack-item').filter(function() {
        return $(this).data('stackviewItem').source_id === pivot;
      }).addClass('stack-pivot');
    },

    _qtipify: function() {
      this.$('.stack-item-link:not(.qtipped)').addClass('qtipped').qtip();
    },

    _makeShelfSortable: function() {
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
    }
  });
  var currentStack;

  mediator.on('stack:load', function(options) {
    if (currentStack) {
      currentStack.clear();
    }
    currentStack = new StackView(options);
  });

  mediator.on('stack:redraw', function() {
    var options;
    if (currentStack) {
      options = currentStack.options;
      currentStack.clear();
      currentStack = new StackView(options);
    }
  });

  return StackView;
});