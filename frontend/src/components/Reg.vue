<template>
  <div>
    <div class="content">
      <div class="width1190">
        <div class="reg-logo">
          <Form ref="formValidate" class="zcform" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <h2 style="margin-left: 150px;margin-bottom: 20px;">注册</h2>
            <FormItem label="用户名：" prop="name">
              <Input class="login-input" v-model="formValidate.name" placeholder="请输入您的用户名">
            </FormItem>
            <FormItem label="密码：" prop="password">
              <Input type="password" class="login-input" v-model="formValidate.password" placeholder="请输入密码">
            </FormItem>
            <FormItem label="确认密码：" prop="repassword">
              <Input type="password" class="login-input" v-model="formValidate.repassword" placeholder="请输入密码">
            </FormItem>
            <FormItem label="手机号：" prop="phone">
              <Input class="login-input" v-model="formValidate.phone" placeholder="请输入手机号">
            </FormItem>
            <FormItem label="邮箱：" prop="email">
              <Input class="login-input" v-model="formValidate.email" placeholder="请输入邮箱">
            </FormItem>
            <FormItem label="QQ号:" prop="qq">
              <Input class="login-input" v-model="formValidate.qq" placeholder="请输入QQ号">
            </FormItem>
            <FormItem label="微信号:" prop="weixin">
              <Input class="login-input" v-model="formValidate.weixin" placeholder="请输入微信号">
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 5px">注册</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 30px">重置</Button>
            </FormItem>
          </Form>
          <div class="reg-logo-right">
            <h3>如果您已有账号，请</h3>
            <router-link to="/login" class="logo-a">立即登录</router-link>
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
  name: 'Reg',
  data() {
    const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formValidate.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
    return {
      formValidate: {
        name: '',
        password: '',
        repassword: '',
        phone:'',
        email: '',
        qq: '',
        weixin: ''
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
          },
          {
            type: 'string',
            min:6,
            message: '密码不能小于6位',
            trigger: 'blur'
          }
        ],
        repassword: [
          {required: true, validator: validatePassCheck, trigger: 'blur' }
        ],
        phone: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        qq: [
          {
            required: false
          }
        ],
        weixin: [
          {
            required: false
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
            url: '/api/registered',
            method: 'POST',
            body: {
              name: this.formValidate.name,
              password: this.formValidate.password,
              phone:this.formValidate.phone,
              email: this.formValidate.email,
              qq: this.formValidate.qq,
              weixin: this.formValidate.weixin
            },
            dataType: 'json'
          }).then(function(res) {
            if (res.body === '1') {
              this.$Notice.error({title:'账户已存在'})
            }else {
              this.$Message.success('注册成功')
              this.$router.push('/login')
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
    },
    changePage() {
      this.$router.push({ path: '/second' })
    }
  }
}
</script>

<style scoped>
.warring {
  line-height: 1;
  margin-left: 100px;
  color: #ed3f14;
}
.login-input {
  width: 60%;
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
.zcform p {
  margin-bottom: 10px;
}
.zcform a {
  color: #ff7702;
}
.zcform p.last {
  margin-left: 310px;
  font-size: 16px;
}
.zcform p.last input {
  cursor: pointer;
}
.zcform label {
  display: block;
  float: left;
  height: 48px;
  line-height: 48px;
  color: #f00;
  text-indent: 10px;
}
.zcform label.one {
  width: 90px;
  height: 48px;
  text-align: right;
  color: #000;
}
.zcform input {
  float: left;
  font-size: 16px;
  font-family: '微软雅黑';
  color: #666;
}
.zcform .submit {
  margin-left: 90px;
  background: #f93;
  font-size: 20px;
  letter-spacing: 4px;
  color: #fff;
  cursor: pointer;
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
  float: right;
  width: 200px;
  margin: 100px 70px 0 0;
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