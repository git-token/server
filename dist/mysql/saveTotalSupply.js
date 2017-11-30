'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveTotalSupply;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveTotalSupply(contribution) {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {
    var rewardValue = contribution.rewardValue,
        reservedValue = contribution.reservedValue,
        date = contribution.date;


    _this.query({ queryString: '\n      CREATE TABLE IF NOT EXISTS total_supply (\n        total_tokens  BIGINT NOT NULL DEFAULT 0,\n        date          BIGINT NOT NULL DEFAULT 0 PRIMARY KEY\n      );\n    ' }).then(function () {
      return _this.query({ queryString: '\n        SELECT * FROM total_supply ORDER BY date DESC LIMIT 1;\n      ' });
    }).then(function (data) {
      var total_tokens = data.length ? data[0]['total_tokens'] : 0;
      return _this.query({ queryString: '\n        INSERT INTO total_supply (\n          total_tokens,\n          date\n        ) VALUES (\n          ' + (total_tokens += rewardValue + reservedValue) + ',\n          ' + date + '\n        );\n      ' });
    }).then(function () {
      return _this.query({ queryString: '\n        SELECT * FROM total_supply ORDER BY date DESC LIMIT 1;\n      ' });
    }).then(function (data) {
      resolve(data[0]);
    }).catch(function (error) {
      reject(error);
    });
  });
}