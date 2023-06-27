import { createStore } from "vuex";

import router from "@/router";

const state = {
  shrink: false,
  identity: "student",
};
const getters = {};
const actions = {};
const mutations: any = {
  changeShrink(state: any): void {
    state.shrink = !state.shrink;
  },
  changeIdentity(id: string): void {
    state.identity = id;
  },
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
