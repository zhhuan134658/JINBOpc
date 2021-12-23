<template>
    <div id="gongzi">
        <div class="cnav">
            <sideMenu @childFn="parentFn" @childFn4="parentFn4"></sideMenu>
        </div>
        <div v-show="warnPage" class="ctable">
            <div style="width:100%;height:100%;position: relative;    background-color: #fff;">
                <div style="margin:0 auto;text-align:center;position: absolute;left: 50%;top: 30%;">
                    <img
                        style="width:220px;height:204px;"
                        src="../../../static/images/write.png"
                        alt
                    />
                    <div style="font-size:16px;">请选择班组</div>
                </div>
            </div>
        </div>

        <div class="ctable" v-show="viwePage">
            <div class="gongziTable">
                <div class="right-topheader">
                    <div style="line-height:40px;height:40px;">
                        <span style="font-size: 14px;color;rgb(96, 98, 102);">工资报表</span>
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="cdiv1">
                    <div class="xiangqing">
                        <div class="xsq1">
                            <div class="dddd">
                                <div style="font-size:30px">{{byyingfa}}</div>
                                <div>
                                    本月应付(
                                    <span style="color:red">万元</span>)
                                </div>
                            </div>
                        </div>
                        <div class="xsq2">
                            <div class="dddd">
                                <div style="font-size:30px">{{byshifa}}</div>
                                <div>
                                    本月已付(
                                    <span style="color:red">万元</span>)
                                </div>
                            </div>
                        </div>
                        <div class="xsq3">
                            <div class="dddd">
                                <div style="font-size:30px">{{byweifu}}</div>
                                <div>
                                    本月未付(
                                    <span style="color:red">万元</span>)
                                </div>
                            </div>
                        </div>
                        <div class="xsq4">
                            <div class="dddd">
                                <div style="font-size:30px">{{zongyingfa}}</div>
                                <div>
                                    累计应付(
                                    <span style="color:red">万元</span>)
                                </div>
                            </div>
                        </div>
                        <div class="xsq5">
                            <div class="dddd">
                                <div style="font-size:30px">{{zongshifa}}</div>
                                <div>
                                    累计已付(
                                    <span style="color:red">万元</span>)
                                </div>
                            </div>
                        </div>
                        <div class="xsq6">
                            <div class="dddd">
                                <div style="font-size:30px">{{zongweifu}}</div>
                                <div>
                                    累计未付(
                                    <span style="color:red">万元</span>)
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="biaoge">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="工资月份:">
                                <div class="container">
                                    <div class="block">
                                        <el-date-picker
                                            @change="selectyue"
                                            v-model="value2"
                                            :picker-options="pickerStart"
                                            type="month"
                                            placeholder="选择月"
                                        ></el-date-picker>
                                    </div>
                                </div>
                            </el-form-item>

                            <el-form-item label="姓名:">
                                <el-input
                                    placeholder="请输入姓名"
                                    v-model="searchform.name"
                                    @keyup.enter.native="search"
                                ></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" plain @click="search">搜索</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table
                            size="mini"
                            :data="gzList"
                            class="etable"
                            border
                            style="width: 100%; text-align:center;margin-bottom: 20px;"
                            :default-sort="{prop: 'date', order: 'descending'}"
                        >
                            <el-table-column prop="name" label="姓名"></el-table-column>
                            <el-table-column prop="yufen" label="所属月份"></el-table-column>
                            <el-table-column prop="bankcard" label="银行卡号"></el-table-column>
                            <el-table-column prop="yingfa" label="当月应发工资"></el-table-column>
                            <el-table-column prop="shifa" label="当月实发工资"></el-table-column>
                            <el-table-column prop="weifu" label="当月未付工资"></el-table-column>
                            <el-table-column prop="lyingfa" label="累计应付工资"></el-table-column>
                            <el-table-column prop="lweifu" label="累计未付工资"></el-table-column>
                            <el-table-column prop="lshifa" label="累计实付工资"></el-table-column>
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
    </div>
