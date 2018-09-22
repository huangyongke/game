<template>
    <Card>
        <row class="content">
            <div class="search-form">
                <row class="query" style="width:170px">
                    <label class="top-label" >商品编号</label>
                    <i-input v-model="fromdata.buy_id" @on-enter="getdata()" placeholder="请输入编号" style="width: 100px"></i-input>
                </row>
                <row class="query">
                    <label class="top-label">用户</label>
                    <i-input v-model="fromdata.user_name" @on-enter="getdata()" placeholder="请输入用户" style="width: 100px"></i-input>
                </row>
                <row class="query">
                    <label class="top-label">账户</label>
                    <i-input v-model="fromdata.account" @on-enter="getdata()" placeholder="请输入游戏账户" style="width: 100px"></i-input>
                </row>
                <row class="query" style="width:220px" >
                    <label class="top-label">游戏类型</label>
                    <Select v-model="fromdata.type" placeholder="请选择游戏类型" style="width: 130px">
                        <Option v-for="item in typelist" :value="item.id">{{ item.name }}</Option>
                    </Select>
                </row>
                <row class="query" style="width:160px">
                    <label class="top-label">区域</label>
                    <Select v-model="fromdata.area" placeholder="请选择游戏区" style="width: 110px">
                        <Option v-for="item in arealist" :value="item.id">{{ item.area }}</Option>
                    </Select>
                </row>
                <row class="search" style="width:60px">
                    <i-button class="cost-module-btn" type="ghost" icon="ios-search" shape="circle" @click="getdata()">搜索</i-button>
                </row>
            </div>
        </row>
        <div style="margin-top: 20px;">
            <i-table border :height="400" :columns="columns" :data="table_data"></i-table>
            <p style="text-align:center;margin-top:5px;">共{{table_data.length}}条记录</p>
        </div>

    </Card>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'
var formatDate = require('../utils/utils').formatDate

export default {
  name: 'Buy',
  data() {
    return {
      typelist: [],
      arealist: [],
      fromdata: {
        buy_id: '',
        account:'',
        type: '',
        area: '',
        user_name:'',
      },
      columns: [
        {
          title: '商品编号',
          width:90,
          align: 'center',
          key: 'buy_id'
        },
        {
          title: '游戏类型',
          align: 'center',
          key: 'type'
        },
        {
          title: '游戏区',
          align: 'center',
          key: 'area'
        },
        {
          title: '用户',
          align: 'center',
          key: 'user_name'
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
          title: '备注',
          key: 'remark'
        },{
            title: '操作',
          key: 'action',
          width:130,
          align: 'center',
          render: (h, params) => {
            return h('div',[h(
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
                      this.$router.push({name: 'buy', params:{data: params.row}})
                    }
                  }
                },
                '购买'
              ),h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.buy_id,params.row.account)
                    }
                  }
                },
                '删除'
              )]) 
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
      
  },
  mounted() {
    this.$http({
      url: '/api/getGameCategory',
      method: 'Get'
    }).then(function(res) {
      this.typelist = []
      this.typelist.push({
        id: '',
        name:'所有'
      })
      for(var i=0; i<res.body.length;i++){ 
        this.typelist.push(res.body[i])
      }
    })
    this.getdata()
  },
  watch: {
    'fromdata.type': function() {
        this.arealist = []
      this.fromdata.area =''
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
        area:'所有'
      })
      for(var i=0; i<res.body.length;i++){ 
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
        url: '/api/getAllBuyGame',
        method: 'POST',
        body: {
          buy_id: this.fromdata.buy_id,
          account:this.fromdata.account,
          area_id: this.fromdata.area,
          category_id: this.fromdata.type,
          user_name: this.fromdata.user_name,
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
            }
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
    },
    remove(id,account){
      this.$Modal.confirm({
        title: '确认删除',
        content:
          '你确认删除账户为 ' + account+' 的卖号请求吗？',
        onOk: () => {
          this.$http({
        url: '/api/removeGame',
        method: 'POST',
        body: {
          id:id,
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
                this.getdata()
                this.$Message.success('删除成功')
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
  width: 10%;
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