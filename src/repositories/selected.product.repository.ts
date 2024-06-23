import { User, SelectedProduct, OptionCombination } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { DeleteResult, In } from 'typeorm'
import { SelectedProductCreateRequestDto, SelectedProductUpdateRequestDto } from '../dtos'
import { PurchaseProduct } from '../entities'

export class SelectedProductRepository {
  private selectedProductRepo = AppDataSource.getRepository(SelectedProduct)
  private optionCombinationRepo = AppDataSource.getRepository(OptionCombination)

  public deleteReviewsByIds = async (ids: number[]) => {
    await this.selectedProductRepo.delete({ id: In(ids) })
  }
  
  public findSelectedProductByUser = (user: User): Promise<SelectedProduct[]> => {
    return this.selectedProductRepo.find({
      relations: ['optionCombination', 'optionCombination.product'],
      where: {
        user: {id: user.id}
      }
    })
  }
  
  public findSelectedProductById = async (id: number): Promise<SelectedProduct> => {
    return await this.selectedProductRepo.findOneOrFail({
      where: { id },
      relations: ['user', 'optionCombination', 'optionCombination.product']
    });
  }
  
  public findSelectedProductByOptionCombinationIdAndStatus = (optionCombinationId: number, status: number, user: User): Promise<SelectedProduct | null> => {
    return this.selectedProductRepo.findOne({
      relations: ['optionCombination', 'optionCombination.product'],
      where: {
        optionCombination: {id: optionCombinationId}, status, user: {id: user.id}
      }
    })
  }
  
  public findSelectedProductsByUserAndStatus = (status: number, user: User): Promise<SelectedProduct[]> => {
    return this.selectedProductRepo.find({
      relations: ['optionCombination', 'optionCombination.product'],
      where: {
        status, user: {id: user.id}
      }
    })
  }

  public createSelectedProduct = async (selectedProductData: SelectedProductCreateRequestDto, user: User, status: number): Promise<SelectedProduct> => {
    const optionCombination = await this.optionCombinationRepo.findOneOrFail({where: {id: selectedProductData.optionCombinationId}})
    const newSelectedProduct = this.selectedProductRepo.create({optionCombination, user, status, quantity: selectedProductData.quantity})
    const result = await this.selectedProductRepo.insert(newSelectedProduct)
    return this.selectedProductRepo.findOneOrFail({
      relations: ['optionCombination', 'optionCombination.product'],
      where: {
        id: result.identifiers[0].id
      }})
  }

  public updateSelectedProduct = (id: number, selectedProductData: SelectedProductUpdateRequestDto): Promise<SelectedProduct> => {
    return this.selectedProductRepo.save({...selectedProductData, id})
  }

  public updateSelectedProductOrigin = (selectedProductData: PurchaseProduct): Promise<SelectedProduct> => {
    return this.selectedProductRepo.save(selectedProductData)
  }

  public updateStatus = async (fromStatus: number, toStatus: number, user: User): Promise<SelectedProduct[]> => {
    const selectedProducts: SelectedProduct[] = await this.selectedProductRepo.findBy({user: {id: user.id}, status: fromStatus})
    var result: SelectedProduct[] = []
    for (const x of selectedProducts) {
      const y = await this.findSelectedProductByOptionCombinationIdAndStatus(x.optionCombination.id, toStatus, x.user)
      if (y) {
        result.push(await this.selectedProductRepo.save({...y, quantity: y.quantity + x.quantity}))
        await this.selectedProductRepo.delete({id: x.id})
      }
      else result.push(await this.selectedProductRepo.save({...x, status: toStatus}))
    }
    return result
  }

  public deleteSelectedProduct = (id: number): Promise<DeleteResult> => {
    return this.selectedProductRepo.delete({id})
  }

  public deleteByStatus = (status: number, user: User): Promise<DeleteResult> => {
    return this.selectedProductRepo.delete({status, user: {id: user.id}})
  }
}