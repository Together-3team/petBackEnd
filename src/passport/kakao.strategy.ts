import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { config } from 'dotenv'
import { ProfileDto } from '../dtos';
config()

passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID || '',
    callbackURL: process.env.KAKAO_CALLBACK_URL || ''
  }, (accessToken, refreshToken, profile, done) => {
    const kakaoProfile = new ProfileDto(
      profile.id,
      profile.provider,
      profile._json.kakao_account.email,
      profile._json.properties.profile_image
    )
    return done(null, kakaoProfile);
  }
));