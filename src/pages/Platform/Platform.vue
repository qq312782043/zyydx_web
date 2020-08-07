<template>
  <el-container>
    <el-header class="clear">
      <h4 class="left_box">中医药大学实训平台</h4>
      <div class="right_box">
        <span class="pattern">当前模式：自由练习模式</span>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>返回首页</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-aside style="width:10%">
      <el-col>
        <el-menu router mode="vertical" class="el-menu-vertical-demo"
          background-color="#fff" text-color="#333" active-text-color="#409EFF">
          <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.navItem}}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
    <router-view />
  </el-container>
</template>

<script>
export default {
  name: 'Platform',
  data () {
    return {
      navList:[
        {name:'/Administration',navItem:'课堂练习',icon:'el-icon-s-home'},
        {name:'/ScoreQuery',navItem:'考试成绩查询',icon:'el-icon-s-data'},
        {name:'/Analysis',navItem:'试题分析',icon:'el-icon-s-flag'},
        {name:'/AnswerData',navItem:'学生答题数据',icon:'el-icon-s-claim'},
        {name:'/Question',navItem:'题库管理',icon:'el-icon-menu'},
      ]
    }
  },
  methods: {
    handleCommand () { // 返回首页
      this.$router.replace({path:'/Entrance'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  width:100%;
  height:100%;
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
  border-right:1px solid #DCDFE6;
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
  width:90%;
  height:92%;
  position: absolute;
  top:60px;
  left:10%;
  box-sizing: border-box;
  padding:15px;
  z-index:50;
}
</style>
