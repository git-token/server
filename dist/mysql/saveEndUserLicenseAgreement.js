'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveEndUserLicenseAgreement;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveEndUserLicenseAgreement(_ref) {
  var _this = this;

  var _ref$username = _ref.username,
      username = _ref$username === undefined ? '' : _ref$username,
      _ref$eula_hash = _ref.eula_hash,
      eula_hash = _ref$eula_hash === undefined ? '' : _ref$eula_hash,
      _ref$signature = _ref.signature,
      signature = _ref$signature === undefined ? '' : _ref$signature,
      _ref$address = _ref.address,
      address = _ref$address === undefined ? '' : _ref$address;

  return new _bluebird2.default(function (resolve, reject) {
    _this.query({
      queryString: '\n        CREATE TABLE IF NOT EXISTS eula (\n          username  CHARACTER(39) PRIMARY KEY,\n          eula_hash CHARACTER(66),\n          signature CHARACTER(132),\n          address   CHARACTER(66)\n        );\n      '
    }).then(function () {
      return _this.query({
        queryString: '\n          INSERT INTO eula (\n            username,\n            eula_hash,\n            signature,\n            address\n          ) VALUES (\n            "' + username + '",\n            "' + eula_hash + '",\n            "' + signature + '",\n            "' + address + '"\n          );\n        '
      });
    }).then(function () {
      return _this.query({
        queryString: '\n          SELECT * FROM eula WHERE username = "' + username + '";\n        '
      });
    }).then(function (eula) {
      resolve(eula[0]);
    }).catch(function (error) {
      reject(error);
    });
  });
}