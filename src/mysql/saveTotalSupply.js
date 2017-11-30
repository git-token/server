import Promise from 'bluebird'

export default function saveTotalSupply(contribution) {
  return new Promise((resolve, reject) => {
    const { rewardValue, reservedValue, date } = contribution

    this.query({ queryString: `
      CREATE TABLE IF NOT EXISTS total_supply (
        total_tokens  BIGINT NOT NULL DEFAULT 0,
        date          BIGINT NOT NULL DEFAULT 0 PRIMARY KEY
      );
    ` }).then(() => {
      return this.query({ queryString: `
        SELECT * FROM total_supply ORDER BY date DESC LIMIT 1;
      ` })
    }).then((data) => {
      let total_tokens = data.length ? data[0]['total_tokens'] : 0
      return this.query({ queryString: `
        INSERT INTO total_supply (
          total_tokens,
          date
        ) VALUES (
          ${ total_tokens += (rewardValue + reservedValue) },
          ${date}
        );
      ` })
    }).then(() => {
      return this.query({ queryString: `
        SELECT * FROM total_supply ORDER BY date DESC LIMIT 1;
      ` })
    }).then((data) => {
      resolve(data[0])
    }).catch((error) => {
      reject(error)
    })
  })
}
