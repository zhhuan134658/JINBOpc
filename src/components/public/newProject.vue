<template>
    <!-- 新增外部单位+++++++++++++ -->
    <div id="newProject">
        <div class="back" @click="back">返回</div>
        <el-form
            label-width="150px"
            :rules="creatProjectrules"
            :label-position="labelPosition"
            ref="creatProject"
            :model="ruleForm"
        >
            <div class="info">
                <h1>项目信息</h1>
                <el-form-item label="项目名称:" prop="name">
                    <el-input placeholder="请填写项目名称" v-model="ruleForm.name" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="项目简称:">
                    <el-input v-model="ruleForm.pnicheng" placeholder="请填写项目简称" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="开工时间 :">
                    <el-date-picker v-model="ruleForm.pstart" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="工程规模 ">
                    <el-input v-model="ruleForm.gongguimo" placeholder="建筑面积、长度等:" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="项目类别 :">
                    <el-select v-model="ruleForm.categorylb" placeholder="请选择">
                        <el-option label="房屋建筑工程" value="房屋建筑工程"></el-option>
                        <el-option label="市政工程" value="市政工程"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计划竣工时间 :">
                    <el-date-picker v-model="ruleForm.pstop" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="工程造价:">
                    <el-input v-model="ruleForm.zjname" placeholder="请填写工程造价" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="参建主体 :">
                    <el-select v-model="ruleForm.cajianzhu" placeholder="请选择">
                        <el-option label="建设单位" value="建设单位"></el-option>
                        <el-option label="总承包单位" value="总承包单位"></el-option>
                        <el-option label="勘察单位" value="勘察单位"></el-option>
                        <el-option label="设计单位" value="设计单位"></el-option>
                        <el-option label="监理单位" value="监理单位"></el-option>
                        <el-option label="专业分包" value="专业分包"></el-option>
                        <el-option label="劳务分包" value="劳务分包"></el-option>
                        <el-option label="材料分包" value="材料分包"></el-option>
                        <el-option label="设备分包" value="设备分包"></el-option>
                        <el-option label="后勤服务" value="后勤服务"></el-option>
                        <el-option label="特殊设备" value="特殊设备"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item
                    label="项目负责人:"
                    prop="pname"
                    style="display:flex;justify-content: space-between;"
                >
                    <el-input
                        placeholder="请点击右侧按钮选择或搜索负责人"
                        readonly
                        v-model="ruleForm.pname"
                        @click="viewSingel"
                        style="width:70%"
                    ></el-input>
                    <el-button type="primary" style="width:25%" @click="viewSingel">选择</el-button>
                </el-form-item>
                <el-form-item label="项目地址:">
                    <el-input v-model="ruleForm.paddress" placeholder="请填写项目地址" :maxlength="50"></el-input>
                </el-form-item>
                <!-- <button @click="viewSingel">点击</button> -->
                <SingelGroup
                    @childSingel="getSingel"
                    @childSingel2="getSingel2"
                    v-bind:MemberName="MemberName"
                    v-bind:MemberId="MemberId"
                    :groupView="groupView"
                ></SingelGroup>

                <el-form-item label="项目联系人电话:">
                    <el-input v-model="ruleForm.pphone" placeholder="请填写项目联系人电话:" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="参建单位名称:">
                    <el-input v-model="ruleForm.cName" placeholder="请填写参建单位名称:" :maxlength="50"></el-input>
                </el-form-item>

                <div style="min-height:60px;width:100%;">
                    <div style>添加项目经理：</div>
                    <el-tag
                        v-for="tag in tagsData"
                        :key="tag.user"
                        closable
                        :type="tag.name"
                        style="margin:6px;"
                        @close="handleClose(tag)"
                    >{{tag.name}}</el-tag>
                </div>

                <newGroup
                    @childFn2="parentFn2"
                    @childFn="parentFn"
                    @childFn3="parentFn3"
                    v-bind:ManageName="ManageName"
                    v-bind:ManageId="ManageId"
                    v-bind:tagsData="tagsData"
                ></newGroup>

                <el-form-item label="项目施工许可证:">
                    <el-input v-model="ruleForm.pbulider" placeholder="请填写项目施工许可证:" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="施工许可证发放日期 :">
                    <el-date-picker v-model="ruleForm.pbulidertime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="项目类型 :">
                    <el-select v-model="ruleForm.ptype" placeholder="请选择">
                        <el-option label="建设单位（业主）" value="danwei"></el-option>
                        <el-option label="总承包单位" value="chengbao"></el-option>
                        <el-option label="勘察单位" value="kancha"></el-option>
                        <el-option label="设计单位" value="sheji"></el-option>
                        <el-option label="监理单位" value="jianli"></el-option>
                        <el-option label="专业分包" value="zhuanye"></el-option>
                        <el-option label="劳务分包" value="laoeu"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目编号:">
                    <el-input v-model="ruleForm.pnumber" placeholder="请填写项目编号:"></el-input>
                </el-form-item>
                <el-form-item label="项目状态 :">
                    <el-select v-model="ruleForm.pstatus" placeholder="请选择">
                        <el-option label="建设单位（业主）" value="danwei"></el-option>
                        <el-option label="总承包单位" value="chengbao"></el-option>
                        <el-option label="勘察单位" value="kancha"></el-option>
                        <el-option label="设计单位" value="sheji"></el-option>
                        <el-option label="监理单位" value="jianli"></el-option>
                        <el-option label="专业分包" value="zhuanye"></el-option>
                        <el-option label="劳务分包" value="laoeu"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否重点 :">
                    <el-select v-model="ruleForm.pkey" placeholder="请选择">
                        <el-option label="建设单位（业主）" value="danwei"></el-option>
                        <el-option label="总承包单位" value="chengbao"></el-option>
                    </el-select>
                </el-form-item>
            </div>

            <div class="allInfo">
                <h1>施工单位信息</h1>
                <el-form-item label="施工总承包单位名称:">
                    <el-input v-model="ruleForm.coname" placeholder="施工总承包单位名称:" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="统一信用代码:">
                    <el-input v-model="ruleForm.cocode" placeholder="施工单位统一信用代码:" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="施工单位资质等级 :">
                    <el-select v-model="ruleForm.coqlevel" placeholder="请选择">
                        <el-option label="建设单位（业主）" value="danwei"></el-option>
                        <el-option label="总承包单位" value="chengbao"></el-option>
                        <el-option label="勘察单位" value="kancha"></el-option>
                        <el-option label="设计单位" value="sheji"></el-option>
                        <el-option label="监理单位" value="jianli"></el-option>
                        <el-option label="专业分包" value="zhuanye"></el-option>
                        <el-option label="劳务分包" value="laoeu"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="法人代表:">
                    <el-input v-model="ruleForm. coleps" placeholder="施工单位法人代表:" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="联系人:">
                    <el-input v-model="ruleForm.coperson" placeholder="施工单位联系人:" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:">
                    <el-input v-model="ruleForm.cophone" placeholder="施工单位联系电话:" :maxlength="11"></el-input>
                </el-form-item>
            </div>
            <div class="allInfo">
                <h1>建设单位信息</h1>
                <el-form-item label="建设单位名称:">
                    <el-input v-model="ruleForm.jsname" placeholder="建设单位名称:" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="统一信用代码:">
                    <el-input v-model="ruleForm.jscode	" placeholder="建设单位统一信用代码:" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="建设单位资质等级 :">
                    <el-select v-model="ruleForm.jsqlevel" placeholder="请选择">
                        <el-option label="建设单位（业主）" value="danwei"></el-option>
                        <el-option label="总承包单位" value="chengbao"></el-option>
                        <el-option label="勘察单位" value="kancha"></el-option>
                        <el-option label="设计单位" value="sheji"></el-option>
                        <el-option label="监理单位" value="jianli"></el-option>
                        <el-option label="专业分包" value="zhuanye"></el-option>
                        <el-option label="劳务分包" value="laoeu"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="法人代表:">
                    <el-input v-model="ruleForm. jsleps" placeholder="建设单位法人代表:" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="联系人:">
                    <el-input v-model="ruleForm.jsperson" placeholder="建设单位联系人:" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:">
                    <el-input v-model="ruleForm.jsphone" placeholder="建设单位联系电话:" :maxlength="11"></el-input>
                </el-form-item>
            </div>
            <div class="allInfo">
                <h1>勘察单位信息</h1>
                <el-form-item label="勘察单位名称:">
                    <el-input v-model="ruleForm.kcname" placeholder="勘察单位名称:" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="统一信用代码:">
                    <el-input v-model="ruleForm.kccode	" placeholder="勘察单位统一信用代码:" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="勘察单位资质等级 :">
                    <el-select v-model="ruleForm.kcqlevel" placeholder="请选择">
                        <el-option label="建设单位（业主）" value="danwei"></el-option>
                        <el-option label="总承包单位" value="chengbao"></el-option>
                        <el-option label="勘察单位" value="kancha"></el-option>
                        <el-option label="设计单位" value="sheji"></el-option>
                        <el-option label="监理单位" value="jianli"></el-option>
                        <el-option label="专业分包" value="zhuanye"></el-option>
                        <el-option label="劳务分包" value="laoeu"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="法人代表:">
                    <el-input v-model="ruleForm. kcleps" placeholder="勘察单位法人代表:" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="联系人:">
                    <el-input v-model="ruleForm.kcperson" placeholder="勘察单位联系人:" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:">
                    <el-input v-model="ruleForm.kcphone" placeholder="勘察单位联系电话:" :maxlength="10"></el-input>
                </el-form-item>
            </div>

            <div class="allInfo">
                <h1>设计单位信息</h1>
                <el-form-item label="设计单位名称:">
                    <el-input v-model="ruleForm.sjname" placeholder="设计单位名称:" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="统一信用代码:">
                    <el-input v-model="ruleForm.sjcode	" placeholder="设计单位统一信用代码:" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="设计单位资质等级 :">
                    <el-select v-model="ruleForm.sjqlevel" placeholder="请选择">
                        <el-option label="建设单位（业主）" value="danwei"></el-option>
                        <el-option label="总承包单位" value="chengbao"></el-option>
                        <el-option label="勘察单位" value="kancha"></el-option>
                        <el-option label="设计单位" value="sheji"></el-option>
                        <el-option label="监理单位" value="jianli"></el-option>
                        <el-option label="专业分包" value="zhuanye"></el-option>
                        <el-option label="劳务分包" value="laoeu"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="法人代表:">
                    <el-input v-model="ruleForm. sjleps" placeholder="设计单位法人代表:" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="联系人:">
                    <el-input v-model="ruleForm.sjperson" placeholder="设计单位联系人:" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:">
                    <el-input v-model="ruleForm.sjphone" placeholder="设计单位联系电话:" :maxlength="11"></el-input>
                </el-form-item>
            </div>
            <div class="allInfo">
                <h1>监理单位信息</h1>
                <el-form-item label="监理单位名称:">
                    <el-input v-model="ruleForm.jlname" placeholder="监理单位名称:" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="监统一信用代码:">
                    <el-input v-model="ruleForm.jlcode	" placeholder="监理单位统一信用代码:" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="资质等级 :">
                    <el-select v-model="ruleForm.jlqlevel" placeholder="请选择">
                        <el-option label="建设单位（业主）" value="danwei"></el-option>
                        <el-option label="总承包单位" value="chengbao"></el-option>
                        <el-option label="勘察单位" value="kancha"></el-option>
                        <el-option label="设计单位" value="sheji"></el-option>
                        <el-option label="监理单位" value="jianli"></el-option>
                        <el-option label="专业分包" value="zhuanye"></el-option>
                        <el-option label="劳务分包" value="laoeu"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="法人代表:">
                    <el-input v-model="ruleForm.jlleps" placeholder="监理单位法人代表:" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="联系人:">
                    <el-input v-model="ruleForm.jlperson" placeholder="监理单位联系人:" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:">
                    <el-input v-model="ruleForm.jlphone" placeholder="监理单位联系电话:" :maxlength="11"></el-input>
                </el-form-item>
            </div>

            <div
                v-if="isFail"
                style="width:80%;margin:0 auto;height:40px;line-height:40px;text-align:center;color:red;"
            >{{failMsg}}</div>
            <el-form-item style="margin-top:60px; width:100%;">
                <el-button
                    type="primary"
                    :loading="loaded"
                    @click="save('creatProject')"
                    style="width:200px;"
                >保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios';
