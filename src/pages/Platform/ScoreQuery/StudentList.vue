<template>
  <div class="whole">
    <div class="Goback">
      <el-button type="text" icon="el-icon-arrow-left" @click="GoBack">返回</el-button>
    </div>
    <div class="header">
      <div class="box_1">
        <p class="text_1">考试ID：<span>111</span></p>
        <p class="text_1">考试名称：<span>测试</span></p>
        <p class="text_1">开始时间：<span>2020-5-22 12:00</span></p>
        <p class="text_1">结束时间：<span>2020-5-23 12:00</span></p>
      </div>
      <div class="box_1">
        <p class="text_1">总分：<span>100分</span></p>
        <p class="text_1">最高分：<span>100分</span></p>
        <p class="text_1">最低分：<span>20分</span></p>
        <p class="text_1">平均分：<span>50分</span></p>
      </div>
      <div class="box_1">
        <p class="text_1">课程：<span>伤寒</span></p>
        <p class="text_1">级别：<span>一级</span></p>
        <p class="text_1">章节：<span>花柳病</span></p>
        <p class="text_1">难度：<span>很难</span></p>
      </div>
      <div class="box_1">
        <p class="text_1">参考人数：<span>33人</span></p>
      </div>
    </div>
    <div class="ipt_box">
      <el-input placeholder="输入班级号、学号、姓名" size="small" v-model="input" clearable></el-input>
      <el-button @click="clickSearch()" icon="el-icon-search" type="primary" size="small">搜索</el-button>
      <el-button icon="el-icon-upload2" type="primary" size="small">导出</el-button>
    </div>
    <div class="main" ref="heights">
      <el-table v-loading="loading" :data="tableData" border style="width:100%" :max-height="heightCss" size="small"
        :default-sort="{prop: 'Ranking', order: 'descending'}">
        <el-table-column prop="Name" align="center" label="姓名" width="150"></el-table-column>
        <el-table-column prop="Fraction" align="center" label="分数" width="200"></el-table-column>
        <el-table-column prop="Ranking" align="center" label="排名" width="200" sortable></el-table-column>
        <el-table-column prop="StudentNumber" align="center" label="学号" width="250"></el-table-column>
        <el-table-column prop="ClassNumber" align="center" label="班级号"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="120">
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
      heightCss: '',
      input: '',
      loading: false,
      currentPage: 1,
      tableData: [{
        Name: '张宇1',
        Fraction: '100分',
        Ranking: '1',
        StudentNumber: '001',
        ClassNumber: '1703',
      }],
    }
  },
  mounted() {
    let that = this
    let arr = parseInt(window.getComputedStyle(that.$refs.heights).height)
    that.heightCss = arr - 50
  },
  methods: {
    handleSizeChange(val) {
      console.log(val)
    },
    handleCurrentChange(val) {
      console.log(val)
    },
    clickSearch() { // 点击搜索
      let that = this
      that.loading = true
      setTimeout(function(){
        that.loading = false
      },1000)
    },
    clickToView(res) { // 点击查看
      this.$router.replace({path:'/PaperDetails'})
    },
    GoBack() { // 点击返回
      this.$router.replace({path:'/ScoreQuery'})
    },
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
  width:100%;
  box-sizing: border-box;
  display:flex;
  padding:0 20px;
  margin-top:20px;
}
.header .box_1{
  flex:1;
}
.header .box_1 .text_1{
  font-size:14px;
  color:#333;
  font-weight:bold;
  margin-bottom:15px;
}
.header .box_1 .text_1 span{
  font-size:13px;
  color:#666;
  font-weight:400;
}
.header .box_1 .el-button{
  margin:0 auto;
}
.ipt_box{
  padding:0 20px;
}
.ipt_box .el-input{
  display:inline-block;
  width:200px;
  margin-right:10px;
}
.main{
  width:100%;
  height: calc(100vh - 330px);
  box-sizing: border-box;
  padding:20px;
}
.footer{
  position:fixed;
  left:34%;
  bottom:10px;
}
</style>
