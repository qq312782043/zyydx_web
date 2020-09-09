<template>
  <el-main class="SmallBox">
    <div v-show="modular_1">
      <div class="header">
        <div class="Range">
          <p class="text_1">选择练习范围<span>*不勾选则视为全选</span></p>
          <div class="contact">
            <div class="chapter">
              <div class="text_2">章节</div>
              <el-select v-model="ChapterData" filterable multiple collapse-tags size="small" placeholder="请选择">
                <el-option v-for="item in Chapter" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="chapter">
              <div class="text_2">病症类别</div>
              <el-select v-model="CategoryData" filterable multiple collapse-tags size="small" placeholder="请选择">
                <el-option v-for="item in Category" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="Range">
          <p class="text_1">选择练习知识点<span>*不勾选则视为全选</span></p>
          <div class="knowledge">
            <el-select style="margin-top:22px" v-model="knowledgeData" filterable multiple @change="ChoiceKnowledge"
              collapse-tags size="small" placeholder="请搜索或下拉选择知识点">
              <el-option v-for="item in knowledge" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </div>
        </div>
        <div class="Range">
          <p class="text_1">已选知识点({{knowledgeData.length}})<span @click="clickEmpty()" class="empty">清空</span></p>
          <el-main class="box_card" style="margin-top:31px">
            <p v-for="(item,i) in knowledgeData" :key="i">{{item}}<i @click="clickRemove(item)" class="el-icon-remove"></i></p>
          </el-main>
        </div>
      </div>
      <div class="main">
        <div class="Range" v-show="SelectSystem=='原文实训'?true:false">
          <p class="text_1">*选择练习难度</p>
          <div class="knowledge">
            <el-select v-model="difficultyData" size="small" clearable placeholder="请选择试题难度">
              <el-option v-for="(item,i) in difficulty" :key="i" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="Range">
          <p class="text_1">*练习题数<span>*如选择指定试题，该项配置失效</span></p>
          <div class="knowledge">
            <el-input v-model="topicNumber" :disabled="practice" size="small" clearable placeholder="请输入练习题数"></el-input>
          </div>
        </div>
        <div class="Range" style="visibility:hidden"></div>
      </div>
      <div class="Question">
        <el-tabs type="border-card">
          <el-tab-pane :label="search.length==0?'题库列表':'题库列表('+search.length+')'">
            <el-main class="el_search">
              <div class="list" v-for="(item,i) in search" :key="i">
                <p class="text_1">{{i+1}}、{{item.chiefComplaint}}</p>
                <p class="text_2" v-if="item.flag" @click="clickAdd(item,i)"><i class="el-icon-circle-plus"></i></p>
              </div>
              <div class="Tips">{{search.length==0?'没有可用题目':'共'+search.length+'道题'}}</div>
            </el-main>
          </el-tab-pane>
          <el-tab-pane :label="searchDataL">
            <el-main class="el_search">
              <div class="list" v-for="(item,i) in searchData" :key="i">
                <p class="text_1">{{i+1}}、{{item.chiefComplaint}}</p>
                <p class="text_2" @click="clickReduce(item.id)"><i class="el-icon-remove"></i></p>
              </div>
              <div class="Tips">{{searchData.length==0?'暂无已选试题':''}}</div>
            </el-main>
          </el-tab-pane>
        </el-tabs>
        <el-button class="location" type="warning" size="mini" round icon="el-icon-search" @click="clickSearch()">搜索题库</el-button>
      </div>
      <div class="button_box"><el-button type="warning" size="small" @click="clickExamination()">开始课堂练习</el-button></div>
    </div>
    <div v-show="modular_2" class="Answer_sheet">
      <p class="gestive">正在进行的课堂练习...</p>
      <div class="Answer_crad">
        <p class="title">经典案例实训课堂练习</p>
        <p class="text_1">范围</p>
        <p class="text_2 text_4">章节：<span>{{caseData.chapterIds}}</span></p>
        <p class="text_2 text_4">病症类别：<span>{{caseData.categoryIds}}</span></p>
        <p class="text_2" style="margin-top:20px">知识点：<span>{{caseData.knowledgePointsIds}}</span></p>
        <p class="text_2">题数：<span>{{caseData.practiceNum}}</span></p>
        <div class="set_up clear">
          <p class="text_2 text_3">发起时间：<span>{{caseData.createOn}}</span></p>
          <el-button type="warning" @click="clickSetUp()">设置新的练习范围</el-button>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'SmallBox',
  data () {
    return {
      modular_1: false,
      modular_2: false,
      SelectSystem: this.$store.state.SelectSystem, // 当前选择哪个平台
      Chapter: '', // 章节
      ChapterData: '', // 已选章节
      Category: '', // 病症类别
      CategoryData: '', // 已选病症类别
      topicNumber: '', // 练习题数
      difficulty: '', // 考试难度
      difficultyData: '', // 已选考试难度
      knowledge: '', // 知识点
      knowledgeData: [], // 已选知识点
      knowledgeId: '', // 已选知识点ID
      search: '', // 题库
      searchData: [], // 已选题库
      searchId: [], // 已选题库ID
      searchDataL: '已选列表',
      practice: false, // 练习题数禁用变量
      caseData: '', // 已开启的练习数据
    }
  },
  created() {
    let that = this
    that.$axios({
      url: that.$store.state.Q_http + 'caseExamination/caseMainInformation',
      method: 'post',
      data: {
        patternType: 2,
      }
    }).then((res) =>{
      // console.log(res.data)
      if (res.data.code == 200) {
        if(res.data.data.code == 200){
          that.modular_1 = false
          that.modular_2 = true
          that.caseData = res.data.data
        } else {
          that.modular_1 = true
          that.modular_2 = false
          that.knowledge = res.data.data.KnowledgePoints
          that.Category = res.data.data.Category
          that.Chapter = res.data.data.Chapter
        }
      }
    }).catch((err) =>{
      that.$message.error('请求失败!')
    })
  },
  methods: {
    ChoiceKnowledge(value) { // 选择知识点
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
      that.$axios({
        url: that.$store.state.Q_http + 'caseExamination/queryCaseExamQuestion',
        method: 'post',
        data: {
          chapterIds: that.ChapterData.toString(),
          categoryIds: that.CategoryData.toString(),
          knowledgePointsIds: that.knowledgeId
        }
      }).then((res) =>{
        console.log(res.data.data)
        if (res.data.code == 200) {
          that.search = res.data.data.data
          for(var i = 0; i < that.search.length; i++){
            for(var j = 0; j < that.searchData.length; j++){
              if (that.search[i].id == that.searchData[j].id) {
                that.search[i].flag = false
              }
            }
          }
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    },
    clickAdd(value,index) { // 添加题库
      let that = this
      that.topicNumber = ''
      that.practice = true
      that.search[index].flag = false
      that.searchData.push(value)
      that.searchId.push(value.id)
      that.searchDataL = '已选列表（'+ that.searchData.length +'）'
    },
    clickReduce(id) { // 移除题库
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
    clickExamination() { // 开始练习
      let that = this
      let data = {
        patternType: 2,
        createUserId: that.$store.state.loginData.user.id,
        chapterIds: that.ChapterData.toString(),
        categoryIds: that.CategoryData.toString(),
        knowledgePointsIds: that.knowledgeId,
        practiceNum: that.topicNumber || that.searchData.length,
        questionIds: that.searchId.toString()
      }
      that.$axios({
        url: that.$store.state.Q_http + 'caseExamination/caseExamBeginTeacher',
        method: 'post',
        data: data
      }).then((res) =>{
        // console.log(res.data)
        // console.log(data)
        if (res.data.code == 200) {
          that.modular_1 = false
          that.modular_2 = true
          that.caseData = res.data.data
          that.ChapterData = '' // 已选章节置空
          that.CategoryData = '' // 已选病症类别置空
          that.knowledgeData = '' // 已选知识点置空
          that.topicNumber = '' // 练习题数置空
          that.search = '' // 题库置空
          that.searchData = [] // 已选题库置空
          that.practice = false // 开启练习题数
          that.searchDataL = '已选列表'
        } else {
          that.$message.error({
            message: res.data.message
          })
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    },
    clickSetUp() { // 设置新的练习题
      let that = this
      that.$axios({
        url: that.$store.state.Q_http + 'caseExamination/queryCaseExamQuestionBefore',
        method: 'post',
        data: {
          patternType: 2
        }
      }).then((res) =>{
        // console.log(res.data)
        if (res.data.code == 200) {
          that.modular_1 = true
          that.modular_2 = false
          that.knowledge = res.data.data.KnowledgePoints
          that.Category = res.data.data.Category
          that.Chapter = res.data.data.Chapter
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-select{
  overflow: hidden;
}
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
  font-weight: 400;
  font-size:12px;
  margin-left:10px;
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
.el-input{
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
  color:#41a310;
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
  width:100%;
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
  color:red
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
  margin-left:25px;
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
  padding:10px 5px;
  font-size:10px;
  float: right;
}
</style>
