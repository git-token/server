'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTokenSupply;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTokenSupply(_ref) {
  var _this = this;

  var limit = _ref.limit;

  return new _bluebird2.default(function (resolve, reject) {
    var queryString = limit > 0 ? 'SELECT * FROM total_supply ORDER BY date DESC LIMIT ' + limit + ';' : 'SELECT * FROM total_supply ORDER BY date DESC;';

    _this.query({ queryString: queryString }).then(function (supply) {
      resolve(supply);
    }).catch(function (error) {
      reject(error);
    });
  });
}