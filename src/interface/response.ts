import { UserForm } from './userManage';
export interface RsNormal {
  code: number;
  message: string;
}

export interface RsUserLogin extends RsNormal {
  data?: {
    userId: string;
    username: string;
    token: string;
    permission: string;
  };
}

export interface RsUserList extends RsNormal {
  data?: {
    total: number;
    userList: Array<UserForm>;
  };
}
