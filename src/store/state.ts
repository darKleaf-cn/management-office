import { getStore } from '@/util/storage';
import { decode } from 'js-base64';

const user = getStore('user') ? JSON.parse(decode(getStore('user') as string)) : {};
const state = {
  userId: user.userId ? user.userId : '',
  username: user.username ? user.username : '',
  token: user.token ? user.token : '',
  permission: user.permission ? parseInt(user.permission) : 0
};

export default state;
