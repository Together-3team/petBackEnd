import { Request, Response } from 'express'
import { ProductService, ZzimService } from '../services'
import { CreateZzimDto } from '../dtos'
import { User } from '../entities'

export class ZzimController {
  private zzimService: ZzimService
  private productService: ProductService

  constructor() {
    this.zzimService = new ZzimService(),
    this.productService = new ProductService()
  }

  public getZzimsByUser = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User
    try {
      const Zzims = await this.zzimService.getZzimsByUser(user)
      res.json(Zzims)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
  
  public createZzim = async (req: Request, res: Response): Promise<void> => {
    const rawData = req.body
    const user = req.user as User
    try {
      const product = await this.productService.getProductById(rawData.productId)
      const Zzim = await this.zzimService.createZzim({product: product}, user)
      res.json(Zzim)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public deleteZzim = async (req: Request, res: Response): Promise<void> => {
    const zzimId = req.params.id
    const user = req.user as User
    try {
      const Zzim = await this.zzimService.getZzimById(zzimId)
      if (Zzim.user.id !== user.id) res.status(401).json({message: "상속 관계에 있지 않습니다"})
      else {
        const result = await this.zzimService.deleteZzim(zzimId)
        res.json(result)
      }
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
}