</template>

<script>
import axios from 'axios';
import sideMenu from '../public/sideMenu.vue';
export default {
    name: 'gongzi',
    components: { sideMenu },

    data() {
        return {
            warnPage: true,
            viwePage: false,
            value2: new Date(),
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            istag: true,
            newtime: '',
            formInline: {
                user1: '',
                user2: '',
                region: '',
            },
            byyingfa: '', // 本月应付万元
            byshifa: '', //本月实付
            byweifu: '', // 本月未付
            zongyingfa: '', //总共应付
            zongshifa: '', // 总共实付
            zongweifu: '', // 总共未付
            gzList: [],
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            // xmid: '',
            bzid: '',

            idactiveNames: ['1'],

            peopleList: [],
            zzid: '',

            addForm: {
                htriqi: '',
                sxhtriqi: '',
                htid: '',
                hturl: [],
                htstatus: '',
            },
            rules: {
                hturl: [
                    {
                        required: true,
                        message: '请上传图片',
                        trigger: 'change',
                    },
                ],
            },
            fileList: [],
            images: [], // 图片存储
            haspic: false, // 默认没有传图片

            id: 'upload',

            uploadForm: {
                key: '',
                policy: '',
                OSSAccessKeyId: '',
                success_action_status: '200', //让服务端返回200,不然，默认会返回204
                callback: '',
                signature: '',
            },
            host: '',
            g_object_name: '',
            //命名方式  随机名字
            g_object_name_type: 'random_name',
            suffix: '',
            searchform: {
                name: '',
            },
        };
    },

    methods: {
        // up() {
        //     this.$router.push({ path: '/spx' });
        // },
        parentFn(payload) {
            this.bzid = payload;
        },
        // parentFn4(payload) {
        //     this.gzList = [];
        // },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === 0) {
                return 'th';
            }
            return '';
        },
        switchChange() {
            this.istag = !this.istag;
        },
        created: function () {
            this.total = this.tableData.length;
        },
        current_change: function (currentPage) {
            this.currentPage = currentPage;
        },

        switchTimeFormat(time) {
            const dateTime = this.value2;
            const year = dateTime.getFullYear();
            const month = dateTime.getMonth() + 1;
            this.newtime = `${year}-${this.addZero(month)}`;
        },
        addZero(v) {
            return v < 10 ? '0' + v : v;
        },
        // zonggongzi() {
        //     this.switchTimeFormat();

        // },
        getTable(valname, num) {
            if (this.value2) {
                this.switchTimeFormat();
            } else {
                this.newtime = '';
            }

            axios
                .post('/laowu_yun/banzugongzilist', {
                    id: this.bzid,
                    newuid: this.$store.state.userData.uid,
                    yuefen: this.newtime,
                    current_page: num,
                    name: valname,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.gzList = res.data.content.list;
                        this.currentPage = res.data.content.current_page;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            axios

                .post('/laowu_yun/xinzizonggongzilist', {
                    id: this.bzid,
                    newuid: this.$store.state.userData.uid,
                    yuefen: this.newtime,
                })
                .then((res) => {
                    this.byyingfa = res.data.zong.byyingfa;
                    this.byshifa = res.data.zong.byshifa;
                    this.byweifu = res.data.zong.byweifu;
                    this.zongyingfa = res.data.zong.zongyingfa;
                    this.zongshifa = res.data.zong.zongshifa;
                    this.zongweifu = res.data.zong.zongweifu;
                });
        },
        down() {
            this.switchTimeFormat();
            axios
                .get('/laowu_yun/gongzimobandown', {
                    params: {
                        id: this.bzid,
                        newuid: this.$store.state.userData.uid,
                        yuefen: this.newtime,
                    },
                })
                .then((res) => {
                    window.location.href =
                        'https://zhihui.zzdingyun.com/laowu_yun/gongzimobandown?id=' +
                        this.bzid +
                        '&yuefen=' +
                        this.newtime;
                    //  window.location.href=res.data
                });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;

            this.getTable(this.searchform.name, val);
        },
        search() {
            // var keyCode = window.event? e.keyCode:e.which;
            this.getTable(this.searchform.name, 1);
        },
        add() {
            this.addFormVisible = true;
        },

        handleWatch(row, e) {},

        handleAvatarSuccess(response, file, fileList) {
            //response这个
        },
        andleRemove(file, fileList) {},
        handlePreview(file) {},
        selectyue() {
            this.getTable(this.searchform.name, 1);
        },

        // }
    },
    created() {},
    mounted() {
        // this.get_signature();
    },
    activated() {
        if (this.bzid) {
            this.getTable(this.searchform.name, 1);
        }
    },
    computed: {
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.value2;
                    if (endDateVal) {
                        return time.getTime() > Date.now(); // 大于当前时间禁止选择
                    }
                },
            };
        },
    },
    watch: {
        url(val) {
            if (val) {
                this.urls.push(val);
            }
        },
        bzid: function (newVal, oldVal) {
            if (newVal) {
                this.warnPage = false;
                this.viwePage = true;
            }
        },
    },
};
</script>
<style lang="less">
.el-collapse .el-collapse div {
    text-align: center;
    line-height: 40px;
}
.el-collapse .el-collapse div:hover {
    color: #409eff;
    background-color: #eeeeee;
}

