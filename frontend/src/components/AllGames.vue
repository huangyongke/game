<template>
    <Card>
        <row class="content">
            <div class="search-form">
                <row class="query" style="width:140px">
                    <label class="top-label">编号</label>
                    <i-input v-model="fromdata.game_id" @on-enter="getdata()" placeholder="请输入编号" style="width: 100px"></i-input>
                </row>
                <row class="query" style="width:140px">
                    <label class="top-label">名称</label>
                    <i-input v-model="fromdata.game_name" @on-enter="getdata()" placeholder="请输入名称" style="width: 100px"></i-input>
                </row>
                <row class="query" style="width:140px">
                    <label class="top-label">账户</label>
                    <i-input v-model="fromdata.account" @on-enter="getdata()" placeholder="请输入账户" style="width: 100px"></i-input>
                </row>
                <!-- <row class="query">
                    <label class="top-label">商品编号</label>
                    <i-input v-model="fromdata.sell_id" @on-enter="getdata()" placeholder="请输入编号" style="width: 100px"></i-input>
                </row> -->
                <row class="query" style="width:140px">
                    <label class="top-label">类型</label>
                    <Select v-model="fromdata.type" placeholder="请选择类型" style="width: 100px">
                        <Option v-for="item in typelist" :value="item.id">{{ item.name }}</Option>
                    </Select>
                </row>
                <row class="query" style="width:130px">
                    <label class="top-label">战区</label>
                    <Select v-model="fromdata.zone" placeholder="请选择区" style="width: 85px">
                        <Option v-for="item in zonelist" :value="item.id">{{ item.name }}</Option>
                    </Select>
                </row>
                <row class="query" style="width:130px">
                    <label class="top-label">大区</label>
                    <Select v-model="fromdata.area" placeholder="请选择区" style="width: 85px">
                        <Option v-for="item in arealist" :value="item.id">{{ item.area }}</Option>
                    </Select>
                </row>
                <row class="query" style="width:140px">
                    <label class="top-label">状态</label>
                    <Select v-model="fromdata.state" placeholder="请选择状态" style="width: 100px">
                        <Option v-for="item in statelist" :value="item.id">{{ item.name }}</Option>
                    </Select>
                </row>
                <row class="search">
                    <i-button class="cost-module-btn" type="ghost" icon="ios-search" shape="circle" @click="getdata()">搜索</i-button>
                </row>
            </div>
        </row>
        <div style="margin-top: 20px;">
            <i-table border :height="400" :columns="columns" :data="table_data"></i-table>
            <p style="text-align:center;margin-top:5px;">共{{table_data.length}}条记录</p>
        </div>
        <Modal v-model="modify1" title="修改商品信息" width="1000" @on-ok="modifyok('game')" @on-cancel="cancel">
            <Row>
                <i-col span='12'>
                    <div class="image">
                        <img :src="'/static/img/'+game.avatar" width="140" height="100" class="avatar">
                        <Upload name='image' ref='upload1' action="/upload" :show-upload-list="true" :on-success="handleavatarSuccess" :on-remove="handleavatarRemove" :format="['jpg','jpeg','png','gif']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload">
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
                                    <!-- <Icon type="ios-eye-outline" @click="handleView(item.name)"></Icon> -->
                                    <a @click="Remove(index)"><Icon type="ios-trash-outline"></Icon></a>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>

                        <Upload name='image' ref='upload' :default-file-list="default_file_list" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="/upload" style="display: inline-block;width:58px;">
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
                                <Option v-for="item in typemodifylist" :value="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="战区：" prop="zone">
                            <i-select class="login-input" v-model="game.zone" placeholder="请选择游戏区">
                                <i-option v-for="item in zonemodifylist" :key="item.id" :value="item.id">{{item.name}}</i-option>
                            </i-select>
                        </FormItem>
                        <FormItem label="大区：" prop="area">
                            <i-select class="login-input" v-model="game.area" placeholder="请选择游戏区">
                                <i-option v-for="item in areamodifylist" :key="item.id" :value="item.id">{{item.area}}</i-option>
                            </i-select>
                        </FormItem>
                        <FormItem label="游戏账户：" prop="account">
                            <Input class="login-input" v-model="game.account" placeholder="请输入游戏账户">
                        </FormItem>
                        <FormItem label="账户密码：" prop="password">
                            <Input class="login-input" v-model="game.password" placeholder="请输入游戏账户密码">
                        </FormItem>
                        <FormItem label="账户等级" prop="level">
                            <Input number class="login-input" v-model="game.level" placeholder="请输入账户等级">
                        </FormItem>
                        <FormItem label="介绍:" prop="introduction">
                            <Input class="login-input" type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="game.introduction" placeholder="请输入介绍">
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
                    </i-col>

                </Row>
        </Modal>
    </Card>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'
