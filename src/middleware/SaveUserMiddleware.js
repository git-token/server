export default function SaveUserMiddleware(req, res, next) {
    const { session: { passport } } = req
    const { user: { profile: { username, emails } } } = passport

    console.dir(emails);
    this.saveUserDetails({
      username,
      email: (typeof emails !== 'undefined' && emails.length) ? emails[0]['value'] : ''
    }).then((user) => {
      next()
    }).catch((error) => {
        console.dir(error);
      switch(error.errno) {
        case 1062: // sql duplicate entry error
          return next()
          break;
        default:
          res.status(500).send(error)
      }
    })
}
