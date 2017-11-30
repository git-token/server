'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WebHookMiddleware;
function WebHookMiddleware(req, res, next) {
  var _this = this;

  var headers = req.headers,
      payload = req.body.payload;


  this.parseContribution({ headers: headers, payload: JSON.parse(payload) }).then(function (contribution) {

    console.log('contribution', contribution);
    return _this.signContribution(contribution);
  }).then(function (signedContribution) {

    console.log('signedContribution', signedContribution);
    return _this.saveContribution(signedContribution);
  }).then(function (savedContribution) {
    console.log('savedContribution', savedContribution);
    req.contribution = savedContribution;
    return _this.saveTotalSupply(req.contribution);
  }).then(function (totalSupply) {
    req.totalSupply = totalSupply;
    return _this.saveUserBalance(req.contribution);
  }).then(function (userBalance) {
    req.userBalance = userBalance;
    next();
  }).catch(function (error) {
    console.log('error', error);
    res.status(500).send(error.message);
  });
}