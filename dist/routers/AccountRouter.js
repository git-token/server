'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccountRouter;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AccountRouter() {
  var router = (0, _express.Router)();

  // Serve static web apps
  router.use('/', _express2.default.static(process.cwd() + '/node_modules/gittoken-account-ui/'));

  return router;
}