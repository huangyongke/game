<template>
  <div>
    <div class='content' :class="{'main-hide-text': spanLeft < 4}">
      <Row type='flex'>
        <i-col :span="spanLeft" class='main-menu-left'>
            <Menu theme="dark" :open-names="opens" width='auto' accordion :active-name='path' @on-select='select'>
              <Submenu name="1" key='1'>
                <template slot="title">
                  <Icon type="ios-people" :size='iconSize'/> 
                  <span class='main-text'>账户管理</span>
                </template>
                <Menu-item name="user"> 我的资料 </Menu-item>
                <Menu-item name="modifyPassword"> 修改密码 </Menu-item>
              </Submenu>
              <Submenu name="2" key='2'>
                <template slot='title'>
                  <Icon type='ios-cart' :size='iconSize'></Icon>
                  <span class='main-text'>历史记录</span>
                </template>
                <Menu-item name="personalBuy">买号记录</Menu-item>
                <Menu-item name="personalSell">卖号记录</Menu-item>
              </Submenu>
              <Submenu name="3" key='3' v-if="admin == 1">
                <template slot="title">
                  <Icon type="ios-paper" :size='iconSize'/> 
                  <span class='main-text'>后台管理</span>
                </template>
                <Menu-item name="userManage">用户管理</Menu-item>
                <Menu-item name="species">游戏管理</Menu-item>
                <Menu-item name="buy_manage">购买游戏</Menu-item>
                <Menu-item name="allGames">所有游戏</Menu-item>
                <Menu-item name="staySell">待卖游戏</Menu-item>
                <Menu-item name="stayBuy">待买游戏</Menu-item>
                <Menu-item name="sellRecord">销售记录</Menu-item>
                <Menu-item name="buyRecord">购买记录</Menu-item>
              </Submenu>
            </Menu>
         
        </i-col>
        <i-col :span='spanRight' class="right">
           <div class='main-header' v-if="admin == 1">
            <i-button type='text' @click='toggleClick' id='toggle-click'>
              <Icon type='navicon' size='32'></Icon>
            </i-button>
          </div> 
          <div class='right-content'>
            <router-view></router-view>
          </div>
        </i-col>
        <!-- <i-col span='19'>
          <div class="right-content">
            <router-view></router-view>
          </div>

        </i-col> -->
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
      spanLeft: 4,
      spanRight: 20,
      path: '',
      admin: 1,
      opens: [],
    }
  },
  //这两个map是vuex的部分
  computed: {
    iconSize () {
      return this.spanLeft === 4 ? 14 : 24
    }
  },
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
    toggleClick () {
      if (this.spanLeft === 4) {
        this.spanLeft = 2
        this.spanRight = 22
      } else {
        this.spanLeft = 4
        this.spanRight = 20
      }
    },
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
.right{
  padding-left: 20px;
}
.main-header {
  
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.main-hide-text .main-text {
  display: none;
}
</style>