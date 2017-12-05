import Promise from 'bluebird'

/**
 * Ping Event
 *
 * Create GitToken instance
 * Register Token with Registry
 * Record Transactions in `transactions` table
 *
 */

export default function handlePingEvent() {
  return new Promise((resolve, reject) => {

    // Deconstruct GitToken Contract Params
    const {
      organization,
      name,
      symbol,
      decimals,
      owner,
      username
    } = this.gittokenParams

    // Deploy GitToken Contract
    this.deployContract({
      contract: this.GitToken,
      params: [
        organization,
        name, 
        symbol,
        decimals,
        owner,
        username
      ]
    }).then((txReceipt) => {
      resolve(txReceipt)
    }).catch((error) => {
      reject(error)
    })
  })
}
