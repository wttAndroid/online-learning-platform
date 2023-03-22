
const state = {
  login: false,
  register: false,
  findpass: false,
  formpasswrod:false
}

const getters = {}

const actions = {
  setlogin ({ commit }, login) {
    commit('SET_Login',login)
  },
  setregister ({ commit }, register) {
    commit('SET_REGISTER',register)
  },
  setfindpass ({ commit }, findpass) {
    commit('SET_FINDPASS',findpass)
  },
  setformpasswrod ({ commit }, formpasswrod) {
    commit('SET_FORMPASSWORD',formpasswrod)
  }
}

const mutations = {
  SET_Login: (state, login) => {
    state.login = login;
  },
  SET_REGISTER (state, register) {
    state.register = register;
  },
  SET_FINDPASS (state, findpass) {
    state.findpass = findpass;
  },
  SET_FORMPASSWORD (state, formpass) {
    state.formpasswrod = formpass;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
