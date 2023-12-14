const form = {
  state: {
    forms: [],
    currentForm: {}
  },
  mutations: {
    setForms(state, formData) {
      state.forms = state.forms.push(formData);
    },
    setCurrentForm(state, data) {
      state.currentForm = data;
    }
  },
  actions: {
    setForms({commit}, formData) {
      commit('setForms', formData)
    },
    setCurrentForm({commit}, data) {
      commit('setCurrentForm', data)
    }
  },
  getters: {
    getForms(state) {
      return state.forms;
    },
    getCurrentForm(state) {
      return state.currentForm;
    }
  }
}

export default form;