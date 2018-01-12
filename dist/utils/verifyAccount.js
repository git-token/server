'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = verifyAccount;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _ethSigUtil = require('eth-sig-util');

var _ethSigUtil2 = _interopRequireDefault(_ethSigUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verifyAccount(_ref) {
  var req = _ref.req;

  return new _bluebird2.default(function (resolve, reject) {
    var _req$body = req.body,
        msgParams = _req$body.msgParams,
        sig = _req$body.sig,
        _req$session$passport = req.session.passport.user,
        profile = _req$session$passport.profile,
        accessToken = _req$session$passport.accessToken;
  });
}