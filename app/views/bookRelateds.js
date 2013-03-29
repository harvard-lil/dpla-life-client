define([
  'underscore',
  'jquery',
  'settings',
  'mediator',
  'views/base',
  'views/stack',
  'text!templates/bookRelateds.html'
], function(
  _,
  $,
  settings,
  mediator,
  BaseView,
  StackView,
  BookRelatedsTemplate
) {

  var BookRelatedsView = BaseView.extend({
    template: _.template(BookRelatedsTemplate),

    events: {
      'click .single-subject': 'loadSingleSubject',
      'click .subject-union': 'loadSubjectUnion',
      'click .subject-intersection': 'loadSubjectIntersection',
      'click .neighbors': 'loadNeighbors',
      'click .related-category a': 'setActiveButton',
      'click .stack-item-link': 'loadPreview'
    },

    render: function() {
      BaseView.prototype.render.call(this);
      _.delay(_.bind(function() {
        self.$('.single-subject').first().trigger('click')
      }, this), 10);
    },

    loadNeighbors: function() {
      var self = this;

      var onError = function() {
        self.loadStack({
          data: { num_found:0, docs: [] },
          ribbon: 'Shelf Neighbors'
        });
      };

      var onSuccess = function(data) {
        self.loadStack({
          data: data,
          ribbon: 'Shelf Neighbors'
        });
      };

      $.ajax({
        url: settings.get('neighborsURL', this.model.get('source_id')),
        datatype: 'json',
        success: onSuccess,
        error: onError
      });
    },

    loadSingleSubject: function(event) {
      var subject = $(event.target).data('subject');

      this.loadStack({
        url: settings.get('searchURL'),
        search_type: 'subject',
        query: subject,
        ribbon: subject
      });
    },

    loadSubjectUnion: function(event) {
      this.loadStack({
        url: settings.get('searchURL'),
        search_type: 'subject_union',
        query: this.model.get('source_id'),
        ribbon: 'Share Any Subject'
      });
    },

    loadSubjectIntersection: function(event) {
      this.loadStack({
        url: settings.get('searchURL'),
        search_type: 'subject_intersection',
        query: this.model.get('source_id'),
        ribbon: 'Share All Subjects'
      });
    },

    loadStack: function(options) {
      _.invoke(this.subviews, 'clear');
      this.subviews = [new StackView(_.extend({
        el: '.book-relateds .stack-wrapper'
      }, options))];
    },

    setActiveButton: function(event) {
      this.$('.related-category a').removeClass('active');
      $(event.target).addClass('active');
      event.preventDefault();
    },

    loadPreview: function(event) {
      var $target = $(event.target).closest('.stack-item');
      var id = $target.data('stackviewItem')['source_id'];

      mediator.trigger('preview:load', id);
      event.preventDefault();
    }
  });

  return BookRelatedsView;
});