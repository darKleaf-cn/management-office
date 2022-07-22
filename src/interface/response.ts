import { UserForm } from './userManage';
import { ApplyForm } from './applyManage,';
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

export interface RsApplyList extends RsNormal {
  data?: {
    total: number;
    applyList: Array<ApplyForm>;
  };
}
