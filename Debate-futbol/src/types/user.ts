export interface User {
  errors: any;
  _id: string;
  name: string;
  email: string;
  password: string;
  permissions: PermissionLevel[];
  team: string;
  active: boolean;
}

export type PermissionLevel = 'admin' | 'user';


