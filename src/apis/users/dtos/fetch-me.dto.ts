import { CoreOutput } from '@apis/common/dtos/output.dto';
import { UserEntity } from '@apis/users/entities/user.entity';

export interface FetchMeOutput extends CoreOutput<never> {
  me?: UserEntity | null;
}
