'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccountRouter;

var _express = require('express');

function AccountRouter() {
  var router = (0, _express.Router)();

  // Serve static web apps
  router.get('/', function (req, res) {
    res.send(true);
  });

  return router;
}