import newGroup from './newGroup.vue';
import SingelGroup from './singelGroup.vue';
import { setTimeout } from 'timers';
export default {
    components: { newGroup, SingelGroup },
    data() {
        /*el-checkbox-group el-transfer-panel__list */
        var validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入项目名称'));
            } else {
                // if (this.ruleForm.name !== "") {
                //     this.$refs.ruleForm.validateField("name");
                // }
                callback();
            }
        };
        var validateuser = (rule, value, callback) => {
            // if (value === "") {
            //     callback(new Error("请选择负责人"));
            // } else {
            if (this.ruleForm.pname !== '') {
                callback();
            } else {
                // callback();
            }

            // }
        };
        return {
            labelPosition: 'left',
            // activeName: "1",
            //loading
            loaded: false,
            manageList: false,
            //创建验证规则
            creatProjectrules: {
                name: [
                    { required: true, validator: validateName, trigger: 'blur' }
                ],
                pname: [
                    { required: true, validator: validateuser, trigger: 'blur' }
                ]
            },
            groupView: false,
            //创建表单参数
            ruleForm: {
                  newuid:this.$store.state.userData.uid,
                name: '',
                pname: '',
                paddress: '',
                ppersonid: '',
                corp_id: this.$store.state.userData.cid,
                urid: this.$store.state.userData.urid,
                pphone: '',
                pbulider: '',
                pbulidertime: '',
                ptype: '',
                pnumber: '',
                pstatus: '',
                pkey: '',
                pstart: '',
                pstop: '',
                cajianzhu: '',
                gongguimo: '',
                //施工
                coname: '',
                cocode: '',
                coqlevel: '',
                coleps: '',
                coperson: '',
                cophone: '',
                //建设
                jsname: '',
                jscode: '',
                jsqlevel: '',
                jsleps: '',
                jsperson: '',
                jsphone: '',
                //勘察
                kcname: '',
                kccode: '',
                kcqlevel: '',
                kcleps: '',
                kcperson: '',
                kcphone: '',
                //设计
                sjname: '',
                sjcode: '',
                sjqlevel: '',
                sjleps: '',
                sjperson: '',
                sjphone: '',
                //监理
                jlname: '',
                jlcode: '',
                jlqlevel: '',
                jlleps: '',
                jlperson: '',
                jlphone: ''
            },
            //创建是否成功
            isFail: false,
            failMsg: '',
            //子组件传回的值
            ManageName: [],
            ManageId: [],
            MemberName: '',
            MemberId: '',
            tagsData: []
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        viewSingel() {
            this.groupView = true;
        },
        //添加成员子组件传值
        parentFn(payload) {
            this.ManageName = this.dedupe(payload);
        },
        parentFn2(payload) {
            this.ManageId = this.dedupe(payload);
        },
        parentFn3(payload) {
            this.tagsData = this.dedupe(payload);
        },
        //更改负责人子组件传值
        getSingel(msg) {
            this.MemberName = msg;
            this.ruleForm.pname = this.MemberName;
        },
        getSingel2(msg) {
            this.MemberId = msg;
            this.ruleForm.ppersonid = this.MemberId;
        },
        handleClose(tag) {
            this.tagsData.splice(this.tagsData.indexOf(tag), 1);
            this.ManageName.splice(this.ManageName.indexOf(tag.user_name), 1);
            this.ManageId.splice(this.ManageId.indexOf(tag.userid), 1);
        },
        save(formName) {
            this.loaded = true;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    axios
                        .post('/laowu_yun/createproject', this.ruleForm)
                        .then(res => {
                            if (res.data.status == 1) {
                                this.loaded = false;
                                this.isFail = true;
                                this.failMsg = '创建成功';
                                setTimeout(function() {
                                    this.isFail = false;
                                    this.failMsg = '';
                                    this.$router.go(-1);
                                }, 1000);
                            } else {
                                this.isFail = true;
                                this.failMsg = res.data.msg;
                                this.loaded = false;
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //去重
        dedupe(array) {
            return Array.from(new Set(array));
        }
    },
    created() {},
    mounted() {}
};
</script>
<style>
#newProject {
    background-color: #fff;
    margin: 0 10px;
}
#newProject .back {
    padding: 6px;
    margin: 20px 0 10px 10px;
    background-color: #3a99f2;
    color: #fff;
    width: 60px;
    text-align: center;
}
#newProject .el-form {
    width: 80%;
    padding-left: 10%;
}
#newProject .el-form-item {
    display: flex;
    justify-content: space-between;
}
#newProject .el-form-item,
#newProject .el-date-editor.el-input,
#newProject .el-select {
    width: 100%;
}
#newProject .el-form-item__label {
    width: 30% !important;
    /* padding-right: 5%; */
}
#newProject .el-form-item__content,
#newProject .el-input__inner {
    width: 100%;
}
#newProject .el-form-item__content {
    text-align: center;
    margin-left: 0 !important;
}
#newProject .tab1 .tab-item .selectName .el-tabs__nav-scroll {
    position: relative;
}
#newProject .info,
#newProject .allInfo {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
#newProject h1,
#newProject .allInfo h1 {
    width: 100%;
    margin: 6px 0 20px 0;
}
#newProject .el-form-item {
    width: 44%;
    /* float: left; */
}
#group {
    width: 100%;
    margin-bottom: 22px;
}
#newProject #group .search {
    width: 50%;
    margin: 0 auto;
}
</style>
