<template>
  <div class="whole">
    <div class="header">
      <div class="time_box">
        <el-select v-show="SelectSystem=='原文实训'?true:false" @visible-change="clickvisible($event,1)" filterable multiple collapse-tags
          v-model="LevelData" class="select" clearable placeholder="级别" size="small">
          <el-option v-for="item in TestData" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
        <el-select v-show="SelectSystem=='原文实训'?true:false" @visible-change="clickvisible($event,2)" filterable multiple collapse-tags
          v-model="CourseData" class="select" clearable placeholder="课程" size="small">
          <el-option v-for="item in TestData" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
        <el-select @visible-change="clickvisible($event,'章节')" filterable multiple collapse-tags
          v-model="ChapterData" class="select" clearable placeholder="章节" size="small">
          <el-option v-for="item in TestData" :key="item.id" :label="item.typeName" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-show="SelectSystem!='原文实训'?true:false" @visible-change="clickvisible($event,2)" filterable multiple collapse-tags
          v-model="CategoryData" class="select" clearable placeholder="病症类别" size="small">
          <el-option v-for="item in TestData" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
        <el-button @click="clickSearch()" icon="el-icon-search" type="warning" size="small" plain>搜索</el-button>
        <el-button @click="clickReset()" icon="el-icon-refresh-left" type="warning" size="small" plain>重置</el-button>
        <el-button v-if="IsAdmin == 1" @click="clickAddTestQuestions()" icon="el-icon-circle-plus-outline" type="warning" size="small" plain>新增</el-button>
        <el-upload v-if="IsAdmin == 1" style="display:inline-block;margin:0 10px;"  action="" :before-upload="clickImportFile" :show-file-list="false">
          <el-button icon="el-icon-folder-opened" type="warning" size="small" plain>试题导入</el-button>
        </el-upload>
        <el-button v-if="IsAdmin == 1" @click="clickExportFile()" icon="el-icon-upload2" type="warning" size="small" plain>试题导出</el-button>
        <el-button v-if="IsAdmin == 1" @click="clickDownloadTemplate()" icon="el-icon-download" type="warning" size="small" plain>模板下载</el-button>
        <el-button v-if="IsAdmin == 1" @click="clickCaseType(showValue)" icon="el-icon-s-tools" type="warning" size="small" plain>试题分类管理</el-button>
        <el-button v-if="IsAdmin == 1" @click="BatchDeletion()" icon="el-icon-delete" type="warning" size="small" plain>批量删除</el-button>
      </div>
    </div>
    <div class="main" ref="heights" v-if="heightCss== ''"></div>
    <div class="main" ref="heights" v-else>
      <el-table v-if="SelectSystem=='原文实训'" @selection-change="handleSelectionChange" v-loading="loading" ref="multipleTableY"
        :data="queryQuestion" border style="width:100%" :max-height="heightCss" size="small">
        <el-table-column align="center" type="selection" width="45"></el-table-column>
        <el-table-column align="center" prop="questionOrder" label="题库序号" width="80"></el-table-column>
        <el-table-column align="center" prop="id" label="题库ID" width="80"></el-table-column>
        <el-table-column align="center" prop="updateOn" label="修改时间" width="140" :formatter="formatTime"></el-table-column>
        <el-table-column align="center" prop="courseName" label="课程" width="140"></el-table-column>
        <el-table-column align="center" prop="levelName" label="级别" width="140"></el-table-column>
        <el-table-column align="center" prop="chapterName" label="章节" width="140"></el-table-column>
        <el-table-column align="center" prop="knowledgeNames" label="知识点" width="140"></el-table-column>
        <el-table-column align="center" prop="optionText" label="考试题目" width=""></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button v-if="IsAdmin == 1" @click="clickDetails(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="clickToView(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-else @selection-change="handleSelectionChange" v-loading="loading" ref="multipleTableA"
        :data="queryQuestion" border style="width:100%" :max-height="heightCss" size="small">
        <el-table-column align="center" type="selection" width="45"></el-table-column>
        <el-table-column align="center" prop="index" label="题库序号" width="75"></el-table-column>
        <el-table-column align="center" prop="id" label="题库ID" width="75"></el-table-column>
        <el-table-column align="center" prop="updateOn" label="修改时间" width="130" :formatter="formatTime"></el-table-column>
        <el-table-column align="center" prop="chapterName" label="章节" width="130"></el-table-column>
        <el-table-column align="center" prop="categoryName" label="病症类别" width="130"></el-table-column>
        <el-table-column align="center" prop="knowledgeName" label="知识点" width="130"></el-table-column>
        <el-table-column align="center" prop="chiefComplaint" label="病症案例主诉" width=""></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button v-if="IsAdmin == 1" @click="clickDetails(scope.row)" type="text" size="small">删除</el-button>
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
    <el-dialog title="试题分类管理" append-to-body center :visible.sync="CaseType" width="50%" :close-on-press-escape="escape" :close-on-click-modal="escape">
      <div class="Dialogs">
        <el-tabs v-model="activeName" type="border-card" @tab-click="clickToSwitch">
          <el-tab-pane v-for="(item,i) in CaseTypeList" :key="i" :label="item.label" :name="item.name">
            <el-main style="max-height:300px" v-loading="loadingMain">
              <div class="input_box" v-for="(item,i) in TestData" :key="i">
                <el-input v-model="item.typeName" placeholder="请输入内容" maxlength="50" size="mini" :disabled="item.status==0?true:false"></el-input>
                <el-button @click="clickEdit(i)" type="text">{{item.status==0?'编辑':'确定'}}</el-button>
                <el-button @click="clickDeleteIpt(i)" type="text">删除</el-button>
              </div>
              <el-button @click="clickAdded(item.type)" class="added" type="text">新增</el-button>
            </el-main>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <el-button type="warning" @click="clickPreservation()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      heightCss: '',
      IsAdmin: this.$store.state.loginData.user.isAdmin, // 是否为管理员
      SelectSystem: this.$store.state.SelectSystem, // 当前选择哪个平台
      escape: false, // 是否可以关闭弹窗
      loading: false, // 加载
      loadingMain: false, // 局部加载
      CaseType: false, // 试题分类管理
      curPage: 1, // 第几页
      pageSize: 10, // 每页几条
      totalElements: 0, // 分页全部数量
      TestData: [], // 试题总数据（级别、章节、知识点、课程、病症类别）
      LevelData: '', // 级别ID（原文实训）
      CourseData: '', // 课程ID（原文实训）
      ChapterData: '', // 已选章节（原文实训、案例实训、问诊实训）
      CategoryData: '', // 已选病症类别（案例实训、问诊实训）
      queryQuestion: [], // 题库数据（原文实训、案例实训、问诊实训）
      queryQuestionId: '', // 勾选题库ID（案例实训、问诊实训）
      showValue: 1, // 试题分类管理默认展示第几页
      activeName: 'first', // 默认选项卡
      CaseTypeList: [], // 试题分类管理导航栏
    }
  },
  created() {
    let that = this
    that.loading = true
    that.clickSearch()
    if (that.SelectSystem == '原文实训') {
      that.CaseTypeList = [{
        label: '级别',
        name: "first",
        type: 1,
      },{
        label: '课程',
        name: "second",
        type: 2,
      },{
        label: '章节',
        name: "third",
        type: 3,
      },{
        label: '知识点',
        name: "fourth",
        type: 4,
      }]
    } else {
      that.CaseTypeList = [{
        label: '章节',
        name: "first",
        type: 1,
      },{
        label: '病症类别',
        name: "second",
        type: 2,
      },{
        label: '知识点',
        name: "fourth",
        type: 3,
      }]
    }
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
    handleSelectionChange(value) { // 勾选监听
      let that = this
      // console.log(value)
      let queryQuestionId = []
      for(var i = 0; i < value.length; i++){
        queryQuestionId.push(value[i].id)
      }
      that.queryQuestionId = queryQuestionId.toString()
    },
    CaseTypeData(value) { // 试题分类总数据(课程、级别、章节、知识点、病症类别)
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Y_http + 'originalType/queryType',
          method: 'post',
          data: {
            type: value
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loadingMain = false
            that.TestData = res.data.data
          }
        }).catch((err) =>{
          that.loadingMain = false
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
          data: {
            type: value
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loadingMain = false
            that.TestData = res.data.data
          }
        }).catch((err) =>{
          that.loadingMain = false
          that.$message.error('请求失败!')
        })
      }
    },

    // 点击函数区域
    clickvisible(e,value) { // 点击下拉框选择试题分类(课程、级别、章节、知识点、病症类别)
      let that = this
      if (e == true) {
        if (value == '章节') {
          if (that.SelectSystem == '原文实训') {
            that.CaseTypeData(3)
          } else {
            that.CaseTypeData(1)
          }
        } else {
          that.CaseTypeData(value)
        }
      }
    },
    clickSearch() { // 点击搜索
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'original/queryQuestionPage',
          method: 'post',
          data: {
            curPage: that.curPage,
            pageSize: that.pageSize,
            orderFlag: that.pageSize,
            chapterIds: that.ChapterData.toString(),
            courseIds: that.CourseData.toString(),
            levelIds: that.LevelData.toString()
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loading = false
            that.totalElements = res.data.data.totalElements
            that.queryQuestion = res.data.data.elements
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
          url = that.$store.state.Q_http + 'case/queryQuestionPage'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interro/queryQuestionPage'
        }
        that.$axios({
          url: url,
          method: 'post',
          data: {
            curPage: that.curPage,
            pageSize: that.pageSize,
            chapterIds: that.ChapterData.toString(),
            categoryIds: that.CategoryData.toString()
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.loading = false
            that.totalElements = res.data.data.totalElements
            that.queryQuestion = res.data.data.elements
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
      that.ChapterData = ''
      that.CategoryData = ''
      that.LevelData = ''
      that.CourseData = ''
      that.curPage = 1
      that.pageSize = 10
      that.clickSearch()
      that.$message({
        message: '重置成功~',
        type: 'success',
        duration: '1000'
      })
    },
    clickAddTestQuestions() { // 点击新增试题
      let that = this
      that.$router.replace({path:'/AddQuestions'})
    },
    clickDownloadTemplate() { // 点击下载模板
      let that = this
      // console.log(that.$store.state.SystemID)
      that.$axios({
        url: that.$store.state.Q_http + 'template/downloadTemplate',
        method: 'post',
        responseType: 'blob',
        data: { flag: that.$store.state.SystemID }
      }).then((res) =>{
        // console.log(res)
        const blob = new Blob([res.data])
        let fileName = ''
        if (that.$store.state.SystemID == 1) {
          fileName = "经典原文模板.xlsx"
        } else if (that.$store.state.SystemID == 2) {
          fileName = "经典案例实训模板.xlsx"
        } else if (that.$store.state.SystemID == 3) {
          fileName = "智能问诊实训模板.xlsx"
        }
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
    },
    clickImportFile(file) { // 点击导入文件
      let that = this
      const formData = new FormData()
      formData.append('file', file)
      let url = ''
      if (that.SelectSystem == '原文实训') {
        url = that.$store.state.Q_http + 'original/importQuestions?userId=' + that.$store.state.loginData.user.id
      } else if (that.SelectSystem == '案例实训') {
        url = that.$store.state.Q_http + 'case/importCaseQuestion?userId=' + that.$store.state.loginData.user.id
      } else if (that.SelectSystem == '问诊实训') {
        url = that.$store.state.Q_http + 'interro/importInterroQuestion?userId=' + that.$store.state.loginData.user.id
      }
      that.$axios({
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'post',
        data: formData,
      }).then((res) =>{
        // console.log(res)
        if (res.data.code == 200) {
          that.clickSearch()
          that.$message({
            type: 'success',
            message: '导入成功!',
            duration: 1000
          })
        } else {
          that.$message.error(res.data.message)
        }
      }).catch((err) =>{
        that.$message.error('导入失败，请查看表格格式！')
      })
    },
    clickExportFile() { // 点击导出文件
      let that = this
      let data = {}
      let url = ''
      if (that.SelectSystem == '原文实训') {
        url = that.$store.state.Q_http + 'original/exportOriginalQuestion'
        data = {
          chapterIds: that.ChapterData.toString(),
          levelIds: that.LevelData.toString(),
          courseIds: that.CourseData.toString(),
        }
      } else if (that.SelectSystem == '案例实训') {
        url = that.$store.state.Q_http + 'case/exportCaseQuestion'
        data = {
          chapterIds: that.ChapterData.toString(),
          categoryIds: that.CategoryData.toString(),
        }
      } else if (that.SelectSystem == '问诊实训') {
        url = that.$store.state.Q_http + 'interro/exportInterroQuestion'
        data = {
          chapterIds: that.ChapterData.toString(),
          categoryIds: that.CategoryData.toString(),
        }
      }
      that.$axios({
        url: url,
        method: 'post',
        responseType: 'blob',
        data: data
      }).then((res) =>{
        // console.log(res)
        that.$message({
          message: '导出成功~',
          type: 'success',
          duration: '1000'
        })
        const blob = new Blob([res.data])
        const fileName = "题库管理.xlsx"
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
    },
    clickToView(e) { // 点击查看题库详情
      let that = this
      that.$router.replace({
        path:'/QuestionDetails',
        query: { id: e.id }
      })
    },
    clickCaseType(value) { // 点击试题分类管理
      let that = this
      that.CaseType = true
      that.CaseTypeData(value)
    },
    clickToSwitch(e) { // 点击切换
      let that = this
      that.loadingMain = true
      if (e.index == 0) {
        that.showValue = 1
      } else if (e.index == 1) {
        that.showValue = 2
      } else if (e.index == 2) {
        that.showValue = 3
      } else {
        that.showValue = 4
      }
      that.CaseTypeData(that.showValue)
    },
    clickDetails(e) { // 点击删除
      let that = this
      that.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.FnDelete(e.id)
      }).catch(() => {})
    },
    BatchDeletion() { // 点击批量删除
      let that = this
      if (!that.queryQuestionId) {
        that.$message({
          message: '请勾选要删除的试题~',
          type: 'warning'
        })
        return
      }
      that.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.FnDeletes()
      }).catch(() => {
        if (that.SelectSystem == '原文实训') {
          that.$refs.multipleTableY.clearSelection()
        } else {
          that.$refs.multipleTableA.clearSelection()
        }
      })
    },
    clickEdit(e) { // 点击编辑
      let that = this
      if (that.TestData[e].status == 0) {
        that.TestData[e].status = 1
      } else {
        if (!that.TestData[e].typeName) {
          that.$message({
            message: '请输入编辑内容~',
            type: 'warning'
          })
          return
        }
        if (that.TestData[e].id == 0 || that.TestData[e].ids == 0) {
          that.FnAdded(e)
        } else {
          that.FnEdit(e)
        }
      }
    },
    clickDeleteIpt(e) { // 点击删除input
      let that = this
      if (that.TestData[e].id == 0 || that.TestData[e].ids == 0) {
        that.TestData.splice(e,1)
      } else {
        that.$confirm('确认要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.FnDeleteipt(e)
        }).catch(() => {})
      }
    },
    clickPreservation() { // 点击批量保存
      let that = this
      let questionIds = []
      if (that.TestData.length !=0) {
        that.TestData.map((value,index,arry)=>{
          if (value.status == 1) {
            questionIds.push({ 'id': value.id || value.ids, 'name': value.typeName })
          }
        })
        for(var i = 0; i < questionIds.length; i++){
          if (questionIds[i].name == '') {
            if (questionIds[i].id == 0 || questionIds[i].ids == 0) {
              that.$message({
                message: '请输入新增内容~',
                type: 'warning'
              })
            } else {
              that.$message({
                message: '请输入编辑内容~',
                type: 'warning'
              })
            }
            return
          }
        }
        if (that.SelectSystem == '原文实训') {
          that.$axios({
            url: that.$store.state.Y_http + 'originalType/batchSaveType',
            method: 'post',
            data: {
              typeName: JSON.stringify(questionIds),
              type: that.TestData[0].type
            }
          }).then((res) =>{
            // console.log(res.data)
            if (res.data.code == 200) {
              that.CaseType = false
              that.$message({
                type: 'success',
                message: '保存成功!',
                duration: '1000'
              })
            }
          }).catch((err) =>{
            that.$message.error('请求失败!')
          })
        } else {
          let url = ''
          if (that.SelectSystem == '案例实训') {
            url = that.$store.state.Q_http + 'caseType/saveType'
          } else if (that.SelectSystem == '问诊实训') {
            url = that.$store.state.Q_http + 'interroType/saveType'
          }
          that.$axios({
            url: url,
            method: 'post',
            data: {
              questionIds: JSON.stringify(questionIds),
              caseType: that.TestData[0].type
            }
          }).then((res) =>{
            // console.log(res.data)
            if (res.data.code == 200) {
              that.CaseType = false
              that.$message({
                type: 'success',
                message: '保存成功!',
                duration: '1000'
              })
              that.clickSearch()
            }
          }).catch((err) =>{
            that.$message.error('请求失败!')
          })
        }
      } else {
        that.CaseType = false
      }
    },
    clickAdded(e) { // 点击新增
      let that = this
      that.TestData.push({
        status: 1,
        type: e,
        typeName: '',
        ids: 0
      })
    },

    // 执行函数区域
    FnDelete(id) { // (原文实训、案例实训、问诊实训)单个删除试题函数
      let that = this
      let url = ''
      let data = {}
      if (that.SelectSystem == '原文实训') {
        url = that.$store.state.Q_http + 'original/deleteQuestion'
        data = { questionId: id }
      } else if (that.SelectSystem == '案例实训') {
        url = that.$store.state.Q_http + 'case/delCaseQuestion'
        data = { id: id }
      } else if (that.SelectSystem == '问诊实训') {
        url = that.$store.state.Q_http + 'interro/deleteInterroQuestion'
        data = { id: id }
      }
      that.$axios({
        url: url,
        method: 'post',
        data: data
      }).then((res) =>{
        // console.log(res.data)
        if (res.data.code == 200) {
          that.clickSearch()
          that.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000
          })
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    },
    FnDeletes() { // (原文实训、案例实训、问诊实训)批量删除试题函数
      let that = this
      let url = ''
      let data = {}
      if (that.SelectSystem == '原文实训') {
        url = that.$store.state.Q_http + 'original/batchDeleteQuestion'
        data = { ids: that.queryQuestionId }
      } else if (that.SelectSystem == '案例实训') {
        url = that.$store.state.Q_http + 'case/batchDelCaseQuestion'
        data = { questionIds: that.queryQuestionId }
      } else if (that.SelectSystem == '问诊实训') {
        url = that.$store.state.Q_http + 'interro/batchDelInterroQuestion'
        data = { questionIds: that.queryQuestionId }
      }
      that.$axios({
        url: url,
        method: 'post',
        data: data
      }).then((res) =>{
        // console.log(res.data)
        if (res.data.code == 200) {
          that.clickSearch()
          that.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000
          })
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    },
    FnEdit(e) { // (原文实训、案例实训、问诊实训)试题分类管理编辑试题函数
      let that = this
      let url = ''
      if (that.SelectSystem == '原文实训') {
        url = that.$store.state.Y_http + 'originalType/updateType'
      } else if (that.SelectSystem == '案例实训') {
        url = that.$store.state.Q_http + 'caseType/updateCaseType'
      } else if (that.SelectSystem == '问诊实训') {
        url = that.$store.state.Q_http + 'interroType/updateInterroType'
      }
      that.$axios({
        url: url,
        method: 'post',
        data: {
          id: that.TestData[e].id || that.TestData[e].ids,
          typeName: that.TestData[e].typeName,
        }
      }).then((res) =>{
        // console.log(res.data)
        if (res.data.code == 200) {
          that.TestData[e].status = 0
          that.$message({
            type: 'success',
            message: '编辑成功!',
            duration: 1000
          })
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    },
    FnAdded(e) { // (原文实训、案例实训、问诊实训)试题分类管理新增试题函数
      let that = this
      let url = ''
      if (that.SelectSystem == '原文实训') {
        url = that.$store.state.Y_http + 'originalType/saveType'
      } else if (that.SelectSystem == '案例实训') {
        url = that.$store.state.Q_http + 'caseType/createCaseType'
      } else if (that.SelectSystem == '问诊实训') {
        url = that.$store.state.Q_http + 'interroType/createInterroType'
      }
      that.$axios({
        url: url,
        method: 'post',
        data: {
          type: that.TestData[e].type,
          typeName: that.TestData[e].typeName,
        }
      }).then((res) =>{
        // console.log(res.data)
        if (res.data.code == 200) {
          that.TestData[e].status = 0
          that.$message({
            type: 'success',
            message: '添加成功!',
            duration: 1000
          })
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    },
    FnDeleteipt(e) { // (原文实训、案例实训、问诊实训)试题分类管理删除函数
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Y_http + 'originalType/queryQuestionType',
          method: 'post',
          data: {
            id: that.TestData[e].id,
            type: that.TestData[e].type
          }
        }).then((res) =>{
          // console.log(res.data)
          if (res.data.code == 200) {
            if (res.data.data == '包含') {
              that.$message.error('已包含试题，无法删除!')
            } else {
              that.$axios({
                url: that.$store.state.Y_http + 'originalType/deleteType',
                method: 'post',
                data: {
                  id: that.TestData[e].id,
                }
              }).then((res) =>{
                // console.log(res.data)
                if (res.data.code == 200) {
                  that.CaseTypeData(that.TestData[e].type)
                  that.$message({
                    type: 'success',
                    message: '删除成功!',
                    duration: '1000'
                  })
                }
              }).catch((err) =>{
                that.$message.error('请求失败!')
              })
            }
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      } else {
        let url = ''
        if (that.SelectSystem == '案例实训') {
          url = that.$store.state.Q_http + 'caseType/deleteCaseType'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroType/deleteInterroType'
        }
        that.$axios({
          url: url,
          method: 'post',
          data: {
            id: that.TestData[e].id,
          }
        }).then((res) =>{
          // console.log(res.data)
          if (res.data.code == 200) {
            that.CaseTypeData(that.TestData[e].type)
            that.$message({
              type: 'success',
              message: '删除成功!',
              duration: '1000'
            })
          } else {
            that.$message({
              type: 'warning',
              message: res.data.message,
              duration: '2000'
            })
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      }
    },

    formatTime(row) { // 时间戳转换
      let date = new Date(parseInt(row.updateOn))
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes())
      return Y + M + D + h + m
    },
  },
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
  height: calc(100vh - 228px);
  box-sizing: border-box;
  margin-top:10px;
}
.footer{
  position:fixed;
  left:34%;
  bottom:10px;
}

/* 弹框样式 */
.input_box{
  display: flex;
  align-items: center;
}
.input_box .el-input{
  width:150px;
  margin-right:15px;
}
.added{
  margin-left:10px;
}
</style>
