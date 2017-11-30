import Promise from 'bluebird'

export default function query({ queryString }) {
  return new Promise((resolve, reject) => {
    this.mysql.query(queryString, (error, results, fields) => {
      if (error) { reject(error) }
      resolve(results)
    })
  })
}
