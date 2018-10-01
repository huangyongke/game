<template>
    <div>
        <div class="ban">
              <i-button type="success" @click="buttonclick" class="btn" long>申请卖号，免费估价</i-button>
              <Card class="card">
                <h2 style="margin:0 auto;width:100px;">注意事项</h2>
                <p>您需要联系客服qq，上传身份证正反面和本人手持身份证的视频</p>
              </Card>
            <!--width1190/-->
        </div>
        <!--content/-->
    </div>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Buy',
  data() {
    return {
      
    }
  },
  //这两个map是vuex的部分
  computed: {},
  mounted() {
    
  },
  methods: {
    //for vuex
    getSession() {
      this.$http({
        url: '/api/getSession',
        method: 'Get'
      }).then(function(res) {
        if (res.body === 'login') {
          this.$Modal.confirm({
            title: '您还没有登录',
            content: '<p>是否跳转到登录界面登录</p>',
            onOk: () => {
              this.$router.push({ path: '/login' })
            },
            onCancel: () => {}
          })
        } else {
          this.$router.push({ path: '/registration' })
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
    buttonclick(){
      
      this.getSession()
    }
  }
}
</script>

<style scoped>
.ban{
  width: 100%;
  height: 500px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../assets/ban.jpg);
}
.btn{
  width: 350px;
  margin-left: 20%;
  margin-top: 200px;
  font-size: 18px;
  line-height: 30px;
}
.card{
  width: 350px;
  left: 20%;
  height: 100px;
  margin-top: 50px;
}
</style>