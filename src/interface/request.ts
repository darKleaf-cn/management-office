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

// 统计分析
export interface RqApplyStatistics {
  startTime: string;
  endTime: string;
}

// 设备列表
export interface RqDeviceList {
  page: number;
  size: number;
  deviceName?: string;
  deviceTypeId?: string;
}

// 库存修改
export interface RqDeviceSku {
  deviceId: string;
  deviceNum: number;
}

// 报废
export interface RqDeviceScrap {
  deviceId: string;
  time?: string;
}

// 采购列表
export interface RqPurchaseList {
  page: number;
  size: number;
  deviceName?: string;
  deviceTypeId?: string;
}

// 采购添加
export interface RqPurchaseAdd {
  purchaseDeviceName: string;
  purchaseDeviceTypeId: string;
  purchaseDeviceDescribe: string;
  purchaseDeviceSupplier: string;
  purchaseDeviceNum: number;
}

// 采购删除
export interface RqPurchaseDelete {
  purchaseId: string;
}

export interface RqNormal {
  page: number;
  size: number;
}

export interface RqAuditApply {
  applyId: string;
  flag: number;
  reason?: string;
}

export interface RqAuditPurchase {
  purchaseId: string;
  flag: number;
  reason?: string;
}