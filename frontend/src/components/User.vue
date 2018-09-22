<template>
  <Card>
    <Tabs type="card">
      <Tab-pane label="修改资料">
        <Form ref="formValidate" class="zcform" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="用户名：" prop="name">
            <Input disabled class="login-input" v-model="formValidate.name">
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
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 50px">更改</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 30px">重置</Button>
          </FormItem>
        </Form>

      </Tab-pane>
    </Tabs>
  </Card>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'User',
  data() {
    return {
      id: '',
      user: {},
      formValidate: {
        name: '',
        phone: '',
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
  mounted() {
    this.getdata()
  },
  methods: {
    //for vuex
    getdata() {
      this.$http({
        url: '/api/getUserInfoById',
        method: 'GET',
      }).then(
        function(res) {
          if (res.body === 'login') {
            this.$Modal.warning({
              title: '您还没有登录',
              content: '<p>是否跳转到登录界面登录</p>',
              onOk: () => {
                this.$router.push({ path: '/login' })
              },
              onCancel: () => {}
            })
          } else {
            this.user = res.body
            this.formValidate.name = res.body.name
            this.formValidate.phone = res.body.phone
            this.formValidate.email = res.body.email
            this.formValidate.qq = res.body.qq
            this.formValidate.weixin = res.body.weixin
          }
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http({
            url: '/api/updateUserInfo',
            method: 'POST',
            body: {
              id: this.id,
              phone: this.formValidate.phone,
              email: this.formValidate.email,
              qq: this.formValidate.qq,
              weixin: this.formValidate.weixin
            },
            dataType: 'json'
          }).then(function(res) {
            if (res.body === 'login') {
            this.$Modal.warning({
              title: '您还没有登录',
              content: '<p>是否跳转到登录界面登录</p>',
              onOk: () => {
                this.$router.push({ path: '/login' })
              },
              onCancel: () => {}
            })
          } else {
            this.getdata()
            this.$Message.success('修改成功')
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
      this.formValidate.name = this.user.name
      this.formValidate.phone = this.user.phone
      this.formValidate.email = this.user.email
      this.formValidate.qq = this.user.qq
      this.formValidate.weixin = this.user.weixin
    }
  }
}
</script>

<style scoped>
.login-input {
  width: 300px;
}

.warring {
  line-height: 1;
  margin-left: 100px;
  color: #ed3f14;
}
</style>