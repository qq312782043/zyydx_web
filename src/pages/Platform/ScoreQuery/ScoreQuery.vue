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
        <el-button @click="clickReset()" icon="el-icon-refresh-left" type="primary" size="small" plain>重置</el-button>
        <el-button icon="el-icon-upload2" type="primary" size="small" plain>导出</el-button>
      </div>
    </div>
    <div class="main">
      <el-table :data="tableData" border style="width:100%" max-height="530" size="small">
        <el-table-column align="center" v-for="(item,i) in tableList"
        :key="i" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
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
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      value: [],
      input: '',
      currentPage: 1,
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
      tableList: [{
        prop: 'ID',
        label: '考试ID',
        width: ''
      },{
        prop: 'Name',
        label: '考试名称',
        width: ''
      },{
        prop: 'Pnumber',
        label: '参考人数',
        width: ''
      },{
        prop: 'startTime',
        label: '考试开始时间',
        width: '120'
      },{
        prop: 'endTime',
        label: '考试结束时间',
        width: '120'
      },{
        prop: 'Qnumber',
        label: '题数',
        width: ''
      },{
        prop: 'TotalScore',
        label: '总分',
        width: ''
      },{
        prop: 'Highest',
        label: '最高分',
        width: ''
      },{
        prop: 'Lowest',
        label: '最低分',
        width: ''
      },{
        prop: 'Average',
        label: '平均分',
        width: ''
      },{
        prop: 'Curriculum',
        label: '课程',
        width: ''
      },{
        prop: 'Level',
        label: '级别',
        width: ''
      },{
        prop: 'Chapter',
        label: '章节',
        width: '120'
      },{
        prop: 'Difficulty',
        label: '难度',
        width: ''
      }],
    }
  },
  methods: {
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    clickReset() { // 点击重置
      let that = this
      that.value = []
      that.input = ''
    },
    clickToView(res) { // 点击查看
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
