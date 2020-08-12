<template>
  <el-container>
    <el-header class="clear">
      <h4 class="left_box">中医药大学实训平台</h4>
      <div class="right_box">
        <el-dropdown trigger="click" @command="GoLogin">
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <div class="title">请选择使用的系统</div>
      <div class="content">
        <div class="btn_box" v-for="(item,i) in navList" :key="i">
          <div class="item" :style="item.background" @click="jumpPlatform()">
            <h4>{{item.text_1}}</h4><h6>{{item.text_2}}</h6>
          </div>
          <div class="switch">
            <el-switch v-model="item.value" active-color="#13ce66" inactive-color="#ccc" @change="clickSwitch(i)"></el-switch>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer>关闭开关学生将无法使用该系统，不影响教师使用</el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      navList:[{
        text_1: '经典原文实训',
        text_2: '原文实训',
        value: true,
        background: 'background:#4BB328'
      },{
        text_1: '经典案例实训',
        text_2: '案例实训',
        value: true,
        background: 'background:#2E79BA'
      },{
        text_1: '经典案例实训问诊',
        text_2: '问诊实训',
        value: true,
        background: 'background:#5A055A'
      },]
    }
  },
  methods: {
    jumpPlatform(e) { // 跳转平台页面
      this.$router.replace({path:'/Platform'})
    },
    GoLogin(e) { // 返回登录页
      this.$router.replace({path:'/'})
    },
    clickSwitch(e) { // 开关
      let that = this
      that.$confirm('有学生正在进行练习，是否关闭该系统？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {}).catch(() => {
        that.navList[e].value = true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container{
  width:100%;
  box-sizing: border-box;
}
.el-header{
  width:100%;
  height:60px;
  line-height:60px;
  box-sizing: border-box;
  background: #2E79BA;
  padding:0 40px 0 20px;
}
.el-header .left_box{
  float: left;
  color:#fff;
}
.el-header .right_box{
  float: right;
}
.el-header .el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-header .el-icon-arrow-down {
  font-size: 12px;
  color:#fff;
}
.el-main{
  width:100%;
  box-sizing: border-box;
  margin-top:170px;
}
.el-main .title{
  font-size:18px;
  color: #333;
  text-align: center;
}
.el-main .content{
  margin-top:70px;
  display: flex;
  padding:0 300px;
}
.el-main .content .btn_box{
  flex: 1;
  margin: 30px 70px;
}
.el-main .content .btn_box .item{
  text-align: center;
  color:#fff;
  padding:30px 0;
  border-radius:8px;
}
.el-main .content .btn_box .switch{
  margin-top:30px;
  display: flex;
  justify-content: center;
}
.el-main .content .btn_box .item h6{
  margin-top:10px;
}
.el-footer{
  text-align: center;
  color:#666;
  font-size:12px;
}
</style>
