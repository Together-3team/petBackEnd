import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from 'dotenv'
import { UserRepository } from '../repositories';
import { User } from '../entities';
config()

const userRepository: UserRepository = new UserRepository()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || ''
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    try {
      const user = await userRepository.findUserBySNS(profile.id, 'google');
      if (user) return done(null, user);
      const newUser: User = await userRepository.createUser({
        email: profile.emails ? profile.emails[0].value : '',
        nickname: profile.displayName,
        phoneNumber: '',
        snsId: profile.id,
        provider: 'google'
      })
      return done(null, newUser)
    }
    catch(err) { return done(err); }
  }
));