import Mock from 'mockjs';
import { login, logout, userList, userDelete, userAdd, userUpdate } from './user';
import { applyList, applyAdd, applyDelete, applyUpdate } from './apply';

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

export default Mock;
