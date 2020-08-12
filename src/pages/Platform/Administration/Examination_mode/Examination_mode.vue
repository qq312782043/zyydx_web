<template>
  <el-main class="Examination">
    <div class="header">
      <div class="Range">
        <p class="text_1">选择考试范围<span>*不勾选则视为全选</span></p>
        <div class="chapter">
          <el-cascader :options="chapter" :show-all-levels="false" collapse-tags
            size="small" :props="{ multiple: true, checkStrictly: true }">
          </el-cascader>
        </div>
      </div>
      <div class="Range">
        <p class="text_1">选择考试知识点<span>*不勾选则视为全选</span></p>
        <div class="knowledge">
          <el-select v-model="value_1" filterable multiple @change="clickChoice"
            collapse-tags size="small" placeholder="请搜索或下拉选择知识点">
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
        <p class="text_1">*选择考试难度</p>
        <div class="chapter">
          <el-select v-model="value_2" size="small" clearable placeholder="请选择试题难度">
            <el-option v-for="(item,i) in difficulty" :key="i" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="Range">
        <p class="text_1">*练习题数<span>*如选择指定试题，该项配置失效</span></p>
        <div class="knowledge">
          <el-input v-model="value_3" size="small" clearable placeholder="请输入练习题数"></el-input>
        </div>
      </div>
      <div class="Range"></div>
    </div>
    <div class="main">
      <div class="Range">
        <p class="text_1">*考试名称</p>
        <div class="knowledge">
          <el-input v-model="value_4" size="small" clearable placeholder="请输入考试名称"></el-input>
        </div>
      </div>
      <div class="Range"></div>
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
    <div class="button_box"><el-button type="primary">开始考试</el-button></div>
  </el-main>
</template>

<script>
export default {
  name: 'Examination',
  data () {
    return {
      value_1: [],
      value_2: [],
      value_3: '',
      value_4: '',
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
      },{
        value: '选项4',
        label: '龙须面'
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
      }]
    }
  },
  methods: {
    clickChoice(value) { // 选择知识点
      let that = this
      that.Selected_data = value
    },
    clickAdd(value,index) { // 点击添加试题
      let that = this
      that.search[index].bol = false
      that.PointeData.push(value)
      let length = that.PointeData.length
      that.PointeDataL = '已选列表（'+ length +'）'
    },
    clickReduce(value) { // 点击移除试题
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
      } else {
        that.PointeDataL = '已选列表（'+ length +'）'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Examination{
  width:100%;
  height:87%;
  box-sizing: border-box;
  border:1px solid #DCDFE6;
  margin-top:15px;
  padding:15px;
}
.Examination .header,.main{
  box-sizing: border-box;
  display: flex;
  height:100px;
}
.Examination .Range{
  flex:1;
}
.Examination .Range .text_1{
  color:#333;
  font-size:17px;
  font-weight: bold;
}
.Examination .Range .text_1 span{
  color:#666;
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
  max-height: 280px;
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
</style>
