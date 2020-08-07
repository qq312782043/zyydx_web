<template>
  <div class="whole">
    <div class="header">
      <div class="input_box">
        <p>章节</p>
        <el-select v-model="value_1" size="small" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="input_box">
        <p>病症类别</p>
        <el-select v-model="value_2" size="small" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="input_box"> </div>
      <div class="input_box"> <p>编辑</p> </div>
    </div>
    <div class="header">
      <div class="input_box">
        <p>知识点</p>
        <el-input
          size="small"
          placeholder="请输入内容"
          v-model="input_3"
          clearable>
        </el-input>
      </div>
      <div class="input_box">
        <p>年龄</p>
        <el-select v-model="value_4" size="small" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="input_box">
        <p>性别</p>
        <el-select v-model="value_5" size="small" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="input_box"> </div>
    </div>
    <div class="main">
      <p></p>
    </div>
  </div>
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  display: flex;
  padding:0 20px;
  margin-bottom:30px;
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
.el-input{
  width:215px;
}
</style>
