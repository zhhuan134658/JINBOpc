<template>
  <div id="group">
    <div id="Ngroup" style="text-align:center;width:80%;margin:0 auto;">
      <div style="margin:10px 0;color:red;">请在下方搜索或者选择班组负责人</div>
      <div class="search">
        <div class="search-input">
          <input
            type="text"
            v-model="keyword"
            placeholder="请输入姓名"
            @keyup="getPeople($event)"
            @keydown.enter="search()"
          />
          <!-- 这是一个小叉叉，点击它可清除输入框内容 -->
          <!-- <span class="search-reset" @click="clearInput()">&times;</span> -->
          <!-- <button class="search-btn" @click="search()">搜一下</button> -->
          <div class="search-select" v-if="showList">
            <div v-if="!searchData">暂无此人</div>
            <!-- transition-group也是vue2.0中的新特性,tag='ul'表示用ul包裹v-for出来的li -->
            <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>
              <li
                v-for="(value,index) in searchData"
                class="search-select-option search-select-list"
                @click="selectClick(index)"
                :key="value.user_name"
                :class="{'active':index==hoverIndex}"
                @mouseover="hoverIndex = index"
                @mouseout="hoverIndex = -1"
              >{{value.user_name}}</li>
            </transition-group>
          </div>
        </div>
      </div>

      <div class="subject">
        <el-row>
          <el-col :span="14">
            <div class="grid-content bg-purple">
              <el-tree
                ref="tree"
                node-key="id"
                :data="data"
                :props="defaultProps"
                :default-expanded-keys="treeExpandedKeys"
                :expand-on-click-node="true"
                :lazy="true"
                :load="publicLoadTreeNode"
                accordion
                show-checkbox
                @check-change="handleCheckChange"
                @node-click="handleNodeClick"
                @node-expand="handleExpand"
                @node-collapse="handleExpand"
              ></el-tree>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <el-table
                :data="tableDataq"
                height="250"
                style="width: 100%"
                @row-click="selectManager"
              >
                <el-table-column prop="user_name" label="员工列表"></el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var that = {};
export default {
  props: {
    MemberName: {
      type: String
    },
    MemberId: {
      type: String
    }
  },
  data() {
    return {
      hoverIndex: -1,
      tabList: [],
      userid: this.$store.state.userData.uid,
      cid: this.$store.state.userData.cid,
      tabPosition: "left",
      //模糊查询
      showList: false,
      searchData: [], //用来接收ajax得到的数据
      keyword: "", //v-model绑定的输入框的value
      keyid: "", //选择id
      searchIndex: 0,
      ABName: this.MemberName,
      ABId: this.MemberId,
      editFormRules: {},
      //树
      defaultProps: {
        id: "org_id",
        label: "org_name",
        children: "content.org",
        isLeaf: "leaf"
      },
      treeExpandedKeys: [], //记录打开节点的数据
      tableDataq: [
        {
          name: ""
        }
      ]
    };
  },

  methods: {
    handleExpand() {
      this.showList = false;
    },
    handleNodeClick(obj, node, data) {
      axios
        .post("/laowu_yun/nativeorgname", {
          corp_id: this.cid,
          newuid: this.$store.state.userData.uid,
          id: node.data.org_id
        })
        .then(res => {
          const result = res.data.content.org;
          this.showList = false;
          if (res.data.content.user.length > 0) {
            this.tableDataq = res.data.content.user;
          }
        });
    },
    getPeople: function(ev) {
      // 如果按得键是上或者下，就不进行ajax
      if (ev.keyCode == 38 || ev.keyCode == 40) {
        return;
      }
      that.showList = true;
      axios
        .post("/laowu_yun/usersearch", {
          name: that.keyword,

          newuid: that.$store.state.userData.uid,
          corp_id: that.cid
        })
        .then(res => {
          that.tableDataq = res.data.content;
        });
    },
    search: function() {
      that.showList = true;
      axios
        .post("/laowu_yun/usersearch", {
          name: that.keyword,
          newuid: that.$store.state.userData.uid,
          corp_id: that.cid
        })
        .then(res => {
          that.tableDataq = res.data.content;
        });
    },
    selectClick: function(index) {
      this.keyword = that.searchData[index].user_name;

      this.ABName = this.searchData[index].user_name;
      this.ABId = this.searchData[index].userid;
      this.$emit("childSingel", this.ABName);
      this.$emit("childSingel2", this.ABId);

      this.showList = false;
    },

    getIndex: function(index) {
      that.searchIndex = index;
    },
    //tree动态加载
    publicLoadTreeNode(node, resolve) {
      let _this = this;
      let cid = _this.cid;
      let _id = 1;
      if (node.level !== 0) {
        _id = node.data.org_id;
      }
      this.getChild(_id, resolve, _this);
    },
    getChild(cid, resolve, _this) {
      axios
        .post("/laowu_yun/nativeorgname", {
          corp_id: this.$store.state.userData.cid,
          newuid: this.$store.state.userData.uid,
          id: cid
        })
        .then(res => {
          const result = res.data.content.org;
          if (res.data.content.user.length > 0) {
            _this.tableDataq = res.data.content.user;
            return resolve(result);
          } else {
            return resolve(result);
          }
        });
    },
    selectManager(row, event, column) {
      this.ABName = row.user_name;
      this.ABId = row.userid;
      this.$emit("childSingel", this.ABName);
      this.$emit("childSingel2", this.ABId);
    },
    handleCheckChange(data, checked, indeterminate) {
      this.showList = false;
      console.log(data, checked, indeterminate);
    },
    //去重
    dedupe(array) {
      return Array.from(new Set(array));
    }
  },
  created() {},
  mounted() {},
  beforeCreate() {
    that = this;
  }
};
</script>
<style>
#Iu #pane-1 {
  margin-left: 0;
}
#demo #Iu .el-tabs--left .el-tabs__nav-wrap.is-left {
  background-color: #f4f9fe;
}
.selectback {
  background-color: #eee !important;
  cursor: pointer;
}
#group #Ngroup .search {
  width: 50%;
  margin: 0 auto;
}
</style>

<style scoped>
#Iu #pane-1 {
  margin-left: 0;
}
#Iu .tab1 .el-tabs__header {
  background-color: #f4f9fe;
}
</style>