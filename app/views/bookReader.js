define([
  'underscore',
  'jquery',
  'settings',
  'views/base',
  'text!templates/bookReader.html'
], function(_, $, settings, BaseView, BookReaderTemplate) {

  var BookReaderView = BaseView.extend({
    template: _.template(BookReaderTemplate),

    render: function() {
      $.ajax({
        url: settings.get('bookReadingTrackURL', this.model.get('source_id')),
        type: 'POST'
      });
      BaseView.prototype.render.call(this);
      this.$('.book-reader').css({
        width: $(window).width() * .85,
        height: $(window).height() * .85
      });
    }
  });

  return BookReaderView;
});