<template>
    <Card>
        <row class="content">
            <div class="search-form">
                <row class="query" style="width:118px">
                    <label class="top-label">订单</label>
                    <i-input v-model="fromdata.sell_id" @on-enter="getdata()" placeholder="请输入编号" style="width: 80px"></i-input>
                </row>
                <row class="query" style="width:118px">
                    <label class="top-label">用户</label>
                    <i-input v-model="fromdata.user_name" @on-enter="getdata()" placeholder="请输入编号" style="width: 80px"></i-input>
                </row>
                <row class="query" style="width:135px" >
                    <label class="top-label">游戏</label>
                    <Select v-model="fromdata.type" placeholder="请选择游戏" style="width: 95px">
                        <Option v-for="item in typelist" :value="item.id">{{ item.name }}</Option>
                    </Select>
                </row>
                <row class="query" style="width:135px">
                    <label class="top-label">战区</label>
                    <Select v-model="fromdata.zone" placeholder="请选择战区" style="width: 95px">
                        <Option v-for="item in zonelist" :value="item.id">{{ item.name }}</Option>
                    </Select>
                </row>
                <row class="query" style="width:135px">
                    <label class="top-label">大区</label>
                    <Select v-model="fromdata.area" placeholder="请选择大区" style="width: 95px">
                        <Option v-for="item in arealist" :value="item.id">{{ item.area }}</Option>
                    </Select>
                </row>
                <row class="query" style="width:225px">
                    <label class="top-label">时间</label>
                    <Date-picker type="daterange" v-model="fromdata.time" :options="options" placeholder="选择日期范围" style="width: 175px"></Date-picker>

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

    </Card>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'
var formatDate = require('../utils/utils').formatDate

export default {
  name: 'SellRecord',
  data() {
    return {
      id: '',
      total_price:0,
      typelist: [],
      zonelist: [],
      arealist: [],
      fromdata: {
        sell_id: '',
        user_name:'',
        type: '',
        zone: '',
        area: '',
        time: []
      },
      user: {},
      options: {
        shortcuts: [
          {
            text: '最近一周',
            value() {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            }
          },
          {
            text: '最近一月',
            value() {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            }
          },
          {
            text: '最近三月',
            value() {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              return [start, end]
            }
          },
          {
            text: '最近一年',
            value() {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
              return [start, end]
            }
          }
        ]
      },
      columns: [
        {
          title: '订单',
          width:70,
          align: 'center',
          key: 'sell_id',
          sortable: true
        },
        {
          title: '用户',
          width:70,
          align: 'center',
          key: 'user_name'
        },
        {
          title: '游戏',
          width:70,
          align: 'center',
          key: 'game_id',
          sortable: true
        },
        {
          title: '游戏名称',
          key: 'game_name'
        },
        {
          title: '游戏账户',
          key: 'account'
        },
        {
          title: '游戏密码',
          key: 'password'
        },
        {
          title: '游戏类型',
          align: 'center',
          key: 'type'
        },
        {
          title: '战区',
          align: 'center',
          key: 'zone'
        },
        {
          title: '大区',
          align: 'center',
          key: 'area'
        },
        {
          title: '价格(元)',
          width:70,
          align: 'center',
          key: 'price',
          sortable: true
        },
        {
          title: '时间',
          align: 'center',
          width:150,
          key: 'time'
        },
        {
          title: '备注',
          key: 'remark'
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
      start_time(){
          return this.fromdata.time[0] ? formatDate(new Date(this.fromdata.time[0]),"yyyy-MM-dd hh:mm:ss") : ''
      },
      end_time(){
          return this.fromdata.time[1] ? formatDate(new Date(this.fromdata.time[1]),"yyyy-MM-dd hh:mm:ss") : ''
      }
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
      this.zonelist = []
      this.fromdata.zone =''
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
        name:'所有'
      })
      for(var i=0; i<res.body.length;i++){ 
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
      this.fromdata.area =''
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
        url: '/api/getAllSellRecords',
        method: 'POST',
        body: {
          user_name: this.fromdata.user_name,
          sell_id: this.fromdata.sell_id,
          zone_id: this.fromdata.zone,
          area_id: this.fromdata.area,
          category_id: this.fromdata.type,
          start_time: this.start_time,
          end_time: this.end_time,
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
          this.table_data = res.body
          this.total_price = 0
          for(var i =0 ;i<this.table_data.length;i++){
              this.table_data[i].time = formatDate(new Date(this.table_data[i].time),"yyyy-MM-dd hh:mm:ss")
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