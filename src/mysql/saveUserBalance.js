import Promise from 'bluebird'

export default function saveUserBalance(contribution) {
  return new Promise((resolve, reject) => {
    const { rewardValue, username, contributor } = contribution

    this.query({ queryString: `
      CREATE TABLE IF NOT EXISTS balances (
        username    CHARACTER(39) PRIMARY KEY,
        contributor CHARACTER(42) NOT NULL DEFAULT "0x0",
        balance     BIGINT NOT NULL DEFAULT 0
      );
    ` }).then(() => {
      return this.query({ queryString: `
        SELECT * FROM balances WHERE username = "${username}";
      ` })
    }).then((data) => {
      if (data.length) {
        let { balance } = data[0]
        return this.query({ queryString: `
          UPDATE balances
          SET balance = ${ balance += rewardValue }
          WHERE username = "${username}";
        ` })
      } else {
        return this.query({ queryString: `
          INSERT INTO balances (
            username,
            contributor,
            balance
          ) VALUES (
            "${username}",
            "${contributor}",
            ${rewardValue}
          );
        ` })
      }
    }).then(() => {
      return this.query({ queryString: `
        SELECT * FROM balances WHERE username = "${username}";
      ` })
    }).then((data) => {
      resolve(data[0])
    }).catch((error) => {
      reject(error)
    })


  })
}
