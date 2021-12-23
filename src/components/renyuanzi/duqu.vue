<template>
    <div class="ready" id="Dq">
        <router-view></router-view>
        <div class="navdiv">
            <span style="font-size: 14px; color: #606266; line-height: 40px"
                >补录身份证</span
            >
            <span style="color: #ff6816; font-size: 12px">
                <i class="el-icon-info"></i>身份证阅读器只支持华视100U/100D系列
            </span>
            <el-button type="primary" style="float: right" @click="back"
                >返回</el-button
            >
        </div>
        <el-divider></el-divider>
        <div class="rbody">
            <el-row :gutter="10">
                <el-col :span="8">
                    <div class="grid-content bg-purple c-color">
                        <img src="../../../static/images/card.gif" alt="提示" />
                    </div>
                </el-col>
                <el-col :span="16" style="border: 1px solid #eee">
                    <div class="grid-content bg-purple-light b-color">
                        <el-row class="rbody-item1" :gutter="20">
                            <el-col
                                :span="24"
                                style="
                                    background-color: #eee;
                                    padding: 10px;
                                    margin-bottom: 20px;
                                "
                            >
                                请先安装驱动。安装完成后，请重启电脑或刷新当前页面。
                                <a @click="download()" style="color: #3a99f2"
                                    >驱动下载</a
                                >
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content bg-purple x-color">
                                    <el-form
                                        :label-position="labelPosition"
                                        label-width="80px"
                                        :rules="creatIDrules"
                                        ref="creatID"
                                        :model="IDRuleForm"
                                    >
                                        <el-form-item label="姓名:">
                                            <el-input
                                                v-model="IDRuleForm.name"
                                                readonly
                                                placeholder="姓名不能为空"
                                                :disabled="true"
                                            ></el-input>
                                        </el-form-item>

                                        <el-form-item label="性别:">
                                            <el-input
                                                v-model="IDRuleForm.sex"
                                                readonly
                                                placeholder="性别不能为空"
                                                :disabled="true"
                                            ></el-input>
                                        </el-form-item>

                                        <el-form-item label="民族:">
                                            <el-input
                                                v-model="IDRuleForm.nation"
                                                readonly
                                                placeholder="民族不能为空"
                                                :disabled="true"
                                            ></el-input>
                                        </el-form-item>

                                        <el-form-item label="有效期限:">
                                            <el-input
                                                v-model="IDRuleForm.codestop"
                                                readonly
                                                placeholder="有效期不能为空"
                                                :disabled="true"
                                            ></el-input>
                                        </el-form-item>

                                        <el-form-item label="出生日期:">
                                            <el-input
                                                v-model="IDRuleForm.birthday"
                                                readonly
                                                placeholder="出生日期不能为空"
                                                :disabled="true"
                                            ></el-input>
                                        </el-form-item>

                                        <el-form-item label="证件号码:">
                                            <el-input
                                                v-model="IDRuleForm.useridcode"
                                                readonly
                                                placeholder="证件号码不能为空"
                                                :disabled="true"
                                            ></el-input>
                                        </el-form-item>

                                        <el-form-item label="签发机关:">
                                            <el-input
                                                v-model="IDRuleForm.issuing"
                                                readonly
                                                placeholder="签发机关不能为空"
                                                :disabled="true"
                                            ></el-input>
                                        </el-form-item>

                                        <el-form-item label="住址:">
                                            <el-input
                                                v-model="IDRuleForm.userads"
                                                readonly
                                                placeholder="住址不能为空"
                                                :disabled="true"
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
                                        <el-form-item id="readBtn">
                                            <el-button
                                                type="primary"
                                                :loading="loaded"
                                                @click="read(1)"
                                                class="readId"
                                                >读取身份证</el-button
                                            >
                                            <el-button
                                                type="primary"
                                                @click="save('creatID')"
                                                :loading="saveLoad"
                                                >确定</el-button
                                            >
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div
                                    class="grid-content bg-purple z-color"
                                    style="width: 100%"
                                >
                                    <img :src="photo" alt style="width: 100%" />
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-dialog
            title="继续补录"
            :visible.sync="dialogVisible"
            :append-to-body="true"
        >
            <span> 是否继续补录 </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRoleUserSure()"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import notou from '../../../static/images/notou.png'; //默认图
