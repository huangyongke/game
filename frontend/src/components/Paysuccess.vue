<template>
  <div>
    <div style="margin:0 auto;width:90%;margin-top:50px;">
      <Steps :current="current" status="wait" style="left:170px;position: relative;">
        <Step title="已完成" content="选择支付方式"></Step>
        <Step title="已完成" content="扫描二维码"></Step>
        <Step title="已完成" content="支付完成"></Step>
      </Steps>
    </div>
    <!-- <div v-if="code == 1" style="margin:100px auto;width:90%;margin-top:50px;">
      <Card style="width:40%;font-size:20px;margin:0 auto;">
      <p>恭喜您购买 {{game.game_name}} 成功</p>
      <p>游戏账户是：{{game.account}}</p>
      <p>游戏密码是：{{gmae.password}}</p>
      <p>您也可以在历史记录-买号记录中查看</p>
       </Card>
    </div> -->
    <div style="width:90%;margin-top:50px;margin:100px auto;">
      <Card v-if="code == 1" style="width:40%;font-size:20px;margin:0 auto;">
      <p>恭喜您购买 {{game.game_name}} 成功</p>
      <p>游戏账户是：{{game.account}}</p>
      <p>游戏密码是：{{gmae.password}}</p>
      <p>您也可以在历史记录-买号记录中查看</p>
       </Card>
      <Card v-else-if="code == 2" style="width:40%;font-size:20px;margin:0 auto;">
      <p>恭喜您购买游戏 {{game.name}} 成功</p>
      <p>请您等待系统处理</p>
      <p>您可以在 历史记录-买号记录 中查看</p>
      </Card>
    </div>
  </div>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Pay',
  data() {
    return {
      code:'',
      sell_id:'',
      game_id:'',
      current: 2,
      orderid:'',
      game:{},
    }
  },
  //这两个map是vuex的部分
  computed: {},
  mounted() {
    this.orderid = this.$route.query.orderid
    console.log(this.orderid)
    if(this.orderid){
      var orderFormat =(this.orderid).split("_");
      this.sell_id = orderFormat[0]
      this.game_id = orderFormat[1]
      console.log(this.sell_id)
      this.paySuccess()
    }else{
      this.$Modal.warning({
        title: '购买失败',
        content: '<p>对不起该产品已卖出，请您查看其它产品</p>' ,
        onOk: () => {
          this.$router.push({ path: '/index' })
        },
        onCancel: () => {}
      })
    }
  },
  methods: {
    paySuccess(){
      this.$http({
            url: '/api/paySuccess',
            method: 'POST',
            body: {
              sell_id: this.sell_id,
              game_id:this.game_id
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
            }else if(res.body[0].code === 2){
              this.game = res.body[0]
              this.code = 2
            }else{

              console.log(res.body)
              this.game = res.body[0]
              // this.$Modal.success({
              //   title: '购买成功',
              //   content: '<p>恭喜您成功购买 ' + res.body[0].game_name +' </p><p>游戏账户是：'+res.body[0].account+'</p><p>游戏密码是：'+res.body[0].password+'</p>'+'<p>你也可以在历史记录中查看</p>' ,
              //   onOk: () => {
              //     this.$router.push({ path: '/index' })
              //   },
              //   onCancel: () => {}
              // })
            }
          })
    },

  }
}
</script>

<style scoped>
.ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner {
  border-color: #2d8cf0 !important;
  background-color: #2d8cf0 !important;
}
.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner {
  background-color: #fff;
  border-color: #39f !important;
}
.click-box{
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
    border-color: #eee;
}

</style>