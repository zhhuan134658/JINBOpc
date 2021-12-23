<template>
    <div id="editteam">
        <div>
            <div style="height: 40px">
                <el-button type="primary" @click="back" style="float: right"
                    >返回</el-button
                >
            </div>

            <el-form
                :model="editForm"
                label-width="254px"
                :rules="editFormRules"
                ref="inEditForm"
                label-position="right"
            >
                <h1>班组信息</h1>
                <el-form-item label="班组名称：" prop="name">
                    <el-input
                        v-model="editForm.name"
                        auto-complete="off"
                        maxlength="20"
                        show-word-limit
                    ></el-input>
                </el-form-item>

                <el-form-item label="企业单位名称：" prop="bzname">
                    <el-input
                        placeholder="请输入企业单位名称"
                        v-model="editForm.bzname"
                        maxlength="20"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="企业单位统一信用代码：" prop="bzcode">
                    <el-input
                        placeholder="请输入企业单位统一信用代码"
                        v-model="editForm.bzcode"
                        maxlength="20"
                    ></el-input>
                </el-form-item>
                <el-form-item label="班组负责人：" prop="bzperson">
                    <el-input
                        placeholder="请输入班组负责人"
                        readonly
                        id="addinput"
                        v-model="editForm.bzperson"
                        @focus="addSingP"
                    ></el-input>
                    <!-- <el-button type="primary" style="width:25%" @click="viewSingel">选择</el-button> -->
                </el-form-item>
                <el-form-item label="班组类型：" class="type">
                  <el-select v-model="editForm.bztype" placeholder="请选择">
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
                <el-form-item label="班组长电话：" prop="bzphone">
                    <el-input
                        type="tel"
                        placeholder="请输入班组长电话"
                        v-model="editForm.bzphone"
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

                <el-form-item
                    class="editTeamSaveBtn"
                    style="margin-top: 60px; width: 100%; text-align: center"
                >
                    <el-button
                        type="primary"
                        :loading="loaded"
                        @click="save('inEditForm')"
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
        </div>
        <el-dialog
            title="全部班组主管"
            :visible.sync="AllManagerVisible"
            :append-to-body="true"
            :close-on-click-modal="false"
            class="openPeopleDialog"
        >
            <div style="margin-bottom: 10px">共有{{ tagsZData.length }}人</div>
            <div class="showAllPeople">
                <div class="addMList" v-for="(item, index) in tagsZData">
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
            class="openPeopleDialog"
        >
            <div style="margin-bottom: 10px">共有{{ tagsData.length }}人</div>
            <div class="showAllPeople">
                <div class="addMList" v-for="(item, index) in tagsData">
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
        <el-dialog
            title="删除人员"
            :visible.sync="deletePVisible"
            :append-to-body="true"
            class="editteamDelete"
        >
            <span>
                <i class="el-icon-warning-outline" style="color: red"></i>
                确定删除？一旦删除无法找回，请谨慎删除！
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deletePVisible = false">取 消</el-button>
                <el-button type="primary" @click="deletePBtn">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="删除班组主管"
            :visible.sync="deleteZVisible"
            :append-to-body="true"
            class="editteamDelete"
        >
            <span>
                <i class="el-icon-warning-outline" style="color: red"></i>
                确定删除？一旦删除无法找回，请谨慎删除！
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteZVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteZBtn">确 定</el-button>
            </span>
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
export default {
    data() {
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
            areaform: {
                area: '2'
            },
            deletePVisible: false,
            deleteZVisible: false,
            AllManagerVisible: false,
            AllPeopleVisible: false,
            AllBanzuVisible: false,
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            tabList: [],
            uid: this.$store.state.userData.uid,
            cid: this.$store.state.userData.cid,
            tabPosition: 'left',
            insideTableData: [],
            editLoading: false,
            loaded: false,
            groupView: false,
            singelView: false,
            creatFormVisible: false,
            watchFormVisible: false, //查看界面
            editFormVisible: false, //编辑界面
            tagsData: [],
            tagsZData: [],
            neworgids: [],
            gneworgids: [],
            editForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                name: '',
                bzpersonid: '',
                bzperson: '',
                urid: this.$store.state.userData.urid,
                bzname: '',
                bzcode: '',
                bzphone: '',
                bztype: '',
                bzid: '',
                guserids: [],
                gorgids: []
            }, //编辑数据
            editFormRules: {
                bzphone: [
                    {
                        required: true,
                        message: '班组长电话不能为空',
                        trigger: 'blur'
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '班组名称不能为空',
                        trigger: 'blur'
                    }
                ],
                bzperson: [
                    {
                        required: true
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
            //子组件传回的值
            ManageName: [],
            ManageId: [],
            MemberName: '',
            MemberId: '',
            childbzid: '',
            failMsg: '',
            isFail: false,
            groupView: false,
            userids: [],
            orgids: [],
            newaddPeople: [],
            newaddTeam: [],
            isList: true,
            agentid: '', //微应用id
            timeStamp: '', //时间戳
            noncestr: '', //签名随机串
            signature: '', //签名
            deletePTag: '',
            deleteuserids: [],
            deleteuseridslist: [],
            // 新增班组字段弹窗
            newPaVisible: false,
            addProjectText: '',
            bztypes: []
        };
    },
    methods: {
        getTeamPerson() {
            axios
                .post('/laowu_yun/projectteamcontent', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    bzid: this.$route.query.bzid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.tagsData = res.data.content.users;
                        this.tagsZData = res.data.content.gusers;
                        this.editForm = res.data.content;
                        this.editForm.guserids = this.tagsZData.map((item) => {
                            if (!item.userid) return '';
                            return item.userid;
                        });
                        this.userids = this.tagsData.map((item) => {
                            if (!item.userid) return '';
                            return item.userid;
                        });
                    }
                });
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
        deleteClose(tag) {
            console.log(tag);
            this.deletePVisible = true;
            this.deletePTag = tag;
        },
        deleteZClose(tag) {
            this.deleteZVisible = true;
            this.deleteZTag = tag;
        },
        deleteZBtn() {
            this.tagsZData.splice(this.tagsZData.indexOf(this.deleteZTag), 1);
            this.editForm.guserids = this.tagsZData.map((item) => {
                if (!item.userid) return '';
                return item.userid;
            });
            this.deleteZVisible = false;
        },
        deletePBtn() {
            this.deleteuseridslist.push(this.deletePTag);
            this.deleteuserids = this.deleteuseridslist.map((item) => {
                if (!item.userid) return '';
                return item.userid;
            });
            console.log(this.deleteuserids);
            this.tagsData.splice(this.tagsData.indexOf(this.deletePTag), 1);
            this.userids = this.tagsData.map((item) => {
                if (!item.userid) return '';
                return item.userid;
            });
            this.deletePVisible = false;
        },
        //去重
        unique(arr) {
            const res = new Map();
            return arr.filter(
                (arr) => !res.has(arr.userid) && res.set(arr.userid, 1)
            );
        },
        handleBanzuClose(tag) {
            this.neworgids.splice(this.neworgids.indexOf(tag), 1);
            this.ruleForm.orgids = this.neworgids.map((item) => {
                if (!item.id) return '';
                return item.id;
            });
        },
        save(formName) {
            const that = this;
            that.loaded = true;
            delete that.editForm.users;
            delete that.editForm.gusers;
            that.editForm.urid = that.$store.state.userData.urid;
            that.editForm.corp_id = that.$store.state.userData.cid;
            that.editForm.bzid = that.$route.query.bzid;

            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/laowu_yun/updateprojectteam', that.editForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                // that.$refs.inEditForm.resetFields(); // 清空表单
                                // that.editFormVisible = false;
                                that.addperson();
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
        addperson() {
            const that = this;
            axios
                .post('/laowu_yun/useraddteam', {
                    corp_id: that.cid,
                    newuid: that.$store.state.userData.uid,
                    bzid: that.$route.query.bzid,
                    userids: that.userids,
                    orgids: that.orgids,
                    deleteuserids: that.deleteuserids
                })
                .then((res) => {
                    if (res.data.status == 1 || res.data.status == 88) {
                        that.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 4000,
                            type: 'success'
                        });
                        that.loaded = false;
                        that.neworgids = [];
                        that.$router.go(-1);
                    } else {
                        that.loaded = false;
                        that.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 4000,
                            type: 'warning'
                        });
                    }
                });
        },
        back() {
            this.$router.go(-1);
        },
        deunique(arr) {
            const res = new Map();
            return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
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
                        let objs = JSON.parse(
                            JSON.stringify(result.users).replace(
                                /emplId/g,
                                'userid'
                            )
                        );
                        for (let i = 0; i < objs.length; i++) {
                            that.tagsData.push(objs[i]);
                        }
                        for (let s = 0; s < result.departments.length; s++) {
                            that.neworgids.push(result.departments[s]);
                        }
                        that.tagsData = that.unique(that.tagsData);
                        that.neworgids = that.deunique(that.neworgids);
                        // let newbz = [];
                        that.userids = that.tagsData.map((item) => {
                            if (!item.userid) return '';
                            return item.userid;
                        });
                        that.orgids = that.neworgids.map((item) => {
                            if (!item.id) return '';
                            return item.id;
                        });

                        // for (let g = 0; g < objs.length; g++) {
                        //     that.orgids.push(newbz[g]);
                        // }
                        that.userids = that.dedupe(that.userids);
                        that.orgids = that.dedupe(that.orgids);
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

                        let objs = JSON.parse(
                            JSON.stringify(result.users).replace(
                                /emplId/g,
                                'userid'
                            )
                        );
                        for (let i = 0; i < objs.length; i++) {
                            that.tagsZData.push(objs[i]);
                        }
                        for (let s = 0; s < result.departments.length; s++) {
                            that.gneworgids.push(result.departments[s]);
                        }
                        that.tagsZData = that.unique(that.tagsZData);

                        // let newbz = [];

                        that.editForm.guserids = that.tagsZData.map((item) => {
                            if (!item.userid) return '';
                            return item.userid;
                        });
                        that.editForm.gorgids = that.gneworgids.map((item) => {
                            if (!item.id) return '';
                            return item.id;
                        });

                        // for (let g = 0; g < objs.length; g++) {
                        //     that.orgids.push(newbz[g]);
                        // }
                        that.editForm.guserids = that.dedupe(
                            that.editForm.guserids
                        );
                        that.editForm.gorgids = that.dedupe(
                            that.editForm.gorgids
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
        }, //去重
        dedupe(array) {
            return Array.from(new Set(array));
        },
        checkding() {
            const that = this;
            axios
                .post('/ding/shoujitiongxun', {
                    corp_id: that.$store.state.userData.cid,
                    newuid: this.$store.state.userData.uid,
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
                        that.editForm.bzperson = result.users[0].name;
                        that.editForm.bzpersonid = result.users[0].emplId;
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
    mounted() {
        this.checkding();
        this.getTeamPerson();
    },
    created() {
      this.getSelectList()
    }
};
</script>
<style lang="less">
body {
    .editteamDelete,
    .openPeopleDialog {
        .el-dialog {
            width: 517px;
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
            .addMList {
                margin-bottom: 15px;
            }
        }
    }
}
#editteam {
    background-color: #fff;
    padding: 10px;
    height: 100%;
    .el-form {
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        h1 {
            width: 100%;
            margin: 6px 0 20px;
        }
        .el-form-item {
            width: 44%;
            display: flex;
            justify-content: space-between;
            .el-form-item__label {
                width: 254px !important;
            }
            .el-select {
                width: 100%;
            }
        }
        .editTeamSaveBtn {
            .el-button {
                width: 200px;
            }
        }
    }
    .el-form-item__content {
        width: 100%;
        margin-left: 0 !important;
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
</style>