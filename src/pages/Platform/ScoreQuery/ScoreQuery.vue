<template>
  <div class="whole">
    <div class="header clear">
      <div class="time_box">
        <el-date-picker v-model="value" type="datetimerange"
          range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" size="small">
        </el-date-picker>
      </div>
      <div class="input_box">
        <el-input placeholder="输入考试ID或考试名称" v-model="input" size="small" clearable></el-input>
      </div>
      <div class="button_box">
        <el-button icon="el-icon-search" type="primary" size="small" plain>搜索</el-button>
        <el-button icon="el-icon-refresh-left" type="primary" size="small" plain>重置</el-button>
        <el-button icon="el-icon-upload2" type="primary" size="small" plain>导出</el-button>
      </div>
    </div>
    <div class="main">
      <el-table :data="tableData" border style="width:100%" max-height="530" size="small">
        <el-table-column prop="ID" align="center" label="考试ID"></el-table-column>
        <el-table-column prop="Name" align="center" label="考试名称"></el-table-column>
        <el-table-column prop="Pnumber" align="center" label="参考人数"></el-table-column>
        <el-table-column prop="startTime" align="center" label="考试开始时间" width="120"></el-table-column>
        <el-table-column prop="endTime" align="center" label="考试结束时间" width="120"></el-table-column>
        <el-table-column prop="Qnumber" align="center" label="题数"></el-table-column>
        <el-table-column prop="TotalScore" align="center" label="总分"></el-table-column>
        <el-table-column prop="Highest" align="center" label="最高分"></el-table-column>
        <el-table-column prop="Lowest" align="center" label="最低分"></el-table-column>
        <el-table-column prop="Average" align="center" label="平均分"></el-table-column>
        <el-table-column prop="Curriculum" align="center" label="课程"></el-table-column>
        <el-table-column prop="Level" align="center" label="级别"></el-table-column>
        <el-table-column prop="Chapter" align="center" label="章节" width="120"></el-table-column>
        <el-table-column prop="Difficulty" align="center" label="难度"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
    <router-view />
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
      input: '',
      tableData: [{
        ID: '1663',
        Name: '测试',
        Pnumber: '30人',
        startTime: '2020-5-5',
        endTime: '2020-5-5',
        Qnumber: '30',
        TotalScore: '100',
        Highest: '99',
        Lowest: '10',
        Average: '50',
        Curriculum: '伤寒',
        Level: '一级',
        Chapter: '花柳病',
        Difficulty: '1级',
      }],
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    handleClick(res){ // 点击查看
      // console.log(res)
      this.$router.push({path:'/StudentList'})
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
.header .time_box,.input_box{
  margin-right:40px;
  float: left;
}
.header .button_box{
  float: right;
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
