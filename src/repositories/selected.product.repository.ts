import { User, SelectedProduct } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { CreateSelectedProductDto } from '../dtos'
import { DeleteResult } from 'typeorm'

export class SelectedProductRepository {
  private selectedProductRepo = AppDataSource.getRepository(SelectedProduct)

  public findSelectedProductById = (id: number): Promise<SelectedProduct> => {
    return this.selectedProductRepo.findOneByOrFail({id})
  }
  
  public findSelectedProductsByUserAndStatus = (status: number, user: User): Promise<SelectedProduct[]> => {
    return this.selectedProductRepo.findBy({status, user: {id: user.id}})
  }

  public createSelectedProduct = async (selectedProductData: CreateSelectedProductDto, user: User, status: number): Promise<SelectedProduct> => {
    const newSelectedProduct = this.selectedProductRepo.create({...selectedProductData, user, status})
    const result = await this.selectedProductRepo.insert(newSelectedProduct)
    return this.selectedProductRepo.findOneByOrFail({id: result.identifiers[0].id})
  }

  public updateStatus = async (fromStatus: number, toStatus: number, user: User): Promise<SelectedProduct[]> => {
    const selectedProducts: SelectedProduct[] = await this.selectedProductRepo.findBy({user: {id: user.id}, status: fromStatus})
    selectedProducts.forEach(x => x.status = toStatus)
    return this.selectedProductRepo.save(selectedProducts)
  }

  public deleteSelectedProduct = (id: number): Promise<DeleteResult> => {
    return this.selectedProductRepo.delete({id})
  }
}