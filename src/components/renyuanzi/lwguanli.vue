<template>
    <div id="lwguanli">
        <div class="cdiv1">
            <!-- <div style="width:240px;position: relative;height:100%;background-color: #eef6ff;">
            <div class="grid-content bg-purple">-->
            <!-- <div class="cnavl"> -->
            <!-- <divlapse accordion v-model="activeNames" @change="handleChange">
                <divlapse-item
                    v-for="(item, index) in collapseList"
                    :key="index"
                    :title="item.name"
                    :name="item.xmid"
                >
                    <div
                        v-for="(item, index) in tagsData"
                        :key="item.bzid"
                        @click="getTable(item.bzid)"
                    >{{item.name}}</div>
                </divlapse-item>
            </divlapse>-->
            <!-- <cenav @childFn="parentFn" @childFn4="parentFn4"></cenav> -->
            <!-- </div>
            </div>-->
            <!-- </div> -->
            <div
                style="width:100%;height:100%;padding:10px;background-color:#fff;box-sizing: border-box;border:1px solid #DCDFE6"
            >
                <div class="grid-content bg-purple-light">
                    <div class="xianshi" style="width:100%">
                        <div>
                            <span style="font-size: 14px;color:#606266; line-height: 40px">安全培训</span>
                            <router-link :to="{name:'LS'}">
                                <el-button type="primary" style="float:right;margin-left:20px  ">返回</el-button>
                            </router-link>
                        </div>
                    </div>
                    <el-divider></el-divider>
                    <el-button
                        slot="reference"
                        type="primary"
                        @click="addkc"
                        style="float:right;margin-left:20px;"
                    >添加课程</el-button>
                    <el-form
                        :inline="true"
                        :model="formInline"
                        class="demo-form-inline"
                        @submit.native.prevent
                    >
                        <el-form-item label="课程名称 ：" style="float:left ">
                            <el-input
                                v-model="kechengname"
                                placeholder="请填写课程名称"
                                @keyup.enter.native="search"
                            ></el-input>
                        </el-form-item>
                        <el-form-item style="float:left ">
                            <el-button type="primary" plain @click="search">查询</el-button>
                        </el-form-item>
                    </el-form>

                    <el-table
                        :data="tableDatap"
                        border
                        style="width: 100%;text-align:center;margin:auto"
                        :default-sort="{prop: 'date', order: 'descending'}"
                    >
                        <el-table-column prop="kcname" label="培训课程">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>{{ scope.row.kcname }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.kcname }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="kcjigou" label="培训机构">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>{{ scope.row.kcjigou }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.kcjigou }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column> -->
                        <!-- <el-table-column prop="kcshi" label="培训老师"></el-table-column>
                        <el-table-column prop="kctime" label="培训课时"></el-table-column> -->
                        <el-table-column prop="kccontent" label="培训内容">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>{{ scope.row.kccontent }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.kccontent }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="kcaddress" label="培训地址">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>{{ scope.row.kcaddress }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.kcaddress }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="kctype" label="培训类型"></el-table-column>

                        <el-table-column
                            width="150"
                            label="操作"
                            style=" white-space:nowrap; text-align:center"
                        >
                            <template slot-scope="scope">
                                <el-button type="danger" plain @click="handleEdit(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="text-align:center;margin-top:20px">
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
                title="添加课程"
                :visible.sync="addFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="lwguanliDialog"
            >
                <div style="margin: 20px;"></div>
                <el-form
                    :label-position="labelPosition"
                    label-width="130px"
                    :rules="addFormRules"
                    ref="addEditForm"
                    :model="addForm"
                >
                    <el-form-item label="培训课程:" prop="kcname">
                        <el-input v-model="addForm.kcname" :maxlength="30" placeholder="请填写课程名字"></el-input>
                    </el-form-item>

                    <!-- <el-form-item label="培训课时(时):" prop="kctime">
                        <el-input v-model="addForm.kctime" :maxlength="5" placeholder="请填写培训课时"></el-input>
                    </el-form-item>
                    <el-form-item label="培训老师:" prop="kcshi">
                        <el-input v-model="addForm.kcshi" :maxlength="8" placeholder="请填写培训老师"></el-input>
                    </el-form-item>
                    <el-form-item label="培训地址:" prop="kcaddress">
                        <el-input v-model="addForm.kcaddress" :maxlength="40" placeholder="请填写培训地址"></el-input>
                    </el-form-item>
                    <el-form-item label="培训机构:" prop="kcjigou">
                        <el-input v-model="addForm.kcjigou" :maxlength="20" placeholder="请填写机构名称"></el-input>
                    </el-form-item> -->
                    <el-form-item label="培训内容:" prop="kccontent">
                        <el-input
                            type="textarea"
                            :maxlength="60"
                            v-model="addForm.kccontent"
                            placeholder="请填写培训内容"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="培训类别:" prop="kctype">
                        <el-select v-model="addForm.kctype" placeholder="请选择">
                            <el-option label="安全教育" value="安全教育"></el-option>
                            <el-option label="入场教育" value="入场教育"></el-option>
                            <el-option label="退场教育" value="退场教育"></el-option>
                            <el-option label="技能培养" value="技能培养"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="视频上传" prop="kcurl">
                      <UploadVideo @listenToChildEvent="listenToChildEvent" :licenceImg="addForm.kcurl" />
                    </el-form-item>
                    <div style="text-align:center">
                        <el-button type="primary" @click="addkecheng('addEditForm')">确定</el-button>
                        <el-button type="danger" @click="asd">取消</el-button>
                    </div>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import UploadVideo from './components/uploadVideo'

