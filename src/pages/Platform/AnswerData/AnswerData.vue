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
          <el-button class="button" type="primary" size="small" plain>搜索</el-button>
          <el-button class="button" type="primary" size="small" plain>重置</el-button>
          <el-button class="button" type="primary" size="small" plain>导出</el-button>
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
      <el-table :data="tableData" border style="width:100%" max-height="480" size="small">
        <el-table-column prop="ID" align="center" label="题库序号" width="80"></el-table-column>
        <el-table-column prop="Time" align="center" label="时间" width="120"></el-table-column>
        <el-table-column prop="Name" align="center" label="姓名" width="80"></el-table-column>
        <el-table-column prop="Class" align="center" label="班级号" width="80"></el-table-column>
        <el-table-column prop="StudentNumber" align="center" label="学号" width="80"></el-table-column>
        <el-table-column prop="Subject" align="center" label="考试题目"></el-table-column>
        <el-table-column prop="Result" align="center" label="结果" width="80"></el-table-column>
        <el-table-column prop="Pattern" align="center" label="模式" width="80"></el-table-column>
        <el-table-column prop="Curriculum" align="center" label="课程" width="120"></el-table-column>
        <el-table-column prop="Level" align="center" label="级别" width="80"></el-table-column>
        <el-table-column prop="Chapter" align="center" label="章节" width="120"></el-table-column>
        <el-table-column prop="Knowledge" align="center" label="知识点" width="120"></el-table-column>
        <el-table-column prop="Difficulty" align="center" label="难度" width="80"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="80">
          <template slot-scope="scope">
            <el-button @click="jumpDetails(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
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
      startTime: '',
      endTime: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }],
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
      tableData: [{
        ID: '1',
        Time: '2020-11-25',
        Name: '张宇',
        Class: '73',
        StudentNumber: '1703',
        Subject: '导入时，有完全重复的内容，自动过滤，只导入新题，试题顺序以表格为准',
        Result: '20',
        Pattern: '自由模式',
        Curriculum: '感冒',
        Level: '一级',
        Chapter: '血小板',
        Knowledge: '浑身乏力',
        Difficulty: '1级'
      },],
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
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
