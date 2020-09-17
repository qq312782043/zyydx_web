<template>
  <div class="whole">
    <div class="header clear">
      <div class="time_box">
        <el-date-picker style="margin-right:10px" v-model="TimeData" type="daterange" format="yyyy - MM - dd" value-format="yyyy-MM-dd"
          range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" size="small">
        </el-date-picker>
        <el-input placeholder="输入考试ID或考试名称" v-model="searchKey" size="small" clearable></el-input>
        <el-button @click="clickSearch()" icon="el-icon-search" class="button" type="warning" size="small" plain>搜索</el-button>
        <el-button @click="clickReset()" icon="el-icon-refresh-left" class="button" type="warning" size="small" plain>重置</el-button>
        <el-button @click="clickExportFile()" icon="el-icon-upload2" class="button" type="warning" size="small" plain>导出</el-button>
      </div>
    </div>
    <div class="main" ref="height" v-if="heightCss== ''"></div>
    <div class="main" ref="height" v-else>
      <el-table v-if="SelectSystem=='原文实训'" v-loading="loading" :data="ScoreQueryData" border style="width:100%" :max-height="heightCss" size="small">
        <el-table-column align="center" prop="id" label="考试ID" width="70"></el-table-column>
        <el-table-column align="center" prop="examinationName" label="考试名称" width="100"></el-table-column>
        <el-table-column align="center" prop="attendCount" label="参考人数" width="70" :formatter="formatTime3"></el-table-column>
        <el-table-column align="center" prop="createOn" label="考试开始时间" width="100" :formatter="formatTime1"></el-table-column>
        <el-table-column align="center" prop="updateOn" label="考试结束时间" width="100" :formatter="formatTime2"></el-table-column>
        <el-table-column align="center" prop="examUseTime" label="考试用时" width="100"></el-table-column>
        <el-table-column align="center" prop="practiceNum" label="题数" width="70"></el-table-column>
        <el-table-column align="center" prop="fullScore" label="总分" width="70"></el-table-column>
        <el-table-column align="center" prop="maxScore" label="最高分" width="70"></el-table-column>
        <el-table-column align="center" prop="minScore" label="最低分" width="70"></el-table-column>
        <el-table-column align="center" prop="avgScore" label="平均分" width="70"></el-table-column>
        <el-table-column align="center" prop="courseValues" label="课程" width="70"></el-table-column>
        <el-table-column align="center" prop="levelValues" label="级别" width="70"></el-table-column>
        <el-table-column align="center" prop="chapterValues" label="章节" width=""></el-table-column>
        <el-table-column align="center" prop="knowledgeValues" label="知识点" width=""></el-table-column>
        <el-table-column align="center" prop="practiceDifficulty" label="难度" width="70" :formatter="formatTime4"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button @click="clickToView(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-else v-loading="loading" :data="ScoreQueryData" border style="width:100%" :max-height="heightCss" size="small">
        <el-table-column align="center" prop="examinationId" label="考试ID" width="70"></el-table-column>
        <el-table-column align="center" prop="examinationName" label="考试名称" width="100"></el-table-column>
        <el-table-column align="center" prop="personNum" label="参考人数" width="70" :formatter="formatTime3"></el-table-column>
        <el-table-column align="center" prop="createOn" label="考试开始时间" width="100"></el-table-column>
        <el-table-column align="center" prop="updateOn" label="考试结束时间" width="100"></el-table-column>
        <el-table-column align="center" prop="examTime" label="考试用时" width="100"></el-table-column>
        <el-table-column align="center" prop="practiceNum" label="题数" width="70"></el-table-column>
        <el-table-column align="center" prop="fullScore" label="总分" width="70"></el-table-column>
        <el-table-column align="center" prop="maxScore" label="最高分" width="70"></el-table-column>
        <el-table-column align="center" prop="minScore" label="最低分" width="70"></el-table-column>
        <el-table-column align="center" prop="avgScore" label="平均分" width="70"></el-table-column>
        <el-table-column align="center" prop="chapterIds" label="章节" width=""></el-table-column>
        <el-table-column align="center" prop="categoryIds" label="病症类别" width=""></el-table-column>
        <el-table-column align="center" prop="knowledgePointsIds" label="知识点" width=""></el-table-column>
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
      ScoreQueryData: [], // 考试成绩数据
      TimeData: [], // 时间数据
      searchKey: '', // 考试ID或者考试名称
    }
  },
  created() {
    let that = this
    that.clickSearch()
  },
  mounted() {
    let that = this
    that.heightCss = parseInt(window.getComputedStyle(that.$refs.height).height)
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
          url: that.$store.state.Q_http + 'originalReport/queryOriginalScorePage',
          method: 'post',
          data: {
            startDate: that.TimeData[0]?that.TimeData[0]:'',
            endDate: that.TimeData[1]?that.TimeData[1]:'',
            curPage: that.curPage,
            pageSize: that.pageSize,
            examText: that.searchKey,
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loading = false
            that.totalElements = res.data.data.totalElements
            that.ScoreQueryData = res.data.data.elements
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
          url = that.$store.state.Q_http + 'caseExamination/queryStudentScoreOne'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroExamination/queryStudentScoreOne'
        }
        that.$axios({
          url: url,
          method: 'post',
          data: {
            startDate: that.TimeData[0]?that.TimeData[0]:'',
            endDate: that.TimeData[1]?that.TimeData[1]:'',
            curPage: that.curPage,
            pageSize: that.pageSize,
            searchKey: that.searchKey,
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loading = false
            that.totalElements = res.data.data.count
            that.ScoreQueryData = res.data.data.dataList
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
      that.searchKey = ''  // 考试ID或者考试名称
      that.curPage = 1
      that.pageSize = 10
      that.clickSearch()
      that.$message({
        message: '重置成功~',
        type: 'success',
        duration: '1000'
      })
    },
    clickExportFile() { // 点击导出文件
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'originalReport/exportOriginalScore',
          method: 'post',
          responseType: 'blob',
          data: {
            startDate: that.TimeData[0]?that.TimeData[0]:'',
            endDate: that.TimeData[1]?that.TimeData[1]:'',
            examText: that.searchKey,
          }
        }).then((res) =>{
          // console.log(res)
          const blob = new Blob([res.data])
          const date = new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日"
          const fileName = "考试成绩查询" + date +".xlsx"
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
          url = that.$store.state.Q_http + 'caseExamination/queryStudentScoreOneExcel'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroExamination/queryStudentScoreOneExcel'
        }
        that.$axios({
          url: url,
          method: 'post',
          responseType: 'blob',
          data: {
            startDate: that.TimeData[0]?that.TimeData[0]:'',
            endDate: that.TimeData[1]?that.TimeData[1]:'',
            searchKey: that.searchKey,
          }
        }).then((res) =>{
          // console.log(res)
          const blob = new Blob([res.data])
          const date = new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日"
          const fileName = "考试成绩查询" + date +".xlsx"
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
        parameter = { id: e.id }
        that.$store.state.StudentListData = e
      } else {
        parameter = { id: e.examinationId }
      }
      that.$router.replace({
        path:'/StudentList',
        query: parameter
      })
    },

    // 执行函数区域
    formatTime1(row) { // 时间戳转换
      let date = new Date(parseInt(row.createOn))
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes())
      return Y + M + D + h + m
    },
    formatTime2(row) { // 时间戳转换
      let date = new Date(parseInt(row.updateOn))
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes())
      return Y + M + D + h + m
    },
    formatTime3(row) {
      let date = row.attendCount?row.attendCount:row.personNum + '人'
      return date
    },
    formatTime4(row) {
      let date = row.practiceDifficulty + '级'
      return date
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  height: calc(100vh - 228px);
  box-sizing: border-box;
  margin-top:10px;
}
.footer{
  position:fixed;
  left:34%;
  bottom:10px;
}
</style>
