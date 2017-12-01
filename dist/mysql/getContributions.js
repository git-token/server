'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getContributions;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContributions(_ref) {
  var _this = this;

  var username = _ref.username;

  return new _bluebird2.default(function (resolve, reject) {
    var queryString = username ? 'SELECT * FROM contributions WHERE username = "' + username + '";' : 'SELECT * FROM contributions;';

    _this.query({ queryString: queryString }).then(function (contributions) {
      console.log('contributions', contributions);
      resolve(contributions);
    }).catch(function (error) {
      reject(error);
    });
  });
}