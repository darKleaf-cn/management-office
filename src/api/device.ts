import { post } from './index';
import { RqDeviceList, RqDeviceSku, RqDeviceScrap } from '../interface/request';

// 申请列表
export const deviceList = (params: RqDeviceList) => post('/device/list', params);

// 库存修改
export const deviceSku = (params: RqDeviceSku) => post('/device/sku', params);

// 报废
export const deviceScrap = (params: RqDeviceScrap) => post('/device/scrap', params);
