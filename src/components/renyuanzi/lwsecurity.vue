<template>
    <div id="lwsecurity">
        <div class="cdiv1">
            <!-- <div class="cnavl">
                <cenav
                    @childFn="parentFn"
                    @kecheng="kecheng"
                    @childFn2="parentFn2"
                    @childFn4="parentFn4"
                ></cenav>
            </div>-->

            <!-- <div
                style="width:240px;position: relative;height:100%;background-color: #eef6ff;border: 1px solid #eee;"
            >
                <div class="grid-content bg-purple">

                </div>
            </div>-->
            <div v-show="warnPage" style="width:100%;padding:10px;background-color:#fff;">
                <div class="grid-content bg-purple-light" style="height:965px;">
                    <div
                        style="width:100%;height:100%;position: relative;    background-color: #fff;"
                    >
                        <div
                            style="margin:0 auto;text-align:center;position: absolute;left: 50%;top: 30%;"
                        >
                            <img
                                style="width:220px;height:204px;"
                                src="../../../static/images/write.png"
                                alt
                            />
                            <div style="font-size:16px;">请选择班组</div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-show="viwePage"
                style="width:100%;padding:10px;background-color:#fff;box-sizing: border-box;border:1px solid #DCDFE6"
            >
                <div class="grid-content bg-purple-light">
                    <div class="xianshi" style="width:100%">
                        <div>
                            <span style="font-size: 14px;color:#606266; line-height: 40px">安全培训</span>
                            <!-- <router-link :to="{name:'LP',params:{bzid:bzid}}"> -->
                            <el-button type="primary" style="float:right " @click="gopipei">匹配课程</el-button>
                            <!-- </router-link> -->
                        </div>
                    </div>
                    <el-divider></el-divider>
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="培训课程:">
                            <el-select
                                v-model="formInline.kc"
                                placeholder="请选择课程"
                                @change="selectkecheng"
                            >
                                <el-option
                                    v-for="(item,index) in pxkclist"
                                    :key="index"
                                    :label="item.kcname"
                                    :value="item.kcid"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="姓名 ：" style="float:left ">
                            <el-input
                                @keyup.enter.native="search"
                                v-model="formInline.user1"
                                suffix-icon="el-icon-search"
                                placeholder="请填写姓名"
                            ></el-input>
                        </el-form-item>
                        <el-form-item style="float:left ">
                            <el-button type="primary" plain @click="search">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table
                        ref="multipleTable"
                        @selection-change="handleSelectionChange"
                        :data="kcrylist"
                        border
                        style="width: 100%; text-align:center;margin:auto"
                        :default-sort="{prop: 'date', order: 'descending'}"
                    >
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="usercode" label="身份证号"></el-table-column>
                        <el-table-column prop="kcname" label="培训课程"></el-table-column>
                        <el-table-column prop="pxtime" label="观看时长"></el-table-column>
                        <!-- <el-table-column prop="pxurl" label="查看" width="100"></el-table-column> -->
                        <el-table-column prop="pxtype" label="培训状态"></el-table-column>

                        <!-- <el-table-column label="现场照片">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    plain
                                    @click="handleChakan(scope.$index, scope.row)"
                                    v-if="scope.row.pxurl.length>0"
                                >查看</el-button>
                                <span v-else="scope.row.pxurl.length<1">查看</span>
                            </template>
                            <el-button size="small" icon="el-icon-search" @click="chakan">查看</el-button>
                        </el-table-column> -->

                        <el-table-column label="操作" style="  text-align:center">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="danger"
                                    plain
                                    @click="handleDelete(scope.$index, scope.row)"
                                    v-if="scope.row.pxtype=='已培训'"
                                >删除</el-button>
                                <span v-else="scope.row.pxtype=='未培训'">删除</span>
                            </template>
                            <!-- <el-button size="small" type="danger" icon="el-icon-search" style="margin-left:10px; text-align:center">查看</el-button> -->

                            <!-- <el-button size="small" type="danger" icon="el-icon-edit" >修改</el-button> -->
                        </el-table-column>
                    </el-table>
                    <!-- <div>
                        <el-button-group style="width:100%">
                            <el-button
                                class="leftBtnGroup"
                                @click="mdBtn"
                                size="small"
                                type="primary"
                            >导出全部人员</el-button>
                            <el-button @click="mdBzBtn" size="small" type="primary">导出勾选人员</el-button>
                        </el-button-group>
                    </div> -->
                    <div style="text-align:center;margin-top:20px;padding-bottom: 20px;">
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

            <el-dialog
                title="查看图片"
                :visible.sync="chakanFormVisible"
                :close-on-click-modal="false"
                :modal-append-to-body="false"
                @close="closePicDialog"
            >
                <!-- <div style="width:100%" v-for="(item,index) in imgurl" :key="index">
                    <img @click="lookimg(item)" :src="item" alt style="width:100%" />
                </div>-->
                <div v-if="imgurl.length == 0" style="text-align:center;">暂无数据</div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import alert$ from 'dingtalk-jsapi/api/device/notification/alert';
