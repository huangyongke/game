<template>
    <div>
        <div class="content">
            <div class="width1190" style="width:1000px;">
                <div class="proImg fl">
                    <img :src="'/image/'+info.avatar" />
                </div>

                <!--proImg/-->
                <div class="proText fr">
                    <h3 class="proTitle">{{info.name}}</h3>
                    <div class="proText1">
                        <p v-if="info.id">编号：{{info.id}}</p>
                        <p v-if="info['game_area.war_zone.game_category.name']">游戏：{{info['game_area.game_category.name']}}</p>
                        <p v-if="info['game_area.war_zone.name']">游戏战区：{{info['game_area.war_zone.name']}}</p>
                        <p v-if="info['game_area.area']">游戏大区：{{info['game_area.area']}}</p>
                        <p v-if="info['sell.price']">售价：{{info['sell.price']}}</p>
                        <p v-if="info.figure">角色：{{info.figure}}</p>
                        <p v-if="info.weapons">武器：{{info.weapons}}</p>
                        <p v-if="info.rare_figure">稀有角色：{{info.rare_figure}}</p>
                        <p v-if="info.rare_weapons">稀有武器：{{info.rare_weapons}}</p>
                        <p v-if="info.artifact">神器：{{info.artifact}}</p>
                        <p v-if="info.props">道具：{{info.props}}</p>
                        <p v-if="info['sell.remark']">备注：{{info['sell.remark']}}</p>
                    </div>
                    <div class="xun-car">
                        <a @click="buy" class="xwjg">¥
                            <strong v-if="info.state ===1 ">{{info['sell.price']}}</strong>元
                            <strong v-else-if="info.state ===2 ">禁售</strong>
                            <strong v-else-if="info.state ===3 ">已售</strong>
                        </a>
                    </div>
                    <!--xun-car/-->
                </div>
                <!--proText/-->
                <div class="clears"></div>
            </div>
            <!--width1190/-->
            <div class="proBox">
                <div class="proBox" style="width:100%;margin:10px auto;">
            <div class="proEq">
                <ul class="fl">
                    <li :class="{proEqCur:panel1[0]}"  @click="panel_click(0)">账号介绍</li>
                    <li :class="{proEqCur:panel1[1]}" @click="panel_click(1)">账号图片</li>
                </ul>
                <div class="clears"></div>
            </div>
            <!--proEq/-->
            <div class="proList" :style="{display:panel2[0]}">
              <p>{{info.introduction}}</p>
            </div>
            <!--proList/-->
            <div class="proList" :style="{display:panel2[1]}">
              <img v-for="img in info.images" :src="'/image/'+img.image" width="23%" class="image">
            </div>
            <!--proList/-->
        </div>
        <!--proBox/-->
        </div>
        <!--content/-->
    </div>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
      id: this.$route.params.id,
      panel1:[true,false],
      panel2:['block','none'],
      info: {
        
      },
    }
  },
  //这两个map是vuex的部分
  mounted: function() {
    this.$http({
      url: '/api/getSellGameById',
      method: 'GET',
      params:{
        id:this.id
      }
    }).then(
      function(res) {
        this.info = res.body[0]
        if(this.info){
        }else{
          this.$Modal.warning({
                title: '没有该商品',
                content: '<p>跳转到首页</p>',
                onOk: () => {
                  this.$router.push({ path: '/index' })
                },
                onCancel: () => {}
              })
        }
        
        // 返回总记录
        //this.$router.push({path: '/hello', query:{data: res.body}})
      },
      function() {
        this.$Message.error('获取数据失败')
      }
    )
  },
  computed: {},
  methods: {
    //for vuex
    buy(){
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
          this.$router.push({name: 'pay', query:{id: this.id}})
        }
        
      })
    },
    panel_click(id){
        for (var i = 0; i < this.panel1.length; i++) {
        this.panel1[i] = false
      }
      this.$set(this.panel1, id, true)
      for (var i = 0; i < this.panel2.length; i++) {
        this.panel2[i] = 'none'
      }
      this.$set(this.panel2, id, 'block')
    }
  }
}
</script>

<style scoped>
.image{
  margin: 10px 5px;
}

/*产品详情页面*/
.proImg {
  width: 420px;
  height: 320px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  margin: 30px 0;
}
.proImg img {
  width: 420px;
  height: 320px; /*max-width:420px;max-height:420px;width:auto !important;height:auto !important;_width:420px;_height:420px;*/
}
.proText {
  width: 535px;
  margin: 30px 0;
}
.proTitle {
  font-size: 24px;
  line-height: 40px;
  font-weight: 400;
  padding: 4px 0;
  border-bottom: #ccc 1px dotted;
}
.proText1 {
  font-size: 14px;
  line-height: 25px;
  padding: 8px 0 0 0;
}
.proText1 span {
  margin-right: 15px;
}
.xun-car {
  padding: 10px 0;
  float: bottom;
}
.xun-car a {
  display: inline-block;
  color: #fff;
  width: 205px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  margin-right: 7px;
}
.xun-car a:hover {
  opacity: 0.8;
}
.xun-car .xwjg {
  display: inline-block;
  text-align: center;
  background: url(../assets/proxujian.gif) left center no-repeat;
}
.xun-car .projrgwc {
  background: url(../assets/procar.gif) left top no-repeat;
  padding-left: 20px;
  width: 185px;
}

.proBox {
  width: 70%;
  margin: 30px auto;
  border: #f1f1f1 1px solid;
  padding: 1px;
  background: #fff;
}
.proEq {
  height: 50px;
  font-size: 20px;
  background: #f2f2f2;
}
.proEq li {
  float: left;
  width: 168px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.proEq li:hover {
  background: #ddd;
}
.proEq li.proEqCur {
  background: url(../assets/shopbg1.jpg);
  color: #fff;
}

.lxkf {
  width: 144px;
  height: 50px;
}
.lxkf a {
  float: left;
  width: 144px;
  height: 50px;
}
.lxkf a:hover {
  opacity: 0.6;
}
.proList {
    padding:19px;
  font-size: 18px;
  line-height: 30px;
  min-height: 400px;
}
.proimgList {
  margin-bottom: 19px;
}
.title4 {
  height: 35px;
  line-height: 35px;
  font-size: 18px;
  background: #f2f2f2;
}
.title4 span {
  display: inline-block;
  height: 35px;
  background: url(../assets/shopbg1.jpg);
  color: #fff;
  padding: 0 20px;
  font-weight: 400;
}
.proListText {
  padding: 15px 0;
  line-height: 25px;
}
</style>