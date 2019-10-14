import Vue from "vue";
import Vuex from "vuex";
import state from "@project_src/store/state";
import mutations from "@project_src/store/mutations";
import actions from "@project_src/store/actions";
import getters from "@project_src/store/getters";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  state,
  getters,
  mutations,
  actions
});
