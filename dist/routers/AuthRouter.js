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
  router.get('/github/callback', this.passport.authenticate('github', { failureRedirect: '/' }), this.SaveUserMiddleware, function (req, res) {
    res.redirect('/');
  });

  // router.get('/verify/:address', (req, res) => {
  //   const {
  //     session: { passport },
  //     params: { address }
  //   } = req
  //
  //   if (!passport || !passport['user']) {
  //     res.redirect('/auth/github')
  //   } else {
  //     const { user: { profile: { username } } } = req
  //
  //     res.send(`
  //       Authenticating GitToken Contributor Address, ${address},
  //       with GitHub User, ${username}
  //     `)
  //   }
  // })

  return router;
}