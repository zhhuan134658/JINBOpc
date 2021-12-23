<template>
    <div id="bphubeicj">
        <!-- 湖北参建 -->

        <el-button
            type="primary"
            @click="goback"
            style="float:right;margin-bottom:10px;margin-left:10px"
        >返回</el-button>
        <el-button type="primary" @click="adddanwei" style="float:right;margin-bottom:10px">新增</el-button>
        <el-table :data="canjianData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="canjianname" label="参建单位名称"></el-table-column>
            <el-table-column prop="bzxinyongcode" label="企业联系人"></el-table-column>
            <el-table-column prop="canjianzzcode" label="参建单位类型" :formatter="formatCode"></el-table-column>
            <el-table-column prop="bzzhanghao" label="上报结果"></el-table-column>
            <el-table-column label="编辑">
                <template slot-scope="scope">
                    <el-button
                        @click="handleXiugai(scope.$index,scope.row)"
                        type="primary"
                        plain
                        size="small"
                    >修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            title="上报参建单位"
            :visible.sync="manyFormVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="hbcjDialog"
        >
            <div>
                <el-form
                    :model="manyForm"
                    :rules="manyFormRules"
                    ref="manyEditForm"
                    label-width="200px"
                    :label-position="labelPosition2"
                >
                    <el-form-item class="marginb" prop="companyName" label="企业名称：">
                        <el-input placeholder="请输入企业名称" v-model="manyForm.companyName"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="socialCreditNumber" label="统一社会信用代码：">
                        <el-input placeholder="请输入统一社会信用代码" v-model="manyForm.socialCreditNumber"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="contactPeopleName" label="企业联系人：">
                        <el-input placeholder="请输入企业联系人" v-model="manyForm.contactPeopleName"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="contactPeopleCellPhone" label="企业联系电话：">
                        <el-input placeholder="请输入企业联系电话" v-model="manyForm.contactPeopleCellPhone"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="cityNum" label="企业注册地区行政编码：">
                        <el-input placeholder="请输入企业注册地区行政编码" v-model="manyForm.cityNum"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="representativeName" label="法人姓名：">
                        <el-input placeholder="请输入法人姓名" v-model="manyForm.representativeName"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="representativePhone" label="法人手机号：">
                        <el-input placeholder="请输入法人手机号" v-model="manyForm.representativePhone"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="labour" label="劳资专管员姓名：">
                        <el-input placeholder="请输入劳资专管员姓名" v-model="manyForm.labour"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="labourPhone" label="劳资专管员电话：">
                        <el-input placeholder="请输入劳资专管员电话" v-model="manyForm.labourPhone"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="registeredCapital" label="保证金（万元）：">
                        <el-input placeholder="请输入保证金（万元）" v-model="manyForm.registeredCapital"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="createTime" label="注册日期：">
                        <el-date-picker
                            v-model="manyForm.createTime"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            @change="timeChange"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="marginb" prop="organizationType" label="单位性质：">
                        <el-input placeholder="请输入单位性质" v-model="manyForm.organizationType"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="address" label="企业地址：">
                        <el-input placeholder="请输入企业地址" v-model="manyForm.address"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            :loading="loaded"
                            @click="upBtn('manyEditForm')"
                        >立即上报</el-button>
                        <el-button @click="upCancel">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog
            title="修改上报单位"
            :visible.sync="editVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="hbcjDialog"
        >
            <div>
                <el-form
                    :model="editForm"
                    :rules="editFormRules"
                    ref="editEditForm"
                    label-width="200px"
                    :label-position="labelPosition"
                >
                    <el-form-item class="marginb" prop="companyName" label="企业名称：">
                        <el-input placeholder="请输入参建单位名称" v-model="editForm.companyName"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="socialCreditNumber" label="统一社会信用代码：">
                        <el-input placeholder="请输入统一社会信用代码" v-model="editForm.socialCreditNumber"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="contactPeopleName" label="企业联系人：">
                        <el-input placeholder="请输入企业联系人" v-model="editForm.contactPeopleName"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="contactPeopleCellPhone" label="企业联系电话：">
                        <el-input placeholder="请输入企业联系人" v-model="editForm.contactPeopleCellPhone"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="cityNum" label="企业注册地区行政编码：">
                        <el-input placeholder="请输入企业注册地区行政编码" v-model="editForm.cityNum"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="representativeName" label="法人姓名：">
                        <el-input placeholder="请输入法人姓名" v-model="editForm.representativeName"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="representativePhone" label="法人手机号：">
                        <el-input placeholder="请输入法人手机号" v-model="editForm.representativePhone"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="labour" label="劳资专管员姓名：">
                        <el-input placeholder="请输入劳资专管员姓名" v-model="editForm.labour"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="labourPhone" label="劳资专管员电话：">
                        <el-input placeholder="请输入劳资专管员电话" v-model="editForm.labourPhone"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="registeredCapital" label="保证金（万元）：">
                        <el-input placeholder="请输入保证金（万元）" v-model="editForm.registeredCapital"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="createTime" label="注册日期：">
                        <el-date-picker
                            v-model="editForm.createTime"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            @change="timeChange"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="marginb" prop="organizationType" label="单位性质：">
                        <el-input placeholder="请输入单位性质" v-model="editForm.organizationType"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="address" label="企业地址：">
                        <el-input placeholder="请输入企业地址" v-model="editForm.address"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            :loading="loaded"
                            @click="editBtn('editEditForm')"
                        >立即上报</el-button>
                        <el-button @click="editCancel">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
   
