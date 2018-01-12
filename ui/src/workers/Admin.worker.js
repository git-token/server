export default class GitTokenAdminWorker {
  constructor({ }) {
    this.listen()
  }

  listen() {
    console.log('GitToken Admin Web Worker Listening for Events')
    addEventListener('message', (msg) => {
      const { event, values } = JSON.parse(msg.data)
      switch(event) {
        default:
          this.handleErrorMessage({
            error: `Invalid Event: ${event}`
          })
      }
    })
  }

  handleErrorMessage({ error }) {
    postMessage(JSON.stringify({
      error: error ? error : 'Unhandled Error'
    }))
  }

}

const worker = new GitTokenAdminWorker({})
