<template>
  <div class="main">
    <div class="top">
      <div class="title">警告设置</div>
      <div class="back">
        <el-button @click="back" type="primary">返回</el-button>
      </div>
    </div>
    <el-divider />
    <div class="table">
      <el-table :data="tableData" border size="mini">
        <el-table-column label="序号" type="index" align="center" width="60" />
        <el-table-column label="类型" prop="type" align="center" width="100" />
        <el-table-column label="警告分数" prop="fenshu" align="center" width="80" />
        <el-table-column label="警告内容" prop="content" align="left" />
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="修改警告" :visible.sync="editDialog" width="400px" :close-on-click-modal="false" :append-to-body="true" class="liu-dialog">
      <el-form :model="form" ref="form" :rules="rules" inline>
        <el-form-item label="警告分数：" prop="fenshu">
          <el-input-number v-model="form.fenshu" controls-position="right" :min="1" :max="10" size="mini" />
        </el-form-item>
        <el-form-item label="警告内容：" prop="content">
          <el-input v-model="form.content" placeholder="请输入内容" size="mini" />
        </el-form-item>
      </el-form>
      <div class="buts">
        <el-button @click="submit" :loading="loading" type="primary" size="mini">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StaffWarningSeting',
  data() {
    return {
      tableData: [
        { type: "每日评分", rate: "6", content: "" },
        { type: "每月评分", rate: "6", content: "" }
      ],
      editDialog: false,
      rules: {
        fenshu: [
          { required: true, message: "请输入分数", trigger: 'bulr' }
        ],
        content: [
          { required: true, message: "请输入内容", trigger: 'bulr' }
        ]
      },
      form: {
        id: 0,
        femshu: 1,
        content: ''
      },
      loading: false
    }
  },
  created() {
    this.getList();
  },
  methods: {
    back() {
      this.$router.push({
        path: '/chakan',
        query: {
          tabname: '3'
        }
      });
    },
    edit(row) {
      this.editDialog = true;
      this.form = row;
    },
    submit() {
      this.loading = true;
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios.post(
            '/laowu_yun/shezhijinggaoxinxi',
            this.form
          )
          .then((res) => {
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
              this.editDialog = false;
              this.loading = false;
            } else {
              this.editDialog = false;
              this.$message.error(res.data.msg);
              this.loading = false;
            }
          })
          .catch(function (error) {
              console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getList() {
      console.log('request');
      axios.post('/laowu_yun/shezhijinggaocontent').then((res) => {
        if (res.data.status == 1) {
          this.tableData = res.data.content;
        } else {
          this.$message.error(res.data.msg);
        }
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  margin: 0 10px;
  padding: 10px;
  background: #FFFFFF;
  .top {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 14px;
      color: #606266;
      line-height: 40px;
    }
  }
}

.liu-dialog {
  /deep/.el-input-number--mini {
    width: 178px !important;
  }
}  
</style>
