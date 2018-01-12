'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SaveUserMiddleware;
function SaveUserMiddleware(req, res, next) {
  var passport = req.session.passport;
  var _passport$user$profil = passport.user.profile,
      username = _passport$user$profil.username,
      emails = _passport$user$profil.emails;


  this.saveUserDetails({
    username: username,
    email: emails[0]['value']
  }).then(function (user) {
    next();
  }).catch(function (error) {
    switch (error.errno) {
      case 1062:
        // sql duplicate entry error
        return next();
        break;
      default:
        res.status(500).send(error);
    }
  });
}