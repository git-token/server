import Promise from 'bluebird'

export default function gitterLogContributionActivity({ contribution, userBalance, totalSupply }) {
  return new Promise((resolve, reject) => {
    const { decimals, symbol, organization } = this.gittokenParams
    const { username, rewardValue, reservedValue, eventType, subEventType } = contribution
    const { balance } = userBalance
    const { total_tokens } = totalSupply

    const message = `
      ${organization} Contribution Received

      ---
      Contributor: ${username}
      Event: ${eventType}
      Sub Event: ${subEventType}
      ${symbol} Rewarded: ${rewardValue / Math.pow(10, decimals)} ${symbol}
      ${symbol} Reserved: ${reservedValue / Math.pow(10, decimals)} ${symbol}

      ---
      ${username} Balance: ${balance  / Math.pow(10, decimals)} ${symbol}
      Total ${symbol} Supply: ${total_tokens  / Math.pow(10, decimals)} ${symbol}

      ---
      Earn ${symbol} by contributing to https://github.com/${organization}

      ---
      Setup GitToken for your organization:

      >_ npm i git-token@alpha -g

    `

    this.gitterRoom.send(message)

    resolve(true)
  })
}
