import Promise, { promisifyAll } from 'bluebird'
import GitTokenKeystoreGenerator from 'gittoken-keystore-generator'

// Import Contracts
import RewardPoints from 'gittoken-contracts/build/contracts/RewardPoints.json'
import GitToken from 'gittoken-contracts/build/contracts/GitToken.json'

export default class GitTokenContracts extends GitTokenKeystoreGenerator {
  constructor(options) {
    super(options)
    // Instantiate Contract Data
    this.GitToken = GitToken;

    // Instantiate Deployed Contracts
    this.RewardPoints = this.load({ contract: RewardPoints, network: '9', address: null })
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

  deployContract({ contract, params=[] }) {
    return new Promise((resolve, reject) => {
      const { abi, unlinked_binary } = JSON.parse(contract)
      Promise.resolve(this.eth.contract(abi).new.getData(...params, {
        from: this.address,
        data: unlinked_binary
      })).then((data) => {
        return this.sendTransaction({ data })
      }).then((txReceipt) => {
        resolve(txReceipt)
      }).catch((error) => {
        reject(error);
      })
    })
  }
}
