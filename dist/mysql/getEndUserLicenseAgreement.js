"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = getEndUserLicenseAgreement;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEndUserLicenseAgreement(_ref) {
  var _this = this;

  var username = _ref.username;

  return new _promise2.default(function (resolve, reject) {
    _this.query({
      queryString: "\n        SELECT * FROM eula WHERE username = \"" + username + "\";\n      "
    }).then(function (eula) {
      resolve(eula[0]);
    }).catch(function (error) {
      reject(error);
    });
  });
}