<template>
    <div id="Qfour">
        <div class="frame">
            <div style="width: 80%; margin: 0 auto">
                <div class="tips">
                    <div>
                        <p style="color: #8c8c8c">劳务实名制采用独立权限体系</p>
                    </div>
                    <div class="rightBtn" v-if="urid > 99">
                        <el-button plain @click="newP">更换主管理员</el-button>
                        <el-button type="primary" plain @click="addManyP"
                            >添加子管理员</el-button
                        >
                    </div>
                    <div v-else>
                        <div>当前主管理员：{{ manager }}</div>
                    </div>
                </div>
                <el-table :data="tablePeople" height="500">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column label="劳务实名制">
                        子管理员
                        <i
                            class="el-icon-check"
                            style="margin-left: 4px; color: #52c41a"
                        ></i>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <span v-if="urid < 99">删除</span>
                            <span
                                v-else="urid > 99"
                                style="color: red; cursor: pointer"
                                @click="handleDelete(scope.row)"
                                >删除</span
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="view" style="text-align: center">
                    <img src="../../../static/images/write.png" alt />
                </div>
            </div>
        </div>
        <el-dialog
            title="删除"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            class="qxfourdelete"
        >
            <span>
                <i class="el-icon-warning-outline" style="color: red"></i>
                确定删除？
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteBtn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
export default {
    data() {
        return {
            tablePeople: [],

            //q权限人员
            rolename: [],
            urid: this.$store.state.userData.urid, //权限id

            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            view: false,
            dialogVisible: false,
            deleteId: '',
            manager: ''
        };
    },
    methods: {
        getInfo() {
            axios
                .post('/laowu_yun/huoquzhuguanliyuan ', {
                    newuid: this.$store.state.userData.uid,
                    corp_id: this.cid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.manager = res.data.content.name;
                    }
                });
        },
        getTable() {
            axios
                .post('/laowu_yun/userrolelist', {
                    newuid: this.$store.state.userData.uid,
                    corp_id: this.cid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        if (res.data.content.length > 0) {
                            this.tablePeople = [];
                            for (let i = 0; i < res.data.content.length; i++) {
                                if (res.data.content[i].role === '5')
                                    this.tablePeople.push(res.data.content[i]);
                            }
                        } else {
                            this.view = true;
                        }
                    }
                    this.tablePeople = JSON.parse(
                        JSON.stringify(this.tablePeople)
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });
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
                    responseUserOnly: true, //返回人，或者返回人和部门
                    startWithDepartmentId: 0, //仅支持0和-1
                    onSuccess: function (result) {
                        /**
                                    {
                                        selectedCount:1,                              //选择人数
                                        users:[{"name":"","avatar":"","userid":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段
                                        departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
                                    }
                                    */
                        let newPeople = [];
                        newPeople = result.users.map((item) => {
                            if (!item.emplId) return '';
                            return item.emplId;
                        });
                        axios
                            .post('/laowu_yun/adduserrole', {
                                newuid: that.$store.state.userData.uid,
                                corp_id: that.cid,
                                rid: '5',
                                urid: that.urid,
                                userids: newPeople
                            })
                            .then((res) => {
                                if (res.data.status == 1) {
                                    that.getTable();
                                    that.$message.success('添加成功');
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
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
        handleDelete(row) {
            this.dialogVisible = true;
            this.deleteId = row.id;
        },
        noHandleDelete() {
            this.$alert('您没有权限执行此操作！');
        },
        deleteBtn() {
            axios
                .post('/laowu_yun/deleteuserrole', {
                    newuid: this.$store.state.userData.uid,
                    id: this.deleteId,
                    rid: 3,
                    urid: this.urid
                })
                .then((res) => {
                    this.dialogVisible = false;
                    this.getTable();
                });
        },
        newP() {
            this.$router.push({ name: 'Qxthree' });
        }
    },
    created() {
        this.getTable();
        this.getInfo();
    }
};
</script>

<style lang="less">
body {
    .qxfourdelete {
        .el-dialog {
            width: 25%;
            margin-top: 24vh !important;
            .el-dialog__body {
                padding: 10px 20px;
            }
            .el-icon-warning {
                color: red;
                font-size: 30px;
                margin-right: 6px;
                vertical-align: middle;
            }
        }
        .el-dialog__footer {
            text-align: center;
        }
    }
}
#Qfour {
    height: 100%;
    .frame {
        background-color: #ffffff;
        padding: 20px;
    }
}
</style>

