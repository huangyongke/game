<template>
  <div style="width:100%">
    <!-- <div style="width:50%;float:left"> -->
    <Carousel autoplay>
      
      <Carousel-item>
        <img src="../assets/cf6.jpg" class="banner" />
      </Carousel-item>
      <Carousel-item>
        <img src="../assets/cf7.jpg" class="banner" /> </Carousel-item>
        <Carousel-item>
        <img src="../assets/cf4.jpg" class="banner" /> </Carousel-item>
      <Carousel-item>
        <img src="../assets/cf2.jpg" class="banner" /> </Carousel-item>
    </Carousel>
    <!-- </div>
    <div style="width:50%;float:right">
    <Carousel autoplay>
      <Carousel-item>
        <img src="../assets/cf4.jpg" class="banner" /> </Carousel-item>
      <Carousel-item>
        <img src="../assets/cf2.jpg" class="banner" /> </Carousel-item>
    </Carousel>
    </div> -->
    <div class="clears"></div>
    <div class="content">
      <div class="width1190">
        <h2 class="title">今日特价
          <router-link to="/buy">更多&gt;&gt;</router-link>
        </h2>
        <div class="index-fang-list">
          <dl v-for="game in recommend">
            <dt>
              <router-link :to="'/profile/'+game['sell.id']"><img :src="'/image/'+game.avatar" width="286" height="188" /></router-link>
            </dt>
            <dd>
              <h3>
                <router-link :to="'/profile/'+game['sell.id']">{{game.name}}</router-link>
                <div class="price" style="float:right;">¥
                  <strong>{{game['sell.price']}}</strong>
                </div>
              </h3>
              <div class="hui">
                {{game['game_area.war_zone.game_category.name']}} |
                {{game['game_area.war_zone.name']}} |
                {{game['game_area.area']}} |
                <template v-if="game.level">
                  {{game.level}}级 
                </template>
              </div>
            </dd>
          </dl>
          <div class="clears"></div>
        </div>
        <!--index-fang-list/-->

        <!-- <h2 class="title">新号
          <router-link to="/buy">更多&gt;&gt;</router-link>
        </h2>
        <div class="index-fang-list">
          <dl v-for="game in news">
            <dt>
              <router-link :to="'/profile/'+game['sell.id']"><img :src="'/image/'+game.avatar" width="286" height="188" /></router-link>
            </dt>
            <dd>
              <h3>
                <router-link :to="'/profile/'+game['sell.id']">{{game.name}}</router-link>
                <div class="price" style="float:right;">¥
                  <strong>{{game['sell.price']}}</strong>
                </div>
              </h3>
              <div class="hui">
                {{game['game_area.war_zone.game_category.name']}} |
                {{game['game_area.war_zone.name']}} |
                {{game['game_area.area']}} |
                <template v-if="game.level">
                  {{game.level}}级 
                </template>
              </div>
            </dd>
          </dl>
          <div class="clears"></div>
        </div> -->
        <!--index-fang-list/-->
      </div>
      <!--width1190/-->
    </div>
    <!--content/-->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      recommend: [],
      news:[]
    }
  },
  //这两个map是vuex的部分
  created(){
  },
  computed: {},
  mounted() {
    this.$http({
      url: '/api/getRecommendGames',
      method: 'GET'
    }).then(
      function(res) {
        this.recommend = res.body.rows
        // 返回总记录
        //this.$router.push({path: '/hello', query:{data: res.body}})
      },
      function() {
        this.$Message.error('获取数据失败')
      }
    )
    // this.$http({
    //   url: '/api/getNewGames',
    //   method: 'GET'
    // }).then(
    //   function(res) {
    //     this.news = res.body.rows
    //     // 返回总记录
    //     //this.$router.push({path: '/hello', query:{data: res.body}})
    //   },
    //   function() {
    //     this.$Message.error('获取数据失败')
    //   }
    // )
  },
  methods: {
    //for vuex

    changePage() {
      this.$router.push({ path: '/profile', params: { id: '1' } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video,
select {
  margin: 0;
  padding: 0;
  border: 0;
}
table {
  border-collapse: collapse;
}
body {
  font-size: 12px;
  color: #333;
  font-family: 'Microsoft Yahei';
  overflow-x: hidden;
}
img,
a {
  border: 0;
  text-decoration: none;
}
ol,
ul {
  list-style: none;
}
.clears {
  clear: both;
}
a {
  color: #333;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
a:hover {
  color: #f00;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}

.width1190 {
  width: 1190px;
  margin: 0 auto;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.red {
  color: #f00;
}
.height1 {
  height: 7px;
}
.height2 {
  height: 30px;
}
.height3 {
  height: 20px;
}
.font14 {
  font-size: 14px;
}
.font12 {
  font-size: 12px;
}
.alignLeft {
  text-align: left;
}
.alignCenter {
  text-align: center;
}
.alignRight {
  text-align: right;
}
.green {
  color: #7abd54;
}
.orange {
  color: #f60;
}
.hui {
  color: #999;
}

/*content*/
.content {
  padding: 10px 0;
}
.title {
  margin: 20px 0 0 0;
  height: 23px;
  line-height: 23px;
  border-bottom: #ddd 1px solid;
  border-left: #f1323b 4px solid;
  padding-left: 5px;
  font-size: 18px;
  font-weight: 400;
  position: relative;
}
.title a {
  position: absolute;
  font-size: 12px;
  right: 0;
  top: 0;
}

/*index-fang-list*/
.index-fang-list {
  padding: 15px 0;
}
.index-fang-list dl {
  float: left;
  width: 25%;
  height: 243px;
  padding: 0 10px;
}

.index-fang-list dt img {
  height: 188px;
  border: #fff 1px solid;
}
.index-fang-list dt a:hover img {
  border: #f00 1px solid;
}

.index-fang-list dd {
  padding: 0 0;
}
.index-fang-list dd h3 {
  font-size: 16px;
  height: 30px;
  line-height: 30px;
}
.index-fang-list dd .hui {
  height: 25px;
  line-height: 25px;
  font-size: 14px;
}

/*banner*/
.banner {
  height: 350px;
  width: 100%;
}

/*index-ershou*/
.index-ershou {
  padding: 15px 0;
}
.in-er-left {
  float: left;
  width: 35%;
  height: 285px;
  position: relative;
}
.in-er-left-text {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 370px;
  padding: 0 5px;
  height: 25px;
  line-height: 25px;
  color: #fff;
  background: url(../assets/black60.png);
}

.in-er-left-text strong {
  font-size: 12px;
  font-weight: 400;
  width: 48%;
}
.in-er-right {
  float: right;
  width: 65%;
}
.in-er-right dl {
  float: left;
  height: 150px;
  padding: 13px 0;
  padding-left: 17px;
  border-right: #ccc 1px dashed;
  border-bottom: #ccc 1px dashed;
}
.in-er-right dl:nth-child(2),
.in-er-right dl:nth-child(4) {
  border-right: 0;
}
.in-er-right dt {
  float: left;
  width: 150px;
  height: 115px;
}
.in-er-right dd {
  float: left;
  margin-left: 8px;
  width: 210px;
}
.in-er-right dd h3 {
  font-size: 14px;
  height: 20px;
  line-height: 15px;
}
.in-er-right dd .in-er-right-text {
  line-height: 18px;
  font-size: 12px;
}
.price {
  font-size: 24px;
  color: #f03435;
  text-align: right;
  height: 25px;
  line-height: 25px;
  font-family: Constantia, 'Lucida Bright', 'DejaVu Serif', Georgia, serif;
  font-weight: bold;
}
</style>
