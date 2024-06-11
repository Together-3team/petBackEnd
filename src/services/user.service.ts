import { DeleteResult } from 'typeorm'
import { UserCreateRequestDto, UserResponseDto, UserUpdateRequestDto } from '../dtos'
import { UserRepository } from '../repositories'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public getUser = (userId: string): Promise<UserResponseDto> => {
    return this.userRepository.findUserById(parseInt(userId))
  }

  public getUserByNickname = async (nickname: string): Promise<boolean> => {
    const user = await this.userRepository.findUserByNickname(nickname)
    return user ? true : false
  }

  public createUser = (userData: UserCreateRequestDto): Promise<UserResponseDto> => {
    return this.userRepository.createUser(userData)
  }

  public updateUser = (userId: string, userData: UserUpdateRequestDto): Promise<UserResponseDto> => {
    return this.userRepository.updateUser(parseInt(userId), userData)
  }

  public deleteUser = (userId: string): Promise<DeleteResult> => {
    return this.userRepository.deleteUser(parseInt(userId))
  }
}