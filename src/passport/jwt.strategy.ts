import { Strategy as JWTStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../repositories';
import passport from 'passport';
import { config } from 'dotenv';
config()

const userRepository: UserRepository = new UserRepository()

passport.use(new JWTStrategy({
  secretOrKey: process.env.JWT_SECRET_KEY || '',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }, async (payload, done) => {
    try {
      const user = await userRepository.findUserById(payload.id);
      if (!user) return done(null, false, { message: "로그인이 필요합니다" });
      if (payload.type !== 'access') return done(null, false, { message: "accessToken이 필요합니다" })
      return done(null, user);
    }
    catch(err) { console.log(err); return done(err); }
  }
));