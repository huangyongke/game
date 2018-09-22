<template>
  <div>
    <div class="content">
      <div class="width1190">
          <Form ref="formValidate" class="zcform" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <h2 style="margin: 20px 0 10px 150px;">卖号</h2>
            <FormItem label="游戏类型：" prop="typed">
              <Select v-model="formValidate.typed" placeholder="请选择游戏类型">
                  <Option v-for="item in typelist" :value="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="游戏区：" prop="area">
              <i-select v-model="formValidate.area" placeholder="请选择游戏区">
                <i-option v-for="item in arealist" :key="item.id" :value="item.id">{{item.area}}</i-option>
              </i-select>
            </FormItem>
            <FormItem label="账户：" prop="account">
              <Input class="login-input" v-model="formValidate.account" placeholder="请输入密码">
            </FormItem>
            <FormItem label="密码：" prop="password">
              <Input type="password" class="login-input" v-model="formValidate.password" placeholder="请输入密码">
            </FormItem>

            <FormItem label="备注：" prop="remark">
 <i-input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
            </FormItem>

            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 20px">提交</Button>
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
    const validateTypeCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择游戏类型'));
                } else {
                    callback();
                }
            };
    const validateAreaCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择区域'));
                } else {
                    callback();
                }
            };
    return {
      typelist:[],
      arealist:[],
      formValidate: {
        typed: '',
        area: '',
        account: '',
        password:'',
        remark:''
      },
      ruleValidate: {
        typed: [
          {
            required: true,
            validator: validateTypeCheck,
            trigger: 'change'
          }
        ],
        area:{
          required: true,
            validator: validateAreaCheck,
            trigger: 'change'
        },
        account: [
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
        ],
        remark:[{
          required:false,
        }]
      }
    }
  },
  //这两个map是vuex的部分
  computed: {},
  watch:{
    
    'formValidate.typed' : function(){
      this.formValidate.area = ''
      this.$http({
      url: '/api/getAreaById',
      method: 'GET',
      params: {
        type_id:this.formValidate.typed,
      }
    }).then(
      function(res) {
        this.arealist = res.body
        
        // 返回总记录
        //this.$router.push({path: '/hello', query:{data: res.body}})
      },
      function() {
        this.$Message.error('获取数据失败')
      }
    )
    }
  },
  mounted(){
    this.getSession()
    this.$http({
            url: '/api/getGameCategory',
            method: 'Get',
            
          }).then(function(res) {
            this.typelist = res.body
          })
          // this.$Message.success('Success!')
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
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http({
            url: '/api/addBuyGame',
            method: 'POST',
            body: {
              area_id: this.formValidate.area,
              account: this.formValidate.account,
              password: this.formValidate.password,
              remark:this.formValidate.remark,
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
            }else{
              this.$Message.success("提交成功")
              this.$router.push({ path: '/sell' })
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