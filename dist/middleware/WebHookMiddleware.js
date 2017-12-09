'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = WebHookMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WebHookMiddleware(req, res, next) {
  var _this = this;

  var headers = req.headers,
      body = req.body;

  this.validateWebHookRequest({ headers: headers, body: body }).then(function () {
    return _this.handleContribution({ headers: headers, body: body });
  }).then(function (details) {
    var contribution = details.contribution,
        userBalance = details.userBalance,
        totalSupply = details.totalSupply;

    req.contribution = contribution;
    req.userBalance = userBalance;
    req.totalSupply = totalSupply;
    return _this.handleEventActions({ contribution: contribution });
  }).then(function (events) {
    req.events = events;
    next();
  }).catch(function (error) {
    console.log('error', error);
    var err = error.message ? error.message : (0, _stringify2.default)(error, null, 2);
    res.status(500).send(err);
  });
}