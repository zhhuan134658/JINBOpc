<template>
    <div id="money_leaf">
        <div
            style="width:100%;height:100%;position: relative;background-color: #fff;"
            v-show="warnPage"
        >
            <div style="margin:0 auto;text-align:center;position: absolute;left: 50%;top: 30%;">
                <img style="width:220px;height:204px;" src="../../../static/images/write.png" alt />
                <div style="font-size:16px;">请选择项目</div>
            </div>
        </div>
        <div class="main" v-show="viwePage">
            <div class="topMain">
                <p>离场结算</p>
                <!-- <el-button type="primary" plain @click="uoloadExcel">上传薪资表</el-button> -->
            </div>
            <el-divider></el-divider>

            <div class="footerContent">
                <div class="money_list">
                    <div class="mlFlex">
                        <h3>{{xmData.jinli}}</h3>
                        <p>今日离场</p>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="mlFlex">
                        <h3>{{xmData.yueli}}</h3>
                        <p>本月离场</p>
                    </div>
                </div>
                <div class="cdivHeader">
                    <el-form
                        :inline="true"
                        :model="searchform"
                        class="demo-form-inline"
                        @submit.native.prevent
                    >
                        <!-- <el-form-item class="cdBanzu">
                            <el-select
                                v-model="bzDownId"
                                placeholder="请选择班组"
                                @change="bzDataChange"
                            >
                                <el-option
                                    v-for="(item,index) in bzDownList"
                                    :key="item.bzid"
                                    :label="item.name"
                                    :value="item.bzid"
                                ></el-option>
                            </el-select>
                        </el-form-item>-->

                        <el-form-item class="cdName">
                            <el-input
                                v-model="searchform.name"
                                placeholder="请输入姓名"
                                @keyup.enter.native="search"
                            ></el-input>
                        </el-form-item>
                        <!-- <el-form-item class="cdDate">
                            <el-date-picker
                                v-model="searchform.chooseTime"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions"
                                @change="timeChange"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>-->
                        <el-form-item>
                            <el-button type="primary" plain @click="search">搜索</el-button>
                        </el-form-item>
                    </el-form>
                    <el-row>
                        <el-button
                            type="primary"
                            plain
                            v-for="(item,index) in statusList"
                            @click="statusClick(index,item.id)"
                            :class="active==index ? 'blue' : '' "
                            :key="index"
                        >{{item.name}}</el-button>
                    </el-row>
                </div>

                <div class="bz_list">
                    <div class="bzListTable">
                        <el-table
                            :data="moneyLeafList"
                            border
                            style="width: 100%; text-align:center;    margin-bottom: 20px;"
                            :default-sort="{prop: 'date', order: 'descending'}"
                        >
                            <!-- <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column> -->
                            <el-table-column prop="name" label="姓名"></el-table-column>
                            <el-table-column prop="bzname" label="班组"></el-table-column>
                            <el-table-column prop="bzusername" label="班组负责人"></el-table-column>
                            <el-table-column prop="yingfa" label="累计应发"></el-table-column>
                            <el-table-column prop="shifa" label="累计实发"></el-table-column>
                            <el-table-column prop="liyingfa" label="离场应发"></el-table-column>
                            <el-table-column prop="lishifa" label="离场实发"></el-table-column>
                            <el-table-column fixed="right" label="离场凭证" v-if="lvalue == '2' ">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="handleClick(scope.row)"
                                        type="text"
                                        size="small"
                                    >查看</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" v-else>
                                <template slot-scope="scope">
                                    <el-button
                                        @click="handleWatch(scope.row)"
                                        type="text"
                                        size="small"
                                    >离场</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="text-align:center;background-color: #fff;">
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
            title="离场"
            :visible.sync="upFormVisible"
            :close-on-click-modal="false"
            :show-close="false"
            :append-to-body="true"
            class="lcManyUpload"
        >
            <div class="lcUpload">
                <div class="leftForm">
                    <el-form
                        ref="lcEditForm"
                        :rules="lcFormrules"
                        :label-position="labelPosition"
                        :model="lcform"
                        label-width="100px"
                    >
                        <el-form-item label="姓名：">
                            <p>{{lcName}}</p>
                        </el-form-item>
                        <el-form-item label="离场实发：" prop="lichangshifa">
                            <el-input v-model="lcform.lichangshifa"></el-input>
                        </el-form-item>
                        <el-form-item class="newtijiao" label="离场凭证：" prop="lichangurl">
                            <fupload
                                @listenToChildEvent="showe"
                                :upImgList="upImgList"
                                :licenceImg="licenceImg"
                                :isShow="isShow"
                            ></fupload>
                        </el-form-item>
                        <el-form-item class="lcBtn">
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="save('lcEditForm')"
                            >离场</el-button>
                            <el-button type="primary" @click="cancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            title="离场凭证"
            :visible.sync="lcVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="lcManyUpload ManyPic"
        >
            <img
                style="width:100%;margin-bottom:10px;"
                v-for="(item,index) in picList"
                :src="item"
                :key="index"
                alt
            />
            <div v-if="picList.length == 0" style="text-align:center;">暂无数据</div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
