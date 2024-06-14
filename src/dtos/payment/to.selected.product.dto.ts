import { Timestamp } from 'typeorm'

interface UserDTO {
  snsId: string;
  provider: string;
  isSubscribedToPromotions: boolean;
  preferredPet: number;
  email: string;
  nickname: string;
  phoneNumber: string;
  profileImage: string;
  id: number;
  createdAt: Date | Timestamp;
}

interface ProductDTO {
  id: number;
  // 필요한 경우 더 많은 필드를 포함할 수 있습니다
}

interface OptionCombinationDTO {
  id: number;
  optionCombination: string;
  combinationPrice: number;
  combinationName: string;
  createdAt: Date;
  amount: number;
  product: ProductDTO;
}

interface SelectedProductDTO {
  id: number;
  quantity: number;
  status: number;
  createdAt: Date;
  user: UserDTO;
  optionCombination: OptionCombinationDTO;
}