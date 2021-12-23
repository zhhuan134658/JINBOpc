<template>
    <div style="height:100%;">
        <div id="black">
            <div class="ctable">
                <div class="right-topheader">
                    <div style="line-height:40px;height:40px;">
                        <span style="font-size: 14px;color:#606266; line-height: 40px">黑名单</span>
                    </div>
                    <div>
                        <el-button type="primary" @click="add">添加黑名单</el-button>
                        <!-- <router-link :to="{name:'share'}">
                            <el-button type="primary" @click="toShare">共享黑名单</el-button>
                        </router-link> -->

                        <!-- <el-button type="primary" @click="lead">导入</el-button> -->
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="cdiv1">
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
                    <el-table
                        :data="blackList"
                        border
                        style="width: 100%; text-align:center;    margin-bottom: 20px;"
                        :default-sort="{prop: 'date', order: 'descending'}"
                    >
                        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
                        <el-table-column prop="name" label="姓名"></el-table-column>
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
                                <el-button
                                    @click="shareBlack(scope.$index,scope.row)"
                                    type="primary"
                                    plain
                                    size="small"
                                >同步</el-button>
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
                    title="添加黑名单"
                    :visible.sync="addFormVisible"
                    :close-on-click-modal="false"
                    :append-to-body="true"
                    @close="offBlack"
                    class="blackDialog"
                >
                    <el-form
                        :model="addForm"
                        label-width="110px"
                        :rules="addFormRules"
                        ref="addEditForm"
                        label-position="right"
                    >
                        <el-form-item label="姓名 :" prop="name">
                            <el-input placeholder="请输入姓名" v-model="addForm.name" :maxlength="5"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号 :" prop="usercode">
                            <el-input
                                placeholder="请输入身份证号"
                                v-model="addForm.usercode"
                                :maxlength="18"
                            ></el-input>
                        </el-form-item>

                        <el-form-item label="黑名单原因 :" prop="hmdcontent" style="margin-bottom:0;">
                            <el-input
                                placeholder="请填写原因 最多60字"
                                type="textarea"
                                style="height: 100px;padding: 10px 15 px;resize: none;"
                                v-model="addForm.hmdcontent"
                                maxlength="60"
                                show-word-limit
                            ></el-input>
                        </el-form-item>
                        <el-form-item label>
                            <div class="sendBad">
                                <div>快捷输入</div>
                                <div class="badList">
                                    <el-button
                                        type="primary"
                                        plain
                                        v-for="(item, index) in badTable"
                                        :key="index"
                                        @click="choose(item)"
                                    >{{item.message}}</el-button>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="sure('addEditForm')"
                            >确定</el-button>
                            <el-button @click="cancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>

                <el-dialog
                    title="批量导入"
                    :visible.sync="teamVisible"
                    :close-on-click-modal="false"
                    :append-to-body="true"
                    class="blackDialog"
                >
                    <el-form
                        :model="teamForm"
                        label-width="170px"
                        :rules="FormRules"
                        ref="teamForm"
                        label-position="left"
                    >
                        <el-form-item label="公司名称 :"></el-form-item>
                    </el-form>
                </el-dialog>

                <el-dialog
                    title="查看"
                    :visible.sync="watchVisible"
                    :close-on-click-modal="false"
                    :append-to-body="true"
                    class="blackDialog"
                >
                    <div>
                        <div style="margin:15px 0 20px 42px;">姓名：{{blackName}}</div>
                        <div style="margin:15px 0 20px 15px;">身份证号：{{blackID}}</div>

                        <el-table
                            :data="peopleList"
                            border
                            style="width: 100%; text-align:center;margin-bottom: 20px;"
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

                            <el-table-column fixed="right" label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="deleteblack(scope.$index,scope.row)"
                                        type="danger"
                                        plain
                                        size="small"
                                    >删除</el-button>
                                </template>
                            </el-table-column>
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
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'black',
    data() {
        var validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入姓名'));
            } else {
                callback();
            }
        };

        var validateUsercode = (rule, value, callback) => {
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (value === '') {
                callback(new Error('请输入身份证号'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的身份证号'));
            } else {
                callback();
            }
        };
        var validateHmdcontent = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入黑名单内容'));
            } else {
                callback();
            }
        };
        return {
            addFormRules: {
                name: [
                    { required: true, validator: validateName, trigger: 'blur' }
                ],
                usercode: [
                    {
                        required: true,
                        validator: validateUsercode,
                        trigger: 'blur'
                    }
                ],
                hmdcontent: [
                    {
                        required: true,
                        validator: validateHmdcontent,
                        trigger: 'blur'
                    }
                ]
            },
            shareList: [],
            watchVisible: false,
            peopleList: [],

            total: '', //默认数据总数

            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面

            istag: true,
            searchform: {
                name: ''
            },
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            // xmid: '',
            bzid: '',
            failMsg: '',
            isFail: false,
            // tagsData: [], //班组列表,
            // collapseList: [], //项目列表
            idactiveNames: ['1'],
            blackList: [],
            peopleList: [],
            addFormVisible: false,
            teamVisible: false,
            watchVisible: false,
            addForm: {
                  newuid:this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                usercode: '',
                name: '',
                hmdcontent: ''
            },

            badTable: [
                { message: '寻衅斗殴' },
                { message: '酗酒滋事' },
                { message: '偷盗行为' },
                { message: '恶意讨薪' },
                { message: '破坏公共财务' },
                { message: '违反安全规定' },
                { message: '违反管理条例' }
            ],
            blackName: '',
            blackID: ''
        };
    },

    methods: {
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
        offBlack() {
            this.addForm.name = '';
            this.addForm.usercode = '';
            this.addForm.hmdcontent = '';
        },
        getTable(val, num) {
            axios
                .post('/laowu_yun/userhmdlist', {
                    corp_id: this.cid,
                      newuid:this.$store.state.userData.uid,
                    name: val,
                    current_page: num
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.blackList = res.data.content.list;
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

            this.getTable(this.searchform.name, val);
        },
        add() {
            this.addFormVisible = true;
        },
        lead() {
            this.teamVisible = true;
        },
        search() {
            this.getTable(this.searchform.name, 1);
        },

        //查看
        handleWatch(index, row) {
            this.watchVisible = true;
            this.blackName = row.name;
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

            this.blackID = row.usercode;
        },

        deleteblack(index, row) {
            axios
                .post('/laowu_yun/deleteuserhmdcontent', {
                    id: row['hmdzid'],
                      newuid:this.$store.state.userData.uid,
                })
                .then(res => {
                    this.$message({
                        message: '删除成功',
                        duration: 4000,
                        type: 'success'
                    });
                    this.peopleList.splice(index, 1);
                    this.getTable(this.searchform.name, this.currentPage);
                    if (this.peopleList.length < 1) {
                        this.watchVisible = false;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        shareBlack(index, row) {
            axios
                .post('/laowu_yun/updateuserhmdgongxiang', {
                    id: row['hmdid'],
                      newuid:this.$store.state.userData.uid,
                })
                .then(res => {
                    this.$message({
                        message: '同步成功',
                        center: true,
                        duration: 4000,
                        type: 'success'
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        sure(formName) {
            this.loaded = true;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    axios
                        .post('/laowu_yun/useraddjc', this.addForm)
                        .then(res => {
                            if (res.data.status == 1) {
                                this.loaded = false;
                                this.$refs.addEditForm.resetFields(); // 清空表单
                                this.addFormVisible = false;
                                this.$message({
                                    message: '添加成功',
                                    center: true,
                                    duration: 4000,
                                    type: 'success'
                                });
                                this.getTable(this.searchform.name, 1);
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 4000,
                                    type: 'warning'
                                });
                                this.loaded = false;
                            }
                        })
                        .catch(function(error) {
                            this.loaded = false;
                            console.log(error);
                        });
                } else {
                    this.loaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel() {
            this.loaded = false;
            this.isFail = false;
            this.failMsg = '';
            this.$refs.addEditForm.resetFields(); // 清空表单
            this.addFormVisible = false;
            this.getTable(this.searchform.name, 1);
        },
        choose(item) {
            this.addForm.hmdcontent += item.message + '，';
        },
        shareb() {
            this.$router.push('/black');
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
        }
    },
    mounted() {
        this.getTable(this.searchform.name, 1);
    }
};
</script>
<style lang="less">
body {
    .blackDialog {
        .el-dialog {
            width: 35%;
        }
    }
}
#black {
    height: 100%;
}
</style>




