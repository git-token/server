/**
 * NOTE If running the server using NodeJS instead of docker-compose, uncomment the line
 * below to read the .env file and map to gittoken.config
 */

 require('dotenv').config({ path: `${process.cwd()}/gittoken.env`})
 require('dotenv').config({ path: `${process.cwd()}/mysql.env`})

/**
 * Configuration file for GitToken server instance
 * This file parses the environment variable passed to the docker-compose.yml
 * env_file field, then exports the configuration to be used in the application.
 * @type {Object}
 */


const config = {
  web3Provider: process.env['WEB3_PROVIDER'],
  isGitHubHook: Boolean(process.env['IS_GITHUB_WEBHOOK'] === 'true'),
  dirPath: process.env['GITTOKEN_DIRECTORY_PATH'],
  keystoreFileName: process.env['GITTOKEN_KEYSTORE_FILENAME'],
  contractFile: process.env['GITTOKEN_CONTRACT_FILE'],
  faucetActive: Boolean(process.env['GITTOKEN_FAUCET_ACTIVE'] === 'true'),
  config: {
    contributor: process.env['GITTOKEN_CONTRACT_OWNER'],
    name: process.env['GITTOKEN_CONTRACT_NAME'],
    username: process.env['GITTOKEN_CONTRACT_OWNER_USERNAME'],
    organization: process.env['GITTOKEN_CONTRACT_ORGANIZATION'],
    symbol: process.env['GITTOKEN_CONTRACT_SYMBOL'],
    decimals: parseInt(process.env['GITTOKEN_CONTRACT_DECIMALS'])
  },
  githubCredentials: {
    clientID: process.env['GITHUB_API_ID'],
    clientSecret: process.env['GITHUB_API_SECRET'],
    callbackURL: process.env['GITHUB_API_CALLBACK_URL']
  },
  api: {
    sessionSecret: process.env['GITTOKEN_API_SESSION_SECRET']
  },
  mysqlOpts: {
    host: process.env['MYSQL_HOST'],
    user: process.env['MYSQL_USER'],
    password: process.env['MYSQL_ROOT_PASSWORD'],
    database: process.env['MYSQL_DATABASE']
  }
}

module.exports = config
