<template>
  <div class="whole">
    <div class="header">
      <div class="time_box clear">
        <div style="float:left">
          <el-date-picker v-model="TimeData" type="daterange" format="yyyy - MM - dd" value-format="yyyy-MM-dd"
            range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" size="small">
          </el-date-picker>
          <el-input placeholder="题库ID" v-model="questionId" size="small" clearable></el-input>
          <el-input placeholder="班级号" v-model="className" size="small" clearable></el-input>
          <el-input placeholder="学号" v-model="studentNumber" size="small" clearable></el-input>
        </div>
        <div style="float:right">
          <el-button @click="clickSearch()" icon="el-icon-search" class="button" type="warning" size="small" plain>搜索</el-button>
          <el-button @click="clickReset()" icon="el-icon-refresh-left" class="button" type="warning" size="small" plain>重置</el-button>
          <el-button @click="clickExportFile()" icon="el-icon-upload2" class="button" type="warning" size="small" plain>导出</el-button>
        </div>
      </div>
      <div class="input_box">
        <el-input placeholder="学生姓名" v-model="userName" size="small" clearable></el-input>
        <el-input placeholder="考试名称" v-model="examinationName" size="small" clearable></el-input>
        <el-select v-show="SelectSystem=='原文实训'?true:false" v-model="courseId" filterable multiple collapse-tags
          clearable placeholder="课程" size="small">
          <el-option v-for="item in optionData.course" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-show="SelectSystem=='原文实训'?true:false" v-model="practiceDifficulty" filterable multiple collapse-tags
          clearable placeholder="难度" size="small">
          <el-option v-for="item in practiceDifficultyData" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-show="SelectSystem=='原文实训'?true:false" v-model="levelId" filterable multiple collapse-tags
          clearable placeholder="级别" size="small">
          <el-option v-for="item in optionData.level" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-show="SelectSystem=='案例实训'?true:false" v-model="categoryId" filterable multiple collapse-tags
          clearable placeholder="病症类别" size="small">
          <el-option v-for="item in optionData.Category" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="chapterId" filterable multiple collapse-tags
          clearable placeholder="章节" size="small">
          <el-option v-for="item in optionData.Chapter" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="patternType" filterable multiple collapse-tags
          clearable placeholder="模式" size="small">
          <el-option v-for="item in optionData.mod" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="main" ref="heights" v-if="heightCss== ''"></div>
    <div class="main" ref="heights" v-else>
      <el-table v-if="SelectSystem=='原文实训'" v-loading="loading" :data="AnswerData" border style="width:100%" :max-height="heightCss" size="small">
        <el-table-column align="center" prop="questionId" label="题库ID" width="70"></el-table-column>
        <el-table-column align="center" prop="submitOn" label="时间" width="130" :formatter="formatTime1"></el-table-column>
        <el-table-column align="center" prop="userName" label="姓名" width="70"></el-table-column>
        <el-table-column align="center" prop="className" label="班级号" width="70"></el-table-column>
        <el-table-column align="center" prop="studentNumber" label="学号" width="70"></el-table-column>
        <el-table-column align="center" prop="questionText" label="考试题目" width=""></el-table-column>
        <el-table-column align="center" prop="flagRight" label="结果" width="70"></el-table-column>
        <el-table-column align="center" prop="patternType" label="模式" width="110"></el-table-column>
        <el-table-column align="center" prop="courseValue" label="课程" width="70"></el-table-column>
        <el-table-column align="center" prop="levelValue" label="级别" width="70"></el-table-column>
        <el-table-column align="center" prop="chapterValue" label="章节" width="110"></el-table-column>
        <el-table-column align="center" prop="knowledgeValues" label="知识点" width="110"></el-table-column>
        <el-table-column align="center" prop="practiceDifficulty" label="难度" width="70" :formatter="formatTime2"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button @click="clickToView(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-else-if="SelectSystem=='案例实训'" v-loading="loading" :data="AnswerData" border style="width:100%" :max-height="heightCss" size="small">
        <el-table-column align="center" prop="questionId" label="题库ID" width="70"></el-table-column>
        <el-table-column align="center" prop="updateOn" label="时间" width="130"></el-table-column>
        <el-table-column align="center" prop="userName" label="姓名" width="70"></el-table-column>
        <el-table-column align="center" prop="className" label="班级号" width="70"></el-table-column>
        <el-table-column align="center" prop="studentNumber" label="学号" width="70"></el-table-column>
        <el-table-column align="center" prop="chiefComplaint" label="病症案例主诉" width=""></el-table-column>
        <el-table-column align="center" prop="flagRight" label="结果" width="70"></el-table-column>
        <el-table-column align="center" prop="patternType" label="模式" width="110"></el-table-column>
        <el-table-column align="center" prop="chapterId" label="章节" width="110"></el-table-column>
        <el-table-column align="center" prop="categoryId" label="病症类别" width="110"></el-table-column>
        <el-table-column align="center" prop="knowledgePointsIds" label="知识点" width="110"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button @click="clickToView(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="curPage" :page-sizes="[10, 50, 100]" :total="totalElements"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      heightCss: '',
      SelectSystem: this.$store.state.SelectSystem, // 当前选择哪个平台
      loading: false, // 页面加载
      curPage: 1, // 第几页
      pageSize: 10, // 每页几条
      totalElements: 0, // 分页全部数量
      AnswerData: [], // 学生答题数据
      TimeData: [], // 时间数据
      levelId: '', // 级别ID
      courseId: '', // 课程ID
      practiceDifficulty: '', // 难度
      practiceDifficultyData: [{
        id: '1',
        name: '一级'
      },{
        id: '2',
        name: '二级'
      },{
        id: '3',
        name: '三级'
      }],
      questionId: '', // 题库ID
      className: '', // 班级号
      userName: '', // 学生姓名
      studentNumber: '', // 学号
      examinationName: '', // 考试名称
      categoryId: '', // 已选病症类别ID
      chapterId: '', // 已选章节ID
      patternType: '', // 已选模式ID
      optionData: [], // 下拉框总数据数据（级别、章节、模式、课程、难度、模式）
    }
  },
  created() {
    let that = this
    if (that.$route.query.questionId) {
      that.questionId = that.$route.query.questionId
    }
    if (that.$route.query.studentNumber) {
      that.studentNumber = that.$route.query.studentNumber
    }
    if (that.$route.query.categoryId) {
      that.categoryId = that.$route.query.categoryId
    }
    if (that.$route.query.chapterId) {
      that.chapterId = that.$route.query.chapterId
    }
    if (that.$route.query.className) {
      that.className = that.$route.query.className
    }
    if (that.$route.query.examinationName) {
      that.examinationName = that.$route.query.examinationName
    }
    if (that.$route.query.mode) {
      that.patternType = that.$route.query.mode
    }
    if (that.$route.query.userName) {
      that.userName = that.$route.query.userName
    }
    if (that.$route.query.TimeData) {
      that.TimeData = that.$route.query.TimeData
    }
    if (that.$route.query.practiceDifficulty) {
      that.practiceDifficulty = that.$route.query.practiceDifficulty
    }
    if (that.$route.query.levelId) {
      that.levelId = that.$route.query.levelId
    }
    if (that.$route.query.courseId) {
      that.courseId = that.$route.query.courseId
    }
    that.clickSearch()
    that.FnOptionData()
  },
  mounted() {
    let that = this
    that.heightCss = parseInt(window.getComputedStyle(that.$refs.heights).height)
  },
  methods: {
    // 监听函数区域
    handleSizeChange(val) { // 共多少页
      let that = this
      that.pageSize = val
      that.clickSearch()
    },
    handleCurrentChange(val) { // 每页几条
      let that = this
      that.curPage = val
      that.clickSearch()
    },

    // 点击函数区域
    clickSearch() { // 点击搜索
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'originalReport/queryOriginalStudentAnswerPage',
          method: 'post',
          data: {
            startDate: that.TimeData[0]?that.TimeData[0]:'',
            endDate: that.TimeData[1]?that.TimeData[1]:'',
            questionId: that.questionId,
            userName: that.userName,
            className: that.className,
            studentNumber: that.studentNumber,
            examinationName: that.examinationName,
            levelIds: that.levelId.toString(),
            courseIds: that.courseId.toString(),
            practiceDifficultys: that.practiceDifficulty.toString(),
            chapterIds: that.chapterId.toString(),
            patternTypes: that.patternType.toString(),
            curPage: that.curPage,
            pageSize: that.pageSize
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loading = false
            for(var i = 0; i < res.data.data.elements.length; i++){
              if (res.data.data.elements[i].flagRight == 1) {
                res.data.data.elements[i].flagRight = '正确'
              } else {
                res.data.data.elements[i].flagRight = '错误'
              }
              if (res.data.data.elements[i].patternType == 1) {
                res.data.data.elements[i].patternType = '自由练习模式'
              } else if (res.data.data.elements[i].patternType == 2) {
                res.data.data.elements[i].patternType = '课堂练习模式'
              } else {
                res.data.data.elements[i].patternType = '考试模式'
              }
            }
            that.totalElements = res.data.data.totalElements
            that.AnswerData = res.data.data.elements
          } else {
            that.loading = false
          }
        }).catch((err) =>{
          that.loading = false
          that.$message.error('请求失败!')
        })
      } else if (that.SelectSystem == '案例实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'caseExamination/queryQuestionDescriptionTwo',
          method: 'post',
          data: {
            startDate: that.TimeData[0]?that.TimeData[0]:'',
            endDate: that.TimeData[1]?that.TimeData[1]:'',
            questionId: that.questionId,
            userName: that.userName,
            className: that.className,
            studentNumber: that.studentNumber,
            examinationName: that.examinationName,
            chapterId: that.chapterId.toString(),
            categoryId: that.categoryId.toString(),
            mode: that.patternType.toString(),
            curPage: that.curPage,
            pageSize: that.pageSize
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loading = false
            that.totalElements = res.data.data.count
            that.AnswerData = res.data.data.datalist
          } else {
            that.loading = false
          }
        }).catch((err) =>{
          that.loading = false
          that.$message.error('请求失败!')
        })
      }
    },
    clickReset() { // 点击重置
      let that = this
      that.TimeData = [] // 清空时间筛选条件
      that.questionId = '', // 题库ID
      that.className = '', // 班级号
      that.userName = '', // 学生姓名
      that.studentNumber = '', // 学号
      that.examinationName = '', // 考试名称
      that.categoryId = '', // 病症类别ID
      that.chapterId = '', // 章节ID
      that.patternType = '', // 模式ID
      that.practiceDifficulty = '' // 难度
      that.courseId = '' // 课程
      that.levelId = '' // 级别
      that.$message({
        message: '重置成功~',
        type: 'success',
        duration: '1000'
      })
      that.clickSearch()
    },
    clickExportFile() { // 点击导出文件
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'originalReport/exportOriginalStudentAnswer',
          method: 'post',
          responseType: 'blob',
          data: {
            startDate: that.TimeData[0]?that.TimeData[0]:'',
            endDate: that.TimeData[1]?that.TimeData[1]:'',
            questionId: that.questionId,
            userName: that.userName,
            className: that.className,
            studentNumber: that.studentNumber,
            examinationName: that.examinationName,
            chapterIds: that.chapterId.toString(),
            levelIds: that.levelId.toString(),
            courseIds: that.courseId.toString(),
            practiceDifficultys: that.practiceDifficulty.toString(),
            patternTypes: that.patternType.toString(),
          }
        }).then((res) =>{
          // console.log(res)
          const blob = new Blob([res.data])
          var date = new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日"
          const fileName = "学生答题数据(" + date +").xlsx"
          if ("download" in document.createElement("a")) { // 非IE下载
            const elink = document.createElement("a")
            elink.download = fileName
            elink.style.display = "none"
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href)
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        })
      } else if (that.SelectSystem == '案例实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'caseExamination/queryQuestionDescriptionTwoExcel',
          method: 'post',
          responseType: 'blob',
          data: {
            startDate: that.TimeData[0]?that.TimeData[0]:'',
            endDate: that.TimeData[1]?that.TimeData[1]:'',
            questionId: that.questionId,
            userName: that.userName,
            className: that.className,
            studentNumber: that.studentNumber,
            examinationName: that.examinationName,
            chapterId: that.chapterId.toString(),
            categoryId: that.categoryId.toString(),
            mode: that.patternType.toString(),
          }
        }).then((res) =>{
          // console.log(res)
          const blob = new Blob([res.data])
          var date = new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日"
          const fileName = "学生答题数据(" + date +").xlsx"
          if ("download" in document.createElement("a")) { // 非IE下载
            const elink = document.createElement("a")
            elink.download = fileName
            elink.style.display = "none"
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href)
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        })
      }
    },
    clickToView(e) { // 点击查看
      let that = this
      let parameter = {}
      if (that.SelectSystem == '原文实训') {
        parameter = { id: e.id , userId: e.userId }
      } else if (that.SelectSystem == '案例实训') {
        parameter = { questionId: e.questionId , userId: e.userId , examinationId: e.examinationId }
      }
      that.$router.replace({
        path:'/AnswerDetails',
        query: parameter
      })
    },

    // 执行函数区域
    FnOptionData() { // 请求下拉筛选条件数据（知识点、章节、病症类别、模式）
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Y_http + 'originalType/queryOriginalTypeByTypeNew',
          method: 'post',
        }).then((res) =>{
          console.log(res.data.data)
          if (res.data.code == 200) {
            that.optionData = res.data.data
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      } else if (that.SelectSystem == '案例实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'caseExamination/queryCaseExamQuestionBefore',
          method: 'post',
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.optionData = res.data.data
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      } else {}
    },
    formatTime1(row) { // 时间戳转换
      let date = new Date(parseInt(row.submitOn))
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':'
      var m = (date.getMinutes()+1 < 10 ? '0'+(date.getMinutes()+1) : date.getMinutes()+1)
      return Y + M + D + h + m
    },
    formatTime2(row) {
      let date = row.practiceDifficulty + '级'
      return date
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-button--text{
  color: #BF8333;
}
.header{
  box-sizing: border-box;
  padding:10px 0;
}
.time_box .el-input{
  width:180px;
  margin-left:10px;
}
.input_box{
  margin-top:20px;
  display: flex;
}
.input_box .el-input,.el-select{
  margin-right:20px;
  flex: 1;
}
.input_box :last-child{
  margin-right:0px;
}
.main{
  width:100%;
  height: calc(100vh - 285px);
  box-sizing: border-box;
  margin-top:20px;
}
.footer{
  position:fixed;
  left:34%;
  bottom:10px;
}
</style>
