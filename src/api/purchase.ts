import { post } from './index';
import { RqPurchaseList, RqPurchaseAdd, RqPurchaseDelete } from '../interface/request';

// 采购列表
export const purchaseList = (params: RqPurchaseList) => post('/purchase/list', params);

// 采购添加
export const purchaseAdd = (params: RqPurchaseAdd) => post('/purchase/add', params);

// 采购删除
export const purchaseDelete = (params: RqPurchaseDelete) => post('/purchase/delete', params);
