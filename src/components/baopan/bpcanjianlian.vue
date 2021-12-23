<template>
    <div id="bpcj">
        <!-- 参建连州 -->

        <el-button
            type="primary"
            @click="goback"
            style="float:right;margin-bottom:10px;margin-left:10px"
        >返回</el-button>
        <el-button type="primary" @click="adddanwei" style="float:right;margin-bottom:10px">新增</el-button>
        <el-table :data="canjianData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="corpName" label="参建单位名称"></el-table-column>
            <el-table-column prop="inviteType" label="参建单位类型" :formatter="formatCode"></el-table-column>
            <el-table-column prop="jieguo" label="上报结果"></el-table-column>
            <el-table-column label="编辑">
                <template slot-scope="scope">
                    <el-button
                        v-if="scope.row.jieguo == '上报失败'"
                        @click="handleXiugai(scope.row)"
                        type="primary"
                        plain
                        size="small"
                    >再次上报</el-button>
                    <el-button v-else type="info" plain size="small">再次上报</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="上报参建单位"
            :visible.sync="manyFormVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="liancjDialog"
        >
            <div>
                <div style="height: 40px;text-align: center;">
                    <span style="color:red;">*</span>请确保填写正确，如需修改请去政府平台
                </div>
                <el-form
                    :model="manyForm"
                    :rules="manyFormRules"
                    ref="manyEditForm"
                    label-width="170px"
                    :label-position="labelPosition"
                >
                    <el-form-item class="marginb" prop="corpName" label="参建单位名称：">
                        <el-input placeholder="请输入参建单位名称" v-model="manyForm.corpName"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="corpCode" label="参建单位信用代码：">
                        <el-input placeholder="请输入参建单位信用代码" v-model="manyForm.corpCode"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="inviteType" label="参建单位类型：">
                        <el-select
                            style="width:100%"
                            v-model="manyForm.inviteType"
                            placeholder="请选择参建单位类型"
                        >
                            <el-option
                                v-for="item in typeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公司注册地所在地：" prop="regAreaCode" style="width:100%">
                        <el-cascader
                            v-model="manyForm.regAreaCode"
                            :options="cityOptions"
                            @change="handleChange"
                            style="width:100%"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item class="marginb" prop="contactAddress" label="营业地址：">
                        <el-input placeholder="请输入营业地址" v-model="manyForm.contactAddress"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="regCapital" label="注册资本（万元）：">
                        <el-input placeholder="请输入注册资本" v-model.number="manyForm.regCapital"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="factRegCapital" label="实收资本（万元）：">
                        <el-input placeholder="请输入实收资本" v-model.number="manyForm.factRegCapital"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="capitalCurrencyType" label="注册资本币种：">
                        <el-select
                            style="width:100%"
                            v-model="manyForm.capitalCurrencyType"
                            placeholder="请选择注册资本币种"
                        >
                            <el-option
                                v-for="item in moneyList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="marginb" prop="regDate" label="注册日期：">
                        <el-date-picker
                            style="width:100%"
                            v-model="manyForm.regDate"
                            :picker-options="pickerStart"
                            type="date"
                            placeholder="选择注册日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="marginb" prop="officePhone" label="办公电话：">
                        <el-input
                            placeholder="请输入办公电话"
                            v-model="manyForm.officePhone"
                            max-length="11"
                        ></el-input>
                    </el-form-item>
                    <div
                        v-if="isFail"
                        style="width:80%;margin:0 auto;height:40px;line-height:40px;text-align:center;color:red;"
                    >{{failMsg}}</div>
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
            class="liancjDialog"
        >
            <div>
                <div style="height: 40px;text-align: center;">
                    <span style="color:red;">*</span>请确保填写正确，如需修改请去政府平台
                </div>
                <el-form
                    :model="editForm"
                    :rules="editFormRules"
                    ref="editEditForm"
                    label-width="150px"
                    :label-position="labelPosition"
                >
                    <el-form-item class="marginb" prop="corpName" label="参建单位名称：">
                        <el-input placeholder="请输入参建单位名称" v-model="editForm.corpName"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="corpCode" label="参建单位信用代码：">
                        <el-input placeholder="请输入参建单位信用代码" v-model="editForm.corpCode"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="inviteType" label="参建单位类型：">
                        <el-select
                            style="width:100%"
                            v-model="editForm.inviteType"
                            placeholder="请选择参建单位类型"
                        >
                            <el-option
                                v-for="item in typeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公司注册地所在地：" prop="regAreaCode" style="width:100%">
                        <el-cascader
                            v-model="editForm.regAreaCode"
                            :options="cityOptions"
                            @change="handleChange"
                            style="width:100%"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item class="marginb" prop="contactAddress" label="营业地址：">
                        <el-input placeholder="请输入营业地址" v-model="editForm.contactAddress"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="regCapital" label="注册资本（万元）：">
                        <el-input placeholder="请输入注册资本" v-model.number="editForm.regCapital"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="factRegCapital" label="实收资本（万元）：">
                        <el-input placeholder="请输入实收资本" v-model.number="editForm.factRegCapital"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="capitalCurrencyType" label="注册资本币种：">
                        <el-select
                            style="width:100%"
                            v-model="editForm.capitalCurrencyType"
                            placeholder="请选择注册资本币种"
                        >
                            <el-option
                                v-for="item in moneyList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="marginb" prop="regDate" label="注册日期：">
                        <el-date-picker
                            style="width:100%"
                            v-model="editForm.regDate"
                            :picker-options="pickerStart"
                            type="date"
                            placeholder="选择注册日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="marginb" prop="officePhone" label="办公电话：">
                        <el-input
                            placeholder="请输入办公电话"
                            v-model="editForm.officePhone"
                            max-length="11"
                        ></el-input>
                    </el-form-item>

                    <div
                        v-if="isFail"
                        style="width:80%;margin:0 auto;height:40px;line-height:40px;text-align:center;color:red;"
                    >{{failMsg}}</div>
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
import citydata from '../common/citycode.json';
export default {
    data() {
        var validatepphone = (rule, value, callback) => {
            // if (value) {
            const reg = /^1\d{10}$/;
            if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
            // } else {
            //     callback(new Error('请输入正确的手机号'));
            // }
        };
        return {
            cid: this.$store.state.userData.cid,
            manyFormVisible: false,
            editVisible: false,
            isFail: false,
            failMsg: '',
            labelPosition: 'right',
            canjianData: [],
            citydata: [],
            manyForm: {
                 newuid:this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: this.$route.query.xmid,
                corpName: '',
                inviteType: '',
                corpCode: '',
                regAreaCode: [],
                contactAddress: '',
                regCapital: '',
                factRegCapital: '',
                capitalCurrencyType: '',
                regDate: '',
                officePhone: ''
            },
            editForm: {
                 newuid:this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: this.$route.query.xmid,
                corpName: '',
                inviteType: '',
                corpCode: '',
                regAreaCode: [],
                contactAddress: '',
                regCapital: '',
                factRegCapital: '',
                capitalCurrencyType: '',
                regDate: '',
                officePhone: '',
                cjid: ''
            },
            cjList: [],
            manyFormRules: {
                corpName: [
                    {
                        required: true,
                        message: '参建单位名称不能为空',
                        trigger: 'blur'
                    }
                ],
                contactAddress: [
                    {
                        required: true,
                        message: '营业地址不能为空',
                        trigger: 'blur'
                    }
                ],
                inviteType: [
                    {
                        required: true,
                        message: '参建单位类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                corpCode: [
                    {
                        required: true,
                        message: '参建单位信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                regCapital: [
                    {
                        required: true,
                        message: '注册资本不能为空'
                    },
                    { type: 'number', message: '注册资本必须为数字值' }
                ],
                factregCapital: [
                    {
                        required: true,
                        message: '实收资本不能为空',
                        trigger: 'blur'
                    },
                    { type: 'number', message: '实收资本必须为数字值' }
                ],
                capitalCurrencyType: [
                    {
                        required: true,
                        message: '注册资本币种不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                regDate: [
                    {
                        required: true,
                        message: '时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                regAreaCode: [
                    {
                        required: true,
                        message: '公司注册地所在地不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                officePhone: [
                    {
                        required: true,
                        validator: validatepphone,
                        trigger: 'blur'
                    }
                ]
            },
            editFormRules: {
                corpName: [
                    {
                        required: true,
                        message: '参建单位名称不能为空',
                        trigger: 'blur'
                    }
                ],
                contactAddress: [
                    {
                        required: true,
                        message: '营业地址不能为空',
                        trigger: 'blur'
                    }
                ],
                inviteType: [
                    {
                        required: true,
                        message: '参建单位类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                corpCode: [
                    {
                        required: true,
                        message: '参建单位信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                regCapital: [
                    {
                        required: true,
                        message: '注册资本不能为空'
                    },
                    { type: 'number', message: '注册资本必须为数字值' }
                ],
                factregCapital: [
                    {
                        required: true,
                        message: '实收资本不能为空',
                        trigger: 'blur'
                    },
                    { type: 'number', message: '实收资本必须为数字值' }
                ],
                capitalCurrencyType: [
                    {
                        required: true,
                        message: '注册资本币种不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                regDate: [
                    {
                        required: true,
                        message: '时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                regAreaCode: [
                    {
                        required: true,
                        message: '公司注册地所在地不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                officePhone: [
                    {
                        required: true,
                        validator: validatepphone,
                        trigger: 'blur'
                    }
                ]
            },
            moneyList: [
                { id: '156', name: '人民币元' },
                { id: '250', name: '法国法郎' },
                { id: '344', name: '香港元' },
                { id: '360', name: '卢比' },
                { id: '392', name: '日元' },
                { id: '446', name: '澳门元' },
                { id: '643', name: '俄罗斯卢比' },
                { id: '826', name: '英镑' },
                { id: '840', name: '美元' }
            ],
            typeList: [
                {
                    name: '专业分包',
                    id: '001'
                },

                {
                    name: '劳务分包',
                    id: '006'
                }
            ]
        };
    },

    methods: {
        formatCode(row) {
            if (row.inviteType == '001') {
                return '专业分包';
            } else if (row.inviteType == '006') {
                return '劳务分包';
            }
        },
        goback() {
            this.$router.go(-1);
        },
        handleXiugai(row) {
            this.editVisible = true;
            this.editForm.cjid = row.cjid;
            this.editForm.corpName = row.corpName;
            this.editForm.inviteType = row.inviteType;
            this.editForm.corpCode = row.corpCode;
            this.editForm.regAreaCode = row.regAreaCode;
            this.editForm.contactAddress = row.contactAddress;
            this.editForm.regCapital = row.regCapital;
            this.editForm.factRegCapital = row.factRegCapital;
            this.editForm.capitalCurrencyType = row.capitalCurrencyType;
            this.editForm.regDate = row.regDate;
            this.editForm.officePhone = row.officePhone;
        },
        handleChange(val) {
            this.manyForm.regAreaCode = val;
        },
        adddanwei() {
            this.manyFormVisible = true;
        },
        getTable() {
            axios
                .post('/baopan/CanJianlist', {
                    corp_id: this.cid,
                    xmid: this.$route.query.xmid,
                     newuid:this.$store.state.userData.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.canjianData = res.data.content;
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
                        .post('/baopan/CanJianAdd', that.manyForm)
                        .then(res => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.$refs.manyEditForm.resetFields();
                                that.manyFormVisible = false;
                                that.getTable();
                                that.isFail = false;
                                that.failMsg = '';
                            } else {
                                that.isFail = true;
                                that.failMsg = res.data.msg;
                                that.loaded = false;
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
                        .post('/baopan/CanJianAdd', that.editForm)
                        .then(res => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                // that.$refs.manyEditForm.resetFields();
                                that.editVisible = false;
                                that.getTable();
                                that.isFail = false;
                                that.failMsg = '';
                            } else {
                                that.isFail = true;
                                that.failMsg = res.data.msg;
                                that.loaded = false;
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
    created() {
        this.cityOptions = citydata;
    },
    mounted() {
        this.getTable();
    }
};
</script>
<style lang="less">
body {
    .liancjDialog {
        .marginb {
            margin-bottom: 15px;
        }
    }
}
.cell {
    text-align: center;
}
#bpcj {
    padding: 10px;
}
</style>