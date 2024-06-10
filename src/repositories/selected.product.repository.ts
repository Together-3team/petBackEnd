import { User, SelectedProduct, OptionCombination } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { CreateSelectedProductDto, UpdateSelectedProductDto } from '../dtos'
import { DeleteResult } from 'typeorm'

export class SelectedProductRepository {
  private selectedProductRepo = AppDataSource.getRepository(SelectedProduct)
  private optionCombinationRepo = AppDataSource.getRepository(OptionCombination)

  
  public findSelectedProductByUser = (user: User): Promise<SelectedProduct[]> => {
    return this.selectedProductRepo.findBy({user: {id: user.id}})
  }
  
  public findSelectedProductById = (id: number): Promise<SelectedProduct> => {
    return this.selectedProductRepo.findOneByOrFail({id})
  }
  
  public findSelectedProductByOptionCombinationIdAndStatus = (optionCombinationId: number, status: number, user: User): Promise<SelectedProduct | null> => {
    return this.selectedProductRepo.findOneBy({optionCombination: {id: optionCombinationId}, status, user: {id: user.id}})
  }
  
  public findSelectedProductsByUserAndStatus = (status: number, user: User): Promise<SelectedProduct[]> => {
    return this.selectedProductRepo.findBy({status, user: {id: user.id}})
  }

  public createSelectedProduct = async (selectedProductData: CreateSelectedProductDto, user: User, status: number): Promise<SelectedProduct> => {
    const optionCombination = await this.optionCombinationRepo.findOneOrFail({where: {id: selectedProductData.optionCombinationId}})
    const newSelectedProduct = this.selectedProductRepo.create({optionCombination, user, status, quantity: selectedProductData.quantity})
    const result = await this.selectedProductRepo.insert(newSelectedProduct)
    return this.selectedProductRepo.findOneByOrFail({id: result.identifiers[0].id})
  }

  public updateSelectedProduct = (id: number, selectedProductData: UpdateSelectedProductDto): Promise<SelectedProduct> => {
    return this.selectedProductRepo.save({...selectedProductData, id})
  }

  public updateStatus = async (fromStatus: number, toStatus: number, user: User): Promise<SelectedProduct[]> => {
    const selectedProducts: SelectedProduct[] = await this.selectedProductRepo.findBy({user: {id: user.id}, status: fromStatus})
    let result: SelectedProduct[] = []
    selectedProducts.forEach(async x => {
      const y = await this.findSelectedProductByOptionCombinationIdAndStatus(x.optionCombination.id, toStatus, x.user)
      if (y) {
        result.push(await this.selectedProductRepo.save({...y, quantity: y.quantity + x.quantity}))
        await this.selectedProductRepo.delete({id: x.id})
      }
      else result.push(await this.selectedProductRepo.save({...x, status: toStatus}))
    })
    return result
  }

  public deleteSelectedProduct = (id: number): Promise<DeleteResult> => {
    return this.selectedProductRepo.delete({id})
  }

  public deleteByStatus = (status: number, user: User): Promise<DeleteResult> => {
    return this.selectedProductRepo.delete({status, user: {id: user.id}})
  }
}