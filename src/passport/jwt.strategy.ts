import { Strategy as JWTStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../repositories';
import passport from 'passport';
import { config } from 'dotenv';
import { Request } from 'express';
config()

const userRepository: UserRepository = new UserRepository()

passport.use('jwt', new JWTStrategy({
  secretOrKey: process.env.JWT_SECRET_KEY || '',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }, async (payload, done) => {
    try {
      if (payload.type !== 'access') return done(null, false, { message: "accessToken이 필요합니다" })
      const user = await userRepository.findUserById(payload.id);
      if (!user) return done(null, false, { message: "탈퇴한 회원입니다" });
      return done(null, user);
    }
    catch(err) { return done(err); }
  }
));

const customJwtExtractor = (req: Request) => {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
  return token || (process.env.GUEST_ACCESS_TOKEN || '')
};

passport.use('jwt-guest', new JWTStrategy({
  secretOrKey: process.env.JWT_SECRET_KEY || '',
  jwtFromRequest: customJwtExtractor
  }, async (payload, done) => {
    try {
      if (payload.type !== 'access') return done(null, { id: null })
      const user = await userRepository.findUserById(payload.id);
      if (!user) return done(null, false, { message: "탈퇴한 회원입니다" });
      return done(null, user);
    }
    catch(err) { return done(err); }
  }
));