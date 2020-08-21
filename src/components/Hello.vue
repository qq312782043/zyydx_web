<template>
  <div class="Commodity"></div>
</template>

<script>
export default {
  name: 'Commodity',
  data () {
    return {
      msg: '这里是商品页',
      counter: 0,
      bol: true,
      AllData: ''
    }
  },
  methods: {
    greet: function () {
      let that = this
      if(that.bol == true){
        that.bol = false
      } else {
        that.bol = true
      }
    }
  },
  created: function () {
    this.$axios({
      url: 'https://visit-api.tamiyun.com/visit/mini/system/getSystem',
      method: 'post',
      data: {
        id: 11
      }
    }).then((res) =>{
      this.AllData = res.data.data
      // console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
