export default function WebHookMiddleware(req, res, next) {
  const { headers, body } = req

  this.validateWebHookRequest({ headers, body }).then(() => {

    return this.parseContribution({ headers, body });
  }).then((contribution) => {

    // console.log('contribution', contribution)
    return this.signContribution(contribution)
  }).then((signedContribution) => {

    // console.log('signedContribution', signedContribution)
    return this.saveContribution(signedContribution)
  }).then((savedContribution) => {

    // console.log('savedContribution', savedContribution)
    req.contribution = savedContribution
    return this.saveTotalSupply(req.contribution)
  }).then((totalSupply) => {

    req.totalSupply = totalSupply;
    return this.saveUserBalance(req.contribution)
  }).then((userBalance) => {

    req.userBalance = userBalance
    if (!this.gitterWebHookUrl) {
      next()
    } else {
      return this.gitterLogContributionActivity({
        totalSupply: req.totalSupply,
        userBalance: req.userBalance,
        contribution: req.contribution
      })
    }
  }).then(() => {
    // Middleware Complete
    next()
  }).catch((error) => {
    const code = error.code ? error.code : 500
    res.status(code).send(error.message)
  })
}
