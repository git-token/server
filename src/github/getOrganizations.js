import Promise from 'bluebird'
import GitHub from 'github-api'

export default function getOrganizations({ accessToken, username }) {
  return new Promise((resolve, reject) => {

    const gh = new GitHub({ username, token: accessToken })
    const user = gh.getUser()

    user.listOrgs().then(({ data }) => {
      resolve(data)
    }).catch((error) => {
      console.log('error', error)
      reject(error)
    })
  })
}
