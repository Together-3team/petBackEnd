import { User } from '../interfaces';

export class UserRepository {
  private users: User[] = [];

  public findUserById = (userId: string): User | undefined => {
    return this.users.find(user => user.id === userId);
  };

  public createUser = (user: User): User => {
    this.users.push(user);
    return user;
  };

  public updateUser = (user: User): User => {
    const userIndex = this.users.findIndex(u => u.id === user.id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users[userIndex] = user;
    return user;
  };

  public deleteUser = (userId: string): void => {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users.splice(userIndex, 1);
  };
}