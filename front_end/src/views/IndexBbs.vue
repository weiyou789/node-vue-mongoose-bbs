<template>
  <div class="indexbbs">
    <el-row>
      <el-col :span="24">
        <ul>
          <li v-for="item in arts" @click="getCon">
            {{ item.arttitle }}
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import * as types from '../store/types'
import {mapState} from 'vuex'

export default {

  data() {
    return {
        titles:''
    };
  },
  computed: mapState({
    arts:state =>state.arts
  }),
  mounted () {
    this.$store.dispatch('LOAD_ALL_ARTS');
  },
  methods: {
    getCon(){

    }
  }
}
</script>
