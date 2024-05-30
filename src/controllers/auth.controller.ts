import { Request, Response } from 'express'
import passport from '../index'
import { User } from '../entities'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { Profile } from 'passport-google-oauth20'
import { UserRepository } from '../repositories'
config()

export class AuthController {
  private userRepository = new UserRepository();

  public authenticateLocal = (req: Request, res: Response) => {
    passport.authenticate('local', { session: false }, (err: Error, user: User | false, info: any) => {
      if (err) res.status(500).json({ message: err.message });
      if (!user) {
        res.status(401).json({ message: info.message });
        return;
      }
      req.login(user, { session: false }, (err: Error) => {
        if (err) res.status(401).json({ message: err.message })
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY || '', { expiresIn: '2 hours'})
        res.json({ token: token })
      })
    })(req, res)
  }

  public authenticateGoogle = (req: Request, res: Response) => {
    passport.authenticate('google', { session: false }, async (err: Error, profile: Profile, info) => {
      const user = await this.userRepository.findUserBySNS(profile.id, 'google');
      if (user) {
        req.login(user, { session: false }, (err: Error) => {
          if (err) res.status(401).json({ message: err.message })
          const accessToken = jwt.sign({ id: user.id, type: 'access' }, process.env.JWT_SECRET_KEY || '', { expiresIn: '2 hours'})
          const refreshToken = jwt.sign({ id: user.id, type: 'refresh' }, process.env.JWT_SECRET_KEY || '', { expiresIn: '7 days'})
          res.json({ registered: true, accessToken, refreshToken})
        })
      }
      else {
        const profileToken = jwt.sign({profile}, process.env.JWT_SECRET_KEY || '', { expiresIn: '30 minutes'})
        res.json({ registered: false, profileToken})
      }
    })(req, res)
  }

  public register = async (req: Request, res: Response) => {
    const payload = jwt.verify(req.body.profileToken, process.env.JWT_SECRET_KEY || '')
    const profile: Profile = (payload as jwt.JwtPayload).profile
    const user = await this.userRepository.findUserBySNS(profile.id, profile.provider)
    if (user) return res.status(403).json({message: "이미 회원 가입이 완료된 계정입니다"});
    const newUser: User = await this.userRepository.createUser({
      email: profile.emails ? profile.emails[0].value : '',
      nickname: req.body.nickname,
      phoneNumber: req.body.phoneNumber,
      snsId: profile.id,
      provider: profile.provider,
      profileImage: profile.photos ? profile.photos[0].value : ''
    })
    res.status(201).json(newUser)
  }
}