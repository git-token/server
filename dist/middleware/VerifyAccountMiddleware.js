'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VerifyAccountMiddleware;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _ethSigUtil = require('eth-sig-util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VerifyAccountMiddleware(req, res, next) {
  var _this = this;

  var _req$body = req.body,
      msgParams = _req$body.msgParams,
      sig = _req$body.sig,
      username = _req$body.username,
      address = _req$body.address,
      passport = req.session.passport;


  if (passport && passport['user']) {
    var _passport$user$profil = passport.user.profile,
        _username = _passport$user$profil.username,
        emails = _passport$user$profil.emails;

    var signer = (0, _ethSigUtil.recoverTypedSignature)({ data: msgParams, sig: sig });
    var user = msgParams[1].value;
    if (address != signer || _username != user) {
      res.status(401).send(false);
    } else {
      var eula_hash = (0, _ethSigUtil.typedSignatureHash)(msgParams);
      this.saveEndUserLicenseAgreement({
        eula_hash: eula_hash,
        signature: sig,
        username: _username,
        address: address
      }).then(function (result) {
        console.log('result', result);
        return _this.updateUserAddress({
          address: address,
          username: _username
        });
      }).then(function (result) {
        console.log('result', result);
        next();
      }).catch(function (error) {
        if (error.errno == 1062) {
          next();
        } else {
          console.log('VerifyAccountMiddleware::error', error);
          res.status(500).send(error);
        }
      });
    }
  } else {
    res.status(401).send(false);
  }
}