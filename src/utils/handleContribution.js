import Promise from 'bluebird'

export default function handleContribution({ headers, body }) {
  return new Promise((resolve, reject) => {
    var details = new Object()
    this.parseContribution({ headers, body }).then((contribution) => {
      return this.signContribution(contribution)
    }).then((signedContribution) => {
      return this.saveContribution(signedContribution)
    }).then((savedContribution) => {
      details.contribution = savedContribution
      return this.saveTotalSupply(details.contribution)
    }).then((totalSupply) => {
      details.totalSupply = totalSupply;
      return this.saveUserBalance(details.contribution)
    }).then((userBalance) => {
      details.userBalance = userBalance
      // Send to any third party integration
      // (e.g. Twitter, Emails, Gitter-- any media that we want to send out from this event)
      if (!this.gitterWebHookUrl) {
        resolve(details)
      } else {
        return this.gitterLogContributionActivity(details)
      }
    }).then(() => {
      resolve(details)
    }).catch((error) => {
      reject(error)
    })
  })
}
