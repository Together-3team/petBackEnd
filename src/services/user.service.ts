import { DeleteResult } from 'typeorm'
import { UserCreateRequestDto, UserResponseDto, UserUpdateRequestDto } from '../dtos'
import { UserRepository } from '../repositories'
import { plainToInstance } from 'class-transformer'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public getUser = async (userId: string): Promise<UserResponseDto> => {
    const user = this.userRepository.findUserById(parseInt(userId))
    return plainToInstance(UserResponseDto, user)
  }

  public getUserByNickname = async (nickname: string): Promise<boolean> => {
    const user = await this.userRepository.findUserByNickname(nickname)
    return user ? true : false
  }

  public createUser = async (userData: UserCreateRequestDto): Promise<UserResponseDto> => {
    const user = this.userRepository.createUser(userData)
    return plainToInstance(UserResponseDto, user)
  }

  public updateUser = async (userId: string, userData: UserUpdateRequestDto): Promise<UserResponseDto> => {
    const user = this.userRepository.updateUser(parseInt(userId), userData)
    return plainToInstance(UserResponseDto, user)
  }

  public deleteUser = (userId: string): Promise<DeleteResult> => {
    return this.userRepository.deleteUser(parseInt(userId))
  }
}