<script>
import axios from 'axios';
export default {
    data() {
        const validatepphone = (rule, value, callback) => {
            if (value) {
                const reg = /^1\d{10}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            } else {
                callback(new Error('手机号不能为空'));
            }
        };
        return {
            cid: this.$store.state.userData.cid,
            manyFormVisible: false,
            editVisible: false,
            isFail: false,
            failMsg: '',
            canjianData: [],
            labelPosition: 'right',
            labelPosition2: 'right',
            manyForm: {
                 newuid:this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: this.$route.query.xmid,
                canjianzzcode: '',
                socialCreditNumber: '',
                companyName: ''
            },
            typeList: [
                {
                    name: '是',
                    id: '是'
                },
                {
                    name: '否',
                    id: '否'
                }
            ],
            editForm: {
                 newuid:this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: this.$route.query.xmid,
                canjianzzcode: '',
                socialCreditNumber: '',
                cjid: '',
                companyName: ''
            },
            manyFormRules: {
                companyName: [
                    {
                        required: true,
                        message: '企业名称不能为空',
                        trigger: 'blur'
                    }
                ],
                socialCreditNumber: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                contactPeopleName: [
                    {
                        required: true,
                        message: '企业联系人不能为空',
                        trigger: 'blur'
                    }
                ],
                contactPeopleCellPhone: [
                    {
                        required: true,
                        validator: '企业联系电话不能为空',
                        trigger: 'blur'
                    }
                ],
                cityNum: [
                    {
                        required: true,
                        message: '企业注册地区行政编码不能为空',
                        trigger: 'blur'
                    }
                ],
                representativeName: [
                    {
                        required: true,
                        message: '法人姓名不能为空',
                        trigger: 'blur'
                    }
                ],
                representativePhone: [
                    {
                        required: true,
                        validator: '法人手机号不能为空',
                        trigger: 'blur'
                    }
                ],
                labour: [
                    {
                        required: true,
                        message: '劳资专管员姓名不能为空',
                        trigger: 'blur'
                    }
                ],
                labourPhone: [
                    {
                        required: true,
                        validator: '劳资专管员电话不能为空',
                        trigger: 'blur'
                    }
                ],
                registeredCapital: [
                    {
                        required: true,
                        message: '保证金不能为空',
                        trigger: 'blur'
                    }
                ],
                createTime: [
                    {
                        required: true,
                        message: '注册日期不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                organizationType: [
                    {
                        required: true,
                        message: '单位性质不能为空',
                        trigger: 'blur'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '企业地址不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            editFormRules: {
                companyName: [
                    {
                        required: true,
                        message: '企业名称不能为空',
                        trigger: 'blur'
                    }
                ],
                socialCreditNumber: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                contactPeopleName: [
                    {
                        required: true,
                        message: '企业联系人不能为空',
                        trigger: 'blur'
                    }
                ],
                contactPeopleCellPhone: [
                    {
                        required: true,
                        validator: '企业联系电话不能为空',
                        trigger: 'blur'
                    }
                ],
                cityNum: [
                    {
                        required: true,
                        message: '企业注册地区行政编码不能为空',
                        trigger: 'blur'
                    }
                ],
                representativeName: [
                    {
                        required: true,
                        message: '法人姓名不能为空',
                        trigger: 'blur'
                    }
                ],
                representativePhone: [
                    {
                        required: true,
                        validator: '法人手机号不能为空',
                        trigger: 'blur'
                    }
                ],
                labour: [
                    {
                        required: true,
                        message: '劳资专管员姓名不能为空',
                        trigger: 'blur'
                    }
                ],
                labourPhone: [
                    {
                        required: true,
                        validator: '劳资专管员电话不能为空',
                        trigger: 'blur'
                    }
                ],
                registeredCapital: [
                    {
                        required: true,
                        message: '保证金不能为空',
                        trigger: 'blur'
                    }
                ],
                createTime: [
                    {
                        required: true,
                        message: '注册日期不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                organizationType: [
                    {
                        required: true,
                        message: '单位性质不能为空',
                        trigger: 'blur'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '企业地址不能为空',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },

    methods: {
        formatCode(row) {
            if (row.canjianzzcode == '001') {
                return '专业分包';
            } else if (row.canjianzzcode == '002') {
                return '设备分包';
            } else if (row.canjianzzcode == '003') {
                return '材料分包';
            } else if (row.canjianzzcode == '004') {
                return '后勤服务';
            } else if (row.canjianzzcode == '005') {
                return '特殊设备';
            } else if (row.canjianzzcode == '006') {
                return '劳务分包';
            } else if (row.canjianzzcode == '007') {
                return '监理';
            } else if (row.canjianzzcode == '008') {
                return '建设单位';
            } else if (row.canjianzzcode == '009') {
                return '总承包单位';
            } else if (row.canjianzzcode == '010') {
                return '勘察';
            } else if (row.canjianzzcode == '011') {
                return '设计单位';
            } else if (row.canjianzzcode == '012') {
                return '其他';
            }
        },
        goback() {
            // this.$router.push({ path: '/bpxq' });
            this.$router.go(-1);
        },
        handleXiugai(index, row) {
            this.getDetail(row.cjid);
            this.editVisible = true;
        },
        adddanwei() {
            this.manyFormVisible = true;
            this.manyForm.xmid = this.$route.query.xmid;
            this.manyForm.corp_id = this.cid;
        },
        getDetail(id) {
            axios
                .post('/laowu_yun/huquxiangmuxinxi', {
                    cjid: id,
                     newuid:this.$store.state.userData.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.editForm = res.data.content;
                        this.editForm.xmid = this.$route.query.xmid;
                        this.editForm.corp_id = this.cid;
                    } else {
                        this.$alert(res.data.msg);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        getTable() {
            axios
                .post('/baopan/teamxinxilist', {
                    corp_id: this.cid,
                     newuid:this.$store.state.userData.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.canjianData = res.data.content;
                        // this.manyForm =
                    } else {
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        upCancel() {
            this.$refs.manyEditForm.resetFields();
            this.manyFormVisible = false;
        },
        upBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate(valid => {
                if (valid) {
                    axios
                        .post(
                            '/laowu_yun/shangbaohubeicanjiandanweixinxi ',
                            that.manyForm
                        )
                        .then(res => {
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
                        .catch(function(error) {
                            console.log(error);
                        });
                } else {
                    that.loaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        editCancel() {
            this.$refs.editEditForm.resetFields();
            this.editVisible = false;
        },
        editBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate(valid => {
                if (valid) {
                    axios
                        .post(
                            '/laowu_yun/shangbaohubeicanjiandanweixinxi ',
                            that.editForm
                        )
                        .then(res => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                // that.$refs.manyEditForm.resetFields();
                                that.editVisible = false;
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
                        .catch(function(error) {
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
        this.getTable();
    }
};
</script>
<style lang="less">
body {
    .hbcjDialog {
        .el-dialog {
            width: 600px;
            .el-select {
                width: 100%;
            }
            .el-date-editor {
                width: 100%;
            }
        }
        .marginb {
            margin-bottom: 15px;
        }
    }
}
.cell {
    text-align: center;
}
#bphubeicj {
    padding: 10px;
    .marginb {
        margin-bottom: 15px;
    }
}
</style>