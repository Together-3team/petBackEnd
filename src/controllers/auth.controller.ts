import { Request, Response } from 'express'
import passport from '../index'
import { User } from '../entities'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { UserRepository } from '../repositories'
import { ProfileDto } from '../dtos'
config()

export class AuthController {
  private userRepository = new UserRepository();

  public authenticateCallback = (req: Request, res: Response) => async (err: Error, profile: ProfileDto, info: any) => {
    const user = await this.userRepository.findUserBySNS(profile.snsId, profile.provider);
    if (user) {
      const accessToken = jwt.sign({ id: user.id, type: 'access' }, process.env.JWT_SECRET_KEY || '', { expiresIn: '2 hours'})
      const refreshToken = jwt.sign({ id: user.id, type: 'refresh' }, process.env.JWT_SECRET_KEY || '', { expiresIn: '7 days'})
      res.json({ registered: true, accessToken, refreshToken})
    }
    else {
      const profileToken = jwt.sign({profile}, process.env.JWT_SECRET_KEY || '', { expiresIn: '30 minutes'})
      res.json({ registered: false, profileToken})
    }
  }

  public authenticateGoogle = (req: Request, res: Response) => {
    passport.authenticate('google', { session: false }, this.authenticateCallback(req, res))(req, res)
  }

  public authenticateKakao = (req: Request, res: Response) => {
    passport.authenticate('kakao', { session: false }, this.authenticateCallback(req, res))(req, res)
  }

  public register = async (req: Request, res: Response) => {
    const payload = jwt.verify(req.body.profileToken, process.env.JWT_SECRET_KEY || '')
    const profile: ProfileDto = (payload as jwt.JwtPayload).profile
    const user = await this.userRepository.findUserBySNS(profile.snsId, profile.provider)
    if (user) return res.status(403).json({message: "이미 회원 가입이 완료된 계정입니다"});
    const newUser: User = await this.userRepository.createUser({
      ...profile,
      nickname: req.body.nickname,
      phoneNumber: req.body.phoneNumber
    })
    res.status(201).json(newUser)
  }
}