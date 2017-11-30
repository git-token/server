import Promise, { promisifyAll } from 'bluebird'
import GitTokenKeystoreGenerator from 'gittoken-keystore-generator'
import RewardPoints from 'gittoken-contracts/build/contracts/RewardPoints.json'

export default class GitTokenContracts extends GitTokenKeystoreGenerator {
  constructor(options) {
    super(options)
    this.RewardPoints = this.load({
      contract: RewardPoints,
      network: '9',
      address: null
    })
  }

  load({ contract, network, address }) {
    const { abi, networks } = JSON.parse(contract)
    const addr = address ? address : networks[network]['address']

    let C = this.eth.contract(abi).at(addr)

    C['abi'].filter((item) => {
      if (item['type'] == 'function') { return true }
    }).map((item) => {
      const { name } = item
      C[name] = promisifyAll(C[name])
    })

    return C
  }
}
