<template>
    <div id="screen">
        <div class="ctable">
            <div class="right-topheader">
                <div style="line-height:40px;height:40px;">
                    <span style="font-size: 14px;color:#606266; line-height: 40px">大屏幕管理</span>
                </div>
                <div>
                    <el-button type="primary" @click="createScreen">创建</el-button>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="cdiv1">
                <el-table
                    :data="screenList"
                    border
                    style="width: 100%; text-align:center;    margin-bottom: 20px;"
                    :default-sort="{prop: 'date', order: 'descending'}"
                >
                    <el-table-column prop="name" label="项目">
                        <template slot-scope="scope">
                            <p
                                v-if="scope.row.status == '0'"
                                @click="viewS(scope.row.pmurl)"
                                style="color:#409eff;cursor:pointer"
                            >{{scope.row.name}}</p>
                            <p v-else>{{scope.row.name}}</p>
                        </template>
                        <!-- <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p @click="viewS(scope.row.url)">{{ scope.row.name }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>
                            </el-popover>
                        </template>-->
                    </el-table-column>
                    <el-table-column prop="url" label="激活码"></el-table-column>
                    <el-table-column prop="led" label="LED-IP"></el-table-column>
                    <el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
                    <el-table-column prop="created" label="创建日期"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                @click="revise(scope.row)"
                                type="primary"
                                plain
                                size="small"
                                icon="el-icon-edit"
                            >修改</el-button>
                            <el-button
                                @click="off(scope.row)"
                                type="danger"
                                plain
                                size="small"
                                icon="el-icon-delete"
                            >注销</el-button>
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
            title="创建"
            class="chuangjian"
            :visible.sync="addFormVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
        >
            <el-form
                :model="addForm"
                label-width="80px"
                :rules="screenFormRules"
                ref="addEditForm"
                label-position="right"
            >
                <el-form-item label="项目:" prop="xmid" style="width:100%">
                    <el-select v-model="addForm.xmid" placeholder="请选择" style="width:84%">
                        <el-option
                            v-for="(item,index) in projectList"
                            :label="item.name"
                            :value="item.xmid"
                            :key="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="城市:" prop="tqid" style="width:100%">
                    <el-cascader
                        v-model="addForm.tqid"
                        :options="cityOptions"
                        @change="handleChange"
                        style="width:84%"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="激活码:" prop="jhm">
                    <el-input
                        placeholder="请输入激活码,激活码为六位数字"
                        v-model="addForm.jhm"
                        :maxlength="6"
                        style="width:84%"
                    ></el-input>
                </el-form-item>
                <el-form-item label="LED:" prop="led">
                    <el-input
                        placeholder="请输入LED"
                        v-model="addForm.led"
                        :maxlength="20"
                        style="width:84%"
                    ></el-input>
                </el-form-item>

                <!-- <div v-if="isFail" class="isfailtext">{{failMsg}}</div> -->
                <el-form-item>
                    <el-button type="primary" :loading="loaded" @click="save('addEditForm')">保存</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            class="screendelete"
            title="注销"
            :visible.sync="centerDialogVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
        >
            <span style="font-size:15px;">
                <i class="el-icon-warning"></i>注销后该大屏幕将不能使用,确定注销吗？
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="destroy">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            :rules="screenFormRules"
            title="修改"
            :visible.sync="editVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="editdialog"
        >
            <el-form
                :model="editForm"
                label-width="80px"
                :rules="editRules"
                ref="editnMewForm"
                label-position="right"
            >
                <el-form-item label="城市:" prop="tqid" style="width:100%">
                    <el-cascader
                        v-model="editForm.tqid"
                        :options="cityOptions2"
                        @change="handleChange2"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="LED :" prop="led">
                    <el-input v-model="editForm.led" :maxlength="20" placeholder="请输入LED"></el-input>
                </el-form-item>

                <el-form-item label="激活码：" prop="jhm">
                    <el-input v-model="editForm.jhm" :maxlength="6" placeholder="请输入激活码,激活码为六位数字"></el-input>
                </el-form-item>
                <!-- <div v-if="isFail2" class="isfailtext">{{failMsg2}}</div> -->
                <el-form-item>
                    <el-button type="primary" :loading="loaded" @click="edit('editnMewForm')">保存</el-button>
                    <el-button @click="editCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import OSS from 'ali-oss';
import citydata from '../common/weatherCity.json';
import { setTimeout } from 'timers';

export default {
    data() {
        var validateled = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入led'));
            } else {
                callback();
            }
        };
        var validatejhm = (rule, value, callback) => {
            let reg = /^\d{6}$/;
            if (value === '') {
                callback(new Error('请输入激活码(激活码为六位数字)'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的激活码(激活码为六位数字)'));
            } else {
                callback();
            }
        };
        return {
            editRules: {
                // led: [
                //     { required: true, validator: validateled, trigger: 'blur' }
                // ],
                jhm: [
                    { required: true, validator: validatejhm, trigger: 'blur' },
                ],
                tqid: [
                    {
                        required: true,
                        message: '请选择城市',
                        trigger: ['blur', 'change'],
                    },
                ],
            },
            screenFormRules: {
                xmid: [
                    {
                        required: true,
                        message: '请选择项目',
                        trigger: ['blur', 'change'],
                    },
                ],
                tqid: [
                    {
                        type: 'array',
                        required: true,
                        message: '请选择城市',
                        trigger: 'change',
                    },
                ],
                // led: [
                //     { required: true, validator: validateled, trigger: 'blur' }
                // ],
                jhm: [
                    { required: true, validator: validatejhm, trigger: 'blur' },
                ],
            },
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面

            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            idactiveNames: ['1'],
            screenList: [],
            peopleList: [],
            addFormVisible: false,
            editVisible: false,
            centerDialogVisible: false,
            addForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                jhm: '',
                xmid: '',
                led: '',
                tqid: [],
            },
            //修改
            editForm: {
                newuid: this.$store.state.userData.uid,
                jhm: '',
                id: '',
                led: '',
                tqid: [],
            },
            projectList: [],
            projectID: '',
            // isFail: false,
            // isFail2: false,
            cityOptions2: [],
            cityOptions: [],
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
        current_change: function (currentPage) {
            this.currentPage = currentPage;
        },
        formatStatus(row) {
            if (row.status == 0) {
                return '已激活';
            } else if (row.status == 1) {
                return '未激活';
            } else if (row.status == 2) {
                return '已注销';
            }
        },
        getTable(num) {
            axios
                .post('/largeber/largebercardList', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    current_page: num,
                    userid: this.$store.state.userData.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.total = res.data.list.total;
                        this.pagesize = res.data.list.num;
                        this.screenList = res.data.list.list;
                        // this.currentPage = res.data.list.current_page;
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
            this.getTable(val);
        },
        save(formName) {
            this.loaded = true;
            // const that = this;

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/largeber/largebercardAdd', this.addForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.loaded = false;
                                this.getTable(1);
                                // this.isFail = false;
                                // this.failMsg = '';
                                this.$refs.addEditForm.resetFields(); // 清空表单
                                this.addFormVisible = false;
                                this.addForm.jhm = '';
                                this.addForm.xmid = '';
                                this.addForm.led = '';
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning',
                                });
                                this.loaded = false;
                            }
                        })
                        .catch(function (error) {
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
            // this.isFail = false;
            // this.failMsg = '';
            this.$refs.addEditForm.resetFields(); // 清空表单
            this.addFormVisible = false;
        },
        //创建
        createScreen() {
            this.addFormVisible = true;
        },
        //注销
        off(row) {
            this.centerDialogVisible = true;
            this.projectID = row.id;
        },
        destroy() {
            axios
                .post('/largeber/cancellationLarge', {
                    id: this.projectID,
                    newuid: this.$store.state.userData.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.loaded = false;

                        this.centerDialogVisible = false;
                        setTimeout(() => {
                            this.$alert('删除成功！');
                            this.getTable(1);
                        }, 1000);
                    } else {
                        this.$alert(re.data.msg);
                        this.loaded = false;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //修改
        revise(row) {
            this.editVisible = true;
            this.editForm.id = row.id;
            this.editForm.led = row.led;
            this.editForm.jhm = row.url;
            this.editForm.tqid = row.tqid;
        },
        edit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/largeber/setLed', this.editForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.loaded = false;
                                this.getTable(this.currentPage);
                                // this.isFail2 = false;
                                // this.failMsg2 = '';
                                this.editVisible = false;
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning',
                                });
                                this.loaded = false;
                            }
                        })
                        .catch(function (error) {
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
        editCancel() {
            // this.isFail2 = false;
            // this.failMsg2 = '';
            this.editVisible = false;
        },
        //获取项目列表
        getProjectSelect() {
            axios
                .post('/laowu_yun/huquxiangmulist', {
                    corp_id: this.$store.state.userData.cid,
                    newuid: this.$store.state.userData.uid,
                    userid: this.$store.state.userData.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.projectList = res.data.content;
                    } else {
                        this.$alert('错误');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleChange(val) {
            this.addForm.tqid = val;
        },
        handleChange2(val) {
            this.editForm.tqid = val;
        },
        viewS(url) {
            window.location.href = url;
        },
    },
    created() {
        this.cityOptions = citydata;
        this.cityOptions2 = citydata;
    },
    mounted() {
        this.getTable(1);
        this.getProjectSelect();
    },
};
</script>
<style lang="less">
body {
    .editdialog .el-cascader {
        width: 100%;
    }
    .screendelete {
        .el-dialog {
            width: 25%;
            margin-top: 24vh !important;
            .el-dialog__body {
                padding: 10px 20px;
            }
            .el-icon-warning {
                color: red;
                font-size: 30px;
                margin-right: 6px;
                vertical-align: middle;
            }
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
#screen .ctable {
    width: 100%;
}

.cdiv1 {
    width: 100% !important;
}
#screen {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #fff;
    overflow-y: auto;
    // .chuangjian .el-dialog {
    //     width: 25%;
    // }

    .isfailtext {
        width: 80%;
        margin: 0 auto;
        line-height: 30px;
        text-align: center;
        color: red;
        margin-bottom: 22px;
        font-size: 14px;
    }

    #screen .right-topheader {
        display: flex;
        justify-content: space-between;
    }
}
</style>