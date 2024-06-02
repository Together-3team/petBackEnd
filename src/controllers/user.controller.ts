import { Request, Response } from 'express'
import { UserService } from '../services'
import { CreateUserDto, UpdateUserDto } from '../dtos'

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public getUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id
    try {
      const user = await this.userService.getUser(userId)
      res.json(user)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
  
  public getMe = async (req: Request, res: Response): Promise<void> => {
    try {
      res.json(req.user)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public createUser = async (req: Request, res: Response): Promise<void> => {
    const userData: CreateUserDto = req.body
    try {
      const user = await this.userService.createUser(userData)
      res.json(user)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id
    const userData: UpdateUserDto = req.body
    try {
      this.userService.getUser(userId)
      const updatedUser = await this.userService.updateUser(userId, userData)
      res.json(updatedUser)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id
    try {
      const result = await this.userService.deleteUser(userId)
      res.json(result)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public verifyNickname = async (req: Request, res: Response): Promise<void> => {
    try {
      const nickname = req.body.nickname
      const result = await this.userService.getUserByNickname(nickname)
      res.json({duplicated: result})
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
}