<template>
  <el-main class="whole">
    <div class="Goback">
      <el-button type="text" icon="el-icon-arrow-left" @click="GoBack">返回</el-button>
    </div>
    <div v-if="SelectSystem=='原文实训'">
      <div class="original">
        <div class="input_box">
          <p>课程</p>
          <el-select @visible-change="clickvisible($event,2)" v-model="courseId"
          :placeholder="CaseQuestion.courseName" size="small" :disabled="disabled" clearable>
            <el-option v-for="item in course" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
          <span v-if="IsAdmin == 1" @click="clickEdit()">编辑</span>
        </div>
        <div class="input_box">
          <p>级别</p>
          <el-select @visible-change="clickvisible($event,1)" v-model="levelId"
          :placeholder="CaseQuestion.levelName" size="small" :disabled="disabled" clearable>
            <el-option v-for="item in level" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="input_box">
          <p>章节</p>
          <el-select @visible-change="clickvisible($event,3)" v-model="chapterId"
          :placeholder="CaseQuestion.chapterName" size="small" :disabled="disabled" clearable>
            <el-option v-for="item in chapter" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="input_box">
          <p>知识点</p>
          <el-select @visible-change="clickvisible($event,4)" filterable multiple collapse-tags
            v-model="knowledgeIds" :placeholder="CaseQuestion.knowledgeNames" size="small" :disabled="disabled" clearable>
            <el-option v-for="item in knowledge" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="main">
        <div class="input_box">
          <p>考试题目</p>
          <el-input type="textarea" autosize v-model="CaseQuestion.optionText" size="small" clearable :disabled="disabled"></el-input>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="header">
        <div class="input_box">
          <p>章节</p>
          <el-select @visible-change="clickvisible($event,1)" v-model="chapterId"
          :placeholder="CaseQuestion.chapterName" size="small" :disabled="disabled" clearable>
            <el-option v-for="item in chapter" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="input_box">
          <p>病症类别</p>
          <el-select @visible-change="clickvisible($event,2)" v-model="categoryId"
          :placeholder="CaseQuestion.categoryName" size="small" :disabled="disabled" clearable>
            <el-option v-for="item in category" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="input_box"></div>
        <div v-if="IsAdmin == 1" class="input_box"><p style="color:#BF8333;cursor:pointer" @click="clickEdit()">编辑</p></div>
      </div>
      <div class="header">
        <div class="input_box">
          <p>知识点</p>
          <el-select @visible-change="clickvisible($event,3)" filterable multiple collapse-tags
            v-model="knowledgeIds" :placeholder="CaseQuestion.knowledgeName" size="small" :disabled="disabled" clearable>
            <el-option v-for="item in knowledge" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="input_box">
          <p>年龄</p>
          <el-input v-model="Age" :placeholder="CaseQuestion.age" size="small" :disabled="disabled" clearable></el-input>
        </div>
        <div class="input_box">
          <p>性别</p>
          <el-select v-model="SexData" :placeholder="CaseQuestion.sex==0?'女':'男'" size="small" :disabled="disabled" clearable>
            <el-option v-for="item in sex" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="input_box"></div>
      </div>
      <div class="main">
        <div class="input_box">
          <p>病症案例主诉</p>
          <el-input type="textarea" maxlength="500" autosize v-model="CaseQuestion.chiefComplaint" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
        </div>
        <div class="input_box" v-if="SelectSystem=='问诊实训'">
          <p>兼夹症</p>
          <el-input type="textarea" maxlength="500" autosize v-model="CaseQuestion.interroJson" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
        </div>
        <div class="input_box" v-if="SelectSystem=='问诊实训'">
          <p>问诊提示语</p>
          <el-input type="textarea" maxlength="500" autosize v-model="CaseQuestion.interroTip" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
        </div>
        <div class="input_box">
          <p>诊断</p>
          <el-input type="textarea" maxlength="500" autosize v-model="CaseQuestion.diagnosisJson" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
        </div>
        <div class="input_box">
          <p>诊断提示</p>
          <el-input type="textarea" maxlength="500" autosize v-model="CaseQuestion.diagnosisTip" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
        </div>
        <div class="input_box">
          <p>病机</p>
          <el-input type="textarea" maxlength="500" autosize v-model="CaseQuestion.pathogenesisJson" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
        </div>
        <div class="input_box">
          <p>病机提示</p>
          <el-input type="textarea" maxlength="500" autosize v-model="CaseQuestion.pathogenesisTip" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
        </div>
        <div class="input_box">
          <p>治法</p>
          <el-input type="textarea" maxlength="500" autosize v-model="CaseQuestion.treatmentJson" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
        </div>
        <div class="input_box">
          <p>治法提示</p>
          <el-input type="textarea" maxlength="500" autosize v-model="CaseQuestion.treatmentTip" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
        </div>
        <div class="input_box">
          <p>处方</p>
          <el-input type="textarea" maxlength="500" autosize v-model="CaseQuestion.drugJson" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
        </div>
        <div class="input_box">
          <p>处方提示</p>
          <el-input type="textarea" maxlength="500" autosize v-model="CaseQuestion.drugTip" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
        </div>
        <div class="input_box">
          <p>药物</p>
          <el-input type="textarea" maxlength="500" autosize v-model="CaseQuestion.prescriptionJson" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
        </div>
        <div class="input_box">
          <p>药物提示</p>
          <el-input type="textarea" maxlength="500" autosize v-model="CaseQuestion.prescriptionTip" placeholder="请输入内容" size="small" :disabled="disabled"></el-input>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button :disabled="disabled" type="warning" @click="clickPreserva()">保存</el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      IsAdmin: this.$store.state.loginData.user.isAdmin, // 是否为管理员
      SelectSystem: this.$store.state.SelectSystem, // 当前选择哪个平台
      disabled: true, // 页面禁用属性
      id: this.$route.query.id, // 页面传参ID
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
      CaseQuestion: '', // 题库总数据数据
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
      let data = {}
      let url = ''
      if (that.SelectSystem == '原文实训') {
        url = that.$store.state.Q_http + 'original/getQuestionId'
        data = {
          questionId: that.id,
        }
      } else if (that.SelectSystem == '案例实训') {
        url = that.$store.state.Q_http + 'case/getCaseQuestion'
        data = {
          id: that.id,
        }
      } else if (that.SelectSystem == '问诊实训') {
        url = that.$store.state.Q_http + 'interro/getInterroQuestion'
        data = {
          id: that.id,
        }
      }
      that.$axios({
        url: url,
        method: 'post',
        data: data
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
        if (!that.CaseQuestion.optionText) {
          that.$message({
            message: '请填写考试题目', type: 'warning'
          })
          return
        }
        that.$axios({
          url: that.$store.state.Q_http + 'original/updateOriginalQuestion',
          method: 'post',
          data: {
            questionId: that.id,
            optionText: that.CaseQuestion.optionText,
            chapterId: that.chapterId==''?that.CaseQuestion.chapterId:that.chapterId,
            courseId: that.courseId==''?that.CaseQuestion.courseId:that.courseId,
            levelId: that.levelId==''?that.CaseQuestion.levelId:that.levelId,
            knowledgeIds: that.knowledgeIds.toString()==''?that.CaseQuestion.knowledgeIds:that.knowledgeIds.toString(),
          }
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
          } else {
            that.$message.error(res.data.message)
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      } else if (that.SelectSystem == '案例实训') {
        if (!that.CaseQuestion.chiefComplaint) {
          that.$message({
            message: '请填写案例主诉', type: 'warning'
          })
          return
        }
        if (!that.CaseQuestion.prescriptionJson) {
          that.$message({
            message: '请填写药物', type: 'warning'
          })
          return
        }
        that.$axios({
          url: that.$store.state.Q_http + 'case/updateCaseQuestion',
          method: 'post',
          data: {
            id: that.id,
            chapterId: that.chapterId==''?that.CaseQuestion.chapterId:that.chapterId,
            categoryId: that.categoryId==''?that.CaseQuestion.categoryId:that.categoryId,
            knowledgePointsIds: that.knowledgeIds.toString()==''?that.CaseQuestion.knowledgePointsIds:that.knowledgeIds.toString(),
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
          } else {
            that.$message.error(res.data.message)
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      } else if (that.SelectSystem == '问诊实训') {
        if (!that.CaseQuestion.chiefComplaint) {
          that.$message({
            message: '请填写案例主诉', type: 'warning'
          })
          return
        }
        if (!that.CaseQuestion.interroJson) {
          that.$message({
            message: '请填写兼夹症', type: 'warning'
          })
          return
        }
        if (!that.CaseQuestion.prescriptionJson) {
          that.$message({
            message: '请填写药物', type: 'warning'
          })
          return
        }
        that.$axios({
          url: that.$store.state.Q_http + 'interro/updateInterroQuestion',
          method: 'post',
          data: {
            id: that.id,
            chapterId: that.chapterId==''?that.CaseQuestion.chapterId:that.chapterId,
            categoryId: that.categoryId==''?that.CaseQuestion.categoryId:that.categoryId,
            knowledgePointsIds: that.knowledgeIds.toString()==''?that.CaseQuestion.knowledgePointsIds:that.knowledgeIds.toString(),
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
            interroJsonStr: that.CaseQuestion.interroJson,
            interroTipStr: that.CaseQuestion.interroTip,
          }
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
          } else {
            that.$message.error(res.data.message)
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
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
.el-tag.el-tag--info i{
  display:none;
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
  width:90%;
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
