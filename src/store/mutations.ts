import { SET_USER } from './mutations-types';
import { setStore } from '@/util/storage';
import { encode } from 'js-base64';
import { state } from '../interface/store';

const mutations = {
  [SET_USER](state: state, payload: state) {
    state = payload;
    setStore('user', encode(JSON.stringify(payload)));
  }
};

export default mutations;
