import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from 'dotenv'
import { ProfileDto } from '../dtos';
config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || ''
  }, (accessToken, refreshToken, profile, done) => {
    const googleProfile = new ProfileDto(
      profile.id,
      profile.provider,
      profile.emails ? profile.emails[0].value : '',
      profile.photos ? profile.photos[0].value : ''
    )
    return done(null, googleProfile);
  }
));