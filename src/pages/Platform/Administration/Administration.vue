<template>
  <div class="whole">
    <div class="header">
      <p class="title">请选择以下模式来控制学生电脑</p>
      <div class="tabBar">
        <div v-for="(item,i) in navList" :key="i">
          <p :class="item.class" @click="clickTabBar(i)">开启{{item.text}}</p>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'whole',
  inject:['appendData'],
  data () {
    return {
      navList: ''
    }
  },
  created() {
    let that = this
    that.navList = JSON.parse(localStorage.getItem('navList'))
  },
  methods: {
    clickTabBar(e) { // 点击切换
      let that = this
      for(var i = 0; i < that.navList.length; i++){
        that.navList[i].class = 'NoChoice'
      }
      if (e == 0) {
        that.navList[0].class = 'Choice'
      } else if (e == 1) {
        that.navList[1].class = 'Choice'
      } else if (e == 2) {
        that.navList[2].class = 'Choice'
      }
      that.$router.replace({path:that.navList[e].route})
      localStorage.setItem('navList', JSON.stringify(that.navList))
      that.appendData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  color: #333;
  font-size:13px;
}
.header .tabBar{
  display: flex;
  justify-content: space-between;
  margin-top:15px;
}
.header .tabBar div{
  cursor:pointer;
}
.SmallBox{
  width:100%;
  height: calc(100vh - 180px);
  box-sizing: border-box;
  border:1px solid #DCDFE6;
  margin-top:15px;
  padding:15px;
}
.NoChoice{
  width:300px;
  padding:10px 0;
  text-align: center;
  box-sizing: border-box;
  font-size:15px;
  border:1px solid #4BB328;
  color: #4BB328;
  background:#fff;
  border-radius:4px;
}
.Choice{
  width:300px;
  padding:10px 0;
  text-align: center;
  box-sizing: border-box;
  font-size:15px;
  border:1px solid #4BB328;
  color: #fff;
  background:#4BB328;
  border-radius:4px;
}
</style>
