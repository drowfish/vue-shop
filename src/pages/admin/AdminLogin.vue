<template>
  <div class="AdminLogin" :style="{width:width+'px',height:height+'px'}">
    <div class="content">
      <h3>MoreMall</h3>
      <P>后台管理系统</P>
      <el-form :model="loginAdmin" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="loginAdmin.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginAdmin.password"></el-input>
        </el-form-item>
        <el-form-item>
          <button @click="submitForm('ruleForm')">登录</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {getClientSize} from '../../util/util';
import {login} from '../../api/admin';

export default {
  name: 'AdminLogin',
  computed:{
    width(){
      return getClientSize().width;
    },
    height(){
      return getClientSize().height;
    },
  },
  data () {
    return {
      loginAdmin: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    ...mapMutations({
      setAdminName: 'SET_ADMIN_NAME',
      setAdminToken: 'SET_ADMIN_TOKEN'
    }),
    login(){
      const res = login(this.loginAdmin);
      res
      .then((data)=>{
        this.setAdminName(data.name);
        this.setAdminToken(data.token);
        this.$router.push('/backstage');
      })
      .catch((e)=>{
        alert('登录失败')
      })
    },
    submitForm(formName,value) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.login()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.AdminLogin{
  background-color: @bgColor;
  position: relative;
  .content{
    width: 300px;
    height: 360px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -180px;
    margin-left: -150px;
    text-align: center;
    overflow: hidden;
    h3{
      color:@secondColor;
      font-size: 50px;
    }
    p{
      margin-top: 20px;
      color:@fontDefaultColor;
      margin-bottom: 20px;
    }
    input{
      border-radius: 0;
      box-shadow: none;
      background: #fff;
      padding: 14px;
      width: 80%;
      border: 1px solid @borderColor;
    }
    button{
      width: 90%;
      background: @secondColor;
      box-shadow: none;
      border: 0;
      border-radius: 3px;
      line-height: 41px;
      color: #fff;
      cursor: pointer;
      margin-top: 20px;
    }
  }
}
</style>
