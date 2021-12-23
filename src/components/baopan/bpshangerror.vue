<template>
  <div id="bzshangbao">
    <div class="bzinput">
      <div>
        <el-form
          :inline="true"
          :model="searchform"
          class="demo-form-inline"
          @submit.native.prevent
        >
          <el-form-item label="姓名：">
            <el-input
              v-model="searchform.name"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchClick">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div>
      <el-table
        :data="shangbapData"
        border
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="编号" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column
          prop="sex"
          :formatter="formatStatus"
          label="性别"
          width="55"
        ></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="useridcode" label="身份证号"></el-table-column>
        <el-table-column prop="jieguo" label="错误信息"></el-table-column>
      </el-table>
      <div style="text-align: center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      total: "", //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      searchform: { name: "" }
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    getList() {
      axios
        .post("/baopan/baopanteamxiangxilist", {
          corp_id: this.cid,
          bzid: this.$route.query.bzid,
          current_page: this.currentPage,
          name: this.searchform.name,
          status: "4",
          newuid: this.$store.state.userData.uid
        })
        .then(res => {
          if (res.data.status == "1") {
            this.shangbapData = res.data.content.list;
            this.total = res.data.content.total;
          } else {
            this.$message.error("错误");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getList();
  }
};
</script>