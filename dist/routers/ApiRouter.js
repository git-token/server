'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AuthRouter;

var _express = require('express');

function AuthRouter() {
  var _this = this;

  var router = (0, _express.Router)();

  router.get('/contributions/:username?', function (req, res) {
    var username = req.params.username;

    _this.getContributions({ username: username }).then(function (contributions) {
      res.status(200).send(contributions);
    }).catch(function (error) {
      res.status(500).send(JSON.parse(error, null, 2));
    });
  });

  router.get('/token/supply/history/:limit?', function (req, res) {
    var limit = req.params.limit;

    _this.getTokenSupply({ limit: parseInt(limit) }).then(function (supply) {
      res.status(200).send(supply);
    }).catch(function (error) {
      res.status(500).send(JSON.parse(error, null, 2));
    });
  });

  router.get('/token/supply/total', function (req, res) {
    _this.getTokenSupply({ limit: 1 }).then(function (total) {
      res.status(200).send(total);
    }).catch(function (error) {
      res.status(500).send(JSON.parse(error, null, 2));
    });
  });

  router.get('/token/balance/:username?', function (req, res) {
    var username = req.params.username;

    _this.getUserBalances({ username: username }).then(function (balances) {
      res.status(200).send(balances);
    }).catch(function (error) {
      res.status(500).send(JSON.parse(error, null, 2));
    });
  });

  router.get('/signer/address', function (req, res) {
    if (!_this.address) {
      var error = new Error("Signer Address is undefined.");
      res.status(500).send(JSON.parse(error, null, 2));
    } else {
      res.status(200).send('0x' + _this.address);
    }
  });

  router.get('/signer/balance', function (req, res) {
    _this.eth.getBalanceAsync(_this.address).then(function (balance) {

      res.status(200).send({
        weiBalance: balance.toNumber(),
        ethBalance: balance.toNumber() / 1e18
      });
    }).catch(function (error) {
      res.status(500).send(JSON.parse(error, null, 2));
    });
  });

  router.get('/profile', function (req, res) {
    try {
      var profile = req.session.passport.user.profile;

      res.status(200).send(profile);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post('/register', function (req, res) {
    _this.createOrgWebHook({ req: req }).then(function (result) {
      res.status(200).send(result);
    }).catch(function (error) {
      res.status(500).send(error);
    });
  });

  return router;
}