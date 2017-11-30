import passport from 'passport'
import { Strategy } from 'passport-github2'
import { Router } from 'express'

export default function AuthRouter() {
  let router = Router()
  this.passport = passport

  this.passport.use(new Strategy(this.githubCredentials,
    function(accessToken, refreshToken, profile, cb) {
      const user = { accessToken, profile, refreshToken }
      cb(null, user);
    })
  );

  this.passport.serializeUser((user, cb) => {
    cb(null, user)
  })

  this.passport.deserializeUser((user, cb) => {
    cb(null, user)
  })

  router.use(this.passport.initialize());
  router.use(this.passport.session());

  router.get('/github', this.passport.authenticate('github'))
  router.get('/github/callback',
    this.passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/')
    })

  router.get('/verify/:address', (req, res) => {
    const {
      session: { passport },
      params: { address }
    } = req

    if (!passport || !passport['user']) {
      res.redirect('/auth/github')
    } else {
      const { user: { profile: { username } } } = req

      res.send(`
        Authenticating GitToken Contributor Address, ${address},
        with GitHub User, ${username}
      `)
    }
  })

  return router
}
