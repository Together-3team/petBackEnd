import { DeleteResult } from 'typeorm'
import { CreateWishlistDto } from '../dtos'
import { Wishlist, User } from '../entities'
import { WishlistRepository } from '../repositories'

export class WishlistService {
  private wishlistRepository: WishlistRepository

  constructor() {
    this.wishlistRepository = new WishlistRepository()
  }

  public getWishlistById = (wishlistId: string): Promise<Wishlist> => {
    return this.wishlistRepository.findWishlistById(parseInt(wishlistId))
  }

  public getWishlistsByUser = (user: User): Promise<Wishlist[]> => {
    return this.wishlistRepository.findWishlistsByUser(user)
  }

  public createWishlist = async (wishlistData: CreateWishlistDto, user: User): Promise<Wishlist> => {
    const wishlist = await this.wishlistRepository.findWishlistByUserAndProduct(user, wishlistData.product)
    if (wishlist) throw new Error("해당 상품의 위시리스트가 존재합니다")
    return this.wishlistRepository.createWishlist(wishlistData, user)
  }

  public deleteWishlist = (wishlistId: string): Promise<DeleteResult> => {
    return this.wishlistRepository.deleteWishlist(parseInt(wishlistId))
  }
}