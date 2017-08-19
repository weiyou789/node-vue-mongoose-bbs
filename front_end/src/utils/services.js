/**
 * Created by root on 2017/7/12.
 */
import axios from 'axios'
import {Loading} from 'element-ui';
import store from '../store'
import {router} from '../router'
import * as types from '../store/types'
let loading;

axios.defaults.baseURL = 'http://localhost:129';
axios.defaults.timeout = 5000;
function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true
  axios.interceptors.request.use(
    config => {
      if (store.state.token) {
        config.headers.Authorization = `token ${store.state.token}`;
      }
      return config;
    },
    (request) => {
    if (!request.noLoading) loading = Loading.service();
    return Promise.resolve(request)
  }, (error) => {
    console.error(' request error', error, error && error.request)
    return Promise.reject(error)
  })

  axios.interceptors.response.use((response) => {
    if (loading) loading.close();
    if (!response.data || response.data.code !== -1) {
      if (response.data.code === -2 && response.data.desc && /E11000/.test(response.data.desc)) {
        response.data.desc = '用户名已存在'
      }
      if (response.data.code === -5) {
        store.commit(types.LOGOUT);
        router.replace({
          path: '/Login',
        })
      }
      Vue.prototype.$message({
        message: response.data && response.data.desc,
        showClose: true,
        type: 'error'
      });
      return Promise.reject(response.data)
    }
    return response.data
  }, (error) => {
    if (error.response) {
      switch (error.response.code) {
        case -5:
          store.commit(types.LOGOUT);
          router.replace({
            path: '/Login',
          })
      }
    }
    /*Vue.prototype.$message({
      message: error || (error && error.response),
      showClose: true,
      type: 'error'
    });*/
    return Promise.reject(error)
  })

  Vue.http = axios

  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {//访问axios对象就使用get方法
        return axios
      }
    },
    $http: {//访问$http对象就使用get方法
      get () {
        return axios
      }
    }
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
export default plugin
