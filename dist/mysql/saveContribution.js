'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveContribution;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveContribution(contribution) {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {
    _this.query({
      queryString: '\n        CREATE TABLE IF NOT EXISTS contributions (\n          organization  CHARACTER(39),\n          contributor   CHARACTER(42),\n          username      TEXT,\n          eventType     TEXT,\n          subEventType  TEXT,\n          rewardValue   BIGINT NOT NULL DEFAULT 0,\n          reservedValue BIGINT NOT NULL DEFAULT 0,\n          date          BIGINT NOT NULL DEFAULT 0,\n          delivery_id   CHARACTER(36) PRIMARY KEY,\n          hash          CHARACTER(66),\n          r             CHARACTER(64),\n          s             CHARACTER(64),\n          v             BIGINT NOT NULL DEFAULT 0\n        );\n      '
    }).then(function () {
      return _this.query({
        queryString: '\n          INSERT INTO contributions (\n            organization,\n            contributor,\n            username,\n            eventType,\n            subEventType,\n            rewardValue,\n            reservedValue,\n            date,\n            delivery_id,\n            hash,\n            r,\n            s,\n            v\n          ) VALUES (\n            "' + contribution['organization'] + '",\n            "' + contribution['contributor'] + '",\n            "' + contribution['username'] + '",\n            "' + contribution['eventType'] + '",\n            "' + contribution['subEventType'] + '",\n             ' + contribution['rewardValue'] + ',\n             ' + contribution['reservedValue'] + ',\n             ' + contribution['date'] + ',\n            "' + contribution['delivery_id'] + '",\n            "' + contribution['hash'] + '",\n            "' + contribution['r'] + '",\n            "' + contribution['s'] + '",\n             ' + contribution['v'] + '\n          );\n        '
      });
    }).then(function () {
      return _this.query({
        queryString: '\n          SELECT * FROM contributions WHERE delivery_id = "' + contribution['delivery_id'] + '";\n        '
      });
    }).then(function (contribution) {
      resolve(contribution[0]);
    }).catch(function (error) {
      reject(error);
    });
  });
}