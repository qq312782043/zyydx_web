<template>
  <el-main class="whole">
    <div class="Goback">
      <el-button type="text" icon="el-icon-arrow-left" @click="GoBack">返回</el-button>
    </div>
    <div class="header">
      <div class="input_box">
        <p>章节</p>
        <el-select @visible-change="clickvisible($event,1)" v-model="ChapterData"
        :placeholder="CaseQuestion.chapterName" size="small" :disabled="disabled" clearable>
          <el-option v-for="item in Chapter" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="input_box">
        <p>病症类别</p>
        <el-select @visible-change="clickvisible($event,2)" v-model="CategoryData"
        :placeholder="CaseQuestion.categoryName" size="small" :disabled="disabled" clearable>
          <el-option v-for="item in Category" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="input_box"></div>
      <div class="input_box"><p style="color:#BF8333;cursor:pointer" @click="clickEdit()">编辑</p></div>
    </div>
    <div class="header">
      <div class="input_box">
        <p>知识点</p>
        <el-select @visible-change="clickvisible($event,3)" filterable multiple collapse-tags
          v-model="knowledgeData" :placeholder="CaseQuestion.knowledgeName" size="small" :disabled="disabled" clearable>
          <el-option v-for="item in knowledge" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="input_box">
        <p>年龄</p>
        <el-input v-model="Age" :placeholder="CaseQuestion.age" size="small" :disabled="disabled" clearable></el-input>
      </div>
      <div class="input_box">
        <p>性别</p>
        <el-select v-model="SexData" :placeholder="CaseQuestion.sex==2?'女':'男'" size="small" :disabled="disabled" clearable>
          <el-option v-for="item in sex" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="input_box"> </div>
    </div>
    <div class="main">
      <div class="input_box">
        <p>病症案例主诉</p>
        <el-input type="textarea" autosize v-model="CaseQuestion.chiefComplaint" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
      </div>
      <div class="input_box">
        <p>诊断</p>
        <el-input type="textarea" autosize v-model="CaseQuestion.diagnosisJson" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
      </div>
      <div class="input_box">
        <p>病机</p>
        <el-input type="textarea" autosize v-model="CaseQuestion.pathogenesisJson" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
      </div>
      <div class="input_box">
        <p>治法</p>
        <el-input type="textarea" autosize v-model="CaseQuestion.treatmentJson" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
      </div>
      <div class="input_box">
        <p>处方</p>
        <el-input type="textarea" autosize v-model="CaseQuestion.drugJson" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
      </div>
      <div class="input_box">
        <p>药物</p>
        <el-input type="textarea" autosize v-model="CaseQuestion.prescriptionJson" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
      </div>
    </div>
    <div class="footer">
      <el-button type="warning" @click="clickPreserva()">保存</el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      disabled: true, // 页面禁用属性
      id: this.$route.query.id, // 页面传参ID
      Chapter: '', // 章节
      ChapterData: '', // 已选章节ID
      Category: '', // 病症类别
      CategoryData: '', // 已选病症类别ID
      knowledge: '', // 知识点
      knowledgeData: '', // 已选知识点ID
      CaseQuestion: '', // 题库数据
      sex: [{
        label: '男', id: 1
      },{
        label: '女', id: 2
      }],
      SexData: '', // 已选性别
      Age: '', // 年龄
    }
  },
  created() {
    let that = this
    that.FnData()
  },
  methods: {
    GoBack() { // 点击返回
      this.$router.replace({path:'/Question'})
    },
    FnData() { // 初始化数据
      let that = this
      that.$axios({
        url: that.$store.state.Q_http + 'case/getCaseQuestion',
        method: 'post',
        data: {
          id: that.id,
        }
      }).then((res) =>{
        // console.log(res.data)
        if (res.data.code == 200) {
          that.CaseQuestion = res.data.data
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    },
    clickEdit() { // 点击编辑
      let that = this
      that.disabled = false
    },
    clickvisible(e,value) { // 点击下拉框选择章节、知识点、类别
      let that = this
      if (e == true) {
        that.$axios({
          url: that.$store.state.Q_http + 'caseType/getCaseTypeList',
          method: 'post',
          data: {
            type: value
          }
        }).then((res) =>{
          // console.log(res.data)
          if (res.data.code == 200) {
            if (value == 1) {
              that.Chapter = res.data.data
            } else if (value == 2) {
              that.Category = res.data.data
            } else if (value == 3) {
              that.knowledge =  res.data.data
            }
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      }
    },
    clickPreserva() { // 点击保存
      let that = this
      let data = {
        id: that.id,
        chapterId: that.ChapterData==''?that.CaseQuestion.chapterId:that.ChapterData,
        categoryId: that.CategoryData==''?that.CaseQuestion.categoryId:that.CategoryData,
        knowledgePointsIds: that.knowledgeData.toString()==''?that.CaseQuestion.knowledgePointsIds:that.knowledgeData.toString(),
        age: that.Age==''?that.CaseQuestion.age:that.Age,
        sex: that.SexData==''?that.CaseQuestion.sex:that.SexData,
        chiefComplaint: that.CaseQuestion.chiefComplaint,
        diagnosisJsonStr: that.CaseQuestion.diagnosisJson,
        pathogenesisJsonStr: that.CaseQuestion.pathogenesisJson,
        treatmentJsonStr: that.CaseQuestion.treatmentJson,
        drugJsonStr: that.CaseQuestion.drugJson,
        prescriptionJsonStr: that.CaseQuestion.prescriptionJson,
        questionExplain: that.CaseQuestion.questionExplain,
        diagnosisTipStr: that.CaseQuestion.diagnosisTip,
        pathogenesisTipStr: that.CaseQuestion.pathogenesisTip,
        treatmentTipStr: that.CaseQuestion.treatmentTip,
        drugTipStr: that.CaseQuestion.drugTip,
        prescriptionTipStr: that.CaseQuestion.prescriptionTip,
      }
      // console.log(data)
      that.$axios({
        url: that.$store.state.Q_http + 'case/updateCaseQuestion',
        method: 'post',
        data: data
      }).then((res) =>{
        // console.log(res.data)
        if (res.data.code == 200) {
          that.disabled = true
          that.$message({
            message: '保存成功！',
            type: 'success',
            duration: '1000'
          })
          that.FnData()
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
.Goback .el-button{
  padding:0;
  color:#333;
}
.Goback .el-button:hover{
  color:#BF8333;
}
.header{
  display: flex;
  padding:0 20px;
  margin-bottom:30px;
  margin-top:20px;
}
.header .input_box{
  flex:1;
}
.header .input_box p{
  color:#333;
  font-weight: bold;
  font-size:14px;
  margin-bottom:10px;
  margin-left:5px;
}
.header .input_box .el-input{
  width:215px;
}
.main{
  width:80%;
  padding:0 20px;
}
.main .input_box {
  margin-top:20px;
}
.main .input_box p{
  color:#333;
  font-weight: bold;
  font-size:14px;
  margin-bottom:10px;
  margin-left:5px;
}
.footer{
  display: flex;
  justify-content: center;
  margin-top:100px;
}
</style>
