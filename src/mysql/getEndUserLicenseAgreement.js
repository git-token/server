export default function getEndUserLicenseAgreement({ username }) {
  return new Promise((resolve, reject) => {
    this.query({
      queryString: `
        SELECT * FROM eula WHERE username = "${username}";
      `
    }).then((eula) => {
      resolve(eula[0])
    }).catch((error) => {
      reject(error)
    })
  })
}
