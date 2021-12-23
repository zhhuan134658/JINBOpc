<template>
    <div id="bpfoshanbz">
        <el-button
            type="primary"
            @click="goback"
            style="float: right; margin-bottom: 10px; margin-left: 10px"
            >返回</el-button
        >

        <el-table :data="teamList" border style="width: 100%">
            <el-table-column
                type="index"
                label="序号"
                width="50"
            ></el-table-column>
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
            <el-table-column
                prop="bzperson"
                label="班组长姓名"
            ></el-table-column>
            <el-table-column prop="count" label="班组人数"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        @click="handlebd(scope.row)"
                        type="primary"
                        plain
                        size="small"
                        >班组上报</el-button
                    >
                </template>
            </el-table-column>
            <el-table-column label="查看">
                <template slot-scope="scope">
                    <div v-if="scope.row.type == 1">
                        <el-button
                            @click="handleChakan(scope.$index, scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >人员上报</el-button
                        >
                        <el-button
                            @click="watchDetail(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >考勤查看</el-button
                        >
                    </div>
                    <div v-else>
                        <el-button
                            @click="NoChakan"
                            type="info"
                            plain
                            size="small"
                            >人员上报</el-button
                        >
                        <el-button
                            @click="NoChakan"
                            type="info"
                            plain
                            size="small"
                            >考勤查看</el-button
                        >
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="企业考勤记录"
            :visible.sync="watchDetailVisible"
            :append-to-body="true"
            class="corpkaoqin"
        >
            <div style="margin-bottom: 20px; text-align: center">
                <el-date-picker
                    v-model="searchTime"
                    type="month"
                    :picker-options="pickerStart"
                    format="yyyy 年 MM 月"
                    value-format="yyyy-MM"
                    placeholder="选择日期"
                    @change="timeChange"
                ></el-date-picker>
            </div>
            <el-table :data="watchDetailList" border style="width: 100%">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column
                    prop="usercode"
                    label="身份证号"
                ></el-table-column>
                <el-table-column prop="yuefen" label="月份"></el-table-column>
                <el-table-column prop="tianshu" label="天数"></el-table-column>
                <el-table-column label="查看">
                    <template slot-scope="scope">
                        <el-button
                            @click="watchSingelTitle(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >详情</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                class="bpbanzukaoqinDialog"
                title="企业考勤记录"
                :visible.sync="watchInnerVisible"
                :append-to-body="true"
            >
                <el-table :data="watchSingelList" border style="width: 100%">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column
                        prop="time"
                        label="打卡时间"
                    ></el-table-column>
                    <el-table-column
                        prop="yuefen"
                        label="考勤月份"
                    ></el-table-column>
                    <el-table-column
                        prop="jinchu"
                        label="进出状态"
                    ></el-table-column>
                </el-table>
            </el-dialog>
        </el-dialog>
        <el-dialog
            title="班组上报"
            :visible.sync="addVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="bpPublcDialog"
        >
            <el-form
                :model="addForm"
                label-width="120px"
                :rules="addFormRules"
                ref="addEditForm"
                label-position="right"
            >
                <el-form-item label="班组名称：" class="marginb">
                    <span>{{ addForm.teamName }}</span>
                </el-form-item>
                <el-form-item
                    label="企业负责人姓名："
                    class="marginb"
                    prop="responsiblePersonName"
                >
                    <el-input
                        placeholder="请输入企业负责人姓名"
                        v-model="addForm.responsiblePersonName"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="负责人身份证号："
                    class="marginb"
                    prop="responsiblePersonIDNumber"
                >
                    <el-input
                        placeholder="请输入负责人身份证号"
                        v-model="addForm.responsiblePersonIDNumber"
                        maxlength="18"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="负责人电话："
                    class="marginb"
                    prop="responsiblePersonPhone"
                >
                    <el-input
                        placeholder="请输入负责人电话"
                        v-model="addForm.responsiblePersonPhone"
                        maxlength="11"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="班组所属企业名称："
                    class="marginb"
                    prop="corpName"
                >
                    <el-input
                        placeholder="请输入班组所属企业名称"
                        v-model="addForm.corpName"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="班组所属企业信用代码："
                    class="marginb"
                    prop="corpCode"
                >
                    <el-input
                        placeholder="请输入班组所属企业信用代码"
                        v-model="addForm.corpCode"
                    ></el-input>
                </el-form-item>
                <el-form-item label="进场日期：" prop="entryTime">
                    <el-date-picker
                        v-model="addForm.entryTime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="退场日期：" prop="exitTime">
                    <el-date-picker
                        v-model="addForm.exitTime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="备注：" class="marginb" prop="remark">
                    <el-input
                        type="textarea"
                        placeholder="请输入备注"
                        v-model="addForm.remark"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    style="margin-top: 60px; width: 100%"
                    class="bpBtn"
                >
                    <el-button
                        type="primary"
                        :loading="loaded"
                        @click="save('addEditForm', 2)"
                        >上报</el-button
                    >
                    <el-button
                        type="primary"
                        :loading="loading"
                        @click="save('addEditForm', 3)"
                        >修改</el-button
                    >
                    <el-button type="primary" @click="cancel">取消</el-button>
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
        var validateMoney = (rule, value, callback) => {
            const reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{2})))$/;
            if (!reg.test(value)) {
                callback(new Error('请输入正确的格式，最多保留小数点后两位'));
            } else {
                callback();
            }
        };
        return {
            addVisible: false,
            loading: false,
            xmid: this.$route.query.xmid,
            teamList: [],
            cid: this.$store.state.userData.cid,
            corpList: [],
            bzid: '',
            cjid: '',
            addForm: {
                corp_id: this.$store.state.userData.cid,
                xmid: this.$route.query.xmid,
                teamName: '',
                responsiblePersonPhone: '',
                responsiblePersonName: '',
                responsiblePersonIDNumber: '',
                responsiblePersonIDCardType: 46,
                bzid: '',
                corpCode: '',
                corpName: '',
                remark: '',
                entryTime: '',
                exitTime: '',
                status: 1,
            },
            loaded: false,
            addFormRules: {
                corpName: [
                    {
                        required: true,
                        message: '班组所属企业名称不能为空',
                        trigger: 'blur',
                    },
                ],
                corpCode: [
                    {
                        required: true,
                        message: '班组所属企业信用代码不能为空',
                        trigger: 'blur',
                    },
                ],
            },
            watchBzId: '',
            watchDetailVisible: false,
            watchInnerVisible: false,
            watchDetailList: [],
            watchSingelList: [],
            searchTime: '',
        };
    },

    methods: {
        watchSingelTitle(row) {
            this.watchInnerVisible = true;
            axios
                .post('/laowu_yun/kaoqingerenxiangqing', {
                    id: row.userid,
                    time: row.yuefen,
                    newuid: this.$store.state.userData.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.watchSingelList = res.data.list;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning',
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        timeChange(val) {
            this.searchTime = val;
            this.getDetailList();
        },
        watchDetail(row) {
            this.watchBzId = row.bzid;
            this.getDetailList();
            this.watchDetailVisible = true;
        },
        getDetailList() {
            axios
                .post('/laowu_yun/kaoqinshangbaolist', {
                    id: this.watchBzId,
                    time: this.searchTime,
                    newuid: this.$store.state.userData.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.watchDetailList = res.data.list;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning',
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        goback() {
            this.$router.push({
                name: 'bpfoshan',
                query: { xmid: this.xmid },
            });
        },
        handleChakan(index, row) {
            this.$router.push({
                path: '/bpchakan',
                query: {
                    bzid: row.bzid,
                    name: row.name,
                    xmid: this.xmid,
                    address: this.$route.query.address,
                },
            });
        },
        NoChakan() {
            this.$message({
                message: '请先上报班组',
                center: true,
                duration: 2000,
                type: 'warning',
            });
        },
        handlebd(row) {
            this.bzid = row.bzid;
            this.cjid = row.cjid;

            this.getMsg(row);
            this.addVisible = true;
        },
        cancel() {
            this.addVisible = false;
            this.loaded = false;
        },
        save(formName, type) {
            if (type == 2) {
                this.loaded = true;
                this.addForm.status = 2;
            } else if (type == 3) {
                this.loading = true;
                this.addForm.status = 3;
            }

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/newbao/fsUploadteam', this.addForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                if (type == 2) {
                                    this.loaded = true;
                                    this.addForm.status = 2;
                                } else if (type == 3) {
                                    this.loading = true;
                                    this.addForm.status = 3;
                                }
                                this.addVisible = false;
                                this.getList();
                                this.$message({
                                    message: '上报成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success',
                                });
                            } else {
                                if (type == 2) {
                                    this.loaded = true;
                                    this.addForm.status = 2;
                                } else if (type == 3) {
                                    this.loading = true;
                                    this.addForm.status = 3;
                                }
                                this.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning',
                                });
                            }
                        })
                        .catch(function (error) {
                            this.loaded = false;
                            console.log(error);
                        });
                } else {
                    if (type == 2) {
                        this.loaded = true;
                        this.addForm.status = 2;
                    } else if (type == 3) {
                        this.loading = true;
                        this.addForm.status = 3;
                    }
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
                    newuid: this.$store.state.userData.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.teamList = res.data.content;
                    } else if (res.data.status == 2) {
                        this.$alert('错误');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        getMsg(row) {
            axios
                .post('/newbao/fsTeamHx', {
                    corp_id: this.cid,
                    xmid: this.$route.query.xmid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        if (res.data.list) {
                            this.addForm = res.data.list;
                        }
                        this.addForm.corp_id = this.$store.state.userData.cid;
                        this.addForm.xmid = this.$route.query.xmid;
                        this.addForm.bzid = row.bzid;
                        this.addForm.teamName = row.name;
                    } else if (res.data.status == 2) {
                        this.$alert('参数错误！');
                    } else if (res.data.status == 3) {
                        this.$alert('无权限！');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.getList();
        // this.getCorpList();
    },
    computed: {
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.searchTime;
                    if (endDateVal) {
                        return time.getTime() > Date.now(); // 大于当前时间禁止选择
                    }
                },
            };
        },
    },
    created() {
        this.searchTime =
            new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1 < 10
                ? '0' + (new Date().getMonth() + 1)
                : new Date().getMonth() + 1);
    },
};
</script>
<style lang="less">
body {
    .corpkaoqin {
        .el-dialog {
            width: 80%;
        }
    }
    .bpbanzukaoqinDialog {
        .el-dialog {
            width: 600px;
        }
    }
    .banzubangdingDialog {
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
.cell {
    text-align: center;
}
#bpfoshanbz {
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