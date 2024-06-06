import { DeleteResult } from 'typeorm'
import { CreateSelectedProductDto } from '../dtos'
import { SelectedProduct, User } from '../entities'
import { SelectedProductRepository } from '../repositories'

export class SelectedProductService {
  private selectedProductRepository: SelectedProductRepository

  constructor() {
    this.selectedProductRepository = new SelectedProductRepository()
  }

  public getSelectedProductById = (selectedProductId: string): Promise<SelectedProduct> => {
    return this.selectedProductRepository.findSelectedProductById(parseInt(selectedProductId))
  }

  public getCarts = (user: User): Promise<SelectedProduct[]> => {
    return this.selectedProductRepository.findSelectedProductsByUserAndStatus(0, user)
  }

  public getOrders = (user: User): Promise<SelectedProduct[]> => {
    return this.selectedProductRepository.findSelectedProductsByUserAndStatus(1, user)
  }

  public addToCart = (selectedProductData: CreateSelectedProductDto, user: User): Promise<SelectedProduct> => {
    return this.selectedProductRepository.createSelectedProduct(selectedProductData, user, 0)
  }

  public addToOrder = (selectedProductData: CreateSelectedProductDto, user: User): Promise<SelectedProduct> => {
    return this.selectedProductRepository.createSelectedProduct(selectedProductData, user, 1)
  }

  public deleteSelectedProduct = (SelectedProductId: string): Promise<DeleteResult> => {
    return this.selectedProductRepository.deleteSelectedProduct(parseInt(SelectedProductId))
  }

  public completeOrder = (status: number, user: User): Promise<SelectedProduct[]> => {
    return this.selectedProductRepository.updateStatus(status, 2, user)
  }
}