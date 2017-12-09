"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleEventActions;

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleEventActions(_ref) {
  var _this = this;

  var contribution = _ref.contribution;

  return new _bluebird2.default(function (resolve, reject) {
    var username = contribution.username,
        eventType = contribution.eventType,
        subEventType = contribution.subEventType;

    _bluebird2.default.resolve().then(function () {
      if (eventType == "ping") {
        return (0, _bluebird.join)(_this.handlePingEvent());
      } else {
        return null;
      }
    }).then(function (receipts) {
      resolve(receipts);
    }).catch(function (error) {
      reject(error);
    });
  });
}