import axios from 'axios';
export default {
    name: 'LS',
    props: {
        bzid: {
            type: String,
        },
        isTable: {
            type: Array,
        },
        getbzname: {
            type: String,
        },
        newtest: {
            type: Array,
        },
    },
    data() {
        return {
            newarr: [],
            selectPeopleData: [],
            warnPage: true,
            viwePage: false,
            chakanFormVisible: false,
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            istag: true,
            formInline: { user1: '', kc: '' },
            tableData: [],
            pxkclist: [], //培训课程下拉

            kcrylist: [],
            bzid: this.$store.state.userData.kcbzid,
            cid: this.$store.state.userData.cid,

            uid: this.$store.state.userData.uid,
            // xmid: '',
            idactiveNames: ['1'],
            peopleList: [],
            imgurl: [],
        };
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach((row) => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        mdBtn() {
            // if (this.selectPeopleData.length > 0) {
            let host = window.location.host; //主机
            const that = this;
            axios
                .get('/laowu_yun/anquanpeixunmobandown', {
                    params: {
                        newuid: that.$store.state.userData.uid,
                        bzid: that.bzid,
                        corp_id: that.$store.state.userData.cid,
                        kcid: that.formInline.kc,
                    },
                })
                .then((res) => {
                    window.location.href =
                        'https://' +
                        host +
                        '/laowu_yun/anquanpeixunmobandown?bzid=' +
                        that.bzid +
                        '&corp_id=' +
                        that.$store.state.userData.cid +
                        '&kcid=' +
                        that.formInline.kc;
                    that.toggleSelection();
                })
                .catch(function (error) {
                    console.log(error);
                });
            ////
            // } else {
            //     this.$alert('请您先多选');
            // }
        },
        mdBzBtn() {
            const that = this;
            let host = window.location.host; //主机
            if (that.newarr.length > 0) {
                axios
                    .get('/laowu_yun/anquanpeixunmobandown', {
                        params: {
                            newuid: that.$store.state.userData.uid,
                            bzid: that.bzid,
                            corp_id: that.$store.state.userData.cid,
                            kcid: that.formInline.kc,
                            userids: that.newarr,
                        },
                    })
                    .then((res) => {
                        // dd.biz.util.openLink({
                        //     url:
                        //         'https://' +
                        //         host +
                        //         '/laowu_yun/anquanpeixunmobandown?bzid=' +
                        //         that.bzid +
                        //         '&corp_id=' +
                        //         that.$store.state.userData.cid +
                        //         '&kcid=' +
                        //         that.formInline.kc +
                        //         '&userids=' +
                        //         that.newarr, //要打开链接的地址
                        //     onSuccess: function(result) {
                        //         that.toggleSelection();
                        //     },
                        //     onFail: function(err) {}
                        // });
                        window.location.href =
                            'https://' +
                            host +
                            '/laowu_yun/anquanpeixunmobandown?bzid=' +
                            that.bzid +
                            '&corp_id=' +
                            that.$store.state.userData.cid +
                            '&kcid=' +
                            that.formInline.kc +
                            '&userids=' +
                            that.newarr;
                        that.toggleSelection();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                that.$alert('请您先多选');
            }
            ///npm installnpm install
        },
        handleSelectionChange(val) {
            this.selectPeopleData = val;
            this.newarr = val.map((item) => {
                if (!item.userid) return '';
                return item.userid;
            });
            console.log(this.newarr);
        },
        lookimg1(val) {
            dd.ready(function () {
                dd.biz.util.previewImage({
                    urls: val, //图片地址列表
                    current: val[0], //当前显示的图片链接
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {},
                });
            });
        },
        gopipei() {
            if (this.pxkclist.length == 0) {
                this.$alert('培训课程为空，请先去左下角“课程管理”添加课程');
            } else {
                this.$router.push({
                    path: '/LP',
                    query: { bzid: this.bzid },
                });
            }
        },
        parentFn(payload) {
            this.bzid = payload;
        },
        parentFn2(payload) {
            this.isTable = payload;
        },
        // parentFn4(payload) {
        //     this.kcrylist = [];
        //     console.log(this.kcrylist);
        // },
        search() {
            this.kecheng(this.formInline.user1, 1);
        },
        kecheng(val, num) {
            this.$store.commit('setkcbzid', this.bzid);

            axios
                .post('/laowu_yun/userpexunlist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    bzid: this.bzid,
                    kcid: this.formInline.kc,
                    current_page: num,
                    name: val,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.kcrylist = res.data.content.list;
                        // this.imgurl = res.data.content.list;
                        this.currentPage = res.data.content.current_page;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleDelete($index, row) {
            this.$confirm('此操作将删除培训信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    axios
                        .post('/laowu_yun/deleteuserpx', {
                            id: row.pxid,
                            newuid: this.$store.state.userData.uid,
                        })
                        .then((res) => {
                            this.kecheng(this.formInline.user1, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            });
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
        },
        handleChakan($index, row) {
            // this.chakanFormVisible = true;
            this.imgurl = row.pxurl;
            var aaa = row.pxurl;

            if (this.imgurl.length == 0) {
                this.chakanFormVisible = true;
            } else {
                this.lookimg1(aaa);
            }
        },

        //  课程下拉 接口
        getpxkclist() {
            axios
                .post('/laowu_yun/useraddkcxialalist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                })
                .then((res) => {
                    this.pxkclist = res.data.content;
                    this.formInline.kc = this.pxkclist[0].kcid;
                });
        },
        parentFn(payload) {
            this.bzid = payload;
        },
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
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;

            this.kecheng(this.kcrylist.name, val);
        },

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
        selectkecheng(val) {
            this.formInline.kc = val;
            this.kecheng(this.formInline.user1, 1);
        },
        closePicDialog() {
            this.imgurl = [];
        },
    },
    created() {},
    activated() {
        this.getpxkclist();
    },
    mounted() {
        // this.kecheng(this.formInline.user1, 1);
    },
    watch: {
        bzid: function (newVal, oldVal) {
            if (newVal) {
                this.warnPage = false;
                this.viwePage = true;
                this.kecheng(this.formInline.user1, 1);
            }
        },
    },
    // activated() {
    //     this.kecheng(this.formInline.user1, 1);
    //     if (this.bzid) {
    //         this.getpxkclist();
    //     }
    // }
};
</script>
<style lang="less">
#lwsecurity {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .el-dialog {
        width: 500px;
    }
    .el-button-group {
        margin-left: 0;
        height: 40px;
        .leftBtnGroup {
            margin-left: 52px;
        }
    }
}
#lwsecurity .cdiv1 {
    width: 100% !important;
    height: 100%;
    background-color: #fff;
}
#lwsecurity .cnavl {
    // width: 100% !important;
    height: 100%;
}
/* #lwsecurity .cnavl #Sm {
    width: 100% !important;
} */
#lwsecurity .cdiv1 .cell {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    width: 100%;
}
#lwsecurity .cdiv1 .cell .el-button {
    width: 100%;
}
#lwsecurity .bg-purple-light {
    padding-left: 0;
    height: 100%;
}
#lwsecurity #Sm .bton {
    position: fixed;
    left: 280px;
    bottom: 20px;
}
</style>


