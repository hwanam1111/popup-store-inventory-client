import { CoreOutput } from '@apis/common/dtos/output.dto';
import { Union } from '@utils/union-type';

export interface DeleteProductInput {
  productId: number;
}

const deleteProductErrorMessageOutput = {
  'product-not-found': 'product-not-found',
} as const;
export type DeleteProductErrorMessageOutput = Union<typeof deleteProductErrorMessageOutput>;

export interface DeleteProductOutput extends CoreOutput<DeleteProductErrorMessageOutput> {
  deletedProduct: {
    id: number;
  };
}
