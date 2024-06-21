import { Request, Response } from 'express'
import { ProductService, ZzimService } from '../services'
import { ZzimCreateRequestDto } from '../dtos'
import { User } from '../entities'

export class ZzimController {
  private zzimService: ZzimService

  constructor() {
    this.zzimService = new ZzimService()
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
    const zzimData: ZzimCreateRequestDto = req.body
    const user = req.user as User
    try {
      const zzim = await this.zzimService.createZzim(zzimData, user)
      res.json(zzim)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public deleteZzim = async (req: Request, res: Response): Promise<void> => {
    const zzimId = req.params.id
    const user = req.user as User
    try {
      await this.zzimService.getZzimById(zzimId, user)
      const result = await this.zzimService.deleteZzim(zzimId)
      res.json(result)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public getZzimedProducts = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User
    try {
      const result = await this.zzimService.getZzimedProducts(user)
      res.json(result)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
}