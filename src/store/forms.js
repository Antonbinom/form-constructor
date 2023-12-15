const forms = {
  state: {
    forms: [],
    currentFormId: ''
  },
  mutations: {
    setForms(state, data) {
      state.forms = data;
    },
    addNewForm(state, formData) {
      let indexToUpdate = state.forms.findIndex(form => form.id === formData.id);
      if (indexToUpdate !== -1) {
        state.forms[indexToUpdate] = formData;
        localStorage.setItem('forms', JSON.stringify(state.forms))

      } else {
        state.forms.push(formData);
        localStorage.setItem('forms', JSON.stringify(state.forms))
      }
    },
    deleteForm(state, id) {
      state.forms = state.forms.filter(form => form.id !== id)
      localStorage.setItem('forms', JSON.stringify(state.forms))
    },
    setCurrentFormId(state, value) {
      state.currentFormId = value;
    },
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
    },
    setCurrentFormId({commit}, id) {
      commit('setCurrentFormId', id)
    },
  },
  getters: {
    getForms(state) {
      return state.forms;
    },
    getCurrentForm(state) {
      return state.forms.find(form => form.id === state.currentFormId);
    },
  }
}

export default forms;