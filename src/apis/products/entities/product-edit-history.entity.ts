import { UserEntity } from '@apis/users/entities/user.entity';
import { ProductEntity } from '@apis/products/entities/product.entity';

export interface EditContent {
  existQuantity?: number;
  editedQuantity?: number;
}

export interface ProductEditHistoryEntity {
  id: number;
  editedContent: EditContent;
  product: ProductEntity;
  productEditUser: UserEntity;
}
