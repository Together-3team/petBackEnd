import { Request, Response } from 'express'
import passport from '../index'
import { User } from '../entities'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export class AuthController {
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
    passport.authenticate('google', { session: false, scope: ['email', 'profile'] }, (err: Error, user: User | false, info: any) => {
      if (err) res.status(500).json({ message: err.message });
      if (!user) {
        res.status(401).json({ message: info.message });
        return;
      }
      console.log(user)
      req.login(user, { session: false }, (err: Error) => {
        if (err) res.status(401).json({ message: err.message })
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY || '', { expiresIn: '2 hours'})
        res.json({ token: token })
      })
    })(req, res)
  }
}