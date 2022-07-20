import { createStore } from 'vuex';
import mutations from './mutations';

export default createStore({
  state: {
    userId: '',
    username: '',
    token: '',
    permission: ''
  },
  getters: {},
  mutations,
  actions: {},
  modules: {}
});
