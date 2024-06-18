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
      profile._json.properties.profile_image || 'https://review-image-3team.s3.ap-northeast-2.amazonaws.com/f066016b-da8d-4513-b7b0-0cf6d5d684a0.png'
    )
    return done(null, kakaoProfile);
  }
));