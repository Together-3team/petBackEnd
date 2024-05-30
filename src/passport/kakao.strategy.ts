import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { config } from 'dotenv'
config()

passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID || '',
    callbackURL: process.env.KAKAO_CALLBACK_URL || ''
  }, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));