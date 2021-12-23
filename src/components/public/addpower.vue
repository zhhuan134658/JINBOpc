<template>
    <div id="group">
        <div style="text-align:center;width:80%;margin:0 auto;">
            <div class="subject">
                <el-row>
                    <el-col :span="14" class="zcolor">
                        <div class="grid-content bg-purple">
                            <p class="asw">{{ corp_name}}</p>
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
                                @node-click="handleNodeClick"
                                @check-change="handleCheckChange"
                            ></el-tree>
                        </div>
                    </el-col>
                    <el-col :span="10" class="zcolor">
                        <div class="grid-content bg-purple-light">
                            <el-table
                                :data="tableDataq"
                                height="250"
                                ref="multipleTable "
                                style="width: 100%"
                                @row-click="selectManager"
                                @selection-change="handleSelectionChange"
                            >
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column prop="user_name" label="员工列表"></el-table-column>
                            </el-table>
                        </div>
                        <div class="bstyle">
                            <div style="text-align:center">
                                <el-button
                                    type="primary"
                                    @click="set(5)"
                                    style="width:100%;height:50px"
                                >设置为子管理员</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import alert$ from 'dingtalk-jsapi/api/device/notification/alert';
var that = {};
export default {
    name: 'addpower',
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
        cid: {},
        urid: {},
        corp_name: {}
    },
    data() {
        return {
            addarr: [],
            adduserid: [],
            xmlist: [],

            id: '',
            tabList: [],
            // userid: '154260040726472',

            tabPosition: 'left',
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
            many: [],
            orgids: [] //多选班组
        };
    },

    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.addarr = val;
            this.adduserid = this.addarr.map(item => {
                if (!item.userid) return '';
                return item.userid;
            });
        },
        //  设置5
        set(val) {
            axios
                .post('/laowu_yun/adduserrole', {
                    corp_id: this.cid,
                      newuid:this.$store.state.userData.uid,
                    userids: this.adduserid,
                    rid: val,
                    urid: this.urid
                })
                .then(res => {
                    if (res.data.status == '1') {
                        this.$emit('childFn', this.rolename);
                        this.$alert('设置成功');
                    } else {
                        this.$alert('无权限');
                    }
                });
        },
        //设置4
        setfuze(val) {
            axios
                .post('/laowu_yun/adduserrole', {
                    corp_id: this.cid,
                      newuid:this.$store.state.userData.uid,
                    userids: this.adduserid,
                    rid: val,
                    urid: this.urid
                })
                .then(res => {
                    this.$emit('childFn', this.rolename);
                    this.$alert('设置成功');
                });
        },
        //设置3
        setzhuguan(val) {
            axios
                .post('/laowu_yun/huquxiangmulist', { corp_id: this.cid,  newuid:this.$store.state.userData.uid, })
                .then(res => {
                    this.xmlist = res.data.content;
                });
        },

        setzhuguan1(key) {
            axios
                .post('/laowu_yun/adduserrole', {
                    corp_id: this.cid,
                      newuid:this.$store.state.userData.uid,
                    userids: this.adduserid,
                    rid: 3,
                    urid: this.urid,
                    xmid: key
                })
                .then(res => {
                    this.$emit('childFn', this.rolename);
                    this.$alert('设置成功');
                });
        },
        //设置2
        setbanzu(val) {
            axios
                .post('/laowu_yun/adduserrole', {
                    corp_id: this.cid,
                      newuid:this.$store.state.userData.uid,
                    userids: this.adduserid,
                    rid: val,
                    urid: this.urid
                })
                .then(res => {
                    this.$emit('childFn', this.rolename);
                    this.$alert('设置成功');
                });
        },

        //tree动态加载
        publicLoadTreeNode(node, resolve) {
            let _this = this;
            let cid = _this.cid;
            let _id = 1;
            if (node.level !== 0) {
                _id = node.data.org_id;
            }
            axios
                .post('/laowu_yun/nativeorgname', {
                    corp_id: cid,
                      newuid:this.$store.state.userData.uid,
                    id: _id
                })
                .then(res => {
                    const result = res.data.content.org;
                    // if (res.data.content.user.length > 0) {
                    _this.tableDataq = res.data.content.user;
                    return resolve(result);
                    // } else {
                    //     return resolve(result);
                    // }
                });
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

                    // if (res.data.content.user.length > 0) {
                    this.tableDataq = res.data.content.user;
                    // }
                });
        },

        handleCheckChange(data, checked, indeterminate) {
            this.many = this.$refs.tree.getCheckedNodes();

            this.orgids = this.many.map(item => {
                if (!item.org_id) return '';
                return item.org_id;
            });
        },
        //去重
        dedupe(array) {
            return Array.from(new Set(array));
        }
        //添加人员
    },
    created() {},
    mounted() {},
    beforeCreate() {
        that = this;
    }
};
</script>
<style>
.asw {
    font-size: 20px;
}
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
</style>

<style scoped>
#Iu #pane-1 {
    margin-left: 0;
}
#Iu .tab1 .el-tabs__header {
    background-color: #f4f9fe;
}
.xiangmu {
    width: 100%;
    height: 100px;
}

#system #group .bstyle .bcolor {
    border: 1px solid #ffffff;
}

#group .subject .bcolor {
    border: 1px solid #909399;
    padding: 0;
}
.el-tree-node__label {
    font-size: 20px !important;
}
</style>