<template>
    <div id="money">
        <div
            style="
                width: 100%;
                height: 100%;
                position: relative;
                background-color: #fff;
            "
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
        <div class="main" v-show="viwePage">
            <div class="topMain">
                <p>工资条</p>
                <el-button type="primary" plain @click="uoloadExcel"
                    >上传薪资表</el-button
                >
            </div>
            <el-divider></el-divider>
            <div class="bottomMain">
                <div class="timeDiv">
                    <el-date-picker
                        v-model="moneyTime"
                        type="month"
                        :picker-options="pickerStart"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM"
                        placeholder="选择日期"
                        @change="timeChange"
                    ></el-date-picker>
                </div>
            </div>
            <div class="footerContent">
                <div class="bz_list">
                    <!-- <div class="bz_list_top">
                        <span class="pro">项目名称：{{ aname }}</span>
                        <i class="el-icon-info"></i>
                        <span style="color: #ff943e"
                            >未上传薪资班组{{ anum }}个</span
                        >
                    </div> -->
                    <el-table :data="bzData.list" border size="mini">
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
                      <el-table-column>
                        <template slot-scope="scope">
                          <el-button
                            class="cr"
                            size="mini"
                            type="primary"
                            @click="moneyNext(scope.row)"
                          >计算薪资</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <!-- <ul class="bz_list_ul">
                        <li
                            v-for="(item, index) in bzData.list"
                            :key="item.bzid"
                        >
                            <div class="bzlContent">
                                <div class="cl">
                                    <div class="clTop">
                                        <h4>{{ item.teamname }}</h4>
                                        <!-- <div>{{item.status === 1 ? '未上传' : '已上传'}}</div>
                                        <div v-if="item.status === '2'">
                                            未上传
                                        </div>
                                        <div class="yi" v-else>已上传</div>
                                    </div>
                                    <div
                                        v-if="item.shangchuanname"
                                        class="clcontent"
                                    >
                                        <span
                                            >上传人：{{
                                                item.shangchuanname
                                            }}</span
                                        >
                                        <span>{{
                                            formatDate(item.created)
                                        }}</span>
                                    </div>
                                </div>
                                <div class="cm">
                                    <div>
                                        <p>已发送</p>
                                        <div>
                                            {{ item.shu.fasong }}/{{
                                                item.shu.zong
                                            }}
                                        </div>
                                    </div>
                                    <div>
                                        <p>已查看</p>
                                        <div>{{ item.shu.chakan }}</div>
                                    </div>
                                    <div>
                                        <p>已确认</p>
                                        <div>{{ item.shu.queren }}</div>
                                    </div>
                                </div>
                                <el-button
                                    v-if="item.shu.zong === '0'"
                                    class="cr"
                                    type="info"
                                    >前往发送</el-button
                                >
                                <el-button
                                    v-else
                                    class="cr"
                                    type="primary"
                                    @click="moneyNext(item)"
                                    >前往发送</el-button
                                >
                            </div>
                        </li>
                        <li
                            v-if="bzData.list.length < 1"
                            style="
                                text-align: center;
                                line-height: 40px;
                                color: red;
                            "
                        >
                            <div>
                                <img
                                    src="../../../static/images/write.png"
                                    alt
                                />
                            </div>
                            <div>
                                <p>
                                    {{
                                        this.topMoneyTime.replace('-', '年')
                                    }}月没有创建的工资条
                                </p>
                                <p style="color: #8c8c8c">
                                    点击上传薪资表创建工资条
                                </p>
                                <p style="color: #8c8c8c">
                                    切换月份查看已创建的工资条
                                </p>
                            </div>
                        </li>
                    </ul> -->
                    <div style="text-align: center; background-color: #fff">
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
        <el-dialog
            title="上传工资表"
            :visible.sync="moneyFormVisible"
            :close-on-click-modal="false"
            :show-close="false"
            :append-to-body="true"
            class="monyexcelUpload"
        >
            <div class="newExcel">
                <div class="leftForm">
                    <el-form
                        ref="form"
                        :rules="creatProjectrules"
                        :label-position="labelPosition"
                        :model="moneyForm"
                        label-width="100px"
                    >
                        <el-form-item
                            label="项目名称："
                            style="margin-bottom: 0"
                        >
                            <p>{{ aname }}</p>
                        </el-form-item>
                        <el-form-item class="seconditem" label="匹配方式：">
                            <p>按照Userid匹配</p>
                        </el-form-item>
                        <el-form-item prop="bz" label="班组：">
                            <el-select
                                v-model="moneyForm.bz"
                                placeholder="请选择班组"
                            >
                                <el-option
                                    v-for="item in bzViewList"
                                    :key="item.bzid"
                                    :label="item.name"
                                    :value="item.bzid"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="月份：">
                            <el-date-picker
                                v-model="moneyForm.yuefen"
                                type="month"
                                :picker-options="pickerStart"
                                format="yyyy 年 MM 月"
                                value-format="yyyy-MM"
                                placeholder="选择日期"
                                @change="monthTimeChange"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="是否上报：">
                            <el-radio-group v-model="moneyForm.radio">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item class="newtijiao" label="上传文件：">
                            <div class="newcom">
                                <img
                                    width="50"
                                    src="../../../static/images/exceladd.png"
                                    alt
                                />
                                <p>请上传文件</p>
                                <eupload
                                    v-on:listenToChild="showe"
                                    :upImgList2="upImgList2"
                                    :licenceImg2="licenceImg2"
                                    :isShow2="isShow2"
                                ></eupload>
                            </div>
                        </el-form-item>
                        <div class="warn">
                            <div>
                                <p>注意：</p>
                                <p>
                                    如有员工不在钉钉通讯中，请先将员工加入组织架构
                                </p>
                                <p>
                                    薪资报表以下载的模板为准，否则将无法读取报表数据，重复上传数据将被覆盖
                                </p>
                                <span
                                    @click="derive"
                                    style="color: #3a99f2; cursor: pointer"
                                    >下载模板</span
                                >
                            </div>
                        </div>
                        <el-form-item
                            style="margin-top: 20px; text-align: center"
                        >
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="save"
                                >确定</el-button
                            >
                            <el-button type="primary" @click="cancel"
                                >取消</el-button
                            >
                        </el-form-item>
                    </el-form>
                </div>
                <div class="rightPic">
                    <img src="../../../static/images/indexL.png" alt />
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
import eupload from '../public/excelUpload.vue';
export default {
    name: 'money',
    components: { eupload },
    props: {
        xmid: {
            type: String
        },
        isTable: {
            type: Array
        },
        aname: {
            type: String
        },
        newAtest: {
            type: Array
        }
    },
    data() {
        return {
            isTest: ['1'],
            viwePage: false,
            warnPage: true,
            cid: this.$store.state.userData.cid,
            uname: this.$store.state.userData.uname,
            isFail: false,
            failMsg: '',
            moneyTime: '',
            topMoneyTime: '',
            moneyFormVisible: false,
            loaded: false,
            bzNum: '5',
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            bzData: { list: [] },
            aname: '',
            anum: '',
            upImgList2: '',
            licenceImg2: '',
            isShow2: ['1'],
            eurl: '',
            xmid: '',
            bzViewList: [],
            creatProjectrules: {
                bz: [
                    {
                        required: true,
                        message: '选择不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            labelPosition: 'right',
            moneyForm: { bz: '', yuefen: '', radio: 0 },
            watchPath: '',
            xmData: {}
        };
    },
    methods: {
        formatDate(now) {
            if (now) {
                let time = new Date(now * 1000);
                var year = time.getFullYear();
                var month = time.getMonth() + 1;
                var date = time.getDate();
                return year + '年' + month + '月' + date + '日';
            } else {
                return '';
            }
        },
        timeChange(val) {
            this.topMoneyTime = val;
            this.getTable(this.currentPage);
            // this.moneyTime.getFullYear() +
            // '-' +
            // (this.moneyTime.getMonth() + 1);
        },
        monthTimeChange(val) {
            this.moneyForm.yuefen = val;
        },
        uoloadExcel() {
            this.moneyForm.yuefen = this.moneyTime;
            this.getBList();
            this.moneyFormVisible = true;
        },
        showe(data) {
            this.eurl = data;
        },
        derive() {
            let derivetime = new Date();
            let deriveyear = derivetime.getFullYear();
            let derivemonth =
                derivetime.getMonth() + 1 < 10
                    ? '0' + (derivetime.getMonth() + 1)
                    : derivetime.getMonth() + 1;
            let derivedate = deriveyear + '-' + derivemonth;
            let host = window.location.host; //主机
            if (this.moneyForm.yuefen == derivedate) {
                this.$message({
                    message: '不能下载当月模板',
                    center: true,
                    duration: 2000,
                    type: 'warning'
                });
            } else {
                if (this.moneyForm.bz) {
                    axios
                        .get('/laowu_yun/gongzimobandown', {
                            params: {
                                id: this.moneyForm.bz,
                                newuid: this.$store.state.userData.uid,
                                yuefen: this.moneyForm.yuefen
                            }
                        })
                        .then((res) => {
                            window.location.href =
                                'https://' +
                                host +
                                '/laowu_yun/gongzimobandown?id=' +
                                this.moneyForm.bz +
                                '&yuefen=' +
                                this.moneyForm.yuefen;
                        });
                } else {
                    this.$message({
                        message: '请先选择班组',
                        center: true,
                        duration: 4000,
                        type: 'warning'
                    });
                }
            }
        },
        cancel() {
            this.licenceImg2 = '';
            this.upImgList2 = '';
            this.moneyForm.bz = '';
            this.eurl = '';
            this.isShow2 = [];
            this.moneyFormVisible = false;
        },
        save() {
            this.loaded = true;
            if (this.moneyForm.bz) {
                if (this.eurl) {
                    axios
                        .post('/laowu_yun/gongzimoshanchuan', {
                            url: this.eurl,
                            corp_id: this.cid,
                            newuid: this.$store.state.userData.uid,
                            name: this.uname,
                            bzid: this.moneyForm.bz,
                            bao: this.moneyForm.radio
                        })
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.loaded = false;
                                this.licenceImg2 = '';
                                this.moneyForm.bz = '';
                                this.upImgList2 = '';
                                this.isShow2 = [];
                                this.eurl = '';
                                this.moneyFormVisible = false;
                                this.getTable(this.currentPage);
                                this.$message({
                                    message: '上传成功',
                                    center: true,
                                    duration: 4000,
                                    type: 'success'
                                });
                            } else {
                                this.loaded = false;
                                this.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 4000,
                                    type: 'warning'
                                });
                            }
                        })
                        .catch(function (error) {
                            // this.loaded = false;
                            console.log(error);
                        });
                } else {
                    this.loaded = false;
                    this.$message({
                        message: '请选择文件',
                        center: true,
                        duration: 4000,
                        type: 'warning'
                    });
                }
            } else {
                this.loaded = false;
                this.$message({
                    message: '请选择班组',
                    center: true,
                    duration: 4000,
                    type: 'warning'
                });
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTable(val);
        },

        getTable(val) {
            axios
                .post('/laowu_yun/huquteamcontentlist', {
                    xmid: this.xmid,
                    corp_id: this.cid,
                    current_page: val,
                    newuid: this.$store.state.userData.uid,
                    // yuefen: this.topMoneyTime
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.bzData = res.data.content;
                        this.anum = res.data.shuliang;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 4000,
                            type: 'warning'
                        });
                    }
                });
        },
        getBList() {
            axios
                .post('/laowu_yun/huquteamcontentlistiphone', {
                    xmid: this.xmid,
                    newuid: this.$store.state.userData.uid,
                    corp_id: this.cid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.bzViewList = res.data.content;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 4000,
                            type: 'warning'
                        });
                    }
                });
        },
        moneyNext(item) {
            this.$store.commit('setSalaryBzid', item.bzid);
            this.$store.commit('setSalaryMonth', this.topMoneyTime);
            this.$store.commit('setSalaryBzName', item.teamname);
            this.$router.push({
                path: '/money_tip_send'
            });
        }
    },
    mounted() {},
    created() {
        const moneyCheckTime = new Date();
        this.moneyTime =
            moneyCheckTime.getFullYear() +
            '-' +
            (moneyCheckTime.getMonth() + 1 < 10
                ? '0' + (moneyCheckTime.getMonth() + 1)
                : moneyCheckTime.getMonth() + 1);
        this.topMoneyTime = this.moneyTime;
    },
    activated() {
        if (this.$store.state.userData.salaryXmid) {
            this.xmid = this.$store.state.userData.salaryXmid;
            this.getTable(1);
            this.getBList();
        }
    },
    computed: {
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.moneyTime;
                    if (endDateVal) {
                        return time.getTime() > Date.now(); // 大于当前时间禁止选择
                    }
                }
            };
        }
    },
    watch: {
        isTable: {
            handler(newValue, oldValue) {
                if (newValue.length > 0) {
                    this.warnPage = false;
                    this.viwePage = true;
                    this.getTable(1);
                    this.$emit('getChild2', this.isTable);
                }
            },
            deep: true
        },
        aname(val) {
            this.aname = val;
        }
    }
};
</script>
<style lang="less">
body {
    .monyexcelUpload {
        .el-dialog {
            width: 1100px;
            min-width: 1100px;
        }
        .newExcel {
            width: 80%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .el-date-editor.el-input {
                width: 100%;
            }
            .leftForm {
                width: 50%;
                min-width: 400px;
                border: 1px solid #d9d9d9;
                padding: 30px;
                border-radius: 10px;
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
            }
            .rightPic {
                img {
                    width: 320px;
                }
            }
        }
    }
}
#money {
    height: 100%;
    padding: 10px;
    overflow-y: auto;
    .main {
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
                padding-bottom: 20px;
                .bz_list_top {
                    height: 40px;
                    line-height: 40px;
                    margin: 15px 0;
                    .pro {
                        font-size: 18px;
                    }
                    i {
                        color: #ff943e;
                        margin-left: 20px;
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
                                margin-bottom: 9px;
                                line-height: 30px;
                                h4 {
                                    font-size: 20px;
                                }
                                div {
                                    color: rgb(255, 148, 62);
                                    background: rgb(255, 251, 230);
                                    border-radius: 5px;
                                    padding: 3px 10px;
                                    height: 20px;
                                    line-height: 24px;
                                    margin-left: 10px;
                                }
                            }
                            .clcontent {
                                span {
                                    color: rgba(0, 0, 0, 0.65);
                                }
                            }
                            .cm {
                                display: flex;
                                line-height: 26px;
                                > div {
                                    width: 84px;
                                    text-align: center;
                                    p {
                                        margin-bottom: 6px;
                                        color: #8c8c8c;
                                    }
                                    div {
                                        font-size: 24px;
                                    }
                                }
                            }
                            .el-button {
                                height: 30px;
                                line-height: 30px;
                                padding: 0 20px;
                                margin-top: 16px;
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
}
</style>

<style lang="less" scoped>
.bz_list {
  margin-top: 20px;
}
</style>
