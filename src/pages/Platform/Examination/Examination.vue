<template>
  <div class="whole">
    <div class="title">经典案例实训考试分数比例设置<span>*四项分数的总和必须为10分</span></div>
    <div class="input_box" v-for="(item,i) in dataList" :key="i">
      <p>{{item.text}}</p>
      <el-input placeholder="请输入" v-model="item.value" clearable size="small" @blur="onValue(item.value,i)" maxlength="1"> </el-input>
    </div>
    <div class="footer">
      <el-button type="primary" size="small" @click="clickPreservation()">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      dataList:[{
        text: '诊断分数：',
        value: ''
      },{
        text: '病机分数：',
        value: ''
      },{
        text: '治法分数：',
        value: ''
      },{
        text: '方药分数：',
        value: ''
      }]
    }
  },
  methods: {
    onValue(value,i) { // 输入框失焦监听事件
      console.log(value,i)
    },
    clickPreservation() { // 点击保存
      let that = this
      // console.log(that.dataList)
      that.$alert('四项分数总和必须为10分~', '提示', {
        confirmButtonText: '好的',
        callback: action => {}
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  color:#333;
  font-size:15px;
  font-weight:bold;
  box-sizing: border-box;
  padding:20px;
}
.title span{
  color:#666;
  font-size:12px;
  font-weight:400;
  margin-left:10px;
}
.input_box{
  display:flex;
  align-items: center;
  box-sizing: border-box;
  padding:15px 20px;
}
.input_box p{
  font-size:15px;
  color:#666;
  margin-right:10px;
}
.input_box .el-input{
  width:120px;
}
.footer{
  display: flex;
  justify-content: center;
  margin-top:250px;
}
</style>
