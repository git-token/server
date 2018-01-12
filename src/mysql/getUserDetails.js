export default function getUserDetails ({ username }) {
  return new Promise((resolve, reject) => {
    this.query({
      queryString: `
        SELECT * FROM user_details WHERE username = "${username}";
      `
    }).then((user) => {
      resolve(user[0])
    }).catch((error) => {
      reject(error)
    })
  })
}
