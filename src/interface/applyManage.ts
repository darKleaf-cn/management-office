export interface ApplyForm {
  applyId: string;
  applyPeople: string;
  applyPhone: string;
  applyDeviceName?: string;
  applyDeviceId: string;
  applyDeviceNum: number;
  applyReason: string;
  applyTime: string;
  applyState?: number;
}

export interface ApplyStatisticsForm {
  name: string;
  value: number;
}