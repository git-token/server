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

    _promise2.default.resolve(_this.RewardPoints.getRewardDetails.call(eventType, subEventType)).then(function (data) {
      console.log('data', data);
      resolve({
        username: payload['sender']['login'],
        contributor: null,
        date: new Date().getTime(),
        delivery_id: headers['x-github-delivery'],
        eventType: eventType,
        organization: payload['organization']['login'],
        reservedValue: 0,
        rewardValue: 0,
        subEventType: subEventType
      });
    }).catch(function (error) {
      reject(error);
    });
  });
}