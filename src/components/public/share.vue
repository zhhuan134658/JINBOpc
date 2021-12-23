<template>
    <div id="share">
        <div class="ctable">
            <div class="right-topheader">
                <div style="line-height:40px;height:40px;">
                    <span style="font-size: 14px;color:#606266; line-height: 40px">共享黑名单</span>
                </div>
                <div>
                    <el-button type="primary" @click="toblack">返回</el-button>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="cdiv1">
                <el-form
                    :inline="true"
                    :model="formInline"
                    class="demo-form-inline"
                    @submit.native.prevent
                >
                    <el-form-item label="姓名：">
                        <el-input
                            v-model="searchform.name"
                            @keyup.enter.native="search"
                            placeholder="请输入姓名"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="search">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                    :data="shareList"
                    border
                    style="width: 100%; text-align:center;    margin-bottom: 20px;"
                    :default-sort="{prop: 'date', order: 'descending'}"
                >
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="corp_name" label="公司名称"></el-table-column>
                    <el-table-column prop="usercode" label="身份证号"></el-table-column>
                    <el-table-column prop="shumu" label="记录数目"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                @click="handleWatch(scope.$index,scope.row)"
                                type="primary"
                                plain
                                size="small"
                            >查看</el-button>
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
            <el-dialog
                title="查看"
                :visible.sync="watchVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="shareDialog"
            >
                <div>
                    <div style="margin:15px 0 20px 42px;">姓名：{{blackName}}</div>
                    <div style="margin:15px 0 20px 15px;">身份证号：{{blackID}}</div>
                    <el-table
                        :data="peopleList"
                        border
                        style="width: 100%; text-align:center;    margin-bottom: 20px;"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        type="index"
                    >
                        <el-table-column prop="hmdcontent" label="黑名单原因">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>{{ scope.row.hmdcontent }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.hmdcontent }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column prop="created" label="录入时间"></el-table-column>
                    </el-table>
                    <div style="text-align:center">
                        <!-- <el-pagination
                            @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            :current-page.sync="currentPage2"
                            :page-size="pagesize2"
                            layout="prev, pager, next, jumper"
                            :total="total2"
                        ></el-pagination>-->
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import sideMenu from '../public/sideMenu.vue';
import OSS from 'ali-oss';
// import $ from 'jquery';

export default {
    data() {
        return {
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            istag: true,

            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            // xmid: '',
            bzid: '',
            searchform: {
                name: ''
            },
            idactiveNames: ['1'],
            shareList: [],

            watchVisible: false,
            peopleList: []
        };
    },

    methods: {
        toblack() {
            this.$router.go(-1);
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
        created: function() {
            this.total = this.tableData.length;
        },
        current_change: function(currentPage) {
            this.currentPage = currentPage;
        },
        getTable(val, num) {
            axios
                .post('/laowu_yun/userhmdgxlist', {
                    name: val,
                      newuid:this.$store.state.userData.uid,
                    current_page: num
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.shareList = res.data.content.list;
                        this.currentPage = res.data.content.current_page;
                    } else {
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTable(this.searchform.name, this.currentPage);
        },
        search() {
            this.getTable(this.searchform.name, this.currentPage);
        },
        //查看
        handleWatch(index, row) {
            this.watchVisible = true;
            this.blackName = row.name;
            this.peopleList = row.hmdcontent;
            this.blackID = row.usercode;
            axios
                .post('/laowu_yun/updateuserhmdzibiao', {
                    id: row['hmdid'],
                      newuid:this.$store.state.userData.uid,
                })
                .then(res => {
                    this.peopleList = res.data.content;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getTable(this.searchform.name, 1);
    },
    watch: {
        url(val) {
            if (val) {
                this.urls.push(val);
            }
        }
    }
};
</script>
<style lang="less">
body {
    .shareDialog {
        .el-dialog {
            width: 50%;
        }
    }
}
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
#share {
    /* margin-left: 210px; */
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
    height: 100%;
}

#share .right-topheader {
    display: flex;
    justify-content: space-between;
}
</style>