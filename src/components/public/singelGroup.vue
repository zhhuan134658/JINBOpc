<template>
    <div id="group">
        <div style="text-align:center;width:80%;margin:0 auto;">
            <div style="margin:10px 0;color:red;">请在下方搜索或者选择负责人</div>
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
                                :key="value.user_name"
                                class="search-select-option search-select-list"
                                @click="selectClick(index)"
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
import axios from 'axios';
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
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${i}`
                });
            }
            return data;
            // console.log(this.data[i].label)

            //   var ddd=document.getElementsByClassName(el-transfer-panel__body)
            //  console.log(ddd)
        };
        return {
            tabList: [],
            userid: this.$store.state.userData.uid,
            cid: this.$store.state.userData.cid,
            tabPosition: 'left',
            //模糊查询
            showList: false,
            searchData: [], //用来接收ajax得到的数据
            keyword: '', //v-model绑定的输入框的value
            keyid: '', //选择id
            searchIndex: 0,
            ABName: this.MemberName,
            ABId: this.MemberId,
            editFormRules: {},
            //树
            data: generateData(),
            defaultProps: {
                id: 'org_id',
                label: 'org_name',
                children: 'content.org',
                isLeaf: 'leaf'
            },
            treeExpandedKeys: [], //记录打开节点的数据
            tableDataq: [
                {
                    name: ''
                }
            ],
            hoverIndex: -1
        };
    },

    methods: {
        handleExpand() {
            this.showList = false;
        },
        handleNodeClick(obj, node, data) {
            axios
                .post('/laowu_yun/nativeorgname', {
                    corp_id: this.cid,
                      newuid:this.$store.state.userData.uid,
                    id: node.data.org_id
                })
                .then(res => {
                    const result = res.data.content.org;
                    this.showList = false;
                    // if (res.data.content.user.length > 0) {
                    this.tableDataq = res.data.content.user;
                    // } else {
                    //     this.tableDataq = [];
                    // }
                });
        },
        getPeople: function(ev) {
            // 如果按得键是上或者下，就不进行ajax
            if (ev.keyCode == 38 || ev.keyCode == 40) {
                return;
            }
            that.showList = true;
            axios
                .post('/laowu_yun/usersearch', {
                    name: that.keyword,
                      newuid:that.$store.state.userData.uid,
                    corp_id: that.cid
                })
                .then(res => {
                    that.tableDataq = res.data.content;
                    console.log('666+++' + that.searchData);
                });
        },
        search: function() {
            that.showList = true;
            axios
                .post('/laowu_yun/usersearch', {
                    name: that.keyword,
                      newuid:that.$store.state.userData.uid,
                    corp_id: that.cid
                })
                .then(res => {
                    that.tableDataq = res.data.content;
                    console.log('999+++' + that.searchData);
                });
        },
        selectClick: function(index) {
            this.keyword = this.searchData[index].user_name;

            this.ABName = this.searchData[index].user_name;
            this.ABId = this.searchData[index].userid;
            this.$emit('childSingel', this.ABName);
            this.$emit('childSingel2', this.ABId);

            this.showList = false;
        },

        getIndex: function(index) {
            that.searchIndex = index;
        },
        //tree动态加载
        // publicLoadTreeNode(node, resolve) {
        //     let _this = this;
        //     let cid = _this.cid;
        //     console.log(_this.cid);
        //     let _id = 1;
        //     console.log("超+++++" + org);
        //     if (node.level !== 0) {
        //         _id = node.data.org_id;
        //     }
        //     axios
        //         .post("/laowu_yun/nativeorgname", {
        //             corp_id: that.cid,
        //             id: _id
        //         })
        //         .then(res => {
        //             console.log("超+++++" + res.data.content);
        //             console.log("超+++++" + res.data.content.org);
        //             let result = res.data.content.org;
        //             if (res.data.content.user.length > 0) {
        //                 _this.tableDataq = res.data.content.user;
        //                 return resolve(result);
        //             } else {
        //                 return resolve(result);
        //             }
        //         });
        // },
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
                .post('/laowu_yun/nativeorgname', {
                      newuid:this.$store.state.userData.uid,
                    corp_id: this.$store.state.userData.cid,
                    id: cid
                })
                .then(res => {
                    const result = res.data.content.org;

                    // if (res.data.content.user.length > 0) {
                    _this.tableDataq = res.data.content.user;
                    return resolve(result);
                    // } else {
                    //     _this.tableDataq = [];
                    //     return resolve(result);
                    // }
                });
        },
        selectManager(row, event, column) {
            this.ABName = row.user_name;
            this.ABId = row.userid;

            this.$emit('childSingel', this.ABName);
            this.$emit('childSingel2', this.ABId);
        },
        handleCheckChange(data, checked, indeterminate) {
            this.showList = false;
        },
        //去重
        dedupe(array) {
            return Array.from(new Set(array));
        },
        selectStyle(item) {
            var _this = this;
            this.$nextTick(function() {
                this.items.forEach(function(item) {
                    _this.$set(item, 'active', false);
                });
                this.$set(item, 'active', true);
            });
        },
        outStyle(item) {
            this.$set(item, 'active', false);
        }
    },
    created() {},
    mounted() {},
    beforeCreate() {
        that = this;
    }
};
</script>
<style lang="less">
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
#group {
    .active {
        color: #fff;
        background: #409eff;
        border: 1px solid #409eff;
    }
    .search-select li {
        cursor: pointer;
    }
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