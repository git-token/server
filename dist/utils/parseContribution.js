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
      body = _ref.body;

  return new _promise2.default(function (resolve, reject) {
    var eventType = headers['x-github-event'];

    var getSubEventType = function getSubEventType(_ref2) {
      var eventType = _ref2.eventType,
          body = _ref2.body;

      switch (eventType) {
        case 'create':
          return body['ref_type'];
          break;
        case 'delete':
          return body['ref_type'];
          break;
        case 'deployment_status':
          return body['state'];
          break;
        case 'gollum':
          return body['pages'][0]['action']; // Should this be reward for each gollum (wiki page touched)?
          break;
        case 'page_build':
          return body['build']['status'];
          break;
        case 'pull_request':
          return body['pull_request']['merged'] ? body['pull_request']['merged'] : body['action']; // ternary => true ? 'a' : 'b'
          break;
        case 'status':
          return body['state'];
          break;
        case 'push':
          return '';
        case 'ping':
          return '';
        default:
          return body['action'];
      }
    };

    var subEventType = getSubEventType({ eventType: eventType, body: body });

    _this.RewardPoints.getRewardDetails.callAsync(eventType, subEventType).then(function (data) {

      var rewardValue = data[0].toNumber();
      var reservedValue = data[1].toNumber();

      resolve({
        username: body['sender']['login'],
        contributor: null,
        date: new Date().getTime(),
        delivery_id: headers['x-github-delivery'],
        eventType: eventType,
        organization: body['organization']['login'],
        reservedValue: reservedValue,
        rewardValue: rewardValue,
        subEventType: subEventType
      });
    }).catch(function (error) {
      reject(error);
    });
  });
}