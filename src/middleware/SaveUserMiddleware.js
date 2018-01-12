export default function SaveUserMiddleware(req, res, next) {
    const { session: { passport } } = req
    const { user: { profile: { username, emails } } } = passport

    this.saveUserDetails({
      username,
      email: emails[0]['value']
    }).then((user) => {
      next()
    }).catch((error) => {
      switch(error.errno) {
        case 1062: // sql duplicate entry error
          return next()
          break;
        default:
          res.status(500).send(error)
      }
    })
}
