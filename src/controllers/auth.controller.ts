import { Request, Response } from 'express'
import { passport } from '../index'
import { User } from '../entities'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { UserRepository } from '../repositories'
import { AuthNotRegisteredResponseDto, AuthRegisteredResponseDto, ProfileDto, TokenResponseDto, UserResponseDto } from '../dtos'
import axios from 'axios'
import qs from 'querystring'
config()

export class AuthController {
  private userRepository = new UserRepository();

  public login = (id: number) => {
    const accessToken = jwt.sign({ id, type: 'access' }, process.env.JWT_SECRET_KEY || '', { expiresIn: '2 hours'})
    const refreshToken = jwt.sign({ id, type: 'refresh' }, process.env.JWT_SECRET_KEY || '', { expiresIn: '7 days'})
    return { accessToken, refreshToken }
  }

  public authenticate = (provider: string, local: boolean) => (req: Request, res: Response) => {
    const redirect_uri = (local ? process.env.LOCAL_BASE_URL || '' : process.env.SERVER_BASE_URL || '') + `/auth/${provider}/callback`
    const url = (provider === 'google' ?
      `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&scope=https://www.googleapis.com/auth/userinfo.email` :
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}`)
      +`&redirect_uri=${redirect_uri}&response_type=code`
    res.redirect(url)
  }

  public authenticateCallback = async (req: Request, res: Response, profile: ProfileDto) => {
    try {
      if (!profile) res.status(404).json({message: '로그인에 실패했습니다'})
      else {
        const user = await this.userRepository.findUserBySNS(profile.snsId, profile.provider);
        if (user) {
          if (user.deletedAt) await this.userRepository.restoreUser(user)
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

  public authenticateGoogle = async (req: Request, res: Response) => {
    try {
      const redirect_uri = (req.query.local === 'false' ? process.env.SERVER_BASE_URL || '' : process.env.LOCAL_BASE_URL || '') + `/auth/google/callback`
      if (req.query.error === 'access_denied') return res.status(404).json({ message: "google OAuth2 로그인 액세스 요청을 거부하였습니다"})
      const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
        code: req.query.code as string,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const profileResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenResponse.data.access_token}`)
      const profile: ProfileDto = {
        snsId: profileResponse.data.id,
        email: profileResponse.data.email,
        profileImage: profileResponse.data.picture,
        provider: 'google'
      }
      this.authenticateCallback(req, res, profile)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || error.message;
        res.status(error.response?.status || 500).json({ error: errorMessage });
      } else {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: errorMessage });
      }
    }
  }

  public authenticateKakao = async (req: Request, res: Response) => {
    try {
      const redirect_uri = (req.query.local === 'false' ? process.env.SERVER_BASE_URL || '' : process.env.LOCAL_BASE_URL || '') + `/auth/kakao/callback`
      const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token'
        + `?${encodeURIComponent('code')}=${encodeURIComponent(req.query.code as string)}`
        + `&${encodeURIComponent('client_id')}=${encodeURIComponent(process.env.KAKAO_CLIENT_ID || '')}`
        + `&${encodeURIComponent('redirect_uri')}=${encodeURIComponent(redirect_uri)}`
        + `&${encodeURIComponent('grant_type')}=${encodeURIComponent('authorization_code')}`,
        {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const profileResponse = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: { 'Authorization': `Bearer ${tokenResponse.data.access_token}`}
      })
      const profile: ProfileDto = {
        snsId: profileResponse.data.id,
        email: profileResponse.data.kakao_account.email,
        profileImage: profileResponse.data.kakao_account.profile.profile_image_url || 'https://review-image-3team.s3.ap-northeast-2.amazonaws.com/f066016b-da8d-4513-b7b0-0cf6d5d684a0.png',
        provider: 'kakao'
      }
      this.authenticateCallback(req, res, profile)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || error.message;
        res.status(error.response?.status || 500).json({ error: errorMessage });
      } else {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: errorMessage });
      }
    }
  }

  public register = async (req: Request, res: Response) => {
    try {
      const payload = jwt.verify(req.body.profileToken, process.env.JWT_SECRET_KEY || '')
      const profile: ProfileDto = (payload as jwt.JwtPayload).profile
      const user = await this.userRepository.findUserBySNS(profile.snsId, profile.provider)
      if (user) return res.status(403).json({message: "이미 회원 가입이 완료된 계정입니다"});
      const newUser: UserResponseDto = await this.userRepository.createUser({
        ...profile,
        nickname: req.body.nickname,
        phoneNumber: req.body.phoneNumber,
        isSubscribedToPromotions: req.body.isSubscribedToPromotions
      })
      const response: TokenResponseDto = this.login(newUser.id)
      res.redirect
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