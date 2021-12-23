<template>
    <div id="group">
        <div style="text-align:center;width:80%;margin:0 auto;">
            <div style="margin:10px 0;color:red;">请在下方搜索或者选择人员</div>
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
import axios from 'axios';
import { type } from 'os';
var that = {};
export default {
    props: {
        ManageName: {
            type: Array
        },
        ManageId: {
            type: Array
        },
        tagsData: {
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
            // tagsData: [],
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
            ],
            many: []
            // orgids: [] //多选班组
        };
    },

    methods: {
        handleExpand() {
            this.showList = false;
        },
        handleNodeClick(obj, node, data) {
            axios
                .post('/laowu_yun/nativeorgname', {
                    corp_id: this.$store.state.userData.cid,
                      newuid:this.$store.state.userData.uid,
                    id: node.data.org_id
                })
                .then(res => {
                    this.showList = false;
                    const result = res.data.content.org;
                    this.tableDataq = res.data.content.user;
                });
        },
        getPeople: function(ev) {
            const that = this;
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
            const that = this;
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
                    corp_id: this.$store.state.userData.cid,
                      newuid:this.$store.state.userData.uid,
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
            this.showList = false;
            this.neworgids = this.$refs.tree.getCheckedNodes();
            this.$emit('childFn4', this.neworgids);
            // this.orgids = this.many.map(item => {
            //     if (!item.org_id) return '';
            //     return item.org_id;
            // });
        },
        //去重
        dedupe(array) {
            return Array.from(new Set(array));
        },
        //添加人员
        addPerson(val, type, list) {
            const that = this;
            // axios
            //     .post("http://zhihui.zzdingyun.com/laowu_yun/useraddteam", {
            //         corp_id: "dingea47c602975497f935c2f4657eb6378f",
            //         bzid: this.childbzid,
            //         userids: [val],
            //         orgids: this.orgids
            //     })
            //     .then(res => {
            if (type === 1) {
                that.ManageName.push(list.user_name);
                that.ManageId.push(list.userid);
            } else if (type === 2) {
                that.keyword = list.user_name;
                that.ManageName.push(list.user_name);
                that.ManageId.push(list.userid);
                that.showList = false;
            }

            //更改数组对象的键值
            let keyMap = { user_name: 'name', userid: 'id' };
            let objs = Object.keys(list).reduce((newData, key) => {
                let newKey = keyMap[key] || key;
                newData[newKey] = list[key];
                return newData;
            }, {});

            that.tagsData.push(objs);
            that.tagsData = that.unique(that.tagsData);
            // that.neworgids = that.unique2(that.neworgids);
            that.$emit('childFn', that.ManageName);
            that.$emit('childFn2', that.ManageId);
            that.$emit('childFn3', that.tagsData);
            that.$emit('childFn4', that.neworgids);

            // });
        },
        unique(arr) {
            const res = new Map();
            return arr.filter(arr => !res.has(arr.id) && res.set(arr.id, 1));
        },
        unique2(arr) {
            const res = new Map();
            return arr.filter(
                arr => !res.has(arr.org_id) && res.set(arr.org_id, 1)
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
#Iu .el-tabs--left .el-tabs__nav-wrap.is-left {
    background-color: #f4f9fe;
}
#group .selectback {
    background-color: #eee !important;
    cursor: pointer;
}
#group .search {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
}
#group .search input {
    display: inline-block;
    width: 100% !important;
    border: 1px #eee solid;
    height: 37px;
}
#group .search-btn {
    width: 20%;
    border: 1px #66b1ff solid;
    background-color: #66b1ff;
    color: #fff;
    height: 37px;
    float: left;
}
.tab1 .tab-item .selectName .el-tabs__nav-scroll {
    position: relative;
}
.selectName {
    width: 100%;
    position: relative;
}
.selectName .el-tabs__header {
    width: 20%;
    float: left;
}
.selectName .el-tabs__content {
    float: right;
    width: 76%;
}
.subject .bg-purple {
    border: 1px solid #ebeef5;
}
.subject .bg-purple-light {
    border: 1px solid #ebeef5;
    padding: 0;
}
.subject .grid-content {
    border-radius: 4px;
    min-height: 36px;
}
/*查询*/
.search-input {
    height: 45px;
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
    position: relative;
}

.search-input input {
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    width: 500px;
    height: 45px;
    font-size: 18px;
    float: left;
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
}

.search-btn {
    height: 45px;
    width: 100px;
    border: 1px solid mediumseagreen;
    background-color: mediumseagreen;
    color: white;
    font-size: 16px;
    font-weight: bold;
    float: left;
}

.search-btn {
    cursor: pointer;
}

.search-select {
    position: absolute;
    top: 45px;
    width: 100%;
    box-sizing: border-box;
    z-index: 999;
    background-color: #fff;
}
.search-select ul {
    border-left: 1px solid #666;
    border-right: 1px solid #666;
    width: 100%;
    background-color: #fff;
}
.search-select li {
    border: 1px solid #d4d4d4;
    background-color: #fff;
    width: 70px;
    float: left;
    margin: 4px;
    text-align: center;
}

.search-select-option {
    box-sizing: border-box;
    padding: 7px 10px;
}

.selectback {
    background-color: #eee !important;
    cursor: pointer;
}

input::-ms-clear {
    display: none;
}

.search-reset {
    width: 21px;
    height: 21px;
    position: absolute;
    display: block;
    line-height: 21px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    right: 110px;
    top: 12px;
}

.search-select-list {
    transition: all 0.5s;
}

.itemfade-enter,
.itemfade-leave-active {
    opacity: 0;
}

.itemfade-leave-active {
    position: absolute;
}

.selectback {
    background-color: #eee !important;
    cursor: pointer;
}
.search-select ul {
    margin: 0;
    text-align: left;
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