<template>
  <div class="whole">
    <div class="Goback">
      <el-button type="text" icon="el-icon-arrow-left" @click="GoBack">返回</el-button>
    </div>
    <div class="header">
      <div class="box_1">
        <p class="text_1">姓名：<span>{{StudentData.userName}}</span></p>
        <p class="text_1">分数：<span>{{StudentData.score}}</span></p>
        <p class="text_1">排名：<span>{{StudentData.sort}}</span></p>
      </div>
      <div class="box_2">
        <div class="AnswerSheet">
          <p class="nth_1">答题卡</p>
          <p class="nth_2"></p>
          <p class="nth_3">正确</p>
          <p class="nth_4"></p>
          <p class="nth_5">错误</p>
        </div>
        <el-main class="TheBall">
          <P v-for="(item,i) in StudentListData" :key="i" :style="{background:item.flagRight==1?'green':'red'}"><a :href="'#c' + i">{{i+1}}</a></P>
        </el-main>
      </div>
    </div>
    <div v-if="SelectSystem=='原文实训'" class="main" v-loading="loading">
      <el-main class="card_box">
        <div :id="'c' + i" class="card" v-for="(item,i) in StudentListData" :key="i">
          <div>
            <div v-html="(i+1)+'、'+ item.questionText"></div>
            <div>
              <p class="text_5">参考答案</p>
              <p class="text_6">{{item.optionText}}</p>
            </div>
          </div>
        </div>
      </el-main>
    </div>
    <div v-else class="main" v-loading="loading">
      <el-main class="card_box">
        <div :id="'c' + i" class="card" v-for="(item,i) in StudentListData" :key="i">
          <p class="text_1">{{item.sort}}、病例主诉：{{item.chiefComplaint}}</p>
          <p v-if="item.diagnosisStu.flag == 1" class="text_2">诊断：
            <span :style="{color:item.diagnosisStu.rightFlag==1?'#333':'#f56c6c'}">{{item.diagnosisStu.name?item.diagnosisStu.name:'未作答'}}
              <i :class="item.diagnosisStu.rightFlag==1?'el-icon-check':'el-icon-close'"></i>
            </span>
          </p>
          <p v-if="item.pathogenesisStu.flag == 1" class="text_2">病机：
            <span :style="{color:item.pathogenesisStu.rightFlag==1?'#333':'#f56c6c'}">{{item.pathogenesisStu.name?item.pathogenesisStu.name:'未作答'}}
              <i :class="item.pathogenesisStu.rightFlag==1?'el-icon-check':'el-icon-close'"></i>
            </span>
          </p>
          <p v-if="item.treatmentStu.flag == 1" class="text_2">治法：
            <span :style="{color:item.treatmentStu.rightFlag==1?'#333':'#f56c6c'}">{{item.treatmentStu.name?item.treatmentStu.name:'未作答'}}
              <i :class="item.treatmentStu.rightFlag==1?'el-icon-check':'el-icon-close'"></i>
            </span>
          </p>
          <p v-if="item.drugStu.flag == 1" class="text_2">处方：
            <span :style="{color:item.drugStu.rightFlag==1?'#333':'#f56c6c'}">{{item.drugStu.name?item.drugStu.name:'未作答'}}
              <i :class="item.drugStu.rightFlag==1?'el-icon-check':'el-icon-close'"></i>
            </span>
          </p>
          <p v-if="item.prescriptionStu.flag == 1" class="text_2">药物：
            <span v-if="item.prescriptionStu.tipList.length !=0">
              <span v-for="(value,i) in item.prescriptionStu.tipList" :key="i" :style="{color:value.flag==1?'#333':'#f56c6c'}">
                {{value.name}}
                <i :style="{color:value.flag==1?'#333':'#f56c6c'}" :class="value.flag==1?'el-icon-check':'el-icon-close'"></i>
              </span>
            </span>
            <span v-else style="color:#f56c6c">未作答 <i class="el-icon-close"></i></span>
          </p>
          <div class="box_3">
            <p class="text_4">参考答案</p>
            <p v-if="item.diagnosis">诊断：<span>{{item.diagnosis}}</span></p>
            <p v-if="item.pathogenesis">病机：<span>{{item.pathogenesis}}</span></p>
            <p v-if="item.treatment">治法：<span>{{item.treatment}}</span></p>
            <p v-if="item.drug">处方：<span>{{item.drug}}</span></p>
            <p v-if="item.prescription">药物：<span>{{item.prescription}}</span></p>
          </div>
          <div class="box_3" v-if="SelectSystem=='问诊实训'">
            <p class="text_4">问诊记录</p>
            <div v-if="item.reply.length!=0">
              <div v-for="(value,i) in item.reply" :key="i">
                <p>学生：<span>{{value.question}}</span></p>
                <p>系统：<span>{{value.reply}}</span></p>
              </div>
            </div>
            <div v-else>无问诊记录</div>
          </div>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      SelectSystem: this.$store.state.SelectSystem, // 当前选择哪个平台
      id: this.$route.query, // 页面传参ID
      loading: false, // 页面加载
      StudentData: '', // 学生信息数据
      StudentListData: '', // 学生答题数据
    }
  },
  created() {
    let that = this
    that.loading = true
    that.FnShowData()
  },
  methods: {
    GoBack() { // 点击返回
      let that = this
      let parameter = {}
      if (that.SelectSystem == '原文实训') {
        parameter = { id: that.$store.state.StudentListData.id }
      } else {
        parameter = { id: that.id.examinationId }
      }
      that.$router.replace({
        path:'/StudentList',
        query: parameter
      })
    },

    // 执行函数区域
    FnShowData() {
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'originalReport/queryQuestionAnswer',
          method: 'post',
          data: {
            id: that.id.id,
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loading = false
            that.StudentData = that.$store.state.PaperDetails
            that.StudentListData = res.data.data
          } else {
            that.loading = false
          }
        }).catch((err) =>{
          that.loading = false
          that.$message.error('请求失败!')
        })
      } else {
        let url = ''
        if (that.SelectSystem == '案例实训') {
          url = that.$store.state.Q_http + 'caseExamination/queryStudentScoreThree'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroExamination/queryStudentScoreThree'
        }
        that.$axios({
          url: url,
          method: 'post',
          data: {
            id: that.id.examinationId,
            userId: that.id.userId,
            typeId: that.id.typeId,
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loading = false
            that.StudentData = res.data.data
            that.StudentListData = res.data.data.dataList
          } else {
            that.loading = false
          }
        }).catch((err) =>{
          that.loading = false
          that.$message.error('请求失败!')
        })
      }
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
  color: #BF8333;
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
  flex-wrap: wrap;
  margin-top:20px;
  max-height:100px;
  padding:0;
}
.header .box_2 .TheBall p{
  margin-right:20px;
  border-radius:15px;
  overflow: hidden;
  margin-bottom:20px;
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
  max-height: calc(100vh - 380px);
}
.main .card{
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  background:#f5f5f5;
  margin-bottom:20px;
  padding: 30px;
}
.main .card .text_1{
  color:#666;
  font-size:14px;
  margin-bottom:30px;
}
.main .card .text_2{
  color:#333;
  font-size:14px;
  margin-bottom:5px;
}
.main .card .box_3{
  width:100%;
  border:1px solid #ccc;
  margin-top:30px;
  padding:10px;
  font-size:14px;
  color:#333;
}
.main .card .box_3 .text_4{
  margin-bottom:10px;
}
.main .card .box_3 p{
  margin-bottom:5px;
}

.text_5{
  color:#333;
  font-weight: bold;
  margin:20px 0 10px;
  font-size:14px;
}
.text_6{
  font-size:14px;
}
</style>
