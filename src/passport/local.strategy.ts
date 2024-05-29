import { Strategy as LocalStrategy } from 'passport-local';
import { UserRepository } from '../repositories';
import bcrpyt from 'bcrypt'
import passport from 'passport';

const userRepository: UserRepository = new UserRepository()

passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
  }, async (email, password, done) => {
    try {
      const user = await userRepository.findUserByEmail(email);
      if (!user) return done(null, false, {message: "등록되지 않은 사용자입니다"});
      const result = password === user.password;
      if (!result) return done(null, false, {message: "비밀번호가 맞지 않습니다"});
      return done(null, user);
    }
    catch(err) { return done(err); }
  }
));