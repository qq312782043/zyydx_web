<template>
  <div class="whole">
    <div class="Goback">
      <el-button type="text" icon="el-icon-arrow-left" @click="GoBack">返回</el-button>
    </div>
    <div v-if="SelectSystem == '原文实训'">
      <div class="header">
        <div class="box_1">
          <div v-html="AllData.questionText"></div>
          <div>
            <p class="text_2">参考答案</p>
            <p class="text_3">{{AllData.optionText}}</p>
          </div>
        </div>
      </div>
    </div>
    <el-main v-else>
      <div class="header">
        <div class="box_1">
          <p class="text_1">病症案例主诉：{{AllData.chiefComplaint}}</p>
        </div>
      </div>
      <div class="main">
        <div class="box_2">
          <p v-if="diagnosisStu.flag == 1">诊断：
            <span :style="{color:diagnosisStu.rightFlag==1?'#333':'#f56c6c'}">{{diagnosisStu.name?diagnosisStu.name:'未作答'}}
              <i :class="diagnosisStu.rightFlag==1?'el-icon-check':'el-icon-close'"></i>
            </span>
          </p>
          <p v-if="pathogenesisStu.flag == 1">病机：
            <span :style="{color:pathogenesisStu.rightFlag==1?'#333':'#f56c6c'}">{{pathogenesisStu.name?pathogenesisStu.name:'未作答'}}
              <i :class="pathogenesisStu.rightFlag==1?'el-icon-check':'el-icon-close'"></i>
            </span>
          </p>
          <p v-if="treatmentStu.flag == 1">治法：
            <span :style="{color:treatmentStu.rightFlag==1?'#333':'#f56c6c'}">{{treatmentStu.name?treatmentStu.name:'未作答'}}
              <i :class="treatmentStu.rightFlag==1?'el-icon-check':'el-icon-close'"></i>
            </span>
          </p>
          <p v-if="drugStu.flag == 1">处方：
            <span :style="{color:drugStu.rightFlag==1?'#333':'#f56c6c'}">{{drugStu.name?drugStu.name:'未作答'}}
              <i :class="drugStu.rightFlag==1?'el-icon-check':'el-icon-close'"></i>
            </span>
          </p>
          <p v-if="prescriptionStu.flag == 1">药物：
            <span v-if="prescriptionStu.tipList.length !=0">
              <span v-for="(item,i) in prescriptionStu.tipList" :key="i" :style="{color:item.flag==1?'#333':'#f56c6c'}">
                {{item.name}}
                <i :style="{color:item.flag==1?'#333':'#f56c6c'}" :class="item.flag==1?'el-icon-check':'el-icon-close'"></i>
              </span>
            </span>
            <span v-else style="color:#f56c6c">未作答 <i class="el-icon-close"></i></span>
          </p>
        </div>
        <div class="box_2">
          <p>正确答案</p>
          <p v-if="diagnosisStu.flag == 1">诊断：<span>{{AllData.diagnosis}}</span></p>
          <p v-if="pathogenesisStu.flag == 1">病机：<span>{{AllData.pathogenesis}}</span></p>
          <p v-if="treatmentStu.flag == 1">治法：<span>{{AllData.treatment}}</span></p>
          <p v-if="drugStu.flag == 1">处方：<span>{{AllData.drug}}</span></p>
          <p v-if="prescriptionStu.flag == 1">药物：<span>{{AllData.prescription}}</span></p>
        </div>
        <div class="box_2" v-if="SelectSystem == '问诊实训'">
          <p>学生问诊记录</p>
          <div v-if="AllData.reply.length!=0">
            <div v-for="(item,i) in AllData.reply" :key="i">
              <p>学生：<span>{{item.question}}</span></p>
              <p>系统：<span>{{item.reply}}</span></p>
            </div>
          </div>
          <div v-else><p>无问诊记录</p></div>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      SelectSystem: this.$store.state.SelectSystem, // 当前选择哪个平台
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
    that.FnShowData()
  },
  methods: {
    GoBack() { // 点击返回
      let that = this
      that.$router.replace({path:'/AnswerData'})
    },

    // 执行区域函数
    FnShowData() {
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'originalReport/getStudentQuestionAnswer',
          method: 'post',
          data: {
            id: that.id.id,
            userId: that.id.userId,
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.AllData = res.data.data
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      } else {
        let url = ''
        if (that.SelectSystem == '案例实训') {
          url = that.$store.state.Q_http + 'caseExamination/queryQuestionDescriptionThree'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroExamination/queryQuestionDescriptionThree'
        }
        that.$axios({
          url: url,
          method: 'post',
          data: {
            questionId: that.id.questionId,
          }
        }).then((res) =>{
          // console.log(res.data.data)
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
.header .box_1 .text_1{
  color:#333;
  font-size:14px;
}
.header .box_1 .text_2{
  color:#333;
  font-size:14px;
  font-weight: bold;
  margin-top:20px;
}
.header .box_1 .text_3{
  color:#333;
  font-size:14px;
  margin-top:5px;
}
.el-main{
  max-height:calc(100vh - 130px);
  padding:0;
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
