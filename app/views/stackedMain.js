define([
  'underscore',
  'settings',
  'mediator',
  'views/base',
  'views/stack',
  'views/bookPreview',
  'text!templates/stackedMain.html',
  
], function(
  _,
  settings,
  mediator,
  BaseView,
  StackView,
  BookPreviewView,
  StackedMainTemplate
) {

  var StackedMainView = BaseView.extend({
    el: '.app-main',
    template: _.template(StackedMainTemplate),

    events: {
      'click .stack-item-link': 'loadPreview'
    },
    
    loadPreview: function(event) {
      var $target = $(event.target).closest('.stack-item');
      var id = $target.data('stackviewItem')['source_id'];

      if ($target.hasClass('stack-pivot')) {
        return false;
      }

      this.$('.stack-pivot').removeClass('stack-pivot');
      $target.addClass('stack-pivot');

      mediator.trigger('navigate:book', id);
      event.preventDefault();
    }
  });

  return StackedMainView;
});