<template>
    <div id="group">
        <div style="text-align:center;width:80%;margin:0 auto;">
            <div style="margin:10px 0;color:red;">请在下方搜索或者选择项目负责人</div>
            <div class="search">
                <div class="search-input">
                    <input
                        type="text"
                        v-model="keyword"
                        @keyup="getPeople($event)"
                        placeholder="请输入姓名"
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
                                :key="value"
                                :class="{'active':index==hoverIndex}"
                                @mouseover="hoverIndex = index"
                                @mouseout="hoverIndex = -1"
                            >{{value.user_name}}</li>
                        </transition-group>
                    </div>
                </div>
            </div>

            <div class="subject gsubject">
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
import axios from 'axios';
var that = {};
export default {
    name: 'group',
    props: {
        newaddPeople: {
            type: Array
        },
        newaddTeam: {
            type: Array
        },
        ManageName: {
            type: Array
        },
        ManageId: {
            type: Array
        },
        newaddPeople: {
            type: Array
        },
        childbzid: {
            type: String
        },
        neworgids: {
            type: Array
        }
    },
    data() {
        return {
            hoverIndex: -1,
            tabList: [],
            userid: this.$store.state.userData.uid,
            cid: this.$store.state.userData.cid,
            tabPosition: 'left',
            // ManageName: [], //选择的名字
            // ManageId: [], //选择2的id
            // newaddPeople: [],
            //模糊查询
            showList: false,
            searchData: [], //用来接收ajax得到的数据
            keyword: '', //v-model绑定的输入框的value
            keyid: '', //选择id
            searchIndex: 0,

            editFormRules: {},
            //树
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
            ]
        };
    },

    methods: {
        handleNodeClick(obj, node, data) {
            axios
                .post('/laowu_yun/nativeorgname', {
                    corp_id: this.cid,
                      newuid:this.$store.state.userData.uid,
                    id: node.data.org_id
                })
                .then(res => {
                    this.showList = false;
                    const result = res.data.content.org;
                    console.log(result);
                    this.tableDataq = res.data.content.user;
                });
        },
        handleExpand() {
            this.showList = false;
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
                });
        },
        selectClick: function(index) {
            this.addPerson(
                this.searchData[index].userid,
                2,
                this.searchData[index]
            );
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
                .post('/laowu_yun/nativeorgname', {
                      newuid:this.$store.state.userData.uid,
                    corp_id: this.$store.state.userData.cid,
                    id: cid
                })
                .then(res => {
                    const result = res.data.content.org;
                    _this.tableDataq = res.data.content.user;
                    return resolve(result);
                });
        },
        selectManager(row, event, column) {
            this.addPerson(row.userid, 1, row);
        },
        handleCheckChange(data, checked, indeterminate) {
            // console.log(data, checked, indeterminate);
            this.showList = false;
            this.neworgids = this.$refs.tree.getCheckedNodes();
            this.$emit('childFn4', this.neworgids);
            // console.log(this.neworgids);
            // this.orgids = this.neworgids.map(item => {
            //     if (!item.org_id) return '';
            //     return item.org_id;
            // });
            // console.log(this.orgids);
        },
        //去重
        dedupe(array) {
            return Array.from(new Set(array));
        },
        //添加人员
        addPerson(val, type, list) {
            // axios
            //     .post('/laowu_yun/useraddteam', {
            //         corp_id: this.cid,
            //         bzid: this.childbzid,
            //         userids: [val],
            //         orgids: this.orgids
            //     })
            //     .then(res => {
            //         if (type === 1) {
            //             this.ManageName.push(list.user_name);
            //             this.ManageId.push(list.userid);
            //         } else if (type === 2) {
            //             this.keyword = list.user_name;
            //             this.ManageName.push(list.user_name);
            //             this.ManageId.push(list.userid);
            //             this.showList = false;
            //         }
            console.log(list);

            //更改数组对象的键值
            let keyMap = { user_name: 'name', userid: 'user' };
            let objs = Object.keys(list).reduce((newData, key) => {
                let newKey = keyMap[key] || key;
                newData[newKey] = list[key];
                return newData;
            }, {});
            this.newaddPeople.push(objs);
            that.newaddPeople = that.unique(that.newaddPeople);
            this.$emit('childFn', this.ManageName);
            this.$emit('childFn2', this.ManageId);
            this.$emit('childFn3', this.newaddPeople);
            this.$emit('childFn4', this.neworgids);
            // });
        },
        unique(arr) {
            const res = new Map();
            return arr.filter(
                arr => !res.has(arr.user) && res.set(arr.user, 1)
            );
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
#group .gsubject .el-table th > .cell {
    font-size: 14px;
    color: #909399;
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