import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { UserRepository } from './repositories';
import { ProfileDto } from './dtos';

// Google OAuth 설정
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const userRepository = new UserRepository();
    const user = await userRepository.findOrCreateUserBySNS(profile.id, 'google');
    done(null, user);
  } catch (err) {
    done(err);
  }
}));

// Kakao OAuth 설정
passport.use(new KakaoStrategy({
  clientID: process.env.KAKAO_CLIENT_ID || '',
  clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
  callbackURL: '/auth/kakao/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const userRepository = new UserRepository();
    const user = await userRepository.findOrCreateUserBySNS(profile.id, 'kakao');
    done(null, user);
  } catch (err) {    done(err);
  }
}));

export default passport;