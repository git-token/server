const config = {
  web3Provider: process.env['WEB3_PROVIDER'],
  isGitHubHook: process.env['IS_GITHUB_WEBHOOK'],
  dirPath: process.env['GITTOKEN_DIRECTORY_PATH'],
  keystoreFileName: process.env['GITTOKEN_KEYSTORE_FILENAME'],
  contractFile: process.env['GITTOKEN_CONTRACT_FILE'],
  faucetActive: process.env['GITTOKEN_FAUCET_ACTIVE'],
  config: {
    contributor: process.env['GITTOKEN_CONTRACT_OWNER'],
    email: process.env['GITTOKEN_CONTRACT_OWNER_EMAIL'],
    organization: process.env['GITTOKEN_CONTRACT_ORGANIZATION'],
    symbol: process.env['GITTOKEN_CONTRACT_SYMBOL'],
    decimals: +process.env['GITTOKEN_CONTRACT_DECIMALS']
  },
  githubCredentials: {
    clientID: process.env['GITHUB_API_ID'],
    clientSecret: process.env['GITHUB_API_SECRET'],
    callbackURL: process.env['GITHUB_API_CALLBACK_URL']
  },
  api: {
    sessionSecret: process.env['GITTOKEN_API_SESSION_SECRET']
  }
}

console.log('GITTOKEN CONFIG::config', config)

module.exports = config
