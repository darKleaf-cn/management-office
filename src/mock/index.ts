import Mock from 'mockjs';
import { login, logout, userList, userDelete, userAdd, userUpdate } from './user';

Mock.setup({
  timeout: '300-600'
});

Mock.mock(/\/user\/login/, 'post', login);
Mock.mock(/\/user\/logout/, 'post', logout);
Mock.mock(/\/user\/list/, 'post', userList);
Mock.mock(/\/user\/delete/, 'post', userDelete);
Mock.mock(/\/user\/add/, 'post', userAdd);
Mock.mock(/\/user\/update/, 'post', userUpdate);

export default Mock;
