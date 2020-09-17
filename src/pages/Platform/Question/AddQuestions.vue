<template>
  <el-main class="whole">
    <div class="Goback">
      <el-button type="text" icon="el-icon-arrow-left" @click="GoBack">返回</el-button>
    </div>
    <div v-if="SelectSystem=='原文实训'">
      <div class="original">
        <div class="input_box">
          <p>课程</p>
          <el-select @visible-change="clickvisible($event,2)" v-model="courseId" placeholder="请选择课程" size="small" clearable>
            <el-option v-for="item in course" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="input_box">
          <p>级别</p>
          <el-select @visible-change="clickvisible($event,1)" v-model="levelId" placeholder="请选择级别" size="small" clearable>
            <el-option v-for="item in level" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="input_box">
          <p>章节</p>
          <el-select @visible-change="clickvisible($event,3)" v-model="chapterId" placeholder="请选择章节" size="small" clearable>
            <el-option v-for="item in chapter" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="input_box">
          <p>知识点</p>
          <el-select @visible-change="clickvisible($event,4)" filterable multiple collapse-tags
            v-model="knowledgeIds" placeholder="请选择知识点" size="small" clearable>
            <el-option v-for="item in knowledge" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="main">
        <div class="input_box">
          <p>考试题目</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.optionText" placeholder="请输入考试题目" size="small"></el-input>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="header">
        <div class="input_box">
          <p>章节</p>
          <el-select @visible-change="clickvisible($event,1)" v-model="chapterId" placeholder="请选择章节" size="small" clearable>
            <el-option v-for="item in chapter" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="input_box">
          <p>病症类别</p>
          <el-select @visible-change="clickvisible($event,2)" v-model="categoryId" placeholder="请选择病症类别" size="small" clearable>
            <el-option v-for="item in category" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="input_box"></div>
        <div class="input_box"></div>
      </div>
      <div class="header">
        <div class="input_box">
          <p>知识点</p>
          <el-select @visible-change="clickvisible($event,3)" filterable multiple collapse-tags
            v-model="knowledgeIds" placeholder="请选择知识点" size="small" clearable>
            <el-option v-for="item in knowledge" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="input_box">
          <p>年龄</p>
          <el-input v-model="Age" placeholder="请输入年龄" size="small" clearable></el-input>
        </div>
        <div class="input_box">
          <p>性别</p>
          <el-select v-model="SexData" placeholder="请选择性别" size="small" clearable>
            <el-option v-for="item in sex" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="input_box"></div>
      </div>
      <div class="main">
        <div class="input_box">
          <p>病症案例主诉</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.chiefComplaint" placeholder="请输入病症案例主诉" size="small"></el-input>
        </div>
        <div class="input_box">
          <p>试题解析</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.questionExplain" placeholder="请输入试题解析" size="small"></el-input>
        </div>
        <div class="input_box" v-if="SelectSystem=='问诊实训'">
          <p>兼夹症</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.interroJsonStr" placeholder="请输入兼夹症" size="small"></el-input>
        </div>
        <div class="input_box" v-if="SelectSystem=='问诊实训'">
          <p>问诊提示语</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.interroTipStr" placeholder="请输入问诊提示语" size="small"></el-input>
        </div>
        <div class="input_box">
          <p>诊断</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.diagnosisJsonStr" placeholder="请输入诊断" size="small"></el-input>
        </div>
        <div class="input_box">
          <p>诊断提示</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.diagnosisTipStr" placeholder="请输入诊断提示" size="small"></el-input>
        </div>
        <div class="input_box">
          <p>病机</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.pathogenesisJsonStr" placeholder="请输入病机" size="small"></el-input>
        </div>
        <div class="input_box">
          <p>病机提示</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.pathogenesisTipStr" placeholder="请输入病机提示" size="small"></el-input>
        </div>
        <div class="input_box">
          <p>治法</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.treatmentJsonStr" placeholder="请输入治法" size="small"></el-input>
        </div>
        <div class="input_box">
          <p>治法提示</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.treatmentTipStr" placeholder="请输入治法提示" size="small"></el-input>
        </div>
        <div class="input_box">
          <p>处方</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.drugJsonStr" placeholder="请输入处方" size="small"></el-input>
        </div>
        <div class="input_box">
          <p>处方提示</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.drugTipStr" placeholder="请输入处方提示" size="small"></el-input>
        </div>
        <div class="input_box">
          <p>药物</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.prescriptionJsonStr" placeholder="请输入药物" size="small"></el-input>
        </div>
        <div class="input_box">
          <p>药物提示</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.prescriptionTipStr" placeholder="请输入药物提示" size="small"></el-input>
        </div>
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
      SelectSystem: this.$store.state.SelectSystem, // 当前选择哪个平台
      chapter: '', // 章节
      chapterId: '', // 已选章节ID
      category: '', // 病症类别
      categoryId: '', // 已选病症类别ID
      knowledge: '', // 知识点
      knowledgeIds: '', // 已选知识点ID
      level: '', // 级别
      levelId: '', // 已选级别ID
      course: '', // 课程
      courseId: '', // 已选课程ID
      CaseQuestion: {
        optionText: '',
        questionExplain: '',
        chiefComplaint: '',
        interroJsonStr: '',
        interroTipStr: '',
        diagnosisJsonStr: '',
        diagnosisTipStr: '',
        pathogenesisJsonStr: '',
        pathogenesisTipStr: '',
        treatmentJsonStr: '',
        treatmentTipStr: '',
        drugJsonStr: '',
        drugTipStr: '',
        prescriptionJsonStr: '',
        prescriptionTipStr: '',
      }, // 题库总数据数据
      sex: [{
        name: '男', id: 1
      },{
        name: '女', id: 2
      }],
      SexData: '', // 已选性别
      Age: '', // 年龄
    }
  },
  methods: {
    GoBack() { // 点击返回
      this.$router.replace({path:'/Question'})
    },
    clickvisible(e,value) { // 点击下拉框选择章节、知识点、类别
      let that = this
      if (e == true) {
        if (that.SelectSystem == '原文实训') {
          that.$axios({
            url: that.$store.state.Y_http + 'originalType/queryOriginalTypeByType',
            method: 'post',
            data: {
              type: value
            }
          }).then((res) =>{
            // console.log(res.data)
            if (res.data.code == 200) {
              if (value == 1) {
                that.level = res.data.data
              } else if (value == 2) {
                that.course = res.data.data
              } else if (value == 3) {
                that.chapter = res.data.data
              } else if (value == 4){
                that.knowledge = res.data.data
              }
            }
          }).catch((err) =>{
            that.$message.error('请求失败!')
          })
        } else {
          let url = ''
          if (that.SelectSystem == '案例实训') {
            url = that.$store.state.Q_http + 'caseType/getCaseTypeList'
          } else if (that.SelectSystem == '问诊实训') {
            url = that.$store.state.Q_http + 'interroType/getInterroTypeList'
          }
          that.$axios({
            url: url,
            method: 'post',
            data: { type: value }
          }).then((res) =>{
            // console.log(res.data)
            if (res.data.code == 200) {
              if (value == 1) {
                that.chapter = res.data.data
              } else if (value == 2) {
                that.category = res.data.data
              } else if (value == 3) {
                that.knowledge =  res.data.data
              }
            }
          }).catch((err) =>{
            that.$message.error('请求失败!')
          })
        }
      }
    },
    clickPreserva() { // 点击保存
      let that = this
      if (that.SelectSystem == '原文实训') {
        if (!that.courseId) {
          that.$message({
            message: '请选择课程', type: 'warning'
          })
          return
        }
        if (!that.levelId) {
          that.$message({
            message: '请选择级别', type: 'warning'
          })
          return
        }
        if (!that.chapterId) {
          that.$message({
            message: '请选择章节', type: 'warning'
          })
          return
        }
        if (!that.knowledgeIds.toString()) {
          that.$message({
            message: '请选择知识点', type: 'warning'
          })
          return
        }
        if (!that.CaseQuestion.optionText) {
          that.$message({
            message: '请填写考试题目', type: 'warning'
          })
          return
        }
        that.$axios({
          url: that.$store.state.Q_http + 'original/createOriginalQuestion',
          method: 'post',
          data: {
            optionText: that.CaseQuestion.optionText,
            chapterId: that.chapterId,
            courseId: that.courseId,
            levelId: that.levelId,
            knowledgeIds: that.knowledgeIds.toString(),
          }
        }).then((res) =>{
          // console.log(res.data)
          if (res.data.code == 200) {
            that.$message({
              message: '创建成功！',
              type: 'success',
              duration: '1000'
            })
            that.GoBack()
          } else {
            that.$message.error(res.data.message)
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      } else {
        if (!that.chapterId) {
          that.$message({
            message: '请选择章节', type: 'warning'
          })
          return
        }
        if (!that.categoryId) {
          that.$message({
            message: '请选择病症类别', type: 'warning'
          })
          return
        }
        if (!that.knowledgeIds.toString()) {
          that.$message({
            message: '请选择知识点', type: 'warning'
          })
          return
        }
        if (!that.CaseQuestion.chiefComplaint) {
          that.$message({
            message: '请填写案例主诉', type: 'warning'
          })
          return
        }
        let url = ''
        let data = {}
        if (that.SelectSystem == '案例实训') {
          url = that.$store.state.Q_http + 'case/createCaseQuestion'
          data = {
            chapterId: that.chapterId,
            categoryId: that.categoryId,
            knowledgePointsIds: that.knowledgeIds.toString(),
            age: that.Age,
            sex: that.SexData,
            chiefComplaint: that.CaseQuestion.chiefComplaint,
            questionExplain: that.CaseQuestion.questionExplain,
            diagnosisJsonStr: that.CaseQuestion.diagnosisJsonStr,
            diagnosisTipStr: that.CaseQuestion.diagnosisTipStr,
            pathogenesisJsonStr: that.CaseQuestion.pathogenesisJsonStr,
            pathogenesisTipStr: that.CaseQuestion.pathogenesisTipStr,
            treatmentJsonStr: that.CaseQuestion.treatmentJsonStr,
            treatmentTipStr: that.CaseQuestion.treatmentTipStr,
            drugJsonStr: that.CaseQuestion.drugJsonStr,
            drugTipStr: that.CaseQuestion.drugTipStr,
            prescriptionJsonStr: that.CaseQuestion.prescriptionJsonStr,
            prescriptionTipStr: that.CaseQuestion.prescriptionTipStr,
          }
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interro/createInterroQuestion'
          data = {
            chapterId: that.chapterId,
            categoryId: that.categoryId,
            knowledgePointsIds: that.knowledgeIds.toString(),
            age: that.Age,
            sex: that.SexData,
            chiefComplaint: that.CaseQuestion.chiefComplaint,
            questionExplain: that.CaseQuestion.questionExplain,
            interroJsonStr: that.CaseQuestion.interroJsonStr,
            interroTipStr: that.CaseQuestion.interroTipStr,
            diagnosisJsonStr: that.CaseQuestion.diagnosisJsonStr,
            diagnosisTipStr: that.CaseQuestion.diagnosisTipStr,
            pathogenesisJsonStr: that.CaseQuestion.pathogenesisJsonStr,
            pathogenesisTipStr: that.CaseQuestion.pathogenesisTipStr,
            treatmentJsonStr: that.CaseQuestion.treatmentJsonStr,
            treatmentTipStr: that.CaseQuestion.treatmentTipStr,
            drugJsonStr: that.CaseQuestion.drugJsonStr,
            drugTipStr: that.CaseQuestion.drugTipStr,
            prescriptionJsonStr: that.CaseQuestion.prescriptionJsonStr,
            prescriptionTipStr: that.CaseQuestion.prescriptionTipStr,
          }
        }
        that.$axios({
          url: url,
          method: 'post',
          data: data
        }).then((res) =>{
          // console.log(res.data)
          if (res.data.code == 200) {
            that.$message({
              message: '保存成功！',
              type: 'success',
              duration: '1000'
            })
            that.GoBack()
          } else {
            that.$message.error(res.data.message)
          }
        }).catch((err) =>{
          that.$message.error('新增格式错误!')
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-tag.el-tag--info{
  max-width:60%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
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
  box-sizing: border-box;
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

/* 原文样式 */
.original{
  padding:0 20px;
  margin-bottom:30px;
  margin-top:20px;
  box-sizing: border-box;
}
.original .input_box{
  margin-top:30px;
  width:80%;
  position: relative;
}
.original .input_box p{
  color:#333;
  font-weight: bold;
  font-size:14px;
  margin-bottom:10px;
}
.original .input_box span{
  color:#BF8333;
  cursor:pointer;
  position: absolute;
  top:0;
  right:0;
  font-size:14px;
  font-weight:bold;
}
</style>
