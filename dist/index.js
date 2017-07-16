'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('gittoken-api-middleware/dist/index');

var _index2 = _interopRequireDefault(_index);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGithub = require('passport-github');

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _graphql = require('graphql');

var _sequelize = require('./sequelize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gittokenConfig = require(process.argv[2] || process.cwd() + '/gittoken.config.js');
var githubCredentials = gittokenConfig.githubCredentials,
    sessionSecret = gittokenConfig.api.sessionSecret;


var app = (0, _express2.default)();
var port = 1324;

_passport2.default.use(new _passportGithub.Strategy(githubCredentials, function (accessToken, refreshToken, profile, cb) {
  cb(null, { accessToken: accessToken, profile: profile });
}));

_passport2.default.serializeUser(function (user, cb) {
  cb(null, user);
});

_passport2.default.deserializeUser(function (user, cb) {
  cb(null, user);
});

app.use((0, _cors2.default)());
app.use(require('cookie-parser')());
app.use(_bodyParser2.default.json()); // handle json data
app.use(_bodyParser2.default.urlencoded({ extended: true })); // handle URL-encoded data

/**
 * Serve static files
 */

// app.use('/',
//   express.static(`${process.cwd()}/node_modules/gittoken-messenger-ui/`))

app.use('/', _express2.default.static(process.cwd() + '/node_modules/gittoken-dashboard/'));

app.use(require('express-session')({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true
}));

/**
 * Setup GitHub OAuth Strategy
 */
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.get('/auth/github', _passport2.default.authenticate('github'));
app.get('/auth/github/callback', _passport2.default.authenticate('github', { failureRedirect: '/' }), function (req, res) {
  res.redirect('/');
});

/**
 * Establish GitToken Middleware Services
 */
var gittoken = new _index2.default(gittokenConfig);
app.use('/gittoken', gittoken.routeRequests());

app.listen(port, function () {
  console.log('GitToken Server Listening on Port ' + port);
});