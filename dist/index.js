'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('gittoken-api-middleware/dist/index');

var _index2 = _interopRequireDefault(_index);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGithub = require('passport-github');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gittokenConfig = require(process.argv[2] || process.cwd() + '/gittoken.config.js');
var githubCredentials = gittokenConfig.githubCredentials;


var app = (0, _express2.default)();
var port = 1324;

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json()); // handle json data
app.use(_bodyParser2.default.urlencoded({ extended: true })); // handle URL-encoded data
app.use(_express2.default.static(process.cwd()));

_passport2.default.use(new _passportGithub.Strategy(githubCredentials, function (accessToken, refreshToken, profile, cb) {
  return cb(null, true);
}));

app.use('/auth/github', _passport2.default.authenticate('github'));

app.use('/auth/github/callback', _passport2.default.authenticate('github', { failureRedirect: '/' }), function (req, res) {
  res.redirect('/');
});

var gittoken = new _index2.default(gittokenConfig);
app.use('/gittoken', gittoken.routeRequests());
app.use('/', _express2.default.static(process.cwd() + '/node_modules/gittoken-messenger-ui/'));
// let faucet = new Faucet({
//   dirPath: `${process.cwd()}/gittoken`,
//   keystoreFileName: `.keystore`,
//   web3Provider: `${protocol}://${host}:${port}`
// })
//
//


app.listen(port, function () {
  console.log('GitToken Server Listening on Port ' + port);
});