<template>
  <el-main class="SmallBox">
    <div v-show="modular_1">
      <div class="header">
        <div class="Range">
          <p class="text_1">选择考试范围<span>*不勾选则视为全选</span></p>
          <div class="contact">
            <div class="chapter" v-show="SelectSystem=='原文实训'?true:false">
              <div class="text_2">课程</div>
              <el-select v-model="courseData" filterable multiple collapse-tags size="small" placeholder="请选择">
                <el-option v-for="item in course" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="chapter" v-show="SelectSystem=='原文实训'?true:false">
              <div class="text_2">级别</div>
              <el-select v-model="levelData" filterable multiple collapse-tags size="small" placeholder="请选择">
                <el-option v-for="item in level" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="chapter">
              <div class="text_2">{{SelectSystem=='问诊实训'?'章节/症候/方剂':'章节'}}</div>
              <el-select v-model="chapterData" filterable multiple collapse-tags size="small" placeholder="请选择">
                <el-option v-for="item in chapter" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="chapter" v-show="SelectSystem!='原文实训'?true:false">
              <div class="text_2">{{SelectSystem=='问诊实训'?'病症类别/难度':'病症类别'}}</div>
              <el-select v-model="categoryData" filterable multiple collapse-tags size="small" placeholder="请选择">
                <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="Range">
          <p class="text_1">选择考试{{SelectSystem=='问诊实训'?'知识点/类似症/相关症':'知识点'}}<span>*不勾选则视为全选</span></p>
          <div class="knowledge">
            <el-select style="margin-top:21px" v-model="knowledgeData" filterable multiple @change="ChoiceKnowledge"
              collapse-tags size="small" placeholder="请搜索或下拉选择">
              <el-option v-for="item in knowledge" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </div>
        </div>
        <div class="Range">
          <p class="text_1">已选{{SelectSystem=='问诊实训'?'知识点/类似症/相关症':'知识点'}}({{knowledgeData.length==0?'暂无知识点':knowledgeData.length}})<span @click="clickEmpty()" class="empty">清空</span></p>
          <el-main class="box_card" style="margin-top:31px">
            <p v-for="(item,i) in knowledgeData" :key="i">{{item}}<i @click="clickRemove(item)" class="el-icon-remove"></i></p>
          </el-main>
        </div>
      </div>
      <div class="main">
        <div class="Range" v-show="SelectSystem=='原文实训'?true:false" style="flex:0.7">
          <p class="text_1">*选择考试难度</p>
          <div class="knowledge">
            <el-select v-model="difficultyData" size="small" clearable placeholder="请选择试题难度">
              <el-option v-for="(item,i) in difficulty" :key="i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </div>
        <div class="Range" style="flex:0.7">
          <p class="text_1">*考试题数<span>*如选指定试题,该配置失效</span></p>
          <div class="knowledge">
            <el-input-number v-model="topicNumber" :disabled="practice" controls-position="right" size="small"
            placeholder="请填写考试题数" :min="1" :max="100"></el-input-number>
          </div>
        </div>
        <div class="Range" style="flex:0.7">
          <p class="text_1">*考试名称</p>
          <div class="knowledge">
            <el-input v-model="examinationName" maxlength="15" size="small" clearable placeholder="请填写考试名称"></el-input>
          </div>
        </div>
        <div class="Range" style="visibility:hidden"></div>
      </div>
      <div class="Question">
        <el-tabs type="border-card">
          <el-tab-pane :label="search.length==0?'题库列表':'题库列表('+search.length+')'">
            <el-main class="el_search">
              <div class="list" v-for="(item,i) in search" :key="i">
                <p class="text_1">{{i+1}}、{{item.chiefComplaint?item.chiefComplaint:item.qustionShowText}}</p>
                <p class="text_2" v-if="item.flag" @click="clickAdd(item,i)"><i class="el-icon-circle-plus"></i></p>
              </div>
              <div class="Tips">{{search.length==0?'没有可用题目':'共'+search.length+'道题'}}</div>
            </el-main>
          </el-tab-pane>
          <el-tab-pane :label="searchDataL">
            <el-main class="el_search">
              <div class="list" v-for="(item,i) in searchData" :key="i">
                <p class="text_1">{{i+1}}、{{item.chiefComplaint?item.chiefComplaint:item.qustionShowText}}</p>
                <p class="text_2" @click="clickReduce(item.id)"><i class="el-icon-remove"></i></p>
              </div>
              <div class="Tips">{{searchData.length==0?'暂无已选试题':''}}</div>
            </el-main>
          </el-tab-pane>
        </el-tabs>
        <el-button class="location" type="warning" size="mini" round icon="el-icon-search" @click="clickSearch()">搜索题库</el-button>
      </div>
      <div class="button_box"><el-button type="warning" size="small" @click="clickExamination()">开始考试</el-button></div>
    </div>
    <div v-show="modular_2" class="Answer_sheet">
      <div v-if="SelectSystem=='原文实训'">
        <div v-for="(item,i) in caseData" :key="i">
          <p class="gestive">正在进行的考试...</p>
          <div class="Answer_crad">
            <p class="title">经典原文考试系统</p>
            <p class="text_1">{{item.examinationName}}</p>
            <p class="text_1">范围</p>
            <p class="text_2 text_4">课程：<span>{{item.courseValues}}</span></p>
            <p class="text_2 text_4">级别：<span>{{item.levelValues}}</span></p>
            <p class="text_2 text_4">章节：<span>{{item.chapterValues}}</span></p>
            <p class="text_2" style="margin-top:20px">知识点：<span>{{item.knowledgePointsValues}}</span></p>
            <p class="text_2">题数：<span>{{item.practiceNum}}</span></p>
            <p class="text_2">难度：<span>{{item.practiceDifficulty}}级难度</span></p>
            <div class="set_up clear">
              <p class="text_2 text_3">发起时间：<span>{{item.createOn}}</span></p>
              <p class="text_2 text_3">进行时间：<span>{{time}}</span></p>
              <el-button type="warning" @click="clickSetUp(item.id)">收卷</el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="gestive">正在进行的考试...</p>
        <div class="Answer_crad">
          <p class="title">{{SelectSystem=="案例实训"?'经典案例实训考试系统':'经典案例实训问诊考试系统'}}</p>
          <p class="text_1">{{caseData.examinationName}}</p>
          <p class="text_1">范围</p>
          <p class="text_2 text_4">{{SelectSystem=='问诊实训'?'章节/症候/方剂':'章节'}}：<span>{{caseData.chapterIds}}</span></p>
          <p class="text_2 text_4">{{SelectSystem=='问诊实训'?'病症类别/难度':'病症类别'}}：<span>{{caseData.categoryIds}}</span></p>
          <p class="text_2" style="margin-top:20px">{{SelectSystem=='问诊实训'?'知识点/类似症/相关症':'知识点'}}：<span>{{caseData.knowledgePointsIds}}</span></p>
          <p class="text_2">最大题数：<span>{{caseData.practiceNum}}</span></p>
          <div class="set_up clear">
            <p class="text_2 text_3">发起时间：<span>{{caseData.createOn}}</span></p>
            <p class="text_2 text_3">进行时间：<span>{{time}}</span></p>
            <el-button size="medium" type="warning" @click="clickSetUp(caseData.id)">收卷</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>
