<template>
  <div class="wa">

    <el-row type="flex" justify="center" class="el-row_1" v-show="token">
      <el-col :span="12">
        写文章
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="el-row_1" v-show="!token">
      <el-col :span="12">
        请先登录
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center" v-show="token">
      <el-col :span="12">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="标题" prop="arttitle">
            <el-input v-model="ruleForm.arttitle"  placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" placeholder="请输入内容" :rows="10" v-model="ruleForm.artcon"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
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
      ruleForm: {
        arttitle: '',
        artcon: ''
      },
      rules: {
        arttitle: [
          { required: true, message:'请输入标题',trigger: 'blur' }
        ],
        artcon: [
          {  required: true, message:'请输入内容' ,trigger: 'blur' },
        ]
      }
    };
  },
  computed: mapState({
    token: state => state.token
  }),
  created () {
      //console.log(this.$route.params)
    //this.name = this.$route.params.userinfo.username
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let pm = {};
          pm.arttitle = this.ruleForm.arttitle;
          pm.artcon = this.ruleForm.artcon;
          pm._user = this.token;
          this.$http.post('http://localhost:129/server/write',pm).then((res)=>{
            this.$router.replace({path:'/Index'});
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>
<style>
  .el-row{margin:20px 0;}
  .el-row_1{text-align:center;}
</style>
