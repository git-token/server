'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = WebHookRouter;

var _express = require('express');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WebHookRouter() {
  var router = (0, _express.Router)();

  router.post('/', this.WebHookMiddleware, function (req, res) {
    var contribution = req.contribution,
        totalSupply = req.totalSupply,
        userBalance = req.userBalance,
        receipts = req.receipts;

    var details = (0, _stringify2.default)({
      contribution: contribution,
      userBalance: userBalance,
      totalSupply: totalSupply,
      receipts: receipts
    }, null, 2);
    res.status(200).send(details);
  });
  return router;
}