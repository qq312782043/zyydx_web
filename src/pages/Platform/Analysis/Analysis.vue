<template>
  <div class="whole">
    <div class="header">
      <div class="time_box clear">
        <div style="float:left">
          <el-date-picker v-model="value" type="datetimerange"
            range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" size="small">
          </el-date-picker>
        </div>
        <div style="float:right">
          <el-button @click="clickSearch()" icon="el-icon-search" class="button" type="primary" size="small" plain>搜索</el-button>
          <el-button @click="clickReset()" icon="el-icon-refresh-left" class="button" type="primary" size="small" plain>重置</el-button>
          <el-button icon="el-icon-upload2" class="button" type="primary" size="small" plain>导出</el-button>
        </div>
      </div>
      <div class="input_box">
        <el-input placeholder="题库ID" class="input" v-model="input_1" size="small" clearable></el-input>
        <el-input placeholder="班级号" class="input" v-model="input_2" size="small" clearable></el-input>
        <el-input placeholder="学生姓名" class="input" v-model="input_3" size="small" clearable></el-input>
        <el-input placeholder="学号" class="input" v-model="input_4" size="small" clearable></el-input>
        <el-input placeholder="考试名称" class="input" v-model="input_5" size="small" clearable></el-input>
        <el-select v-model="value_1" class="input" clearable placeholder="课程" size="small">
          <el-option v-for="item in options"
            :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value_2" class="input" clearable placeholder="级别" size="small">
          <el-option v-for="item in options"
            :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value_3" class="input" clearable placeholder="章节" size="small">
          <el-option v-for="item in options"
            :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value_4" class="input" clearable placeholder="难度" size="small">
          <el-option v-for="item in options"
            :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value_5" class="input" clearable placeholder="模式" size="small">
          <el-option v-for="item in options"
            :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="main">
      <el-table v-loading="loading" :data="tableData" border style="width:100%" max-height="480" size="small">
        <el-table-column align="center" v-for="(item,i) in tableList" :key="i"
        :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button @click="clickToView(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-sizes="[10, 50, 100]" :page-size="10"
        layout="total, sizes, prev, pager, next, jumper" :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      value: [],
      input_1: '',
      input_2: '',
      input_3: '',
      input_4: '',
      input_5: '',
      value_1: '',
      value_2: '',
      value_3: '',
      value_4: '',
      value_5: '',
      loading: false,
      currentPage: 1,
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
      tableData: [{
        ID: '1663',
        ErrorRate: '80%',
        Cnumber: '100',
        Enumber: '20',
        Curriculum: '感冒',
        Level: '一级',
        Chapter: '血小板',
        Knowledge: '浑身乏力',
        Subject: '导入时，有完全重复的内容，自动过滤，只导入新题，试题顺序以表格为准',
      }],
      tableList: [{
        prop: 'ID',
        label: '题库ID',
        width: '80',
      },{
        prop: 'ErrorRate',
        label: '错误率',
        width: '80',
      },{
        prop: 'Cnumber',
        label: '正确个数',
        width: '80',
      },{
        prop: 'Enumber',
        label: '错误个数',
        width: '80',
      },{
        prop: 'Curriculum',
        label: '课程',
        width: '80',
      },{
        prop: 'Level',
        label: '级别',
        width: '80',
      },{
        prop: 'Chapter',
        label: '章节',
        width: '150',
      },{
        prop: 'Knowledge',
        label: '知识点',
        width: '150',
      },{
        prop: 'Subject',
        label: '考试题目',
        width: '',
      }],
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    clickSearch() { // 点击搜索
      let that = this
      that.loading = true
      setTimeout(function(){
        that.loading = false
      },1000)
    },
    clickReset() { // 点击重置
      let that = this
      that.value = []
      that.value_1 = ''
      that.value_2 = ''
      that.value_3 = ''
      that.value_4 = ''
      that.value_5 = ''
      that.input_1 = ''
      that.input_2 = ''
      that.input_3 = ''
      that.input_4 = ''
      that.input_5 = ''
      that.$message({
        message: '重置成功~',
        type: 'success',
        duration: '1000'
      })
    },
    clickToView() { // 点击查看
      this.$router.push({path:'/AnswerDetails'})
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  box-sizing: border-box;
  padding:10px 0;
}
.input_box{
  margin-top:20px;
  display: flex;
}
.input_box .input{
  margin-right:20px;
  flex: 1;
}
.input_box :last-child{
  margin-right:0px;
}
.main{
  width:100%;
  box-sizing: border-box;
  margin-top:20px;
}
.footer{
  display: flex;
  justify-content: center;
  width:90%;
  position: fixed;
  left:10%;
  bottom:20px;
}
</style>
