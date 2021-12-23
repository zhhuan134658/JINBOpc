<template>
    <div id="bpningbocj">
        <!-- 宁波参建 -->

        <el-button
            type="primary"
            @click="goback"
            style="float:right;margin-bottom:10px;margin-left:10px"
        >返回</el-button>
        <el-button type="primary" @click="adddanwei" style="float:right;margin-bottom:10px">新增</el-button>
        <el-table :data="canjianData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="bzzhanghao" label="分包单位名称"></el-table-column>
            <el-table-column prop="bzpassword" label="统一社会信用代码"></el-table-column>
            <el-table-column prop="canjianzzcode" label="企业所在地"></el-table-column>
            <el-table-column prop="bzxinyongcode" label="联系人"></el-table-column>
            <el-table-column prop="canjianname" label="手机号码"></el-table-column>
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
            class="fjcjDialog"
        >
            <div>
                <el-form
                    :model="manyForm"
                    :rules="manyFormRules"
                    ref="manyEditForm"
                    label-width="150px"
                    :label-position="labelPosition2"
                >
                    <el-form-item class="marginb" prop="bzzhanghao" label="分包单位名称：">
                        <el-input
                            :maxlength="50"
                            placeholder="请输入分包单位名称"
                            v-model="manyForm.bzzhanghao"
                        ></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="bzpassword" label="统一社会信用代码：">
                        <el-input
                            :maxlength="30"
                            placeholder="请输入统一社会信用代码"
                            v-model="manyForm.bzpassword"
                        ></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="canjianzzcode" label="企业所在地：">
                        <el-select v-model="manyForm.canjianzzcode" placeholder="请选择企业所在地">
                            <el-option
                                v-for="item in addressList"
                                :key="item"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="marginb" prop="bzxinyongcode" label="联系人：">
                        <el-input
                            :maxlength="5"
                            placeholder="请输入联系人"
                            v-model="manyForm.bzxinyongcode"
                        ></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="canjianname" label="手机号码：">
                        <el-input
                            placeholder="请输入手机号码"
                            :maxlength="11"
                            type="numble"
                            v-model="manyForm.canjianname"
                        ></el-input>
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
            class="fjcjDialog"
        >
            <div>
                <el-form
                    :model="editForm"
                    :rules="editFormRules"
                    ref="editEditForm"
                    label-width="150px"
                    :label-position="labelPosition"
                >
                    <el-form-item class="marginb" prop="bzzhanghao" label="分包单位名称：">
                        <el-input  :maxlength="50" placeholder="请输入分包单位名称" v-model="editForm.bzzhanghao"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="bzpassword" label="统一社会信用代码:">
                        <el-input  :maxlength="30" placeholder="请输入统一社会信用代码" v-model="editForm.bzpassword"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="canjianzzcode" label="企业所在地:">
                        <el-select v-model="editForm.canjianzzcode" placeholder="请选择企业所在地">
                            <el-option
                                v-for="item in addressList"
                                :key="item"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="marginb" prop="bzxinyongcode" label="联系人:">
                        <el-input  :maxlength="5" placeholder="请输入联系人" v-model="editForm.bzxinyongcode"></el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="canjianname" label="手机号码:">
                        <el-input
                         :maxlength="11"
                            placeholder="请输入手机号码"
                            type="numble"
                            v-model="editForm.canjianname"
                        ></el-input>
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
        var validatepphone = (rule, value, callback) => {
            if (value) {
                const reg = /^1\d{10}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            addressList:"",
            cid: this.$store.state.userData.cid,
            manyFormVisible: false,
            editVisible: false,
            isFail: false,
            failMsg: '',
            canjianData: [],
            labelPosition: 'right',
            labelPosition2: 'right',
            loaded: false,
            manyForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: this.$route.query.xmid,
                bzzhanghao: '',
                bzpassword: '',
                canjianzzcode: '',
                bzxinyongcode: '',
                canjianname: ''
            },
           
            
            editForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: this.$route.query.xmid,
                cjid: '',
                bzzhanghao: '',
                bzpassword: '',
                canjianzzcode: '',
                bzxinyongcode: '',
                canjianname: ''
            },
            manyFormRules: {
                bzzhanghao: [
                    {
                        required: true,
                        message: '分包单位名称不能为空',
                        trigger: 'blur'
                    }
                ],
                canjianzzcode: [
                    {
                        required: true,
                        message: '分包单位名称不能为空',
                        trigger: 'blur'
                    }
                ],
                canjianname: [
                    {
                        required: true,
                        validator: validatepphone,
                        trigger: 'blur'
                    }
                ],
                bzpassword: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                canjianzzcode: [
                    {
                        required: true,
                        message: '企业所在地不能为空',
                        trigger: 'blur'
                    }
                ],
                bzxinyongcode: [
                    {
                        required: true,
                        message: '联系人不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            editFormRules: {
                bzzhanghao: [
                    {
                        required: true,
                        message: '分包单位名称不能为空',
                        trigger: 'blur'
                    }
                ],
                canjianzzcode: [
                    {
                        required: true,
                        message: '分包单位名称不能为空',
                        trigger: 'blur'
                    }
                ],
                canjianname: [
                    {
                        required: true,
                        validator: validatepphone,
                        trigger: 'blur'
                    }
                ],
                bzpassword: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                canjianzzcode: [
                    {
                        required: true,
                        message: '企业所在地不能为空',
                        trigger: 'blur'
                    }
                ],
                bzxinyongcode: [
                    {
                        required: true,
                        message: '联系人不能为空',
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
            this.editVisible = true;
            this.editForm.cjid = row.cjid;

            this.editForm.bzzhanghao = row.bzzhanghao;
            this.editForm.canjianzzcode = row.canjianzzcode;
            this.editForm.bzxinyongcode = row.bzxinyongcode;

            this.editForm.canjianname = row.canjianname;
            this.editForm.bzpassword = row.bzpassword;
            this.editForm.canjianzzcode = row.canjianzzcode;
        },
        adddanwei() {
            this.manyFormVisible = true;
        },
        getTable() {
            axios
                .post('/baopan/teamxinxilist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid
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
                        .post('/laowu_yun/ningbocanjianchaxun', that.manyForm)
                        .then(res => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                // that.$refs.manyEditForm.resetFields();
                                that.manyFormVisible = false;
                                that.getTable();
                                that.$message({
                                    message: '上报成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success'
                                });
                            } else {
                                that.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 4000,
                                    type: 'warning'
                                });
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
                        .post('/laowu_yun/ningbocanjianchaxun', that.editForm)
                        .then(res => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                // that.$refs.manyEditForm.resetFields();
                                that.editVisible = false;
                                that.getTable();
                                that.$message({
                                    message: '上报成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success'
                                });
                            } else {
                                that.$message({
                                    message: '上报失败',
                                    center: true,
                                    duration: 2000,
                                    type: 'warning'
                                });
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
        // 获取企业所在地列表
        getaddressList() {
            axios
                .post('/laowu_yun/ningbochengshixiala')
                .then(res => {
                    if (res.data.status == 1) {
                
                        this.addressList = res.data.list;  
                              console.log(  this.addressList )
                        // this.manyForm =
                    } else {
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getTable();
         this. getaddressList() 
    }
};
</script>
<style lang="less">
.cell {
    text-align: center;
}
.fjcjDialog {
    .marginb {
        margin-bottom: 15px;
    }
    .el-dialog {
        width: 500px;
        .el-select {
            width: 100%;
        }
    }
}
#bpningbocj {
    padding: 10px;
    .marginb {
        margin-bottom: 15px;
    }
    .el-dialog {
        width: 500px;
        .el-select {
            width: 100%;
        }
    }
}
</style>