'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveUserDetails;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveUserDetails(_ref) {
  var _this = this;

  var _ref$username = _ref.username,
      username = _ref$username === undefined ? '' : _ref$username,
      _ref$email = _ref.email,
      email = _ref$email === undefined ? '' : _ref$email,
      _ref$address = _ref.address,
      address = _ref$address === undefined ? '0x0' : _ref$address;

  return new _bluebird2.default(function (resolve, reject) {
    _this.query({
      queryString: '\n        CREATE TABLE IF NOT EXISTS user_details (\n          email      TEXT,\n          username   CHARACTER(39) PRIMARY KEY,\n          address    CHARACTER(42) NOT NULL DEFAULT "0x0"\n        );\n      '
    }).then(function () {
      return _this.query({
        queryString: '\n          INSERT INTO user_details (\n            email,\n            username,\n            address\n          ) VALUES (\n            "' + email + '",\n            "' + username + '",\n            "' + address + '"\n          );\n        '
      });
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