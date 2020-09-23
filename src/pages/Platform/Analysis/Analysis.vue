<template>
  <div class="whole">
    <div class="header">
      <div class="time_box">
        <el-date-picker style="margin-right:10px" v-model="TimeData" type="daterange" format="yyyy - MM - dd" value-format="yyyy-MM-dd"
          range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" size="small">
        </el-date-picker>
        <el-input placeholder="题库ID" v-model="questionId" size="small" clearable></el-input>
        <el-input placeholder="班级号" v-model="className" size="small" clearable></el-input>
        <el-input placeholder="学号" v-model="studentNumber" size="small" clearable></el-input>
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
        <el-select v-show="SelectSystem!='原文实训'?true:false" v-model="categoryId" filterable multiple collapse-tags
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
        <el-button @click="clickSearch()" icon="el-icon-search" class="button" type="warning" size="small" plain>搜索</el-button>
        <el-button @click="clickReset()" icon="el-icon-refresh-left" class="button" type="warning" size="small" plain>重置</el-button>
        <el-button @click="clickExportFile()" icon="el-icon-upload2" class="button" type="warning" size="small" plain>导出</el-button>
      </div>
    </div>
    <div class="main" ref="heights" v-if="heightCss== ''"></div>
    <div class="main" ref="heights" v-else>
      <el-table v-if="SelectSystem=='原文实训'" v-loading="loading" :data="AnalysisData" :default-sort="{prop:'wrongRate',order:'ascending'}"
        border style="width:100%" :max-height="heightCss" size="small" @sort-change="sortChange">
        <el-table-column align="center" prop="id" label="题库ID" width="80"></el-table-column>
        <el-table-column align="center" prop="wrongRate" label="错误率" width="90" sortable="custom"></el-table-column>
        <el-table-column align="center" prop="rightNum" label="正确个数" width="80"></el-table-column>
        <el-table-column align="center" prop="wrongNum" label="错误个数" width="80"></el-table-column>
        <el-table-column align="center" prop="courseValue" label="课程" width="120"></el-table-column>
        <el-table-column align="center" prop="levelValue" label="级别" width="120"></el-table-column>
        <el-table-column align="center" prop="chapterValue" label="章节" width="120"></el-table-column>
        <el-table-column align="center" prop="knowledgeValues" label="知识点" width="120"></el-table-column>
        <el-table-column align="center" prop="optionText" label="考试题目" width=""></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button @click="clickToView(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-else v-loading="loading" :data="AnalysisData" :default-sort="{prop:'flagAvgScore',order:'ascending'}"
        border style="width:100%" :max-height="heightCss" size="small" @sort-change="sortChange">
        <el-table-column align="center" prop="questionId" label="题库ID" width="80"></el-table-column>
        <el-table-column align="center" prop="flagAvgScore" label="平均分" width="90" sortable="custom"></el-table-column>
        <el-table-column align="center" prop="flagRight" label="正确个数" width="80"></el-table-column>
        <el-table-column align="center" prop="flagWrong" label="错误个数" width="80"></el-table-column>
        <el-table-column align="center" prop="chapterId" label="章节" width="120"></el-table-column>
        <el-table-column align="center" prop="categoryId" label="病症类别" width="120"></el-table-column>
        <el-table-column align="center" prop="knowledgePointsIds" label="知识点" width="120"></el-table-column>
        <el-table-column align="center" prop="chiefComplaint" label="病症案例主诉" width=""></el-table-column>
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
  </div>
</template>

