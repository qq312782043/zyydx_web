export default new Vuex.Store({
  state: {
    text: '1',
  },
  mutations: {
    render(state, key) {
      state.text += key;
    }
  }
})
