export default function WebHookMiddleware(req, res, next) {
  const { headers, body: { payload } } = req

  this.parseContribution({ headers, payload: JSON.parse(payload) }).then((contribution) => {

    console.log('contribution', contribution)
    return this.signContribution(contribution)

  }).then((signedContribution) => {

    console.log('signedContribution', signedContribution)
    return this.saveContribution(signedContribution)

  }).then((savedContribution) => {
    console.log('savedContribution', savedContribution)
    req.contribution = savedContribution
    return this.saveTotalSupply(req.contribution)
  }).then((totalSupply) => {
    req.totalSupply = totalSupply;
    return this.saveUserBalance(req.contribution)
  }).then((userBalance) => {
    req.userBalance = userBalance
    next()
  }).catch((error) => {
    console.log('error', error)
    res.status(500).send(error.message)
  })

}
