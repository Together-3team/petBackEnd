import { User } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { UserCreateRequestDto, UserUpdateRequestDto } from '../dtos'
import { DeleteResult } from 'typeorm'

export class UserRepository {
  private userRepo = AppDataSource.getRepository(User)

  public findUserById = async (id: number | undefined): Promise<User> => {
    if (id === undefined) {
      throw new Error('User ID is undefined')
    }
    return this.userRepo.findOneByOrFail({ id })
  }

  public findUserBySNS = async (snsId: string, provider: string): Promise<User | null> => {
    return this.userRepo.findOne({ where: { snsId, provider }, withDeleted: true })
  }

  public restoreUser = async (user: User): Promise<void> => {
    await this.userRepo.restore(user.id)
  }

  public findUserByNickname = async (nickname: string): Promise<User | null> => {
    return this.userRepo.findOneBy({ nickname })
  }

  public createUser = async (userData: UserCreateRequestDto): Promise<User> => {
    const newUser = this.userRepo.create(userData)
    const result = await this.userRepo.insert(newUser)
    return this.userRepo.findOneByOrFail({id: result.identifiers[0].id})
  }

  public updateUser = async (id: number, userData: UserUpdateRequestDto): Promise<User> => {
    await this.userRepo.save({...userData, id})
    return this.userRepo.findOneByOrFail({ id })
  }

  public deleteUser = (id: number): Promise<DeleteResult> => {
    return this.userRepo.softDelete({id})
  }
}