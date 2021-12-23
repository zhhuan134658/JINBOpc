<template>
    <div id="money_tip_send">
        <div style="margin:20px 0 0 20px;">
            <el-button type="primary" plain @click="back">返回</el-button>
        </div>

        <div class="msrContent">
            <div class="footerContent">
                <div class="money_list">
                    <div class="mlFlex">
                        <h3>{{msData.zong-msData.chakan}}</h3>
                        <p>未查看</p>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="mlFlex">
                        <h3>{{msData.zong-msData.queren}}</h3>
                        <p>未确认</p>
                    </div>
                </div>
            </div>
            <div class="msrTable">
                <div class="mtTableBtn">
                    <!-- <el-button plain class="mondeyDingBtn" @click="msrBtn">批量发送</el-button> -->
                    <el-button plain class="mondeyDingBtn" @click="msrBzBtn">全部发送</el-button>
                    <el-form
                        :inline="true"
                        :model="searchform"
                        class="demo-form-inline"
                        @submit.native.prevent
                    >
                        <el-form-item>
                            <el-input
                                v-model="searchform.name"
                                placeholder="请输入姓名"
                                @keyup.enter.native="search"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button plain @click="search">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="msrList"
                    border
                    style="width: 100%; text-align:center;margin-bottom: 20px;"
                    :default-sort="{prop: 'date', order: 'descending'}"
                >
                    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="shifa" label="实发金额"></el-table-column>
                    <el-table-column prop="status" label="发送状态"></el-table-column>
                    <el-table-column prop="chakan" label="查看状态"></el-table-column>
                    <el-table-column prop="queren" label="确认状态"></el-table-column>
                    <el-table-column prop="fankui" label="反馈"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                v-if="scope.row.status == '未发送'"
                                @click="handleClick(scope.row)"
                                type="text"
                                size="small"
                            >发送</el-button>
                            <span v-else style="font-size:12px;">发送</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align:center">
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
</template>
<script>
import axios from 'axios';
export default {
    name: 'money_tip_send',
    data() {
        return {
            total: '',
            pagesize: '',
            currentPage: 1,
            msrList: [],
            searchform: {
                name: '',
            },
            cid: this.$store.state.userData.cid,
            msBzid: this.$store.state.userData.salaryBzid,
            msBzTime: this.$store.state.userData.salaryMonth,
            msData: { zong: 0, queren: 0, chakan: 0 },
            selectSendData: '',
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTMHList(val);
        },
        handleClick(row) {
            this.$confirm('工资条将通过钉钉工作通知发送给员工', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    axios
                        .post('/laowu_yun/fasongxaioxitongzhi', {
                            yuefen: this.$store.state.userData.salaryMonth,
                            newuid: this.$store.state.userData.uid,
                            userid: row.userid,
                            bzid: this.$store.state.userData.salaryBzid,
                            corp_id: this.cid,
                            username: this.$store.state.userData.uname,
                        })
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: res.data.msg,
                                });
                                this.getTMHList(1);
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning',
                                });
                            }
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消发送',
                    });
                });
        },
        search() {
            this.getTMHList(1);
        },
        sendNote() {},
        msrBzBtn() {
            this.$confirm('工资条将通过钉钉工作通知发送给全部员工', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    axios
                        .post('/laowu_yun/fasongxaioxitongzhi', {
                            yuefen: this.$store.state.userData.salaryMonth,
                            newuid: this.$store.state.userData.uid,
                            bzid: this.$store.state.userData.salaryBzid,
                            corp_id: this.cid,
                            username: this.$store.state.userData.uname,
                        })
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: res.data.msg,
                                });
                                this.getTMHList(this.currentPage);
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning',
                                });
                            }
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消发送',
                    });
                });
        },
        getTMHList(val) {
            axios
                .post('/laowu_yun/xinzitiaoliebiao', {
                    yuefen: this.msBzTime,
                    newuid: this.$store.state.userData.uid,
                    corp_id: this.cid,
                    bzid: this.msBzid,
                    name: this.searchform.name,
                    current_page: val,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.msData = res.data.shuliang;
                        this.msrList = res.data.content.list;
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.currentPage = res.data.content.current_page;
                    } else {
                        this.$alert('错误');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },

    mounted() {
        this.getTMHList(1);
    },
    created() {},
};
</script>
<style lang="less">
#money_tip_send {
    height: 100%;
    overflow-y: auto;
    .msrContent {
        width: 72%;
        min-width: 740px;
        margin: 0 auto;

        .footerContent {
            // width: 100%;
            margin: 30px auto;
            margin-top: 40px;
            .money_list {
                display: flex;
                justify-content: flex-start;
                background-color: rgb(64, 158, 255);
                color: #fff;
                padding: 20px 0;
                border-radius: 10px;
                .mlFlex {
                    width: 50%;
                    text-align: center;
                    height: 60px;
                    line-height: 28px;
                    h3 {
                        padding-bottom: 15px;
                    }
                    p {
                        font-size: 16px;
                    }
                }
                .el-divider--vertical {
                    height: 65px;
                }
            }
            .bz_list {
                .bz_list_top {
                    height: 40px;
                    line-height: 40px;
                    margin: 15px 0;
                    .pro {
                        font-size: 18px;
                        color: #409eff;
                    }
                    i {
                        color: #409eff;
                    }
                }
                .bz_list_ul {
                    width: 100%;
                    li {
                        width: 100%;
                        border: 1px solid #e8e8e8;
                        border-radius: 6px;
                        margin-bottom: 10px;
                        .bzlContent {
                            padding: 10px;
                            display: flex;
                            justify-content: space-between;
                            .clTop {
                                display: flex;
                                padding: 4px 0;
                                h4 {
                                    font-size: 20px;
                                }
                                div {
                                    background-color: #eee;
                                    border-radius: 5px;
                                    padding: 3px 10px;
                                    height: 20px;
                                    line-height: 24px;
                                    margin-left: 10px;
                                }
                                .yi {
                                    background-color: #409eff;
                                    color: #fff;
                                }
                            }
                            .el-button {
                                height: 30px;
                                line-height: 30px;
                                padding: 0 20px;
                                margin-top: 8px;
                            }
                        }
                    }
                    li:hover {
                        border-color: #409eff;
                    }
                }
            }
        }
        .msrTable {
            padding-bottom: 20px;
            .mtTableBtn {
                display: flex;
                height: 40px;
                margin-bottom: 20px;
                .mondeyDingBtn {
                    margin-right: 30px;
                }
            }
        }
    }
}
</style>