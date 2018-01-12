export default class GitTokenAuctionWorker {
  constructor({ }) {
    this.listen()
  }

  listen() {
    console.log('GitToken Auction Web Worker Listening for Events')
    addEventListener('message', (msg) => {
      const { event, values } = JSON.parse(msg.data)
      switch(event) {
        case 'highestBid':
          this.highestBid({ bids: values })
          break;
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


  highestBid({ bids }) {
    console.log('highestBid::bids', bids)
  }

}


const auction = new GitTokenAuctionWorker({})
