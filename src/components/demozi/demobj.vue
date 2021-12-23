<template>
    <!-- 编辑项目+++++++++++++ -->
    <div id="Ad">
        <!-- <vue-scroll :ops="opss" style="width:100%;height:960px;" class="scroll"> -->
        <el-button
            type="primary"
            @click="back"
            style="float: right; margin-top: 20px"
            >返回</el-button
        >
        <el-form
            label-width="150px"
            :rules="creatProjectrules"
            :label-position="labelPosition"
            ref="creatProject"
            :model="ruleForm"
            style="margin-top: 50px"
        >
            <!-- <div class="info"> -->
            <h1>项目信息</h1>
            <el-form-item label="项目名称：" prop="name">
                <el-input
                    placeholder="请填写项目名称"
                    v-model="ruleForm.name"
                    maxlength="100"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item label="门店名称：" prop="pnicheng">
                <el-input
                    v-model="ruleForm.pnicheng"
                    placeholder="请填写门店名称"
                    maxlength="8"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item label="开工时间：">
                <el-date-picker
                    v-model="ruleForm.pstart"
                    :picker-options="pickerStart"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="计划竣工时间：">
                <el-date-picker
                    v-model="ruleForm.pstop"
                    :picker-options="pickerEnd"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>
            <!-- <el-form-item
                label="项目标签："
                prop="title"
                style="display:flex;justify-content: space-between;"
            >
                <el-input
                    placeholder="请点击选择项目标签"
                    readonly
                    v-model="ruleForm.title"
                    @focus="viewCheck"
                ></el-input>
            </el-form-item>-->
            <el-form-item label="工程预算（万元）：" prop="gongjiage">
                <el-input
                    v-model="ruleForm.gongjiage"
                    placeholder="请填写工程预算"
                    maxlength="10"
                ></el-input>
            </el-form-item>

            <el-form-item label="工程规模（㎡）：" prop="gongguimo">
                <el-input
                    v-model="ruleForm.gongguimo"
                    placeholder="建筑面积、长度等"
                    maxlength="10"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="项目经理："
                prop="pname"
                style="display: flex; justify-content: space-between"
            >
                <el-input
                    placeholder="请点击右侧按钮选择或搜索负责人"
                    readonly
                    id="addinput"
                    v-model="ruleForm.pname"
                    @focus="addSingP"
                ></el-input>
                <!-- <el-button type="primary" style="width:25%" @click="viewSingel">选择</el-button> -->
            </el-form-item>
            <el-form-item label="项目地址：">
                <el-input
                    v-model="ruleForm.paddress"
                    placeholder="请填写项目地址"
                    maxlength="50"
                ></el-input>
            </el-form-item>

            <el-form-item label="参建主体类型：" class="canjianLabel">
                <el-select v-model="ruleForm.cajianzhu" placeholder="请选择">
                    <el-option
                        v-for="(item, index) in cjtype"
                        :label="item.zname"
                        :value="item.zname"
                        :key="index"
                    >
                        <span style="float: left">{{ item.zname }}</span>
                        <span
                            class="el-icon-circle-close"
                            style="
                                float: right;
                                font-size: 16px;
                                line-height: 34px;
                                color: #409eff;
                            "
                            v-if="item.jiu == '0'"
                            @click.prevent.stop="deleteCjItem(item, index)"
                        ></span>
                    </el-option>
                </el-select>
                <el-button
                    type="primary"
                    @click="addNewContent"
                    style="float: right"
                    >新增字段</el-button
                >
            </el-form-item>
            <el-form-item label="项目类型：" prop="type" class="canjianLabel">
                <el-select v-model="ruleForm.type" placeholder="请选择">
                    <el-option
                        v-for="(item, index) in projectType"
                        :label="item.type"
                        :value="item.type"
                        :key="index"
                    >
                        <span style="float: left">{{ item.type }}</span>
                        <span
                            class="el-icon-circle-close"
                            style="
                                float: right;
                                font-size: 16px;
                                line-height: 34px;
                                color: #409eff;
                            "
                            v-if="item.jiu == '0'"
                            @click.prevent.stop="deleteXmItem(item, index)"
                        ></span>
                    </el-option>
                </el-select>
                <el-button
                    type="primary"
                    @click="addNewPaper"
                    style="float: right"
                    >新增字段</el-button
                >
            </el-form-item>
            <el-form-item label="项目状态：" prop="pstatus">
                <el-select v-model="ruleForm.pstatus" placeholder="请选择">
                    <el-option label="筹备" value="2"></el-option>
                    <el-option label="在建" value="1"></el-option>
                    <el-option label="完工" value="3"></el-option>
                </el-select>
            </el-form-item>
            <!-- <button @click="viewSingel">点击</button> -->

            <el-form-item label="施工经理电话：" prop="pphone">
                <el-input
                    v-model="ruleForm.pphone"
                    placeholder="请填写施工经理电话"
                    maxlength="13"
                ></el-input>
            </el-form-item>
            <el-form-item label="项目管理成员：">
                <div class="addManeger">
                    <div class="addMList" v-if="tagsData.length > 3">
                        <div class="mdnList">
                            <div class="mdren" @click="openAllPeople">
                                <span class="touxiang">
                                    <i class="el-icon-s-custom"></i>
                                </span>
                            </div>
                            <p>查看全部</p>
                        </div>
                        <div class="mdnPlus">
                            <i class="el-icon-plus"></i>
                        </div>
                    </div>
                    <div
                        class="addMList"
                        v-for="(item, index) in tagsData.slice(0, 3)"
                        :key="index"
                    >
                        <div class="mdnList">
                            <div class="mdren">
                                <img
                                    v-if="item.heardurl"
                                    :src="item.heardurl"
                                    alt
                                />
                                <span class="touxiang" v-else>{{
                                    item.name.length <= 2
                                        ? item.name
                                        : item.name.substr(
                                              item.name.length - 2,
                                              2
                                          )
                                }}</span>
                            </div>
                            <p>{{ item.name }}</p>
                            <i
                                class="el-icon-error"
                                @click="deleteClose(item)"
                            ></i>
                        </div>
                        <div class="mdnPlus">
                            <i class="el-icon-plus"></i>
                        </div>
                    </div>
                    <div class="addMList addMListLast">
                        <div class="mdnList">
                            <div class="mdren" @click="addManyP">
                                <span class="touxiang">
                                    <i class="el-icon-plus"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-form-item>
            <!-- <div style="width:100%;">
                <div style="width:100%;margin-bottom:20px;">
                    <div>项目管理成员：</div>
                    <el-tag
                        v-for="tag in tagsData"
                        :key="tag.user"
                        closable
                        :type="tag.name"
                        style="margin:6px;"
                        @close="deleteClose(tag)"
                    >{{tag.name}}</el-tag>
                </div>
            </div>
            <el-button
                type="primary"
                style="width:160px;text-align:center;"
                @click="addManyP"
            >添加项目管理成员</el-button>-->
            <el-form-item label="项目任务单号：" prop="coname">
                <el-input
                    v-model="ruleForm.coname"
                    placeholder="请填写项目任务单号"
                    maxlength="50"
                ></el-input>
            </el-form-item>
            <el-form-item label="施工经理：" prop="cocode">
              <!-- <leader-pro :pdata="[]" :team="false" :man="true" :show="false" @handelLeaders="handelLeaderA" /> -->
              <el-input
                  v-model="ruleForm.cocode"
                  placeholder="请填选择客户联系人"
                  maxlength="20"
              ></el-input>
            </el-form-item>
            <el-form-item label="客户联系人：" prop="coqlevel">
                <el-input
                    v-model="ruleForm.coqlevel"
                    placeholder="请填选择客户联系人"
                    maxlength="20"
                ></el-input>
            </el-form-item>
            <el-form-item label="客户联系电话：" prop="coleps">
                <el-input
                    v-model="ruleForm.coleps"
                    placeholder="请填填写客户联系电话"
                    maxlength="11"
                ></el-input>
            </el-form-item>
            <el-form-item label="项目备注：" prop="coperson">
                <el-input
                    v-model="ruleForm.coperson"
                    placeholder="请填写项目备注"
                    maxlength="150"
                ></el-input>
            </el-form-item>
            <el-form-item label="项目附件：">
              <upload :isShow="[1]" @listenToChildEvent="handelUploadA"/>
            </el-form-item>
            <el-form-item>
            </el-form-item>
            <div v-if="ruleForm.kcleps.length" class="files" style="margin-left: 182px!important;">
              <template v-for="(item, index) in ruleForm.kcleps">
                <div :key="`file-${index}`" style="display: flex;flex-direction: row;padding: 10px;border: solid 1px #999;border-radius: 6px;margin-bottom: 10px">
                  <img v-if="fileSuffix(item) == 'img'" :src="item" @click="showFile(item)" style="width: 80px;height: 80px" />
                  <div class="file" @click="showFile(item)" style="line-height: 80px;">{{ item.substring(0, 42) }}...</div>
                  <div class="file" @click="handelFileDeleteA(index)" style="line-height: 80px;width: 200px;text-align: center;">删除</div>
                </div>
              </template>
            </div>

            <el-form-item style="margin-top: 60px; width: 100%">
                <el-button
                    type="primary"
                    :loading="loaded"
                    @click="save('creatProject')"
                    style="width: 200px"
                    >保存</el-button
                >
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
        </el-form>
        <el-dialog
            title="新增参建主体字段"
            :visible.sync="newPVisible"
            :append-to-body="true"
            @close="cancelNewP"
            class="newAddDialog"
        >
            <div class="itemDiv">
                <span>新增字段：</span>
                <el-input v-model="addZtText" maxlength="10"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelNewP">取 消</el-button>
                <el-button type="primary" @click="addPBtn" :loading="loaded"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
        <el-dialog
            title="新增项目类型字段"
            :visible.sync="newPaVisible"
            :append-to-body="true"
            @close="cancelNewPa"
            class="newAddDialog"
        >
            <div class="itemDiv">
                <span>新增字段：</span>
                <el-input v-model="addProjectText" maxlength="10"></el-input>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelNewPa">取 消</el-button>
                <el-button type="primary" @click="addPaBtn" :loading="loaded"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
        <el-dialog
            title="全部人员"
            :visible.sync="AllPeopleVisible"
            :append-to-body="true"
            class="openPeopleDialog"
        >
            <div style="margin-bottom: 10px">共有{{ tagsData.length }}人</div>
            <div class="showAllPeople">
                <div
                    class="addMList"
                    v-for="(item, index) in tagsData"
                    :key="index"
                >
                    <div class="mdnList">
                        <div class="mdren">
                            <img
                                v-if="item.heardurl"
                                :src="item.heardurl"
                                alt
                            />
                            <span class="touxiang" v-else>{{
                                item.name.length <= 2
                                    ? item.name
                                    : item.name.substr(item.name.length - 2, 2)
                            }}</span>
                        </div>
                        <p>{{ item.name }}</p>
                        <i class="el-icon-error" @click="deleteClose(item)"></i>
                    </div>
                    <div class="mdnPlus">
                        <i class="el-icon-plus"></i>
                    </div>
                </div>
                <div class="addMList addMListLast">
                    <div class="mdnList">
                        <div class="mdren" @click="addManyP">
                            <span class="touxiang">
                                <i class="el-icon-plus"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
        <!-- <el-dialog
            title="选择标签"
            :visible.sync="tagView"
            :close-on-click-modal="false"
            :show-close="false"
            :modal-append-to-body="false"
        >
            <div style="margin-bottom:6px;">标签</div>
            <Title
                @getTitle="titFn"
                @getTit2="titFn2"
                :tagsTitleData="tagsTitleData"
                :newview="newview"
                :xmid="xmid"
            ></Title>
        </el-dialog>-->
    </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import Title from './title.vue';
