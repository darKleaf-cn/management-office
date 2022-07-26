import Mock from 'mockjs';
import { login, logout, userList, userDelete, userAdd, userUpdate } from './user';
import { applyList, applyAdd, applyDelete, applyUpdate, applyStatistics } from './apply';
import { deviceList, deviceScrap, deviceSku } from './device';
import { typeList } from './type';
import { purchaseList, purchaseAdd, purchaseDelete } from './purchase';
import { auditApply, auditApplyList, auditPurchase, auditPurchaseList } from './audit';

Mock.setup({
  timeout: '300-600'
});

// 用户管理
Mock.mock(/\/user\/login/, 'post', login);
Mock.mock(/\/user\/logout/, 'post', logout);
Mock.mock(/\/user\/list/, 'post', userList);
Mock.mock(/\/user\/delete/, 'post', userDelete);
Mock.mock(/\/user\/add/, 'post', userAdd);
Mock.mock(/\/user\/update/, 'post', userUpdate);

// 申领管理
Mock.mock(/\/apply\/list/, 'post', applyList);
Mock.mock(/\/apply\/delete/, 'post', applyDelete);
Mock.mock(/\/apply\/add/, 'post', applyAdd);
Mock.mock(/\/apply\/update/, 'post', applyUpdate);
Mock.mock(/\/apply\/statistics/, 'post', applyStatistics);

// 设备
Mock.mock(/\/device\/list/, 'post', deviceList);
Mock.mock(/\/device\/sku/, 'post', deviceSku);
Mock.mock(/\/device\/scrap/, 'post', deviceScrap);

// 类型
Mock.mock(/\/type\/list/, 'post', typeList);

// 采购管理
Mock.mock(/\/purchase\/list/, 'post', purchaseList);
Mock.mock(/\/purchase\/delete/, 'post', purchaseDelete);
Mock.mock(/\/purchase\/add/, 'post', purchaseAdd);

// 审核管理
Mock.mock(/\/audit\/apply\/check/, 'post', auditApply);
Mock.mock(/\/audit\/apply\/list/, 'post', auditApplyList);
Mock.mock(/\/audit\/purchase\/check/, 'post', auditPurchase);
Mock.mock(/\/audit\/purchase\/list/, 'post', auditPurchaseList);

export default Mock;
