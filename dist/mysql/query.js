'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = query;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function query(_ref) {
  var _this = this;

  var queryString = _ref.queryString;

  return new _bluebird2.default(function (resolve, reject) {
    _this.mysql.query(queryString, function (error, results, fields) {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}