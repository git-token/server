import Promise from 'bluebird'

export default function saveTransactionReceipt(txReceipt) {
  return new Promise((resolve, reject) => {
    this.query({
      queryString: ``
    }).then(() => {

    }).catch((error) => {
      reject(error)
    })
  })
}
