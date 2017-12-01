'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gitterLogContributionActivity;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gitterLogContributionActivity(_ref) {
  var _this = this;

  var contribution = _ref.contribution,
      userBalance = _ref.userBalance,
      totalSupply = _ref.totalSupply;

  return new _bluebird2.default(function (resolve, reject) {
    var _gittokenParams = _this.gittokenParams,
        decimals = _gittokenParams.decimals,
        symbol = _gittokenParams.symbol,
        organization = _gittokenParams.organization;
    var username = contribution.username,
        rewardValue = contribution.rewardValue,
        reservedValue = contribution.reservedValue,
        eventType = contribution.eventType,
        subEventType = contribution.subEventType;
    var balance = userBalance.balance;
    var total_tokens = totalSupply.total_tokens;


    var message = '\n      ' + organization + ' Contribution Received\n\n      ---\n      Contributor: ' + username + '\n      Event: ' + eventType + '\n      Sub Event: ' + subEventType + '\n      ' + symbol + ' Rewarded: ' + rewardValue / Math.pow(10, decimals) + ' ' + symbol + '\n      ' + symbol + ' Reserved: ' + reservedValue / Math.pow(10, decimals) + ' ' + symbol + '\n\n      ---\n      ' + username + ' Balance: ' + balance / Math.pow(10, decimals) + ' ' + symbol + '\n      Total ' + symbol + ' Supply: ' + total_tokens / Math.pow(10, decimals) + ' ' + symbol + '\n\n      ---\n      Earn ' + symbol + ' by contributing to https://github.com/' + organization + '\n\n      ---\n      Setup GitToken for your organization:\n\n      >_ npm i git-token@alpha -g\n\n    ';

    _this.gitterRoom.send(message);

    resolve(true);
  });
}