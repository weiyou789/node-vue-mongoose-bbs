<template>
  <div class="header-menu-wrap">
    <el-row>
      <el-col>
        <el-menu :default-active="activeIndex" theme="dark" class="header-menu" mode="horizontal" :router="true">
          <el-menu-item index="/Index">首页</el-menu-item>
          <el-menu-item v-show="!token" index="/Login">登录</el-menu-item>
          <el-menu-item v-show="!token" index="/Reg">注册</el-menu-item>
          <el-submenu index="2" v-show="token">
            <template slot="title">{{user}}</template>
            <el-menu-item index="/MyArts">我的文章</el-menu-item>
            <el-menu-item index="/WriteArt">写文章</el-menu-item>
            <el-menu-item index="2-3" @click="logout">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as types from '../store/types'
  import {mapState} from 'vuex'

  export default {
    name:'NavMenu',
    data() {
      return {
        activeIndex:'1'
      };
    },
    computed: mapState({
      token: state => state.token,
      user: state => state.user
    }),
    mounted () {
        if(this.token){
          this.$store.dispatch('GET_USER',this.token);
        }
    },
    methods: {
      logout(){
        this.$store.commit(types.LOGOUT);
        this.$store.dispatch('LOAD_ALL_ARTS');
        this.$router.replace({path:'/Index'});
      },
    }
  }
  </script>
