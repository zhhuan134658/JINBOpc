<template>
    <div id="bpbz">
        <!-- 连州班组 -->

        <el-button
            type="primary"
            @click="goback"
            style="float:right;margin-bottom:10px;margin-left:10px"
        >返回</el-button>

        <el-table :data="teamList" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="name" label="班组名称">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>{{ scope.row.name }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="bzperson" label="班组长姓名"></el-table-column>
            <el-table-column prop="count" label="班组人数"></el-table-column>
            <!-- <el-table-column label="班组长操作">
                <template slot-scope="scope">
                    <el-button @click="handlebd(scope.row)" type="primary" plain size="small">上传班组长</el-button>
                </template>
            </el-table-column>-->
            <el-table-column label="班组操作">
                <template slot-scope="scope">
                    <el-button @click="handUpZ(scope.row)" type="primary" plain size="small">上传班组长</el-button>
                    <el-button @click="handUp(scope.row)" type="primary" plain size="small">上传班组</el-button>
                    <el-button type="primary" plain size="small">取消</el-button>
                </template>
            </el-table-column>
            <el-table-column label="查看">
                <template slot-scope="scope">
                    <el-button @click="handleChakan(scope.$index,scope.row)" type="primary" plain>查看</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleTui(scope.$index,scope.row)" type="primary" plain>退场</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            title="上传班组"
            :visible.sync="addVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="lianDialog"
        >
            <el-form
                :model="addForm"
                label-width="120px"
                :rules="addFormRules"
                ref="addEditForm"
                label-position="right"
            >
                <el-form-item label="所属参建单位：" prop="bzname">
                    <el-select style="width:100%" v-model="addForm.bzname" placeholder="请选择参建单位">
                        <el-option
                            v-for="item in nameList"
                            :key="item.cjid"
                            :label="item.corpName"
                            :value="item.cjid"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班组名称：" class="marginb" prop="name">
                    <el-input
                        placeholder="请输入班组名称"
                        readonly
                        :disabled="true"
                        v-model="addForm.name"
                    ></el-input>
                </el-form-item>
                <el-form-item label="班组长姓名：" class="marginb" prop="bzperson">
                    <el-input
                        placeholder="请输入班组长姓名"
                        readonly
                        :disabled="true"
                        v-model="addForm.bzperson"
                    ></el-input>
                </el-form-item>
                <el-form-item label="身份证号码：" class="marginb" prop="useridcode">
                    <el-input
                        placeholder="身份证号码不能为空,请去人员管理补充信息"
                        readonly
                        :disabled="true"
                        v-model="addForm.useridcode"
                    ></el-input>
                </el-form-item>
                <el-form-item label="身份证住址：" class="marginb" prop="userads">
                    <el-input
                        placeholder="身份证住址不能为空,请去人员管理补充信息"
                        readonly
                        :disabled="true"
                        v-model="addForm.userads"
                    ></el-input>
                </el-form-item>
                <!-- <el-form-item label="总承包单位：" class="marginb" prop="zongbaoname">
                    <el-input
                        placeholder="总承包单位"
                        readonly
                        :disabled="true"
                        v-model="addForm.cjid"
                    ></el-input>
                </el-form-item>-->
                <el-form-item label="班组长电话：" class="marginb" prop="bzphone">
                    <el-input placeholder="请输入班组长电话" v-model="addForm.bzphone"></el-input>
                </el-form-item>
                <el-form-item label="班组工种：" prop="workType">
                    <el-select style="width:100%" v-model="addForm.workType" placeholder="请选择班组工种">
                        <el-option
                            v-for="item in workerType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-top:60px; width:100%;" class="bpBtn">
                    <el-button type="primary" :loading="loaded" @click="save('addEditForm')">绑定</el-button>
                    <el-button type="primary" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            title="上传班组长"
            :visible.sync="addZVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="lianDialog"
        >
            <el-form
                :model="addZForm"
                label-width="120px"
                :rules="addZFormRules"
                ref="addZEditForm"
                label-position="right"
            >
                <el-form-item label="所属参建单位：" prop="bzname">
                    <el-select style="width:100%" v-model="addForm.bzname" placeholder="请选择参建单位">
                        <el-option
                            v-for="item in nameList"
                            :key="item.cjid"
                            :label="item.corpName"
                            :value="item.cjid"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班组名称：" class="marginb" prop="name">
                    <el-input
                        placeholder="请输入班组名称"
                        readonly
                        :disabled="true"
                        v-model="addForm.name"
                    ></el-input>
                </el-form-item>
                <el-form-item label="班组长姓名：" class="marginb" prop="bzperson">
                    <el-input
                        placeholder="请输入班组长姓名"
                        readonly
                        :disabled="true"
                        v-model="addForm.bzperson"
                    ></el-input>
                </el-form-item>
                <el-form-item label="身份证号码：" class="marginb" prop="useridcode">
                    <el-input
                        placeholder="身份证号码不能为空,请去人员管理补充信息"
                        readonly
                        :disabled="true"
                        v-model="addForm.useridcode"
                    ></el-input>
                </el-form-item>
                <el-form-item label="身份证住址：" class="marginb" prop="userads">
                    <el-input
                        placeholder="身份证住址不能为空,请去人员管理补充信息"
                        readonly
                        :disabled="true"
                        v-model="addForm.userads"
                    ></el-input>
                </el-form-item>
                <!-- <el-form-item label="总承包单位：" class="marginb" prop="zongbaoname">
                    <el-input
                        placeholder="总承包单位"
                        readonly
                        :disabled="true"
                        v-model="addForm.cjid"
                    ></el-input>
                </el-form-item>-->
                <el-form-item label="班组长电话：" class="marginb" prop="bzphone">
                    <el-input placeholder="请输入班组长电话" v-model="addForm.bzphone"></el-input>
                </el-form-item>
                <el-form-item label="班组工种：" prop="workType">
                    <el-select style="width:100%" v-model="addForm.workType" placeholder="请选择班组工种">
                        <el-option
                            v-for="item in workerType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-top:60px; width:100%;" class="bpBtn">
                    <el-button type="primary" :loading="loaded" @click="Zsave('addZEditForm')">绑定</el-button>
                    <el-button type="primary" @click="Zcancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
   
<script>
import axios from 'axios';
export default {
    data() {
        var validatebzphone = (rule, value, callback) => {
            const reg = /^1\d{10}$/;
            if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        };
        return {
            addVisible: false,
            addZVisible: false,
            xmid: this.$route.query.xmid,
            teamList: [],
            cid: this.$store.state.userData.cid,
            corpList: [],
            nameList: [],
            bzid: '',
            cjid: '',
            addForm: {
                newuid: this.$store.state.userData.uid,
                bzid: '',
                cjid: '',
                xmid: this.$route.query.xmid,
                corp_id: this.$store.state.userData.cid,
                bzphone: '',
                name: '',
                bzperson: '',
                useridcode: '',
                userads: '',
                bzname: '',
                workType: ''
            },
            addZForm: {
                newuid: this.$store.state.userData.uid,
                bzid: '',
                cjid: '',
                xmid: this.$route.query.xmid,
                corp_id: this.$store.state.userData.cid,
                bzphone: '',
                name: '',
                bzperson: '',
                useridcode: '',
                userads: '',
                bzname: '',
                workType: ''
            },
            isClick: ['1'],
            loaded: false,
            addFormRules: {
                bzphone: [
                    {
                        required: true,
                        validator: validatebzphone,
                        trigger: 'blur'
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '班组名称不能为空，请去班组管理补充信息'
                    }
                ],
                bzperson: [
                    {
                        required: true,
                        message: '班组长姓名不能为空，请去班组管理补充信息'
                    }
                ],
                useridcode: [
                    {
                        required: true,
                        message: '身份证号不能为空，请去人员管理补充信息'
                    }
                ],
                userads: [
                    {
                        required: true,
                        message: '身份证住址不能为空，请去人员管理补充信息'
                    }
                ],
                bzname: [
                    {
                        required: true,
                        message: '参建单位不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                workType: [
                    {
                        required: true,
                        message: '班组工种不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            addZFormRules: {
                bzphone: [
                    {
                        required: true,
                        validator: validatebzphone,
                        trigger: 'blur'
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '班组名称不能为空，请去班组管理补充信息'
                    }
                ],
                bzperson: [
                    {
                        required: true,
                        message: '班组长姓名不能为空，请去班组管理补充信息'
                    }
                ],
                useridcode: [
                    {
                        required: true,
                        message: '身份证号不能为空，请去人员管理补充信息'
                    }
                ],
                userads: [
                    {
                        required: true,
                        message: '身份证住址不能为空，请去人员管理补充信息'
                    }
                ],
                bzname: [
                    {
                        required: true,
                        message: '参建单位不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                workType: [
                    {
                        required: true,
                        message: '班组工种不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            workerType: [
                {
                    label: '砌筑工',
                    value: '010'
                },
                {
                    label: '钢筋工',
                    value: '020'
                },
                {
                    label: '架子工',
                    value: '030'
                },
                {
                    label: '混凝土工',
                    value: '040'
                },
                {
                    label: '模板工',
                    value: '050'
                },
                {
                    label: '机械设备安装工',
                    value: '060'
                },
                {
                    label: '通风工',
                    value: '070'
                },
                {
                    label: '安装起重工',
                    value: '080'
                },
                {
                    label: '安装钳工',
                    value: '090'
                },
                {
                    label: '电气设备安装调试工',
                    value: '100'
                },
                {
                    label: '管道工',
                    value: '110'
                },
                {
                    label: '变电安装工',
                    value: '120'
                },
                {
                    label: '建筑电工',
                    value: '130'
                },
                {
                    label: '司泵工',
                    value: '140'
                },
                {
                    label: '挖掘铲运和桩工机械司机',
                    value: '150'
                },
                {
                    label: '桩机操作工',
                    value: '160'
                },
                {
                    label: '起重信号工',
                    value: '170'
                },
                {
                    label: '建筑起重机械安装拆卸工',
                    value: '180'
                },
                {
                    label: '装饰装修工',
                    value: '190'
                },
                {
                    label: '室内成套设施安装工',
                    value: '200'
                },
                {
                    label: '建筑门窗幕墙安装工',
                    value: '210'
                },
                {
                    label: '幕墙制作工',
                    value: '220'
                },
                {
                    label: '防水工',
                    value: '230'
                },
                {
                    label: '木工',
                    value: '240'
                },
                {
                    label: '石工',
                    value: '250'
                },
                {
                    label: '电焊工',
                    value: '270'
                },
                {
                    label: '爆破工',
                    value: '280'
                },
                {
                    label: '除尘工',
                    value: '290'
                },
                {
                    label: '测量放线工',
                    value: '300'
                },
                {
                    label: '线路架设工',
                    value: '310'
                },
                {
                    label: '古建筑传统石工',
                    value: '320'
                },
                {
                    label: '古建筑传统瓦工',
                    value: '330'
                },
                {
                    label: '古建筑传统彩画工',
                    value: '340'
                },
                {
                    label: '古建筑传统木工',
                    value: '350'
                },
                {
                    label: '古建筑传统油工',
                    value: '360'
                },
                {
                    label: '金属工',
                    value: '380'
                },
                {
                    label: '杂工',
                    value: '390'
                },
                {
                    label: '管理人员',
                    value: '900'
                },
                {
                    label: '其他',
                    value: '1000'
                }
            ]
        };
    },

    methods: {
        goback() {
            this.$router.push({ name: 'bplian', query: { xmid: this.xmid } });
            // this.$router.go(-1);
        },
        handleChakan(index, row) {
            this.$router.push({
                path: '/bpchakan',
                query: {
                    bzid: row.bzid,
                    name: row.name,
                    xmid: this.xmid,
                    address: this.$route.query.address
                }
            });
        },
        handUp(row) {
            if (this.isClick.length > 0) {
                this.$alert('请先上传班组长');
            } else {
                this.bzid = row.bzid;
                this.cjid = row.cjid;
                this.getMsg();
                this.addVisible = true;
            }
        },
        handUpZ(row) {
            this.bzid = row.bzid;
            this.cjid = row.cjid;
            // this.addForm.bzid = row.bzid;
            this.getMsg();
            this.addZVisible = true;
        },
        cancel() {
            this.addVisible = false;
        },
        Zcancel() {
            this.addZVisible = false;
        },
        getNameList() {
            axios
                .post('/baopan/xuanzeCanJianlist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.nameList = res.data.content;
                    } else if (res.data.status == 2) {
                        this.$alert('错误');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        save(formName) {
            const that = this;
            that.loaded = true;
            // thithats.addForm.prcode = this.$route.query.prcode;
            that.$refs[formName].validate(valid => {
                if (valid) {
                    axios
                        .post('/baopan/kpsahngchuanteam', that.addForm)
                        .then(res => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.addVisible = false;
                                that.getList();
                                that.$message({
                                    message: '上传班组长成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success'
                                });
                            } else {
                                that.loaded = false;
                                that.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning'
                                });
                            }
                        })
                        .catch(function(error) {
                            that.loaded = false;
                            console.log(error);
                        });
                } else {
                    that.loaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        Zsave(formName) {
            const that = this;
            that.loaded = true;
            // thithats.addForm.prcode = this.$route.query.prcode;
            that.$refs[formName].validate(valid => {
                if (valid) {
                    axios
                        .post('/baopan/kpgongrenAdd', that.addZForm)
                        .then(res => {
                            if (res.data.status == 1) {
                                that.isClick = [];
                                that.loaded = false;
                                that.addZVisible = false;
                                that.getList();
                                that.$message({
                                    message: '上传班组成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success'
                                });
                            } else {
                                that.loaded = false;
                                that.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning'
                                });
                            }
                        })
                        .catch(function(error) {
                            that.loaded = false;
                            console.log(error);
                        });
                } else {
                    that.loaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getList() {
            axios
                .post('/baopan/huquteamcontentlist', {
                    corp_id: this.cid,
                    xmid: this.$route.query.xmid,
                    newuid: this.$store.state.userData.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.teamList = res.data.content;
                    } else if (res.data.status == 2) {
                        this.$alert('错误');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        getMsg() {
            axios
                .post('/laowu_yun/projectteamcontent', {
                    corp_id: this.cid,
                    bzid: this.bzid,
                    newuid: this.$store.state.userData.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.addForm = res.data.content;
                        this.addZForm = res.data.content;
                        delete this.addForm.users;
                        delete this.addZForm.users;
                        this.addForm.bzphone = res.data.content.bzpersonidphone;
                        this.addForm.bzid = this.bzid;
                        this.addForm.cjid = this.cjid;
                        this.addForm.corp_id = this.cid;
                        this.addForm.xmid = this.$route.query.xmid;

                        this.addZForm.bzphone =
                            res.data.content.bzpersonidphone;
                        this.addZForm.bzid = this.bzid;
                        this.addZForm.cjid = this.cjid;
                        this.addZForm.corp_id = this.cid;
                        this.addZForm.xmid = this.$route.query.xmid;
                    } else if (res.data.status == 2) {
                        alert('参数错误！');
                    } else if (res.data.status == 3) {
                        alert('无权限！');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getList();
        this.getNameList();
    }
};
</script>
<style lang="less">
.cell {
    text-align: center;
}
body {
    .lianDialog {
        .marginb {
            margin-bottom: 15px;
        }
    }
}
#bpbz {
    padding: 10px;
    .marginb {
        margin-bottom: 15px;
    }
    .el-dialog {
        width: 30%;
        .el-select {
            width: 100%;
        }
        .bpBtn {
            .el-form-item__content {
                margin-left: 0 !important;
                text-align: center;
            }
        }
    }
}
</style>