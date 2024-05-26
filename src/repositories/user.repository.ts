import { UserEntity } from '../entities/user.entity'
import { AppDataSource } from '../config/typeorm'
import { CreateUserDto, UpdateUserDto } from '../dtos'
import { DeleteResult, InsertResult } from 'typeorm'

export class UserRepository {
  private userRepo = AppDataSource.getRepository(UserEntity)

  public findUserById = (userId: string): Promise<UserEntity> => {
    return this.userRepo.findOneByOrFail({id: parseInt(userId)})
  }

  public createUser = (userData: CreateUserDto): Promise<InsertResult> => {
    const newUser = this.userRepo.create(userData)
    return this.userRepo.insert(newUser)
  }

  public updateUser = (userId: string, userData: UpdateUserDto): Promise<UserEntity> => {
    return this.userRepo.save({...userData, id: parseInt(userId)})
  }

  public deleteUser = (userId: string): Promise<DeleteResult> => {
    return this.userRepo.delete({id: parseInt(userId)})
  }
}