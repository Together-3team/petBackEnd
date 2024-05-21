import { User } from '../interfaces';
import { UserRepository } from '../repositories';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public getUser = (userId: string): User => {
    const user = this.userRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  };

  public createUser = (userData: any): User => {
    const newUser: User = { id: String(Date.now()), ...userData };
    return this.userRepository.createUser(newUser);
  };

  public updateUser = (userId: string, updatedUserData: any): User => {
    const existingUser = this.userRepository.findUserById(userId);
    if (!existingUser) {
      throw new Error('User not found');
    }
    const updatedUser = { ...existingUser, ...updatedUserData, id: userId };
    return this.userRepository.updateUser(updatedUser);
  };

  public deleteUser = (userId: string): void => {
    this.userRepository.deleteUser(userId);
  };
}