import { Router } from 'express'

export default function ApiRouter() {
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

      res.status(200).send({
        weiBalance: balance.toNumber(),
        ethBalance: balance.toNumber()/1e18,
      })
    }).catch((error) => {
      res.status(500).send(JSON.parse(error, null, 2))
    })
  })

  router.get('/account/profile', (req, res) => {
    const { session: { passport } } = req

    if (passport && passport['user']) {
      try {
        const { user: { profile } } = passport
        res.status(200).send(profile)
      } catch (error) {
        res.status(500).send(error)
      }
    } else {
      res.status(401).send(false)
    }
  })

  router.get('/account/verified', (req, res) => {
    const { session: { passport } } = req

    if (passport && passport['user']) {
      const { user: { profile: { username } } } = passport
      this.getEndUserLicenseAgreement({ username }).then((eula) => {
        const verified = !eula ? false : true
        res.status(200).send(verified)
      }).catch((error) => {
        res.status(500).send(error)
      })
    } else {
      res.status(401).send(false)
    }
  })

  router.get('/account/organizations', (req, res) => {
    const { session: { passport } } = req

    if (passport && passport['user']) {
      const { user: { accessToken, profile: { username } } } = passport
        this.getOrganizations({ accessToken, username }).then((organizations) => {
          res.status(200).send(organizations)
        }).catch((error) => {
          console.log('error', error)
          res.status(500).send(error)
        })

    } else {
      res.status(401).send(false)
    }
  })

  router.post('/account/verify', this.VerifyAccountMiddleware, (req, res) => {
    res.status(200).send(true)
  })

  router.post('/register', (req, res) => {
    this.createOrgWebHook({ req }).then((result) => {
      res.status(200).send(result)
    }).catch((error) => {
      res.status(500).send(error)
    })
  })

  return router
}
