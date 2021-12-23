<template>
    <div id="Qthree">
        <div class="main">
            <div class="headerBack">
                <el-button plain class="threeBack" @click="back">返回</el-button>
            </div>

            <div class="content">
                <div>
                    <el-form
                        label-width="112px"
                        :rules="creatProjectrules"
                        :label-position="labelPosition"
                        ref="creatProject"
                        :model="ruleForm"
                    >
                        <el-form-item label="当前主管理员：">
                            <p>{{ruleForm.name}}</p>
                        </el-form-item>
                        <el-form-item label="更换为：" class="contentSelect">
                            <el-button plain @click="addSingP">{{newname}}</el-button>
                            <p style="color:rgb(50, 150, 250);">
                                <i class="el-icon-warning-outline"></i>更换后，你将失去劳务实名制管理员权限
                            </p>
                        </el-form-item>
                        <el-form-item style="margin-top:60px; width:100%;">
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="save('creatProject')"
                            >确定更换</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div>
                    <img style="width:320px;" src="../../../static/images/indexP.png" alt />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
export default {
    props: {},
    data() {
        return {
            ruleForm: {
                name: '',
                userid: ''
            },
            labelPosition: 'right',
            loaded: false,
            urid: this.$store.state.userData.urid, //权限id

            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            saveForm: {
                 newuid:this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                userid: this.$store.state.userData.uid,
                gaiuid: ''
            },
            newname: '选择人员'
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        handleEdit(index, row) {
            this.xrowname = row.name;
            this.xrowid = row.id;
        },
        getInfo() {
            axios
                .post('/laowu_yun/huoquzhuguanliyuan ', {
                    corp_id: this.cid,
                     newuid:this.$store.state.userData.uid,
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.ruleForm = res.data.content;
                        this.saveForm.gaiuid = res.data.content.userid;
                    }
                });
        },

        handleDelete(index, row) {
            axios
                .post('/laowu_yun/deleteuserrole', {
                     newuid:this.$store.state.userData.uid,
                    id: row.id,
                    rid: 3,
                    urid: this.urid
                })
                .then(res => {
                    this.$alert('已删除，请刷新');
                });
        },
        addSingP() {
            const that = this;

            dd.ready(function() {
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
                    onSuccess: function(result) {
                        // that.ruleForm.name = result.users[0].name;
                        that.saveForm.gaiuid = result.users[0].emplId;
                        that.newname = result.users[0].name;
                    },
                    onFail: function(err) {
                        console.log(err);
                    }
                });
            });
            dd.error(function(err) {
                console.log(err);
            });
        },
        save(formName) {
            this.loaded = true;
            if (!this.saveForm.saveForm) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        axios
                            .post(
                                '/laowu_yun/genghuanzhuguanliyuan',
                                this.saveForm
                            )
                            .then(res => {
                                if (res.data.status == 1) {
                                    this.loaded = false;
                                    // this.$refs.creatProject.resetFields(); // 清空表单
                                    // this.creatFormVisible = false;
                                    // this.$alert('更改主管理员成功！');
                                    this.$message({
                                        message: '更换成功',
                                        center: true,
                                        duration: 2000,
                                        type: 'success'
                                    });
                                    setTimeout(() => {
                                        this.$router.push({
                                            path: '/'
                                        });
                                    }, 500);
                                } else {
                                    this.loaded = false;
                                    this.$message({
                                        message: res.data.msg,
                                        center: true,
                                        duration: 1000,
                                        type: 'warning'
                                    });
                                }
                            })
                            .catch(function(error) {
                                this.loaded = false;
                                console.log(error);
                            });
                    } else {
                        this.loaded = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            } else {
                this.$alert('请选择人员');
            }
        },
        framework() {
            var url = decodeURIComponent(location.search); //获取url中"?"符后的字串
            var cid = url.split('?corpid=')[1];
            this.cid = cid;

            var _this = this;

            _this.$store.commit('setCid', cid);

            dd.ready(function() {
                dd.runtime.permission.requestAuthCode({
                    corpId: cid, // 企业id
                    onSuccess: function(info) {
                        var code = info.code; // 通过该免登授权码可以获取用户身份             console.log(code)

                        axios
                            .post('/dingyun/getuserrole', {
                                corp_id: cid,
                               
                                code: code
                            })
                            .then(res => {
                                _this.name = res.data.content.user_name;
                                _this.manager = res.data.bieming;
                                _this.corp_name = res.data.content.corp_name;
                                _this.urid = res.data.status;

                                var corp_name = res.data.content.corp_name;
                                var urid = res.data.status;

                                _this.$store.commit('setValue', corp_name);
                                _this.$store.commit('setUrid', urid);

                                _this.$store.commit(
                                    'setValue',
                                    res.data.content.corp_name
                                );
                                _this.$store.commit('setUrid', res.data.status);

                                _this.$store.commit(
                                    'setUid',
                                    res.data.content.userid
                                );
                                _this.$store.commit(
                                    'setName',
                                    res.data.content.user_name
                                );

                                _this.$store.commit(
                                    'setUid',
                                    res.data.content.userid
                                );
                            });
                    },
                    onFail: function(err) {
                        console.log(err);
                    }
                });
            });
        }
    },
    mounted() {
        this.getInfo();
    }
};
</script>

<style lang="less">
// #system .cell .el-button {
//     width: 120px;
//     height: 50px;
// }
#Qthree {
    height: 100%;
    .main {
        background-color: #fff;
        // padding: 20px;
        height: 100%;
        overflow: auto;

        .el-button {
            width: auto;
            height: auto;
        }
        .headerBack {
            position: relative;
            // height: 58px;
            padding: 12px 25px;
            border-bottom: 1px solid #e8e8e8;
            .el-button {
                width: 100px;
                height: 32px;
                line-height: 32px;
                padding: 0;
            }
        }
        .content {
            display: flex;
            justify-content: space-between;
            width: 80%;
            margin: 0 auto;
            margin-top: 20px;
            .el-form {
                min-width: 500px;
                margin-top: 26px;
            }
            .contentSelect {
                .el-form-item__content {
                    display: flex;
                    p {
                        margin-left: 6px;
                    }
                }
            }
        }
    }
}
</style>

