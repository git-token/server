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
        userBalance = req.userBalance;

    res.status(200).send((0, _stringify2.default)({
      contribution: contribution,
      userBalance: userBalance,
      totalSupply: totalSupply
    }, null, 2));
  });

  return router;
}