import Promise from 'bluebird'

export default function handleEventActions({ contribution }) {
  return new Promise((resolve, reject) => {
    const { username, eventType, subEventType } = contribution
    Promise.resolve().then(() => {
      if (eventType == "ping") {
        return this.handlePingEvent()
      } else {
        return null
      }
    }).then((events) => {
      resolve(events)
    }).catch((error) => {
      reject(error)
    })
  })
}
