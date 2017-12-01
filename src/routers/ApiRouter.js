import { Router } from 'express'

export default function AuthRouter() {
  let router = Router()

  router.get('/contributions/:username?', (req, res) => {
    const { username } = req.params
    this.getContributions({ username }).then((contributions) => {
      res.status(200).send(contributions)
    }).catch((error) => {
      res.status(500).send(JSON.parse(error, null, 2))
    })
  })

  router.get('/token/supply/history/:limit?', (req, res) => {
    const { limit } = req.params
    this.getTokenSupply({ limit: parseInt(limit) }).then((supply) => {
      res.status(200).send(supply)
    }).catch((error) => {
      res.status(500).send(JSON.parse(error, null, 2))
    })
  })

  router.get('/token/supply/total', (req, res) => {
    this.getTokenSupply({ limit: 1 }).then((total) => {
      res.status(200).send(total)
    }).catch((error) => {
      res.status(500).send(JSON.parse(error, null, 2))
    })
  })

  router.get('/token/balance/:username?', (req, res) => {
    const { username } = req.params
    this.getUserBalances({ username }).then((balances) => {
      res.status(200).send(balances)
    }).catch((error) => {
      res.status(500).send(JSON.parse(error, null, 2))
    })
  })

  router.get('/signer/address', (req, res) => {
    if (!this.address) {
      const error = new Error("Signer Address is undefined.")
      res.status(500).send(JSON.parse(error, null, 2))
    } else {
      res.status(200).send(`0x${this.address}`)
    }
  })

  router.get('/signer/balance', (req, res) => {
    this.eth.getBalanceAsync(this.address).then((balance) => {
      console.log('balance', balance)
      res.status(200).send(balance)
    }).catch((error) => {
      res.status(500).send(JSON.parse(error, null, 2))
    })
  })

  return router
}
