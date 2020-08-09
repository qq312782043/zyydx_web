<template>
  <div class="whole">
    <div class="header clear">
      <div class="select_box">
        <el-select v-model="value_1" class="select" clearable placeholder="章节" size="small">
          <el-option v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value_2" class="select" clearable placeholder="病症类别" size="small">
          <el-option v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="button_box">
        <el-button icon="el-icon-search" type="primary" size="small" plain>搜索</el-button>
        <el-button icon="el-icon-refresh-left" type="primary" size="small" plain>重置</el-button>
        <el-button icon="el-icon-download" type="primary" size="small" plain>表格导入</el-button>
        <el-button icon="el-icon-upload2" type="primary" size="small" plain>导出</el-button>
        <el-button @click="BatchDeletion()" icon="el-icon-delete" type="primary" size="small" plain>批量删除</el-button>
      </div>
    </div>
    <div class="main">
      <el-table :data="tableData" border style="width:100%" max-height="530" size="small">
        <el-table-column align="center" type="selection" width="50"></el-table-column>
        <el-table-column prop="SerialNumber" align="center" label="题库序号" width="80"></el-table-column>
        <el-table-column prop="ID" align="center" label="题库ID" width="80"></el-table-column>
        <el-table-column prop="Changetime" align="center" label="修改时间" width="150"></el-table-column>
        <el-table-column prop="Chapter" align="center" label="章节" width="150"></el-table-column>
        <el-table-column prop="category" align="center" label="病症类别" width="150"></el-table-column>
        <el-table-column prop="Knowledge" align="center" label="知识点" width="150"></el-table-column>
        <el-table-column prop="Subject" align="center" label="病症案例主诉"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="130">
          <template slot-scope="scope">
            <el-button @click="onDetails(scope.row)" type="text" size="small">删除</el-button>
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
      value_1: '',
      value_2: '',
      tableData: [{
        SerialNumber: '1',
        ID: '1663',
        Changetime: '2020-5-30 12:00',
        Chapter: '章节',
        category: '病症类别',
        Level: '一级',
        Knowledge: '测试',
        Subject: '导入时，有完全重复的内容，自动过滤，只导入新题，试题顺序以表格为准',
      },{
        SerialNumber: '1',
        ID: '1663',
        Changetime: '2020-5-30 12:00',
        Chapter: '章节',
        category: '病症类别',
        Level: '一级',
        Knowledge: '测试',
        Subject: '导入时，有完全重复的内容，自动过滤，只导入新题，试题顺序以表格为准',
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
    },
    handleClick(){ // 点击查看
      this.$router.push({path:'/QuestionDetails'})
    },
    onDetails(){ // 点击删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 1000
        });
      });
    },
    BatchDeletion(){ // 批量删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 1000
        });
      });
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
  .select_box{
    float: left;
  }
  .select_box .select{
    width: 120px;
    margin-right:20px;
  }
  .button_box{
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
