<template>
  <div>
    <div style="margin:0 auto;width:90%;margin-top:50px;">
      <Steps :current="current" status="wait" style="left:170px;position: relative;">
        <Step title="已完成" content="选择支付方式"></Step>
        <Step title="已完成" content="扫描二维码"></Step>
        <Step title="已完成" content="支付完成"></Step>
      </Steps>
    </div>
    <div v-if="code == 1" style="margin:100px auto;width:90%;margin-top:50px;">
      <p>恭喜您购买 {{game.game_name}} 成功</p>
      <p>游戏账户是：{{game.account}}</p>
      <p>游戏密码是：{{gmae.password}}</p>
      <p>您也可以在历史记录-买号记录中查看</p>
    </div>
    <div v-else-if="code == 2" style="margin:100px auto;width:90%;margin-top:50px;">
      <p>恭喜您购买游戏 {{game.game_name}} 成功</p>
      <p>请您等待系统处理</p>
      <p>您可以在历史记录-买号记录中查看</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pay',
  data() {
    return {
      
    }
  },
  //这两个map是vuex的部分
  computed: {},
  mounted() {
      console.log('mounted')
      this.paysuccess()
  },
  methods: {
      paysuccess(){
          this.$http({
            url: 'http://10.22.131.202:8070/api/notify',
            method: 'POST',
            body: {
              orderid:'8_1_2018-09-21-20-29-2',
              orderuid:1
            },
            dataType: 'json'
          }).then(function(res) {

              console.log(res.body)
              
          })
      }
  }

}
</script>