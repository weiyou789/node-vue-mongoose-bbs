import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import * as types from '../store/types'
import RegBbs from '@/views/RegBbs'
import IndexBbs from '@/views/IndexBbs'
import LoginBbs from '@/views/LoginBbs'
import WriteArt from '@/views/WriteArt'
import MyArts from '@/views/MyArts'

Vue.use(Router)

export const router =  new Router({
  mode: 'history',
  routes: [
    {path: '*', redirect: '/Index'},
    {
      path: '/Reg',
      name: '注册',
      component: RegBbs,
      beforeEnter:function(to, from, next){
        store.state.token?next({path: '/'}):next();
      }
    },
    {
      path: '/Login',
      name: '登录',
      component: LoginBbs,
      beforeEnter:function(to, from, next){
        store.state.token?next({path: '/'}):next();
      }
    },
    {
      path: '/WriteArt',
      name: '写文章',
      component: WriteArt
    },
    {
      path: '/MyArts',
      name: '我的文章',
      component: MyArts
    },
    {
      path: '/Index',
      name: '首页',
      meta: {
        requireAuth: true,
      },
      component: IndexBbs,
      /*beforeEnter:function(to, from, next){
        if (!to.params || !to.params._id) return Promise.reject('need params');
        Vue.http.get(`http://localhost:129/server/user/${to.params._id}`).then((res) => {
          console.log(res);
          to.params.userinfo = res.result;
          next()
        });
      }*/
    }
  ]
})

if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

/*router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/Reg'
      })
    }
  }
  else {
    next();
  }
});*/