var formatDate = require('../utils/utils').formatDate

export default {
  name: 'AllGames',
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
        isMounted:false,
      modify1: false,
      typelist: [],
      arealist: [],
      zonelist: [],
      typemodifylist: [],
      zonemodifylist: [],
      areamodifylist: [],
    default_file_list:[],
      statelist: [
        {
          id: '',
          name: '所有'
        },
        {
          id: 1,
          name: '未售'
        },
        {
          id: 2,
          name: '禁售'
        },
        {
          id: 3,
          name: '已售'
        }
      ],
      fromdata: {
        game_name: '',
        game_id: '',
        type: '',
        area: '',
        zone:'',
        account: '',
        state: ''
      },
      game: {
          game_id:'',
        name: '',
        type: '',
        area: '',
        zone:'',
        account: '',
        password: '',
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
        ]
      },
      columns: [
        {
          title: '编号',
          width: 70,
          align: 'center',
          key: 'game_id'
        },
        {
          title: '游戏名称',
          key: 'game_name'
        },
        {
          title: '游戏',
          width: 100,
          align: 'center',
          key: 'type'
        },
        {
          title: '战区',
          width: 100,
          align: 'center',
          key: 'zone'
        },
        {
          title: '大区',
          width: 100,
          align: 'center',
          key: 'area'
        },
        {
          title: '账户',
          align: 'center',
          key: 'account'
        },
        {
          title: '密码',
          align: 'center',
          key: 'password'
        },
        {
          title: '等级',
          align: 'center',
          width: 80,
          key: 'level'
        },
        {
          title: '状态',
          align: 'center',
          width: 80,
          key: 'states',
          render: (h, params) => {
            if (params.row.state == 1) {
              return h('div', '未售')
            } else if (params.row.state == 2) {
              return h('div', '禁售')
            } else {
              return h('div', '已售')
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h(
              'Button',
              {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                      
                      this.game.game_id = params.row.game_id
                      this.game.name =  params.row.game_name
                      this.game.type = params.row.type_id
                      this.game.account = params.row.account
                       this.game.password = params.row.password
                      this.game.level = params.row.level
                      this.game.figure = params.row.figure
                       this.game.weapons = params.row.weapons
                        this.game.rare_figure = params.row.rare_figure
                        this.game.rare_weapons = params.row.rare_weapons
                        this.game.artifact = params.row.artifact
                        this.game.props = params.row.props
                        this.game.introduction = params.row.introduction
                        this.game.avatar = params.row.avatar
                        this.getpicture(params.row.game_id)
                        setTimeout(() => {
                        this.game.zone = params.row.zone_id
                        }, 200);
                        setTimeout(() => {
                        this.game.area = params.row.area_id
                        }, 500);
                        
                    // this.modifyform.sell_id = params.row.sell_id
                    // this.modifyform.game_name = params.row.game_name
                    // this.modifyform.sell_price = params.row.price
                    // this.modifyform.sell_remark = params.row.remark
                    // this.modifyform.recommend = params.row.recommend
                    this.modify1 = true
                  }
                }
              },
              '查看/修改'
            )
          }
        }
        // {
        //   title: '单价(元)',
        //   key: 'price'
        // }
      ],
      table_data: []
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
  mounted() {
      this.isMounted = true
    this.typelist = []
    this.typemodifylist = []
    this.$http({
      url: '/api/getGameCategory',
      method: 'Get'
    }).then(function(res) {
      this.typelist = []
      this.typemodifylist = res.body
      this.typelist.push({
        id: '',
        name: '所有'
      })
      for (var i = 0; i < res.body.length; i++) {
        this.typelist.push(res.body[i])
      }
    })
    this.getdata()
  },
  watch: {
    'fromdata.type': function() {
      this.zonelist = []
      this.fromdata.zone = ''
      this.$http({
        url: '/api/getZoneById',
        method: 'GET',
        params: {
          type_id: this.fromdata.type
        }
      }).then(
        function(res) {
          this.zonelist = []
          this.zonelist.push({
            id: '',
            name: '所有'
          })
          for (var i = 0; i < res.body.length; i++) {
            this.zonelist.push(res.body[i])
          }

          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
    },
    'fromdata.zone': function() {
      this.arealist = []
      this.fromdata.area = ''
      this.$http({
        url: '/api/getAreaById',
        method: 'GET',
        params: {
          zone_id: this.fromdata.zone
        }
      }).then(
        function(res) {
          this.arealist = []
          this.arealist.push({
            id: '',
            area: '所有'
          })
          for (var i = 0; i < res.body.length; i++) {
            this.arealist.push(res.body[i])
          }

          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
    },
    'game.type': function() {
      this.zonemodifylist = []
      this.game.zone = ''
      this.$http({
        url: '/api/getZoneById',
        method: 'GET',
        params: {
          type_id: this.game.type
        }
      }).then(
        function(res) {
          this.zonemodifylist = res.body

          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
    },
    'game.zone': function() {
      this.areamodifylist = []
      this.game.area = ''
      this.$http({
        url: '/api/getAreaById',
        method: 'GET',
        params: {
          zone_id: this.game.zone
        }
      }).then(
        function(res) {
          this.areamodifylist = res.body

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
    getpicture(id){
      this.$http({
        url: '/api/getGamePicture',
        method: 'GET',
        params: {
          id:id
        }
      }).then(function(res){
          this.default_file_list = []
          for(var i=0;i<res.body.length;i++){
              this.default_file_list.push({
                  url:res.body[i].image,
                  name:res.body[i].image
              })
          }
      })
    },
    getdata() {
      this.$http({
        url: '/api/getAllGamesAndCount',
        method: 'POST',
        body: {
          type_id: this.fromdata.type,
          game_id: this.fromdata.game_id,
          zone_id: this.fromdata.zone,
          area_id: this.fromdata.area,
          game_name: this.fromdata.game_name,
          account: this.fromdata.account,
          state: this.fromdata.state
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
          } else {
            this.table_data = res.body
          }
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
    },
    cancel: function() {},
    modifyok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.game.imageList = []
          for (var i = 0; i < this.uploadList.length; i++) {
            this.game.imageList.push(this.uploadList[i].name)
          }
          this.$http({
            url: '/api/updateGame',
            method: 'POST',
            body: {
            game_id:this.game.game_id,
              name: this.game.name,
              type_id:this.game.type,
              zone_id:this.game.zone,
              area_id:this.game.area,
              account: this.game.account,
              password: this.game.password,
              level:this.game.level,
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
              this.game.imageList = []
              this.$refs.upload.clearFiles()
      this.$refs.upload1.clearFiles()
            this.$Message.success("修改成功")
          }
          })
          // this.$Message.success('Success!')
        } else {
          this.$Message.error('请正确输入')
        }
      })
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
      const check = this.uploadList.length < 10
      if (!check) {
        this.$Notice.warning({
          title: '最多只能上传 10 张图片。'
        })
      }
      return check
    }
  }
}
</script>

<style scoped>
.content {
  display: inline-block;
  margin-top: 15px;
  width: 100%;
}
.search-form {
  display: inline-block;
  width: 100%;
}
.query {
  width: 15%;
  margin-left: 5px;
  display: inline-block;
}

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
}

.addromve {
  width: 35%;
  margin: 0.5% 1%;
  display: inline-block;
}

.oper {
  color: #1c2438;
  margin-left: 5%;
  background-color: #e6e6e6;
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