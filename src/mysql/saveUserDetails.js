import Promise from 'bluebird'

export default function saveUserDetails({
  username='',
  email='',
  address='0x0'
}) {
  return new Promise((resolve, reject) => {
    this.query({
      queryString: `
        CREATE TABLE IF NOT EXISTS user_details (
          email      TEXT,
          username   CHARACTER(39) PRIMARY KEY,
          address    CHARACTER(42) NOT NULL DEFAULT "0x0"
        );
      `
    }).then(() => {
      return this.query({
        queryString: `
          INSERT INTO user_details (
            email,
            username,
            address
          ) VALUES (
            "${ email }",
            "${ username }",
            "${ address }"
          );
        `
      })
    }).then(() => {
      return this.query({
        queryString: `
          SELECT * FROM user_details WHERE username = "${username}";
        `
      })
    }).then((details) => {
      resolve(details[0])
    }).catch((error) => {
      console.log(error);
      reject(error)
    })
  })
}
