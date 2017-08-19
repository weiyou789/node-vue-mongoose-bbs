import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as types from './types'

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    arts:[]
  },
  actions:{
    LOAD_USER_ARTS:async function ({ commit },token) {
      try{
        let r = await axios.get(`/server/userarts/${token}`);
        commit('SET_USER_ARTS', { arts: r.result })
      } catch (err){
        console.log(err)
      }
    },
    LOAD_ALL_ARTS:async function({ commit }){
      try{
        let r = await axios.get('/server/arts');
        commit('SET_ALL_ARTS', { arts:r.result})
      }catch (err){
        console.log(err)
      }
    },
    GET_USER:async function({ commit },token){
      try{
        let r =await axios.get(`/server/user/${token}`);
        console.log( r.result.username)
        commit('SET_USER', { user: r.result.username})
      }catch (err){
        console.log(err)
      }
    }
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null;
    },
    SET_USER_ARTS: (state, { arts }) => {
      state.arts = arts
    },
    SET_ALL_ARTS: (state, { arts }) => {
      state.arts = arts
    },
    SET_USER: (state, { user }) => {
      state.user = user
    }
  },
  /*getters: {
    openProjects: state => {
      return state.arts.filter(project => !project.completed)
    }
  }*/
})
