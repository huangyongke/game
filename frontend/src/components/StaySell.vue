<template>
  <Card>
    <row class="content">
      <div class="search-form">
        <row class="query" style="width:180px">
          <label class="top-label">游戏编号</label>
          <i-input v-model="fromdata.game_id" @on-enter="getdata()" placeholder="请输入编号" style="width: 100px"></i-input>
        </row>
        <!-- <row class="query">
                    <label class="top-label">商品编号</label>
                    <i-input v-model="fromdata.sell_id" @on-enter="getdata()" placeholder="请输入编号" style="width: 100px"></i-input>
                </row> -->
        <row class="query" style="width:200px">
          <label class="top-label">游戏类型</label>
          <Select v-model="fromdata.type" placeholder="请选择游戏类型" style="width: 130px">
            <Option v-for="item in typelist" :value="item.id">{{ item.name }}</Option>
          </Select>
        </row>
        <row class="query" style="width:200px">
          <label class="top-label">游戏区域</label>
          <Select v-model="fromdata.area" placeholder="请选择游戏区" style="width: 130px">
            <Option v-for="item in arealist" :value="item.id">{{ item.area }}</Option>
          </Select>
        </row>
        <row class="query" style="width:250px">
          <label class="top-label">状态</label>
          <Select v-model="fromdata.state" placeholder="请选择状态" style="width: 100px">
            <Option v-for="item in statelist" :value="item.id">{{ item.name }}</Option>
          </Select>
          <Select v-model="fromdata.recommend" placeholder="请选择状态" style="width: 100px">
            <Option v-for="item in recommendlist" :value="item.id">{{ item.name }}</Option>
          </Select>
        </row>
        <row class="search">
          <i-button class="cost-module-btn" type="ghost" icon="ios-search" shape="circle" @click="getdata()">搜索</i-button>
        </row>
      </div>
    </row>
    <div style="margin-top: 20px;">
      <i-table border :height="400" :columns="columns" :data="table_data"></i-table>
      <p style="text-align:center;margin-top:5px;">共{{table_data.length}}条记录&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;合计{{total_price}}元</p>
    </div>
    <Modal v-model="modify1" title="修改商品信息" @on-ok="modifyok('modifyform')" @on-cancel="cancel">
      <Form ref="modifyform" :rules="modifyrule" :model="modifyform" label-position="right" :label-width="100">
        <FormItem label="商品编号">
          <Input type="text" disabled v-model="modifyform.sell_id" style="width:300px">
        </FormItem>
        <FormItem label="游戏名称">
          <Input type="text" disabled v-model="modifyform.game_name" style="width:300px">
        </FormItem>
        <FormItem label="出售价格" prop="sell_price">
          <Input type="text" number v-model="modifyform.sell_price" style="width:300px">
        </FormItem>
        <FormItem label="出售备注" prop="sell_remark">
          <Input type="textarea" v-model="modifyform.sell_remark" :autosize="{minRows: 2,maxRows: 5}" style="width:300px">
        </FormItem>
      </Form>
    </Modal>
  </Card>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'
var formatDate = require('../utils/utils').formatDate

