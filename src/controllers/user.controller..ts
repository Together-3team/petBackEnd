import { Request, Response } from 'express'
import { UserService } from '../services'
import { CreateUserDto } from '../dtos'

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    // @ts-ignore
    try {
      const user = this.userService.getUser(userId);
      res.json(user);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    const userData: CreateUserDto = req.body;
    try {
      const newUser = this.userService.createUser(userData);
      res.json(newUser);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const updatedUserData: CreateUserDto = req.body;
    try {
      const updatedUser = this.userService.updateUser(userId, updatedUserData);
      res.json(updatedUser);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    try {
      this.userService.deleteUser(userId)
      res.sendStatus(204);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  };
}