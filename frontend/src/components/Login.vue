<template>
  <div>
    <div class="content">
      <div class="width1190">
        <div class="reg-logo">
          
        <Form ref="formValidate"  class="zcform" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <h2 style="margin-left: 150px;margin-bottom: 20px;">登录</h2>
          <FormItem label="用户名：" prop="name">
            <Input class="login-input" v-model="formValidate.name" placeholder="请输入您的用户名">
          </FormItem>
          <FormItem label="密码：" prop="password">
            <Input type="password" class="login-input" @on-enter="handleSubmit('formValidate')" v-model="formValidate.password" placeholder="请输入密码">
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 20px">登录</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 30px">重置</Button>
          </FormItem>
          <router-link to="/forget" style="margin-left:250px;">忘记密码？</router-link>
        </Form>
        
          <div class="reg-logo-right">
            <h3>如果您没有账号，请</h3>
            <router-link to="/reg" class="logo-a">立即注册</router-link>
          </div>
          <!--reg-logo-right/-->
          <div class="clears"></div>
        </div>
        <!--reg-logo/-->
      </div>
      <!--width1190/-->
    </div>
    <!--content/-->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      formValidate: {
        name: '',
        password: ''
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: '账户不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  //这两个map是vuex的部分
  computed: {},
 
  methods: {
    //for vuex
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http({
                  url: '/api/signin',
                  method: 'POST',
                  body:{
                    name:this.formValidate.name,
                    password:this.formValidate.password
                  },
                  dataType:"json",
              }).then(function (res) {
                if(res.body == '2'){
                  this.$Notice.error({title:'账号不存在'})
                }else if(res.body === '1'){
                  this.$Notice.error({title:'账号与密码不匹配'})
                }else{
                  
                  this.$router.push('/')
                  this.$Message.success('登录成功')
                }
                
          })
          // this.$Message.success('Success!')
        } else {
          this.$Message.error('请正确输入')
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style scoped>

.login-input{
  width: 60%;
}
.warring{
  line-height: 1;
  margin-left: 100px;
  color: #ed3f14;
}

.login-click,
.reg-click {
  display: inline-block;
  height: 25px;
  line-height: 25px;
  background: #806229;
  width: 60px;
  margin-left: 5px;
  text-align: center;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  color: #fff;
}
.login-click:hover,
.reg-click:hover {
  background: #583f10;
  color: #fff;
}

.left {
  float: left;
}
.right {
  float: right;
}
.clearfix:after {
  content: '.';
  display: block;
  clear: both;
  font-size: 0;
  overflow: hidden;
  height: 0;
}
.clearfix {
  zoom: 1;
}
.reg-logo {
  width: 800px;
  margin: 20px auto;
  min-height: 200px;
  padding: 40px 0 0 0;
}
.zcform {
  width: 440px;
  float: left;
  border-right: #ddd 1px solid;
  font-size: 14px;
  min-height: 200px;
}

#telphone,
#password,
#confirm_password,
.submit,
#agent {
  border: 1px solid #ccc;
  width: 300px;
  height: 46px;
  text-indent: 10px;
}
.identifying_code {
  height: 46px;
  width: 180px;
  _line-height: 46px;
  text-indent: 10px;
}
.get_code {
  height: 48px;
  width: 110px;
  margin-left: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.agreement {
  margin-left: 90px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.agreement input {
  display: block;
  line-height: 30px;
  height: 12px;
  margin: 8px 8px 0 5px;
  border: none;
  width: 12px;
}
.reg-logo-right {
  float: left;
  width: 300px;
  margin: 0 0 0 40px;
}
.reg-logo-right h3 {
  font-size: 16px;
  height: 40px;
  line-height: 40px;
}
.logo-a {
  display: block;
  width: 120px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 16px;
  background: #f1f1f1;
  border: #ddd 1px solid;
  margin: 15px 0 0 0;
}
.logo-a:hover {
  background: #806229;
  color: #fff;
  border: #583f10 1px solid;
}
</style>