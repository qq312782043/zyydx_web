<template>
  <el-main class="SmallBox">
    <div v-show="modular_1">
      <div class="header">
        <div class="Range">
          <p class="text_1">选择练习范围<span>*不勾选则视为全选</span></p>
          <div class="chapter">
            <el-cascader v-model='value_1' :options="chapter" :show-all-levels="false"
              collapse-tags size="small" :props="{ multiple: true, checkStrictly: true }">
            </el-cascader>
          </div>
        </div>
        <div class="Range">
          <p class="text_1">选择练习知识点<span>*不勾选则视为全选</span></p>
          <div class="knowledge">
            <el-select v-model="value_2" filterable multiple
              @change="clickChoice" collapse-tags size="small" placeholder="请搜索或下拉选择知识点">
              <el-option v-for="item in knowledge" :key="item.value" :label="item.label" :value="item.label"></el-option>
            </el-select>
          </div>
        </div>
        <div class="Range">
          <p class="text_1">已选知识点</p>
          <el-main class="box_card">
            <p v-for="(item,i) in Selected_data" :key="i">{{item}}</p>
          </el-main>
        </div>
      </div>
      <div class="main">
        <div class="Range">
          <p class="text_1">*选择练习难度</p>
          <div class="chapter">
            <el-select v-model="value_3" size="small" clearable placeholder="请选择试题难度">
                <el-option v-for="(item,i) in difficulty"
                  :key="i" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
          </div>
        </div>
        <div class="Range">
          <p class="text_1">*练习题数<span>*如选择指定试题，该项配置失效</span></p>
          <div class="knowledge">
            <el-input v-model="value_4" :disabled="practice" size="small" clearable placeholder="请输入练习题数"></el-input>
          </div>
        </div>
        <div class="Range"></div>
      </div>
      <div class="Question">
        <el-tabs type="border-card">
          <el-tab-pane label="题库列表">
            <el-main class="el_search">
              <div class="list" v-for="(item,i) in search" :key="i">
                <p class="text_1">{{item.list}}</p>
                <p class="text_2" v-if="item.bol" @click="clickAdd(item.list,i)"><i class="el-icon-circle-plus"></i></p>
              </div>
              <div class="Tips">{{search.length==0?'没有可用题目':'共'+search.length+'道题'}}</div>
            </el-main>
          </el-tab-pane>
          <el-tab-pane :label="PointeDataL">
            <el-main class="el_search">
              <div class="list" v-for="(item,i) in PointeData" :key="i">
                <p class="text_1">{{item}}</p>
                <p class="text_2" @click="clickReduce(item)"><i class="el-icon-remove"></i></p>
              </div>
              <div class="Tips">{{PointeData.length==0?'暂无已选试题':''}}</div>
            </el-main>
          </el-tab-pane>
        </el-tabs>
        <el-button class="location" type="success" size="mini" round icon="el-icon-search">搜索题库</el-button>
      </div>
      <div class="button_box"><el-button type="primary" size="small" @click="clickExamination()">开始课堂练习</el-button></div>
    </div>
    <div v-show="modular_2" class="Answer_sheet">
      <p class="gestive">正在进行的课堂练习...</p>
      <div class="Answer_crad">
        <p class="title">经典原文课堂练习</p>
        <p class="text_1">范围</p>
        <p class="text_2">课程：<span>伤寒、温病</span></p>
        <p class="text_2">级别：<span>一级、二级</span></p>
        <p class="text_2">章节：<span>全部</span></p>
        <p class="text_2" style="margin-top:10px">知识点：<span>虚劳迈向，体弱多病</span></p>
        <p class="text_2">提数：<span>100</span></p>
        <p class="text_2">难度：<span>10级难度</span></p>
        <div class="set_up">
          <p class="text_2 text_3">发起时间：<span>2020/6-22 12:00</span></p>
          <p class="text_2 text_3">进行时间：<span>30分20秒</span></p>
          <el-button type="success" @click="clickSetUp()">设置新的练习范围</el-button>
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
      modular_2: true,
      value_1: '',
      value_2: [],
      value_3: '',
      value_4: '',
      practice: false,
      Selected_data: [],
      PointeData: [],
      PointeDataL: '已选列表',
      knowledge: [{
        value: '选项1',
        label: '黄金糕'
      },{
        value: '选项2',
        label: '双皮奶'
      },{
        value: '选项3',
        label: '蚵仔煎'
      }],
      difficulty: [{
        value: '选项1',
        label: '1级'
      },{
        value: '选项2',
        label: '2级'
      },{
        value: '选项3',
        label: '3级'
      }],
      contact: [{
        value: '选项1',
        label: '黄金糕'
      },{
        value: '选项2',
        label: '双皮奶'
      },{
        value: '选项3',
        label: '蚵仔煎'
      }],
      chapter: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          },{
            value: 'fankui',
            label: '反馈'
          }]
        },{
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          },{
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      },{
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          },{
            value: 'color',
            label: 'Color 色彩'
          }]
        },{
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          },{
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }]
        },{
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          },{
            value: 'tag',
            label: 'Tag 标签'
          },{
            value: 'progress',
            label: 'Progress 进度条'
          }]
        }]
      }],
      search: [{
        list:'第1题',
        bol: true
      },{
        list:'第2题',
        bol: true
      },{
        list:'第3题',
        bol: true
      },{
        list:'第4题',
        bol: true
      },{
        list:'第5题',
        bol: true
      },{
        list:'第6题',
        bol: true
      },{
        list:'第7题',
        bol: true
      },{
        list:'第8题',
        bol: true
      },{
        list:'第9题',
        bol: true
      },{
        list:'第10题',
        bol: true
      },{
        list:'第11题',
        bol: true
      },{
        list:'第12题',
        bol: true
      },{
        list:'第13题',
        bol: true
      },{
        list:'第14题',
        bol: true
      },{
        list:'第15题',
        bol: true
      },{
        list:'第16题',
        bol: true
      },{
        list:'第17题',
        bol: true
      },{
        list:'第18题',
        bol: true
      }]
    }
  },
  methods: {
    clickChoice(value) { // 选择知识点
      let that = this
      that.Selected_data = value
    },
    clickAdd(value,index) { // 添加题库
      let that = this
      that.value_4 = ''
      that.practice = true
      that.search[index].bol = false
      that.PointeData.push(value)
      let length = that.PointeData.length
      that.PointeDataL = '已选列表（'+ length +'）'
    },
    clickReduce(value) { // 移除题库
      let that = this
      for(var j = 0; j < that.search.length; j++){
        if (that.search[j].list == value) {
          that.search[j].bol = true
        }
      }
      for(var i = 0; i < that.PointeData.length; i++){
        if (that.PointeData[i] == value) {
          that.PointeData.splice(i,1)
        }
      }
      let length = that.PointeData.length
      that.PointeDataL = '已选列表（'+ length +'）'
      if (length == 0) {
        that.PointeDataL = '已选列表'
        that.practice = false
      } else {
        that.PointeDataL = '已选列表（'+ length +'）'
      }
    },
    clickSetUp() { // 设置新的练习题
      let that = this
      that.modular_1 = true
      that.modular_2 = false
    },
    clickExamination() { // 开始考试
      let that = this
      if (!that.value_3) {
        that.$message.error({
          message: '请选择练习难度~'
        })
        return
      }
      if(that.PointeData.length == 0){
        if (!that.value_4) {
          that.$message.error({
            message: '请填写练习题数~'
          })
          return
        }
      }
      that.modular_1 = false
      that.modular_2 = true
      that.value_1 = ''
      that.value_2 = []
      that.value_3 = ''
      that.value_4 = ''
      that.practice = false
      that.Selected_data = []
      that.PointeData = []
      that.PointeDataL = '已选列表（'+ length +'）'
      for(var i = 0; i < that.search.length; i++){
        that.search[i].bol = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.SmallBox .header,.main{
  box-sizing: border-box;
  display: flex;
  height:100px;
}
.SmallBox .Range{
  flex:1;
}
.SmallBox .Range .text_1{
  color:#333;
  font-size:17px;
  font-weight: bold;
}
.SmallBox .Range .text_1 span{
  color:#333;
  font-weight: 400;
  font-size:12px;
  margin-left:10px;
}
.chapter,.knowledge{
  margin-top:15px;
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
  padding:10px;
}
.box_card p{
  margin-bottom:4px;
  color:#333;
  font-size:15px;
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
  text-align: center;
  font-weight: bold;
  margin-top:7px;
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
  position: relative;
  padding:10px 0;
}
.Answer_crad .set_up .el-button{
  position: absolute;
  right:0;
  bottom:5px;
  padding:10px 5px;
  font-size:10px;
}
</style>
