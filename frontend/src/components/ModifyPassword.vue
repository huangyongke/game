<template>
  <Card>
    <Tabs type="card">
      <Tab-pane label="修改密码">
        <Form ref="formValidate" class="zcform" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="用户名：" prop="name">
            <Input disabled class="login-input" v-model="formValidate.name" placeholder="请输入您的用户名">
          </FormItem>
          <FormItem label="原密码：" prop="old_password">
            <Input type="password" class="login-input" v-model="formValidate.old_password" placeholder="请输入原密码">
          </FormItem>
          <FormItem label="新密码：" prop="new_password">
            <Input type="password" class="login-input" v-model="formValidate.new_password" placeholder="请输入新密码">
          </FormItem>
          <FormItem label="确认密码：" prop="repassword">
            <Input type="password" class="login-input" v-model="formValidate.repassword" placeholder="请再次输入新密码">
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 50px">修改</Button>
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
  name: 'Reg',
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formValidate.new_password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user: {},
      formValidate: {
        name: '',
        old_password: '',
        new_password: '',
        repassword: ''
      },
      ruleValidate: {
        old_password: [
          {
            required: true,
            message: '原密码不能为空',
            trigger: 'blur'
          }
        ],
        new_password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '密码不能小于6位',
            trigger: 'blur'
          }
        ],
        repassword: [
          { required: true, validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  //这两个map是vuex的部分
  computed: {},
  mounted() {
    this.getSession()
  },
  methods: {
    //for vuex
    getSession() {
      this.$http({
        url: '/api/getSession',
        method: 'Get'
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
          this.id = res.body.id
          this.getdata()
          // for (var i = 0; i < this.table_data.length; i++) {
          //   this.table_data[i].admin = this.table_data[i].admin
          //     ? '管理员'
          //     : '普通用户'
          // }
        }
        // 返回总记录
        //this.$router.push({path: '/hello', query:{data: res.body}})
      })
    },
    getdata() {
      this.$http({
        url: '/api/getUserInfoById',
        method: 'GET',
      }).then(
        function(res) {
          this.user = res.body
          this.formValidate.name = res.body.name
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
            url: '/api/modifyPassword',
            method: 'POST',
            body: {
              old_password: this.formValidate.old_password,
              new_password: this.formValidate.new_password
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
            } else if (res.body == '1') {
              this.$Notice.error({ title: '密码错误' })
            } else {
              this.$Message.success('修改密码成功')
              this.handleReset('formValidate')
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
    },
    changePage() {
      this.$router.push({ path: '/second' })
    }
  }
}
</script>

<style scoped>
.warning {
  line-height: 1;
  margin-left: 100px;
  color: #ed3f14;
}
.login-input {
  width: 300px;
}
</style>