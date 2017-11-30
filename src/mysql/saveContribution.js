import Promise from 'bluebird'

export default function saveContribution(contribution) {
  return new Promise((resolve, reject) => {
    this.query({
      queryString: `
        CREATE TABLE IF NOT EXISTS contributions (
          organization  CHARACTER(39),
          contributor   CHARACTER(42),
          username      TEXT,
          eventType     TEXT,
          subEventType  TEXT,
          rewardValue   BIGINT NOT NULL DEFAULT 0,
          reservedValue BIGINT NOT NULL DEFAULT 0,
          date          BIGINT NOT NULL DEFAULT 0,
          delivery_id   CHARACTER(36) PRIMARY KEY,
          hash          CHARACTER(66),
          r             CHARACTER(64),
          s             CHARACTER(64),
          v             BIGINT NOT NULL DEFAULT 0
        );
      `
    }).then(() => {
      return this.query({
        queryString: `
          INSERT INTO contributions (
            organization,
            contributor,
            username,
            eventType,
            subEventType,
            rewardValue,
            reservedValue,
            date,
            delivery_id,
            hash,
            r,
            s,
            v
          ) VALUES (
            "${ contribution['organization'] }",
            "${ contribution['contributor'] }",
            "${ contribution['username'] }",
            "${ contribution['eventType'] }",
            "${ contribution['subEventType'] }",
             ${ contribution['rewardValue'] },
             ${ contribution['reservedValue'] },
             ${ contribution['date'] },
            "${ contribution['delivery_id'] }",
            "${ contribution['hash'] }",
            "${ contribution['r'] }",
            "${ contribution['s'] }",
             ${ contribution['v'] }
          );
        `
      })
    }).then(() => {
      return this.query({
        queryString: `
          SELECT * FROM contributions WHERE delivery_id = "${contribution['delivery_id']}";
        `
      })
    }).then((contribution) => {
      resolve(contribution[0])
    }).catch((error) => {
      reject(error)
    })
  })
}
