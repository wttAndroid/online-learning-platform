import { login, logout, getInfo } from '@/api/user'

import eduApi from '@/api/edu'

import store from '@/store'

const getDefaultState = () => {
  return {
    user: {},
    token: '',
    msgCount:0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_MSG: (state, count) => {
    state.msgCount = count
  }
}

const actions = {
  // user login
  login({ commit, dispatch }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const { code, data,message } = response
        if (code == 20000) {
          dispatch('getMsg')

          commit('SET_USER', data.item)
          commit('SET_TOKEN', data.item.token)
          localStorage.setItem('token', data.item.token)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, dispatch }) {
    const token = localStorage.getItem('token')
    commit('SET_TOKEN', token)
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { code, data, message } = response
        if (code !== 20000) {
          dispatch("dialog/setlogin", true,{root: true});

          return reject('用户未认证，请登录！')
        }
        commit('SET_USER', data.item)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getMsg({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      eduApi.getMsgByList(1).then(response => {
        const { code, data, message } = response
        if (code !== 20000) {
          return reject('用户未认证，请登录！')
        }
        commit('SET_MSG', data.unread)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  setInfo({ commit }, userInfo) {
    commit('SET_USER', userInfo)
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        // removeToken() // must remove  token  first
        localStorage.removeItem('token')
        // store.dispatch('resetRouters')
        // resetRouter()
        commit('RESET_STATE')
        // location.reload()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

