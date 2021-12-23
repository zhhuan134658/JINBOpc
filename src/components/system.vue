<template>
    <div id="system" style="height:100%";overflow-y: auto;>
        <el-tabs :tab-position="tabPosition" style="height:100%;">
            <el-tab-pane label="框架组织">
                <!-- 框架组织 -->
                <div class="frame">
                    <!-- 提示 -->
                    <div class="tips">
                        <div>
                            <p>提示：1、公司组织架构非常重要，部分管{{this.$cookie.get('cid')}}理{{this.$cookie.get('user_name')}}功{{this.$cookie.get('bieming')}}能{{this.$cookie.get('corp_name')}}以{{this.$cookie.get('userid')}}及数据权限是依赖于公司组织架构的；因此建议在正式使用产品前，请进行相关配置；</p>
                            <p style="margin-left:42px">&nbsp;&nbsp;2、部门组织架构支持多级。</p>
                        </div>
                        <el-button
                            type="primary"
                            plain
                            style="width:300px;height:50px; margin-left:100px"
                        >同步钉钉组织架构</el-button>
                    </div>
                    <!-- 组织 -->

                    <Add
                        @childFn3="parentFn3"
                        v-bind:tagsData="tagsData"
                        v-bind:cid="cid"
                        v-bind:urid="urid"
                        v-bind:corp_name="corp_name"
                    ></Add>
                    <!-- 提示 -->
                    <div
                        v-if="isFail"
                        style="width:80%;margin:0 auto;height:40px;line-height:40px;text-align:center;"
                    >{{failMsg}}</div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="角色权限" class="quanxian">
                <div class="qxtishi">
                    <span>提示：</span>
                    <p>1、角色用来控制客户的功能使用及查看数据范围,如功能权限内添加了“合同管理”，管理范围选择了 “全公司”, 则该角色下该用户可查看全公司的合同数据。</p>
                    <p>2、超级管理员是系统默认的最大权限角色, 功能权限可部分修改,管理范围不可修改。</p>
                    <p>3、功能权限更改后,重新进入软件,功能权限即可生效。</p>
                </div>
                <el-row class="back_c">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-collapse v-model="activeNames" @change="handleChange">
                                <el-collapse-item title="权限级别" name="2">
                                    <router-link :to="{name:"Qxone",params:{rolename:rolename,urid:urid}}" >
                                        <div class="level">公司级</div>
                                    </router-link>
                                    <router-link :to="{name:"Qxtwo",params:{rolename:rolename,urid:urid}}">
                                        <div class="level">项目级</div>
                                    </router-link>
                                    <router-link :to="{name:"Qxthree",params:{rolename:rolename,urid:urid}}">
                                        <div class="level">班组级</div>
                                    </router-link>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="grid-content bg-purple-light row-m">
                            <router-view />
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import Add from './addpower.vue';
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import qs from 'qs';

export default {
    components: { Add },
    data() {
        return {
            data: [],
            defaultProps: {
                id: '',
                label: 'name',
                children: 'childList',
                isLeaf: 'leaf'
            },
            activeData: null, //当操作数据
            treeExpandedKeys: [], //记录打开节点的数据
            treeKeyL: '', //控制tree渲染key
            nodeQuery: {
                name: '' //编辑节点表单的model
            },
            isShowDlg: false, //是否显示编辑节点弹框
            // 姓名
            tableDataq: [
                {
                    name: ''
                }
            ],
            newarr: [],

            //q权限人员
            rolename: [],
            urid: '', //权限id

            cid: '',
            userid: '',

            list: '',
            list1: '',

            nArr1: '',
            nArr2: '',
            nArr3: '',

            name: '',
            title2: '',
            title1: '',

            activeNames1: ['1'],
            activeNames: ['1'],
            corp_name: '',

            tabPosition: 'left',
            //子组件传回的值

            MemberId: '',
            childbzid: '',
            failMsg: '',
            isFail: false,
            a: ''
        };
    },

    methods: {
        // 权限
        handleChange() {},

        handleClick() {},
        handleNodeClick() {
            console.log(this.treeExpandedKeys);
            this.tableDataq = this.newarr;

            console.log(1);
        },
        /*biaoge*/
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },

        // framework() {
        //     var url = decodeURIComponent(location.search); //获取url中"?"符后的字串
        //     var cid = url.split('?corpid=')[1];
        //     this.cid = cid;
        //     console.log(cid);
        //     var _this = this;

        //     _this.$store.commit('setCid', cid);

        //     dd.ready(function() {
        //         dd.runtime.permission.requestAuthCode({
        //             corpId: cid, // 企业id
        //             onSuccess: function(info) {
        //                 var code = info.code; // 通过该免登授权码可以获取用户身份             console.log(code)

        //                 axios
        //                     .post('/dingyun/getuserrole', {
        //                         corp_id: cid,
        //                         code: code
        //                     })
        //                     .then(res => {
        //                         console.log(res.data);
                                
        //                         _this.name = res.data.content.user_name;
        //                         _this.manager = res.data.bieming;
        //                         _this.corp_name = res.data.content.corp_name;
        //                         _this.urid = res.data.status;
        //                          _this.uid = res.data.content.userid;

        //                         _this.$store.commit('setValue', corp_name);

        //                         _this.$store.commit(
        //                             'setValue',
        //                             res.data.content.corp_name
        //                         );
        //                         _this.$store.commit('setUrid', res.data.status);

        //                         _this.$store.commit(
        //                             'setUid',
        //                             res.data.content.userid
        //                         );
        //                         _this.$store.commit(
        //                             'setName',
        //                             res.data.content.user_name
        //                         );
        //                         _this.$store.commit(
        //                             'setManageName',
        //                             res.data.corpname
        //                         );
        //                         // if(3<res.data.status<101){
        //                         //   // this.$router.push({path:'/two'})

        //                         // }
        //                     });
        //             }
        //         });
        //     });
        // },
        //子组件传参

        parentFn3(payload) {
            this.tagsData = this.dedupe(payload);
            console.log(this.tagsData);
        },
        //更改负责人子组件传值
        getSingel(msg) {
            this.MemberName = msg;
            this.editForm.bzperson = this.MemberName;
        },
        getSingel2(msg) {
            this.MemberId = msg;
            this.editForm.bzpersonid = this.MemberId;
        },

        userrolelist() {
            var cid = this.cid;

            axios
                .post('/laowu_yun/userrolelist', { corp_id: cid, newuid:this.$store.state.userData.uid, })
                .then(res => {
                    for (var i = 0; i < res.data.content.length; i++) {
                        this.rolename.push(res.data.content[i]);
                    }
                    console.log(this.rolename);
                });
        }
    },
    mounted() {},
    created() {
        // this.framework();
        this.userrolelist();
    }
};
</script>
<style>
.el-collapse-item__header {
    font-size: 20px !important;
}
.level {
    font-size: 17px !important;
}

