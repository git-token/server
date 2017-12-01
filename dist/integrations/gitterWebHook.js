'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gitterWebHook;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gitterWebHook(_ref) {
  var _this = this;

  var message = _ref.message,
      level = _ref.level;

  return new _bluebird2.default(function (resolve, reject) {
    (0, _requestPromise2.default)({
      method: 'POST',
      uri: _this.gitterWebHookUrl,
      body: { message: message, level: level },
      json: true
    }).then(function (result) {
      console.log('Gitter IM WebHook Result: ', result);
      resolve(true);
    }).catch(function (error) {
      reject(error);
    });
  });
}