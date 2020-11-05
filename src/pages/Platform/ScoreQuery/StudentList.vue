<template>
  <div class="whole">
    <div class="Goback">
      <el-button type="text" icon="el-icon-arrow-left" @click="GoBack">返回</el-button>
    </div>
    <div v-if="SelectSystem=='原文实训'" class="header">
      <div class="box_1">
        <p class="text_1">考试ID：<span>{{StudentData.id}}</span></p>
        <p class="text_1">考试名称：<span>{{StudentData.examinationName}}</span></p>
        <p class="text_1">开始时间：<span>{{formatTime2(StudentData.createOn)}}</span></p>
        <p class="text_1">结束时间：<span>{{formatTime2(StudentData.updateOn)}}</span></p>
      </div>
      <div class="box_1">
        <p class="text_1">总分：<span>{{StudentData.fullScore}}</span></p>
        <p class="text_1">最高分：<span>{{StudentData.maxScore}}</span></p>
        <p class="text_1">最低分：<span>{{StudentData.minScore}}</span></p>
        <p class="text_1">平均分：<span>{{StudentData.avgScore}}</span></p>
      </div>
      <div class="box_1">
        <p class="text_1">课程：<span>{{StudentData.courseValues}}</span></p>
        <p class="text_1">级别：<span>{{StudentData.levelValues}}</span></p>
        <p class="text_1">章节：<span>{{StudentData.chapterValues}}</span></p>
        <p class="text_1">知识点：<span>{{StudentData.knowledgeValues}}</span></p>
      </div>
      <div class="box_1">
        <p class="text_1">参考人数：<span>{{StudentData.attendCount}}人</span></p>
        <p class="text_1">难度：<span>{{StudentData.practiceDifficulty}}级</span></p>
      </div>
    </div>
    <div v-else class="header">
      <div class="box_1">
        <p class="text_1">考试ID：<span>{{StudentData.examinationId}}</span></p>
        <p class="text_1">考试名称：<span>{{StudentData.examinationName}}</span></p>
        <p class="text_1">开始时间：<span>{{StudentData.beginTime}}</span></p>
        <p class="text_1">结束时间：<span>{{StudentData.endTime}}</span></p>
      </div>
      <div class="box_1">
        <p class="text_1">总分：<span>{{StudentData.fullScore}}</span></p>
        <p class="text_1">最高分：<span>{{StudentData.maxScore}}</span></p>
        <p class="text_1">最低分：<span>{{StudentData.minScore}}</span></p>
        <p class="text_1">平均分：<span>{{StudentData.avgScore}}</span></p>
      </div>
      <div class="box_1">
        <p class="text_1">{{SelectSystem=='问诊实训'?'章节/症候/方剂':'章节'}}：<span>{{StudentData.chapterIds}}</span></p>
        <p class="text_1">{{SelectSystem=='问诊实训'?'病症类别/难度':'病症类别'}}：<span>{{StudentData.categoryIds}}</span></p>
        <p class="text_1">{{SelectSystem=='问诊实训'?'知识点/类似症/相关症':'知识点'}}：<span>{{StudentData.knowledgePointsIds}}</span></p>
        <p class="text_1">参考人数：<span>{{StudentData.personNum}}</span></p>
      </div>
      <div class="box_1"></div>
    </div>
    <div class="ipt_box">
      <el-input placeholder="输入班级号、学号、姓名" size="small" v-model="searchKey" clearable></el-input>
      <el-button @click="clickSearch()" icon="el-icon-search" type="warning" size="small">搜索</el-button>
      <el-button @click="clickExportFile()" icon="el-icon-upload2" type="warning" size="small">导出</el-button>
    </div>
    <div class="main" ref="heights" v-if="heightCss== ''"></div>
    <div class="main" ref="heights" v-else>
      <el-table v-loading="loading" :data="StudentListData" border style="width:90%" :max-height="heightCss" size="small"
        :default-sort="{prop: 'sort', order: 'ascending'}" @sort-change="sortChange">
        <el-table-column align="center" prop="userName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="score" label="分数"></el-table-column>
        <el-table-column align="center" prop="sort" label="排名" sortable="custom"></el-table-column>
        <el-table-column align="center" prop="studentNumber"  label="学号"></el-table-column>
        <el-table-column align="center" prop="className" label="班级号"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="120">
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
      id: this.$route.query.id, // 页面传参ID
      loading: false, // 页面加载
      curPage: 1, // 第几页
      pageSize: 10, // 每页几条
      totalElements: 0, // 分页全部数量
      StudentData: '', // 考试查询数据
      StudentListData: [], // 考试查询数据列表
      searchKey: '', // 页面搜索框信息
      sortColumn: 'sort', // 排序字段
      sortType: 1, // 排序方式
    }
  },
  created() {
    let that = this
    that.loading = true
    that.FnShowData()
  },
  mounted() {
    let that = this
    let arr = parseInt(window.getComputedStyle(that.$refs.heights).height)
    that.heightCss = arr - 50
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
      if (column.order == 'ascending') {
        that.sortType = 1
        that.clickSearch()
      } else if (column.order == 'descending') {
        that.sortType = 0
        that.clickSearch()
      }
    },

    // 点击函数区域
    clickSearch() { // 点击搜索
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.FnShowData()
      } else {
        let url = ''
        if (that.SelectSystem == '案例实训') {
          url = that.$store.state.Q_http + 'caseExamination/queryStudentScoreTwoSearch'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroExamination/queryStudentScoreTwoSearch'
        }
        that.$axios({
          url: url,
          method: 'post',
          data: {
            id: that.id,
            searchKey: that.searchKey,
            sortColumn: that.sortColumn,
            orderBy: that.sortType===0?2:that.sortType,
            curPage: that.curPage,
            pageSize: that.pageSize,
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loading = false
            that.totalElements = res.data.data.count
            that.StudentListData = res.data.data.dataList
          } else {
            that.loading = false
          }
        }).catch((err) =>{
          that.loading = false
          that.$message.error('请求失败!')
        })
      }
    },
    clickExportFile() { // 点击导出文件
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'originalReport/exportOriginalStudent',
          method: 'post',
          responseType: 'blob',
          data: {
            id: that.id,
            examText: that.searchKey,
            sortType: that.sortType,
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
          const fileName = "学生列表" + date +".xlsx"
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName)
          } else {
            const elink = document.createElement("a")
            elink.download = fileName
            elink.style.display = "none"
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href)
            document.body.removeChild(elink)
          }
        })
      } else {
        let url = ''
        if (that.SelectSystem == '案例实训') {
          url = that.$store.state.Q_http + 'caseExamination/queryStudentScoreTwoExcel'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroExamination/queryStudentScoreTwoExcel'
        }
        that.$axios({
          url: url,
          method: 'post',
          responseType: 'blob',
          data: {
            id: that.id,
            searchKey: that.searchKey,
            sortColumn: that.sortColumn,
            orderBy: that.sortType==0?2:1,
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
          const fileName = "学生列表" + date +".xlsx"
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName)
          } else {
            const elink = document.createElement("a")
            elink.download = fileName
            elink.style.display = "none"
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href)
            document.body.removeChild(elink)
          }
        })
      }
    },
    clickToView(e) { // 点击查看
      let that = this
      let parameter = {}
      if (that.SelectSystem == '原文实训') {
        parameter = { id: e.id }
        that.$store.state.PaperDetails = e
      } else {
        parameter = { userId: e.userId, examinationId: e.examinationId, typeId: 3 }
      }
      that.$router.replace({path:'/PaperDetails',
        query: parameter
      })
    },
    GoBack() { // 点击返回
      this.$router.replace({path:'/ScoreQuery'})
    },

    // 执行函数区域
    FnShowData() {
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'originalReport/queryOriginalStudentPage',
          method: 'post',
          data: {
            id: that.id,
            curPage: that.curPage,
            pageSize: that.pageSize,
            examText: that.searchKey,
            sortType: that.sortType
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loading = false
            that.totalElements = res.data.data.totalElements
            that.StudentListData = res.data.data.elements
            that.StudentData = that.$store.state.StudentListData
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
          url = that.$store.state.Q_http + 'caseExamination/queryStudentScoreTwo'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroExamination/queryStudentScoreTwo'
        }
        that.$axios({
          url: url,
          method: 'post',
          data: {
            id: that.id,
            curPage: that.curPage,
            pageSize: that.pageSize,
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loading = false
            that.totalElements = res.data.data.count
            that.StudentData = res.data.data.data
            that.StudentListData = res.data.data.dataList
          } else {
            that.loading = false
          }
        }).catch((err) =>{
          that.loading = false
          that.$message.error('请求失败!')
        })
      }
    },
    formatTime1(row) { // 时间戳转换
      let that = this
      let date = new Date(parseInt(row))
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes())
      return Y + M + D + h + m
    },
    formatTime2(row) { // 时间戳转换
      let that = this
      let date = new Date(parseInt(row))
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes())
      return Y + M + D + h + m
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-button--text{
  color: #BF8333;
}
.Goback .el-button{
  padding:0;
  color:#333;
}
.Goback .el-button:hover{
  color: #BF8333;
}
.header{
  width:100%;
  box-sizing: border-box;
  display:flex;
  padding:0 20px;
  margin-top:20px;
}
.header .box_1{
  flex:1;
}
.header .box_1 .text_1{
  font-size:14px;
  color:#333;
  font-weight:bold;
  margin-bottom:15px;
}
.header .box_1 .text_1 span{
  font-size:13px;
  color:#666;
  font-weight:400;
}
.header .box_1 .el-button{
  margin:0 auto;
}
.ipt_box{
  padding:0 20px;
}
.ipt_box .el-input{
  display:inline-block;
  width:200px;
  margin-right:10px;
}
.main{
  width:100%;
  height: calc(100vh - 340px);
  box-sizing: border-box;
  padding:20px;
}
.footer{
  position:fixed;
  left:34%;
  bottom:10px;
}
</style>
