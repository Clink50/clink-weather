export const state = () => ({
  degrees: 32,
  unit: 'F',
});

export const mutations = {
  convertDegrees: (state, { degrees, unit }) => {
    state.degrees = degrees;
    state.unit = unit;
  },
};

export const actions = {
  toggleDegrees: ({ commit, state }) => {
    if (state.unit === 'C') {
      commit('convertDegrees', {
        degrees: Math.round((state.degrees * 9) / 5 + 32),
        unit: 'F',
      });
    } else {
      commit('convertDegrees', {
        degrees: Math.round(((state.degrees - 32) * 5) / 9),
        unit: 'C',
      });
    }
  },
};

export const getters = {};
