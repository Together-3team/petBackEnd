import { DeleteResult } from 'typeorm'
import { CreateSelectedProductDto, UpdateSelectedProductDto } from '../dtos'
import { SelectedProduct, User } from '../entities'
import { SelectedProductRepository } from '../repositories'

export class SelectedProductService {
  private selectedProductRepository: SelectedProductRepository

  constructor() {
    this.selectedProductRepository = new SelectedProductRepository()
  }

  public getSelectedProductByUser = (user: User): Promise<SelectedProduct[]> => {
    return this.selectedProductRepository.findSelectedProductByUser(user)
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

  public updateSelectedProduct = (selectedProductId: string, SelectedProductData: UpdateSelectedProductDto): Promise<SelectedProduct> => {
    return this.selectedProductRepository.updateSelectedProduct(parseInt(selectedProductId), SelectedProductData)
  }

  public deleteSelectedProduct = (SelectedProductId: string): Promise<DeleteResult> => {
    return this.selectedProductRepository.deleteSelectedProduct(parseInt(SelectedProductId))
  }

  public deleteByStatus = (status: string, user: User): Promise<DeleteResult> => {
    return this.selectedProductRepository.deleteByStatus(parseInt(status), user)
  }

  public updateStatus = (fromStatus: number, toStatus: number, user: User): Promise<SelectedProduct[]> => {
    return this.selectedProductRepository.updateStatus(fromStatus, toStatus, user)
  }
}