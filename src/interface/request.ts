// 用户登录
export interface RqUserLogin {
  username: string;
  password: string;
}

// 用户列表
export interface RqUserList {
  page: number;
  size: number;
  username: string;
}

// 用户添加
export interface RqUserAdd {
  username: string;
  password: string;
  userPermission: number;
}

// 用户删除
export interface RqUserDelete {
  userId: string;
}

// 用户修改
export interface RqUserUpdate {
  userId: string;
  username: string;
  password: string;
  userPermission: number;
}

// 申领列表
export interface RqApplyList {
  page: number;
  size: number;
  applyPeople: string;
}

// 申领添加
export interface RqApplyAdd {
  applyPeople: string;
  applyPhone: string;
  applyDeviceId: string;
  applyDeviceNum: number;
  applyReason: string;
  applyTime: string;
}

// 申领删除
export interface RqApplyDelete {
  applyId: string;
}

// 申领修改
export interface RqApplyUpdate {
  applyId: string;
  applyPeople: string;
  applyPhone: string;
  applyDeviceId: string;
  applyDeviceNum: number;
  applyReason: string;
}
