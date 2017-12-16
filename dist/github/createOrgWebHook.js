'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createOrgWebHook;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _githubApi = require('github-api');

var _githubApi2 = _interopRequireDefault(_githubApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createOrgWebHook(_ref) {
  var req = _ref.req;

  return new _bluebird2.default(function (resolve, reject) {
    var organization = req.body.organization,
        _req$session$passport = req.session.passport.user,
        profile = _req$session$passport.profile,
        accessToken = _req$session$passport.accessToken;


    var gh = new _githubApi2.default({
      username: profile['username'],
      token: accessToken
    });

    console.log('gh', gh);

    gh._request('POST', '/orgs/' + organization + '/hooks', {
      name: 'GitToken',
      active: true,
      events: ["pull_request"],
      config: {
        "url": 'https://webhook.gittoken.io/' + organization,
        "content_type": "json"
      }
    }).then(function (result) {
      console.log('result', result);
      resolve(result);
    }).catch(function (error) {
      console.log('error', error);
      reject(error);
    });
  });
}