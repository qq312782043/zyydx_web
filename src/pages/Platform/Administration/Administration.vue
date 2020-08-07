<template>
  <div class="whole">
    <p class="title">请选择以下模式来控制学生电脑</p>
    <div class="SmallBox">
      <div class="tabBar">
        <router-link to="/FreePractice"><el-button type="success" size="mini" plain>开启自由练习模式</el-button></router-link>
        <router-link to="/Classrooms"><el-button type="success" size="mini" plain>开启课堂练习模式</el-button></router-link>
        <router-link to="/Examination"><el-button type="success" size="mini" plain>开启考试模式</el-button></router-link>
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
      msg: ''
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
  .SmallBox .tabBar .el-button{
    width:300px;
    padding-top:15px;
    padding-bottom:15px;
  }
</style>
