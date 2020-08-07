<template>
  <el-container>
    <el-header class="clear">
      <h4 class="left_box">中医药大学实训平台</h4>
      <div class="right_box">
        <el-dropdown trigger="click" @command="handleCommand">
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
        <div class="btn_box">
          <div class="item" style="background:#4BB328" @click="jumpPlatform()">
            <h4>经典原文实训</h4><h6>原文实训</h6>
          </div>
          <div class="switch">
            <el-switch v-model="value_1" active-color="#13ce66" inactive-color="#ccc" @change="onchange(1)"></el-switch>
          </div>
        </div>
        <div class="btn_box">
          <div class="item" style="background:#2E79BA" @click="jumpPlatform()">
            <h4>经典案例实训</h4><h6>案例实训</h6>
          </div>
          <div class="switch">
            <el-switch v-model="value_2" active-color="#13ce66" inactive-color="#ccc" @change="onchange(2)"></el-switch>
          </div>
        </div>
        <div class="btn_box">
          <div class="item" style="background:rgb(90, 5, 90)" @click="jumpPlatform()">
            <h4>经典案例实训问诊</h4><h6>问诊实训</h6>
          </div>
          <div class="switch">
            <el-switch v-model="value_3" active-color="#13ce66" inactive-color="#ccc" @change="onchange(3)"></el-switch>
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
      value_1: true,
      value_2: true,
      value_3: true,
    }
  },
  methods: {
    jumpPlatform(e) { // 跳转平台页面
      this.$router.replace({path:'/Platform'})
    },
    handleCommand(e) { // 返回登录页
      this.$router.replace({path:'/'})
    },
    onchange(e) { // 开关
      console.log(e)
      this.$confirm('有学生正在进行练习，是否关闭该系统？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {
        if (e == 1) {
          this.value_1 = true
        } else if (e == 2) {
          this.value_2 = true
        } else if (e == 3) {
          this.value_3 = true
        }
      });
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
