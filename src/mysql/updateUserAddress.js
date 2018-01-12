import Promise from 'bluebird'

export default function updateUserAddress({
  address='0x0',
  username=''
}) {
  return new Promise((resolve, reject) => {
    this.query({
      queryString: `
        UPDATE user_details
        SET address = "${ address }"
        WHERE username = "${ username }"
      `
    }).then(() => {
      return this.query({
        queryString: `
          SELECT * FROM user_details WHERE username = "${username}";
        `
      })
    }).then((details) => {
      resolve(details[0])
    }).catch((error) => {
      reject(error)
    })
  })
}
