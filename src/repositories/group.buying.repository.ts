import { GroupBuying } from '../entities'
import { AppDataSource } from '../config/typeorm'

export class GroupBuyingRepository {
  private groupBuyingRepository = AppDataSource.getRepository(GroupBuying)


  public findById = (id: number): Promise<GroupBuying> => {
    return this.groupBuyingRepository.findOneByOrFail({id})
  }
  public save = (groupBuying: GroupBuying): Promise<GroupBuying> => {
    return this.groupBuyingRepository.save(groupBuying);
  }
}