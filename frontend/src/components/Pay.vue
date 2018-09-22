<template>
  <div>
    <div style="margin:0 auto;width:90%;margin-top:50px;">
      <Steps :current="current" status="wait" style="left:170px;position: relative;">
        <Step title="进行中" content="选择支付方式"></Step>
        <Step title="待进行" content="扫描二维码"></Step>
        <Step title="待进行" content="支付完成"></Step>
      </Steps>
    </div>
    <div style="margin:100px auto;width:90%;">
      <Row style="width: 500px;margin:0 auto;">
        <a @click="cardclick(1)">
      <Card style="float:left;width:200px;height: 160px;" v-bind:class="{'click-box':click == 1}">
      <img src="../assets/zhifubao.jpg" width="200px" height="60px" alt="">
    </Card></a>
    <a @click="cardclick(2)" >
    <Card style="float:right;width:200px;height: 160px;" :class="{'click-box':click == 2}">
      <img src="../assets/weixin.jpg" width="200px" height="60px" alt="">
    </Card></a>
    </Row>
    <form action="https://pay.bbbapi.com/" method="POST" id="postform" ref="postform">
        <input type="hidden" name="uid" v-model="order.uid">
        <input type="hidden" name="price" v-model="order.price">
        <input type="hidden" name="istype" v-model="order.istype">
        <input type="hidden" name="notify_url" v-model="order.notify_url">
        <input type="hidden" name="return_url" v-model="order.return_url">
        <input type="hidden" name="orderid" v-model="order.orderid">
        <input type="hidden" name="orderuid" v-model="order.orderuid">
        <input type="hidden" name="key" v-model="order.key">
        <input type="hidden" name="goodsname" v-model="order.goodsname">
    </form>
    </div>
    <div  class="next-step">
    <Button type="success" style="width:200px" @click="next_click">确认支付</Button>
    </div>
  </div>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'
import { setTimeout } from 'timers';

export default {
  name: 'Pay',
  data() {
    return {
      sell_id:'',
      info:{},
      current: 0,
      click:'',
      order:{},
      stepList: ['已完成', '进行中', '待进行']
    }
  },
  //这两个map是vuex的部分
  computed: {},
  mounted() {
    this.sell_id = this.$route.query.id
  },
  methods: {
    buy(){
      this.$http({
            url: '/api/sellGame',
            method: 'POST',
            body: {
              sell_id: this.sell_id,
              istype:this.click
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
            }else if(res.body === 'undefined'){
              this.$Modal.warning({
                title: '没有该商品',
                content: '<p>跳转到首页</p>',
                onOk: () => {
                  this.$router.push({ path: '/index' })
                },
                onCancel: () => {}
              })
            }else if(res.body === 'banned'){
              this.$Notice.error({title:"该商品禁止出售"})
            }else if(res.body === 'selled'){
              this.$Notice.error({title:"该商品已出售"})
            }else{
              
              this.order = res.body
              console.log(this.order)
              var orderFormat =(res.body.orderid).split("_");
              setTimeout(() => {
                this.$refs.postform.submit()
              }, 1000);
              
              //this.payqrcode(res.body)
              console.log(orderFormat)
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
    payqrcode(data){
      this.$http({
            url: 'https://pay.bbbapi.com/',
            method: 'POST',
            body: {
              uid: data.uid,
              price: data.price,
              istype: data.istype,
              notify_url: data.notify_url,
              return_url: data.return_url,
              orderid: data.orderid,
              orderuid: data.orderuid,
              key: data.key,
              goodsname: data.goodsname
            },
          }).then(function(res) {
            //window.location.href = 'https://pay.bbbapi.com/'
            console.log(res.body)
          })
    },
    //for vuex
    cardclick(id){
      this.click = id
    },
    next_click(){
      if(this.click){
        this.buy()
      }else{
        this.$Modal.warning({
            title: "警告",
            content: "请选择支付方式"
        });
      }
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

.next-step{
  width: 100%;
  margin-bottom: 50px;
  text-align: center;
}
.up-step-button{
  margin-left: 20%;
    position: relative;
}
.next-step-button{
    margin-left: 75%;
    position: relative;
}

.nono{
  display: none;
}
</style>