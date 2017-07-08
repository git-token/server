const protocol = 'http'
const host = '138.68.225.133'
const port = 8545

module.exports = {
  web3Provider: `${protocol}://${host}:${port}`,
  isGitHubHook: true,
  dirPath: `${process.cwd()}/gittoken`,
  keystoreFileName: `.keystore`,
  contractFile: 'contract.json',
  config: {
    contributor: '0x48299b423342db084b49d97c8b09392f6156cdc7',
    email: 'ryan.michael.tate@gmail.com',
    organization: 'git-token',
    name: 'GitToken',
    symbol: 'GTK',
    decimals: 8
  }
}
