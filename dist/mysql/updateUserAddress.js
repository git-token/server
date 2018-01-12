'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateUserAddress;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateUserAddress(_ref) {
  var _this = this;

  var _ref$address = _ref.address,
      address = _ref$address === undefined ? '0x0' : _ref$address,
      _ref$username = _ref.username,
      username = _ref$username === undefined ? '' : _ref$username;

  return new _bluebird2.default(function (resolve, reject) {
    _this.query({
      queryString: '\n        UPDATE user_details\n        SET address = "' + address + '"\n        WHERE username = "' + username + '"\n      '
    }).then(function () {
      return _this.query({
        queryString: '\n          SELECT * FROM user_details WHERE username = "' + username + '";\n        '
      });
    }).then(function (details) {
      resolve(details[0]);
    }).catch(function (error) {
      reject(error);
    });
  });
}