<template>
  <div class="whole">
    <div class="Goback">
      <el-button type="text" icon="el-icon-arrow-left" @click="GoBack">返回</el-button>
    </div>
    <div class="header">
      <div class="box_1">
        <p class="text_1">姓名：<span>张宇</span></p>
        <p class="text_1">分数：<span>92</span></p>
        <p class="text_1">排名：<span>1</span></p>
      </div>
      <div class="box_2">
        <div class="AnswerSheet">
          <p class="nth_1">答题卡</p>
          <p class="nth_2"></p>
          <p class="nth_3">正确</p>
          <p class="nth_4"></p>
          <p class="nth_5">错误</p>
        </div>
        <div class="TheBall">
          <P v-for="(item,i) in TheBall" :key="i" :style="{background:item.color}"><a :href="'#c' + i">{{item.text}}</a></P>
        </div>
      </div>
    </div>
    <div class="main">
      <el-main class="card_box">
        <div :id="'c' + i" class="card" v-for="(item,i) in TheBall" :key="i">{{item.text}}</div>
      </el-main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      TheBall: [{
        text: '1',
        color: 'green'
      },{
        text: '2',
        color: 'green'
      },{
        text: '3',
        color: 'red'
      },{
        text: '4',
        color: 'green'
      },{
        text: '5',
        color: 'red'
      }],
      card_box: [{
        text: '1'
      },{
        text: '2'
      },{
        text: '3'
      },{
        text: '4'
      },{
        text: '5'
      },]
    }
  },
  methods: {
    GoBack() { // 点击返回
      this.$router.replace({path:'/StudentList'})
    }
  },
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
  width:100%;
  box-sizing: border-box;
  display:flex;
}
.header .box_1 .text_1{
  font-size:15px;
  color:#333;
  font-weight:bold;
  margin-right:80px;
}
.header .box_1 .text_1 span{
  font-size:14px;
  color:#666;
  font-weight:400;
}
.header .box_2{
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
  background:#fff;
  padding:20px;
  margin-top:20px;
}
.header .box_2 .AnswerSheet{
  display: flex;
}
.header .box_2 .AnswerSheet .nth_1{
  font-size:15px;
  color:#333;
  font-weight:bold;
  margin-right:20px;
}
.header .box_2 .AnswerSheet .nth_2{
  width:20px;
  height:20px;
  border-radius:10px;
  background:green;
  margin-right:4px;
}
.header .box_2 .AnswerSheet .nth_3{
  font-size:15px;
  color:#666;
  margin-right:20px;
}
.header .box_2 .AnswerSheet .nth_4{
  width:20px;
  height:20px;
  border-radius:10px;
  background:red;
  margin-right:4px;
}
.header .box_2 .AnswerSheet .nth_5{
  font-size:15px;
  color:#666;
}
.header .box_2 .TheBall{
  display: flex;
  margin-top:20px;
}
.header .box_2 .TheBall p{
  margin-right:20px;
  border-radius:15px;
  overflow: hidden;
}
.header .box_2 .TheBall p a{
  width:30px;
  height:30px;
  font-size:12px;
  text-align: center;
  line-height:30px;
  color:#fff;
  cursor: pointer;
  text-decoration: none;
  display: block;
}
.main{
  padding:20px;
}
.main .card_box{
  padding:10px 10px 10px 2px;
  box-sizing: border-box;
  width:100%;
  max-height: calc(100vh - 350px);
}
.main .card{
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  background:#f5f5f5;
  height:300px;
  margin-bottom:20px;
  text-align: center;
  line-height:300px;
  font-size:30px;
}
</style>
