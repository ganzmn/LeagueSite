import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  state: {
    messages: [],
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    updateMessages (state, messages) {
      state.messages = messages
    },
    newMessage (state, message) {
      console.log(message)
      state.messages.push(message)
    },
    auth (state, token) {
      state.token = token
    },
    logout (state) {
      state.token = ''
      localStorage.clear('token')
    }
  },
  actions: {
    async getMessages ({ commit }) {
      const messages = (await axios.get('http://localhost:3000/messages')).data
      commit('updateMessages', messages)
    },
    async newMessage ({ commit }, message) {
      const msg = (await axios.post('http://localhost:3000/messages', {
        messageBody: [message]
      })).data
      commit('newMessage', msg)
    },
    async register ({ commit }, registerData) {
      const token = (await axios.post('http://localhost:3000/register', registerData)).data
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = token
      commit('auth', token)
    },
    async login ({ commit }, registerData) {
      const token = (await axios.post('http://localhost:3000/login', registerData)).data
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = token
      commit('auth', token)
    }
  }
})
