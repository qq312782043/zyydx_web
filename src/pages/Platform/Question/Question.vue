<template>
  <div class="whole">
    <div class="header clear">
      <div class="select_box">
        <el-select v-model="value_1" class="select" clearable placeholder="课程" size="small">
          <el-option v-for="item in options"
            :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value_2" class="select" clearable placeholder="级别" size="small">
          <el-option v-for="item in options"
            :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value_3" class="select" clearable placeholder="章节" size="small">
          <el-option v-for="item in options"
            :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value_4" class="select" clearable placeholder="病症类别" size="small">
          <el-option v-for="item in options"
            :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="button_box">
        <el-button icon="el-icon-search" type="primary" size="small" plain>搜索</el-button>
        <el-button @click="clickReset()" icon="el-icon-refresh-left" type="primary" size="small" plain>重置</el-button>
        <el-button icon="el-icon-download" type="primary" size="small" plain>表格导入</el-button>
        <el-button icon="el-icon-upload2" type="primary" size="small" plain>导出</el-button>
        <el-button @click="dialogVisible=true" icon="el-icon-s-tools" type="primary" size="small" plain>试题分类管理</el-button>
        <el-button @click="BatchDeletion()" icon="el-icon-delete" type="primary" size="small" plain>批量删除</el-button>
      </div>
    </div>
    <div class="main">
      <el-table :data="tableData" border style="width:100%" max-height="530" size="small">
        <el-table-column align="center" type="selection" width="50"></el-table-column>
        <el-table-column align="center" v-for="(item,i) in tableList" :key="i"
        :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button @click="clickDetails(scope.row)" type="text" size="small">删除</el-button>
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
    <el-dialog title="试题分类管理" append-to-body :visible.sync="dialogVisible" width="70%">
      <div class="Dialogs">
        <el-tabs v-model="activeName" type="border-card" @tab-click="clickToSwitch">
          <el-tab-pane label="课程" name="first">课程</el-tab-pane>
          <el-tab-pane label="级别" name="second">级别</el-tab-pane>
          <el-tab-pane label="章节" name="third">章节</el-tab-pane>
          <el-tab-pane label="知识点" name="fourth">知识点</el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="dialogVisible=false">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      value_1: '',
      value_2: '',
      value_3: '',
      value_4: '',
      currentPage: 1,
      dialogVisible: false,
      activeName: 'first',
      options: [{
        value: '选项1',
        label: '黄金糕'
      },{
        value: '选项2',
        label: '双皮奶'
      },{
        value: '选项3',
        label: '蚵仔煎'
      },],
      tableData: [{
        SerialNumber: '1',
        ID: '1663',
        Changetime: '2020-5-30 12:00',
        Chapter: '章节',
        category: '病症类别',
        Level: '一级',
        Knowledge: '测试',
        Subject: '导入时，有完全重复的内容，自动过滤，只导入新题，试题顺序以表格为准',
      }],
      tableList: [{
        prop: 'SerialNumber',
        label: '题库序号',
        width: '80',
      },{
        prop: 'ID',
        label: '题库ID',
        width: '80',
      },{
        prop: 'Changetime',
        label: '修改时间',
        width: '150',
      },{
        prop: 'Chapter',
        label: '章节',
        width: '150',
      },{
        prop: 'category',
        label: '病症类别',
        width: '150',
      },{
        prop: 'Knowledge',
        label: '知识点',
        width: '150',
      },{
        prop: 'Subject',
        label: '病症案例主诉',
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
    clickReset() { // 点击重置
      let that = this
      that.value_1 = ''
      that.value_2 = ''
      that.value_3 = ''
      that.value_4 = ''
    },
    clickToView() { // 点击查看题库详情
      this.$router.push({path:'/QuestionDetails'})
    },
    clickToSwitch(tab, event) { // 点击切换
      console.log(tab, event);
    },
    clickDetails() { // 点击删除
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
    BatchDeletion() { // 批量删除
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
