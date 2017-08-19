<template>
  <div class="loginbbs">
    <el-row type="flex"  justify="center">
      <el-col :span="12">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"  placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="goIndex()">返回首页</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as types from '../store/types'
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        password: [
          { required: true, message:'请输入密码',trigger: 'blur' }
        ],
        username: [
          {  required: true, message:'请输入用户名' ,trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/server/login',this.ruleForm).then((res)=>{
            this.$store.commit(types.LOGIN, res.result._id);
            this.$store.dispatch('GET_USER',res.result._id);
            this.$router.replace({path:'/Index'});
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goIndex(){
      this.$router.go(-1);
    }
  }
}
</script>

<style>
  .el-row{margin:20px 0;}
  .el-row_1{text-align: center}
</style>
