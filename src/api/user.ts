import { post } from './index';
import {
  RqUserLogin,
  RqUserList,
  RqUserAdd,
  RqUserDelete,
  RqUserUpdate
} from '../interface/request';

// 用户登录
export const login = (params: RqUserLogin) => post('/user/login', params);

// 退出登录
export const logout = () => post('/user/logout');

// 用户列表
export const userList = (params: RqUserList) => post('/user/list', params);

// 用户添加
export const userAdd = (params: RqUserAdd) => post('/user/add', params);

// 用户删除
export const userDelete = (params: RqUserDelete) => post('/user/delete', params);

// 用户修改
export const userUpdate = (params: RqUserUpdate) => post('/user/update', params);
