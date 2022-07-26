import { post } from './index';
import { RqNormal, RqAuditApply, RqAuditPurchase } from '../interface/request';

// 申领审核列表
export const auditApplyList = (params: RqNormal) => post('/audit/apply/list', params);

// 申领审核
export const auditApply = (params: RqAuditApply) => post('/audit/apply/check', params);

// 采购审核列表
export const auditPurchaseList = (params: RqNormal) => post('/audit/purchase/list', params);

// 采购审核
export const auditPurchase = (params: RqAuditPurchase) => post('/audit/purchase/check', params);
