import { User } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { CreateUserDto, UpdateUserDto } from '../dtos'
import { DeleteResult } from 'typeorm'

export class UserRepository {
  private userRepo = AppDataSource.getRepository(User)

  public findUserById = (id: number): Promise<User> => {
    return this.userRepo.findOneByOrFail({id})
  }

  public findUserByEmail = (email: string): Promise<User> => {
    return this.userRepo.findOneByOrFail({email})
  }

  public findUserBySNS = (snsId: string, provider: string): Promise<User | null> => {
    return this.userRepo.findOne({where: {snsId, provider}})
  }

  public findUserByNickname = (nickname: string): Promise<User | null> => {
    return this.userRepo.findOne({where: {nickname}})
  }

  public createUser = async (userData: CreateUserDto): Promise<User> => {
    const newUser = this.userRepo.create(userData)
    const result = await this.userRepo.insert(newUser)
    return this.userRepo.findOneByOrFail({id: result.identifiers[0].id})
  }

  public updateUser = (id: number, userData: UpdateUserDto): Promise<User> => {
    return this.userRepo.save({...userData, id})
  }

  public deleteUser = (id: number): Promise<DeleteResult> => {
    return this.userRepo.delete({id})
  }
}