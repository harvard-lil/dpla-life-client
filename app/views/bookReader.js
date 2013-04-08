define([
  'underscore',
  'jquery',
  'views/base',
  'text!templates/bookReader.html'
], function(_, $, BaseView, BookReaderTemplate) {

  var BookReaderView = BaseView.extend({
    template: _.template(BookReaderTemplate),

    render: function() {
      BaseView.prototype.render.call(this);
      this.$('.book-reader').css({
        width: $(window).width() * .85,
        height: $(window).height() * .85
      });
    }
  });

  return BookReaderView;
});