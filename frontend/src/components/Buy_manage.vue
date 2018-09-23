<template>
  <Tabs type="card">
    <Tab-pane label="购买游戏">
      <div class="search-form">
      <row class="query">
          <label class="top-label">商品编号</label>
          <i-input v-model="data.buy_id" @on-enter="getbuydata()" placeholder="请输入商品编号" style="width: 140px"></i-input>
        </row>
        <row class="search">
                    <i-button class="cost-module-btn" type="ghost" icon="ios-search" shape="circle" @click="getbuydata()">搜索</i-button>
                </row>
      </div>
      <Row>
        <i-col span='12'>
          <div class="image">
            <img :src="'/static/img/'+game.avatar" width="140" height="100" class="avatar">
            <Upload name='image' ref='upload1' action="/api/upload" :show-upload-list="true" :on-success="handleavatarSuccess" :on-remove="handleavatarRemove" :format="['jpg','jpeg','png','gif']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload">
              <i-button type="ghost" icon="ios-cloud-upload-outline">上传账号图片</i-button>
            </Upload>
          </div>
        </i-col>
        <i-col span='12'>
          <div class="image">
            <h2 class="title">添加图片描述</h2>
            <div class="demo-upload-list" v-for="(item,index) in uploadList">
              <template v-if="item.status === 'finished'">
                <img :src="'/static/img/'+item.url">
                <div class="demo-upload-list-cover">
                  <a  @click="handleRemove(index)"><Icon type="ios-trash-outline"></Icon></a>
                  
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>

            <Upload name='image' ref='upload' :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="/api/upload" style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </div>
        </i-col>
      </Row>
      <Form ref="game" class="zcform" :model="game" :rules="ruleValidate" :label-width="100">
        <Row style="margin-top:10px;">
          <i-col span='12'>
            <FormItem label="名称：" prop="name">
              <Input class="login-input" v-model="game.name" placeholder="请输入名称">
            </FormItem>
            <FormItem label="游戏类型：" prop="type">
              <Select class="login-input" v-model="game.type" placeholder="请选择游戏类型">
                <Option v-for="item in typelist" :value="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="游戏战区：" prop="zone">
              <i-select class="login-input" v-model="game.zone" placeholder="请选择游戏战区">
                <i-option v-for="item in zonelist" :key="item.id" :value="item.id">{{item.name}}</i-option>
              </i-select>
            </FormItem>
            <FormItem label="游戏大区：" prop="area">
              <i-select class="login-input" v-model="game.area" placeholder="请选择游戏大区">
                <i-option v-for="item in arealist" :key="item.id" :value="item.id">{{item.area}}</i-option>
              </i-select>
            </FormItem>
            <FormItem label="游戏账户：" prop="account">
              <Input class="login-input" v-model="game.account" placeholder="请输入游戏账户">
            </FormItem>
            <FormItem label="账户密码：" prop="password">
              <Input class="login-input" v-model="game.password" placeholder="请输入游戏账户密码">
            </FormItem>
            <FormItem label="购买价格：" prop="buy_price">
              <Input number class="login-input" v-model="game.buy_price" placeholder="请输入购买价格（元）">
            </FormItem>
            <FormItem label="出售价格：" prop="sell_price">
              <Input number class="login-input" v-model="game.sell_price" placeholder="请输入销售价格（元）">
            </FormItem>
            <FormItem label="账户等级" prop="level">
              <Input number class="login-input" v-model="game.level" placeholder="请输入账户等级">
            </FormItem>
          </i-col>
          <i-col span='12'>
            <FormItem label="角色：" prop="figure">
              <Input class="login-input" v-model="game.figure" placeholder="请输入账号角色">
            </FormItem>
            <FormItem label="武器：" prop="weapons">
              <Input class="login-input" v-model="game.weapons" placeholder="请输入账号武器">
            </FormItem>
            <FormItem label="稀有角色:" prop="rare_figure">
              <Input class="login-input" v-model="game.rare_figure" placeholder="请输入稀有角色">
            </FormItem>
            <FormItem label="稀有武器:" prop="rare_weapons">
              <Input class="login-input" v-model="game.rare_weapons" placeholder="请输入稀有武器">
            </FormItem>
            <FormItem label="神器:" prop="artifact">
              <Input class="login-input" v-model="game.artifact" placeholder="请输入神器">
            </FormItem>
            <FormItem label="道具:" prop="props">
              <Input class="login-input" v-model="game.props" placeholder="请输入道具">
            </FormItem>
            <FormItem label="介绍:" prop="introduction">
              <Input class="login-input" type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="game.introduction" placeholder="请输入介绍">
            </FormItem>
            <FormItem label="购买备注：" prop="buy_remark">
              <i-input class="login-input" type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="game.buy_remark" placeholder="请输入购买备注">
            </FormItem>
            <FormItem label="出售备注：" prop="sell_remark">
              <i-input class="login-input" type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="game.sell_remark" placeholder="请输入销售备注">
            </FormItem>
          </i-col>

        </Row>

        <div style="text-align:center">
          <Button style="width:300px;" type="success" @click="handleSubmit('game')">提交信息</Button>
          <Button @click="handleReset('game')" style="margin-left: 30px">重置</Button>
        </div>

      </Form>

    </Tab-pane>
  </Tabs>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Buy_manage',
  data() {
    const validateTypeCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择游戏类型'))
      } else {
        callback()
      }
    }
    const validateAreaCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择区域'))
      } else {
        callback()
      }
    }
    const validatePriceCheck = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('价格不能为空'))
      } else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else {
        callback()
      }
    }
    const validatelevelCheck = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('等级不能为空'))
      } else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else {
        callback()
      }
    }
    return {
      data: {},
      typelist: [],
      arealist: [],
      zonelist: [],
      imgName: '',
      isMounted: false,
      visible: false,
      game: {
        name: '',
        type: '',
        area: '',
        zone:'',
        account: '',
        password: '',
        buy_price: '',
        sell_price: '',
        sell_remark: '',
        buy_remark: '',
        level: '',
        figure: '',
        weapons: '',
        rare_figure: '',
        rare_weapons: '',
        artifact: '',
        props: '',
        introduction: '',
        avatar: 'game1.png',
        imageList: []
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            validator: validateTypeCheck,
            trigger: 'change'
          }
        ],
        zone: {
          required: true,
          validator: validateAreaCheck,
          trigger: 'change'
        },
        area: {
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
          }
        ],
        buy_price: [
          {
            required: true,
            validator: validatePriceCheck,
            trigger: 'blur'
          }
        ],
        sell_price: [
          {
            required: true,
            validator: validatePriceCheck,
            trigger: 'blur'
          }
        ],
        level: [
          {
            required: true,
            validator: validatelevelCheck,
            trigger: 'blur'
          }
        ],
        figure: [
          {
            required: false
          }
        ],
        weapons: [
          {
            required: false
          }
        ],
        rare_figure: [
          {
            required: false
          }
        ],
        rare_weapons: [
          {
            required: false
          }
        ],
        artifact: [
          {
            required: false
          }
        ],
        props: [
          {
            required: false
          }
        ],
        introduction: [
          {
            required: false
          }
        ],
        sell_remark: [
          {
            required: false
          }
        ],
        buy_remark: [
          {
            required: false
          }
        ]
      }
    }
  },
  created() {},
  mounted() {
    this.isMounted = true
    this.getSession()
    this.$http({
      url: '/api/getGameCategory',
      method: 'Get'
    }).then(function(res) {
      this.typelist = res.body
    })
    if (this.$route.params.data) {
      this.data = this.$route.params.data
      setTimeout(() => {
        this.game.type = this.data.type_id
      }, 200)
      setTimeout(() => {
        this.game.zone = this.data.zone_id
      }, 400)
      setTimeout(() => {
        this.game.area = this.data.area_id
      }, 500)

      this.game.account = this.data.account
      this.game.password = this.data.password
      this.game.sell_remark = this.data.remark
      this.game.buy_remark = this.data.remark
    }
  },
  //这两个map是vuex的部分
  computed: {
    uploadList() {
      // getter
      if (this.isMounted) {
        return this.$refs.upload.fileList
      }
    }
  },
  watch: {
    'game.type': function() {
      this.game.zone = ''
      this.$http({
        url: '/api/getZoneById',
        method: 'GET',
        params: {
          type_id: this.game.type
        }
      }).then(
        function(res) {
          this.zonelist = res.body

          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
    },
    'game.zone': function() {
      this.game.area = ''
      this.$http({
        url: '/api/getAreaById',
        method: 'GET',
        params: {
          zone_id: this.game.zone
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
    select(name) {
      this.$router.push('/' + name)
    },
    getbuydata(){
      this.$http({
        url: '/api/getAllBuyGame',
        method: 'POST',
        body: {
          buy_id: this.data.buy_id,
        }
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
            } else if (res.body === 'admin') {
            this.$Modal.error({
              title: '您没有权限',
              onOk: () => {
                this.$router.push({ path: '/index' })
              },
              onCancel: () => {}
            })
            } else{
              console.log(res.body)
                this.table_data = res.body
                if(res.body.length>0){
                this.data = res.body[0]
                this.game.type = this.data.type_id
                setTimeout(() => {
                this.game.zone = this.data.zone_id
              }, 300)
              setTimeout(() => {
                this.game.area = this.data.area_id
              }, 500)

              this.game.account = this.data.account
              this.game.password = this.data.password
              this.game.sell_remark = this.data.remark
              this.game.buy_remark = this.data.remark
                }
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
          this.game.imageList = []
          for (var i = 0; i < this.uploadList.length; i++) {
            this.game.imageList.push(this.uploadList[i].name)
          }
          console.log(this.uploadList)
          console.log(this.game.imageList)
          if(this.data.user_id){
            var code = 1
          }else{
            code = 2
          }
          this.$http({
            url: '/api/buyGame',
            method: 'POST',
            body: {
              code:code,
              user_id:this.data.user_id,
              buy_id:this.data.buy_id,
              name: this.game.name,
              type_id: this.game.type,
              zone_id: this.game.zone,
              area_id: this.game.area,
              account: this.game.account,
              password: this.game.password,
              buy_price: this.game.buy_price,
              sell_price: this.game.sell_price,
              sell_remark: this.game.sell_remark,
              buy_remark: this.game.buy_remark,
              level: this.game.level,
              figure: this.game.figure,
              weapons: this.game.weapons,
              rare_figure: this.game.rare_figure,
              rare_weapons: this.game.rare_weapons,
              artifact: this.game.artifact,
              props: this.game.props,
              introduction: this.game.introduction,
              avatar: this.game.avatar,
              imageList: this.game.imageList
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
            } else if (res.body === 'admin') {
              this.$Modal.error({
                title: '您没有权限',
                onOk: () => {
                  this.$router.push({ path: '/index' })
                },
                onCancel: () => {}
              })
            } else {
              this.$Message.success('购买成功')
              this.handleReset('game')
            }
          })
          // this.$Message.success('Success!')
        } else {
          this.$Message.error('请正确输入')
        }
      })
    },
    handleReset(name) {
      this.game.avatar = 'game1.png'
       this.$refs.upload.clearFiles()
      this.$refs.upload1.clearFiles()
      this.$refs[name].resetFields()
    },

    handleView(name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove(file) {
      // 从 upload 实例删除数据
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleavatarSuccess(res, file) {
      this.game.avatar = res
    },
    handleavatarRemove(file) {
      this.game.avatar = 'game1.png'
    },
    handleSuccess(res, file) {
      // 因为上传过程为实例，这里模拟添加 url
      file.url = res
      file.name = res
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc:
          '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      })
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 20
      if (!check) {
        this.$Notice.warning({
          title: '最多只能上传 20 张图片。'
        })
      }
      return check
    }
  }
}
</script>

<style scoped>
.cost-module-btn {
  color: white;
  background-color: #4169e1;
  border-color: #4169e1;
}

.cost-module-btn:hover {
  color: white;
  background-color: #4169e1;
  border-color: #4169e1;
}

.search {
  width: 30px;
  margin-left: 10px;
  display: inline-block;
}

.top-label {
  margin-right: 5%;
  font-size: 14px
}
.search-form {
  display: inline-block;
  width: 300px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.query {
  width: 220px;
  margin-left: 20px;
  display: inline-block;
}
.avatar {
  height: 100px;
  border: #fff 1px solid;
}
.login-input {
  width: 300px;
}
.title {
  margin-bottom: 20px;
}
.image {
  text-align: center;
}
.image-right {
  margin-left: 20%;
}

.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>