.cdiv1 {
    width: 97% !important;
}
#gongzi {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .cnav {
        background-color: rgb(242, 246, 252);
    }
}

#gongzi .ctable {
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .gongziTable {
        padding: 10px;
        height: 100%;
        overflow-y: auto;
    }
}
#gongzi .right-topheader {
    display: flex;
    justify-content: flex-start;
}
#gongzi .caozuo {
    box-sizing: border-box;
}
#gongzi .mbutton {
    margin-left: 0 !important;
}
/* 详情 */
#gongzi .xiangqing {
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    background-color: #fff;
}
#gongzi .xiangqing .xsq1 {
    width: 16%;
    float: left;
    margin-top: 10px;
    height: 70%;
    border-right: 1px solid#DCDFE6;
    display: flex;
    justify-content: center;
    align-items: center;
}
#gongzi .xiangqing .xsq2 {
    width: 17%;
    float: left;
    margin-top: 10px;
    height: 70%;
    border-right: 1px solid #dcdfe6;
    display: flex;
    justify-content: center;
    align-items: center;
}
#gongzi .xiangqing .xsq3 {
    width: 17%;
    float: left;
    margin-top: 10px;
    height: 70%;
    border-right: 1px solid #dcdfe6;
    display: flex;
    justify-content: center;
    align-items: center;
}
#gongzi .xiangqing .xsq4 {
    width: 17%;
    float: left;
    margin-top: 10px;
    height: 70%;
    border-right: 1px solid #dcdfe6;
    display: flex;
    justify-content: center;
    align-items: center;
}
#gongzi .xiangqing .xsq5 {
    width: 17%;
    float: left;
    margin-top: 10px;
    height: 70%;
    border-right: 1px solid #dcdfe6;
    display: flex;
    justify-content: center;
    align-items: center;
}
#gongzi .xiangqing .xsq6 {
    width: 15%;
    float: left;
    margin-top: 10px;
    height: 70%;

    display: flex;
    justify-content: center;
    align-items: center;
}

#gongzi .biaoge {
    background-color: #fff;
    padding: 20px;
    height: 50%;
}
.cell {
    text-align: center;
}
#gongzi .biaoge .etable .el-input__inner {
    background-color: rgb(236, 245, 255);
    border-color: #c0c4cc;
    text-align: center;
}
.el-picker-panel {
    .el-month-table td .cell {
        font-size: 12px;
    }
}
</style>