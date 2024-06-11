import { User } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { UserCreateRequestDto, UserResponseDto, UserUpdateRequestDto } from '../dtos'
import { DeleteResult } from 'typeorm'
import { plainToInstance } from 'class-transformer'

export class UserRepository {
  private userRepo = AppDataSource.getRepository(User)

  public findUserById = async (id: number | undefined): Promise<User> => {
    if (id === undefined) {
      throw new Error('User ID is undefined')
    }
    const user = this.userRepo.findOneByOrFail({ id })
    return plainToInstance(UserResponseDto, user)
  }

  public findUserBySNS = async (snsId: string, provider: string): Promise<UserResponseDto | null> => {
    const user = this.userRepo.findOneBy({ snsId, provider })
    return plainToInstance(UserResponseDto, user)
  }

  public findUserByNickname = async (nickname: string): Promise<UserResponseDto | null> => {
    const user = this.userRepo.findOneBy({ nickname })
    return plainToInstance(UserResponseDto, user)
  }

  public createUser = async (userData: UserCreateRequestDto): Promise<UserResponseDto> => {
    const newUser = this.userRepo.create(userData)
    const result = await this.userRepo.insert(newUser)
    const user = this.userRepo.findOneByOrFail({id: result.identifiers[0].id})
    return plainToInstance(UserResponseDto, user)
  }

  public updateUser = async (id: number, userData: UserUpdateRequestDto): Promise<UserResponseDto> => {
    await this.userRepo.save({...userData, id})
    const user = this.userRepo.findOneByOrFail({ id })
    return plainToInstance(UserResponseDto, user)
  }

  public deleteUser = (id: number): Promise<DeleteResult> => {
    return this.userRepo.delete({id})
  }
}