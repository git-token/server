import Promise from 'bluebird'

export default function getTokenSupply({ limit }) {
  return new Promise((resolve, reject) => {
    const queryString = limit > 0 ?
      `SELECT * FROM total_supply ORDER BY date DESC LIMIT ${limit};` :
      `SELECT * FROM total_supply ORDER BY date DESC;`

    this.query({ queryString }).then((supply) => {
      resolve(supply)
    }).catch((error) => {
      reject(error)
    })
  })
}
