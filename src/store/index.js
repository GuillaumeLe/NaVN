import Vue from "vue";
import Vuex from "vuex";
import metrics from "./modules/metrics";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({ importedNaVN: state.importedNaVN })
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    importedNaVN: []
  },
  mutations: {
    addNaVN(state, payload) {
      state.importedNaVN = [...state.importedNaVN, payload];
    },
    removeNaVN(state, { id }) {
      state.importedNaVN = [
        ...state.importedNaVN.filter(vn => vn.meta.slug !== id)
      ];
    }
  },
  actions: {},
  modules: { metrics },
  plugins: [vuexLocal.plugin]
});
