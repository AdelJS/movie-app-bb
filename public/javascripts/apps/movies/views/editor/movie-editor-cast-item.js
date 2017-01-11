import $ from 'jquery';
import ModelView from '../../../../lib/model-view';
import template from '../../templates/editor/movie-editor-cast-item.pug';

export default ModelView.extend({
  template,
  className: 'form-group',
  events: {
    'click a#delete': 'deleteActor',
    'click i': 'selectFileDialog',
    'change #avatar-input': 'handleAvatarSelect'
  },
  bindings: {
    '#actor-input': 'actor',
    '#char-input': 'character',
    '#starring-input': 'starring'
  },
  selectFileDialog() {
    this.$('#avatar-input').trigger('click');
  },
  deleteActor( e ) {
    e.preventDefault();

    const index = e.closest('.form-group').index();

    this.trigger('actor:delete', this.model, index);
  },
  handleAvatarSelect( e ) {
    e.preventDefault();

    const
      img = this.$('#img-avatar'),
      index = this.$(e.target).closest('.form-group').index(),
      selectedFile = this.$('#avatar-input')[0].files[0],
      fileReader = new FileReader();

    fileReader.onload = function ( event ) {
      const url = event.target.result;

      img.attr('src', url);
    };

    fileReader.readAsDataURL( selectedFile );
    this.trigger('avatar:select', selectedFile, index);
  }
});