import { setTimeout } from 'timers';
import LeaderPro from './components/leaderpro'
import Upload from './components/upload'
export default {
    components: { Title, LeaderPro, Upload },
    data() {
        var validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入项目名称'));
            } else {
                callback();
            }
        };

        var validateuser = (rule, value, callback) => {
            if (this.ruleForm.pname === '') {
                callback(new Error('请选择负责人'));
            } else {
                callback();
            }
        };
        var validatepnicheng = (rule, value, callback) => {
            if (value === '' || value === 'undefined') {
                callback(new Error('请输入门店名称'));
            } else {
                callback();
            }
        };
        var validatepphone = (rule, value, callback) => {
            const reg = /^1\d{10}$/;
            if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        };
        var validategongjiage = (rule, value, callback) => {
            if (value) {
                const reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{1,4})))$/;
                if (!reg.test(value)) {
                    callback(
                        new Error('请输入正确格式(格式为数字,最多保留四位小数)')
                    );
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        var validategongguimo = (rule, value, callback) => {
            if (value) {
                const reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{2})))$/;
                if (!reg.test(value)) {
                    callback(
                        new Error('请输入正确格式(格式为数字,保留两位小数)')
                    );
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            //创建验证规则
            creatProjectrules: {
              coname: [
                { required: true, message: '必填项', trigger: 'blur' }
              ],
                name: [
                    {
                        required: true,
                        validator: validateName,
                        trigger: 'blur'
                    }
                ],
                pname: [{ required: true, validator: validateuser }],
                pnicheng: [
                    {
                        required: true,
                        message: '门店名称不能为空',
                        trigger: 'blur'
                    }
                ],
                pphone: [
                    {
                        required: true,
                        message: '联系电话不能为空',
                        trigger: 'blur'
                    }
                ],
                gongjiage: [
                    {
                        validator: validategongjiage,
                        trigger: 'blur'
                    }
                ],
                gongguimo: [
                    {
                        validator: validategongguimo,
                        trigger: 'blur'
                    }
                ],
                pstatus: [
                    {
                        required: true,
                        message: '请选择状态',
                        trigger: ['blur', 'change']
                    }
                ],
                type: [
                    {
                        required: true,
                        message: '请选择项目类型',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            labelPosition: 'right',
            newPVisible: false,
            newPaVisible: false,
            AllPeopleVisible: false,
            loaded: false,
            manageList: false,
            addZtText: '',
            addProjectText: '',
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            xmid: this.$route.query.xmid,
            groupView: false,
            singelView: false,
            urid: this.$store.state.userData.urid,
            //创建表单参数
            ruleForm: {
                newuid: this.$store.state.userData.uid,
                xmid: this.$route.query.xmid,
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
                userids: [],
                orgids: [],
                //施工
                coname: '',
                cocode: '',
                coqlevel: '',
                coleps: '',
                coperson: '',
                cophone: '',
                usercontent: [],
                 // 新增字段
                coname: '',
                cocode: '',
                coqlevel: '',
                coleps: '',
                coperson: '',
                kcleps: []               
            },
            //创建是否成功
            isFail: false,
            failMsg: '',
            //子组件传回的值

            tagsData: [],
            newaddPeople: [],
            neworgids: [],
            tagView: false,
            tagsTitleData: [],
            newview: ['1'],
            newuserids: [],
            newAddP: [],
            agentid: '', //微应用id
            timeStamp: '', //时间戳
            noncestr: '', //签名随机串
            signature: '', //签名
            cjtype: [],
            projectType: []
        };
    },
    methods: {
        cancelNewPa() {
            this.newPaVisible = false;
            this.addProjectText = '';
        },
        cancelNewP() {
            this.newPVisible = false;
            this.addZtText = '';
        },
        back() {
            this.$router.go(-1);
        },
        openAllPeople() {
            this.AllPeopleVisible = true;
        },
        //获取参建主体类型和项目类型
        getSelectList() {
            axios
                .post('/ding_ermodule/getcorpsubject', {
                    corp_id: this.$store.state.userData.cid,
                    newuid: this.$store.state.userData.uid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.cjtype = res.data.content[0].xmzhuti;
                        this.projectType = res.data.content[0].xmtype;
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
                    this.loaded = true;
                    this.$alert(error);
                });
        },
        viewSingel() {
            this.singelView = true;
        },
        //添加成员子组件传值
        titFn(payload) {
            this.tagsTitleData = this.unique(payload);
            this.ruleForm.ptype = this.tagsTitleData.map((item) => {
                if (!item.id) return '';
                return item.id;
            });
            this.ruleForm.title = this.tagsTitleData.map((item) => {
                if (!item.name) return '';
                return item.name;
            });
        },
        titFn2(payload) {
            this.newview = payload;
            if (this.newview.length > 0) {
                this.tagView = false;
            } else {
                this.tagView = true;
            }
        },
        parentFn3(payload) {
            this.newaddPeople = this.unique(payload);
            this.newuserids = this.newaddPeople.map((item) => {
                if (!item.user) return '';
                return item.user;
            });
        },
        parentFn4(payload) {
            this.neworgids = this.unique(payload);

            this.ruleForm.orgids = this.neworgids.map((item) => {
                if (!item.org_id) return '';
                return item.org_id;
            });
        },

        handleClose(tag) {
            this.newaddPeople.splice(this.newaddPeople.indexOf(tag), 1);
            this.newuserids = this.newaddPeople.map((item) => {
                if (!item.user) return '';
                return item.user;
            });
            // this.ManageName.splice(this.ManageName.indexOf(tag.user_name), 1);
            // this.ManageId.splice(this.ManageId.indexOf(tag.userid), 1);
        },
        viewGroup() {
            this.groupView = true;
        },
        save(formName) {
            this.loaded = true;

            this.ruleForm.urid = this.urid;
            this.ruleForm.id = this.$route.query.xmid;
            delete this.ruleForm.usercontent;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/laowu_yun/updateproject', this.ruleForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.loaded = false;
                                this.$message({
                                    message: '编辑成功',
                                    type: 'success'
                                });
                                setTimeout(() => {
                                    this.$router.go(-1);
                                }, 500);
                            } else if (res.data.status == 8) {
                                this.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning'
                                });
                                this.loaded = false;
                                setTimeout(() => {
                                    this.$router.go(-1);
                                }, 500);
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning'
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
        getMsg() {
            axios
                .post('/laowu_yun/projectcontent', {
                    corp_id: this.cid,
                    xmid: this.$route.query.xmid,
                    newuid: this.$store.state.userData.uid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.ruleForm = res.data.content;
                        console.log(this.ruleForm.kcleps)
                        console.log(typeof(this.ruleForm.kcleps))
                        console.log(typeof(['1', '2']))

                        this.tagsData = res.data.content.usercontent;
                        // this.tagsTitleData = this.ruleForm.ptype;
                        this.ruleForm.userids = this.tagsData.map((item) => {
                            if (!item.userid) return '';
                            return item.userid;
                        });
                        this.ruleForm.orgids = [];
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        deleteClose(tag) {
            if (this.urid > 3) {
                this.tagsData.splice(this.tagsData.indexOf(tag), 1);
                this.ruleForm.userids = this.tagsData.map((item) => {
                    if (!item.userid) return '';
                    return item.userid;
                });
            } else {
                this.$message({
                    message: '您没有权限进行此操作',
                    center: true,
                    duration: 2000,
                    type: 'warning'
                });
            }
        },
        unique(arr) {
            const res = new Map();
            return arr.filter(
                (arr) => !res.has(arr.userid) && res.set(arr.userid, 1)
            );
        },
        addManyP() {
            const that = this;
            if (that.urid > 3) {
                dd.ready(function () {
                    dd.biz.contact.complexPicker({
                        title: '通讯录', //标题
                        corpId: that.$store.state.userData.cid, //企业的corpId
                        multiple: true, //是否多选
                        limitTips: '超出了', //超过限定人数返回提示
                        maxUsers: 99, //最大可选人数
                        pickedUsers: [], //已选用户
                        pickedDepartments: [], //已选部门
                        disabledUsers: [], //不可选用户
                        disabledDepartments: [], //不可选部门
                        requiredUsers: [], //必选用户（不可取消选中状态）
                        requiredDepartments: [], //必选部门（不可取消选中状态）
                        appId: that.agentid, //微应用的Id
                        permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
                        responseUserOnly: true, //返回人，或者返回人和部门
                        startWithDepartmentId: 0, //仅支持0和-1
                        onSuccess: function (result) {
                            /**
                                    {
                                        selectedCount:1,                              //选择人数
                                        users:[{"name":"","avatar":"","userid":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段
                                        departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
                                    }
                                    */

                            let newObjs = JSON.parse(
                                JSON.stringify(result.users).replace(
                                    /emplId/g,
                                    'userid'
                                )
                            );
                            let objs = result.users.map((item) => {
                                if (!item.emplId) return '';
                                return item.emplId;
                            });
                            for (let i = 0; i < newObjs.length; i++) {
                                that.tagsData.push(newObjs[i]);
                            }
                            for (let i = 0; i < objs.length; i++) {
                                that.ruleForm.userids.push(objs[i]);
                            }
                            for (
                                let s = 0;
                                s < result.departments.length;
                                s++
                            ) {
                                that.neworgids.push(result.departments[s]);
                            }
                            that.ruleForm.orgids = that.neworgids.map(
                                (item) => {
                                    if (!item.id) return '';
                                    return item.id;
                                }
                            );
                            that.tagsData = that.unique(that.tagsData);
                            that.ruleForm.userids = that.dedupe(
                                that.ruleForm.userids
                            );
                            that.ruleForm.orgids = that.dedupe(
                                that.ruleForm.orgids
                            );
                        },
                        onFail: function (err) {
                            console.log(err);
                        }
                    });
                });
                dd.error(function (err) {
                    console.log(err);
                });
            } else {
                that.$message({
                    message: '您没有权限进行此操作',
                    center: true,
                    duration: 2000,
                    type: 'warning'
                });
            }
        },
        addNewContent() {
            this.newPVisible = true;
        },
        addNewPaper() {
            this.newPaVisible = true;
        },
        dedupe(array) {
            return Array.from(new Set(array));
        },
        //删除主体参建字段
        deleteCjItem(item, index) {
            axios
                .post('/ding_ermodule/deletecorpsubject', {
                    corp_id: this.$store.state.userData.cid,
                    newuid: this.$store.state.userData.uid,
                    szhuti: {
                        jiu: '0',
                        zname: item.zname
                    }
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 1500,
                            type: 'success'
                        });
                        this.cjtype.splice(index, 1);
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
                    this.$alert(error);
                });
        },
        //删除项目类型字段
        deleteXmItem(item, index) {
            axios
                .post('/ding_ermodule/deletecorpsubject', {
                    corp_id: this.$store.state.userData.cid,
                    newuid: this.$store.state.userData.uid,
                    sxmtype: {
                        jiu: '0',
                        type: item.type
                    }
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 1500,
                            type: 'success'
                        });
                        this.projectType.splice(index, 1);
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
                    this.$alert(error);
                });
        },
        //新增参建主体
        addPBtn() {
            if (this.addZtText) {
                this.loaded = true;
                axios
                    .post('/ding_ermodule/addcorpsubject', {
                        corp_id: this.cid,
                        newuid: this.$store.state.userData.uid,
                        zhuti: {
                            zname: this.addZtText,
                            corp_id: this.cid,
                            jiu: '0'
                        }
                    })
                    .then((res) => {
                        if (res.data.status == 1) {
                            this.newPVisible = false;
                            this.addZtText = '';
                            this.getSelectList();
                            this.$message({
                                message: res.data.msg,
                                center: true,
                                duration: 1500,
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
                        this.loaded = false;
                    })
                    .catch(function (error) {
                        this.loaded = false;
                        this.$message({
                            message: error,
                            center: true,
                            duration: 2000,
                            type: 'warning'
                        });
                    });
            } else {
                this.$message({
                    message: '不能为空',
                    center: true,
                    duration: 2000,
                    type: 'warning'
                });
            }
        },
        //新增项目类型
        addPaBtn() {
            if (this.addProjectText) {
                this.loaded = true;
                axios
                    .post('/ding_ermodule/addcorpsubject', {
                        corp_id: this.cid,
                        newuid: this.$store.state.userData.uid,
                        xmtype: {
                            type: this.addProjectText,
                            corp_id: this.cid,
                            jiu: '0'
                        }
                    })
                    .then((res) => {
                        if (res.data.status == 1) {
                            this.newPaVisible = false;
                            this.addProjectText = '';
                            this.getSelectList();
                            this.$message({
                                message: res.data.msg,
                                center: true,
                                duration: 1500,
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
                        this.loaded = false;
                    })
                    .catch(function (error) {
                        this.loaded = false;
                        this.$message({
                            message: error,
                            center: true,
                            duration: 2000,
                            type: 'warning'
                        });
                    });
            } else {
                this.$message({
                    message: '不能为空',
                    center: true,
                    duration: 2000,
                    type: 'warning'
                });
            }
        },
        checkding() {
            const that = this;
            axios
                .post('/ding/shoujitiongxun', {
                    corp_id: that.$store.state.userData.cid,
                    newuid: that.$store.state.userData.uid,
                    pc: '1'
                })
                .then((res) => {
                    if (res.data.status == '1') {
                        that.agentid = res.data.content.agentId;
                        that.timeStamp = res.data.content.timeStamp;
                        that.noncestr = res.data.content.nonceStr;
                        that.signature = res.data.content.signature;
                        dd.config({
                            agentId: that.agentid, // 必填，微应用ID
                            corpId: that.$store.state.userData.cid, //必填，企业ID
                            timeStamp: that.timeStamp, // 必填，生成签名的时间戳
                            nonceStr: that.noncestr, // 必填，生成签名的随机串
                            signature: that.signature, // 必填，签名
                            type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                            jsApiList: [
                                'biz.contact.complexPicker',
                                'biz.contact.choose',
                                'runtime.info',
                                'device.notification.confirm',
                                'device.notification.alert',
                                'device.notification.prompt',
                                'biz.ding.post',
                                'biz.util.openLink'
                            ] // 必填，需要使用的jsapi列表，注意：不要带dd。
                        });
                    }
                });
        },
        addSingP() {
            const that = this;
            document.getElementById('addinput').blur();
            if (that.urid > 4) {
                dd.ready(function () {
                    dd.biz.contact.complexPicker({
                        title: '通讯录', //标题
                        corpId: that.$store.state.userData.cid, //企业的corpId
                        multiple: false, //是否多选
                        limitTips: '超出了', //超过限定人数返回提示
                        maxUsers: 1, //最大可选人数
                        pickedUsers: [], //已选用户
                        pickedDepartments: [], //已选部门
                        disabledUsers: [], //不可选用户
                        disabledDepartments: [], //不可选部门
                        requiredUsers: [], //必选用户（不可取消选中状态）
                        requiredDepartments: [], //必选部门（不可取消选中状态）
                        appId: that.agentid, //微应用的Id
                        permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
                        responseUserOnly: true, //返回人，或者返回人和部门
                        startWithDepartmentId: 0, //仅支持0和-1
                        onSuccess: function (result) {
                            that.ruleForm.pname = result.users[0].name;
                            that.ruleForm.ppersonid = result.users[0].emplId;
                        },
                        onFail: function (err) {
                            console.log(err);
                        }
                    });
                });
                dd.error(function (err) {
                    console.log(err);
                });
            } else {
                this.$message({
                    message: '您没有权限进行此操作',
                    center: true,
                    duration: 2000,
                    type: 'warning'
                });
            }
        },
          fileSuffix(url) {
            var suffix = '';
            // url 根据 . 分组 去最后一组
            suffix = String(url).split('.');
            suffix = suffix.pop();

            // 带水印图片
            if (suffix.length > 4) {
                suffix = suffix.substring(0, suffix.indexOf('?'));
            }

            var res = 'other';
            switch (suffix) {
                case 'JPG':
                    res = 'img';
                    break;

                case 'png':
                    res = 'img';
                    break;

                case 'jpg':
                    res = 'img';
                    break;

                case 'jpeg':
                    res = 'img';
                    break;

                case 'docs':
                    res = 'file';
                    break;

                case 'pdf':
                    res = 'file';
                    break;

                case 'mp4':
                    res = 'mp4';
                    break;

                case 'MP4':
                    res = 'mp4';
                    break;

                case 'mov':
                    res = 'mp4';
                    break;

                default:
                    res = 'other';
                    break;
            }

            return res;
        },
        // 文件上传
        handelUploadA(val) {
          console.log(val, '文件')
          this.ruleForm.kcleps.push(val)
        },
        handelFileDeleteA(index) {
          this.ruleForm.kcleps.splice(index, 1)
        },
        showFile(item) {
          window.open(item)
        }
    },
    created() {
      //
    },
    computed: {
        // 结束时间大于开始时间
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.ruleForm.pstop;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            };
        },
        pickerEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.ruleForm.pstart;
                    if (beginDateVal) {
                        return (
                            // time.getTime() < Date.now() - 8.64e7 ||
                            time.getTime() <
                            new Date(beginDateVal).getTime() - 8.64e7
                        );
                    }
                }
            };
        },
    },
    mounted() {
      this.checkding();
      this.getMsg();
      this.getSelectList();
    }
};
</script>
<style lang="less">
body {
    .newAddDialog {
        .el-dialog {
            width: 500px;
            .itemDiv {
                display: flex;
                > span {
                    width: 100px;
                    line-height: 40px;
                }
            }
        }
    }
    .openPeopleDialog {
        .el-dialog {
            width: 517px;
            .addMList {
                margin-bottom: 15px;
            }
        }
    }
}
#Ad {
    background-color: #fff;
    padding-bottom: 30px;
    height: 100%;
    overflow-y: auto;
    .canjianLabel {
        .el-form-item__content {
            display: flex;
        }
    }
    .addManeger {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .showAllPeople {
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        padding-top: 12px;
    }
    .addMList {
        display: flex;
        .mdnList {
            text-align: center;
            position: relative;
            .mdren {
                width: 40px;
                height: 40px;
                line-height: 40px;
                border-radius: 50%;
                border: 1px solid #4090ef;
                overflow: hidden;
                margin: 0 auto;
                img {
                    width: 100%;
                    height: 100%;
                }
                .touxiang {
                    padding: 0;
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    background-color: #4099ef;
                    color: #fff;
                }
            }
            p {
                font-size: 12px;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 22px;
            }
            .el-icon-error {
                position: absolute;
                top: -6px;
                right: 0;
                font-size: 14px;
            }
        }
        .mdnPlus {
            line-height: 50px;
            padding: 0 4px;
            .el-icon-plus {
                font-size: 10px;
            }
        }
    }
    .addMListLast {
        .mdnList .mdren {
            border: 1px dashed #4090ef;
            .touxiang {
                background-color: #fff;
                .el-icon-plus {
                    color: #4090ef;
                }
            }
        }
    }
}
#Ad .back {
    padding: 6px;
    margin: 20px 0 10px 10px;
    background-color: #3a99f2;
    color: #fff;
    width: 60px;
    text-align: center;
}
#Ad .el-form {
    width: 80%;
    padding-left: 10%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
#Ad .el-form-item {
    display: flex;
    justify-content: space-between;
}
#Ad .el-form-item,
#Ad .el-date-editor.el-input,
#Ad .el-select {
    width: 100%;
}
#Ad .el-form-item__label {
    width: 30% !important;
    /* padding-right: 5%; */
}
#Ad .el-form-item__content,
#Ad .el-input__inner {
    width: 100%;
}
#Ad .el-form-item__content {
    text-align: center;
    margin-left: 0 !important;
}
#Ad .tab1 .tab-item .selectName .el-tabs__nav-scroll {
    position: relative;
}
#Ad .info,
#Ad .allInfo {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
#Ad h1,
#Ad .allInfo h1 {
    width: 100%;
    margin: 6px 0 20px 0;
}
#Ad .el-form-item {
    width: 44%;
    /* float: left; */
}
#group {
    width: 100%;
    margin-bottom: 22px;
}
#Ad #group .search {
    width: 50%;
    margin: 0 auto;
}
</style>
<style scoped>
#demo .el-tabs__content {
    overflow: hidden;
}
</style>