export default {
  name: 'Stay',
  data() {
    const validatePriceCheck = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('价格不能为空'))
      } else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else {
        callback()
      }
    }
    return {
      modify1: false,
      total_price: 0,
      typelist: [],
      arealist: [],
      recommendlist: [
        {
          id: '',
          name: '所有'
        },
        {
          id: 2,
          name: '推荐'
        },
        {
          id: 1,
          name: '不推荐'
        }
      ],
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
        }
        // {
        //     id:3,
        //     name:'已售'
        // }
      ],
      fromdata: {
        sell_id: '',
        game_id: '',
        type: '',
        area: '',
        state: '',
        recommend:''
      },
      modifyform: {
        sell_id: '',
        game_name: '',
        sell_price: '',
        sell_remark: '',
        recommend: ''
      },
      modifyrule: {
        sell_price: [
          {
            required: true,
            validator: validatePriceCheck,
            trigger: 'blur'
          }
        ],
        sell_remark: [
          {
            required: false
          }
        ]
      },
      columns: [
        {
          title: '游戏编号',
          width: 90,
          align: 'center',
          key: 'game_id'
        },
        {
          title: '游戏账户',
          align: 'center',
          key: 'account'
        },
        {
          title: '游戏名称',
          key: 'game_name'
        },
        {
          title: '游戏类型',
          width: 120,
          align: 'center',
          key: 'type'
        },
        {
          title: '游戏区',
          width: 120,
          align: 'center',
          key: 'area'
        },
        {
          title: '价格(元)',
          width: 100,
          align: 'center',
          key: 'price',
          sortable: true
        },
        {
          title: '等级',
          align: 'center',
          width: 80,
          key: 'level'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '操作',
          key: 'action',
          width: 170,
          align: 'center',
          render: (h, params) => {
            var h1 = h(
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
                    this.modifyform.sell_id = params.row.sell_id
                    this.modifyform.game_name = params.row.game_name
                    this.modifyform.sell_price = params.row.price
                    this.modifyform.sell_remark = params.row.remark
                    this.modifyform.recommend = params.row.recommend
                    this.modify1 = true
                  }
                }
              },
              '修改'
            )
            var h2 = h(
              'Button',
              {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.setstate(params.row.game_id,params.row.game_name, 2)
                  }
                }
              },
              '禁售'
            )
            var h3 = h(
              'Button',
              {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.setstate(params.row.game_id,params.row.game_name, 1)
                  }
                }
              },
              '可售'
            )
            var h4 = h(
              'Button',
              {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.setrecommend(params.row.sell_id,params.row.game_name, 2)
                  }
                }
              },
              '推荐'
            )
            var h5 = h(
              'Button',
              {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.setrecommend(params.row.sell_id,params.row.game_name, 1)
                  }
                }
              },
              '停荐'
            )
            if (params.row.state == 1) {
              if (params.row.recommend == 1) {
                return h('div', [h1, h2, h4])
              } else return h('div', [h1, h2, h5])
            } else if (params.row.state == 2) {
              if (params.row.recommend == 1) {
                return h('div', [h1, h3, h4])
              } else return h('div', [h1, h3, h5])
            }
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
  computed: {},
  mounted() {
    this.typelist = []
    this.$http({
      url: '/api/getGameCategory',
      method: 'Get'
    }).then(function(res) {
      this.typelist = []
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
      this.arealist = []
      this.fromdata.area = ''
      this.$http({
        url: '/api/getAreaById',
        method: 'GET',
        params: {
          type_id: this.fromdata.type
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
    }
  },
  methods: {
    //for vuex
    getdata() {
      this.$http({
        url: '/api/getAllSellGame',
        method: 'POST',
        body: {
          sell_id: this.fromdata.sell_id,
          game_id: this.fromdata.game_id,
          area_id: this.fromdata.area,
          category_id: this.fromdata.type,
          state: this.fromdata.state,
          recommend: this.fromdata.recommend
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
            for (var i = 0; i < this.table_data.length; i++) {
              this.total_price += this.table_data[i].price
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
    setstate(game_id,game_name, state) {
      if(state == 2){
        var coutent = "你确认禁售 "+game_name+" 吗？"
      }else{
        var coutent = "你确认取消 "+game_name+" 的禁售吗？"
      }
      this.$Modal.confirm({
        title: '确认修改状态',
        content: coutent,
        onOk: () => {
          this.$http({
        url: '/api/updateGameState',
        method: 'POST',
        body: {
          id: game_id,
          state: state
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
            this.getdata()
          }
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
        },
        onCancel: () => {}
      })
      
    },
    setrecommend(sell_id,game_name, recommend) {
      if(recommend == 2){
        var coutent = "你确认推荐 "+game_name+" 吗？"
      }else{
        var coutent = "你确认取消 "+game_name+" 的推荐吗？"
      }
      this.$Modal.confirm({
        title: '确认修改状态',
        content: coutent,
        onOk: () => {
          this.$http({
        url: '/api/updateGameRecommend',
        method: 'POST',
        body: {
          id: sell_id,
          recommend: recommend
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
            this.getdata()
          }
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
        },
        onCancel: () => {}
      })
      
    },
    modifyok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http({
            url: '/api/updateSellGame',
            method: 'POST',
            body: {
              sell_id: this.modifyform.sell_id,
              price: this.modifyform.sell_price,
              remark: this.modifyform.sell_remark,
              recommend: this.modifyform.recommend
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
            } else if (res.body == 'exist') {
              this.$Message.error('修改失败，游戏已存在')
            } else {
              this.getdata()
              this.$Message.success('修改成功')
            }
          })
        } else {
          this.$Message.error('请正确输入')
        }
      })
    },
    cancel: function() {}
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
</style>