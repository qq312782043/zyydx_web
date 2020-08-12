<template>
  <el-main class="whole">
    <div class="Goback">
      <el-button type="text" icon="el-icon-arrow-left" @click="GoBack">返回</el-button>
    </div>
    <div class="header">
      <div class="input_box">
        <p>章节</p>
        <el-select v-model="value_1" size="small" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value"
          :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="input_box">
        <p>病症类别</p>
        <el-select v-model="value_2" size="small" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value"
          :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="input_box"></div>
      <div class="input_box"><p>编辑</p></div>
    </div>
    <div class="header">
      <div class="input_box">
        <p>知识点</p>
        <el-input size="small" placeholder="请输入内容" v-model="input_3" clearable></el-input>
      </div>
      <div class="input_box">
        <p>年龄</p>
        <el-select v-model="value_4" size="small" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value"
          :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="input_box">
        <p>性别</p>
        <el-select v-model="value_5" size="small" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value"
          :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="input_box"> </div>
    </div>
    <div class="main">
      <div class="input_box">
        <p>病症案例主诉</p>
        <el-input size="small" placeholder="请输入内容" v-model="textarea"></el-input>
      </div>
    </div>
    <div class="footer">
      <el-button type="primary">保存</el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      value_1: '',
      value_2: '',
      input_3: '',
      value_4: '',
      value_5: '',
      textarea: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      },{
        value: '选项2',
        label: '双皮奶'
      },{
        value: '选项3',
        label: '蚵仔煎'
      }],
    }
  },
  methods: {
    GoBack() { // 点击返回
      this.$router.back()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Goback .el-button{
  padding:0;
  color:#333;
}
.Goback .el-button:hover{
  color:#2E79BA;
}
.header{
  display: flex;
  padding:0 20px;
  margin-bottom:30px;
  margin-top:20px;
}
.header .input_box{
  flex:1;
}
.header .input_box p{
  color:#333;
  font-weight: bold;
  font-size:14px;
  margin-bottom:10px;
  margin-left:5px;
}
.header .input_box .el-input{
  width:215px;
}
.main{
  width:80%;
  padding:0 20px;
}
.main .input_box {
  margin-top:20px;
}
.main .input_box p{
  color:#333;
  font-weight: bold;
  font-size:14px;
  margin-bottom:10px;
  margin-left:5px;
}
.footer{
  display: flex;
  justify-content: center;
  margin-top:100px;
}
</style>
