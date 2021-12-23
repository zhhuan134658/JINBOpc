<template>
    <div id="bpcj">
        <!-- 参建 -->

        <el-button
            type="primary"
            @click="goback"
            style="float:right;margin-bottom:10px;margin-left:10px"
        >返回</el-button>
        <el-button type="primary" @click="adddanwei" style="float:right;margin-bottom:10px">新增</el-button>
        <el-table :data="canjianData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="bzzhanghao" label="劳务账号"></el-table-column>
            <el-table-column prop="bzpassword" label="劳务密码"></el-table-column>
            <el-table-column prop="canjianname" label="劳务分包名称"></el-table-column>
            <el-table-column prop="canjianzzcode" label="参建单位资质证号"></el-table-column>
            <el-table-column prop="bzxinyongcode" label="参建单位信用代码"></el-table-column>
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

        <!-- <el-dialog title="修改上报接口" :visible.sync="xiugaiVisible" :close-on-click-modal="false">
            <div>sss</div>

            <span slot="footer" class="dialog-footer">
                <el-button>立即上报</el-button>
                <el-button type="primary" @click="xiugaiVisible = false">返回</el-button>
            </span>
        </el-dialog>

        <el-dialog title="修改上报接口" :visible.sync="addVisible" :close-on-click-modal="false">
            <div>cccccc</div>

            <span slot="footer" class="dialog-footer">
                <el-button>立即上报</el-button>
                <el-button type="primary" @click="addVisible = false">返回</el-button>
            </span>
        </el-dialog>-->
        <el-dialog
            title="上报参建单位"
            :visible.sync="manyFormVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="bpPublcDialog"
        >
            <div>
                <el-form :model="manyForm" :rules="manyFormRules" ref="manyEditForm">
                    <el-form-item class="marginb" prop="bzzhanghao">
                        <el-input placeholder="请输入劳务账号" v-model="manyForm.bzzhanghao">
                            <template slot="prepend">
                                <span style="color:red">*</span>劳务账号
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="bzpassword">
                        <el-input placeholder="请输入劳务密码" v-model="manyForm.bzpassword">
                            <template slot="prepend">
                                <span style="color:red">*</span>劳务密码
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="canjianzzcode">
                        <el-input placeholder="请输入参建单位资质证号" v-model="manyForm.canjianzzcode">
                            <template slot="prepend">
                                <span style="color:red">*</span>参建单位资质证号
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="bzxinyongcode">
                        <el-input placeholder="请输入参建单位信用代码" v-model="manyForm.bzxinyongcode">
                            <template slot="prepend">
                                <span style="color:red">*</span>参建单位信用代码
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="canjianname">
                        <el-input placeholder="请输入劳务分包名称" v-model="manyForm.canjianname">
                            <template slot="prepend">
                                <span style="color:red">*</span>劳务分包名称
                            </template>
                        </el-input>
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
            class="bpPublcDialog"
        >
            <div>
                <el-form :model="editForm" :rules="editFormRules" ref="editEditForm">
                    <el-form-item class="marginb" prop="bzzhanghao">
                        <el-input placeholder="请输入劳务账号" v-model="editForm.bzzhanghao">
                            <template slot="prepend">
                                <span style="color:red">*</span>劳务账号
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="bzpassword">
                        <el-input placeholder="请输入劳务密码" v-model="editForm.bzpassword">
                            <template slot="prepend">
                                <span style="color:red">*</span>劳务密码
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="canjianzzcode">
                        <el-input placeholder="请输入参建单位资质证号" v-model="editForm.canjianzzcode">
                            <template slot="prepend">
                                <span style="color:red">*</span>参建单位资质证号
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="bzxinyongcode">
                        <el-input placeholder="请输入参建单位信用代码" v-model="editForm.bzxinyongcode">
                            <template slot="prepend">
                                <span style="color:red">*</span>参建单位信用代码
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="marginb" prop="canjianname">
                        <el-input placeholder="请输入劳务分包名称" v-model="editForm.canjianname">
                            <template slot="prepend">
                                <span style="color:red">*</span>劳务分包名称
                            </template>
                        </el-input>
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
export default {
    data() {
        return {
            cid: this.$store.state.userData.cid,
            manyFormVisible: false,
            editVisible: false,
            isFail: false,
            failMsg: '',
            canjianData: [],
            manyForm: {
                 newuid:this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                bzzhanghao: '',
                bzpassword: '',
                canjianzzcode: '',
                bzxinyongcode: '',
                canjianname: ''
            },
            editForm: {
                 newuid:this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                bzzhanghao: '',
                bzpassword: '',
                canjianzzcode: '',
                bzxinyongcode: '',
                cjid: '',
                canjianname: ''
            },
            manyFormRules: {
                bzzhanghao: [
                    {
                        required: true,
                        message: '劳务账号不能为空',
                        trigger: 'blur'
                    }
                ],
                bzpassword: [
                    {
                        required: true,
                        message: '劳务密码不能为空',
                        trigger: 'blur'
                    }
                ],
                canjianzzcode: [
                    {
                        required: true,
                        message: '参建单位资质证号不能为空',
                        trigger: 'blur'
                    }
                ],
                bzxinyongcode: [
                    {
                        required: true,
                        message: '参建单位信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                canjianname: [
                    {
                        required: true,
                        message: '劳务分包名称不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            editFormRules: {
                bzzhanghao: [
                    {
                        required: true,
                        message: '劳务账号不能为空',
                        trigger: 'blur'
                    }
                ],
                bzpassword: [
                    {
                        required: true,
                        message: '劳务密码不能为空',
                        trigger: 'blur'
                    }
                ],
                canjianzzcode: [
                    {
                        required: true,
                        message: '参建单位资质证号不能为空',
                        trigger: 'blur'
                    }
                ],
                bzxinyongcode: [
                    {
                        required: true,
                        message: '参建单位信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                canjianname: [
                    {
                        required: true,
                        message: '劳务分包名称不能为空',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },

    methods: {
        goback() {
            // this.$router.push({ path: '/bpxq' });
            this.$router.go(-1);
        },
        handleXiugai(index, row) {
            this.editVisible = true;
            this.editForm.cjid = row.cjid;
            this.editForm.bzzhanghao = row.bzzhanghao;
            this.editForm.bzpassword = row.bzpassword;
            this.editForm.canjianzzcode = row.canjianzzcode;
            this.editForm.bzxinyongcode = row.bzxinyongcode;
            this.editForm.canjianname = row.canjianname;
        },
        adddanwei() {
            this.manyFormVisible = true;
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
                        .post('/baopan/teamaddsbuser', that.manyForm)
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
                        .post('/baopan/teamaddsbuser', that.editForm)
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
    mounted() {
        this.getTable();
    }
};
</script>
<style lang="less">
.cell {
    text-align: center;
}
#bpcj {
    padding: 10px;
    .marginb {
        margin-bottom: 15px;
    }
}
</style>