const passport = require('passport')
const { Strategy } = require('passport-google-oauth20')
const jwt = require('jsonwebtoken')
const { User } = require('./models/user')
const { prefix } = require('../consts')

passport.use(
  new Strategy(
    {
      callbackURL: `${prefix}/users/google/redirect`, //same URI as registered in Google console portal
      clientID: process.env.GOOGLE_AUTH_CLIENT, //replace with copied value from Google console
      clientSecret: process.env.GOOGLE_AUTH_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      let email = profile.emails && profile.emails[0].value //profile object has the user info
      try {
        let user = await User.findOne({ email }) //check whether user exist in database
        if (user) {
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_KEY
          ) //generating token
          return done(null, token) //redirect_url will get appended to req.user object : passport.js in action
        } else {
          const user = new User({ email })
          await user.save()
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_KEY
          ) //generating token
          return done(null, token)
        }
      } catch (error) {
        done('Error happened on its way')
      }
    }
  )
)
