<template>
    <div id="bpbz">
        <!-- 参建 -->

        <el-button
            type="primary"
            @click="goblack"
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
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handlebd(scope.row)" type="primary" plain size="small">绑定参建单位</el-button>
                </template>
            </el-table-column>
            <el-table-column label="查看">
                <template slot-scope="scope">
                    <div v-if="scope.row.type == 1">
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
                    <div v-else>
                        <el-button @click="NoChakan" type="info" plain size="small">人员上报</el-button>
                        <el-button @click="NoChakan" type="info" plain size="small">考勤查看</el-button>
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
        <el-dialog
            title="绑定参建单位"
            :visible.sync="addVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="banzubangdingDialog bpPublcDialog"
        >
            <el-form
                :model="addForm"
                label-width="94px"
                :rules="addFormRules"
                ref="addEditForm"
                label-position="right"
            >
                <el-form-item label="参建单位：" prop="cjid">
                    <el-select v-model="addForm.cjid" placeholder="请选择">
                        <el-option
                            v-for="item in corpList"
                            :label="item.canjianname"
                            :value="item.cjid"
                            :key="item.cjid"
                        ></el-option>
                        <!-- <el-option label="完成一定工作" value="1"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-top:60px; width:100%;" class="bpBtn">
                    <el-button type="primary" :loading="loaded" @click="save('addEditForm')">绑定</el-button>
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
                cjid: [
                    {
                        required: true,
                        message: '绑定单位不能为空',
                        trigger: ['blur', 'change']
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
        goblack() {
            this.$router.push({ name: 'bpxq', query: { xmid: this.xmid } });
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
        handlebd(row) {
            this.addVisible = true;
            this.addForm.bzid = row.bzid;
            // this.cjid = row.cjid;
        },
        cancel() {
            this.addVisible = false;
        },
        save(formName) {
            this.loaded = true;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    axios
                        .post('/baopan/teambangdingcanjiandanwei', this.addForm)
                        .then(res => {
                            if (res.data.status == 1) {
                                this.loaded = false;
                                this.addVisible = false;
                                this.$message({
                                    message: '绑定成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success'
                                });
                                this.getList();
                                this.getCorpList();
                            } else {
                                this.loaded = false;
                                this.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
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
                    } else {
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getCorpList() {
            axios
                .post('/baopan/teamxinxilist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.corpList = res.data.content;
                    } else {
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        NoChakan() {
            this.$message({
                message: '请先绑定参建单位',
                center: true,
                duration: 2000,
                type: 'warning'
            });
        }
    },

    mounted() {
        this.getList();
        this.getCorpList();
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