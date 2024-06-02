import { Request, Response } from 'express'
import { ProductService, WishlistService } from '../services'
import { CreateWishlistDto } from '../dtos'
import { User } from '../entities'

export class WishlistController {
  private wishlistService: WishlistService
  private productService: ProductService

  constructor() {
    this.wishlistService = new WishlistService(),
    this.productService = new ProductService()
  }

  public getWishlistsByUser = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User
    try {
      const wishlists = await this.wishlistService.getWishlistsByUser(user)
      res.json(wishlists)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
  
  public createWishlist = async (req: Request, res: Response): Promise<void> => {
    const rawData = req.body
    const user = req.user as User
    try {
      const product = await this.productService.getProductById(rawData.productId)
      const wishlist = await this.wishlistService.createWishlist({product: product}, user)
      res.json(wishlist)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public deleteWishlist = async (req: Request, res: Response): Promise<void> => {
    const wishlistId = req.params.id
    const user = req.user as User
    try {
      const wishlist = await this.wishlistService.getWishlistById(wishlistId)
      if (wishlist.user.id !== user.id) res.status(401).json({message: "상속 관계에 있지 않습니다"})
      else {
        const result = await this.wishlistService.deleteWishlist(wishlistId)
        res.json(result)
      }
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
}