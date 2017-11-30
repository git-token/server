'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRewardDetails;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import GitTokenRewardPoints from 'gittoken-contracts/build/contracts/GitTokenRewardPoints.json'

function getRewardDetails(_ref) {
  var eventType = _ref.eventType,
      subEventType = _ref.subEventType;

  return new _bluebird2.default(function (resolve, reject) {
    // TODO Write The GitTokenRewardPoints.sol Contract
    // Make call to contract.
    resolve({
      rewardValue: 0,
      reservedValue: 0
    });
  });
}