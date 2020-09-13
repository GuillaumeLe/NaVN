import Vue from "vue";
import Vuex from "vuex";
import metrics from "./modules/metrics";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { metrics }
});
