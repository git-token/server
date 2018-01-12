import Promise from 'bluebird'

export default function saveEndUserLicenseAgreement({
  username='',
  eula_hash='',
  signature='',
  address=''
}) {
  return new Promise((resolve, reject) => {
    this.query({
      queryString: `
        CREATE TABLE IF NOT EXISTS eula (
          username  CHARACTER(39) PRIMARY KEY,
          eula_hash CHARACTER(66),
          signature CHARACTER(132),
          address   CHARACTER(66)
        );
      `
    }).then(() => {
      return this.query({
        queryString: `
          INSERT INTO eula (
            username,
            eula_hash,
            signature,
            address
          ) VALUES (
            "${ username }",
            "${ eula_hash }",
            "${ signature }",
            "${ address }"
          );
        `
      })
    }).then(() => {
      return this.query({
        queryString: `
          SELECT * FROM eula WHERE username = "${username}";
        `
      })
    }).then((eula) => {
      resolve(eula[0])
    }).catch((error) => {
      reject(error)
    })
  })
}