export default {
    name: 'duqu',
    data() {
        var validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入项目名称'));
            } else {
                callback();
            }
        };
        // var validateuser = (rule, value, callback) => {
        //     if (this.ruleForm.projectuser !== "") {
        //         callback();
        //     }
        // };
        return {
            dialogVisible: false,
            open: false,
            close: false,
            display: '',
            labelPosition: 'right',
            //创建验证规则
            creatIDrules: {
                name: [
                    {
                        required: true,
                        validator: validateName,
                        trigger: 'blur',
                    },
                ],
                // pname: [
                //     { required: true, validator: validateuser, trigger: "blur" }
                // ]
            },
            groupView: false,
            //创建表单参数
            IDRuleForm: {
                newuid: this.$store.state.userData.uid,
                bzid: this.$route.query.bzid,
                name: '',
                corp_id: this.$store.state.userData.cid,
                userid: this.$route.query.userid || '',
                sex: '',
                nation: '',
                birthday: '',
                userads: '',
                useridcode: '',
                issuing: '',
                IssuedData: '',
                codestop: '',
                headurl: '',
                justurl: '', //身份证正面
                agturl: '', //身份证反面
                useryinhang: '',
                yhcord: '',
                phone: '', //手机号码
                usertype: '', //人员类型
                worktype: '', //工人工种
                whtype: '', //文化程度
                zzstatus: '', //政治面貌
                xypingjia: '', //诚信评价
                workjineng: '', //工人技能
                userkey: '', //重要人员
                jcstart: '', //进场日期
                tcstop: '', //出场日期
                jinjuser: '', //紧急联系人
                jinjphone: '', //紧急联系人电话
                jiatphone: '', //家庭电话
                jiataddress: '', //家庭地址
                qinsuser: '', //家属姓名
                qinsguanxi: '', //家属关系
                qinsphone: '', //家属电话
                shebei: 'pc',
            },

            cid: this.$store.state.userData.cid,
            photo: notou,
            // validTime: "",
            saveLoad: false,
            loaded: false,
        };
    },
    methods: {
        read() {
            this.loaded = true;
            axios
                .get(
                    'http://127.0.0.1:24010/ZKIDROnline/ScanReadIdCardInfo?OP-DEV=1&CMD-URL=4'
                )
                .then((res) => {
                    // this.$alert(res.data);
                    // this.$alert(JSON.stringify(res.data));
                    if (res.data.ret === 1 || res.data.ret === 10) {
                        this.loaded = false;
                        this.$alert('读取失败，请重新读取！');
                    }
                    let card = eval('(' + res.data + ')');
                    if (card.ret === 0) {
                        this.loaded = false;
                        this.isFail = false;
                        this.failMsg = '';
                        this.IDRuleForm.name = card.Certificate.Name; //姓名
                        this.IDRuleForm.birthday = card.Certificate.Birthday; //出生日期
                        this.IDRuleForm.sex = card.Certificate.Sex; //性别
                        this.IDRuleForm.useridcode = card.Certificate.IDNumber; //证件号码
                        this.IDRuleForm.nation = card.Certificate.Nation; //民族
                        this.IDRuleForm.issuing = card.Certificate.IDIssued; //签发机关
                        this.IDRuleForm.userads = card.Certificate.Address; //住址
                        this.IDRuleForm.codestop =
                            card.Certificate.IssuedData +
                            '-' +
                            card.Certificate.ValidDate;
                        this.IDRuleForm.headurl = card.Certificate.Base64Photo;
                        this.photo =
                            'data:image/png;base64,' +
                            card.Certificate.Base64Photo;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        deleteRoleUserSure() {
            const _this = this;
            axios
                .post('/laowu_yun/pccordcontentinput', _this.IDRuleForm)
                .then((res) => {
                    if (res.data.status == 1) {
                        _this.dialogVisible = false;
                        _this.saveLoad = false;
                        _this.isFail = false;
                        _this.failMsg = '';

                        setTimeout(() => {
                            _this.$router.go(-1);
                        }, 500);
                        _this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'success',
                        });
                    } else if (res.data.status == 2) {
                        _this.$alert(res.data.msg);
                        _this.saveLoad = false;
                    } else {
                        _this.$alert(res.data.msg);
                        _this.saveLoad = false;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    setTimeout(() => {
                        _this.$alert('补录失败，请重新补录！');
                        _this.saveLoad = false;
                    }, 1000);
                });
        },
        save(formName) {
            const _this = this;
            _this.saveLoad = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/laowu_yun/panduanhmd', {
                            corp_id: _this.cid,
                            newuid: _this.$store.state.userData.uid,
                            usercode: _this.IDRuleForm.useridcode,
                        })
                        .then((res) => {
                            if (res.data.status == 2) {
                                axios
                                    .post(
                                        '/laowu_yun/pccordcontentinput',
                                        _this.IDRuleForm
                                    )
                                    .then((res) => {
                                        if (res.data.status == 1) {
                                            _this.saveLoad = false;
                                            _this.isFail = false;
                                            _this.failMsg = '';

                                            setTimeout(() => {
                                                _this.$router.go(-1);
                                            }, 500);
                                            _this.$message({
                                                message: res.data.msg,
                                                center: true,
                                                duration: 2000,
                                                type: 'success',
                                            });
                                        } else if (res.data.status == 2) {
                                            _this.$alert(res.data.msg);
                                            _this.saveLoad = false;
                                        } else {
                                            _this.$alert(res.data.msg);
                                            _this.saveLoad = false;
                                        }
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                        setTimeout(() => {
                                            _this.$alert(
                                                '补录失败，请重新补录！'
                                            );
                                            _this.saveLoad = false;
                                        }, 1000);
                                    });
                            } else if (res.data.status == 1) {
                                _this.saveLoad = false;
                                _this.dialogVisible = true;
                            } else {
                                _this.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning',
                                });
                            }
                        });
                } else {
                    setTimeout(() => {
                        _this.$alert('补录失败，请重新补录！');
                        _this.saveLoad = false;
                    }, 1000);
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        download() {
            let host = window.location.host; //主机
            axios
                .get('/ding/ZKIDOnline')
                .then((res) => {
                    // window.location.href =
                    //     'https://zhihui.zzdingyun.com/ding/ZKIDOnline';
                    window.location.href =
                        'https://' + host + '/ding/ZKIDOnline';
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        evil(fn) {
            var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
            return new Fn('return ' + fn)();
        },
        back() {
            this.$router.go(-1);
        },
    },
    created() {},
    mounted() {
        const that = this;
        // that.getimg();
    },
};
</script>

<style>
#Dq {
    width: 100%;
    padding: 10px;
    background-color: #fff;
}
.navdiv {
    height: 40px;
}
.ready .navdiv span {
    margin-top: 10px;
    margin-left: 10px;
}
.rbody {
    width: 90%;
    /* height: 400px; */
    margin: 0 auto;
}
.rbody a:hover {
    cursor: pointer;
}
.ready .rbody .c-color {
    background-color: #f2f2f2;
    max-height: 400px;
    width: 100%;
}
.ready .rbody .c-color img {
    width: 100%;
}
.ready .rbody .b-color {
    padding: 0 5px 5px 5px;
}

.col-button {
    text-align: center;
}
#Dq .el-form {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
#Dq .el-form .el-form-item {
    width: 48%;
}
#Dq #readBtn {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
#Dq #readBtn .el-form-item__content {
    margin-left: 0 !important;
}
/* #Dq #readBtn button {
    width: 30%;
} */
</style>


