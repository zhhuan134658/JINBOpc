<template>
    <div id="money_he">
        <div class="mhContent">
            <div class="mhTable">
                <!-- <div class="mhHeader">
                    <el-button plain @click="CKQ">计算考勤</el-button>
                </div>-->
                <div class="mtTableBtn">
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
                    <el-button plain v-if="searchView" @click="shareKQ">同步钉钉考勤</el-button>
                </div>
                <div v-if="tableView">
                    <el-table
                        ref="multipleTable"
                        :data="moneyHeList"
                        border
                        style="width: 100%; text-align:center;margin-bottom: 20px;"
                        :default-sort="{prop: 'date', order: 'descending'}"
                    >
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="tianshu" label="出勤天数" width="100px"></el-table-column>
                        <el-table-column prop="shichang" label="工作时长(小时)"></el-table-column>
                        <el-table-column prop="kaoqinxz" label="钉钉考勤核算"></el-table-column>
                        <el-table-column prop="type" label="结算方式" width="100px"></el-table-column>
                        <el-table-column prop="xinzi" label="应发">
                            <template slot-scope="scope">
                                <el-input
                                    placeholder="请输入内容"
                                    v-show="scope.row.show"
                                    v-model="scope.row.yingfa"
                                ></el-input>
                                <span v-show="!scope.row.show">{{scope.row.yingfa}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="shifa" label="实发">
                            <template slot-scope="scope">
                                <el-input
                                    placeholder="请输入内容"
                                    v-show="scope.row.show"
                                    v-model="scope.row.shifa"
                                ></el-input>
                                <span v-show="!scope.row.show">{{scope.row.shifa}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <span
                                    class="mhEditeBtn"
                                    v-if="scope.row.view"
                                    @click="mhEdite(scope.row)"
                                >编辑</span>
                                <span class="mhEditeBtn" v-else @click="cancelEdite(scope.row)">取消编辑</span>
                                <span class="mhEditeBtn" @click="editeSave(scope.row)">保存</span>
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
                <div v-else class="sencondTable">
                    <el-table
                        ref="moneyTable"
                        :data="moneyTHeList"
                        v-loading="tableLoading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(255, 255, 255, 0.8)"
                        border
                        style="width: 100%; text-align:center;margin-bottom: 20px;"
                    >
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="tianshu" label="出勤天数" width="100"></el-table-column>
                        <el-table-column prop="shichang" label="工作时长(小时)"></el-table-column>
                        <el-table-column prop="kaoqinxz" label="钉钉考勤核算"></el-table-column>
                        <el-table-column prop="type" label="结算方式" width="100"></el-table-column>
                        <el-table-column prop="xinzi" label="应发">
                            <template slot-scope="scope">
                                <el-input
                                    placeholder="请输入内容"
                                    v-show="scope.row.show"
                                    v-model="scope.row.yingfa"
                                ></el-input>
                                <span v-show="!scope.row.show">{{scope.row.yingfa}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="shifa" label="实发">
                            <template slot-scope="scope">
                                <el-input
                                    placeholder="请输入内容"
                                    v-show="scope.row.show"
                                    v-model="scope.row.shifa"
                                ></el-input>
                                <span v-show="!scope.row.show">{{scope.row.shifa}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="异常状态"
                            width="100"
                            prop="zstatus"
                            :formatter="formatStatus"
                        >
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>异常: {{ scope.row.xiangqing || '无' }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag
                                            size="medium"
                                            :class="[scope.row.zstatus == '2'?'active':'']"
                                        >{{ scope.row.zstatus=='1'?'正常':'异常' }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <span
                                    class="mhEditeBtn"
                                    v-if="scope.row.view"
                                    @click="mhEdite(scope.row)"
                                >编辑</span>
                                <span class="mhEditeBtn" v-else @click="cancelEdite(scope.row)">取消编辑</span>
                                <span class="mhEditeBtn" @click="editeSave(scope.row)">保存</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="text-align:center">
                        <el-pagination
                            @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            :current-page.sync="currentPage2"
                            :page-size="pagesize2"
                            layout="prev, pager, next, jumper"
                            :total="total2"
                        ></el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'money_he',
    props: {
        xmid: {
            type: String,
        },
        moneyMonth: {
            type: String,
        },
        bzid: {
            type: String,
        },
        objBZM: {
            type: Object,
        },
    },
    data() {
        return {
            total: '',
            pagesize: '',
            currentPage: 1,
            moneyHeList: [],
            searchform: { name: '' },
            cid: this.$store.state.userData.cid,

            total: '',
            pagesize: '',
            currentPage: 1,
            total2: '',
            pagesize2: 10,
            currentPage2: 1,
            mhBzid: this.$store.state.userData.salaryBzid,
            mhBzTime: this.$store.state.userData.salaryMonth,
            isEditView: true,
            moneyTHeList: [],
            tableView: true,
            tableLoading: false,
            searchView: true,
        };
    },
    methods: {
        formatStatus(row) {
            if (row.status == 1) {
                return '正常';
            } else if (row.status == 2) {
                return '异常';
            }
        },
        mhEdite(row) {
            row.show = true;
            row.view = false;
        },
        cancelEdite(row) {
            row.show = false;
            row.view = true;
            this.getMHList(this.currentPage);
        },
        editeSave(row) {
            if (row.view == false) {
                axios
                    .post('/laowu_yun/dingxinzixiugai', {
                        yuefen: this.mhBzTime,
                        newuid: this.$store.state.userData.uid,
                        corp_id: this.cid,
                        userid: row.userid,
                        shifa: row.shifa,
                        yingfa: row.yingfa,
                    })
                    .then((res) => {
                        if (res.data.status == 1) {
                            row.show = false;
                            row.view = true;
                            this.getMHList(1);
                        } else {
                            row.shifa = '';
                            row.yingfa = '';
                            this.$alert(res.data.msg);
                        }
                    });
            } else {
                console.log('不可保存');
            }
        },
        search() {
            if (this.searchView) {
                this.getMHList(1);
            } else {
                this.getTMHList(1);
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getMHList(val);
        },
        handleCurrentChange2(val) {
            this.currentPage2 = val;
            this.getTMHList(val);
        },
        shareKQ() {
            this.searchform.name = '';
            this.searchView = false;
            this.tableView = false;
            this.getTMHList(1);
        },
        getTMHList(val) {
            const that = this;
            that.tableLoading = true;
            axios
                .post('/laowu_yun/tongbudingdingkaoqin', {
                    yuefen: that.mhBzTime,
                    newuid: that.$store.state.userData.uid,
                    corp_id: that.cid,
                    bzid: that.mhBzid,
                    name: that.searchform.name,
                    current_page: val,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        that.tableLoading = false;
                        res.data.content.forEach((element) => {
                            element['show'] = false;
                            element['view'] = true;
                        });
                        that.total2 = res.data.content.length;
                        // this.pagesize2 = res.data.content.num;
                        if (res.data.content == null) {
                            that.moneyTHeList = [];
                        }
                        that.moneyTHeList = res.data.content;
                    } else {
                        that.tableLoading = false;
                        that.$alert(res.data.msg);
                    }
                })
                .catch(function (error) {
                    that.tableLoading = false;
                    console.log(error);
                });
        },
        getMHList(val) {
            axios
                .post('/laowu_yun/liangxinhesuan', {
                    yuefen: this.mhBzTime,
                    newuid: this.$store.state.userData.uid,
                    corp_id: this.cid,
                    bzid: this.mhBzid,
                    name: this.searchform.name,
                    current_page: val,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        res.data.content.list.forEach((element) => {
                            element['show'] = false;
                            element['view'] = true;
                        });
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.moneyHeList = res.data.content.list;
                        this.currentPage = res.data.content.current_page;
                    } else {
                        this.$alert(res.data.msg);
                    }
                });
        },
    },
    mounted() {
        this.getMHList(1);
    },

    created() {},
    watch: {},
    activated() {
        this.getMHList(1);
    },
};
</script>
<style lang="less">
#money_he {
    .mhContent {
        width: 80%;
        min-width: 740px;
        margin: 0 auto;
        .mhHeader {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
        }
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
                    width: 25%;
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
        .mhTable {
            padding-bottom: 20px;
            .mtTableBtn {
                display: flex;
                height: 40px;
                margin: 20px 0;
                .mondeyDingBtn {
                    margin-right: 30px;
                }
            }
            .active {
                color: red;
            }
            .el-pager li.active {
                color: #409eff;
            }
            .mhEditeBtn {
                cursor: pointer;
                color: #409eff;
            }
            .sencondTable {
                overflow: hidden;
                margin-top: 20px;
            }
        }
    }
}
</style>