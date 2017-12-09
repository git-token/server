import Promise, { join } from 'bluebird'

export default function handleEventActions({ contribution }) {
  return new Promise((resolve, reject) => {
    const { username, eventType, subEventType } = contribution
    Promise.resolve().then(() => {
      if (eventType == "ping") {
        return join(this.handlePingEvent())
      } else {
        return null
      }
    }).then((receipts) => {
      resolve(receipts)
    }).catch((error) => {
      reject(error)
    })
  })
}
