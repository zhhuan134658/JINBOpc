<template>
    <!-- 新增班组+++++++++++++ -->
    <div id="Ad" style="margin-left: 0">
        <div style="height: 40px">
            <el-button type="primary" @click="back" style="float: right"
                >返回</el-button
            >
        </div>
        <el-form
            label-width="254px"
            :rules="creatProjectrules"
            :label-position="labelPosition"
            ref="creatProject"
            :model="ruleForm"
        >
            <!-- <div class="info"> -->
            <h1>新增班组</h1>
            <el-form-item label="班组名称：" prop="name">
                <el-input
                    placeholder="请输入班组名称"
                    v-model="ruleForm.name"
                    maxlength="20"
                    show-word-limit
                ></el-input>
            </el-form-item>

            <el-form-item label="企业单位名称：" prop="bzname">
                <el-input
                    v-model="ruleForm.bzname"
                    placeholder="请输入企业单位名称"
                    maxlength="20"
                    show-word-limit
                ></el-input>
            </el-form-item>

            <el-form-item label="企业单位统一信用代码：" prop="bzcode">
                <el-input
                    v-model="ruleForm.bzcode"
                    placeholder="请输入企业单位统一信用代码"
                    maxlength="20"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="班组负责人："
                prop="bzperson"
                style="display: flex; justify-content: space-between"
            >
                <el-input
                    placeholder="请点击右侧按钮选择或搜索负责人"
                    readonly
                    id="addinput"
                    v-model="ruleForm.bzperson"
                    @focus="addSingP"
                ></el-input>
                <!-- <el-button type="primary" style="width:25%" @click="viewSingel">选择</el-button> -->
            </el-form-item>

            <el-form-item label="班组类型：" class="type">
                <el-select v-model="ruleForm.bztype" placeholder="请选择">
                    <el-option v-for="(item, index) in bztypes" :key="`bztype-${index}`" :label="item.zname" :value="item.zname">
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
                  @click="addNewPaper"
                  style="float: right"
                  >新增字段</el-button
                >
            </el-form-item>

            <!-- <button @click="viewSingel">点击</button> -->

            <el-form-item label="班组长电话：" prop="bzphone">
                <el-input
                    type="tel"
                    v-model="ruleForm.bzphone"
                    placeholder="请输入班组长电话"
                    maxlength="13"
                ></el-input>
            </el-form-item>
            <el-form-item label="班组主管：">
                <div class="addManeger">
                    <div class="addMList" v-if="tagsZData.length > 3">
                        <div class="mdnList">
                            <div class="mdren" @click="openAllManager">
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
                        v-for="(item, index) in tagsZData.slice(0, 3)"
                    >
                        <div class="mdnList">
                            <div class="mdren">
                                <img
                                    v-if="item.headerurl"
                                    :src="item.headerurl"
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
                                @click="deleteZClose(item)"
                            ></i>
                        </div>
                        <div class="mdnPlus">
                            <i class="el-icon-plus"></i>
                        </div>
                    </div>
                    <div class="addMList addMListLast">
                        <div class="mdnList">
                            <div class="mdren" @click="addManyZP">
                                <span class="touxiang">
                                    <i class="el-icon-plus"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-form-item>

            <el-form-item label="班组成员：">
                <div class="addManeger">
                    <div class="addMList" v-if="neworgids.length > 0">
                        <div class="mdnList">
                            <div class="mdren" @click="openAllBanzu">
                                <span class="touxiang">
                                    <i class="el-icon-s-custom"></i>
                                </span>
                            </div>
                            <p>查看 班组</p>
                        </div>
                        <div class="mdnPlus">
                            <i class="el-icon-plus"></i>
                        </div>
                    </div>
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
                    >
                        <div class="mdnList">
                            <div class="mdren">
                                <img
                                    v-if="item.headerurl"
                                    :src="item.headerurl"
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
                                @click="handleClose(item)"
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

            <!-- <div style="width:100%;margin-bottom:20px;">
                <div style="width:100%;margin-bottom:20px;">
                    <div>班组主管：</div>
                    <el-tag
                        v-for="tag in tagsZData"
                        :key="tag.user"
                        closable
                        :type="tag.name"
                        style="margin:6px;"
                        @click="deleteZClose(tag)"
                    >{{tag.name}}</el-tag>
                </div>
                <div style="width:100%;margin-bottom:20px;">
                    <div>班组：</div>
                    <el-tag
                        v-for="tag in neworgids"
                        :key="tag.id"
                        :type="tag.name"
                        style="margin:6px;"
                    >{{tag.name}}</el-tag>
                </div>
                <el-button
                    type="primary"
                    style="width:140px;text-align:center;"
                    @click="addManyZP"
                >添加班组主管</el-button>
            </div>-->
            <!-- <div style="width:100%;">
                <div style="width:100%;margin-bottom:20px;">
                    <div>项目成员：</div>
                    <el-tag
                        v-for="tag in tagsData"
                        :key="tag.id"
                        closable
                        :type="tag.name"
                        style="margin:6px;"
                        @close="handleClose(tag)"
                    >{{tag.name}}</el-tag>
                </div>
                <div style="width:100%;margin-bottom:20px;">
                    <div>班组：</div>
                    <el-tag
                        v-for="tag in neworgids"
                        :key="tag.id"
                        :type="tag.name"
                        style="margin:6px;"
                    >{{tag.name}}</el-tag>
                </div>
            </div>
            <el-button
                type="primary"
                style="width:140px;text-align:center;"
                @click="addManyP"
            >添加班组成员</el-button>-->

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
            title="全部班组主管"
            :visible.sync="AllManagerVisible"
            :append-to-body="true"
            :close-on-click-modal="false"
            class="teamopenPeopleDialog"
        >
            <div style="margin-bottom: 10px">共有{{ tagsZData.length }}人</div>
            <div class="showAllPeople">
                <div class="addMList" v-for="(item, index) in tagsZData">
                    <div class="mdnList">
                        <div class="mdren">
                            <img
                                v-if="item.headerurl"
                                :src="item.headerurl"
                                alt
                            />
                            <span class="touxiang" v-else>{{
                                item.name.length <= 2
                                    ? item.name
                                    : item.name.substr(item.name.length - 2, 2)
                            }}</span>
                        </div>
                        <p>{{ item.name }}</p>
                        <i
                            class="el-icon-error"
                            @click="deleteZClose(item)"
                        ></i>
                    </div>
                    <div class="mdnPlus">
                        <i class="el-icon-plus"></i>
                    </div>
                </div>
                <div class="addMList addMListLast">
                    <div class="mdnList">
                        <div class="mdren" @click="addManyZP">
                            <span class="touxiang">
                                <i class="el-icon-plus"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            title="全部班组人员"
            :visible.sync="AllPeopleVisible"
            :append-to-body="true"
            :close-on-click-modal="false"
            class="teamopenPeopleDialog"
        >
            <div style="margin-bottom: 10px">共有{{ tagsData.length }}人</div>
            <div class="showAllPeople">
                <div class="addMList" v-for="(item, index) in tagsData">
                    <div class="mdnList">
                        <div class="mdren">
                            <img
                                v-if="item.headerurl"
                                :src="item.headerurl"
                                alt
                            />
                            <span class="touxiang" v-else>{{
                                item.name.length <= 2
                                    ? item.name
                                    : item.name.substr(item.name.length - 2, 2)
                            }}</span>
                        </div>
                        <p>{{ item.name }}</p>
                        <i class="el-icon-error" @click="handleClose(item)"></i>
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
        <el-dialog
            title="全部班组"
            :visible.sync="AllBanzuVisible"
            :append-to-body="true"
            :close-on-click-modal="false"
            class="teamopenPeopleDialog"
        >
            <div style="margin-bottom: 10px">共有{{ neworgids.length }}组</div>
            <div class="showAllPeople">
                <div class="addMList" v-for="(item, index) in neworgids">
                    <div class="mdnList">
                        <div class="mdren">
                            <!-- <img v-if="item.headerurl" :src="item.headerurl" alt /> -->
                            <span class="touxiang">{{
                                item.name.length <= 2
                                    ? item.name
                                    : item.name.substr(item.name.length - 2, 2)
                            }}</span>
                        </div>
                        <p>{{ item.name }}</p>
                        <i
                            class="el-icon-error"
                            @click="handleBanzuClose(item)"
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
    </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import { setTimeout } from 'timers';
