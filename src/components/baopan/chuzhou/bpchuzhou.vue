<template>
    <div id="bpchuzhou">
        <!-- 滁州报盘 -->
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
                    src="../../../../static/images/write.png"
                    alt
                />
                <div style="font-size: 16px">请选择项目</div>
            </div>
        </div>
        <!-- 添加公司信息 -->
        <div v-show="viwePage">
            <el-table :data="baopanData" border style="width: 100%">
                <el-table-column prop="name" label="项目名称">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.name }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{
                                    scope.row.name
                                }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ptname"
                    label="绑定平台"
                ></el-table-column>
                <el-table-column label="上报接口设置">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleXiangmu(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >接口信息</el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column label="上报项目信息">
                    <template slot-scope="scope">
                        <el-button
                            @click="sendXiangmu(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >上报项目信息</el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleBanzu(scope.$index, scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >班组上报</el-button
                        >
                        <el-button
                            @click="watchErrorDetail(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >考勤再次上报</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                title="修改上报接口"
                :visible.sync="manyFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="bpPublcDialog"
            >
                <div>
                    <el-form
                        :model="manyForm"
                        :rules="manyFormRules"
                        ref="manyEditForm"
                        :label-position="right"
                        label-width="130px"
                    >
                        <el-form-item
                            class="marginb"
                            prop="zhanghao"
                            label="企业名称："
                        >
                            <el-input
                                placeholder="请输入企业名称"
                                v-model="manyForm.zhanghao"
                                maxlength="30"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            prop="zongbaoname"
                            label="企业类型："
                        >
                            <el-select
                                v-model="manyForm.zongbaoname"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            prop="password"
                            label="企业信用代码："
                        >
                            <el-input
                                placeholder="请输入企业信用代码"
                                v-model="manyForm.password"
                            ></el-input>
                        </el-form-item>
                        <div
                            v-if="isFail"
                            style="
                                width: 80%;
                                margin: 0 auto;
                                height: 40px;
                                line-height: 40px;
                                text-align: center;
                                color: red;
                            "
                        >
                            {{ failMsg }}
                        </div>
                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="upBtn('manyEditForm')"
                                >立即上报</el-button
                            >
                            <el-button @click="upCancel">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog
                title="上报项目信息"
                :visible.sync="addFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="bpPublcDialog"
            >
                <div>
                    <el-form
                        :model="addForm"
                        :rules="addFormRules"
                        ref="addEditForm"
                        :label-position="right"
                        label-width="130px"
                    >
                        <el-form-item
                            class="marginb"
                            prop="Name"
                            label="项目名称："
                        >
                            <el-input
                                placeholder="请输入项目名称"
                                v-model="addForm.Name"
                                maxlength="30"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            prop="Nature"
                            label="项目性质："
                        >
                            <el-select
                                v-model="addForm.Nature"
                                placeholder="请选择"
                            >
                                <el-option
                                    label="市场"
                                    value="市场"
                                ></el-option>
                                <el-option
                                    label="政府"
                                    value="政府"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            prop="LicenseId"
                            label="施工许可证号："
                        >
                            <el-input
                                placeholder="请输入施工许可证号"
                                v-model="addForm.LicenseId"
                                maxlength="30"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            prop="Area"
                            label="所属区域："
                        >
                            <el-select
                                v-model="addForm.Area"
                                placeholder="请选择"
                            >
                                <el-option
                                    label="市本级（琅琊区）"
                                    value="市本级（琅琊区）"
                                ></el-option>
                                <el-option
                                    label="南谯区"
                                    value="南谯区"
                                ></el-option>
                                <el-option
                                    label="全椒县"
                                    value="全椒县"
                                ></el-option>
                                <el-option
                                    label="来安县"
                                    value="来安县"
                                ></el-option>
                                <el-option
                                    label="定远县"
                                    value="定远县"
                                ></el-option>
                                <el-option
                                    label="凤阳县"
                                    value="凤阳县"
                                ></el-option>
                                <el-option
                                    label="天长市"
                                    value="天长市"
                                ></el-option>
                                <el-option
                                    label="明光市"
                                    value="明光市"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            prop="ConstructCompany"
                            label="建设单位："
                        >
                            <el-input
                                placeholder="请输入建设单位"
                                v-model="addForm.ConstructCompany"
                                maxlength="30"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            prop="TurnkeyCompany"
                            label="总承包单位："
                        >
                            <el-input
                                placeholder="请输入总承包单位"
                                v-model="addForm.TurnkeyCompany"
                                maxlength="30"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="开工日期：" class="marginb">
                            <el-date-picker
                                v-model="addForm.StartWorkDate"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item
                            label="计划开工时间："
                            prop="PlanStartWorkDate"
                        >
                            <el-date-picker
                                v-model="addForm.PlanStartWorkDate"
                                @change="startTime"
                                :picker-options="pickerStart"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item
                            label="计划竣工时间："
                            prop="PlanEndWorkDate"
                        >
                            <el-date-picker
                                v-model="addForm.PlanEndWorkDate"
                                @change="endTime"
                                :picker-options="pickerEnd"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            prop="ProjectState"
                            label="项目状态："
                        >
                            <el-select
                                v-model="addForm.ProjectState"
                                placeholder="请选择"
                            >
                                <el-option
                                    label="未开工"
                                    value="未开工"
                                ></el-option>
                                <el-option
                                    label="在建"
                                    value="在建"
                                ></el-option>
                                <el-option
                                    label="竣工"
                                    value="竣工"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            prop="LaborIdCard"
                            label="劳资专管员身份证号码："
                        >
                            <el-input
                                placeholder="请输入劳资专管员身份证号码"
                                v-model="addForm.LaborIdCard"
                                maxlength="18"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="sendBtn('addEditForm')"
                                >立即上报</el-button
                            >
                            <el-button @click="sendCancel">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog
                title="今日考勤失败记录"
                :visible.sync="watchErrorDetailVisible"
                :append-to-body="true"
                class="corpkaoqin"
            >
                <div style="margin-bottom: 20px">
                    <el-button type="primary" plain @click="upAgain"
                        >再次上报</el-button
                    >
                </div>
                <el-table
                    :data="watchErrorDetailList"
                    border
                    style="width: 100%"
                >
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column
                        prop="date"
                        label="打卡时间"
                    ></el-table-column>
                    <el-table-column
                        prop="type"
                        label="上报结果"
                    ></el-table-column>
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
            </el-dialog>
        </div>
    </div>
</template>
   
<script>
import axios from 'axios';
export default {
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
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            manyFormVisible: false,
            canjianVisible: false,
            baopanData: [],
            isTest: ['1'],
            viwePage: false,
            warnPage: true,
            manyForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                zhanghao: '',
                zongbaoname: '',
                password: ''
            },
            addForm: {
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                Name: '',
                Nature: '',
                LicenseId: '',
                Area: '',
                ConstructCompany: '',
                TurnkeyCompany: '',
                StartWorkDate: '',
                PlanEndWorkDate: '',
                ProjectState: '',
                LaborIdCard: ''
            },
            cid: this.$store.state.userData.cid,
            isFail: false,
            addFormVisible: false,
            watchErrorDetailVisible: false,
            watchErrorDetailList: [],
            failMsg: '',
            options: [
                { label: '建设企业', value: '建设企业' },
                { label: '施工企业', value: '施工企业' }
            ],
            manyFormRules: {
                zhanghao: [
                    {
                        required: true,
                        message: '企业名称不能为空',
                        trigger: 'blur'
                    }
                ],
                zongbaoname: [
                    {
                        required: true,
                        message: '企业类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '企业信用代码不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            addFormRules: {
                Name: [
                    {
                        required: true,
                        message: '项目名称不能为空',
                        trigger: 'blur'
                    }
                ],
                Nature: [
                    {
                        required: true,
                        message: '项目性质不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                Area: [
                    {
                        required: true,
                        message: '所属区域不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                LicenseId: [
                    {
                        required: true,
                        message: '施工许可证号不能为空',
                        trigger: 'blur'
                    }
                ],
                ConstructCompany: [
                    {
                        required: true,
                        message: '建设单位不能为空',
                        trigger: 'blur'
                    }
                ],
                TurnkeyCompany: [
                    {
                        required: true,
                        message: '总承包单位不能为空',
                        trigger: 'blur'
                    }
                ],
                PlanStartWorkDate: [
                    {
                        required: true,
                        message: '计划开工日期不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                PlanEndWorkDate: [
                    {
                        required: true,
                        message: '计划竣工日期不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                Nature: [
                    {
                        required: true,
                        message: '项目状态不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                LaborIdCard: [
                    {
                        required: true,
                        message: '劳资专管员身份证号码不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            xmid: ''
        };
    },

    methods: {
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getErrorDataList();
        },
        watchErrorDetail(row) {
            this.getErrorDataList();
            this.watchErrorDetailVisible = true;
            this.xmid = row.xmid;
        },
        // 再次上报考勤
        upAgain() {
            axios
                .post('/newbao/kaoqinerrorupdate', {
                    corp_id: this.cid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.currentPage = 1;
                        this.getErrorDataList();
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //获取考勤失败记录
        getErrorDataList() {
            axios
                .post('/newbao/kaoqinerror', {
                    current_page: this.currentPage,
                    corp_id: this.cid,
                    xmid: this.xmid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.watchErrorDetailList = res.data.content.list;
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.currentPage = res.data.content.current_page;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        startTime: function (value) {
            this.addForm.PlanStartWorkDate = value;
        },
        // 时间结束选择器
        endTime: function (value) {
            this.addForm.PlanEndWorkDate = value;
        },
        // 上报企业
        handleXiangmu(row) {
            this.xmid = row.xmid;
            this.getMsg();
            this.manyFormVisible = true;
        },
        sendXiangmu(row) {
            this.addForm.xmid = row.xmid;
            this.getInfo();
            this.addFormVisible = true;
        },
        handleBanzu(index, row) {
            // if (!this.manyForm.zhanghao) {
            //     this.$alert('请先修改接口！');
            // } else {
            this.$store.commit('setbpXmTable', row.address);
            // this.$store.commit('setbpXmCode', this.manyForm.zhanghao);
            this.$router.push({
                path: '/bpchuzhoubz',
                query: {
                    xmid: row.xmid,
                    // prcode: this.manyForm.zhanghao,
                    address: row.address
                }
            });
            // }
        },
        //项目数据回显
        getInfo() {
            axios
                .post('/lianxi/projectecho', {
                    corp_id: this.cid,
                    xmid: this.xmid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        if (res.data.content.Name) {
                            this.addForm = JSON.parse(
                                JSON.stringify(res.data.content)
                            );
                        }

                        console.log('999+++' + this.addForm);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //企业数据回显
        getMsg() {
            axios
                .post('/lianxi/Informationecho', {
                    corp_id: this.cid,
                    xmid: this.xmid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        if (res.data.content) {
                            this.manyForm.zhanghao = res.data.content.zhanghao;
                            this.manyForm.zongbaoname =
                                res.data.content.zongbaoname;
                            this.manyForm.password = res.data.content.password;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getTable() {
            this.manyForm.xmid = this.xmid;
            axios
                .post('/baopan/projectsbxinxilist', {
                    corp_id: this.cid,
                    xmid: this.xmid,
                    newuid: this.$store.state.userData.uid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.baopanData = res.data.content;
                        this.manyForm.corp_id = this.$store.state.userData.cid;
                        this.manyForm.xmid = this.xmid;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        upCancel() {
            this.manyFormVisible = false;
        },
        sendCancel() {
            this.addFormVisible = false;
        },
        upBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/lianxi/enterprisedata', that.manyForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                // that.$refs.manyEditForm.resetFields();
                                that.manyFormVisible = false;
                                that.$message({
                                    message: '上报成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success'
                                });
                                that.getTable();
                            } else {
                                that.loaded = false;
                                that.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning'
                                });
                            }
                        })
                        .catch(function (error) {
                            that.loaded = false;
                            console.log(error);
                        });
                } else {
                    that.loaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        sendBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/czbaopan/chuzhouUploadproject', that.addForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.$refs.addEditForm.resetFields();
                                that.addFormVisible = false;
                                that.$message({
                                    message: '上报成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success'
                                });
                                that.getTable();
                            } else {
                                that.loaded = false;
                                that.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning'
                                });
                            }
                        })
                        .catch(function (error) {
                            that.loaded = false;
                            console.log(error);
                        });
                } else {
                    that.loaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    mounted() {
        if (this.xmid) {
            this.warnPage = false;
            this.viwePage = true;

            this.getTable();
        }
        if (this.$route.query.test) {
            this.isTest = [];
            this.$emit('getChild3', this.isTest);
        }
    },
    watch: {
        isTable: {
            handler(newValue, oldValue) {
                if (newValue.length > 0) {
                    this.warnPage = false;
                    this.viwePage = true;
                    // this.searchform.name = '';
                    this.getTable();
                    // this.isTable = ['1'];
                    this.$emit('getChild2', this.isTable);
                }
            },
            deep: true
        }
    },
    computed: {
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.addForm.PlanEndWorkDate;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            };
        },
        pickerEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.addForm.PlanStartWorkDate;
                    if (beginDateVal) {
                        return (
                            // time.getTime() < Date.now() - 8.64e7 ||
                            time.getTime() <
                            new Date(beginDateVal).getTime() - 8.64e7
                        );
                    }
                }
            };
        }
    }
};
</script>
<style lang="less">
.cell {
    text-align: center;
}
#bpchuzhou {
    height: 100%;
    padding: 10px;
    .marginb {
        margin-bottom: 15px;
    }
}
</style>