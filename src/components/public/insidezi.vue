<template>
    <div class="inpane" id="insidezi">
        <div class="cnav">
            <sideMenu
                @childFn="parentFn"
                @childFn4="parentFn4"
                @childFn7="parentFn7"
                @childFn8="parentFn8"
            ></sideMenu>
        </div>
        <div
            style="width: 100%; position: relative; background-color: #fff"
            v-show="warnPage"
        >
            <div
                style="
                    margin: 0 auto;
                    text-align: center;
                    position: absolute;
                    left: 50%;
                    top: 30%;
                "
            >
                <img
                    style="width: 220px; height: 204px"
                    src="../../../static/images/write.png"
                    alt
                />
                <div style="font-size: 16px">请选择项目</div>
            </div>
        </div>
        <div class="ctable" v-show="viwePage">
            <div class="right-topheader">
                <div style="line-height: 40px; height: 40px">
                    <span
                        style="
                            font-size: 14px;
                            color: #606266;
                            line-height: 40px;
                        "
                        >班组信息</span
                    >
                </div>
                <div style="margin-top: 10px">
                    <el-button type="primary" v-if="urid > 2" @click="creat"
                        >新增班组</el-button
                    >
                </div>
            </div>
            <el-divider></el-divider>
            <div class="cdiv1">
                <div class="mainTable">
                    <div class="scroTable">
                        <el-table
                            :data="insideTableData"
                            border
                            style="width: 100%"
                        >
                            <el-table-column
                                type="index"
                                :index="indexMethod"
                                label="序号"
                                width="55"
                            ></el-table-column>
                            <el-table-column
                                prop="name"
                                label="班组名称"
                                show-overflow-tooltip="true"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="bzperson"
                                label="负责人名称"
                            ></el-table-column>
                            <el-table-column
                                prop="count"
                                label="班组人数"
                            ></el-table-column>
                            <el-table-column
                                prop="orgname"
                                label="钉钉部门"
                                show-overflow-tooltip="true"
                            >
                            </el-table-column>
                            <el-table-column fixed="right" label="操作">
                                <template slot-scope="scope">
                                    <el-popconfirm
                                        v-if="scope.row.bang == '1'"
                                        title="确定取消绑定吗？"
                                        @onConfirm="deleteBang(scope.row)"
                                        style="display: inline-block"
                                    >
                                        <el-button
                                            type="text"
                                            size="small"
                                            slot="reference"
                                            >取消绑定</el-button
                                        >
                                    </el-popconfirm>

                                    <el-button
                                        v-if="scope.row.bang == '2'"
                                        type="text"
                                        size="small"
                                        @click="goBang(scope.row)"
                                        >绑定</el-button
                                    >
                                    <el-button
                                        @click="handleWatch(scope.row)"
                                        type="text"
                                        size="small"
                                        >查看</el-button
                                    >

                                    <el-button
                                        @click="handleEdit(scope.row)"
                                        type="text"
                                        size="small"
                                        >编辑</el-button
                                    >
                                    <el-button
                                        v-if="urid > 2"
                                        @click="handleDelete(scope.row)"
                                        type="text"
                                        size="small"
                                        style="color: red"
                                        >删除</el-button
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
                </div>
            </div>
        </div>

        <el-dialog
            title="确定删除班组吗？"
            :visible.sync="cgDeleteisible"
            :append-to-body="true"
            @close="closeDialog"
            class="InDeleteDialog"
        >
            <div style="margin-bottom: 8px; color: #909291">
                <span>正在删除</span>
                <span style="color: #409eff; color: #409eff">{{
                    deleteBzName
                }}</span>
                <span>班组</span>
            </div>
            <div style="margin-bottom: 27px; color: #909291">
                班组一旦删除就无法找回，请谨慎删除！
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cgDeleteisible = false">取 消</el-button>
                <el-button type="primary" @click="deletePBtn" :loading="loaded"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import sideMenu from '../common/sideMenu5.vue';
