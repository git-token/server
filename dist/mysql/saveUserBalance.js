'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveUserBalance;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveUserBalance(contribution) {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {
    var rewardValue = contribution.rewardValue,
        username = contribution.username,
        contributor = contribution.contributor;


    _this.query({ queryString: '\n      CREATE TABLE IF NOT EXISTS balances (\n        username    CHARACTER(39) PRIMARY KEY,\n        contributor CHARACTER(42) NOT NULL DEFAULT "0x0",\n        balance     BIGINT NOT NULL DEFAULT 0\n      );\n    ' }).then(function () {
      return _this.query({ queryString: '\n        SELECT * FROM balances WHERE username = "' + username + '";\n      ' });
    }).then(function (data) {
      if (data.length) {
        var balance = data[0].balance;

        return _this.query({ queryString: '\n          UPDATE balances\n          SET balance = ' + (balance += rewardValue) + '\n          WHERE username = "' + username + '";\n        ' });
      } else {
        return _this.query({ queryString: '\n          INSERT INTO balances (\n            username,\n            contributor,\n            balance\n          ) VALUES (\n            "' + username + '",\n            "' + contributor + '",\n            ' + rewardValue + '\n          );\n        ' });
      }
    }).then(function () {
      return _this.query({ queryString: '\n        SELECT * FROM balances WHERE username = "' + username + '";\n      ' });
    }).then(function (data) {
      resolve(data[0]);
    }).catch(function (error) {
      reject(error);
    });
  });
}