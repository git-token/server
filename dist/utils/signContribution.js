'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = signContribution;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signContribution(contribution) {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {
    var organization = contribution.organization,
        contributor = contribution.contributor,
        username = contribution.username,
        eventType = contribution.eventType,
        subEventType = contribution.subEventType,
        rewardValue = contribution.rewardValue,
        reservedValue = contribution.reservedValue,
        date = contribution.date,
        delivery_id = contribution.delivery_id;


    var messageHash = _this.sha3([organization, contributor, username, eventType, subEventType, rewardValue, reservedValue, date, delivery_id]);

    _this.signMessage({ messageHash: messageHash }).then(function (signature) {
      resolve((0, _extends3.default)({
        hash: messageHash.toString('hex'),
        r: signature['r'].toString('hex'),
        s: signature['s'].toString('hex'),
        v: signature['v']
      }, contribution));
    }).catch(function (error) {
      reject(error);
    });
  });
}