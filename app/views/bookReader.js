define([
  'underscore',
  'views/base',
  'text!templates/bookReader.html'
], function(_, BaseView, BookReaderTemplate) {

  var BookReaderView = BaseView.extend({
    template: _.template(BookReaderTemplate)
  });

  return BookReaderView;
});