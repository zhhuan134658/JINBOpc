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
              @keyup.enter.native="search"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="primary" @click="oneBtn">一键上报</el-button>
      </div>
    </div>
    <div style="margin-top: 15px">
      <el-table
        :data="shangbapData"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="编号" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="55"
          :formatter="formatStatus"
        ></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="useridcode" label="身份证号"></el-table-column>
        <el-table-column
          prop="whtype"
          label="文化程度"
          :formatter="formatWh"
        ></el-table-column>
        <el-table-column
          prop="workjineng"
          label="技能等级"
          :formatter="formatWj"
        ></el-table-column>
        <el-table-column
          prop="xypingjia"
          :formatter="formatPj"
          label="企业评价"
        ></el-table-column>
        <el-table-column label="工人操作">
          <template slot-scope="scope">
            <el-button
              @click="handleXiugai(scope.row)"
              type="primary"
              plain
              size="small"
              >工人上报</el-button
            >
            <el-button
              v-if="scope.row.address == '8'"
              @click="handlehetong(scope.row)"
              type="primary"
              plain
              size="small"
              >合同上报</el-button
            >
            <el-button
              v-if="scope.row.address == '21' || scope.row.address == '22'"
              @click="handleHetongs(scope.row)"
              type="primary"
              plain
              size="small"
              >合同上报</el-button
            >
          </template>
        </el-table-column>
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
    <el-dialog
      title="工人上报"
      :visible.sync="dialogVisible"
      :show-close="false"
      :append-to-body="true"
      class="shangbaodelete"
    >
      <span>
        <i class="el-icon-warning-outline" style="color: red"></i>
        确定工人上报？
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="upcancel">取 消</el-button>
        <el-button type="primary" @click="upBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
   
