'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleContribution;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleContribution(_ref) {
  var _this = this;

  var headers = _ref.headers,
      body = _ref.body;

  return new _bluebird2.default(function (resolve, reject) {
    var details = new Object();
    _this.parseContribution({ headers: headers, body: body }).then(function (contribution) {
      return _this.signContribution(contribution);
    }).then(function (signedContribution) {
      return _this.saveContribution(signedContribution);
    }).then(function (savedContribution) {
      details.contribution = savedContribution;
      return _this.saveTotalSupply(details.contribution);
    }).then(function (totalSupply) {
      details.totalSupply = totalSupply;
      return _this.saveUserBalance(details.contribution);
    }).then(function (userBalance) {
      details.userBalance = userBalance;
      if (!_this.gitterWebHookUrl) {
        resolve(details);
      } else {
        return _this.gitterLogContributionActivity(details);
      }
    }).then(function () {
      resolve(details);
    }).catch(function (error) {
      reject(error);
    });
  });
}