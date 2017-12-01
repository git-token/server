'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUserBalances;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUserBalances(_ref) {
  var _this = this;

  var username = _ref.username;

  return new _bluebird2.default(function (resolve, reject) {
    var queryString = username ? 'SELECT * FROM balances WHERE username = "' + username + '";' : 'SELECT * FROM balances;';

    _this.query({ queryString: queryString }).then(function (balances) {
      console.log('balances', balances);
      resolve(balances);
    }).catch(function (error) {
      reject(error);
    });
  });
}