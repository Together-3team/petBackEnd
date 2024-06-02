import { Product, User, Wishlist } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { CreateWishlistDto } from '../dtos'
import { DeleteResult } from 'typeorm'

export class WishlistRepository {
  private wishlistRepo = AppDataSource.getRepository(Wishlist)

  public findWishlistById = (id: number): Promise<Wishlist> => {
    return this.wishlistRepo.findOneByOrFail({id})
  }

  public findWishlistByUserAndProduct = (user: User, product: Product): Promise<Wishlist | null> => {
    return this.wishlistRepo.findOneBy({user: {id: user.id}, product: {id: product.id}})
  }
  
  public findWishlistsByUser = (user: User): Promise<Wishlist[]> => {
    return this.wishlistRepo.findBy({user: {id: user.id}})
  }

  public createWishlist = async (wishlistData: CreateWishlistDto, user: User): Promise<Wishlist> => {
    const newWishlist = this.wishlistRepo.create({...wishlistData, user})
    const result = await this.wishlistRepo.insert(newWishlist)
    return this.wishlistRepo.findOneByOrFail({id: result.identifiers[0].id})
  }

  public deleteWishlist = (id: number): Promise<DeleteResult> => {
    return this.wishlistRepo.delete({id})
  }
}