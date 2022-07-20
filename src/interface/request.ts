// 用户登录
export interface RqUserLogin {
  username: string;
  password: string;
}

// 用户列表
export interface RqUserList {
  page: number;
  size: number;
}

// 用户添加
export interface RqUserAdd {
  username: string;
  password: string;
  userPermission: string;
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
  userPermission: string;
}
