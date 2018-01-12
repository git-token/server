export default class GitTokenVotingWorker {
  constructor({ }) {
    this.listen()
  }

  listen() {
    console.log('GitToken Voting Web Worker Listening for Events')
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

const worker = new GitTokenVotingWorker({})
