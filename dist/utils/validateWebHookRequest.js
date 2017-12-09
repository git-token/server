'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateWebHookRequest;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO Better security validation
// 
function validateWebHookRequest(_ref) {
  var headers = _ref.headers,
      body = _ref.body;

  return new _bluebird2.default(function (resolve, reject) {
    if (!headers['user-agent'].match(RegExp('GitHub-Hookshot'))) {
      reject({ code: 403, message: 'Forbidden Authorization' });
    } else {
      resolve({ code: 200, message: null });
    }
  });
}