import fupload from '../public/upload.vue';
export default {
    name: 'money_leaf',
    components: { fupload },
    props: {
        xmid: {
            type: String,
        },
        isTable: {
            type: Array,
        },
        aname: {
            type: String,
        },
        newAtest: {
            type: Array,
        },
    },
    data() {
        return {
            isTest: ['1'],
            viwePage: false,
            warnPage: true,
            cid: this.$store.state.userData.cid,
            uname: this.$store.state.userData.uname,
            upFormVisible: false,
            lcVisible: false,
            loaded: false,
            bzNum: '5',
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            bzData: {},
            aname: '',
            upImgList: [],
            licenceImg: [],
            isShow: ['1'],
            eurl: [],
            xmid: '',
            bzViewList: [],
            creatProjectrules: {
                bz: [
                    {
                        required: true,
                        message: '选择不能为空',
                        trigger: ['blur', 'change'],
                    },
                ],
            },
            lcFormrules: {
                lichangshifa: [
                    {
                        required: true,
                        message: '离场实发不能为空',
                        trigger: 'blur',
                    },
                ],
                lichangurl: [
                    {
                        required: true,
                        message: '文件不能为空',
                    },
                ],
            },
            labelPosition: 'right',
            form: { bz: '' },
            watchPath: '',
            xmData: { jinli: '', yueli: '' },
            statusList: [
                { id: '1', name: '未结算' },
                { id: '2', name: '已结算' },
            ],
            active: 0,
            lvalue: 1,
            searchform: {
                name: '',
                chooseTime: [],
            },
            bzDownList: [],
            bzDownId: '',
            moneyLeafList: [],
            lcName: '',
            picList: [],
            lcform: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: this.$store.state.userData.salaryXmid,
                userid: '',
                lichangurl: [],
                lichangshifa: '',
            },
        };
    },
    methods: {
        statusClick(index, value) {
            this.active = index;
            this.lvalue = value;
            this.getTable(1);
        },
        showe(data) {
            this.lcform.lichangurl = data;
        },
        handleClick(row) {
            this.picList = row.lichangurl;

            this.lcVisible = true;
        },

        handleWatch(row) {
            this.lcform.userid = row.userid;
            this.lcName = row.name;
            this.upFormVisible = true;
        },
        timeChang() {
            this.getTable(1);
        },
        cancel() {
            this.$refs.lcEditForm.resetFields();
            this.licenceImg = [];
            this.upImgList = [];
            this.isShow = [];
            this.upFormVisible = false;
        },
        save(formName) {
            const that = this;
            that.loaded = true;
            if (that.lcform.lichangurl) {
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios
                            .post('/laowu_yun/xinnnzilichangadd', that.lcform)
                            .then((res) => {
                                if (res.data.status == 1) {
                                    that.loaded = false;
                                    that.licenceImg = [];
                                    that.upImgList = [];
                                    that.lcform.lichangurl = [];
                                    that.isShow = [];
                                    that.$refs.lcEditForm.resetFields();
                                    that.upFormVisible = false;
                                    that.getTable(1);
                                    that.$message({
                                        message: '离场成功',
                                        center: true,
                                        duration: 4000,
                                        type: 'success',
                                    });
                                } else {
                                    that.loaded = false;
                                    that.$message({
                                        message: res.data.msg,
                                        center: true,
                                        duration: 4000,
                                        type: 'warning',
                                    });
                                }
                            })
                            .catch(function (error) {
                                // that.loaded = false;
                                console.log(error);
                            });
                    } else {
                        that.loaded = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            } else {
                that.loaded = false;
                that.$alert('请先上传离场凭证!');
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTable(val);
        },
        getBZList() {
            axios
                .post('/laowu_yun/huquteamcontentlistiphone', {
                    xmid: this.xmid,
                    newuid: this.$store.state.userData.uid,
                    corp_id: this.cid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.bzDownList = res.data.content;
                    } else {
                        this.$alert('错误');
                    }
                });
        },
        getTable(val) {
            axios
                .post('/laowu_yun/xinzilichanglist', {
                    xmid: this.xmid,
                    newuid: this.$store.state.userData.uid,
                    bzid: this.bzDownId,
                    current_page: val,
                    name: this.searchform.name,
                    startime: this.searchform.chooseTime[0],
                    stoptime: this.searchform.chooseTime[1],
                    type: this.lvalue,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.moneyLeafList = res.data.content.list;
                        this.xmData = res.data.licahng;
                    } else {
                        this.$alert('错误');
                    }
                });
        },
        bzDataChange(val) {
            this.bzDownId = val;
            this.getTable(1);
        },
        search() {
            this.getTable(1);
        },
    },
    mounted() {
        // if (this.$store.state.userData.salaryXmid) {
        //     this.xmid = this.$store.state.userData.salaryXmid;
        //     this.getBZList();
        //     this.getTable(1);
        // }
    },
    created() {},
    computed: {
        pickerOptions() {
            return {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6;
                },
            };
        },
    },
    activated() {
        if (this.$store.state.userData.salaryXmid) {
            this.xmid = this.$store.state.userData.salaryXmid;
            this.getBZList();
            this.getTable(1);
        }
    },
    watch: {
        isTable: {
            handler(newValue, oldValue) {
                if (newValue.length > 0) {
                    this.warnPage = false;
                    this.viwePage = true;
                    this.getBZList();
                    this.getTable(1);
                    this.$emit('getChild2', this.isTable);
                }
            },
            deep: true,
        },
        aname(val) {
            this.aname = val;
        },
        // xmid(val) {
        //     this.bzDownId = '';
        //     this.bzDownList = [];
        //     this.xmid = val;
        //     this.getBZList();
        //     this.getTable(1);
        // }
    },
};
</script>
<style lang="less">
body {
    .lcManyUpload {
        .el-dialog {
            width: 500px;
            .lcUpload {
                .leftForm {
                    .el-select {
                        width: 100%;
                    }
                    .newtijiao {
                        .newcom {
                            text-align: center;
                            border: 1px dashed #d9d9d9;
                            background-color: #f5f5f5;
                            border-radius: 5px;
                            padding: 20px 0;
                        }
                        .el-form-item__content {
                            margin-left: 80px;
                        }
                    }
                    .lcBtn {
                        margin-top: 20px;
                        text-align: center;
                        .el-form-item__content {
                            margin-left: 0;
                        }
                    }
                }
                .rightPic {
                    img {
                        width: 320px;
                    }
                }
            }
        }
    }
}
#money_leaf {
    height: 100%;
    padding: 10px;
    overflow-y: auto;
    .main {
        height: 100%;
        .topMain {
            display: flex;
            justify-content: space-between;
            line-height: 40px;
        }
        .bottomMain {
            text-align: center;
            .timeDiv {
                display: flex;
                justify-content: space-between;
                width: 354px;
                margin: 0 auto;
                line-height: 40px;
            }
        }
        .footerContent {
            width: 72%;
            height: 100%;
            min-width: 740px;
            margin: 0 auto;
            margin-top: 40px;
            .money_list {
                display: flex;
                justify-content: flex-start;
                background-color: rgb(64, 158, 255);
                color: #fff;
                padding: 20px 0;
                border-radius: 10px;
                margin-bottom: 20px;
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
            .cdivHeader {
                display: flex;
                justify-content: space-between;
                .cdBanzu,
                .cdName {
                    .el-form-item__content {
                        width: 100px;
                    }
                }

                .cdBanzu .el-form-item__content:nth-child(1) {
                    width: 118px;
                }
                .cdDate {
                    .el-input__inner {
                        width: 260px;
                    }
                }
                .blue {
                    background-color: #409eff;
                    color: #fff;
                }
            }
            .bz_list {
                // height: 45%;
                // overflow: hidden;
                .bzListTable {
                    padding-bottom: 40px;
                }
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
    }

    .seconditem {
        .el-form-item__content {
            margin-left: 80px;
            border: 1px solid #d9d9d9;
            padding-left: 10px;
            border-radius: 6px;
        }
    }
    // .el-dialog {
    //     width: 1100px;
    //     min-width: 1100px;
    // }
}
</style>
