<template>
  <el-container>
    <el-header class="clear">
      <h4 class="left_box">中医药大学实训平台</h4>
      <div class="right_box">
        <span class="pattern">当前模式：{{title}}</span>
        <el-dropdown trigger="click" @command="Goback">
          <span class="el-dropdown-link">张宇<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>返回首页</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-aside style="width:10%">
      <div @click="clickTabBar(i)" class="TabBarBox"
      :class="item.class" v-for="(item,i) in tabList" :key="i">
        <i :class="item.icon"></i><p>{{item.text}}</p>
      </div>
    </el-aside>
    <router-view />
  </el-container>
</template>

<script>
export default {
  name: 'Platform',
  data () {
    return {
      title: '',
      tabList: ''
    }
  },
  created() {
    let that = this
    that.appendData()
    that.tabList = JSON.parse(localStorage.getItem('tabList'))
  },
  provide() {
    return{
      appendData: this.appendData
    }
  },
  methods: {
    Goback() { // 返回首页
      this.$router.replace({path:'/Entrance'})
    },
    appendData() { // 获取当前模式
      let that = this
      let navList = JSON.parse(localStorage.getItem('navList'))
      for(var i = 0; i < navList.length; i++){
        if (navList[i].class == 'Choice') {
          that.title = navList[i].text
        }
      }
    },
    clickTabBar(e) { // 点击切换路由
      let that = this
      for(var i = 0; i < that.tabList.length; i++){
        that.tabList[i].class = 'NoChoice'
      }
      if (e == 0) {
        that.tabList[0].class = 'Choice'
      } else if (e == 1) {
        that.tabList[1].class = 'Choice'
      } else if (e == 2) {
        that.tabList[2].class = 'Choice'
      } else if (e == 3) {
        that.tabList[3].class = 'Choice'
      } else if (e == 4) {
        that.tabList[4].class = 'Choice'
      } else if (e == 5) {
        that.tabList[5].class = 'Choice'
      }
      that.$router.replace({path:that.tabList[e].route})
      localStorage.setItem('tabList', JSON.stringify(that.tabList))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  width:100%;
  height: calc(100vh);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
.el-container .el-header{
  width:100%;
  height:60px;
  line-height:60px;
  box-sizing: border-box;
  background: #2E79BA;
  padding:0 40px 0 20px;
  position: absolute;
  top:0;
  left:0;
}
.el-container .el-header .left_box{
  float: left;
  color:#fff;
}
.el-container .el-header .right_box{
  float: right;
}
.el-container .el-header .right_box .pattern{
  color:#fff;
  font-size:14px;
  margin-right:30px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
  color:#fff;
}
.el-container .el-aside{
  height:100%;
  height: calc(100vh - 60px);
  border-right:1px solid #DCDFE6;
  position: absolute;
  top:60px;
  left:0;
}
.el-menu-vertical-demo{
  border:none;
}
.el-container .el-aside .item{
  height:50px;
  line-height:50px;
  font-size:15px;
  color:#333;
  text-decoration:none;
}
.el-container .el-aside .item .el-button{
  border:none;
}
.el-container .whole{
  width: 90%;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  padding:15px;
  position: absolute;
  top:60px;
  left:10%;
  z-index:50;
}

/* 导航样式 */
.TabBarBox{
  padding:18px 10px 18px 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.TabBarBox p{
  font-size:14px;
  margin-left:5px;
}
.Choice{
  background:#eee;
  color:#409EFF;
}
.NoChoice{
  background:#fff;
  color:#444;
}
</style>
