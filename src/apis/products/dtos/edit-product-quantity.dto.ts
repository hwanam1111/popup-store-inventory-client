import { CoreOutput } from '@apis/common/dtos/output.dto';
import { Union } from '@utils/union-type';

export interface EditProductQuantityInput {
  productId: number;
  productQuantity: number;
}

const editProductErrorMessageOutput = {
  'product-not-found': 'product-not-found',
} as const;
export type EditProductErrorMessageOutput = Union<typeof editProductErrorMessageOutput>;

export interface EditProductQuantityOutput extends CoreOutput<EditProductErrorMessageOutput> {
  editedProduct?: {
    id: number;
  };
}
