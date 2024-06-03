import { DeleteResult } from 'typeorm'
import { CreateUserDto, UpdateUserDto } from '../dtos'
import { User } from '../entities'
import { UserRepository } from '../repositories'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public getUser = (userId: string): Promise<User> => {
    return this.userRepository.findUserById(parseInt(userId))
  }

  public getUserByNickname = async (nickname: string): Promise<boolean> => {
    const user = await this.userRepository.findUserByNickname(nickname)
    return user ? true : false
  }

  public createUser = (userData: CreateUserDto): Promise<User> => {
    return this.userRepository.createUser(userData)
  }

  public updateUser = (userId: string, userData: UpdateUserDto): Promise<User> => {
    return this.userRepository.updateUser(parseInt(userId), userData)
  }

  public deleteUser = (userId: string): Promise<DeleteResult> => {
    return this.userRepository.deleteUser(parseInt(userId))
  }
}