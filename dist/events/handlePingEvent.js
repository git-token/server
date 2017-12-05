'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handlePingEvent;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Ping Event
 *
 * Create GitToken instance
 * Register Token with Registry
 * Record Transactions in `transactions` table
 *
 */

function handlePingEvent() {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {

    // Deconstruct GitToken Contract Params
    var _gittokenParams = _this.gittokenParams,
        organization = _gittokenParams.organization,
        name = _gittokenParams.name,
        symbol = _gittokenParams.symbol,
        decimals = _gittokenParams.decimals,
        owner = _gittokenParams.owner,
        username = _gittokenParams.username;

    // Deploy GitToken Contract

    _this.deployContract({
      contract: _this.GitToken,
      params: [organization, name, symbol, decimals, owner, username]
    }).then(function (txReceipt) {
      resolve(txReceipt);
    }).catch(function (error) {
      reject(error);
    });
  });
}