<template>
  <div id='app'>
    <!-- Header -->
    <div class="header">
      <div class="width1190">
        <div class="fl">您好，欢迎来到账号回收出售！</div>
        <div class="fr">
          <template v-if="name">
            <router-link to="/manage/user">{{name}}</router-link> |
            <a @click="signout">注销</a> |
            <router-link v-if="admin == 1" to="/manage/userManage">后台管理</router-link> |
            <router-link v-else to="/manage/personalBuy">历史记录</router-link> |
          </template>
          <template v-else>
            <router-link to="/login">登录</router-link> |
            <router-link to="/reg">注册</router-link> |
          </template>
          <a href="javascript:;" @click="AddFavorite(window.location,document.title)">加入收藏</a> |
          <a href="javascript:;" @click="SetHome(this,window.location)">设为首页</a>
        </div>
        <div class="clears"></div>
      </div>
      <!--width1190/-->
    </div>
    <!--header/-->
    <div class="logo-phone">
      <div class="width1190">
        <h1 class="logo">
          <router-link to="/index"><img src="./assets/logo.png" width="200px" height="60px" /></router-link>
        </h1>
        <div class="phones">
          <strong>1915803210</strong>
        </div>
        <div class="clears"></div>
      </div>
      <!--width1190/-->
    </div>
    <!--logo-phone/-->
    <div class="list-nav">
      <div class="width1190">
        <ul class="nav">
          <li>
            <router-link to="/index">首页</router-link>
          </li>
          <li>
            <router-link to="/buy">买号</router-link>
          </li>
          <li>
            <router-link to="/sell">卖号</router-link>
          </li>
          <li>
            <router-link to="/about">关于我们</router-link>
          </li>
          <div class="clears"></div>
        </ul>
        <!--nav/-->
        <div class="clears"></div>
      </div>
      <!--width1190/-->
    </div>
    <!--list-nav/-->
    <router-view></router-view>
    <div class="xinren">
      <div class="width1190">
        <dl>
          <img src="./assets/icon1.jpg" style="float: left;">
          <dt>承诺</dt>
          <dd>真实可信100%真号<br />链家承诺，假一赔百</dd>
        </dl>
        <dl>
          <img src="./assets/icon2.jpg" style="float: left;">
          <dt>权威</dt>
          <dd>独家房源 覆盖全城<br />房源信息最权威覆盖最广</dd>
        </dl>
        <dl>
          <img src="./assets/icon3.jpg" style="float: left;">
          <dt>信赖</dt>
          <dd>万名置业顾问 专业服务<br />百万家庭的信赖之选</dd>
        </dl>
        <dl>
          <img src="./assets/icon4.jpg" style="float: left;">
          <dt>安全</dt>
          <dd>安心承诺 保驾护航<br />多重风险防范机制 无后顾之忧</dd>
        </dl>
        <div class="clears"></div>
      </div>
      <!--width1190/-->
    </div>
    <!--xinren/-->
    <div class="copy">Copyright@ 2018 账号回收出售 版权所有 沪ICP备1234567号-0&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
    <div class="bg100"></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      name: '',
      admin:''
    }
  },
  mounted() {
    this.getSession()
  },
  computed:{
    
  },
   watch:{
     "$route": function (to, from) {
       this.getSession()
     }
  },
  methods: {
    getSession(){
      this.$http({
        url: '/api/getSession',
        method: 'Get',
      }).then(
        function(res) {
          if (res.body === 'login') {
            this.name = ''
            this.admin =''
          } else {
            this.name = res.body.name,
            this.admin = res.body.admin
            // for (var i = 0; i < this.table_data.length; i++) {
            //   this.table_data[i].admin = this.table_data[i].admin
            //     ? '管理员'
            //     : '普通用户'
            // }
          }
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
      )
    },
    AddFavorite(sURL, sTitle) {
      try {
        window.external.addFavorite(sURL, sTitle)
      } catch (e) {
        try {
          window.sidebar.addPanel(sTitle, sURL, '')
        } catch (e) {
          alert('加入收藏失败，请使用Ctrl+D进行添加')
        }
      }
    },
    //设为首页 <a onclick="SetHome(this,window.location)">设为首页</a>
    SetHome(obj, vrl) {
      try {
        obj.style.behavior = 'url(#default#homepage)'
        obj.setHomePage(vrl)
      } catch (e) {
        if (window.netscape) {
          try {
            netscape.security.PrivilegeManager.enablePrivilege(
              'UniversalXPConnect'
            )
          } catch (e) {
            alert(
              "此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。"
            )
          }
          var prefs = Components.classes[
            '@mozilla.org/preferences-service;1'
          ].getService(Components.interfaces.nsIPrefBranch)
          prefs.setCharPref('browser.startup.homepage', vrl)
        }
      }
    },
    signout(){
      this.$http({
        url: '/api/deleteSession',
        method: 'Get',
      }).then(
        function(res) {
          this.getSession()
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
      )
    }
  },

  /**
   * @description 选择路由，渲染不同组件
   */

  created() {}
}
</script>

<style>
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
img {
  max-width: 100%;
  height: auto;
}
.width1190 {
  width: 90%;
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

/*header*/
.header {
  width: 100%;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  background: #f1f1f1;
}
.header .fl {
  width: 48%;
}
.header .fr {
  width: 48%;
  text-align: right;
}
.header .fr a {
  display: inline-block;
  padding: 0 5px;
}

/*logo-phone*/
.logo-phone {
  padding: 10px 0;
}
.logo {
  float: left;
  width: 200px;
  height: 60px;
}
.phones {
  float: right;
  width: 140px;
  padding-left: 40px;
  height: 35px;
  margin: 13px 0 0 0;
  background: url(./assets/qqLogo.png) left center no-repeat;
}
.phones strong {
  display: block;
  height: 33px;
  line-height: 33px;
  font-size: 18px;
  border-top: #4e4e4e 1px solid;
  border-bottom: #4e4e4e 1px solid;
  white-space: nowrap;
}

/*list-nav*/
.list-nav {
  width: 100%;
  height: 50px;
  background: #2d2d2d;
}
/* .list {
  float: left;
  width: 304px;
  height: 50px;
  position: relative;
}
.list h3 {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-weight: 400;
  background: #acce22;
  color: #fff;
  font-size: 18px;
}
.list-list {
  position: absolute;
  left: 0;
  top: 50px;
  width: 304px;
  height: 320px;
  background: #fff;
  z-index: 9;
}
.list dl {
  padding: 8px 10px;
  border-bottom: #ddd 1px solid;
}
.list dt {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
}
.list dd {
}
.list dd a {
  font-size: 12px;
  display: inline-block;
  margin: 7px 20px 0 0;
} */

/*nav*/
.nav {
  float: left;
  width: 886px;
  height: 50px;
}
.nav li {
  float: left;
  width: 200px;
  height: 50px;
}
.nav li a {
  float: left;
  width: 200px;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 16px;
  text-align: center;
}
.nav li a:hover {
  background: #222;
}
.nav li.navCur a {
  background: #000;
}

/*xinren*/
.xinren {
  padding: 30px 0;
}
.xinren dl {
  float: left;
  width: 25%;
  height: 60px;
}
.xinren dt {
  float: left;
  width: 65px;
  color: #606062;
  height: 60px;
  line-height: 60px;
  font-size: 30px;
}
.xinren dd {
  float: left;
  width: 160px;
  color: #717171;
  font-size: 12px;
  padding: 13px 0 0 0;
  line-height: 18px;
}

/*footer*/
.footer .width1190 {
  border-top: #ccc 1px solid;
  font-size: 14px;
}
.footer .fl {
  width: 448px;
  height: 100px;
  line-height: 100px;
  border-right: #ccc 1px solid;
}
.footer .fl a {
  display: inline-block;
  margin-right: 30px;
}
.footer .fr {
  width: 690px;
  padding: 12px 0 0 0;
}
.footer .fr dl {
  float: left;
  width: 270px;
}
.footer .fr dt {
  float: left;
  width: 76px;
  height: 76px;
  border: #ccc 1px solid;
}
.footer .fr dd {
  float: right;
  width: 180px;
  color: #666;
  padding: 15px 0 0 0;
  line-height: 20px;
}

/*指定购房*/
.bg100 {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background: url(./assets/black60.png);
  display: none;
}
.zhidinggoufang {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -215px 0 0 -230px;
  width: 460px;
  height: 430px;
  background: #fff;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  z-index: 10;
  box-shadow: 0 0 10px #000;
  display: none;
}
.zhidinggoufang h2 {
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  position: relative;
  font-size: 14px;
  border-bottom: #ccc 1px solid;
}
.zhidinggoufang h2 .close {
  position: absolute;
  width: 30px;
  height: 30px;
  right: 0px;
  top: 0px;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
}
.zhidinggoufang h2 .close:hover {
  background: #f00;
  color: #fff;
}
.zhidinggoufang form {
  padding: 15px 0 0 0;
}
.zhidinggoufang input,
.zhidinggoufang select {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  padding-left: 3px;
}
.zhiding-list {
  height: 35px;
  margin: 10px 0 0 0;
}
.zhiding-list label {
  float: left;
  width: 90px;
  text-align: right;
  padding-right: 5px;
  height: 35px;
  line-height: 35px;
  font-weight: bold;
}
.zhiding-list select,
.zhiding-list input {
  width: 325px;
  height: 33px;
  border: #ccc 1px solid;
}
.zhidingsub {
  padding: 10px 0;
  text-align: center;
}
.zhidingsub input {
  width: 200px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  color: #fff;
  font-size: 14px;
  background: #f60;
  cursor: pointer;
}
.zhidingtext {
  font-size: 12px;
  padding: 15px;
  line-height: 25px;
}

/*copy*/
.copy {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #2d2d2d;
  font-size: 14px;
  text-align: center;
  color: #fff;
}
.copy a {
  color: #fff;
}
.copy a:hover {
  text-decoration: underline;
}
</style>