export default {
    name: 'insidezi',
    components: { sideMenu },
    data() {
        var validatebzphone = (rule, value, callback) => {
            if (value) {
                const reg = /^1\d{10}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            cgDeleteisible: false,
            areaform: {
                area: '1'
            },
            viwePage: false,
            warnPage: true,
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            tabList: [],
            uid: this.$store.state.userData.uid,
            urid: this.$store.state.userData.urid,
            cid: this.$store.state.userData.cid,
            tabPosition: 'left',
            insideTableData: [],
            editLoading: false,
            loaded: false,
            groupView: false,
            singelView: false,
            creatFormVisible: false,
            watchFormVisible: false, //查看界面
            editFormVisible: false, //编辑界面
            tagsData: [],
            neworgids: [],
            editForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                name: '',
                bzpersonid: '',
                bzperson: '',
                urid: this.$store.state.userData.urid,
                bzname: '',
                cocode: '',
                bzphone: '',
                bztype: '',
                bzid: ''
            }, //编辑数据
            editFormRules: {
                bzphone: [
                    {
                        required: false,
                        validator: validatebzphone,
                        trigger: 'blur'
                    }
                ]
            },
            //子组件传回的值
            ManageName: [],
            ManageId: [],
            MemberName: '',
            MemberId: '',
            childbzid: '',
            failMsg: '',
            isFail: false,
            groupView: false,
            userids: [],
            orgids: [],
            newaddPeople: [],
            newaddTeam: [],
            agentid: '', //微应用id
            timeStamp: '', //时间戳
            noncestr: '', //签名随机串
            signature: '', //签名
            selectXmid: '',
            deleteBzid: '',
            deleteBzName: '',
            getDataType: '',
            getDatabzid: ''
        };
    },

    methods: {
        //添加成员子组件传值
        parentFn(payload) {
            this.selectXmid = payload;
            this.editForm.xmid = payload;
        },
        parentFn7(payload) {
            this.getDataType = payload;
        },
        parentFn8(payload) {
            this.getDatabzid = payload;
        },
        indexMethod(index) {
            return index + 1;
        },
        handleDelete(row) {
            this.cgDeleteisible = true;
            this.deleteBzid = row.bzid;
            this.deleteBzName = row.name;
        },
        //取消绑定
        deleteBang(row) {
            axios
                .post('/laowu_yun/jieddingdingzuzhijiagou', {
                    bzid: row.bzid,
                    orgid: row.orgid,
                    corp_id: this.$store.state.userData.cid
                })
                .then((res) => {
                    if (res.data.status == '1') {
                        this.getTeam();
                        this.$message({
                            message: '取消绑定成功！',
                            center: true,
                            duration: 2000,
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //绑定
        goBang(row) {
            const that = this;
            dd.ready(function () {
                dd.biz.contact.departmentsPicker({
                    title: '通讯录', //标题
                    corpId: that.$store.state.userData.cid, //企业的corpId
                    multiple: false, //是否多选
                    limitTips: '超出了', //超过限定人数返回提示
                    maxDepartments: 1, //最大选择部门数量
                    pickedDepartments: [], //已选部门
                    disabledDepartments: [], //不可选部门
                    requiredDepartments: [], //必选部门（不可取消选中状态）
                    appId: '', //微应用的Id
                    permissionType: 'GLOBAL', //选人权限，目前只有GLOBAL这个参数
                    onSuccess: function (result) {
                        axios
                            .post('/laowu_yun/bddingdingzuzhijiagou', {
                                bzid: row.bzid,
                                orgid: result.departments[0].id,
                                orgname: result.departments[0].name,
                                corp_id: that.$store.state.userData.cid
                            })
                            .then((res) => {
                                if (res.data.status == '1') {
                                    that.getTeam();
                                    that.$message({
                                        message: '绑定成功！',
                                        center: true,
                                        duration: 2000,
                                        type: 'success'
                                    });
                                } else {
                                    that.$message({
                                        message: res.data.msg,
                                        center: true,
                                        duration: 2000,
                                        type: 'warning'
                                    });
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    },
                    onFail: function (err) {}
                });
            });
            dd.error(function (err) {
                console.log(err);
            });
        },
        deletePBtn() {
            axios
                .post('/laowu_yun/userdeleteteam', {
                    bzid: this.deleteBzid,
                    newuid: this.$store.state.userData.uid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.cgDeleteisible = false;
                        this.getTeam();
                        this.$message({
                            message: '删除成功！',
                            center: true,
                            duration: 4000,
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 4000,
                            type: 'warning'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        getTeam() {
            const that = this;
            if (this.getDataType == '1') {
                axios
                    .post('/laowu_yun/huquteamcontentlist', {
                        corp_id: that.cid,
                        newuid: that.$store.state.userData.uid,
                        xmid: that.editForm.xmid,
                        current_page: that.currentPage
                    })
                    .then((res) => {
                        if (res.data.status == 1) {
                            that.total = res.data.content.total;
                            that.pagesize = res.data.content.num;
                            that.insideTableData = res.data.content.list;
                            that.editForm.xmid = value;
                            if (
                                that.total > 0 &&
                                that.insideTableData.length < 1
                            ) {
                                that.currentPage = res.data.page;
                                that.getTeam();
                            }
                        } else {
                            that.insideTableData = [];
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else if (this.getDataType == '2') {
                axios
                    .post('/laowu_yun/huquteamcontentlist', {
                        corp_id: that.cid,
                        newuid: that.$store.state.userData.uid,
                        bzid: that.getDatabzid,
                        current_page: num
                    })
                    .then((res) => {
                        if (res.data.status == 1) {
                            that.total = res.data.content.total;
                            that.pagesize = res.data.content.num;
                            that.insideTableData = res.data.content.list;
                            that.editForm.xmid = value;
                        } else {
                            that.insideTableData = [];
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        //编辑界面
        handleEdit(row) {
            this.$router.push({
                path: '/editteam',
                query: { bzid: row.bzid }
            });
        },
        //查看界面
        handleWatch(row) {
            this.$router.push({ path: '/staff', query: { bzid: row.bzid } });
        },
        viewSingel() {
            this.singelView = true;
        },
        viewGroup() {
            this.groupView = true;
        },
        save(formName) {
            const that = this;
            that.loaded = true;

            that.editForm.urid = that.$store.state.userData.urid;
            that.editForm.corp_id = that.$store.state.userData.cid;
            that.editForm.bzid = that.childbzid;

            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/laowu_yun/updateprojectteam', that.editForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.$refs.inEditForm.resetFields(); // 清空表单
                                that.editFormVisible = false;
                                that.isFail = false;
                                that.failMsg = '';
                                that.addperson();
                            } else {
                                that.isFail = true;
                                that.failMsg = res.data.msg;
                                that.loaded = false;
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
        cancel() {
            const that = this;
            that.isFail = false;
            that.failMsg = '';
            that.$refs.inEditForm.resetFields(); // 清空表单
            that.editFormVisible = false;
        },
        //删除选中的人
        handleClose(tag) {
            this.tagsData.splice(this.tagsData.indexOf(tag), 1);
            this.userids = this.tagsData.map((item) => {
                if (!item.user) return '';
                return item.user;
            });
        },
        //去重
        dedupe(array) {
            return Array.from(new Set(array));
        },

        creat() {
            // this.creatFormVisible = true;
            if (!this.editForm.xmid) {
                this.$alert('未创建项目,必须先创建项目才能添加班组');
            } else {
                this.$router.push({
                    path: '/addt',
                    query: { xmid: this.editForm.xmid }
                });
            }

            // this.$router.push({
            //     path: '/addt',
            //     query: { xmid: this.editForm.xmid }
            // });
        },
        addperson() {
            const that = this;
            axios
                .post('/laowu_yun/useraddteam', {
                    corp_id: that.cid,
                    newuid: that.$store.state.userData.uid,
                    bzid: that.childbzid,
                    userids: that.userids,
                    orgids: that.orgids
                })
                .then((res) => {
                    that.getTeam();
                    that.neworgids = [];
                });
        },
        handleCurrentChange(val) {
            const that = this;
            that.currentPage = val;

            that.getTeam();
        },
        addManyP() {
            const that = this;

            dd.ready(function () {
                dd.biz.contact.complexPicker({
                    title: '通讯录', //标题
                    corpId: that.$store.state.userData.cid, //企业的corpId
                    multiple: true, //是否多选
                    limitTips: '超出了', //超过限定人数返回提示
                    maxUsers: 1000, //最大可选人数
                    pickedUsers: [], //已选用户
                    pickedDepartments: [], //已选部门
                    disabledUsers: [], //不可选用户
                    disabledDepartments: [], //不可选部门
                    requiredUsers: [], //必选用户（不可取消选中状态）
                    requiredDepartments: [], //必选部门（不可取消选中状态）
                    appId: that.agentid, //微应用的Id
                    permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
                    responseUserOnly: false, //返回人，或者返回人和部门
                    startWithDepartmentId: 0, //仅支持0和-1
                    onSuccess: function (result) {
                        /**
                                    {
                                        selectedCount:1,                              //选择人数
                                        users:[{"name":"","avatar":"","userid":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段
                                        departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
                                    }
                                    */

                        let objs = JSON.parse(
                            JSON.stringify(result.users).replace(
                                /emplId/g,
                                'user'
                            )
                        );
                        for (let i = 0; i < objs.length; i++) {
                            that.tagsData.push(objs[i]);
                        }
                        for (let s = 0; s < result.departments.length; s++) {
                            that.neworgids.push(result.departments[s]);
                        }
                        that.tagsData = that.dedupe(that.tagsData);

                        // let newbz = [];
                        that.userids = that.tagsData.map((item) => {
                            if (!item.user) return '';
                            return item.user;
                        });
                        that.orgids = that.neworgids.map((item) => {
                            if (!item.id) return '';
                            return item.id;
                        });

                        // for (let g = 0; g < objs.length; g++) {
                        //     that.orgids.push(newbz[g]);
                        // }
                        that.userids = that.dedupe(that.userids);
                        that.orgids = that.dedupe(that.orgids);
                    },
                    onFail: function (err) {
                        console.log(err);
                    }
                });
            });
            dd.error(function (err) {
                console.log(err);
            });
        },

        checkding() {
            const that = this;
            axios
                .post('/ding/shoujitiongxun', {
                    corp_id: that.$store.state.userData.cid,
                    newuid: that.$store.state.userData.uid,
                    pc: '1'
                })
                .then((res) => {
                    if (res.data.status == '1') {
                        that.agentid = res.data.content.agentId;
                        that.timeStamp = res.data.content.timeStamp;
                        that.noncestr = res.data.content.nonceStr;
                        that.signature = res.data.content.signature;
                        dd.config({
                            agentId: that.agentid, // 必填，微应用ID
                            corpId: that.$store.state.userData.cid, //必填，企业ID
                            timeStamp: that.timeStamp, // 必填，生成签名的时间戳
                            nonceStr: that.noncestr, // 必填，生成签名的随机串
                            signature: that.signature, // 必填，签名
                            type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                            jsApiList: [
                                'biz.contact.complexPicker',
                                'biz.contact.choose',
                                'runtime.info',
                                'device.notification.confirm',
                                'device.notification.alert',
                                'device.notification.prompt',
                                'biz.ding.post',
                                'biz.util.openLink',
                                'biz.contact.departmentsPicker'
                            ] // 必填，需要使用的jsapi列表，注意：不要带dd。
                        });
                    }
                });
        },
        addSingP() {
            const that = this;
            document.getElementById('addinput').blur();

            dd.ready(function () {
                dd.biz.contact.complexPicker({
                    title: '通讯录', //标题
                    corpId: that.$store.state.userData.cid, //企业的corpId
                    multiple: false, //是否多选
                    limitTips: '超出了', //超过限定人数返回提示
                    maxUsers: 1, //最大可选人数
                    pickedUsers: [], //已选用户
                    pickedDepartments: [], //已选部门
                    disabledUsers: [], //不可选用户
                    disabledDepartments: [], //不可选部门
                    requiredUsers: [], //必选用户（不可取消选中状态）
                    requiredDepartments: [], //必选部门（不可取消选中状态）
                    appId: that.agentid, //微应用的Id
                    permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
                    responseUserOnly: true, //返回人，或者返回人和部门
                    startWithDepartmentId: 0, //仅支持0和-1
                    onSuccess: function (result) {
                        that.ruleForm.pname = result.users[0].name;
                        that.ruleForm.ppersonid = result.users[0].emplId;
                    },
                    onFail: function (err) {
                        console.log(err);
                    }
                });
            });
            dd.error(function (err) {
                console.log(err);
            });
        }
    },
    created() {},
    activated() {
        const that = this;
        // that.currentPage = 1;
        if (this.editForm.xmid) {
            that.getTeam();
        }
    },
    mounted() {
        const that = this;
        that.checkding();
    },
    watch: {
        selectXmid: function (newVal, oldVal) {
            if (newVal) {
                this.warnPage = false;
                this.viwePage = true;
            }
        }
    }
};
</script>
<style lang="less">
body {
    .InDeleteDialog {
        .el-dialog {
            width: 500px;
        }
    }
}
#insidezi {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .right-topheader {
        display: flex;
        justify-content: space-between;
    }
    .el-divider--horizontal {
        margin: 0;
        margin-top: 24px;
    }
    .ctable {
        width: 100%;
        background-color: #fff;

        padding: 0 10px;
        border: 1px solid #dcdfe6;
        height: 100%;
        overflow-x: scroll;
    }
    .cdiv1 {
        height: 100%;
        // .mainTable {
        //     overflow: hidden;
        //     .scroTable {
        //         height: 100%;
        //         overflow-y: scroll;
        .el-button-group {
            margin-left: 0;
            .leftBtnGroup {
                margin-left: 52px;
            }
        }
        //     }
        // }
    }
}
#laowu .inpane .el-tabs__item.is-active {
    background-color: #eaf5fc;
    color: #409eff !important;
    border-radius: 5px;
    box-sizing: border-box;
}
#laowu #Iu #insidezi .el-tabs__content {
    padding-top: 24px;
}
.inbutt {
    margin-left: 0 !important;
    display: flex;
    justify-content: space-between;
}
#laowu #insidezi .el-tab-pane {
    display: inherit;
}
#indexApp #laowu #Iu .inpane .el-row .el-col .bg-purple-light {
    padding-left: 0 !important;
}
#insidezi .el-tabs--left .el-tabs__nav-wrap.is-left.is-scrollable {
    padding-top: 0;
}
#laowu #Iu #insidezi .el-tabs__nav-scroll {
    /* height: 750px; */
    overflow-y: auto;
    color: #000;
}
#laowu #Iu #insidezi .el-tabs__nav-scroll::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
}
#laowu #Iu #insidezi .el-tabs__nav-prev {
    display: none;
}
#Iu #insidezi .el-tabs--left .el-tabs__nav-wrap.is-left {
    background-color: rgb(238, 246, 255);
}
#laowu #Iu #insidezi .el-tabs__item {
    color: #000;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
#laowu #Iu #insidezi .nomath .el-tabs__item {
    text-align: center;
}
#laowu #Iu #insidezi .nomath .el-tabs__item.is-active {
    color: red !important;
}
#insidezi .el-tabs--left .el-tabs__header.is-left {
    height: auto;
}
#laowu #Iu #insidezi {
    .el-tabs .el-tabs__header {
        padding-top: 0;
        overflow-x: scroll;
        height: 85%;
    }
    .el-tabs__item {
        padding-left: 16px;
    }
    .el-tabs__header {
        border: 0;
    }
}
</style>


