import Promise from 'bluebird'
import rp from 'request-promise'

export default function gitterWebHook({ message, level }) {
  return new Promise((resolve, reject) => {
    rp({
      method: 'POST',
      uri: this.gitterWebHookUrl,
      body: { message, level },
      json: true
    }).then((result) => {
      console.log('Gitter IM WebHook Result: ', result)
      resolve(true)
    }).catch((error) => {
      reject(error)
    })
  })
}
