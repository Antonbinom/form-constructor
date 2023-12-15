const forms = {
  state: {
    forms: [],
  },
  mutations: {
    setForms(state, data) {
      state.forms = data;
    },
    addNewForm(state, formData) {
      state.forms.push(formData);
      localStorage.setItem('forms', JSON.stringify(state.forms))
    },
    deleteForm(state, id) {
      state.forms = state.forms.filter(form => form.id !== id)
      localStorage.setItem('forms', JSON.stringify(state.forms))
    }
  },
  actions: {
    setForms({commit}, data) {
      commit('setForms', data)
    },
    addNewForm({commit}, formData) {
      commit('addNewForm', formData)
    },
    deleteForm({commit}, id) {
      commit('deleteForm', id)
    }
  },
  getters: {
    getForms(state) {
      return state.forms;
    },
  }
}

export default forms;