<script>
import axios from "axios";
export default {
  // props: {
  //     address: {
  //         type: String
  //     }
  // },
  data() {
    return {
      address: this.$store.state.userData.bpXmCode,
      total: "", //默认数据总数
      pagesize: "", //每页的数据条数
      currentPage: 1, //默认开始页面
      input: "",
      cid: this.$store.state.userData.cid,
      searchform: {
        name: ""
      },
      shangbapData: [],
      dialogVisible: false,
      userids: [],
      newuserids: []
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.newuserids = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTable(val);
    },
    handleXiugai(row) {
      this.dialogVisible = true;
      this.userids = [];
      this.userids.push(row.userid);
    },
    formatStatus(row) {
      if (!row.sex) {
        return "男";
      } else {
        return row.sex;
      }
    },

    formatPj(row) {
      if (!row.xypingjia) {
        return "好";
      } else {
        return row.xypingjia;
      }
    },
    formatWh(row) {
      if (!row.whtype) {
        return "初中";
      } else {
        return row.whtype;
      }
    },
    formatWj(row) {
      if (!row.workjineng) {
        return "初级工";
      } else {
        return row.workjineng;
      }
    },
    handleHetongs(row) {
      if (row.address == "21") {
        axios
          .post("/lainxi/WorkerContractInfo", {
            corp_id: this.cid,
            userid: row.userid,
            xmid: this.$route.query.xmid
          })
          .then(res => {
            if (res.data.status == 1) {
              this.$message({
                message: row.name + "上报成功",
                center: true,
                type: "success"
              });
            } else {
              this.$message({
                message: res.data.msg,
                center: true,
                type: "error"
              });
            }
          });
      } else if (row.address == "22") {
        axios
          .post("/newbao/UploadContract", {
            corp_id: this.cid,
            userid: row.userid,
            xmid: this.$route.query.xmid
          })
          .then(res => {
            if (res.data.status == 1) {
              this.$message({
                message: row.name + "上报成功",
                center: true,
                type: "success"
              });
            } else {
              this.$message({
                message: res.data.msg,
                center: true,
                type: "error"
              });
            }
          });
      }
    },
    handlehetong(row) {
      console.log(row);
      axios
        .post("/ding_newlaowu/fujianhetongshangbao", {
          corp_id: this.cid,
          userid: row.userid,
          xmid: this.xmid,
          bzid: this.bzid
        })
        .then(res => {
          if (res.data.status == 1) {
            this.$message({
              message: row.name + "上报成功",
              center: true,
              type: "success"
            });
          } else {
            this.$message({
              message: res.data.msg,
              center: true,
              type: "error"
            });
          }
        });
    },

    oneBtn() {
      if (this.newuserids.length > 0) {
        let newPeople = [];
        newPeople = this.newuserids.map(item => {
          if (!item.userid) return "";
          return item.userid;
        });
        if (this.address == "24") {
          axios
            .post("/newbao/honghekaoqinshangbao", {
              corp_id: this.cid,
              userids: newPeople,
              bzid: this.$route.query.bzid,
              address: this.address,
              newuid: this.$store.state.userData.uid
            })
            .then(res => {
              if (res.data.status == 1) {
                this.$refs.multipleTable.clearSelection();
                this.getTable(1);
                this.$alert("上报已提交！");
              } else if (res.data.status == 2) {
                this.$alert(res.data.msg);
              }
            });
        } else {
          axios
            .post("/baopan/banzurenyuanshangbao", {
              corp_id: this.cid,
              userids: newPeople,
              bzid: this.$route.query.bzid,
              address: this.address,
              newuid: this.$store.state.userData.uid
            })
            .then(res => {
              if (res.data.status == 1) {
                this.$refs.multipleTable.clearSelection();
                this.getTable(1);
                this.$alert("上报已提交！");
              } else if (res.data.status == 2) {
                this.$alert(res.data.msg);
              }
            });
        }
      } else {
        this.$alert("请先选择工人！");
      }
    },
    upcancel() {
      this.userids = [];
      this.dialogVisible = false;
    },
    upBtn() {
      if (this.address == "24") {
        axios
          .post("/newbao/honghekaoqinshangbao", {
            corp_id: this.cid,
            userids: this.userids,
            bzid: this.$route.query.bzid,
            address: this.address,
            newuid: this.$store.state.userData.uid
          })
          .then(res => {
            if (res.data.status == 1) {
              this.userids = [];
              this.getTable(1);
              this.dialogVisible = false;
              this.$message({
                message: "上报已提交",
                center: true,
                duration: 2000,
                type: "success"
              });
            } else if (res.data.status == 2) {
              this.$alert(res.data.msg);
            }
          });
      } else {
        axios
          .post("/baopan/banzurenyuanshangbao", {
            corp_id: this.cid,
            userids: this.userids,
            bzid: this.$route.query.bzid,
            address: this.address,
            newuid: this.$store.state.userData.uid
          })
          .then(res => {
            if (res.data.status == 1) {
              this.userids = [];
              this.getTable(1);
              this.dialogVisible = false;
              this.$message({
                message: "上报已提交",
                center: true,
                duration: 2000,
                type: "success"
              });
            } else if (res.data.status == 2) {
              this.$alert(res.data.msg);
            }
          });
      }
    },
    search() {
      this.getTable(1);
    },
    getTable(num) {
      axios
        .post("/baopan/baopanteamxiangxilist", {
          corp_id: this.cid,
          bzid: this.$route.query.bzid,
          name: this.searchform.name,
          current_page: num,
          status: "2",
          newuid: this.$store.state.userData.uid
        })
        .then(res => {
          if (res.data.status == 1) {
            this.shangbapData = res.data.content.list;
            this.total = res.data.content.total;
            this.pagesize = res.data.content.num;
            this.currentPage = res.data.content.current_page;
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getTable(1);
  }
};
</script>
<style lang="less">
body {
  .shangbaodelete {
    .el-dialog {
      width: 500px;
    }
  }
}
#bzshangbao {
  .bzinput {
    display: flex;
    justify-content: space-between;
  }
  .bzinput .el-input {
    width: 100%;
  }
}
</style>