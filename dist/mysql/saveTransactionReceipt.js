'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveTransactionReceipt;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveTransactionReceipt(txReceipt) {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {
    _this.query({
      queryString: ''
    }).then(function () {}).catch(function (error) {
      reject(error);
    });
  });
}