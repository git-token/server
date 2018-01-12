'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOrganizations;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _githubApi = require('github-api');

var _githubApi2 = _interopRequireDefault(_githubApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOrganizations(_ref) {
  var accessToken = _ref.accessToken,
      username = _ref.username;

  return new _bluebird2.default(function (resolve, reject) {

    var gh = new _githubApi2.default({ username: username, token: accessToken });
    var user = gh.getUser();

    user.listOrgs().then(function (_ref2) {
      var data = _ref2.data;

      resolve(data);
    }).catch(function (error) {
      console.log('error', error);
      reject(error);
    });
  });
}