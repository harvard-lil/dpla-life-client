define([
  'underscore',
  'jquery',
  'settings',
  'mediator',
  'views/base',
  'views/stack',
  'text!templates/bookRelateds.html',
  'jquery.qtip'
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
      'click .neighbors.enabled': 'loadNeighbors',
      'click .related-category a': 'setActiveButton'
    },

    initialize: function(options) {
      BaseView.prototype.initialize.call(this, options);
      this.loadNeighborData();
    },

    render: function() {
      BaseView.prototype.render.call(this);
      this.$('.related-category .button').qtip();
    },

    loadNeighborData: function() {
      var onSuccess = _.bind(function(data) {
        this._neighborData = data;
        if (data) {
          this.$('.neighbors').removeClass('disabled').addClass('enabled');  
        }
        else {
          this.$('.neighbors').closest('.related-category').remove();
        }

        if (!$('.stackview').length) {
          this.$('.button').first().click();
        }
      }, this);

      $.ajax({
        url: settings.get('neighborsURL', this.model.get('source_id')),
        datatype: 'json',
        success: onSuccess
      });
    },

    loadNeighbors: function(event) {
      this.loadStack({
        data: this._neighborData,
        ribbon: 'User Shelves'
      });
    },

    loadSingleSubject: function(event) {
      var subject = $(event.target).data('subject');

      this.loadStack({
        url: settings.get('searchURL'),
        search_type: 'subject',
        query: subject,
        ribbon: subject,
        fullHeight: true
      });
    },

    loadSubjectUnion: function(event) {
      this.loadStack({
        url: settings.get('searchURL'),
        search_type: 'subject_union',
        query: this.model.get('source_id'),
        ribbon: 'Expanded'
      });
    },

    loadSubjectIntersection: function(event) {
      this.loadStack({
        url: settings.get('searchURL'),
        search_type: 'subject_intersection',
        query: this.model.get('source_id'),
        ribbon: 'Focused'
      });
    },

    loadStack: function(options) {
      mediator.trigger('stack:load', _.extend({
        pivot: this.model.get('source_id')
      }, options));
    },

    setActiveButton: function(event) {
      this.$('.related-category a').removeClass('active');
      $(event.target).addClass('active');
      event.preventDefault();
    },

    loadPreview: function(event) {
      var $target = $(event.target).closest('.stack-item');
      var id = $target.data('stackviewItem')['source_id'];

      if ($target.is('.stack-pivot, .stack-current')) {
        return event.preventDefault();
      }

      mediator.trigger('preview:load', id);
      event.preventDefault();
    }
  });

  return BookRelatedsView;
});