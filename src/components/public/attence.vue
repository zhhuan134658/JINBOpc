<template>
    <div id="attence">
        <div class="cnav">
            <sideMenu @childFn="parentFn" @childFn4="parentFn4"></sideMenu>
        </div>
        <div
            style="width: 100%; position: relative; background-color: #fff"
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
                <div style="font-size: 16px">请选择班组</div>
            </div>
        </div>
        <div class="ctable" v-show="viwePage">
            <div class="right-topheader">
                <div style="line-height: 40px; height: 40px">
                    <span
                        style="
                            font-size: 14px;
                            color: #606266;
                            line-height: 40px;
                        "
                        >考勤数据</span
                    >
                    <!-- <span style="color:#ff6816;font-size:12px;">
                        <i class="el-icon-info"></i>如没有考勤数据可能是没有跟钉钉考勤进行关联 关联步骤：钉钉管理后台--考勤打卡--月度汇总--立即开通
                    </span>-->
                </div>
                <div style="display: flex">
                    <el-button @click="Xmderive" type="primary" v-if="needXmId"
                        >导出项目报表</el-button
                    >
                    <el-button @click="derive" type="primary"
                        >导出班组报表</el-button
                    >
                </div>
            </div>
            <el-divider></el-divider>
            <div class="cdiv1">
                <div style="display: flex; justify-content: space-between">
                    <div style="display: flex">
                        <el-date-picker
                            v-model="chooseTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions"
                            @change="timeChange"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                        ></el-date-picker>
                        <el-form
                            :inline="true"
                            :model="searchform"
                            class="demo-form-inline"
                            @submit.native.prevent
                        >
                            <el-form-item label="姓名：">
                                <el-input
                                    v-model="searchform.name"
                                    placeholder="请输入姓名"
                                    @keyup.enter.native="search"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" plain @click="search"
                                    >搜索</el-button
                                >
                            </el-form-item>
                        </el-form>
                    </div>
                    <div style="display: flex; height: 40px; line-height: 40px">
                        <el-button
                            v-if="ismdshow"
                            type="primary"
                            plain
                            v-for="(item, index) in statusList"
                            @click="statusClick(index, item.id)"
                            :class="active == index ? 'blue' : ''"
                            :key="index"
                            >{{ item.name }}</el-button
                        >
                    </div>
                    <!-- <div style="display:flex;">
                        <el-date-picker
                            v-model="chooseTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions"
                            @change="timeChange"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                        ></el-date-picker>
                        <el-form
                            :inline="true"
                            :model="searchform"
                            class="demo-form-inline"
                            @submit.native.prevent
                        >
                            <el-form-item label="姓名：">
                                <el-input
                                    v-model="searchform.name"
                                    placeholder="请输入姓名"
                                    @keyup.enter.native="search"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" plain @click="search">搜索</el-button>
                            </el-form-item>
                        </el-form>
                    </div>-->
                </div>

                <el-table
                    v-show="flag"
                    :data="tableData"
                    class="oldgaitable"
                    v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                    border
                >
                    <el-table-column
                        prop="name"
                        fixed
                        label="姓名"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        prop="chuqin"
                        label="出勤天数"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        prop="xiuxi"
                        label="休息天数"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        prop="gongzuo"
                        label="工作时长（min）"
                        width="100"
                    ></el-table-column>
                    <el-table-column label="考勤结果">
                        <el-table-column
                            v-for="(item, index) in tableHerderList"
                            :key="index"
                            :label="item"
                            align="center"
                            show-overflow-tooltip="true"
                        >
                            <template
                                slot-scope="scope"
                                v-if="scope.row.jieguo"
                            >
                                <span>{{
                                    scope.row.jieguo[index].value ||
                                    scope.row.jieguo[index].cqzk
                                }}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>

                <el-table
                    v-show="!flag"
                    :data="newTableData"
                    class="newgaitable"
                    v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                    border
                    @cell-click="openKao"
                >
                    <el-table-column
                        fixed
                        prop="name"
                        label="姓名"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        prop="chuqin"
                        label="出勤天数"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        prop="xiuxi"
                        label="休息天数"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        prop="gongzuo"
                        label="工作时长（min）"
                        width="100"
                    ></el-table-column>
                    <el-table-column label="考勤结果">
                        <el-table-column
                            v-for="(item, index) in tableHerderList"
                            :key="index"
                            :label="item"
                            align="center"
                        >
                            <el-table-column label="上午" align="center">
                                <template
                                    slot-scope="scope"
                                    v-if="scope.row.jieguo"
                                >
                                    <span>{{
                                        scope.row.jieguo[index].swcq
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="下午" align="center">
                                <template
                                    slot-scope="scope"
                                    v-if="scope.row.jieguo"
                                >
                                    <span>{{
                                        scope.row.jieguo[index].xwcq
                                    }}</span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table-column>
                </el-table>
                <div style="text-align: center">
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

            <el-dialog
                title="开通钉钉考勤"
                :visible.sync="tipWarnVisible"
                :append-to-body="true"
                class="ktClass"
            >
                <div style="text-align: center; color: red">
                    {{ tipWarnTxt }}
                </div>
                <div style="margin: 20px 0">
                    开通步骤：管理后台--考勤打卡--月度汇总--立即开通
                </div>
                <el-image
                    style="width: 100%"
                    src="https://zhihui.zzdingyun.com/app/static/img/ktdd.png"
                    :preview-src-list="tipWarnPic"
                ></el-image>
            </el-dialog>
            <el-dialog
                title="个人考勤信息"
                :visible.sync="dialogTableVisible"
                :append-to-body="true"
                class="attecceKao"
            >
                <div
                    style="
                        margin-bottom: 40px;
                        display: flex;
                        justify-content: space-between;
                    "
                >
                    <div style="display: flex">
                        <div v-if="peoPic" class="ppic">
                            <img :src="peoPic" alt />
                        </div>
                        <div v-else class="ppicName">
                            {{
                                kaoqinName.length <= 2
                                    ? kaoqinName
                                    : kaoqinName.substr(
                                          kaoqinName.length - 2,
                                          2
                                      )
                            }}
                        </div>
                        <div style="line-height: 60px">{{ kaoqinName }}</div>
                    </div>
                    <div style="display: flex">
                        <el-date-picker
                            v-model="searchTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions"
                            @change="searchChange"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                        ></el-date-picker>
                        <el-button type="primary" plain @click="downLoad"
                            >导出</el-button
                        >
                    </div>
                </div>

                <el-table :data="gridData">
                    <el-table-column
                        property="name"
                        label="姓名"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        property="date"
                        label="日期"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        property="value"
                        :formatter="forVal"
                        label="上午"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        property="value1"
                        :formatter="forValue"
                        label="下午"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        property="duration"
                        label="工作时长"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        property="mintime"
                        label="首次打卡时间"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        property="maxtime"
                        label="末次打卡时间"
                        align="center"
                    ></el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import sideMenu from '../public/sideMenu.vue';
export default {
    name: 'attence',
    components: { sideMenu },
    data() {
        return {
            ismdshow: '',
            warnPage: true,
            peoPic: '',
            dialogTableVisible: false,
            kaoqinName: '',
            kaoqinBz: '',
            viwePage: false,
            tipWarnVisible: false,
            chooseTime: [],
            searchTime: [],
            tableData: [],
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            leadVisible: false,
            searchform: {
                name: ''
            },
            bzid: '',
            tableHerderList: [],
            newTableData: [],
            startTime: '',
            endTime: '',
            tableLoading: false,
            tipWarnTxt: '',
            fullscreenLoading: false,
            tipWarnPic: [
                'https://zhihui.zzdingyun.com/app/static/img/ktdd.png'
            ],
            active: 0,

            statusList: [
                { id: '1', name: '钉钉考勤' },
                { id: '2', name: '魔点考勤' }
            ],
            changeAttenceId: '1',
            peuid: '',
            gridData: [],
            flag: true,
            total: '',
            pagesize: 10,
            currentPage: 1,
            needXmId: ''
        };
    },
    methods: {
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTable();
        },
        //导出考勤
        downLoad() {
            const that = this;
            let host = window.location.host; //主机
            if (that.gridData.length > 0) {
                dd.biz.util.openLink({
                    url:
                        'https://' +
                        host +
                        '/ding/exportReport?bzid=' +
                        that.bzid +
                        '&userid=' +
                        that.peuid +
                        '&corp_id=' +
                        that.$store.state.userData.cid +
                        '&start=' +
                        that.searchTime[0] +
                        '&stop=' +
                        that.searchTime[1], //要打开链接的地址
                    onSuccess: function (result) {},
                    onFail: function (err) {}
                });
            } else {
                this.$alert('暂无数据，请选择有数据的进行导出', '温馨提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
            }
        },
        forTableVal(row) {
            switch (row) {
                case 1:
                    return '✔';
                    break;
                case 0:
                    return '✘';
                    break;
            }
        },
        forVal(row, column) {
            switch (row.value) {
                case '1':
                    return '✔';
                    break;
                case '0':
                    return '✘';
                    break;
            }
        },
        forValue(row, column) {
            switch (row.value1) {
                case '1':
                    return '✔';
                    break;
                case '0':
                    return '✘';
                    break;
            }
        },
        statusClick(index, type) {
            this.active = index;
            this.flag = !this.flag;
            this.changeAttenceId = type;
            this.getTable();
        },
        getMList() {
            const that = this;
            that.tableLoading = true;
            axios
                .post('/ding/test1', {
                    bzid: that.bzid,
                    corp_id: that.$store.state.userData.cid,
                    name: that.searchform.name,
                    start: that.chooseTime[0],
                    stop: that.chooseTime[1],
                    current_page: that.currentPage
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        that.tableLoading = false;
                        if (res.data.content) {
                            that.tableHerderList = res.data.riqi;
                            that.total = res.data.content.total;
                            that.newTableData = res.data.content.list;
                            that.newTableData.forEach((item) => {
                                item.jieguo.forEach((list) => {
                                    list.swcq = that.forTableVal(list.swcq);
                                    list.xwcq = that.forTableVal(list.xwcq);
                                });
                            });
                            that.needXmId = res.data.xmid;
                        } else {
                            that.newTableData = [];
                            that.total = 0;
                        }
                    } else {
                        that.tableLoading = false;
                        that.newTableData = [];
                    }
                })
                .catch(function (error) {
                    that.tableLoading = false;
                    console.log(error);
                });
        },
        parentFn(payload) {
            this.bzid = payload;
        },
        Xmderive() {
            let host = window.location.host; //主机
            const that = this;
            if (that.changeAttenceId == '1') {
                dd.ready(function () {
                    dd.biz.util.openLink({
                        url:
                            'https://' +
                            host +
                            '/laowu_yun/renyuankaoqindown?xmid=' +
                            that.needXmId +
                            '&corp_id=' +
                            that.$store.state.userData.cid +
                            '&start=' +
                            that.chooseTime[0] +
                            '&stop=' +
                            that.chooseTime[1], //要打开链接的地址
                        onSuccess: function (result) {
                            // loading.close();
                        },
                        onFail: function (err) {
                            // loading.close();
                            that.$message.error('导出失败');
                        }
                    });
                });
            } else if (that.changeAttenceId == '2') {
                dd.ready(function () {
                    dd.biz.util.openLink({
                        url:
                            'https://' +
                            host +
                            '/laowu_yun/renyuankaoqindown?xmid=' +
                            that.needXmId +
                            '&corp_id=' +
                            that.$store.state.userData.cid +
                            '&status=' +
                            1 +
                            '&start=' +
                            that.chooseTime[0] +
                            '&stop=' +
                            that.chooseTime[1], //要打开链接的地址
                        onSuccess: function (result) {
                            // loading.close();
                        },
                        onFail: function (err) {
                            // loading.close();
                            that.$message.error('导出失败');
                        }
                    });
                });
            }
        },
        derive() {
            // this.leadVisible = true;
            let host = window.location.host; //主机
            const that = this;
            if (that.changeAttenceId == '1') {
                dd.ready(function () {
                    dd.biz.util.openLink({
                        url:
                            'https://' +
                            host +
                            '/laowu_yun/renyuankaoqindown?bzid=' +
                            that.bzid +
                            '&corp_id=' +
                            that.$store.state.userData.cid +
                            '&start=' +
                            that.chooseTime[0] +
                            '&stop=' +
                            that.chooseTime[1], //要打开链接的地址
                        onSuccess: function (result) {
                            // loading.close();
                        },
                        onFail: function (err) {
                            // loading.close();
                            that.$message.error('导出失败');
                        }
                    });
                });
            } else if (that.changeAttenceId == '2') {
                dd.ready(function () {
                    dd.biz.util.openLink({
                        url:
                            'https://' +
                            host +
                            '/laowu_yun/renyuankaoqindown?bzid=' +
                            that.bzid +
                            '&corp_id=' +
                            that.$store.state.userData.cid +
                            '&status=' +
                            1 +
                            '&start=' +
                            that.chooseTime[0] +
                            '&stop=' +
                            that.chooseTime[1], //要打开链接的地址
                        onSuccess: function (result) {
                            // loading.close();
                        },
                        onFail: function (err) {
                            // loading.close();
                            that.$message.error('导出失败');
                        }
                    });
                });
            }
        },
        searchChange() {
            let start = Date.parse(
                this.searchTime[0].toString().replace(/-/g, '/')
            );
            let end = Date.parse(
                this.searchTime[1].toString().replace(/-/g, '/')
            );

            let diff = end - start;
            let t = 31 * 24 * 60 * 60 * 1000;
            if (diff > t) {
                this.$alert('日期范围最大为31天，请重新选择日期', '温馨提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
                return false;
            } else {
                this.getPKao();
            }
        },
        timeChange() {
            let start = Date.parse(
                this.chooseTime[0].toString().replace(/-/g, '/')
            );
            let end = Date.parse(
                this.chooseTime[1].toString().replace(/-/g, '/')
            );

            let diff = end - start;
            let t = 31 * 24 * 60 * 60 * 1000;
            if (diff > t) {
                this.$alert('日期范围最大为31天，请重新选择日期', '温馨提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
                return false;
            } else {
                this.getTable();
            }
        },
        search() {
            this.getTable();
        },
        getTable() {
            const that = this;
            that.tableLoading = true;
            if (that.changeAttenceId == '1') {
                axios
                    .post('/ding/test', {
                        bzid: that.bzid,
                        newuid: that.$store.state.userData.uid,
                        corp_id: that.$store.state.userData.cid,
                        name: that.searchform.name,
                        start: that.chooseTime[0],
                        stop: that.chooseTime[1],
                        current_page: that.currentPage
                    })
                    .then((res) => {
                        if (res.data.status == 1) {
                            that.tableLoading = false;
                            if (res.data.content) {
                                that.tableHerderList = res.data.riqi;
                                that.tableData = res.data.content.list;
                                that.total = res.data.content.total;
                            } else {
                                that.tableData = [];
                                that.total = 0;
                            }
                            that.needXmId = res.data.xmid;
                        } else {
                            that.tableLoading = false;
                            that.tableData = [];
                            that.tipWarnTxt = res.data.msg;
                            that.tipWarnVisible = true;
                        }
                    })
                    .catch(function (error) {
                        that.tableLoading = false;
                        console.log(error);
                    });
            } else if (this.changeAttenceId == '2') {
                that.getMList();
            }
        },
        //个人考勤信息
        getPKao() {
            const that = this;
            axios
                .post('/ding/attDetails', {
                    bzid: that.bzid,
                    userid: that.peuid,
                    corp_id: that.$store.state.userData.cid,
                    start: that.searchTime[0],
                    stop: that.searchTime[1]
                })
                .then((res) => {
                    that.gridData = res.data.content;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //查看个人考勤
        openKao(row, column, cell, event) {
            const _this = this;
            if (_this.changeAttenceId == '2') {
                _this.kaoqinName = row.name;
                _this.kaoqinBz = row.bzname;
                _this.peuid = row.userid;
                _this.peoPic = row.img;
                switch (column.label) {
                    case '姓名':
                        _this.getPKao();
                        _this.dialogTableVisible = true;
                        break;
                }
            }
        },
        //判断是否显示魔点考勤
        getmd() {
            const that = this;
            axios
                .post('/laowu_yun/huoqumodiankaoqinshuju', {
                    corp_id: that.$store.state.userData.cid
                })
                .then((res) => {
                    if (res.data.content == 1) {
                        that.ismdshow = true;
                    } else {
                        that.ismdshow = false;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mounted() {},
    created() {
      this.getmd();
        const that = this;
        // that.timeDefaultShow = new Date();
        // let now = new Date(); //当前日期
        // let nowMonth = now.getMonth(); //当前月
        // let nowYear = now.getFullYear(); //当前年
        // //本月的开始时间
        // let monthStartDate = new Date(nowYear, nowMonth, 1);
        // //本月的结束时间
        // // let monthEndDate = new Date(nowYear, nowMonth + 1, 0);
        // let timeStart = Date.parse(monthStartDate);
        // // let timeEnd = Date.parse(monthEndDate);
        // let stime = new Date(timeStart);
        // // let etime = new Date(timeEnd);
        // this.chooseTime[0] = stime;
        // this.chooseTime[1] = now;
    },
    computed: {
        pickerOptions() {
            return {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            };
        }
    },
    watch: {
        bzid: function (newVal, oldVal) {
            if (newVal) {
                this.warnPage = false;
                this.viwePage = true;
            }
        }
    }
};
</script>
<style lang="less">
body {
    .ktClass {
        .el-dialog {
            width: 500px;
        }
    }
    .attecceKao {
        .el-dialog {
            width: 80%;
            .ppic {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 20px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .el-button {
                line-height: 40px;
                padding: 0 20px;
                height: 40px;
            }
            .el-date-editor {
                margin-right: 20px;
            }
            .ppicName {
                margin-right: 20px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                overflow: hidden;
                background-color: #409eff;
                line-height: 60px;
                color: #fff;
                font-size: 18px;
                text-align: center;
            }
            .el-table__header {
                thead {
                    th {
                        background-color: rgb(245, 247, 249);
                    }
                }
            }
        }
    }
}
#attence {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    overflow-y: auto;
    .ctable {
        width: 100%;
        padding: 10px;
        border: 1px solid #dcdfe6;
        background-color: #fff;
        .cdiv1 {
            padding-bottom: 30px;
            background-color: #fff;
            .blue {
                background-color: #409eff;
                color: #fff;
            }
        }
        .el-table {
            width: 100%;
            max-width: 1419px;
            // .el-table__fixed-body-wrapper {
            //     height: 603px !important;
            // }
            // .el-table__fixed {
            //     height: 699px !important;
            // }
            table {
                thead {
                    tr:nth-child(1) {
                        th:nth-child(5) {
                            .cell {
                                text-align: left;
                            }
                        }
                    }
                }
            }

            .el-table thead.is-group th {
                background-color: #fff;
            }
        }
        .oldgaitable {
            .el-table__fixed-body-wrapper {
                top: 96px !important;
            }
        }
        .newgaitable {
            .el-table__fixed-body-wrapper {
                top: 144px !important;
            }
            .el-table__body {
                .el-table__row {
                    > td:nth-child(1) {
                        cursor: pointer;
                        .cell {
                            color: #409eef;
                        }
                    }
                }
            }
        }
        @media screen and (max-width: 1500px) {
            .el-table {
                max-width: 900px;
                // height: 80% !important;
            }
        }
        @media screen and (min-width: 1501px) and (max-width: 1600px) {
            .el-table {
                max-width: 1070px;
                // height: 80% !important;
            }
        }
        @media screen and (min-width: 1601px) and (max-width: 1700px) {
            .el-table {
                max-width: 1160px;
                // height: 80% !important;
            }
        }
        @media screen and (min-width: 1701px) and (max-width: 1800px) {
            .el-table {
                max-width: 1242px;
                // height: 80% !important;
            }
        }
        @media screen and (min-width: 1801px) and (max-width: 1900px) {
            .el-table {
                max-width: 1360px;
                // height: 80% !important;
            }
        }
        .el-form {
            margin-left: 10px;
        }
    }
}
</style>
