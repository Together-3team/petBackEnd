import { Request, Response } from 'express'
import { SelectedProductService } from '../services'
import { User } from '../entities'
import { SelectedProductCreateRequestDto, SelectedProductUpdateRequestDto } from '../dtos/selectedProduct'

export class SelectedProductController {
  private selectedProductService: SelectedProductService

  constructor() {
    this.selectedProductService = new SelectedProductService()
  }

  public getSelectedProducts = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User
    try {
      const selectedProducts = await this.selectedProductService.getSelectedProductByUser(user)
      res.json(selectedProducts)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public getCarts = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User
    try {
      const selectedProducts = await this.selectedProductService.getCarts(user)
      res.json(selectedProducts)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public getOrders = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User
    try {
      const selectedProducts = await this.selectedProductService.getOrders(user)
      res.json(selectedProducts)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
  
  // public addToCart = async (req: Request, res: Response): Promise<void> => {
  //   const rawData: CreateSelectedProductDto = req.body
  //   const user = req.user as User
  //   try {
  //     const selectedProduct = await this.selectedProductService.addToCart(rawData, user)
  //     res.json(selectedProduct)
  //   } catch (error) {
  //     const errorMessage = (error as Error).message
  //     res.status(500).json({ error: errorMessage })
  //   }
  // }
  
  public addToOrder = async (req: Request, res: Response): Promise<void> => {
    const rawData: SelectedProductCreateRequestDto = req.body
    const user = req.user as User
    try {
      const selectedProduct = await this.selectedProductService.addToOrder(rawData, user)
      res.json(selectedProduct)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
  
  public orderToCart = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User
    try {
      const selectedProduct = await this.selectedProductService.updateStatus(0, 1, user)
      res.json(selectedProduct)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public updateSelectedProduct = async (req: Request, res: Response): Promise<void> => {
    const selectedProductId = req.params.id
    const selectedProductData: SelectedProductUpdateRequestDto = req.body
    const user = req.user as User
    try {
      const selectedProduct = await this.selectedProductService.getSelectedProductById(selectedProductId)
      if (selectedProduct.user.id !== user.id) res.status(401).json({message: "상속 관계에 있지 않습니다"})
      else {
        const result = await this.selectedProductService.updateSelectedProduct(selectedProductId, selectedProductData)
        res.json(result)
      }
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public deleteSelectedProduct = async (req: Request, res: Response): Promise<void> => {
    const selectedProductId = req.params.id
    const user = req.user as User
    try {
      const selectedProduct = await this.selectedProductService.getSelectedProductById(selectedProductId)
      if (selectedProduct.user.id !== user.id) res.status(401).json({message: "상속 관계에 있지 않습니다"})
      else {
        const result = await this.selectedProductService.deleteSelectedProduct(selectedProductId)
        res.json(result)
      }
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public deleteCarts = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User
    try {
      const result = await this.selectedProductService.deleteByStatus('1', user)
      res.json(result)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public deleteOrders = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User
    try {
      const result = await this.selectedProductService.deleteByStatus('0', user)
      res.json(result)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
}