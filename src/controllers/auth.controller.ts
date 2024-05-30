import { Request, Response } from 'express'
import passport from '../index'
import { User } from '../entities'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { UserRepository } from '../repositories'
import { Profile as GoogleProfile } from 'passport-google-oauth20'
import { Profile as KakaoProfile } from 'passport-kakao'
config()

export class AuthController {
  private userRepository = new UserRepository();

  public authenticateCallback = async (req: Request, res: Response, err: Error, profile: GoogleProfile | KakaoProfile, info: any) => {
    const user = await this.userRepository.findUserBySNS(profile.id, profile.provider);
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
  }

  public authenticateGoogle = (req: Request, res: Response) => {
    passport.authenticate('google', { session: false }, (err: Error, profile: GoogleProfile, info: any) => {
      this.authenticateCallback(req, res, err, profile, info)
    })(req, res)
  }

  public authenticateKakao = (req: Request, res: Response) => {
    passport.authenticate('kakao', { session: false }, (err: Error, profile: KakaoProfile, info: any) => {
      this.authenticateCallback(req, res, err, profile, info)
    })(req, res)
  }

  public register = async (req: Request, res: Response) => {
    const payload = jwt.verify(req.body.profileToken, process.env.JWT_SECRET_KEY || '')
    const profile = (payload as jwt.JwtPayload).profile
    const user = await this.userRepository.findUserBySNS(profile.id, profile.provider)
    if (user) return res.status(403).json({message: "이미 회원 가입이 완료된 계정입니다"});

    if ((profile as GoogleProfile).provider === 'google') {
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
    else if ((profile as KakaoProfile).provider === 'kakao') {
      const newUser: User = await this.userRepository.createUser({
        email: profile._json.kakao_account.email,
        nickname: req.body.nickname,
        phoneNumber: req.body.phoneNumber,
        snsId: profile.id,
        provider: profile.provider,
        profileImage: profile._json.properties.profile_image
      })
      res.status(201).json(newUser)
    }
    else {
      res.status(404).json({message: "Google, Kakao profile이 아닙니다"})
    }
  }
}