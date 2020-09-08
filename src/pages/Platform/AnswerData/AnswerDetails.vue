<template>
  <div class="whole">
    <div class="Goback">
      <el-button type="text" icon="el-icon-arrow-left" @click="GoBack">返回</el-button>
    </div>
    <div class="header">
      <div class="box_1">
        <p>病症案例主诉：{{AllData.chiefComplaint}}</p>
      </div>
    </div>
    <div class="main">
      <div class="box_2">
        <p>诊断：
          <span :style="{color:diagnosisStu.rightFlag==1?'#67c23a':'#f56c6c'}">{{diagnosisStu.rightFlag==1?diagnosisStu.name:''}}
            <i :class="diagnosisStu.rightFlag==1?'el-icon-check':'el-icon-close'"></i>
          </span>
        </p>
        <p>病机：
          <span :style="{color:pathogenesisStu.rightFlag==1?'#67c23a':'#f56c6c'}">{{pathogenesisStu.rightFlag==1?pathogenesisStu.name:''}}
            <i :class="pathogenesisStu.rightFlag==1?'el-icon-check':'el-icon-close'"></i>
          </span>
        </p>
        <p>治法：
          <span :style="{color:treatmentStu.rightFlag==1?'#67c23a':'#f56c6c'}">{{treatmentStu.rightFlag==1?treatmentStu.name:''}}
            <i :class="treatmentStu.rightFlag==1?'el-icon-check':'el-icon-close'"></i>
          </span>
        </p>
        <p>处方：
          <span :style="{color:drugStu.rightFlag==1?'#67c23a':'#f56c6c'}">{{drugStu.rightFlag==1?drugStu.name:''}}
            <i :class="drugStu.rightFlag==1?'el-icon-check':'el-icon-close'"></i>
          </span>
        </p>
        <p>药物：
          <span :style="{color:prescriptionStu.rightFlag==1?'#67c23a':'#f56c6c'}" v-for="(item,i) in prescriptionStu.tipList" :key="i">{{item.name}}</span>
          <i :style="{color:prescriptionStu.rightFlag==1?'#67c23a':'#f56c6c'}" :class="prescriptionStu.rightFlag==1?'el-icon-check':'el-icon-close'"></i>
        </p>
      </div>
      <div class="box_2">
        <p>正确答案</p>
        <p>诊断：<span>{{AllData.diagnosis}}</span></p>
        <p>病机：<span>{{AllData.pathogenesis}}</span></p>
        <p>治法：<span>{{AllData.treatment}}</span></p>
        <p>处方：<span>{{AllData.drug}}</span></p>
        <p>药物：<span>{{AllData.prescription}}</span></p>
      </div>
      <!-- <div class="box_2">
        <p>学生问诊记录<i class="el-icon-edit"></i></p>
        <p>学生：<span>感冒</span></p>
        <p>系统：<span>感冒</span></p>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      id: this.$route.query, // 页面传参ID
      AllData: '', // 页面数据
      diagnosisStu: '',
      pathogenesisStu: '',
      treatmentStu: '',
      drugStu: '',
      prescriptionStu: '',
    }
  },
  created: function () {
    let that = this
    that.$axios({
      url: that.$store.state.Q_http + 'caseExamination/queryQuestionDescriptionThree',
      method: 'post',
      data: {
        questionId: that.id.questionId,
        examinationId: that.id.examinationId,
        userId: that.id.userId,
      }
    }).then((res) =>{
      console.log(res.data.data)
      if (res.data.code == 200) {
        that.AllData = res.data.data
        that.diagnosisStu = res.data.data.diagnosisStu
        that.pathogenesisStu = res.data.data.pathogenesisStu
        that.treatmentStu = res.data.data.treatmentStu
        that.drugStu = res.data.data.drugStu
        that.prescriptionStu = res.data.data.prescriptionStu
      }
    }).catch((err) =>{
      that.$message.error('请求失败!')
    })
  },
  methods: {
    GoBack() { // 点击返回
      let that = this
      that.$router.replace({path:'/AnswerData'})
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
  color:#BF8333;
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
.main .box_2 p span{
  color:#666;
  font-size:13px;
  margin-right:10px;
}
</style>
