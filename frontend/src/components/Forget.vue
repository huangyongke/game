<template>
  <div>
    <div class="content">
      <div class="width1190">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <h2 style="margin: 20px 0 10px 150px;">找回密码</h2>
            <FormItem label="用户名：" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入您的用户名">
          </FormItem>
            <FormItem label="手机号：" prop="phone">
              <Input v-model="formValidate.phone" placeholder="请输入手机号">
            </FormItem>
            <FormItem label="密码：" prop="password">
              <Input type="password" v-model="formValidate.password" placeholder="请输入密码">
            </FormItem>
            <FormItem label="确认密码：" prop="repassword">
              <Input type="password" v-model="formValidate.repassword" placeholder="请再次输入密码">
            </FormItem>
            

            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 25px">提交</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 30px">重置</Button>
            </FormItem>
          </Form>
      </div>
      <!--width1190/-->
    </div>
    <!--content/-->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'registration',
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
        name:'',
        phone: '',
        password:'',
        repassword:'',
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
      }
    }
  },
  //这两个map是vuex的部分
  computed: {},
  watch:{
  },
  mounted(){
    
  },
  methods: {
    //for vuex
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http({
            url: '/api/forgetPassword',
            method: 'POST',
            body: {
              name: this.formValidate.name,
              phone: this.formValidate.phone,
              password: this.formValidate.password,
            },
            dataType: 'json'
          }).then(function(res) {
            if(res.body == '0'){
              this.$Notice.error({title:'该账户不存在'})
            }else if(res.body == '1'){
              this.$Notice.error({title:'手机号错误'})
            }else{
              this.$Message.success("修改成功")
              this.$router.push({ path: '/login' })
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
.content{
  width: 400px;
  margin: 0px auto;
}
</style>