const
  MovieModel = require('./models/movie-model'),
  MovieCollection = require('./collections/movie-collection'),
  MovieList = require('./controllers/list'),
  MovieViewer = require('./controllers/viewer'),
  isFunction = require('lodash/isFunction'),
  bind = require('lodash/bind');

var currCtrl;

function controller( region, Controller ) {
  /* if the controller we want to lanch is
     the same controller we previously
     lanched call it. */
  if ( currCtrl && Controller.isPrototypeOf( currCtrl ) ) {
    return currCtrl;
  }

  if ( currCtrl && isFunction( currCtrl.destroy ) ) {
    currCtrl.destroy();
  }

  currCtrl = Controller.setup({ region });

  return currCtrl;
}

module.exports = {
  setup: function ( options ) {
    const app = Object.create( this );

    Object.assign(app, options);

    app.lanch = bind(controller, null, app.region);

    return app;
  },
  viewList: function () {
    const
      success = colletion => {
        const list = this.lanch( MovieList );

        list.view( collection );
        console.log('Successfully fetch data from the server!');
      },
      error = () => {
        console.log('Cannot fetch data from the server!');
      };

    (new MovieCollection()).fetch({ success, error });
  },
  viewMovie: function () {
    const
      success = model => {
        const viewer = this.lanch( MovieViewer );

        viewer.view( model );
        console.log('Successfully fetch data from the server!');
      },
      error = () => {
        console.log('Cannot fetch data from the server!');
      };

    (new MovieModel()).fetch({ success, error });
  }
};