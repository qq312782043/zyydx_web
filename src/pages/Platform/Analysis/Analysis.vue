<template>
  <div class="whole">
    <div class="header">
      <div class="time_box clear">
        <div style="float:left">
          <el-date-picker v-model="TimeData" type="daterange" format="yyyy - MM - dd" value-format="yyyy-MM-dd"
            range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" size="small">
          </el-date-picker>
        </div>
        <div style="float:right">
          <el-button @click="clickSearch()" icon="el-icon-search" class="button" type="warning" size="small" plain>搜索</el-button>
          <el-button @click="clickReset()" icon="el-icon-refresh-left" class="button" type="warning" size="small" plain>重置</el-button>
          <el-button icon="el-icon-upload2" class="button" type="warning" size="small" plain>导出</el-button>
        </div>
      </div>
      <div class="input_box">
        <el-input placeholder="题库ID" class="input" v-model="questionId" size="small" clearable></el-input>
        <el-input placeholder="班级号" class="input" v-model="className" size="small" clearable></el-input>
        <el-input placeholder="学生姓名" class="input" v-model="userName" size="small" clearable></el-input>
        <el-input placeholder="学号" class="input" v-model="studentNumber" size="small" clearable></el-input>
        <el-input placeholder="考试名称" class="input" v-model="examinationName" size="small" clearable></el-input>
        <!-- <el-select v-model="value_1" class="input" clearable placeholder="课程" size="small">
          <el-option v-for="item in optionData" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select> -->
        <el-select v-model="categoryId" class="input" clearable placeholder="病症类别" size="small">
          <el-option v-for="item in optionData.Category" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="chapterId" class="input" clearable placeholder="章节" size="small">
          <el-option v-for="item in optionData.Chapter" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <!-- <el-select v-model="value_4" class="input" clearable placeholder="难度" size="small">
          <el-option v-for="item in optionData" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select> -->
        <el-select v-model="patternType" class="input" clearable placeholder="模式" size="small">
          <el-option v-for="item in optionData.mod" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="main" ref="heights">
      <el-table v-loading="loading" :data="AnalysisData" border style="width:100%" :max-height="heightCss" size="small">
        <el-table-column align="center" prop="questionId" label="题库ID" width="80"></el-table-column>
        <el-table-column align="center" prop="flagAvgScore" label="平均分" width="80"></el-table-column>
        <el-table-column align="center" prop="flagRight" label="正确个数" width="80"></el-table-column>
        <el-table-column align="center" prop="flagWrong" label="错误个数" width="80"></el-table-column>
        <el-table-column align="center" prop="chapterId" label="章节" width="110"></el-table-column>
        <el-table-column align="center" prop="categoryId" label="病症类别" width="110"></el-table-column>
        <el-table-column align="center" prop="knowledgePointsIds" label="知识点" width="110"></el-table-column>
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
      heightCss: '550',
      SelectSystem: this.$store.state.SelectSystem, // 当前选择哪个平台
      loading: false, // 页面加载
      curPage: 1, // 第几页
      pageSize: 10, // 每页几条
      totalElements: 0, // 分页全部数量
      AnalysisData: [], // 学生答题数据
      TimeData: [], // 时间数据
      questionId: '', // 题库ID
      className: '', // 班级号
      userName: '', // 学生姓名
      studentNumber: '', // 学号
      examinationName: '', // 考试名称
      optionData: [], // 下拉框总数据数据（级别、章节、模式、课程、难度）
      categoryId: '', // 已选病症类别ID
      chapterId: '', // 已选章节ID
      patternType: '', // 已选模式ID
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

    // 点击函数区域
    clickSearch() { // 点击搜索
      let that = this
      let data = {
        startDate: that.TimeData[0],
        endDate: that.TimeData[1],
        questionId: that.questionId,
        userName: that.userName,
        className: that.className,
        studentNumber: that.studentNumber,
        examinationName: that.examinationName,
        chapterId: that.chapterId,
        categoryId: that.categoryId,
        mode: that.patternType,
        curPage: that.curPage,
        pageSize: that.pageSize,
        sortColumn: '',
        orderBy: ''
      }
      // console.log(data)
      if (that.SelectSystem == '原文实训') {

      } else if (that.SelectSystem == '案例实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'caseExamination/queryQuestionDescriptionOne',
          method: 'post',
          data: data
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
      that.clickSearch()
    },
    clickToView(e) { // 点击查看
      let that = this
      that.$store.state.tabList = [
        {text:'课堂管理',route:'/Administration',class:'NoChoice',icon:'el-icon-s-home'},
        {text:'考试成绩查询',route:'/ScoreQuery',class:'NoChoice',icon:'el-icon-s-data'},
        {text:'试题分析',route:'/Analysis',class:'NoChoice',icon:'el-icon-s-flag'},
        {text:'学生答题数据',route:'/AnswerData',class:'Choice',icon:'el-icon-s-claim'},
        {text:'题库管理',route:'/Question',class:'NoChoice',icon:'el-icon-menu'},
        {text:'考试管理',route:'/Examination',class:'NoChoice',icon:'el-icon-s-help'},
      ]
      that.appendData()
      that.$router.replace({
        path:'/AnswerData',
        query: { questionId: e.questionId }
      })
    },

    // 执行函数区域
    FnOptionData() { // 请求下拉筛选条件数据（知识点、章节、病症类别、模式）
      let that = this
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
    },
  },
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
.input_box{
  margin-top:20px;
  display: flex;
}
.input_box .input{
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
