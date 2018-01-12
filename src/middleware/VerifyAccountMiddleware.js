import Promise, { promisifyAll } from 'bluebird'
import { recoverTypedSignature, typedSignatureHash } from 'eth-sig-util'

export default function VerifyAccountMiddleware(req, res, next) {
  const { body: { msgParams, sig, username, address }, session: { passport } } = req

  if (passport && passport['user']) {
    const { user: { profile: { username, emails } } } = passport
    const signer = recoverTypedSignature({ data: msgParams, sig })
    const user = msgParams[1].value
    if (address != signer || username != user) {
      res.status(401).send(false)
    } else {
      const eula_hash = typedSignatureHash(msgParams)
      this.saveEndUserLicenseAgreement({
        eula_hash,
        signature: sig,
        username,
        address
      }).then((result) => {
        console.log('result', result)
        return this.updateUserAddress({
          address,
          username
        })
      }).then((result) => {
        console.log('result', result)
        next()
      }).catch((error) => {
        if (error.errno == 1062) {
          next()
        } else {
          console.log('VerifyAccountMiddleware::error', error)
          res.status(500).send(error)
        }
      })
    }
  } else {
    res.status(401).send(false)
  }
}
