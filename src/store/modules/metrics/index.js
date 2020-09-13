export default {
  namespaced: true,
  state: {
    flags: [],
    achievements: []
  },
  mutations: {
    initFlags(state, payload) {
      state.flags = payload.map(f => ({
        ...f,
        status: "UNCOMPLETE"
      }));
    },
    initAchievements(state, payload) {
      state.achievements = payload.map(a => ({
        ...a,
        value: 0
      }));
    },
    incrementAchievement(state, { id, value }) {
      let achievement = state.achievements.find(a => a.id === id);
      achievement.value += value;
      state.achievements = [...state.achievements];
    },
    completeFlag(state, { id }) {
      let flag = state.flags.find(f => f.id === id);
      flag.status = "COMPLETE";
      state.flags = [...state.flags];
    }
  },
  actions: {
    handleChoiceResult({ dispatch }, result) {
      switch (result.type) {
        case "ACHIEVEMEMT":
          dispatch("handleAchievementUpdate", result);
          break;
        case "FLAG":
          dispatch("handleFlagUpdate", result);
          break;
      }
    },
    handleAchievementUpdate({ commit }, update) {
      switch (update.action) {
        case "ADD":
          commit("incrementAchievement", update);
          break;
      }
    },
    handleFlagUpdate({ commit }, update) {
      switch (update.action) {
        case "COMPLETE":
          commit("completeFlag", update);
          break;
      }
    }
  }
};
