import { createStore } from 'vuex'

import router from '@/router'



const state = {
  shrink: false,
}
const getters = {}
const actions = {

}
const mutations = {
  changeShrink(state: any) {
    state.shrink = !state.shrink
  },
}

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules:{}
})
