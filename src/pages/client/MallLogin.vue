<template>
  <div class="ClientLogin" :style="{width:width+'px',height:height+'px'}">
    <div class="content">
      <h3>MoreMall</h3>
      <div class="tag">
        <span @click="setIndex(0)" :class="{selected:curIndex===0}">登录</span>
        <span @click="setIndex(1)" :class="{selected:curIndex===1}">注册</span>
      </div>
      <div class="formBox" v-show="curIndex===0">
        <el-form :model="loginuser" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginuser.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginuser.password"></el-input>
          </el-form-item>
          <el-form-item>
            <button @click="submitForm('ruleForm','login')">登录</button>
          </el-form-item>
        </el-form>
      </div>
      <div class="formBox" v-show="curIndex===1">
        <el-form :model="register" :rules="rules1" ref="ruleForm1" label-width="100px">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="register.email"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="register.nickname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="register.password"></el-input>
          </el-form-item>
          <el-form-item label="收件人姓名" prop="recipient">
            <el-input v-model="register.recipient"></el-input>
          </el-form-item>
          <el-form-item label="收件地址" prop="address">
            <el-input v-model="register.address"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model.number="register.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <button @click="submitForm('ruleForm1','regist')">注册</button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {getClientSize} from '../../util/util';
import {login,signup} from '../../api/client';

export default {
  name: 'ClientLogin',
  computed:{
    width(){
      return getClientSize().width;
    },
    height(){
      return getClientSize().height;
    },
  },
  data () {
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('号码不能为空!!'))
      }
      setTimeout(() => {
        if (!phoneReg.test(value)) {
          console.log(value)
          callback(new Error('格式有误'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      curIndex:0,
      loginuser: {
        email: '',
        password: ''
      },
      register: {
        email: '',
        nickname: '',
        password: '',
        recipient: '',
        address: '',
        phone: ''
      },
      rules: {
        email: [
          { required: true, type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      rules1: {
        email: [
          { required: true, type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        recipient: [
          { required: true, message: '请输入收件人姓名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入收件人地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, type: 'phone', trigger: 'blur', validator: validatePhone }
        ]
      }
    }
  },
  methods:{
    ...mapMutations({
      setClientName: 'SET_CLIENT_NAME',
      setClientToken: 'SET_CLIENT_TOKEN'
    }),
    setIndex(index){
      if(index===this.curIndex){
        return;
      }
      this.curIndex = index;
    },
    login(){
      let user = this.loginuser;
      const res = login(user);
      res
      .then((data)=>{
        this.setClientName(data.name);
        this.setClientToken(data.token);
        this.$router.push('/');
      })
      .catch((e)=>{
        alert(e)
      })
    },
    signup(){
      const res = signup(this.register);
      res
      .then((data)=>{
        this.setClientName(data.name);
        this.setClientToken(data.token);
        this.$router.push('/');
      })
      .catch((e)=>{
        alert(e)
      })
    },
    submitForm(formName,value) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(value == 'login') {
            this.login()
          }
          if(value == 'regist'){
            this.signup()
          }
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
.ClientLogin{
  background-color: @bgColor;
  position: relative;
  .content{
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -260px;
    margin-left: -150px;
    text-align: center;
    overflow: hidden;
    h3{
      color:@secondColor;
      font-size: 50px;
    }
    .tag{
      margin-top: 20px;
      color:@fontDefaultColor;
      margin-bottom: 20px;
      span{
        display: inline-block;
        width: 50px;
        text-align: center;
        margin: 0 10px;
        padding: 10px 0;
        cursor: pointer;
      }
      .selected{
        border-bottom: 2px solid @secondColor;
        color:@secondColor
      }
    }
    input{
      border-radius: 0;
      box-shadow: none;
      background: #fff;
      padding: 14px;
      width: 80%;
      border: 1px solid @borderColor;
      margin-bottom: 10px;
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
