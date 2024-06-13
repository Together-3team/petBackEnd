import { DeleteResult } from 'typeorm'
import { OptionCombinationResponseDto, ProductResponseDto, SelectedProductCreateRequestDto, SelectedProductResponseDto, SelectedProductUpdateRequestDto } from '../dtos'
import { SelectedProduct, User } from '../entities'
import { SelectedProductRepository } from '../repositories'
import { plainToInstance } from 'class-transformer'

export class SelectedProductService {
  private selectedProductRepository: SelectedProductRepository

  constructor() {
    this.selectedProductRepository = new SelectedProductRepository()
  }

  public entityToResponseDto = (selectProduct: SelectedProduct): SelectedProductResponseDto => {
    const productResponse = plainToInstance(ProductResponseDto, selectProduct.optionCombination.product)
    const optionCombinationResponse = plainToInstance(OptionCombinationResponseDto, {...selectProduct.optionCombination, product: productResponse})
    return plainToInstance(SelectedProductResponseDto, {...selectProduct, optionCombination: optionCombinationResponse})
  }

  public getSelectedProductByUser = async (user: User): Promise<SelectedProduct[]> => {
    return this.selectedProductRepository.findSelectedProductByUser(user)
  }

  public getSelectedProductById = (selectedProductId: string): Promise<SelectedProduct> => {
    return this.selectedProductRepository.findSelectedProductById(parseInt(selectedProductId))
  }

  public getCarts = async (user: User): Promise<SelectedProductResponseDto[]> => {
    const carts = await this.selectedProductRepository.findSelectedProductsByUserAndStatus(1, user)
    return carts.map(cart => this.entityToResponseDto(cart))
  }

  public getOrders = async (user: User): Promise<SelectedProductResponseDto[]> => {
    const orders = await this.selectedProductRepository.findSelectedProductsByUserAndStatus(0, user)
    return orders.map(order => this.entityToResponseDto(order))
  }

  public addToOrder = async (selectedProductData: SelectedProductCreateRequestDto, user: User): Promise<SelectedProductResponseDto> => {
    const selectedProduct = await this.selectedProductRepository.findSelectedProductByOptionCombinationIdAndStatus(selectedProductData.optionCombinationId, 0, user)
    if (selectedProduct) return this.entityToResponseDto(await this.selectedProductRepository.updateSelectedProduct(selectedProduct.id, {...selectedProduct, quantity: selectedProduct.quantity + selectedProductData.quantity}))
    return this.entityToResponseDto(await this.selectedProductRepository.createSelectedProduct(selectedProductData, user, 0))
  }

  public updateSelectedProduct = (selectedProductId: string, SelectedProductData: SelectedProductUpdateRequestDto): Promise<SelectedProduct> => {
    return this.selectedProductRepository.updateSelectedProduct(parseInt(selectedProductId), SelectedProductData)
  }

  public deleteSelectedProduct = (SelectedProductId: string): Promise<DeleteResult> => {
    return this.selectedProductRepository.deleteSelectedProduct(parseInt(SelectedProductId))
  }

  public deleteByStatus = (status: string, user: User): Promise<DeleteResult> => {
    return this.selectedProductRepository.deleteByStatus(parseInt(status), user)
  }

  public updateStatus = async (fromStatus: number, toStatus: number, user: User): Promise<SelectedProductResponseDto[]> => {
    const selectedProducts = await this.selectedProductRepository.updateStatus(fromStatus, toStatus, user)
    return selectedProducts.map(selectedProduct => this.entityToResponseDto(selectedProduct))
  }
}