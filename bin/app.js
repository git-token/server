const GitTokenServer = require('../dist/index').default;
const config = require('../gittoken.config.js')

/* Run GitToken Server; Set configuration details in an .env file called gittoken.env */
const server = new GitTokenServer(config)