<script>
export default {
  name: 'SmallBox',
  inject:['FnParent'],
  data () {
    return {
      modular_1: false,
      modular_2: false,
      SelectSystem: this.$store.state.SelectSystem, // 当前选择哪个平台
      chapter: '', // 章节
      chapterData: '', // 已选章节
      category: '', // 病症类别
      categoryData: '', // 已选病症类别
      topicNumber: undefined, // 练习题数
      examinationName: '', // 考试名称
      course: '', // 课程
      courseData: '', // 已选课程
      level: '', // 级别
      levelData: '', // 已选级别
      difficulty: '', // 考试难度数据
      difficultyData: '', // 已选考试难度数据
      knowledge: '', // 知识点
      knowledgeData: [], // 已选知识点数据
      knowledgeId: '', // 已选知识点ID
      search: '', // 题库
      searchData: [], // 已选题库
      searchId: [], // 已选题库ID
      searchDataL: '已选列表',
      practice: false, // 练习题数禁用变量
      caseData: '', // 已开启的考试数据
      time: '', // 考试用时
      setInterval: '', // 定时器
    }
  },
  created() {
    let that = this
    that.FnShowData()
    that.FnOptionData()
  },
  mounted() {
    this.setInterval = setInterval(this.TimeToProceed,1000)
  },
  beforeDestroy() {
    clearInterval(this.setInterval)
  },
  methods: {
    ChoiceKnowledge(value,id) { // 选择知识点
      let that = this
      let knowledgeId = []
      that.knowledgeData = value
      for(var i = 0; i < that.knowledgeData.length; i++){
        for(var j = 0; j < that.knowledge.length; j++){
          if (that.knowledge[j].name == that.knowledgeData[i]) {
            knowledgeId.push(that.knowledge[j].id)
            that.knowledgeId = knowledgeId.toString()
          }
        }
      }
      if(that.knowledgeData.length == 0){
        that.knowledgeId = ''
      }
    },
    clickRemove(e) { // 点击移除知识点
      let that = this
      let knowledgeId = []
      for(var i = 0; i < that.knowledgeData.length; i++){
        if (that.knowledgeData[i] == e) {
          that.knowledgeData.splice(i,1)
        }
      }
      for(var i = 0; i < that.knowledgeData.length; i++){
        for(var j = 0; j < that.knowledge.length; j++){
          if (that.knowledge[j].name == that.knowledgeData[i]) {
            knowledgeId.push(that.knowledge[j].id)
            that.knowledgeId = knowledgeId.toString()
          }
        }
      }
      if(that.knowledgeData.length == 0){
        that.knowledgeId = ''
      }
    },
    clickEmpty() { // 点击清空知识点
      let that = this
      if(that.knowledgeData.length != 0){
        that.knowledgeData = ''
        that.knowledgeId = ''
      }
    },
    clickSearch() { // 搜索题库
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'originalExamination/searchQuestionList',
          method: 'post',
          data: {
            chapterIds: that.chapterData.toString(),
            courseIds: that.courseData.toString(),
            levelIds: that.levelData.toString(),
            knowledgeIds: that.knowledgeId
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.search = res.data.data.questionList
            if (res.data.data.questionList.length != 0) {
              for(var i = 0; i < that.search.length; i++){
                for(var j = 0; j < that.searchData.length; j++){
                  if (that.search[i].id == that.searchData[j].id) {
                    that.search[i].flag = false
                  }
                }
              }
            } else {
              this.$message({
                message: '没有搜到可用题目',
                type: 'warning'
              })
            }
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      } else {
        let url = ''
        if (that.SelectSystem == '案例实训') {
          url = that.$store.state.Q_http + 'caseExamination/queryCaseExamQuestion'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroExamination/queryInterrogationExamQuestion'
        }
        that.$axios({
          url: url,
          method: 'post',
          data: {
            chapterIds: that.chapterData.toString(),
            categoryIds: that.categoryData.toString(),
            knowledgePointsIds: that.knowledgeId
          }
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.search = res.data.data.data
            if (res.data.data.data.length != 0) {
              for(var i = 0; i < that.search.length; i++){
                for(var j = 0; j < that.searchData.length; j++){
                  if (that.search[i].id == that.searchData[j].id) {
                    that.search[i].flag = false
                  }
                }
              }
            } else {
              this.$message({
                message: '没有搜到可用题目',
                type: 'warning'
              })
            }
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      }
    },
    clickAdd(value,index) { // 点击添加试题
      let that = this
      if (that.searchData.length == 100) {
        that.$message({
          message: '最多可选100道试题', type: 'warning'
        })
        return
      }
      that.topicNumber = undefined
      that.practice = true
      that.search[index].flag = false
      that.searchData.push(value)
      that.searchId.push(value.id)
      that.searchDataL = '已选列表（'+ that.searchData.length +'）'
    },
    clickReduce(id) { // 点击移除试题
      let that = this
      for(var j = 0; j < that.search.length; j++){
        if (that.search[j].id == id) {
          that.search[j].flag = true
        }
      }
      for(var i = 0; i < that.searchData.length; i++){
        if (that.searchData[i].id == id) {
          that.searchData.splice(i,1)
        }
      }
      for(var i = 0; i < that.searchId.length; i++){
        if (that.searchId[i] == id) {
          that.searchId.splice(i,1)
        }
      }
      that.searchDataL = '已选列表（'+ that.searchData.length +'）'
      if (that.searchData.length == 0) {
        that.searchDataL = '已选列表'
        that.practice = false
      } else {
        that.searchDataL = '已选列表（'+ that.searchData.length +'）'
      }
    },
    clickExamination() { // 开始考试
      let that = this
      if (that.SelectSystem == '原文实训') {
        if (!that.difficultyData) {
          that.$message({
            message: '请选择考试难度~',
            type: 'warning'
          })
          return
        }
        if (that.searchData.length == 0) {
          if (!that.topicNumber) {
            that.$message({
              message: '请输入考试题数~',
              type: 'warning'
            })
            return
          }
        }
        if (!that.examinationName) {
          that.$message({
            message: '请填写考试名称~',
            type: 'warning'
          })
          return
        }
        that.$axios({
          url: that.$store.state.Q_http + 'originalExamination/saveOriginalExamination',
          method: 'post',
          data: {
            patternType: 3,
            examinationName: that.examinationName,
            createUserId: that.$store.state.loginData.user.id,
            chapterIds: that.chapterData.toString(),
            knowledgePointsIds: that.knowledgeId,
            levelIds: that.levelData.toString(),
            practiceNum: that.searchData.length==0?that.topicNumber:that.searchData.length,
            questionIds: that.searchId.toString(),
            courseIds: that.courseData.toString(),
            practiceDifficulty: that.difficultyData,
          }
        }).then((res) =>{
          // console.log(res.data)
          if (res.data.code == 200) {
            if (res.data.data.errorCode) {
              that.$message.error({
                message: res.data.data.msg
              })
            } else {
              that.courseData = '' // 已选课程
              that.levelData = '' // 已选级别
              that.difficultyData = '' // 已选难度
              that.examinationName = '' //考试名称置空
              that.chapterData = '' // 已选章节置空
              that.categoryData = '' // 已选病症类别置空
              that.knowledgeData = '' // 已选知识点置空
              that.knowledgeId = '' // 已选知识点ID置空
              that.topicNumber = undefined // 练习题数置空
              that.search = '' // 题库置空
              that.searchData = [] // 已选题库置空
              that.searchId = [] // 已选题库ID置空
              that.practice = false // 开启练习题数
              that.searchDataL = '已选列表'
              that.FnParent()
              that.FnShowData()
            }
          } else {
            that.$message.error(res.data.message)
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      } else {
        let url = ''
        if (that.SelectSystem == '案例实训') {
          url = that.$store.state.Q_http + 'caseExamination/caseExamBeginTeacher'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroExamination/caseExamBeginTeacher'
        }
        that.$axios({
          url: url,
          method: 'post',
          data: {
            patternType: 3,
            examinationName: that.examinationName,
            createUserId: that.$store.state.loginData.user.id,
            chapterIds: that.chapterData.toString(),
            categoryIds: that.categoryData.toString(),
            knowledgePointsIds: that.knowledgeId,
            practiceNum: that.searchData.length==0?that.topicNumber:that.searchData.length,
            questionIds: that.searchId.toString()
          }
        }).then((res) =>{
          // console.log(res.data)
          if (res.data.code == 200) {
            if (res.data.data.code != 200) {
              that.$message.error({
                message: res.data.data.message
              })
            } else {
              that.modular_1 = false
              that.modular_2 = true
              that.caseData = res.data.data
              that.examinationName = '' //考试名称置空
              that.ChapterData = '' // 已选章节置空
              that.CategoryData = '' // 已选病症类别置空
              that.knowledgeData = '' // 已选知识点置空
              that.knowledgeId = '' // 已选知识点ID置空
              that.topicNumber = undefined // 练习题数置空
              that.search = '' // 题库置空
              that.searchData = [] // 已选题库置空
              that.searchId = [] // 已选题库ID置空
              that.practice = false // 开启练习题数
              that.searchDataL = '已选列表'
              that.FnParent()
            }
          } else {
            that.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      }
    },
    clickSetUp(id) { // 收卷
      let that = this
      that.$confirm('确认要收卷吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (that.SelectSystem == '原文实训') {
          that.$axios({
            url: that.$store.state.Y_http + 'examinationQuestion/updateCollectPapers',
            method: 'post',
            data: { examinationId: id }
          }).then((res) =>{
            // console.log(res.data)
            if (res.data.code == 200) {
              that.$message({
                type: 'success',
                message: '收卷成功!',
                duration: '1000',
                onClose: function () {
                  that.FnShowData()
                  clearInterval(that.setInterval)
                }
              })
            }
          }).catch((err) =>{
            that.$message.error('请求失败!')
          })
        } else {
          let url = ''
          if (that.SelectSystem == '案例实训') {
            url = that.$store.state.Q_http + 'caseExamination/caseTeacherSubmitExam'
          } else if (that.SelectSystem == '问诊实训') {
            url = that.$store.state.Q_http + 'interroExamination/caseTeacherSubmitExam'
          }
          that.$axios({
            url: url,
            method: 'post',
            data: { id: id }
          }).then((res) =>{
            // console.log(res.data)
            if (res.data.code == 200) {
              that.$message({
                type: 'success',
                message: '收卷成功!',
                duration: '1000',
                onClose: function () {
                  that.modular_1 = true
                  that.modular_2 = false
                  clearInterval(that.setInterval)
                }
              })
            }
          }).catch((err) =>{
            that.$message.error('请求失败!')
          })
        }
      }).catch(() => {})
    },

    // 执行区域函数
    FnShowData() {
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Q_http + 'originalExamination/queryExamination',
          method: 'post',
          data: {
            userId: that.$store.state.loginData.user.id,
            type: 1,
            patternType: 3,
          }
        }).then((res) =>{
          // console.log(res.data)
          if (res.data.code == 200) {
            if(res.data.data.length === 0){
              that.modular_1 = true
              that.modular_2 = false
            } else {
              that.modular_1 = false
              that.modular_2 = true
              that.caseData = res.data.data
            }
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      } else {
        let url = ''
        if (that.SelectSystem == '案例实训') {
          url = that.$store.state.Q_http + 'caseExamination/caseMainInformation'
        } else if (that.SelectSystem == '问诊实训') {
          url = that.$store.state.Q_http + 'interroExamination/mainInformation'
        }
        that.$axios({
          url: url,
          method: 'post',
          data: { patternType: 3 }
        }).then((res) =>{
          // console.log(res.data)
          if (res.data.code == 200) {
            if (res.data.data.code == 200) {
              that.modular_1 = false
              that.modular_2 = true
              that.caseData = res.data.data
            } else {
              that.modular_1 = true
              that.modular_2 = false
              that.knowledge = res.data.data.KnowledgePoints
              that.category = res.data.data.Category
              that.chapter = res.data.data.Chapter
            }
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      }
    },
    FnOptionData() { // 请求下拉筛选条件数据（知识点、章节、病症类别、模式）
      let that = this
      if (that.SelectSystem == '原文实训') {
        that.$axios({
          url: that.$store.state.Y_http + 'originalType/queryOriginalTypeByTypeNew',
          method: 'post',
        }).then((res) =>{
          // console.log(res.data.data)
          if (res.data.code == 200) {
            that.knowledge = res.data.data.KnowledgePoints
            that.chapter = res.data.data.Chapter
            that.level = res.data.data.level
            that.course = res.data.data.course
            that.difficulty = res.data.data.difficulty
          }
        }).catch((err) =>{
          that.$message.error('请求失败!')
        })
      }
    },
    TimeToProceed() { // 考试进行时间
      let that = this
      if (that.caseData) {
        let createOn = ''
        if (that.SelectSystem == '原文实训') {
          createOn = that.caseData[0].createOn
        } else {
          createOn = that.caseData.createOn
        }
        let sDate1 = Date.parse(new Date())
        let sDate2 = Date.parse(createOn)
        let leave1 = sDate1 - sDate2
        let days = Math.floor(leave1/(24*3600*1000))
        let leave2 = leave1%(24*3600*1000)
        let hours = Math.floor(leave2/(3600*1000))
        let leave3 = leave2%(3600*1000)
        let minutes = Math.floor(leave3/(60*1000))
        let leave4 = leave3%(60*1000)
        let second = Math.floor(leave4/(1000))
        let time = ''
        if (days == 0) {
          if (hours == 0) {
            time =  minutes + "分钟" + (second) + "秒"
          } else {
            time =  hours + "小时" + minutes + "分钟" + (second) + "秒"
          }
        } else {
          time =  days + '天' + hours + "小时" + minutes + "分钟" + (second) + "秒"
        }
        that.time = time
      }
    },
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
.SmallBox .header,.main{
  box-sizing: border-box;
  display: flex;
  height:100px;
  margin-bottom:30px;
}
.SmallBox .Range{
  flex:1;
}
.SmallBox .Range .text_1{
  color:#333;
  font-size:17px;
  font-weight: bold;
  position: relative;
}
.SmallBox .Range .text_1 .empty{
  position: absolute;
  right:5px;
  top:5px;
  cursor:pointer;
}
.SmallBox .Range .text_1 .empty:hover{
  color: #BF8333;
}
.SmallBox .Range .text_1 span{
  color:#333;
  font-weight:400;
  font-size:12px;
  margin-left:5px;
}
.chapter,.knowledge{
  margin-top:10px;
}
.contact{
  display: flex;
  padding-right:30px;
}
.contact .chapter{
  flex: 1;
  margin-right:10px;
}
.contact .chapter .text_2{
  width:100px;
  color:#333;
  font-size:13px;
  margin-bottom:5px;
  margin-left:5px;
}
.el-input,.el-input-number{
  width:200px;
}
.el_search{
  padding:0;
  max-height: calc(100vh - 400px);
}
.el_search .list{
  color:#333;
  font-size:16px;
  padding:10px 10px 10px 0;
  margin-right:10px;
  border-bottom:1px solid #DCDFE6;
  display:flex;
  justify-content: space-between;
}
.el_search .list .text_1{
  width:97%;
}
.el_search .list .text_2{
  display: flex;
  justify-content: center;
  align-items: center;
}
.el_search .list p i{
  color: #333;
  cursor: pointer;
}
.el_search .list p i:hover{
  color:#BF8333;
  border-radius:50%;
}
.el_search .Tips{
  text-align: center;
  color:#333;
  font-size:12px;
  margin-top:10px;
}
.Question{
  position: relative;
}
.location{
  position: absolute;
  top:6px;
  right:5px;
}
.box_card{
  margin-top:10px;
  height:150px;
  border:1px solid #DCDFE6;
  padding:0 10px;
}
.box_card p{
  margin-top:7px;
  color:#333;
  font-size:15px;
  display:flex;
  align-items: center;
  justify-content: space-between;
}
.box_card p:last-child{
  margin-bottom:7px;
}
.box_card p i{
  color:red;
}
.box_card p i:hover{
  cursor: pointer;
}
.button_box{
  margin-top:20px;
  display: flex;
  justify-content: center;
}

/* 考试卡片 */
.Answer_sheet{
  padding:10px;
  background:#fff;
  box-sizing: border-box;
}
.Answer_sheet .gestive{
  color:#333;
  font-weight: bold;
  font-size:15px;
}
.Answer_crad{
  width:350px;
  background:#f5f5f5;
  padding:10px 15px;
  margin-top:15px;
  box-sizing: border-box;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
}
.Answer_crad .title{
  text-align: center;
  color:#333;
  font-weight: bold;
  font-size:15px;
}
.Answer_crad .text_1{
  color:#333;
  font-size:14px;
  font-weight: bold;
  margin:7px 0 15px;
}
.Answer_crad .text_2{
  color:#333;
  font-size:14px;
  font-weight: bold;
  margin-top:5px;
}
.Answer_crad .text_3{
  width:60%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.Answer_crad .text_4{
  margin-left:15px;
}
.Answer_crad p span{
  color:#333;
  font-weight: 400;
  font-size:12px;
}
.Answer_crad .set_up{
  width:100%;
  box-sizing: border-box;
  margin-top:15px;
  border-top:1px solid #DCDFE6;
  padding:10px 0;
}
.Answer_crad .set_up .el-button{
  padding:10px 20px;
  font-size:10px;
  float: right;
}
</style>