<script>
export default {
  name: 'whole',
  inject:['appendData'],
  data () {
    return {
      heightCss: '',
      SelectSystem: this.$store.state.SelectSystem, // 当前选择哪个平台
      loading: false, // 页面加载
      curPage: 1, // 第几页
      pageSize: 10, // 每页几条
      sortColumn: 'flag_avg_score', // 排序字段
      sortType: '', // 排序方式
      totalElements: 0, // 分页全部数量
      AnalysisData: [], // 试题分析数据
      TimeData: [], // 时间数据
      questionId: '', // 题库ID
      className: '', // 班级号
      userName: '', // 学生姓名
      studentNumber: '', // 学号
      examinationName: '', // 考试名称
      categoryId: '', // 已选病症类别ID
      chapterId: '', // 已选章节ID
      patternType: '', // 已选模式ID
      courseId: '', // 已选课程ID
      levelId: '', // 已选级别ID
      practiceDifficulty: '', // 已选难度
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
      optionData: [], // 下拉框总数据数据（级别、章节、模式、课程、难度）
    }
  },
  created() {
    let that = this
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
    sortChange(column) { // 排序监听
      let that = this
      // console.log(column.order)
      if (column.order == 'ascending') {
        that.sortType = 0
        that.clickSearch()
      } else if (column.order == 'descending') {
        that.sortType = 1
        that.clickSearch()
      }
    },

    // 点击函数区域
    clickSearch() { // 点击搜索
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'originalReport/queryOriginalExaminationAnalysePage',
          method: 'post',
          data: {
            startDate: that.TimeData[0]?that.TimeData[0]:'',
            endDate: that.TimeData[1]?that.TimeData[1]:'',
            questionId: that.questionId,
            userName: that.userName,
            className: that.className,
            studentNumber: that.studentNumber,
            examinationName: that.examinationName,
            chapterIds: that.chapterId.toString(),
            patternTypes: that.patternType.toString(),
            courseIds: that.courseId.toString(),
            levelIds: that.levelId.toString(),
            practiceDifficultys: that.practiceDifficulty.toString(),
            curPage: that.curPage,
            pageSize: that.pageSize,
            sortType: that.sortType
          }
        }).then((res) =>{
          // console.log(res.data.data.elements)
          if (res.data.code == 200) {
            that.loading = false
            that.totalElements = res.data.data.totalElements
            that.AnalysisData = res.data.data.elements
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
          url = that.$store.state.Q_http + 'caseExamination/queryQuestionDescriptionOne'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroExamination/queryQuestionDescriptionOne'
        }
        that.$axios({
          url: url,
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
            pageSize: that.pageSize,
            sortColumn: that.sortColumn,
            orderBy: that.sortType===0?2:that.sortType
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loading = false
            that.totalElements = res.data.data.count
            that.AnalysisData = res.data.data.datalist
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
      that.sortType = ''
      that.curPage = 1
      that.pageSize = 10
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
          url: that.$store.state.Q_http + 'originalReport/exportOriginalExaminationAnalyse',
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
            courseIds: that.courseId.toString(),
            chapterIds: that.chapterId.toString(),
            levelIds: that.levelId.toString(),
            patternTypes: that.patternType.toString(),
            practiceDifficultys: that.practiceDifficulty.toString(),
            sortType: that.sortType
          }
        }).then((res) =>{
          // console.log(res)
          that.$message({
            message: '导出成功~',
            type: 'success',
            duration: '1000'
          })
          const blob = new Blob([res.data])
          var date = new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日"
          const fileName = "试题分析列表" + date +".xlsx"
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
      } else {
        let url = ''
        if (that.SelectSystem == '案例实训') {
          url = that.$store.state.Q_http + 'caseExamination/queryQuestionDescriptionOneExcel'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroExamination/queryQuestionDescriptionOneExcel'
        }
        that.$axios({
          url: url,
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
            sortColumn: that.sortColumn,
            orderBy: that.sortType==0?'2':1
          }
        }).then((res) =>{
          // console.log(res)
          that.$message({
            message: '导出成功~',
            type: 'success',
            duration: '1000'
          })
          const blob = new Blob([res.data])
          var date = new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日"
          const fileName = "试题分析列表" + date +".xlsx"
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
      if (that.SelectSystem == '原文实训') {
        that.$store.state.tabList = [
          {text:'课堂管理',route:'/Administration',class:'NoChoice',icon:'el-icon-s-home'},
          {text:'考试成绩查询',route:'/ScoreQuery',class:'NoChoice',icon:'el-icon-s-data'},
          {text:'试题分析',route:'/Analysis',class:'NoChoice',icon:'el-icon-s-flag'},
          {text:'学生答题数据',route:'/AnswerData',class:'Choice',icon:'el-icon-s-claim'},
          {text:'题库管理',route:'/Question',class:'NoChoice',icon:'el-icon-menu'},
        ]
      } else {
        that.$store.state.tabList = [
          {text:'课堂管理',route:'/Administration',class:'NoChoice',icon:'el-icon-s-home'},
          {text:'考试成绩查询',route:'/ScoreQuery',class:'NoChoice',icon:'el-icon-s-data'},
          {text:'试题分析',route:'/Analysis',class:'NoChoice',icon:'el-icon-s-flag'},
          {text:'学生答题数据',route:'/AnswerData',class:'Choice',icon:'el-icon-s-claim'},
          {text:'题库管理',route:'/Question',class:'NoChoice',icon:'el-icon-menu'},
          {text:'考试管理',route:'/Examination',class:'NoChoice',icon:'el-icon-s-help'},
        ]
      }
      that.appendData()
      that.$router.replace({
        path:'/AnswerData',
        query: {
          TimeData: that.TimeData,
          questionId: e.questionId?e.questionId:e.id,
          userName: that.userName,
          className: that.className,
          studentNumber: that.studentNumber,
          examinationName: that.examinationName,
          chapterId: that.chapterId,
          categoryId: that.categoryId,
          mode: that.patternType,
          practiceDifficulty: that.practiceDifficulty,
          levelId: that.levelId,
          courseId: that.courseId,
        }
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
          // console.log(res.data.data)
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
      } else if (that.SelectSystem == '问诊实训')  {
        that.$axios({
          url: that.$store.state.Q_http + 'interroExamination/queryCaseExamQuestionBefore',
          method: 'post',
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.optionData = res.data.data
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
  max-width:50%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.el-tag.el-tag--info i{
  display:none;
}
</style>
<style scoped>
.el-button--text{
  color: #BF8333;
}
.el-input,.el-select{
  width:150px;
  margin-right:10px;
  margin-bottom:10px;
}

.main{
  width:100%;
  height: calc(100vh - 270px);
  box-sizing: border-box;
  margin-top:10px;
}
.footer{
  position:fixed;
  left:34%;
  bottom:10px;
}
</style>
