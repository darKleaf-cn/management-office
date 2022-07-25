import { UserForm } from './userManage';
import { ApplyForm } from './applyManage,';
import { deviceForm } from './deviceManage';
import { TypeForm } from './type';
export interface RsNormal {
  code: number;
  message: string;
}

export interface RsUserLogin extends RsNormal {
  data?: {
    userId: string;
    username: string;
    token: string;
    permission: number;
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

export interface RsDeviceList extends RsNormal {
  data?: {
    total: number;
    deviceList: Array<deviceForm>;
  };
}

export interface RsTypeList extends RsNormal {
  data?: {
    total: number;
    typeList: Array<TypeForm>;
  };
}