a {
    text-decoration: none;
}
.router-link-active {
    color: #409eff;
    text-decoration: none;
}

p {
    margin: 0;
}
ul {
    list-style: none;
}

#system {
    width: 100%;
    background-color: #f2f6fc;
    margin-left: 217px;
    margin-top: 17px;
    
}
/* 侧边导航栏 */
#system .el-tabs__item {
    text-align: center;
    color: #fff;
}
#system .el-tabs__nav-scroll {
    background-color: #409eff;
}
#system .el-tabs .el-tabs__header {
    width: 10%;
    margin-right: 0;
    padding-right: 1%;
}

/* #system .el-tabs__item:hover {
   
   background-color: #ffffff;
    color: #409EFF;
    cursor: pointer;
    margin:0 10px;
    border-radius: 5px;
    box-sizing: border-box
} */
#system .el-tabs__item.is-active {
    background-color: #1b84e6;
    color: #ffffff;
    margin: 0 10px;
    border-radius: 5px;
    box-sizing: border-box;
}

.el-tree-node__label {
    font-size: 16px !important;
}
#system .cell {
    color: rgba(49, 165, 247, 0.7);
    font-size: 16px;
    text-align: center;
}

#system .s-font {
    font-family: 'Hiragino Sans GB';
    margin-top: 50px;
}
#system .s-font1 {
    font-family: 'Hiragino Sans GB';
    font-size: 12px;
    color: #909399;
    margin-left: 100px;
}

/*栅格布局*/
#system .grid-content .el-row {
    margin-bottom: 20px;
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple-light {
    background: #ffffff;
    padding-left: 10%;
    padding-bottom: 10px;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

/*下拉菜单*/
.el-dropdown {
    vertical-align: top;
}
/*下拉尺寸*/
.el-button-group {
    width: 200px;
    height: 70px;
    margin-left: 60px;
    margin-top: 20px;
}
#system .el-button {
    width: 150px;
    height: 70px;
}
.el-dropdown__caret-button {
    width: 50px;
    height: 70px;
}
.el-dropdown + .el-dropdown {
    margin-left: 15px;
}
.el-icon-arrow-down {
    font-size: 12px;
}
/*框架组织*/
#system .frame {
    width: 90%;
    background-color: #ffffff;
    padding: 20px;
    margin: 30px auto;
    height: 700px;
    overflow: auto;
}
.frame .tips {
    width: 80%;
    background-color: #eaf7ff;
    margin: auto;
    padding: 20px;
    display: flex;
}
/* 主体*/
.subject {
    width: 95%;
    margin: 20px auto;
}

.subject .bg-purple-light {
    padding: 0;
}
.subject .grid-content {
    border-radius: 4px;
    min-height: 36px;
}

/* 订单中心 */
/*表头*/
#system .el-table {
    margin: auto;
}
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}

/* 权限 */
.back_c {
    width: 90%;
    margin: auto;
}
.qxtishi {
    background-color: #eaf7ff;
    width: 90%;
    padding: 10px;
    margin: 20px auto;
}
.qxtishi p {
    margin-left: 30px;
}

.row-m {
    padding: 0;
}

a:focus {
    color: #409eff;
}
a {
    color: black;
}

.level {
    margin-top: 20px;
    margin-left: 20px;
    font-size: 15px;
}

#system .back_c .grid-content {
    height: 500px;
    overflow-y: auto;
}
</style>



