import Promise from 'bluebird'


export default function signContribution(contribution) {
  return new Promise((resolve, reject) => {
    const {
      organization,
      contributor,
      username,
      eventType,
      subEventType,
      rewardValue,
      reservedValue,
      date,
      delivery_id
    } = contribution

    const messageHash = this.sha3([
      organization,
      contributor,
      username,
      eventType,
      subEventType,
      rewardValue,
      reservedValue,
      date,
      delivery_id
    ])

    this.signMessage({ messageHash }).then((signature) => {
      resolve({
        hash: messageHash.toString('hex'),
        r: signature['r'].toString('hex'),
        s: signature['s'].toString('hex'),
        v: signature['v'],
        ...contribution
      })
    }).catch((error) => {
      reject(error)
    })
  })
}
