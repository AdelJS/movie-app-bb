import Backbone from 'backbone';
import _ from 'underscore';
import Session from '';

export default Backbone.Router.extend({
  route: function (route, name, callback) {
    if (!_isRegExp(route)) route = _routeToRegExp(route);
    if (_isFunction(name)) {
      callback = name;
      name = '';
    }
    if (!callback) callback = this[name];

    if (requiresAuth.contains( route )) {
      _.wrap(callback, function (cb) {
        if (Session.isLoggenIn()) {
          cb();
        } else {
          this.navigate('admin/login');
        }
      });
    }

    Backbone.history.route(route, fragment => {
      const args = this._extractParameters(route, fragment);

      if (this.execute(callback, args, name) !== false) {
        this.trigger.apply(this, ['route' + name].concat(args));
        this.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      }
    });

    return this;
  }
});