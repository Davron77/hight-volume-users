export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  role: UserRole;
}

export type SortField = 'name' | 'email' | 'age';
export type SortDirection = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

export type RoleFilter = UserRole | 'all';

export interface UserPatch {
  name?: string;
  email?: string;
  age?: number;
}
