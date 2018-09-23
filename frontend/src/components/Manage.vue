<template>
  <div>
    <div class="content">
      <Row>
        <i-col span="5">
          
            <Menu theme="dark" :open-names="opens" accordion :active-name='path' @on-select='select'>
              <Submenu name="1" key='1'>
                <template slot="title">
                  <Icon type="ios-people" /> 账户管理
                </template>
                <MenuItem name="user"> 我的资料 </MenuItem>
                <MenuItem name="modifyPassword"> 修改密码 </MenuItem>
              </Submenu>
              <Submenu name="2" key='2'>
                <template slot='title'>
                  <Icon type='ios-cart'></Icon>历史记录
                </template>
                <MenuItem name="personalBuy">买号记录</MenuItem>
                <MenuItem name="personalSell">卖号记录</MenuItem>
              </Submenu>
              <Submenu name="3" key='3' v-if="admin == 1">
                <template slot="title">
                  <Icon type="ios-paper" /> 后台管理
                </template>
                <MenuItem name="userManage">用户管理</MenuItem>
                <MenuItem name="species">游戏管理</MenuItem>
                <MenuItem name="buy_manage">购买游戏</MenuItem>
                <MenuItem name="allGames">所有游戏</MenuItem>
                <MenuItem name="staySell">待卖游戏</MenuItem>
                <MenuItem name="stayBuy">待买游戏</MenuItem>
                <MenuItem name="sellRecord">销售记录</MenuItem>
                <MenuItem name="buyRecord">购买记录</MenuItem>
              </Submenu>
            </Menu>
         
        </i-col>
        <i-col span='19'>
          <div class="right-content">
            <router-view></router-view>
          </div>

        </i-col>
      </Row>
      <div class="clearfix"></div>
    </div>
    <!--width1190/-->
  </div>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Manage',
  data() {
    return {
      path: '',
      admin: 1,
      opens: [],
    }
  },
  //这两个map是vuex的部分
  computed: {},
  created() {
    if (
      this.$route.name === 'personalBuy' ||
      this.$route.name === 'personalSell'
    ) {
      this.opens = ['2']
    } else if (
      this.$route.name === 'user' ||
      this.$route.name === 'modifyPassword'
    ) {
      this.opens = ['1']
    } else {
      this.opens = ['3']
    }
  },
  mounted() {
    this.path = this.$route.name
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
          this.admin = res.body.admin
          
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
      this.$router.push('/manage/' + name)
    }
  }
}
</script>

<style scoped>
.login-input {
  width: 300px;
}

.right-content {
  min-height: 73.73vh;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}

.content {
  margin: 0 20px;
}
</style>