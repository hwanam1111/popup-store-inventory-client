import { Union } from '@utils/union-type';

const userRole = {
  ReadOnly: 'ReadOnly',
  Manager: 'Manager',
  RootAdmin: 'RootAdmin',
} as const;
export type UserRole = Union<typeof userRole>;

export interface UserEntity {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}
