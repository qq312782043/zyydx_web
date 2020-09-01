<template>
  <el-container>
    <el-header class="clear">
      <h4 class="left_box">中医药大学实训平台</h4>
      <div class="right_box">
        <el-dropdown trigger="click" @command="BackLogin">
          <span class="el-dropdown-link">{{loginData.user.userName}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <div class="title">请选择使用的系统</div>
      <div class="content">
        <div class="btn_box" v-for="(item,i) in loginData.systemStatusList" :key="i">
          <div v-if="item.systemType == 1" class="item" style="background:#4BB328" @click="jumpPlatform()">
            <h4>经典原文实训</h4><h6>原文实训</h6>
          </div>
          <div v-if="item.systemType == 2" class="item" style="background:#2E79BA" @click="jumpPlatform()">
            <h4>经典案例实训</h4><h6>案例实训</h6>
          </div>
          <div v-if="item.systemType == 3" class="item" style="background:#5A055A" @click="jumpPlatform()">
            <h4>经典案例实训问诊</h4><h6>问诊实训</h6>
          </div>
          <div class="switch">
            <el-switch v-model="item.systemStatus" active-color="#13ce66" inactive-color="#ccc"></el-switch>
            <p @click="clickSwitch(item,i)">12345</p>
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
      loginData: ''
    }
  },
  created() {
    let that = this
    that.loginData = that.$store.state.loginData
  },
  methods: {
    jumpPlatform(e) { // 跳转平台页面
      let that = this
      that.$router.replace({path:'/Platform'})
    },
    BackLogin(e) { // 返回登录页
      let that = this
      that.$axios({
        url: that.$store.state.Q_http + 'user/loginOut',
        method: 'post',
        data: {
          userId: that.loginData.user.id
        }
      }).then((res) =>{
        if(res.data.code == 200){
          that.$router.replace({path:'/'})
        }
      })
    },
    clickSwitch(e,index) { // 开关
      let that = this
      that.$confirm('有学生正在进行练习，是否关闭该系统？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let systemStatus = ''
        if (e.systemStatus == true) {
          systemStatus = 0
          that.$store.state.loginData.systemStatusList[index].systemStatus = false
        } else {
          systemStatus = 1
          that.$store.state.loginData.systemStatusList[index].systemStatus = true
        }
        that.$axios({
          url: that.$store.state.Q_http + 'common/modifySytemStatus',
          method: 'post',
          data: {
            id: e.id,
            userId: that.loginData.user.id,
            systemStatus: systemStatus
          }
        }).then((res) =>{
          // console.log(res.data)
          if(res.data.code == 200){
            console.log(that.$store.state.loginData.systemStatusList[index].systemStatus)
            that.loginData = that.$store.state.loginData
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      }).catch(() => { })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container{
  position: relative;
}
.el-header{
  width:100%;
  height:60px;
  line-height:60px;
  box-sizing: border-box;
  background: #2E79BA;
  padding:0 40px 0 20px;
  position: relative;
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
  position: relative;
  top:180px;
}
.el-main .title{
  font-size:18px;
  color: #333;
  text-align: center;
}
.el-main .content{
  display: flex;
  justify-content: space-around;
  margin:70px auto 0;
  padding:0 100px;
}
.el-main .content .btn_box{
  width:200px;
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
  position: relative;
}
.el-main .content .btn_box .switch p{
  background:red;
  position: absolute;
  opacity:0;
  cursor: pointer;
}
.el-main .content .btn_box .item h6{
  margin-top:10px;
}
.el-footer{
  width:100%;
  text-align: center;
  color:#666;
  font-size:12px;
  position: fixed;
  bottom:10px;
}
</style>
