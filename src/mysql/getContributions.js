import Promise from 'bluebird'

export default function getContributions({ username }) {
  return new Promise((resolve, reject) => {
    const queryString = username ?
      `SELECT * FROM contributions WHERE username = "${username}";` :
      `SELECT * FROM contributions;`

    this.query({ queryString }).then((contributions) => {
      console.log('contributions', contributions)
      resolve(contributions)
    }).catch((error) => {
      reject(error)
    })
  })
}
