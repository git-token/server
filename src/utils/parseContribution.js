


export default function parseContribution({ headers, body }) {
  return  new Promise((resolve, reject) => {
    const eventType = headers['x-github-event']

    const getSubEventType = ({ eventType, body }) => {
      switch(eventType) {
        case 'create':
          return body['ref_type']
          break;
        case 'delete':
          return body['ref_type']
          break;
        case 'deployment_status':
          return body['state']
          break;
        case 'gollum':
          return body['pages'][0]['action'] // Should this be reward for each gollum (wiki page touched)?
          break;
        case 'page_build':
          return body['build']['status']
          break;
        case 'pull_request':
          return body['pull_request']['merged'] ? body['pull_request']['merged'] : body['action'] // ternary => true ? 'a' : 'b'
          break;
        case 'status':
          return body['state']
          break;
        case 'push':
          return ''
        case 'ping':
          return ''
        default:
          return body['action']
      }
    }

    const subEventType = getSubEventType({ eventType, body })

    this.RewardPoints.getRewardDetails.callAsync(eventType, subEventType).then((data) => {

      const rewardValue = data[0].toNumber()
      const reservedValue = data[1].toNumber()

      resolve({
        username: body['sender']['login'],
        contributor: null,
        date: new Date().getTime(),
        delivery_id: headers['x-github-delivery'],
        eventType,
        organization: body['organization']['login'],
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
