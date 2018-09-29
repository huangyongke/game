<template>
  <div>
    <div class="content">
      <div class="width1190">

        <div class="pro-search">
          <table>
            <tr>
              <th>游戏：</th>
              <td>
                <a @click="gameclick(-1)" v-bind:class="{'pro-cur':action.game === -1}">不限</a>
                <a v-for="(item,index) in gamelist" @click="gameclick(index)" v-bind:class="{'pro-cur': action.game === index}">{{item.name}}</a>
                <!-- <a @click="gameclick(0,'all')" v-bind:class="{'pro-cur':gamelist[0]}">不限</a>
                <a @click="gameclick(1,'cf')" v-bind:class="{'pro-cur' : gamelist[1]}">cf</a> -->
              </td>
            </tr>
            <tr>
              <th>战区：</th>
              <td>
                <a @click="zoneclick(-1)" v-bind:class="{'pro-cur':action.zone === -1}">不限</a>
                <a v-for="(item,index) in zonelist" @click="zoneclick(index)" v-bind:class="{'pro-cur': action.zone === index}">{{item.name}}</a>
                <!-- <a @click="gameclick(0,'all')" v-bind:class="{'pro-cur':gamelist[0]}">不限</a>
                <a @click="gameclick(1,'cf')" v-bind:class="{'pro-cur' : gamelist[1]}">cf</a> -->
              </td>
            </tr>
            <tr>
              <th>区域：</th>
              <td>
                <a @click="areaclick(-1)" v-bind:class="{'pro-cur':action.area === -1}">不限</a>
                <a v-for="(item,index) in arealist" @click="areaclick(index)" v-bind:class="{'pro-cur': action.area === index}">{{item.area}}</a>
              </td>
            </tr>
            <tr>
              <th>价格：</th>
              <td>
                <a @click="priceclick(-1)" v-bind:class="{'pro-cur':action.price === -1}">不限</a>
                <a v-for="(item,index) in pricelist" @click="priceclick(index)" v-bind:class="{'pro-cur': action.price === index}">{{item.start}}-{{item.end}}</a>
              </td>
            </tr>
          </table>
          <div class="paixu">
            <strong>排序：</strong>
            <a @click="sortclick(0)" :class="{'pai-cur':sortlist[0]}">默认</a>
            <a @click="sortclick(1)" :class="{'pai-cur':sortlist[1]}">价格 &or;</a>
            <a @click="sortclick(2)" :class="{'pai-cur':sortlist[2]}">最新 &or;</a>
          </div>
        </div>
        <!--pro-search/-->
      </div>
      <!--width1190/-->
      <div class="width1190">
        <div class="index-fang-list">
          <dl v-for="item in gamedata">
            <dt>
              <router-link :to="'/profile/'+item.sell_id"><img :src="'/image/'+item.avatar" width="286" height="188" /></router-link>
            </dt>
            <dd>
              <h3>
                <router-link :to="'/profile/'+item.sell_id">{{item.name}}</router-link>
                <div class="price" style="float:right;">¥
                  <strong>{{item.price}}</strong>
                </div>
              </h3>
              <div class="hui">
                {{item.type}} | {{item.zone}} | {{item.area}} | 
                <template v-if="item.level">
                  {{item.level}}级
                </template>
            </dd>
          </dl>
          <div class="clears"></div>
          </div>
          <!--index-fang-list/-->
        </div>
        <!--width1190/-->
        <Page :total="pagedata.totalcount" :page-size="pagedata.countPerPage" :current="pagedata.currentPage" show-elevator show-total class="page" @on-change="pagechange"></Page>
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
      gamename: '',
      price: {
        start: '',
        end: ''
      },
      area: '',
      sort: '',
      zone:'',
      action: {
        game: -1,
        price: -1,
        sort: 0,
        area: -1,
        zone:-1,
      },
      gamelist: [],
      arealist: [],
      zonelist:[],
      pricelist: [
        {
          start: 0,
          end: 50
        },
        {
          start: 50,
          end: 100
        },
        {
          start: 100,
          end: 200
        },
        {
          start: 200,
          end: 500
        },
        {
          start: 500,
          end: 1000
        },
        {
          start: 1000,
          end: '以上'
        }
      ],
      sortlist: [true, false, false],
      pagedata: {
        totalcount: 0,
        countPerPage: 16,
        currentPage: 1
      },
      gamedata: []
    }
  },
  //这两个map是vuex的部分
  computed: {},
  created() {},
  mounted() {
    this.$http({
      url: '/api/getGameCategory',
      method: 'GET'
    }).then(
      function(res) {
        this.gamelist = res.body
        // 返回总记录
        //this.$router.push({path: '/hello', query:{data: res.body}})
      },
      function() {
        this.$Message.error('获取数据失败')
      }
    )
    this.getdata()
  },
  methods: {
    //for vuex
    getdata() {
      this.$http({
        url: '/api/getAllGames',
        method: 'GET',
        params: {
          game: this.gamename,
          area: this.area,
          zone: this.zone,
          startprice: this.price.start,
          endprice: this.price.end,
          sort: this.sort,
          countPerPage: this.pagedata.countPerPage,
          currentPage: this.pagedata.currentPage
        }
      }).then(
        function(res) {
          this.gamedata = res.body.data
          this.pagedata.totalcount = res.body.count

          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
    },
    getzone() {
      this.$http({
        url: '/api/getZoneById',
        method: 'GET',
        params: {
          type_id: this.gamename
        }
      }).then(
        function(res) {
          this.zonelist = res.body

          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
    },
    getarea() {
      this.$http({
        url: '/api/getAreaById',
        method: 'GET',
        params: {
          zone_id: this.zone
        }
      }).then(
        function(res) {
          this.arealist = res.body

          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
    },
    pagechange(page) {
      this.pagedata.currentPage = page
      this.getdata()
    },
    gameclick(id) {
      this.action.game = id
      if (id == -1) {
        this.gamename = ''
        this.action.zone = -1
        this.zone = ''
        this.action.area = -1
        this.area =''
      } else {
        this.gamename = this.gamelist[id].id
      }
      this.getdata()
      this.getzone()
      this.getarea()
    },
    zoneclick(id) {
      this.action.zone = id
      if (id == -1) {
        this.zone = ''
        this.action.area = -1
        this.area =''
      } else {
        this.zone = this.zonelist[id].id
      }
      this.getdata()
      this.getarea()
    },
    areaclick(id) {
      this.action.area = id
      if (id == -1) {
        this.area = ''
      } else {
        this.area = this.arealist[id].id
      }
      this.getdata()
    },
    priceclick(id) {
      this.action.price = id
      if (id == -1) {
        this.price.start = ''
        this.price.end = ''
      } else {
        this.price.start = this.pricelist[id].start
        this.price.end = this.pricelist[id].end
      }
      this.getdata()
    },
    sortclick(id) {
      this.sort = id
      for (var i = 0; i < this.sortlist.length; i++) {
        this.sortlist[i] = false
      }
      this.$set(this.sortlist, id, true)
      this.getdata()
    },
    changePage() {
      this.$router.push({ path: '/second' })
    }
  }
}
</script>

<style scoped>
.page {
  text-align: center;
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
/*租房 产品搜索*/
.pro-search table {
  width: 100%;
}
.pro-search th {
  width: 80px;
  text-align: right;
  padding-right: 5px;
  padding: 9px 0;
  border-bottom: #ccc 1px dotted;
  font-size: 14px;
}
.pro-search td {
  padding: 9px 0;
  border-bottom: #ccc 1px dotted;
}
.pro-search td a {
  display: inline-block;
  padding: 0 15px;
  height: 24px;
  line-height: 24px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  margin-right: 4px;
}
.pro-search td a.pro-cur {
  background: #900;
  color: #fff;
}
.protext {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  border: #ddd 1px solid;
  width: 50px;
  height: 20px;
}
.paixu {
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  padding: 10px 0 0 40px;
}
.paixu strong {
  font-weight: 400;
}
.paixu a {
  display: inline-block;
  margin-right: 15px;
}
.paixu a.pai-cur {
  color: #f60;
  font-weight: bold;
}

/*pro-left*/
.pro-left {
  float: left;
  width: 880px;
}
.pro-left dl {
  padding: 15px 0;
  border-bottom: #ccc 1px dotted;
}
.pro-left dt {
  float: left;
  width: 286px;
  height: 188px;
}
.pro-left dd {
  float: left;
  width: 380px;
  margin-left: 10px;
  padding: 0 0 0 0;
}
.pro-left dd h3 {
  font-size: 18px;
  line-height: 25px;
  font-weight: 400;
  margin-bottom: 10px;
}
.pro-wei {
  padding: 6px 0;
  font-size: 15px;
  font-weight: 400;
}
.pro-fang {
  padding: 5px 0;
  font-size: 14px;
}
.pra-fa {
  padding: 5px 0;
  font-size: 14px;
  margin: 20px 0 0 0;
}
.pro-left dl .price {
  float: right;
  margin: 50px 0 0 0;
  font-size: 26px;
  width: 140px;
  text-align: right;
  height: 40px;
  line-height: 40px;
}

Radio {
  margin-right: 20px;
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
  margin-bottom: 20px;
}
.index-fang-list dt {
  height: 188px;
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
</style>