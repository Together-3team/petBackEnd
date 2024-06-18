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
      profile.photos ? profile.photos[0].value : 'https://review-image-3team.s3.ap-northeast-2.amazonaws.com/f066016b-da8d-4513-b7b0-0cf6d5d684a0.png'
    )
    return done(null, googleProfile);
  }
));