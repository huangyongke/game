<template>
    <div>
      <Card class="contact">
        <table>
          <caption>联系方式</caption>
          <tr>
            <th>QQ:</th>
            <td>1915803210</td>
          </tr>
          <tr>
            <th></th>
            <td>1773877625</td>
          </tr>
          <tr>
            <th>微信：</th>
            <td>xx06030628</td>
          </tr>
          <tr>
            <th></th>
            <td>huangyongke1</td>
          </tr>
        </table>
      </Card>
      <div class="title">
        <h1>目前本网站仅回收cf，以后可能扩大规模，敬请期待</h1>
      </div>
    </div>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'About',
  data() {
    return {
      
    }
  },
  computed: {},
  mounted() {
    
  },
  methods: {
    //for vuex
  }
}
</script>

<style scoped>

.title{
  width: 90%;
  text-align: center;
  margin: 0 auto
}
.contact{
  margin-top: 50px;
  margin: 100px auto;
  width: 400px;
  height: 200px;
  font-size: 20px;
  line-height: 25px;
}
table{
  margin: 0 auto
}
table caption{
  margin-bottom: 20px;
}
</style>