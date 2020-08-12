<template>
  <div class="whole">
    <p class="title">请选择以下模式来控制学生电脑</p>
    <div class="SmallBox">
      <div class="tabBar">
        <router-link style="text-decoration:none" :to="item.route" v-for="(item,i) in navList" :key="i">
          <p :class="item.class" @click="clickTabBar(i)">{{item.text}}</p>
        </router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      navList:[{
        text: '开启自由练习模式',
        route: '/FreePractice_mode',
        class: 'Choice'
      },{
        text: '开启课堂练习模式',
        route: '/Classrooms_mode',
        class: 'NoChoice'
      },{
        text: '开启考试模式',
        route: '/Examination_mode',
        class: 'NoChoice'
      }]
    }
  },
  methods: {
    clickTabBar(e) { // 点击切换
      let that = this
      if (e == 0) {
        that.navList[0].class = 'Choice'
        that.navList[1].class = 'NoChoice'
        that.navList[2].class = 'NoChoice'
      } else if (e == 1) {
        that.navList[0].class = 'NoChoice'
        that.navList[1].class = 'Choice'
        that.navList[2].class = 'NoChoice'
      } else if (e == 2) {
        that.navList[0].class = 'NoChoice'
        that.navList[1].class = 'NoChoice'
        that.navList[2].class = 'Choice'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  color: #666;
  font-size:13px;
}
.SmallBox{
  width:100%;
  height:100%;
  box-sizing: border-box;
}
.SmallBox .tabBar{
  display: flex;
  justify-content: space-between;
  margin-top:15px;
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
  border-radius:2px;
}
</style>
