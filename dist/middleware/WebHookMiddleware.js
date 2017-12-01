"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WebHookMiddleware;
function WebHookMiddleware(req, res, next) {
  var _this = this;

  var headers = req.headers,
      body = req.body;


  this.validateWebHookRequest({ headers: headers, body: body }).then(function () {

    return _this.parseContribution({ headers: headers, body: body });
  }).then(function (contribution) {

    // console.log('contribution', contribution)
    return _this.signContribution(contribution);
  }).then(function (signedContribution) {

    // console.log('signedContribution', signedContribution)
    return _this.saveContribution(signedContribution);
  }).then(function (savedContribution) {

    // console.log('savedContribution', savedContribution)
    req.contribution = savedContribution;
    return _this.saveTotalSupply(req.contribution);
  }).then(function (totalSupply) {

    req.totalSupply = totalSupply;
    return _this.saveUserBalance(req.contribution);
  }).then(function (userBalance) {

    req.userBalance = userBalance;
    if (!_this.gitterWebHookUrl) {
      next();
    } else {
      return _this.gitterLogContributionActivity({
        totalSupply: req.totalSupply,
        userBalance: req.userBalance,
        contribution: req.contribution
      });
    }
  }).then(function () {
    // Middleware Complete
    next();
  }).catch(function (error) {
    var code = error.code ? error.code : 500;
    res.status(code).send(error.message);
  });
}