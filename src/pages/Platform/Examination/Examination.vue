<template>
  <div class="whole">
    <div class="title">经典案例实训考试分数比例设置<span>*五项分数的总和必须为10分</span></div>
    <div class="input_box">
      <p>诊断分数</p>
      <el-input v-model="dataList.diagnosisScore" clearable size="small" maxlength="1"></el-input><p>分</p>
    </div>
    <div class="input_box">
      <p>病机分数</p>
      <el-input v-model="dataList.pathogenesisScore" clearable size="small" maxlength="1"></el-input><p>分</p>
    </div>
    <div class="input_box">
      <p>治法分数</p>
      <el-input v-model="dataList.treatmentScore" clearable size="small" maxlength="1"></el-input><p>分</p>
    </div>
    <div class="input_box">
      <p>处方分数</p>
      <el-input v-model="dataList.drugScore" clearable size="small" maxlength="1"></el-input><p>分</p>
    </div>
    <div class="input_box">
      <p>方药分数</p>
      <el-input v-model="dataList.prescriptionScore" clearable size="small" maxlength="1"></el-input><p>分</p>
    </div>
    <div class="footer">
      <el-button type="warning" size="medium" @click="clickPreservation()">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      SelectSystem: this.$store.state.SelectSystem, // 当前选择哪个平台
      dataList: ''
    }
  },
  created() {
    let that = this
    that.FnShowData()
  },
  methods: {
    clickPreservation() { // 点击保存
      let that = this
      let number = parseInt(that.dataList.diagnosisScore)
      + parseInt(that.dataList.pathogenesisScore)
      + parseInt(that.dataList.treatmentScore)
      + parseInt(that.dataList.drugScore)
      + parseInt(that.dataList.prescriptionScore)
      if (number == 10) {
        let url = ''
        if (that.SelectSystem == '案例实训') {
          url = that.$store.state.Q_http + 'caseType/setCaseScore'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroType/setInterroScore'
        }
        that.$axios({
          url: url,
          method: 'post',
          data: {
            id: 1,
            diagnosisScore: that.dataList.diagnosisScore,
            pathogenesisScore: that.dataList.pathogenesisScore,
            treatmentScore: that.dataList.treatmentScore,
            drugScore: that.dataList.drugScore,
            prescriptionScore: that.dataList.prescriptionScore
          }
        }).then((res) =>{
          if(res.data.code == 200){
            that.$message({
              message: '保存成功~',
              type: 'success',
              duration: '1000'
            })
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      } else {
        that.$alert('五项分数总和必须为10分~', '提示', {
          confirmButtonText: '好的',
          callback: action => {}
        })
      }
    },

    // 执行区域函数
    FnShowData() {
      let that = this
      let url = ''
      if (that.SelectSystem == '案例实训') {
        url = that.$store.state.Q_http + 'caseType/getCaseScore'
      } else if (that.SelectSystem == '问诊实训') {
        url = that.$store.state.Q_http + 'interroType/getInterroScore'
      }
      that.$axios({
        url: url,
        method: 'post',
        data: {
          id: 1,
        }
      }).then((res) =>{
        // console.log(res.data)
        if(res.data.code == 200){
          that.dataList = res.data.data
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  color:#333;
  font-size:15px;
  font-weight:bold;
  box-sizing: border-box;
  padding:20px;
}
.title span{
  color:#333;
  font-size:12px;
  font-weight:400;
  margin-left:10px;
}
.input_box{
  display:flex;
  align-items: center;
  box-sizing: border-box;
  padding:15px 20px;
}
.input_box p{
  font-size:14px;
  color:#333;
}
.input_box .el-input{
  width:70px;
  margin:0 10px;
}
.footer{
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 100px;
  left:0;
  width:100%;
  box-sizing: border-box;
}
</style>
