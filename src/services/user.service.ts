import { DeleteResult, InsertResult } from 'typeorm'
import { CreateUserDto, UpdateUserDto } from '../dtos'
import { UserEntity } from '../entities/user.entity'
import { UserRepository } from '../repositories'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public getUser = (userId: string): Promise<UserEntity> => {
    return this.userRepository.findUserById(userId)
  }

  public createUser = (userData: CreateUserDto): Promise<InsertResult> => {
    return this.userRepository.createUser(userData)
  }

  public updateUser = (userId: string, userData: UpdateUserDto): Promise<UserEntity> => {
    return this.userRepository.updateUser(userId, userData)
  }

  public deleteUser = (userId: string): Promise<DeleteResult> => {
    return this.userRepository.deleteUser(userId)
  }
}