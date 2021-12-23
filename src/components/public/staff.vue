<template>
    <div id="staff">
        <div>
            <!-- <el-button type="primary" @click="fan">返回</el-button> -->
            <div>添加发卡</div>
        </div>
        <el-divider></el-divider>
        <div class="cdiv1">
            <div>
                <el-form
                    :inline="true"
                    :model="searchform"
                    class="demo-form-inline"
                    @submit.native.prevent
                >
                    <el-form-item label="姓名 ：" style="float:left ">
                        <el-input
                            v-model="searchform.name"
                            placeholder="请填写姓名"
                            @keyup.enter.native="search"
                        ></el-input>
                    </el-form-item>
                    <el-form-item style="float:left ">
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-form-item>
                    <router-link :to="{name:'inz'}" style="float:right ">
                        <el-button type="primary">返回</el-button>
                    </router-link>
                </el-form>
                <ul>
                    <li></li>
                </ul>
            </div>

            <el-table :data="tabList" border style="width:100%;margin-bottom:20px;">
                <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="useridcode" label="身份证号"></el-table-column>
                <el-table-column prop="phone" label="手机"></el-table-column>
                <el-table-column prop="worktype" label="工种"></el-table-column>
                <el-table-column prop="usertype" label="人员类型"></el-table-column>
                <el-table-column prop="zhuangtai" label="人员状态"></el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button
                            v-if="!scope.row.kahao"
                            @click="breakCard(scope.row)"
                            type="text"
                            size="small"
                        >发卡</el-button>
                        <el-button
                            v-else
                            @click="takeCard(scope.row)"
                            type="text"
                            size="small"
                            style="color:red"
                        >收卡</el-button>
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
            class="deletedialog"
            title="收卡"
            :visible.sync="centerDialogVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
        >
            <span style="font-size:15px;">
                <i class="el-icon-warning"></i>确定收卡吗？
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="destroy">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            class="break"
            title="发卡"
            :visible.sync="breakDialogVisible"
            :before-close="handleClose"
            :close-on-click-modal="false"
            :append-to-body="true"
        >
            <div class="breakContent">
                <div class="breakPic">
                    <img src="../../../static/images/readcard.gif" alt />
                </div>
                <div class="breakMain">
                    <el-form
                        :model="editForm"
                        label-width="170px"
                        :rules="editRules"
                        ref="editnMewForm"
                        label-position="right"
                    >
                        <el-form-item label="姓名：">
                            <p>{{sname}}</p>
                        </el-form-item>

                        <el-form-item label="考勤卡号：" prop="kahao">
                            <el-input
                                v-model="editForm.kahao"
                                id="eduser"
                                autocomplete="off"
                                placeholder="请将考勤卡放置在读卡器上读取考勤卡号"
                                style="cursor: not-allowed;"
                                ref="sinput"
                            ></el-input>
                        </el-form-item>
                        <div v-if="isFail" class="isfailtext">{{failMsg}}</div>
                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="edit('editnMewForm')"
                            >发卡</el-button>
                            <el-button type="primary" @click="reset()">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            bzid: '',
            tabList: [],
            cid: this.$store.state.userData.cid,
            searchform: { name: '' },
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            centerDialogVisible: false,
            breakDialogVisible: false,
            isFail: false,
            failMsg: '',
            editForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                userid: '',
                kahao: '',
                bzid: this.$route.query.bzid
            },
            sname: '',
            loaded: false,
            destroyId: ''
        };
    },
    methods: {
        fan() {
            this.$router.go(-1);
        },
        getId() {
            this.bzid = this.$route.params.bzid;
        },
        handleClose() {
            this.editForm.kahao = '';
            this.breakDialogVisible = false;
        },
        getTab(valname, num) {
            axios
                .post('/laowu_yun/teamxiangxiuserlist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    bzid: this.bzid,
                    current_page: num,
                    name: valname
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.tabList = res.data.content.list;
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
            const that = this;
            that.currentPage = val;
            that.getTab(that.searchform.name, val);
        },
        search() {
            const that = this;
            that.getTab(that.searchform.name, 1);
        },
        takeCard(row) {
            this.centerDialogVisible = true;
            this.destroyId = row.userid;
        },
        breakCard(row) {
            this.breakDialogVisible = true;
            this.sname = row.name;
            this.editForm.userid = row.userid;
            this.$nextTick(() => {
                this.$refs.sinput.focus();
            });
        },
        edit(formName) {
            this.loaded = true;
            if (this.editForm.kahao) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        axios
                            .post('/laowu_yun/renyuanfaka', this.editForm)
                            .then(res => {
                                if (res.data.status == 1) {
                                    this.loaded = false;
                                    this.getTab(this.searchform.name, 1);
                                    this.editForm.kahao = '';
                                    this.breakDialogVisible = false;
                                } else {
                                    this.$message({
                                        message: res.data.msg,
                                        center: true,
                                        duration: 2000,
                                        type: 'warning'
                                    });
                                    this.loaded = false;
                                    this.$nextTick(() => {
                                        this.$refs.sinput.focus();
                                    });
                                }
                            })
                            .catch(function(error) {
                                this.loaded = false;
                                this.$nextTick(() => {
                                    this.$refs.sinput.focus();
                                });
                                console.log(error);
                            });
                    } else {
                        this.loaded = false;
                        this.$nextTick(() => {
                            this.$refs.sinput.focus();
                        });
                        console.log('error submit!!');
                        return false;
                    }
                });
            } else {
                this.$alert('请输入考勤卡号', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: '请输入考勤卡号'
                        });
                    }
                });
                this.loaded = false;
                this.$nextTick(() => {
                    this.$refs.sinput.focus();
                });
            }
        },
        reset() {
            this.editForm.kahao = '';
            this.$nextTick(() => {
                this.$refs.sinput.focus();
            });
        },
        destroy() {
            const that = this;
            axios
                .post('/laowu_yun/renyuanshouka', {
                    corp_id: that.cid,
                    userid: that.destroyId,
                    bzid: that.$route.query.bzid,
                    newuid: that.$store.state.userData.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        that.centerDialogVisible = false;
                        that.getTab(that.searchform.name, 1);
                    } else {
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    activated() {
        this.bzid = this.$route.query.bzid;
        this.page = 1;
        this.getTab(this.searchform.name, 1);
    },
    mounted() {
        const that = this;
        that.bzid = that.$route.query.bzid;
        that.getTab(that.searchform.name, 1);
        this.$nextTick(() => {
            this.$refs.sinput.focus();
        });
    },
    watch: {
        editForm: {
            handler(val, oldVal) {
                this.editForm.kahao = val.kahao;
            },
            deep: true // 监听这个对象中的每一个属性变化
        }
    }
};
</script>
<style lang="less">
#staff {
    height: 100%;
    background-color: #fff;
    padding: 10px 20px 10px 10px;
    overflow: scroll;
    // .breakContent {
    //     display: flex;
    //     justify-content: space-between;
    //     .breakPic {
    //         width: 41%;
    //         img {
    //             max-width: 100%;
    //         }
    //     }
    //     .breakMain {
    //         width: 58%;
    //         .el-input__inner {
    //             cursor: not-allowed;
    //             outline: none;
    //             caret-color: transparent;
    //         }
    //         .el-input__inner:focus {
    //             outline: none;
    //             outline-offset: -10px;
    //             caret-color: transparent;
    //         }
    //     }
    // }
    .deletedialog {
        .el-dialog {
            width: 500px;
        }
    }
}
.breakContent {
    display: flex;
    justify-content: space-between;
    .breakPic {
        width: 41%;
        img {
            max-width: 100%;
        }
    }
    .breakMain {
        width: 58%;
        .el-input__inner {
            cursor: not-allowed;
            outline: none;
            caret-color: transparent;
        }
        .el-input__inner:focus {
            outline: none;
            outline-offset: -10px;
            caret-color: transparent;
        }
    }
}
</style>