export default {
    name: 'lwguanli',
    components: { UploadVideo },
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
        var validatekctime = (rule, value, callback) => {
            const reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{1})))$/;
            if (!reg.test(value)) {
                callback(
                    new Error('请输入正确的课时(课时为数字,最多保留一位小数)')
                );
            } else {
                callback();
            }
        };
        return {
            addFormVisible: false,
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            istag: true,
            cid: this.$store.state.userData.cid,
            // 弹窗
            labelPosition: 'right',

            kcname: '', //"测试课程", 培训名称 必传
            kcshi: '', //"杨老师", 培训讲师
            kcjigou: '', //"郑州职腾教育培训", 培训机构
            kctime: '', //"2：00", 培训时长 必传
            kcaddress: '', //"升龙汇金广场907室", 培训地址
            kccontent: '', //"这是对于教育培训的测试", 培训内容
            kctype: '', //"培训类别" 培训类别 必传

            kechengname: '',
            selectXmid: '',
            formInline: {
                user1: '',
                user2: '',
                region: '',
            },
            tableDatap: [],
            addFormRules: {
                // kctime: [
                //     {
                //         required: true,
                //         validator: validatekctime,
                //         trigger: 'blur',
                //     },
                // ],
                kctype: [
                    {
                        required: true,
                        message: '培训类别不能为空',
                        trigger: ['blur', 'change'],
                    },
                ],
                // kcshi: [
                //     {
                //         required: true,
                //         message: '培训老师不能为空',
                //         trigger: 'blur',
                //     },
                // ],
                // kcjigou: [
                //     {
                //         required: true,
                //         message: '培训机构不能为空',
                //         trigger: 'blur',
                //     },
                // ],
                // kcaddress: [
                //     {
                //         required: true,
                //         message: '培训地址不能为空',
                //         trigger: 'blur',
                //     },
                // ],
                kccontent: [
                    {
                        required: true,
                        message: '培训内容不能为空',
                        trigger: 'blur',
                    },
                ],
                kcname: [
                    {
                        required: true,
                        message: '培训课程不能为空',
                        trigger: 'blur',
                    },
                ],
                kcurl: [
                  { required: true, message: '课程视频', trigger: 'blur' }
                ]
            },
            addForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                kcname: '',
                kcshi: '',
                kcjigou: '',
                kctime: '',
                kcaddress: '',
                kccontent: '',
                kctype: '',
                kcurl: ''
            },
        };
    },
    methods: {
        parentFn(msg) {
            this.selectXmid = msg;
        },
        asd() {
            this.addFormVisible = false;
        },
        addkc() {
            this.addFormVisible = true;
        },
        handleEdit(index) {
            axios
                .post(' /laowu_yun/deleteuserkc', {
                    id: index.kcid,
                    newuid: this.$store.state.userData.uid,
                })
                .then((res) => {
                    this.$alert('删除成功');
                    this.addlist();
                });
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
        addkecheng(formName) {
            // axios
            //     .post('/laowu_yun/useraddkc', {
            //         this.addForm
            //     })
            //     .then(res => {
            //         this.addlist();
            //         this.addFormVisible = false;
            //         this.kcname = '';
            //         this.kcshi = '';
            //         this.kcjigou = '';
            //         this.kcaddress = '';
            //         this.kccontent = '';
            //         this.kctype = '';
            //         this.kctime = '';
            //     });
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/laowu_yun/useraddkc', this.addForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.addlist();
                                this.addFormVisible = false;
                                this.addForm.kcname = '';
                                this.addForm.kcshi = '';
                                this.addForm.kcjigou = '';
                                this.addForm.kcaddress = '';
                                this.addForm.kccontent = '';
                                this.addForm.kctype = '';
                                this.addForm.kctime = '';
                            } else {
                                console.log('111');
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    // this.loaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        addlist(num) {
            axios
                .post('/laowu_yun/useraddkclist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    current_page: num,
                })
                .then((res) => {
                    this.tableDatap = res.data.content.list;

                    this.total = res.data.content.total;
                    this.pagesize = res.data.content.num;

                    this.currentPage = res.data.content.current_page;
                });
        },
        search(num) {
            axios
                .post('/laowu_yun/useraddkclist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    current_page: 1,
                    kcname: this.kechengname,
                })
                .then((res) => {
                    this.tableDatap = res.data.content.list;

                    this.total = res.data.content.total;
                    this.pagesize = res.data.content.num;

                    this.currentPage = res.data.content.current_page;
                });
        },
        dele(row) {
            console.log(row, column, event);
        },
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.addlist(val);
        },
        // 视频
        listenToChildEvent(val) {
          this.addForm.kcurl = val
          console.log(val, '视频')
        }
    },
    created() {
        this.addlist();
    },
};
</script>
<style lang="less">
body {
    .lwguanliDialog {
        .el-dialog {
            width: 600px;
        }
    }
}
#lwguanli {
    width: 100%;
    height: 100%;
    margin-top: 17px;
    overflow-y: auto;
    #Sm .bton {
        position: fixed;
        left: 280px;
        bottom: 20px;
    }
}
#lwguanli .cdiv1 {
    display: flex;
    width: 100% !important;
    height: 100%;
    .el-dialog {
        width: 600px !important;
    }
}
#lwguanli .cnavl {
    width: 240px !important;
}
#lwguanli .bg-purple-light {
    padding-left: 0;
    height: 100%;
}
#lwguanli .cnavl #Sm {
    width: 100% !important;
}

// #lwguanli .el-table .cell {
//     line-height: 20px !important;
// }
</style>


