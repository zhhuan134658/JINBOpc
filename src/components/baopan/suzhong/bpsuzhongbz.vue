<template>
    <div id="bpsuzhongbz">
        <!-- 苏中班组 -->

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
            <el-table-column label="查看">
                <template slot-scope="scope">
                    <div>
                        <el-button
                            @click="handleChakan(scope.$index,scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >人员上报</el-button>
                        <el-button
                            @click="watchDetail(scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >考勤查看</el-button>
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
            <div style="margin-bottom:20px;text-align: center;">
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
                <el-table-column prop="usercode" label="身份证号"></el-table-column>
                <el-table-column prop="yuefen" label="月份"></el-table-column>
                <el-table-column prop="tianshu" label="天数"></el-table-column>
                <el-table-column label="查看">
                    <template slot-scope="scope">
                        <el-button
                            @click="watchSingelTitle(scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >详情</el-button>
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
                    <el-table-column prop="time" label="打卡时间"></el-table-column>
                    <el-table-column prop="yuefen" label="考勤月份"></el-table-column>
                    <el-table-column prop="jinchu" label="进出状态"></el-table-column>
                </el-table>
            </el-dialog>
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
            xmid: this.$route.query.xmid,
            teamList: [],
            cid: this.$store.state.userData.cid,
            corpList: [],
            bzid: '',
            cjid: '',
            addForm: {
                bzid: '',
                cjid: '',
                newuid: this.$store.state.userData.uid
            },
            loaded: false,
            addFormRules: {
                // created: [
                //     {
                //         required: true,
                //         message: '日期不能为空',
                //         trigger: ['blur', 'change']
                //     }
                // ],
                bzphone: [
                    {
                        required: true,
                        validator: validatebzphone,
                        trigger: 'blur'
                    }
                ],
                bzcode: [
                    {
                        required: true,
                        message: '企业信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '班组名称不能为空'
                    }
                ],
                bzperson: [
                    {
                        required: true,
                        message: '班组长姓名不能为空'
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
                        message: '参建单位不能为空'
                    }
                ]
            },
            watchBzId: '',
            watchDetailVisible: false,
            watchInnerVisible: false,
            watchDetailList: [],
            watchSingelList: [],
            searchTime: ''
        };
    },

    methods: {
        watchSingelTitle(row) {
            this.watchInnerVisible = true;
            axios
                .post('/laowu_yun/kaoqingerenxiangqing', {
                    id: row.userid,
                    time: row.yuefen,
                    newuid: this.$store.state.userData.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.watchSingelList = res.data.list;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning'
                        });
                    }
                })
                .catch(function(error) {
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
                    newuid: this.$store.state.userData.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.watchDetailList = res.data.list;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning'
                        });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        goback() {
            this.$router.push({
                name: 'bpsuzhong',
                query: { xmid: this.xmid }
            });
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
        cancel() {
            this.addVisible = false;
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
                        delete this.addForm.users;
                        this.addForm.bzid = this.bzid;
                        this.addForm.cjid = this.cjid;
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
    computed: {
        pickerStart() {
            return {
                disabledDate: time => {
                    let endDateVal = this.searchTime;
                    if (endDateVal) {
                        return time.getTime() > Date.now(); // 大于当前时间禁止选择
                    }
                }
            };
        }
    },
    mounted() {
        this.getList();
        // this.getCorpList();
    },
    created() {
        this.searchTime =
            new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1 < 10
                ? '0' + (new Date().getMonth() + 1)
                : new Date().getMonth() + 1);
    }
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
#bpsuzhongbz {
    padding: 10px;
    .marginb {
        margin-bottom: 15px;
    }
    .el-dialog {
        width: 30%;
    }
}
</style>