import { createStore } from 'vuex';
import mutations from './mutations';

export default createStore({
  state: {
    userId: '',
    username: '',
    token: '',
    permission: 0
  },
  getters: {},
  mutations,
  actions: {},
  modules: {}
});