export default {
    data() {
        var validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入班组名称'));
            } else {
                callback();
            }
        };
        var validateuser = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择负责人'));
            } else {
                callback();
            }
        };
        var validatebzphone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入正确的手机号'));
            } else {
                const reg = /^1\d{10}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            }
        };

        var validatebzcode = (rule, value, callback) => {
            if (value) {
                const reg = /^[0-9a-zA-Z]*$/;
                // const rex = /s/;
                if (!reg.test(value)) {
                    callback(
                        new Error(
                            '请输入正确的单位统一信用代码（格式为数字和英文字母）'
                        )
                    );
                } else {
                    callback();
                }
            } else {
                callback(new Error('请输入，不能为空'));
            }
        };
        var validBlank = (rule, value, callback) => {
            if (value) {
                const rex = /^\S+$/;
                if (!rex.test(value)) {
                    callback(new Error('请输入正确的名称'));
                } else {
                    callback();
                }
            } else {
                callback(new Error('请输入，不能为空'));
            }
        };
        return {
            labelPosition: 'right',
            loaded: false,
            manageList: false,
            AllManagerVisible: false,
            AllPeopleVisible: false,
            AllBanzuVisible: false,
            //创建验证规则
            creatProjectrules: {
                name: [
                    { required: true, validator: validateName, trigger: 'blur' }
                ],
                bzperson: [{ required: true, validator: validateuser }],
                bzphone: [
                    {
                        required: true,
                        message: '班组长电话不能为空',
                        trigger: 'blur'
                    }
                ],
                // bzcode: [
                //     {
                //         required: true,
                //         validator: validatebzcode,
                //         trigger: 'blur'
                //     }
                // ],
                // bzname: [
                //     {
                //         required: true,
                //         validator: validBlank,
                //         trigger: 'blur'
                //     }
                // ]
            },
            groupView: false,
            singelView: false,
            //创建表单参数
            ruleForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                urid: this.$store.state.userData.urid,
                xmid: this.$route.query.xmid,
                name: '',
                bzpersonid: '',
                bzperson: '',
                bzcode: '',
                bzphone: '',
                bztype: '',
                userids: [],
                orgids: []
            },
            //创建是否成功
            isFail: false,
            failMsg: '',
            //子组件传回的值
            ManageName: [],
            ManageId: [],
            MemberName: '',
            MemberId: '',
            tagsData: [],
            tagsZData: [],
            neworgids: [],
            gneworgids: [],
            agentid: '', //微应用id
            timeStamp: '', //时间戳
            noncestr: '', //签名随机串
            signature: '', //签名
            // 新增班组字段弹窗
            newPaVisible: false,
            addProjectText: '',
            bztypes: []
        };
    },
    methods: {
        pickerStart: {
            disabledDate: (time) => {
                if (this.ruleForm.pstop != '') {
                    return (
                        time.getTime() > new Date(this.ruleForm.pstop).getTime()
                    );
                }
            },
            pickerEnd: {
                disabledDate: (time) => {
                    return (
                        time.getTime() <
                        new Date(this.ruleForm.pstop).getTime() -
                            1 * 24 * 60 * 60 * 1000
                    ); //减去一天的时间代表可以选择同一天;
                }
            }
        },
        back() {
            this.$router.go(-1);
        },
        viewSingel() {
            this.singelView = true;
        },
        openAllPeople() {
            this.AllPeopleVisible = true;
        },
        openAllBanzu() {
            this.AllBanzuVisible = true;
        },
        openAllManager() {
            this.AllManagerVisible = true;
        },
        handleClose(tag) {
            this.tagsData.splice(this.tagsData.indexOf(tag), 1);
            this.ruleForm.userids = this.tagsData.map((item) => {
                if (!item.emplId) return '';
                return item.emplId;
            });
        },
        handleBanzuClose(tag) {
            this.neworgids.splice(this.neworgids.indexOf(tag), 1);
            this.ruleForm.orgids = this.neworgids.map((item) => {
                if (!item.id) return '';
                return item.id;
            });
        },
        deleteZClose(tag) {
            this.tagsZData.splice(this.tagsZData.indexOf(tag), 1);
            this.ruleForm.guserids = this.tagsZData.map((item) => {
                if (!item.emplId) return '';
                return item.emplId;
            });
        },
        viewGroup() {
            this.groupView = true;
        },
        save(formName) {
            this.loaded = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/laowu_yun/addprojectteam', this.ruleForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.loaded = false;

                                setTimeout(() => {
                                    this.$router.go(-1);
                                }, 500);
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 4000,
                                    type: 'warning'
                                });
                                this.loaded = false;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    this.loaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //去重
        dedupe(array) {
            return Array.from(new Set(array));
        },
        unique(arr) {
            const res = new Map();
            return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
        },
        deunique(arr) {
            const res = new Map();
            return arr.filter(
                (arr) => !res.has(arr.emplId) && res.set(arr.emplId, 1)
            );
        },
        addManyP() {
            const that = this;

            dd.ready(function () {
                dd.biz.contact.complexPicker({
                    title: '通讯录', //标题
                    corpId: that.$store.state.userData.cid, //企业的corpId
                    multiple: true, //是否多选
                    limitTips: '超出了', //超过限定人数返回提示
                    maxUsers: 1000, //最大可选人数
                    pickedUsers: [], //已选用户
                    pickedDepartments: [], //已选部门
                    disabledUsers: [], //不可选用户
                    disabledDepartments: [], //不可选部门
                    requiredUsers: [], //必选用户（不可取消选中状态）
                    requiredDepartments: [], //必选部门（不可取消选中状态）
                    appId: that.agentid, //微应用的Id
                    permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
                    responseUserOnly: false, //返回人，或者返回人和部门
                    startWithDepartmentId: 0, //仅支持0和-1
                    onSuccess: function (result) {
                        console.log(
                            '444+++' + JSON.stringify(result.departments)
                        );
                        let newPeople = [];
                        let newbz = [];
                        // that.tagsData.concat(result.users);
                        that.tagsData = that.deunique(
                            that.tagsData.concat(result.users)
                        );
                        that.neworgids = that.unique(
                            that.neworgids.concat(result.departments)
                        );

                        console.log('55+++' + JSON.stringify(that.neworgids));
                        newPeople = result.users.map((item) => {
                            if (!item.emplId) return '';
                            return item.emplId;
                        });
                        newbz = that.neworgids.map((item) => {
                            if (!item.id) return '';
                            return item.id;
                        });

                        that.ruleForm.userids = newPeople;
                        that.ruleForm.orgids = newbz;
                    },
                    onFail: function (err) {
                        console.log(err);
                    }
                });
            });
            dd.error(function (err) {
                console.log(err);
            });
        },
        addManyZP() {
            const that = this;

            dd.ready(function () {
                dd.biz.contact.complexPicker({
                    title: '通讯录', //标题
                    corpId: that.$store.state.userData.cid, //企业的corpId
                    multiple: true, //是否多选
                    limitTips: '超出了', //超过限定人数返回提示
                    maxUsers: 1000, //最大可选人数
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
                        let newZPeople = [];
                        let newZbz = [];
                        that.tagsZData = result.users;
                        that.gneworgids = result.departments;
                        newZPeople = result.users.map((item) => {
                            if (!item.emplId) return '';
                            return item.emplId;
                        });
                        newZbz = result.departments.map((item) => {
                            if (!item.id) return '';
                            return item.id;
                        });

                        that.ruleForm.guserids = newZPeople;
                        that.ruleForm.gorgids = newZbz;
                        // let objs = JSON.parse(
                        //     JSON.stringify(result.users).replace(
                        //         /emplId/g,
                        //         'user'
                        //     )
                        // );
                        // for (let i = 0; i < objs.length; i++) {
                        //     that.tagsZData.push(objs[i]);
                        // }
                        // for (let s = 0; s < result.departments.length; s++) {
                        //     that.gneworgids.push(result.departments[s]);
                        // }
                        // that.tagsZData = that.dedupe(that.tagsZData);

                        // // let newbz = [];

                        // that.ruleForm.guserids = that.tagsZData.map(item => {
                        //     if (!item.user) return '';
                        //     return item.user;
                        // });
                        // that.ruleForm.gorgids = that.gneworgids.map(item => {
                        //     if (!item.id) return '';
                        //     return item.id;
                        // });

                        // that.ruleForm.guserids = that.dedupe(
                        //     that.ruleForm.guserids
                        // );
                        // that.ruleForm.gorgids = that.dedupe(
                        //     that.ruleForm.gorgids
                        // );
                    },
                    onFail: function (err) {
                        console.log(err);
                    }
                });
            });
            dd.error(function (err) {
                console.log(err);
            });
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
                        that.ruleForm.bzperson = result.users[0].name;
                        that.ruleForm.bzpersonid = result.users[0].emplId;
                    },
                    onFail: function (err) {
                        console.log(err);
                    }
                });
            });
            dd.error(function (err) {
                console.log(err);
            });
        },
      addNewPaper() {
          this.newPaVisible = true;
      },
      cancelNewPa() {
          this.newPaVisible = false;
          this.addProjectText = '';
      },
      //新增项目类型
      addPaBtn() {
          if (this.addProjectText) {
              this.loaded = true;
              axios
                  .post('/ding_ermodule/addcorpsubject', {
                      corp_id: this.$store.state.userData.cid,
                      newuid: this.$store.state.userData.uid,
                      bztype: {
                          zname: this.addProjectText,
                          corp_id: this.$store.state.userData.cid,
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
      //获取参建主体类型和项目类型
      getSelectList() {
          axios
              .post('/ding_ermodule/getcorpsubject', {
                  corp_id: this.$store.state.userData.cid,
                  newuid: this.$store.state.userData.uid
              })
              .then((res) => {
                  if (res.data.status == 1) {
                      this.bztypes = res.data.content[0].bztype;
                      console.log(res.data)
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
                  this.$message({
                      message: res.data.msg,
                      center: true,
                      duration: 2000,
                      type: 'error'
                  });
              });
      },
      //删除主体参建字段
      deleteCjItem(item, index) {
          axios
              .post('/ding_ermodule/deletecorpsubject', {
                  corp_id: this.$store.state.userData.cid,
                  newuid: this.$store.state.userData.uid,
                  bztype: {
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
                      this.bztypes.splice(index, 1);
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
    },
    created() {
      this.getSelectList()
    },
    mounted() {
        this.checkding();
    }
};
</script>
<style lang="less">
body {
    .teamopenPeopleDialog {
        .el-dialog {
            width: 517px;
            .addMList {
                margin-bottom: 15px;
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
    }
}
#Ad {
    background-color: #fff;
    padding: 10px;
    .canjianLabel {
        .el-form-item__content {
            display: flex;
        }
        .el-button {
            height: 40px;
        }
    }
    .type {
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
    width: 254px !important;
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