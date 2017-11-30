


export default function parseContribution({ headers, payload }) {
  return  new Promise((resolve, reject) => {
    const eventType = headers['x-github-event']

    const getSubEventType = ({ eventType, payload }) => {
      switch(eventType) {
        case 'create':
          return payload['ref_type']
          break;
        case 'delete':
          return payload['ref_type']
          break;
        case 'deployment_status':
          return payload['state']
          break;
        case 'gollum':
          return payload['pages'][0]['action'] // Should this be reward for each gollum (wiki page touched)?
          break;
        case 'page_build':
          return payload['build']['status']
          break;
        case 'pull_request':
          return payload['pull_request']['merged'] ? payload['pull_request']['merged'] : payload['action'] // ternary => true ? 'a' : 'b'
          break;
        case 'status':
          return payload['state']
          break;
        default:
          return payload['action']
      }
    }

    const subEventType = getSubEventType({ eventType, payload })

    this.RewardPoints.getRewardDetails.callAsync(eventType, subEventType).then((data) => {

      const rewardValue = data[0].toNumber()
      const reservedValue = data[1].toNumber()

      console.log('reservedValue', reservedValue)
      console.log('rewardValue', rewardValue)

      resolve({
        username: payload['sender']['login'],
        contributor: null,
        date: new Date().getTime(),
        delivery_id: headers['x-github-delivery'],
        eventType,
        organization: payload['organization']['login'],
        reservedValue,
        rewardValue,
        subEventType
      })
    }).catch((error) => {
      console.log('error', error)
      reject(error)
    })
  })
}
