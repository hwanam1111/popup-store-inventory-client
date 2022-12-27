import { Union } from '@utils/union-type';
import { CoreOutput } from '@apis/common/dtos/output.dto';
import { UserEntity } from '@apis/users/entities/user.entity';

export interface LoginInput {
  email: string;
  password: string;
}

const loginErrorMessageOutput = {
  'user-not-found': 'user-not-found',
} as const;
export type LoginErrorMessageOutput = Union<typeof loginErrorMessageOutput>;

export interface LoginOutput extends CoreOutput<LoginErrorMessageOutput> {
  token?: string;
  user?: UserEntity;
}
