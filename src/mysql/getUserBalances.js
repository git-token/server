import Promise from 'bluebird'

export default function getUserBalances({ username }) {
  return new Promise((resolve, reject) => {
    const queryString = username ?
      `SELECT * FROM balances WHERE username = "${username}";` :
      `SELECT * FROM balances;`

    this.query({ queryString }).then((balances) => {
      console.log('balances', balances)
      resolve(balances)
    }).catch((error) => {
      reject(error)
    })
  })
}
