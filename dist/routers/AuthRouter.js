'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AuthRouter;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGithub = require('passport-github2');

var _express = require('express');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AuthRouter() {
  var router = (0, _express.Router)();
  this.passport = _passport2.default;

  this.passport.use(new _passportGithub.Strategy(this.githubCredentials, function (accessToken, refreshToken, profile, cb) {
    var user = { accessToken: accessToken, profile: profile, refreshToken: refreshToken };
    cb(null, user);
  }));

  this.passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  this.passport.deserializeUser(function (user, cb) {
    cb(null, user);
  });

  router.use(this.passport.initialize());
  router.use(this.passport.session());

  router.get('/github', this.passport.authenticate('github'));
  router.get('/github/callback', this.passport.authenticate('github', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/account');
  });

  router.get('/verify/:address', function (req, res) {
    var passport = req.session.passport,
        address = req.params.address;


    if (!passport || !passport['user']) {
      res.redirect('/auth/github');
    } else {
      var username = req.user.profile.username;


      res.send('\n        Authenticating GitToken Contributor Address, ' + address + ',\n        with GitHub User, ' + username + '\n      ');
    }
  });

  return router;
}