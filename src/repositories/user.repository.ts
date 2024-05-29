import { User } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { CreateUserDto, UpdateUserDto } from '../dtos'
import { DeleteResult, InsertResult } from 'typeorm'

export class UserRepository {
  private userRepo = AppDataSource.getRepository(User)

  public findUserById = (userId: string): Promise<User> => {
    return this.userRepo.findOneByOrFail({id: parseInt(userId)})
  }

  public findUserByEmail = (email: string): Promise<User> => {
    return this.userRepo.findOneByOrFail({email})
  }

  public findUserBySNS = (snsId: string, provider: string): Promise<User | null> => {
    return this.userRepo.findOne({where: {snsId, provider}})
  }

  public createUser = async (userData: CreateUserDto): Promise<User> => {
    const newUser = this.userRepo.create(userData)
    const result = await this.userRepo.insert(newUser)
    return this.userRepo.findOneByOrFail({id: result.identifiers[0].id})
  }

  public updateUser = (userId: string, userData: UpdateUserDto): Promise<User> => {
    return this.userRepo.save({...userData, id: parseInt(userId)})
  }

  public deleteUser = (userId: string): Promise<DeleteResult> => {
    return this.userRepo.delete({id: parseInt(userId)})
  }
}