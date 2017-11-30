'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = parseContribution;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseContribution(_ref) {
  var _this = this;

  var headers = _ref.headers,
      payload = _ref.payload;

  return new _promise2.default(function (resolve, reject) {
    var eventType = headers['x-github-event'];

    var getSubEventType = function getSubEventType(_ref2) {
      var eventType = _ref2.eventType,
          payload = _ref2.payload;

      switch (eventType) {
        case 'create':
          return payload['ref_type'];
          break;
        case 'delete':
          return payload['ref_type'];
          break;
        case 'deployment_status':
          return payload['state'];
          break;
        case 'gollum':
          return payload['pages'][0]['action']; // Should this be reward for each gollum (wiki page touched)?
          break;
        case 'page_build':
          return payload['build']['status'];
          break;
        case 'pull_request':
          return payload['pull_request']['merged'] ? payload['pull_request']['merged'] : payload['action']; // ternary => true ? 'a' : 'b'
          break;
        case 'status':
          return payload['state'];
          break;
        default:
          return payload['action'];
      }
    };

    var subEventType = getSubEventType({ eventType: eventType, payload: payload });

    _this.RewardPoints.getRewardDetails.callAsync(eventType, subEventType).then(function (data) {

      var rewardValue = data[0].toNumber();
      var reservedValue = data[1].toNumber();

      console.log('reservedValue', reservedValue);
      console.log('rewardValue', rewardValue);

      resolve({
        username: payload['sender']['login'],
        contributor: null,
        date: new Date().getTime(),
        delivery_id: headers['x-github-delivery'],
        eventType: eventType,
        organization: payload['organization']['login'],
        reservedValue: reservedValue,
        rewardValue: rewardValue,
        subEventType: subEventType
      });
    }).catch(function (error) {
      console.log('error', error);
      reject(error);
    });
  });
}