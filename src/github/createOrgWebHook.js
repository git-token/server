import Promise from 'bluebird'
import GitHub from 'github-api'

export default function createOrgWebHook({ req }) {
  return new Promise((resolve, reject) => {
    const {
      body: { organization },
      session: { passport: { user: { profile, accessToken } } }
    } = req

    const gh = new GitHub({
      username: profile['username'],
      token: accessToken
    })

    console.log('gh', gh)

    gh._request('POST', `/orgs/${organization}/hooks`, {
      name: 'GitToken',
      active: true,
      events: [
        "pull_request"
      ],
      config: {
        "url": `https://webhook.gittoken.io/${organization}`,
        "content_type": "json"
      }
    }).then((result) => {
      console.log('result', result)
      resolve(result)
    }).catch((error) => {
      console.log('error', error)
      reject(error)
    })
  })
}
