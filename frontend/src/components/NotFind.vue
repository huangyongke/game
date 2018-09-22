<template>
  <div>
    <div style="margin:0 auto 200px;width:90%;margin-top:50px;text-align:center;">
      <h1>404!页面没找到</h1>
    </div>
  </div>
</template>
      
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'NotFind',
  data() {
    return {
      sell_id:'',
      info:{},
      current: 2,
      click:'',
    }
  },
  //这两个map是vuex的部分
  computed: {},
  mounted() {
    this.sell_id = this.$route.query.id
    console.log(this.$route)
  },
  methods: {
    

  }
}
</script>

<style scoped>


</style>