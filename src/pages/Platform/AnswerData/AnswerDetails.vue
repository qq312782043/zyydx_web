<template>
  <div class="whole">
    <div class="Goback">
      <el-button type="text" icon="el-icon-arrow-left" @click="GoBack">返回</el-button>
    </div>
    <div class="header">
      <div class="box_1">
        <p>病症案例主诉：系统提供了一个试题库建立、管理和试卷生成的完整的无纸化解决方案。</p>
      </div>
    </div>
    <div class="main">
      <div class="box_2">
        <p>诊断：<span>感冒</span></p>
        <p>病机：<span>感冒</span></p>
        <p>治法：<span>感冒</span></p>
        <p>方药：<span>感冒</span></p>
      </div>
      <div class="box_2">
        <p>正确答案<i class="el-icon-check"></i></p>
        <p>诊断：<span>感冒</span></p>
        <p>病机：<span>感冒</span></p>
        <p>治法：<span>感冒</span></p>
        <p>方药：<span>感冒</span></p>
      </div>
      <div class="box_2">
        <p>学生问诊记录<i class="el-icon-edit"></i></p>
        <p>学生：<span>感冒</span></p>
        <p>系统：<span>感冒</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {

    }
  },
  methods: {
    GoBack() { // 点击返回
      this.$router.replace({path:'/AnswerData'})
    }
  },
  created: function () {
    let that = this
    that.$axios({
      url: that.$store.state.Q_http + 'visit/mini/system/getSystem',
      method: 'post',
      data: {
        id: 11
      }
    }).then((res) =>{
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Goback .el-button{
  padding:0;
  color:#333;
}
.Goback .el-button:hover{
  color:#2E79BA;
}
.header{
  width:100%;
  box-sizing: border-box;
  padding:0 20px;
  margin-top:20px;
}
.header .box_1{
  box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.1);
  background:#f5f5f5;
  padding:20px;
}
.header .box_1 p{
  color:#333;
  font-size:14px;
}
.main{
  width:100%;
  box-sizing: border-box;
  padding:0 20px;
  margin-top:20px;
}
.main .box_2{
  margin-bottom:20px;
}
.main .box_2 p{
  color:#333;
  font-size:14px;
  font-weight:bold;
  margin-bottom:10px;
}
.main .box_2 p i{
  margin-left:5px;
}
.main .box_2 p span{
  color:#666;
  font-size:13px;
}
</style>
