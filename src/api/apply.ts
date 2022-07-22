import { post } from './index';
import { RqApplyList, RqApplyAdd, RqApplyDelete, RqApplyUpdate } from '../interface/request';

// 申请列表
export const applyList = (params: RqApplyList) => post('/apply/list', params);

// 申请添加
export const applyAdd = (params: RqApplyAdd) => post('/apply/add', params);

// 申请删除
export const applyDelete = (params: RqApplyDelete) => post('/apply/delete', params);

// 申请修改
export const applyUpdate = (params: RqApplyUpdate) => post('/apply/update', params);
