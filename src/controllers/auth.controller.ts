import { Request, Response } from 'express'
import { passport } from '../index'
import { User } from '../entities'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { UserRepository } from '../repositories'
import { AuthNotRegisteredResponseDto, AuthRegisteredResponseDto, ProfileDto, TokenResponseDto } from '../dtos'
config()

export class AuthController {
  private userRepository = new UserRepository();

  public login = (id: number) => {
    const accessToken = jwt.sign({ id, type: 'access' }, process.env.JWT_SECRET_KEY || '', { expiresIn: '2 hours'})
    const refreshToken = jwt.sign({ id, type: 'refresh' }, process.env.JWT_SECRET_KEY || '', { expiresIn: '7 days'})
    return { accessToken, refreshToken }
  }

  public authenticateCallback = (req: Request, res: Response) => async (err: Error, profile: ProfileDto | false, info: any) => {
    try {
      if (!profile) res.status(404).json({message: '로그인에 실패했습니다'})
      else {
        const user = await this.userRepository.findUserBySNS(profile.snsId, profile.provider);
        if (user) {
          const response: AuthRegisteredResponseDto = {
            registered: true,
            ...this.login(user.id)
          }
          res.json(response)
        }
        else {
          const profileToken = jwt.sign({profile}, process.env.JWT_SECRET_KEY || '', { expiresIn: '30 minutes'})
          const response: AuthNotRegisteredResponseDto = {
            registered: false,
            email: profile.email,
            profileToken
          }
          res.json(response)
        }
      }
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public authenticateGoogle = (req: Request, res: Response) => {
    passport.authenticate('google', { session: false }, this.authenticateCallback(req, res))(req, res)
  }

  public authenticateKakao = (req: Request, res: Response) => {
    passport.authenticate('kakao', { session: false }, this.authenticateCallback(req, res))(req, res)
  }

  public register = async (req: Request, res: Response) => {
    try {
      const payload = jwt.verify(req.body.profileToken, process.env.JWT_SECRET_KEY || '')
      const profile: ProfileDto = (payload as jwt.JwtPayload).profile
      const user = await this.userRepository.findUserBySNS(profile.snsId, profile.provider)
      if (user) return res.status(403).json({message: "이미 회원 가입이 완료된 계정입니다"});
      const newUser: User = await this.userRepository.createUser({
        ...profile,
        nickname: req.body.nickname,
        phoneNumber: req.body.phoneNumber,
        isSubscribedToPromotions: req.body.isSubscribedToPromotions
      })
      const response: TokenResponseDto = this.login(newUser.id)
      res.status(201).json(response)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public refresh = (req: Request, res: Response) => {
    try {
      const payload = jwt.verify(req.body.refreshToken, process.env.JWT_SECRET_KEY || '')
      const id = (payload as jwt.JwtPayload).id
      if ((payload as jwt.JwtPayload).type !== "refresh") res.status(500).json("refreshToken이 필요합니다")
      else {
        const response: TokenResponseDto = this.login(id)
        res.json(response)
      }
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
}