<template>
    <div id="leaf">
        <div class="ctable">
            <div class="right-topheader">
                <div style="line-height:40px;height:40px;">
                    <span style="font-size: 14px;color:#606266; line-height: 40px">离场人员</span>
                </div>
                <!-- <el-button type="primary" @click="back">返回</el-button> -->
            </div>
            <el-divider></el-divider>
            <div class="cdiv1">
                <el-form
                    :inline="true"
                    :model="searchform"
                    class="demo-form-inline"
                    @submit.native.prevent
                    style="display:flex;justify-content:space-between"
                >
                    <div>
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
                    </div>
                    <div>
                        <el-button type="primary" @click="back">返回</el-button>
                    </div>
                </el-form>
                <el-table
                    :data="leafList"
                    border
                    style="width: 100%; text-align:center;    margin-bottom: 20px;"
                    :default-sort="{prop: 'date', order: 'descending'}"
                >
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="sex" label="性别" width="50"></el-table-column>
                    <el-table-column prop="useridcode" label="身份证"></el-table-column>
                    <el-table-column prop="phone" label="手机"></el-table-column>
                    <el-table-column prop="worktype" label="工种"></el-table-column>
                    <el-table-column prop="usertype" label="人员类型" width="100"></el-table-column>
                    <el-table-column prop="zhuangtai" label="人员状态" width="100"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button @click="watchlink(scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="revise(scope.row)" type="text" size="small">离场凭证</el-button>
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

        <el-dialog
            title="离场凭证"
            :visible.sync="editVisible"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
        >
            <img
                @click="lookimg(item)"
                style="width:100%;"
                v-for="(item,index) in picList"
                :src="item"
                :key="index"
                alt
            />
        </el-dialog>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import OSS from 'ali-oss';

export default {
    data() {
        return {
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面

            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            idactiveNames: ['1'],
            leafList: [],
            picList: [],
            editVisible: false,
            addForm: {
                corp_id: this.$store.state.userData.cid,
                jhm: '',
                xmid: '',
                led: '',
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
            //修改
            editForm: {
                jhm: '',
                id: '',
                led: '',
            },
            projectList: [],
            projectID: '',
            searchform: {
                name: '',
            },
        };
    },

    methods: {
        lookimg(item) {
            dd.ready(function () {
                dd.biz.util.previewImage({
                    urls: [item], //图片地址列表
                    current: item, //当前显示的图片链接
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {},
                });
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

        getTable(valname, num) {
            axios
                .post('/laowu_yun/lichangteamxiangxiuserlist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    bzid: this.$route.query.bzid,
                    current_page: num,
                    name: valname,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.leafList = res.data.content.list;
                        // this.currentPage = res.data.content.current_page;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
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
            this.getTable(this.searchform.name, 1);
        },
        //修改
        revise(row) {
            this.editVisible = true;
            this.picList = row.lcpz;
        },
        watchlink(row) {
            this.$router.push({
                name: 'leaf',
                query: { userid: row.userid },
            });
        },
        back() {
            this.$router.go(-1);
        },
    },
    mounted() {
        this.getTable(this.searchform.name, 1);
    },
};
</script>
<style>
.el-collapse .el-collapse div {
    text-align: center;
    line-height: 40px;
}
.el-collapse .el-collapse div:hover {
    color: #409eff;
    background-color: #eeeeee;
}

.cdiv1 {
    width: 100% !important;
}
#leaf {
    width: 100%;
    background-color: #fff;
    height: 100%;
    overflow-y: auto;
}

#leaf .right-topheader {
    display: flex;
    justify-content: space-between;
}
</style>


