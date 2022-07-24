import { SET_USER, REMOVE_USER } from './mutations-types';
import { setStore, removeStore } from '@/util/storage';
import { encode } from 'js-base64';
import { State } from '../interface/store';

const mutations = {
  [SET_USER](state: State, payload: State) {
    state.userId = payload.userId;
    state.username = payload.username;
    state.token = payload.token;
    state.permission = payload.permission;
    setStore('user', encode(JSON.stringify(payload)));
  },
  [REMOVE_USER](state: State) {
    state.userId = '';
    state.username = '';
    state.token = '';
    state.permission = 0;
    removeStore('user');
  }
};

export default mutations;
