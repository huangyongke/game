<template>
  <Card>
    <row class="content">
      <div class="search-form">
        <row class="query">
          <label class="top-label">编号</label>
          <i-input v-model="fromdata.id" @on-enter="getdata()" placeholder="请输入编号" style="width: 100px"></i-input>
        </row>
        <row class="query">
          <label class="top-label">账号</label>
          <i-input v-model="fromdata.name" @on-enter="getdata()" placeholder="请输入账号" style="width: 100px"></i-input>
        </row>
        <row class="query" style="width:160px">
          <label class="top-label">手机号</label>
          <i-input v-model="fromdata.phone" @on-enter="getdata()" placeholder="请输入手机号" style="width: 100px"></i-input>
        </row>
        <row class="query">
          <label class="top-label">QQ号</label>
          <i-input v-model="fromdata.qq" @on-enter="getdata()" placeholder="请输入QQ号" style="width: 100px"></i-input>

        </row>
        <row class="query" style="width:200px">
          <label class="top-label">是否管理员</label>
          <Select v-model="fromdata.admin" placeholder="请选择状态" style="width: 100px">
            <Option v-for="item in adminlist" :value="item.id">{{ item.name }}</Option>
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

  </Card>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'
var formatDate = require('../utils/utils').formatDate

export default {
  name: 'UserManage',
  data() {
    return {
      adminlist: [
        {
          id: '',
          name: '所有'
        },
        {
          id: 0,
          name: '普通用户'
        },
        {
          id: 1,
          name: '管理员'
        }
      ],
      fromdata: {
        id: '',
        name: '',
        phone: '',
        email: '',
        qq:'',
        admin: ''
      },
      columns: [
        {
          title: '用户编号',
          align: 'center',
          width: 90,
          key: 'id'
        },
        {
          title: '账号',
          key: 'name'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: 'QQ号',
          key: 'qq'
        },
        {
          title: '微信号',
          key: 'weixin'
        },
        {
          title: '状态',
          key: 'admin',
          render: (h, params) => {
            if (params.row.admin) {
              return h('div', {}, '管理员')
            } else {
              return h('div', {}, '普通用户')
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            if (params.row.admin) {
              return h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {},
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '确认取消管理员',
                        content:
                          '你确认取消 ' + params.row.name+' 用户的管理员权限吗？',
                        onOk: () => {
                          this.modifyadmin(params.row.id,0)
                        },
                        onCancel: () => {}
                      })
                    }
                  }
                },
                '取消管理员'
              )
            } else {
              return h(
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
                      this.$Modal.confirm({
                        title: '确认设为管理员',
                        content:
                          '你确认设置 ' + params.row.name+' 为管理员吗？',
                        onOk: () => {
                          this.modifyadmin(params.row.id,1)
                        },
                        onCancel: () => {}
                      })
                    }
                  }
                },
                '设为管理员'
              )
            }
          }
        }
      ],
      table_data: []
    }
  },
  //这两个map是vuex的部分
  computed: {},
  mounted() {
    this.getdata()
  },
  watch: {},
  methods: {
    //for vuex
    getdata() {
      this.$http({
        url: '/api/getAllUsers',
        method: 'POST',
        body: {
          user_id: this.fromdata.id,
          phone: this.fromdata.phone,
          qq:this.fromdata.qq,
          email: this.fromdata.email,
          admin: this.fromdata.admin,
          name: this.fromdata.name
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
            // for (var i = 0; i < this.table_data.length; i++) {
            //   this.table_data[i].admin = this.table_data[i].admin
            //     ? '管理员'
            //     : '普通用户'
            // }
          }
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
    },
    modifyadmin(id,state){
      this.$http({
        url: '/api/modifyadmin',
        method: 'POST',
        body: {
          id: id,
          admin: state
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
            this.$Message.success('修改权限成功')
            // for (var i = 0; i < this.table_data.length; i++) {
            //   this.table_data[i].admin = this.table_data[i].admin
            //     ? '管理员'
            //     : '普通用户'
            // }
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
  width: 10%;
  margin-left: 2%;
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