<template>
    <div id="ctable">
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
                    src="../../../static/images/write.png"
                    alt
                />
                <div style="font-size: 16px">请选择班组</div>
            </div>
        </div>
        <div class="ctable" v-show="viwePage">
            <div class="right-topheader">
                <div style="line-height: 1">
                    <span
                        style="
                            font-size: 14px;
                            color: #606266;
                            line-height: 40px;
                        "
                        >人员查询</span
                    >
                    <!-- <span
                      style="font-size: 14px; color: red; line-height: 40px"
                    >（表格中标星的为钉钉中已删除的人员）</span> -->
                </div>
                <div>
                    <el-button
                        type="primary"
                        style="width: 140px; text-align: center"
                        @click="addManyP"
                        v-if="workType == '1'"
                        >添加班组成员</el-button
                    >
                    <router-link
                        :to="{ name: 'duqu', query: { bzid: this.bzid } }"
                    >
                        <el-button
                            type="primary"
                            style="padding: 0"
                            class="bulu"
                            >设备录入</el-button
                        >
                    </router-link>
                    <el-button
                        v-if="workType == '1'"
                        type="primary"
                        @click="lead"
                        >表格录入</el-button
                    >
                </div>
            </div>
            <el-divider></el-divider>
            <div class="cdiv1">
                <el-form
                    :inline="true"
                    :model="searchform"
                    class="demo-form-inline"
                    @submit.native.prevent
                    style="display: flex; justify-content: space-between"
                >
                    <div style="display: flex">
                        <el-form-item style="float: left" class="formSelect">
                            <el-button
                                type="primary"
                                plain
                                icon="el-icon-collection-tag"
                                @click="manySelect"
                                >筛选</el-button
                            >
                        </el-form-item>
                        <el-form-item label="姓名：" style="float: left">
                            <el-input
                                v-model="searchform.name"
                                placeholder="请填写姓名"
                                @keyup.enter.native="search"
                            ></el-input>
                        </el-form-item>
                        <el-form-item style="float: left">
                            <el-button type="primary" plain @click="search"
                                >查询</el-button
                            >
                        </el-form-item>
                    </div>

                    <div style="display: flex; height: 40px; line-height: 40px">
                        <!-- <el-button
                            type="primary"
                            plain
                            v-for="(item, index) in statusList"
                            @click="statusClick(index, item.id)"
                            :class="active == index ? 'blue' : ''"
                            :key="index"
                            >{{ item.name }}</el-button
                        > -->
                        <!-- <el-button type="danger" plain @click="statusAllClick()">一键离场</el-button> -->
                    </div>
                </el-form>
                <div class="mainTable">
                    <div class="scroTable">
                        <el-table
                            ref="multipleTable"
                            @selection-change="handleSelectionChange"
                            :data="peopleList"
                            border
                            style="
                                width: 100%;
                                text-align: center;
                                margin-bottom: 20px;
                            "
                            :default-sort="{
                                prop: 'date',
                                order: 'descending'
                            }"
                        >
                            <!-- <el-table-column
                                type="selection"
                                width="55"
                            ></el-table-column> -->
                            <el-table-column
                                prop="name"
                                label="姓名"
                                show-overflow-tooltip="true"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="sex"
                                width="55"
                                label="性别"
                            ></el-table-column>
                            <el-table-column
                                prop="projectname"
                                label="部门"
                                show-overflow-tooltip="true"
                            >
                            </el-table-column>

                            <el-table-column
                                prop="phone"
                                label="手机号"
                                show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="worktype"
                                label="工种"
                                show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="usertype"
                                width="100"
                                label="人员类型"
                            ></el-table-column>
                            <el-table-column
                                prop="zhuangtai"
                                width="100"
                                label="人员状态"
                            ></el-table-column>
                            <el-table-column
                                prop="kahao"
                                label="IC卡号"
                                show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                v-if="lvalue == '2'"
                                prop="jcstart"
                                label="入场时间"
                                show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                v-if="lvalue == '2'"
                                prop="ccstop"
                                label="离场时间"
                                show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="140"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        v-if="scope.row.zhuangtai == '在场'"
                                        @click="handleWatch(scope.row)"
                                        type="text"
                                        size="small"
                                        >查看</el-button
                                    >
                                    <el-button
                                        v-if="scope.row.zhuangtai == '离场'"
                                        @click="handleEditWatch(scope.row)"
                                        type="text"
                                        size="small"
                                        >查看</el-button
                                    >
                                    <!-- <el-button
                                        v-if="scope.row.zhuangtai == '在场'"
                                        @click="handleEdit(scope.row)"
                                        type="text"
                                        size="small"
                                        style="color: red"
                                        >离场</el-button
                                    > -->
                                </template>

                                <!-- <template slot-scope="scope" v-if="xianshi1" >
                            <el-button @click="watchlink(scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="revise(scope.row)" type="text" size="small">离场凭证</el-button>
                                </template>-->
                            </el-table-column>
                        </el-table>
                        <div>
                            <el-button-group style="width: 100%">
                                <el-button
                                    class="leftBtnGroup"
                                    @click="PeopleDerive"
                                    size="small"
                                    type="primary"
                                    v-if="workType == '1'"
                                    >导出全部人员</el-button
                                >
                                <el-button
                                    @click="mdBzBtn"
                                    size="small"
                                    type="primary"
                                    >导出勾选人员</el-button
                                >
                            </el-button-group>
                        </div>
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
                    </div>
                </div>
                <el-dialog
                    title="离场"
                    :visible.sync="manyFormVisible"
                    v-if="manyFormVisible"
                    :before-close="handleClose"
                    :show-close="false"
                    :append-to-body="true"
                    class="lichangdialog"
                >
                    <el-form
                        :model="manyForm"
                        label-width="100px"
                        :rules="manyFormRules"
                        ref="manyEditForm"
                        label-position="right"
                    >
                        <el-form-item label="姓名：">
                            <div>{{ myname }}</div>
                        </el-form-item>
                        <el-form-item label="身份证号：">
                            <div>{{ myid }}</div>
                        </el-form-item>
                        <el-form-item label="评分：" prop="pjtype">
                            <el-rate
                                v-model="ratenum"
                                :texts="ratetexts"
                                show-text
                                @change="rateChange"
                            ></el-rate>
                        </el-form-item>
                        <el-form-item label="离场评价：" prop="pjcontent">
                            <el-input
                                type="textarea"
                                v-model="manyForm.pjcontent"
                                maxlength="60"
                                show-word-limit
                                placeholder="请输入评价内容（最多60字）"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="评价人：" prop="pjname">
                            <div>{{ manyForm.pjname }}</div>
                        </el-form-item>
                        <el-form-item label="离场凭证：" prop="pjurl">
                            <div>
                                <el-radio
                                    v-for="item in fileList"
                                    v-model="radio"
                                    :label="item.value"
                                    @change="fileChange"
                                    :key="item"
                                    >{{ item.label }}</el-radio
                                >
                            </div>
                            <pdfupload
                                v-if="FileType"
                                ref="mychild"
                                :upImgList="upImgList"
                                :licenceImg="licenceImg"
                                :isShow="isShow"
                                @listenToChildEvent="show"
                            ></pdfupload>
                            <upload
                                v-else
                                @listenToChildEvent="show"
                                :upImgList="upImgList"
                                :licenceImg="licenceImg"
                                :isShow="isShow"
                            ></upload>
                        </el-form-item>
                        <!-- <el-form-item label="提示：">
                            <el-checkbox v-model="zflc" @change="leafCheck"
                                >同时在政府平台离场人员</el-checkbox
                            >
                            <div style="line-height: 20px">
                                （备注：部分政府平台不支持外部离场，请前往政府平台离场,如果不上传离场凭证，政府平台则无法离场）
                            </div>
                        </el-form-item> -->
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
                                @click="manysave('manyEditForm')"
                                >保存</el-button
                            >
                            <el-button @click="manycancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>

                <el-dialog
                    title="一键离场"
                    :visible.sync="allLeafFormVisible"
                    :show-close="false"
                    :append-to-body="true"
                    class="lichangdialog"
                >
                    <el-form
                        :model="allLeafForm"
                        label-width="100px"
                        :rules="allLeafFormRules"
                        ref="allLeafEditForm"
                        label-position="right"
                    >
                        <el-form-item label="评分：">
                            <el-rate
                                v-model="ratenumAll"
                                :texts="ratetexts"
                                show-text
                                @change="rateChangeAll"
                            ></el-rate>
                        </el-form-item>
                        <el-form-item label="离场评价：" prop="pjcontent">
                            <el-input
                                type="textarea"
                                v-model="allLeafForm.pjcontent"
                                maxlength="60"
                                show-word-limit
                                placeholder="请输入评价内容（最多60字）"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="评价人：" prop="pjname">
                            <div>{{ allLeafForm.pjname }}</div>
                        </el-form-item>
                        <el-form-item label="离场凭证：" prop="pjurl">
                            <div>
                                <el-radio
                                    v-for="item in fileList"
                                    v-model="radioAll"
                                    :label="item.value"
                                    @change="fileChangeAll"
                                    :key="item"
                                    >{{ item.label }}</el-radio
                                >
                            </div>
                            <pdfupload
                                v-if="FileTypeAll"
                                ref="mychild"
                                :upImgList="upImgList"
                                :licenceImg="licenceImg"
                                :isShow="isShow"
                                @listenToChildEvent="showAll"
                            ></pdfupload>
                            <upload
                                v-else
                                @listenToChildEvent="showAll"
                                :upImgList="upImgList"
                                :licenceImg="licenceImg"
                                :isShow="isShow"
                            ></upload>
                        </el-form-item>
                        <!-- <el-form-item label="提示：">
                            <el-checkbox
                                v-model="zflcAll"
                                @change="leafCheckAll"
                                >同时在政府平台离场人员</el-checkbox
                            >
                            <div style="line-height: 20px">
                                （备注：部分政府平台不支持外部离场，请前往政府平台离场,如果不上传离场凭证，政府平台则无法离场）
                            </div>
                        </el-form-item> -->
                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="allLeafSave('allLeafEditForm')"
                                >保存</el-button
                            >
                            <el-button @click="allLeafCancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <el-dialog
                    @open="dopen"
                    class="excelload"
                    title="导入"
                    :visible.sync="leadFormVisible"
                    :close-on-click-modal="false"
                    :show-close="false"
                    :append-to-body="true"
                >
                    <div class="newExcel">
                        <div class="leftForm">
                            <el-form
                                :model="leadForm"
                                label-width="100"
                                :rules="leadFormRules"
                                ref="leadEditForm"
                                label-position="right"
                            >
                                <el-form-item
                                    label="班组名称："
                                    style="margin-bottom: 0"
                                >
                                    <p>{{ getbzname }}</p>
                                </el-form-item>
                                <el-form-item
                                    class="seconditem"
                                    label="匹配方式："
                                >
                                    <p>按照Userid匹配</p>
                                </el-form-item>
                                <el-form-item
                                    class="newtijiao"
                                    label="上传文件："
                                    prop="url"
                                >
                                    <div class="newcom">
                                        <img
                                            width="50"
                                            src="../../../static/images/exceladd.png"
                                            alt
                                        />
                                        <p>请上传文件</p>
                                        <excelUpload
                                            ref="firstchild"
                                            @listenToChild="show2"
                                            :upImgList2="upImgList2"
                                            :licenceImg2="licenceImg2"
                                            :isShow2="isShow2"
                                        ></excelUpload>
                                    </div>
                                </el-form-item>
                                <div class="warn">
                                    <div>
                                        <p>注意：</p>
                                        <p>
                                            导入文件以下载的模板为准，否则将无法读取数据，重复上传数据将被覆盖
                                        </p>
                                        <span
                                            @click="derive"
                                            style="
                                                color: #3a99f2;
                                                cursor: pointer;
                                            "
                                            >下载模板</span
                                        >
                                    </div>
                                </div>
                                <el-form-item class="bottomBtn">
                                    <el-button
                                        type="primary"
                                        :loading="loaded"
                                        @click="leadsave('leadEditForm')"
                                        >提交</el-button
                                    >
                                    <el-button @click="leadcancel"
                                        >取消</el-button
                                    >
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="rightPic">
                            <img src="../../../static/images/indexR.png" alt />
                        </div>
                    </div>
                </el-dialog>
            </div>
        </div>
        <el-dialog
            title="离场凭证"
            :visible.sync="editVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
        >
            <img
                style="width: 100%"
                v-for="(item, index) in picList"
                :src="item"
                :key="index"
                alt
            />
        </el-dialog>
        <el-drawer
            title="筛选"
            :visible.sync="selectDrawer"
            :with-header="false"
            class="ctDrawer"
            :append-to-body="true"
        >
            <div class="rightContent">
                <div class="titleS">
                    <div></div>
                    <p>银行卡状态</p>
                </div>
                <div class="titleList">
                    <div
                        v-for="(item, index) in yhcardList"
                        :key="index"
                        :class="index === activeIndex ? 'activeIndexClass' : ''"
                        @click="titleSClick(index, item)"
                    >
                        {{ item.label }}
                    </div>
                </div>
                <div class="titleB">
                    <div></div>
                    <p>身份证录入状态</p>
                </div>
                <div class="titleList">
                    <div
                        v-for="(item, index) in cardList"
                        :key="index"
                        :class="index === activeSt ? 'activeStClass' : ''"
                        @click="titleBClick(index, item)"
                    >
                        {{ item.label }}
                    </div>
                </div>
                <div class="titleSex">
                    <div></div>
                    <p>性别</p>
                </div>
                <div class="titleList">
                    <div
                        v-for="(item, index) in sexList"
                        :key="index"
                        :class="index === activeSex ? 'activeSexClass' : ''"
                        @click="titleSexClick(index, item)"
                    >
                        {{ item.label }}
                    </div>
                </div>
                <div class="title">
                    <div></div>
                    <p>年龄</p>
                </div>
                <div class="titleList">
                    <div
                        v-for="(item, index) in peopleAgeList"
                        :key="index"
                        :class="index === activeStep ? 'activeStepClass' : ''"
                        @click="titleClick(index, item)"
                    >
                        {{ item.label }}
                    </div>
                </div>
                <div class="titleL">
                    <div></div>
                    <p>文化程度</p>
                </div>
                <div class="titleList">
                    <div
                        v-for="(item, index) in learnList"
                        :key="index"
                        :class="
                            index === activeLIndex ? 'activeLearnClass' : ''
                        "
                        @click="titleLearnClick(index, item)"
                    >
                        {{ item.label }}
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import sideMenu from '../public/sideMenu.vue';
import pdfupload from '../common/pdfUpload.vue';
import upload from '../public/upload.vue';
import excelUpload from '../public/excelUpload.vue';
export default {
    name: 'ctable',
    components: { sideMenu, upload, excelUpload, pdfupload },
    props: {
        bzid: {
            type: String
        },
        isTable: {
            type: Array
        },
        getbzname: {
            type: String
        },
        newtest: {
            type: Array
        },
        workType: {
            type: String
        }
    },
    data() {
        return {
            selectDrawer: false,
            activeStep: 0,
            activeSex: 0,
            activeIndex: 0,
            activeLIndex: 0,
            activeSt: 0,
            picList: [],
            radio: '1',
            radioAll: '1',
            editVisible: false,
            xianshi: true,
            xianshi1: false,
            active: 0,
            lvalue: 1,
            statusList: [
                { id: '1', name: '在场' },
                { id: '2', name: '离场' }
            ],
            fileList: [
                { value: '1', label: 'PDF文件' },
                { value: '2', label: '图片' }
            ],
            yhcardList: [
                { value: '', label: '全部' },
                { value: '1', label: '已录入' },
                { value: '0', label: '未录入' }
            ],
            cardList: [
                { value: '2', label: '全部' },
                { value: '1', label: '已登记' },
                { value: '0', label: '未登记' }
            ],
            sexList: [
                { value: '', label: '全部' },
                { value: '男', label: '男' },
                { value: '女', label: '女' }
            ],
            peopleAgeList: [
                { value: '', label: '全部' },
                { value: '未填写', label: '未填写' },
                { value: '18', label: '18岁以下' },
                { value: '30', label: '18岁-29岁' },
                { value: '40', label: '30岁-39岁' },
                { value: '50', label: '40岁-49岁' },
                { value: '60', label: '50岁-59岁' },
                { value: '99', label: '59岁以上' }
            ],
            learnList: [
                { value: '', label: '全部' },
                { value: '小学', label: '小学' },
                { value: '初中', label: '初中' },
                { value: '高中', label: '高中' },
                { value: '中专', label: '中专' },
                { value: '大专', label: '大专' },
                { value: '本科', label: '本科' },
                { value: '硕士', label: '硕士' },
                { value: '博士', label: '博士' }
            ],
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
            leadFormRules: {
                url: [
                    {
                        required: true,
                        message: '文件不能为空'
                    }
                ]
            },
            manyFormRules: {
                pjtype: [
                    {
                        required: true,
                        message: '评价不能为空'
                    }
                ]
            },
            allLeafFormRules: {
                pjtype: [
                    {
                        required: true,
                        message: '评价不能为空'
                    }
                ]
            },
            warnPage: true,
            viwePage: false,
            total: '', //默认数M²据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            istag: true,
            searchform: { name: '', yinhang: '', age: '' },
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            ratenum: null,
            ratenumAll: null,
            ratetexts: ['1星', '2星', '3星', '4星', '5星'],
            idactiveNames: ['1'],
            peopleList: [],
            manyFormVisible: false,
            leadFormVisible: false,
            myname: '',
            myid: '',
            upImgList: [],
            licenceImg: [],
            isShow: ['1'],
            upImgList2: '',
            licenceImg2: '',
            isShow2: ['1'],
            allLeafFormVisible: false,
            manyForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                userid: '',
                bzid: '',
                xmid: '',
                pjtype: '',
                pjcontent: '',
                pjname: this.$store.state.userData.uname,
                pjurl: [],
                lichang: 1,
                zflc: 0
            },
            isFail: false,
            failMsg: '',
            isFail2: false,
            failMsg2: '',
            allLeafForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                userid: [],
                bzid: '',
                xmid: '',
                pjtype: '',
                pjcontent: '',
                pjname: this.$store.state.userData.uname,
                pjurl: [],
                lichang: 1,
                zflc: 0
            },
            leadForm: {
                newuid: this.$store.state.userData.uid,
                bzid: '',
                corp_id: this.$store.state.userData.cid,
                url: ''
            },
            selectPeopleData: [],
            newarr: [],
            newXmid: [],
            FileType: true,
            zflc: false,
            FileTypeAll: true,
            zflcAll: false,
            selectAge: '',
            selectYh: '',
            selectCard: '2',
            selectSex: '',
            selectLid: ''
        };
    },

    methods: {
        titleClick(index, item) {
            this.activeStep = index;
            this.selectAge = item.value;
            this.getTable(1);
            this.selectDrawer = false;
        },
        titleLearnClick(index, item) {
            this.activeLIndex = index;
            this.selectLid = item.value;
            this.getTable(1);
            this.selectDrawer = false;
        },
        titleSexClick(index, item) {
            this.activeSex = index;
            this.selectSex = item.value;
            this.getTable(1);
            this.selectDrawer = false;
        },
        titleSClick(index, item) {
            this.activeIndex = index;
            this.selectYh = item.value;
            this.getTable(1);
            this.selectDrawer = false;
        },
        titleBClick(index, item) {
            this.activeSt = index;
            this.selectCard = item.value;
            this.getTable(1);
            this.selectDrawer = false;
        },
        manySelect() {
            this.selectDrawer = true;
        },
        leafCheck() {
            if (this.zflc) {
                this.manyForm.zflc = 1;
            } else {
                this.manyForm.zflc = 0;
            }
        },
        leafCheckAll() {
            if (this.zflcAll) {
                this.allLeafForm.zflcAll = 1;
            } else {
                this.allLeafForm.zflcAll = 0;
            }
        },
        fileChange() {
            this.licenceImg = [];
            this.upImgList = [];
            this.manyForm.pjurl = [];
            this.isShow = [];
            if (this.radio == '1') {
                this.FileType = true;
            } else if (this.radio == '2') {
                this.FileType = false;
            }
        },
        fileChangeAll() {
            this.licenceImg = [];
            this.upImgList = [];
            this.allLeafForm.pjurl = [];
            this.isShow = [];
            if (this.radioAll == '1') {
                this.FileTypeAll = true;
            } else if (this.radioAll == '2') {
                this.FileTypeAll = false;
            }
        },
        //修改
        revise(row) {
            this.editVisible = true;
            this.picList = row.lcpz;
        },
        watchlink(row) {
            this.$router.push({
                name: 'leaf',
                query: { userid: row.userid }
            });
        },
        mdBzBtn() {
            if (this.selectPeopleData.length > 0) {
                this.selectDerive();
            } else {
                this.$message({
                    message: '请您先多选',
                    center: true,
                    duration: 2000,
                    type: 'warning'
                });
            }
        },
        handleSelectionChange(val) {
            this.selectPeopleData = val;
            this.newarr = val.map((item) => {
                if (!item.userid) return '';
                return item.userid;
            });
            if (this.workType == '2') {
                this.newXmid = val.map((item) => {
                    if (!item.xmid) return '';
                    return item.xmid;
                });
            }
            this.allLeafForm.userid = val.map((item) => {
                if (!item.userid) return '';
                return item.userid;
            });
        },
        statusAllClick() {
          this.allLeafFormVisible = true;
          this.allLeafForm.bzid = this.bzid;
            // if (this.selectPeopleData.length > 0) {
            //     this.allLeafFormVisible = true;
            //     this.allLeafForm.bzid = this.bzid;
            // } else {
            //     this.$message({
            //         message: '请您先多选',
            //         center: true,
            //         duration: 4000,
            //         type: 'warning'
            //     });
            // }
        },
        statusClick(index, value) {
            this.active = index;
            this.lvalue = value;
            this.getTable(1);
        },
        allLeafCancel() {
            this.licenceImg = [];
            this.upImgList = [];
            this.allLeafForm.pjurl = [];
            this.isShow = [];
            this.zflcAll = false;
            this.allLeafForm.zflcAll = 0;

            // this.$refs.allLeafEditForm.resetFields();
            this.ratenumAll = null;
            this.allLeafForm.pjtype = '';
            this.allLeafForm.pjcontent = '';
            this.allLeafFormVisible = false;
        },
        allLeafSave(formName) {
            const that = this;

            if (that.allLeafForm.pjtype == '') {
                that.$message({
                    message: '请进行评分！',
                    center: true,
                    duration: 2000,
                    type: 'warning'
                });
            } else {
                that.loaded = true;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios
                            .post('/laowu_yun/useraddpingjia', that.allLeafForm)
                            .then((res) => {
                                if (res.data.status == 1) {
                                    that.loaded = false;
                                    that.isShow = [];
                                    that.licenceImg = [];
                                    that.upImgList = [];
                                    that.allLeafForm.pjurl = [];
                                    // that.$refs.allLeafEditForm.resetFields();
                                    that.allLeafForm.pjtype = '';
                                    that.allLeafForm.pjcontent = '';
                                    that.ratenumAll = null;
                                    that.getTable(1);
                                    that.$message({
                                        message: res.data.msg,
                                        center: true,
                                        duration: 2000,
                                        type: 'success'
                                    });
                                    that.allLeafFormVisible = false;
                                } else {
                                    that.$message({
                                        message: res.data.msg,
                                        center: true,
                                        duration: 2000,
                                        type: 'error'
                                    });
                                    that.loaded = false;
                                }
                            })
                            .catch(function (error) {
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
                        let newPeople = [];
                        let newbz = [];
                        that.tagsData = result.users;
                        that.neworgids = result.departments;
                        newPeople = result.users.map((item) => {
                            if (!item.emplId) return '';
                            return item.emplId;
                        });
                        newbz = result.departments.map((item) => {
                            if (!item.id) return '';
                            return item.id;
                        });

                        that.ruleForm.userids = newPeople;
                        that.ruleForm.orgids = newbz;
                        axios
                            .post('/laowu_yun/useraddteam', {
                                corp_id: that.cid,
                                newuid: that.$store.state.userData.uid,
                                bzid: that.bzid,
                                userids: newPeople,
                                orgids: newbz,
                                test: '2'
                            })
                            .then((res) => {
                                if (res.data.status == 1) {
                                    that.$message({
                                        message: res.data.msg,
                                        center: true,
                                        duration: 1000,
                                        type: 'success'
                                    });
                                    that.loaded = false;
                                    that.neworgids = [];
                                    that.getTable(1);
                                } else {
                                    that.loaded = false;
                                    that.$message({
                                        message: res.data.msg,
                                        center: true,
                                        duration: 2000,
                                        type: 'warning'
                                    });
                                }
                            });

                        console.log('zhang');
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
                    newuid: that.$store.state.userData.uid,
                    corp_id: that.$store.state.userData.cid,
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
                        console.log('2525555');
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
        handleClose(done) {
            this.isFail = false;
            this.failMsg = '';
            this.$refs.manyEditForm.resetFields(); // 清空表单
            this.licenceImg = [];
            this.upImgList = [];
            this.manyForm.pjurl = [];
            this.isShow = [];
            this.manyFormVisible = false;
        },
        showAll(msg) {
            this.allLeafForm.pjurl = msg;
        },
        show(msg) {
            this.manyForm.pjurl = msg;
        },
        show2(msg) {
            this.leadForm.url = msg;
        },
        handleWatch(row) {
            this.$router.push({
                path: '/chakan',
                query: { userid: row.userid, bzid: row.bzid }
            });
        },
        handleEditWatch(row) {
            this.$router.push({
                path: '/leaf',
                query: { userid: row.userid, bzid: row.bzid }
            });
        },

        parentFn(payload) {
            this.bzid = payload;
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === 0) {
                return 'th';
            }
            return '';
        },
        switchChange() {
            this.istag = !this.istag;
        },
        current_change: function (currentPage) {
            this.currentPage = currentPage;
        },
        rateChange(val) {
            this.manyForm.pjtype = val;
        },
        rateChangeAll(val) {
            this.allLeafForm.pjtype = val;
        },
        selectProject() {
            this.getTable(1);
        },
        getTable(num) {
            if (this.workType == '1') {
                axios
                    .post('/laowu_yun/teamxiangxiuserlist', {
                        corp_id: this.cid,
                        newuid: this.$store.state.userData.uid,
                        bzid: this.bzid,
                        current_page: num,
                        name: this.searchform.name,
                        yinhang: this.selectYh,
                        age: this.selectAge,
                        lichang: this.lvalue,
                        codetype: this.selectCard,
                        sextype: this.selectSex,
                        whtype: this.selectLid
                    })
                    .then((res) => {
                        if (res.data.status == 1) {
                            this.total = res.data.content.total;
                            this.pagesize = res.data.content.num;
                            this.peopleList = res.data.content.list;
                        } else {
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else if (this.workType == '2') {
                axios
                    .post('/laowu_yun/teamxiangxiuserlist', {
                        corp_id: this.cid,
                        newuid: this.$store.state.userData.uid,
                        userid: this.bzid,
                        current_page: this.currentPage,
                        name: this.searchform.name,
                        yinhang: this.selectYh,
                        age: this.selectAge,
                        lichang: this.lvalue,
                        codetype: this.selectCard,
                        sextype: this.selectSex,
                        whtype: this.selectLid
                    })
                    .then((res) => {
                        if (res.data.status == 1) {
                            this.total = res.data.content.total;
                            this.pagesize = res.data.content.num;
                            this.peopleList = res.data.content.list;
                        } else {
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTable(val);
        },
        search() {
            this.getTable(1);
        },
        manysave(formName) {
            const that = this;

            if (that.manyForm.pjtype == '') {
                that.$message({
                    message: '请进行评分！',
                    center: true,
                    duration: 2000,
                    type: 'warning'
                });
            } else {
                that.loaded = true;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newArrayId = that.manyForm.userid;
                        that.manyForm.userid = [newArrayId];
                        axios
                            .post('/laowu_yun/useraddpingjia', that.manyForm)
                            .then((res) => {
                                if (res.data.status == 1) {
                                    that.loaded = false;
                                    that.isShow = [];
                                    that.licenceImg = [];
                                    that.upImgList = [];
                                    that.manyForm.pjurl = [];
                                    that.$refs.manyEditForm.resetFields();
                                    that.manyForm.pjtype = '';
                                    that.manyForm.pjcontent = '';
                                    that.ratenum = null;
                                    that.manyFormVisible = false;
                                    that.getTable(1);
                                    that.$message({
                                        message: res.data.msg,
                                        center: true,
                                        duration: 2000,
                                        type: 'success'
                                    });
                                } else {
                                    that.$message({
                                        message: res.data.msg,
                                        center: true,
                                        duration: 2000,
                                        type: 'error'
                                    });
                                    that.loaded = false;
                                }
                            })
                            .catch(function (error) {
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
        manycancel() {
            this.licenceImg = [];
            this.upImgList = [];
            this.manyForm.pjurl = [];
            this.isShow = [];
            this.zflc = false;
            this.manyForm.zflc = 0;

            this.$refs.manyEditForm.resetFields();
            this.ratenum = null;
            this.manyForm.pjtype = '';
            this.manyForm.pjcontent = '';
            this.manyFormVisible = false;
        },
        leadsave(formName) {
            const that = this;

            that.leadForm.bzid = that.bzid;

            if (that.leadForm.url != '') {
                that.loaded = true;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios
                            .post(
                                '/laowu_yun/renyuanmoshanchuan',
                                that.leadForm
                            )
                            .then((res) => {
                                if (res.data.status == 1) {
                                    that.loaded = false;
                                    that.isShow2 = [];
                                    that.licenceImg2 = '';
                                    that.upImgList2 = '';
                                    that.leadForm.url = '';
                                    // that.$refs.manyEditForm.resetFields();
                                    that.leadFormVisible = false;
                                    that.getTable(1);
                                    that.$message({
                                        message: '成功',
                                        center: true,
                                        duration: 2000,
                                        type: 'success'
                                    });
                                } else {
                                    that.isShow2 = [];
                                    that.licenceImg2 = '';
                                    that.upImgList2 = '';
                                    that.leadForm.url = '';
                                    that.$message({
                                        showClose: true,
                                        message: res.data.msg,
                                        type: 'error'
                                    });
                                    that.loaded = false;
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    } else {
                        that.loaded = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            } else {
                that.$message({
                    showClose: true,
                    message: '请上传文件',
                    type: 'error'
                });
            }
        },
        leadcancel() {
            this.licenceImg2 = '';
            this.upImgList2 = '';
            this.leadForm.pjurl = '';
            this.isFail2 = false;
            this.failMsg2 = '';
            this.isShow2 = [];
            this.leadFormVisible = false;
        },
        handleEdit(row) {
            this.manyFormVisible = true;
            this.manyForm.userid = row.userid;
            this.manyForm.xmid = row.xmid;
            this.manyForm.bzid = row.bzid;
            this.myname = row.name;
            this.myid = row.useridcode;
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach((row) => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        selectDerive() {
            let toSBzid = this.bzid.toString();
            let toSNewarr = this.newarr.toString();
            let toSnewXmid = this.newXmid.toString();
            let host = window.location.host; //主机
            if (this.workType == '1') {
                axios
                    .get('/laowu_yun/renyuandaochudown', {
                        params: {
                            newuid: this.$store.state.userData.uid,
                            id: this.bzid,
                            userids: toSNewarr,
                            lichang: this.lvalue
                        }
                    })
                    .then((res) => {
                        dd.biz.util.openLink({
                            url:
                                'https://' +
                                host +
                                '/laowu_yun/renyuandaochudown?id=' +
                                this.bzid +
                                '&userids=' +
                                toSNewarr +
                                '&lichang=' +
                                this.lvalue, //要打开链接的地址
                            onSuccess: function (result) {
                                this.toggleSelection();
                            },
                            onFail: function (err) {}
                        });
                    });
            } else if (this.workType == '2') {
                axios
                    .get('/laowu_yun/renyuandaochudown', {
                        params: {
                            newuid: this.$store.state.userData.uid,
                            userids: toSNewarr,
                            xmid: toSnewXmid,
                            type: '2',
                            lichang: this.lvalue
                        }
                    })
                    .then((res) => {
                        dd.biz.util.openLink({
                            url:
                                'https://' +
                                host +
                                '/laowu_yun/renyuandaochudown?xmid=' +
                                toSnewXmid +
                                '&userids=' +
                                toSNewarr +
                                '&type=2' +
                                '&lichang=' +
                                this.lvalue, //要打开链接的地址
                            onSuccess: function (result) {
                                this.toggleSelection();
                            },
                            onFail: function (err) {}
                        });
                    });
            }
        },
        PeopleDerive() {
            let host = window.location.host; //主机
            let toSnewXmid = this.newXmid.toString();
            if (this.workType == '1') {
                axios
                    .get('/laowu_yun/renyuandaochudown', {
                        params: {
                            newuid: this.$store.state.userData.uid,
                            id: this.bzid,
                            lichang: this.lvalue
                        }
                    })
                    .then((res) => {
                        dd.biz.util.openLink({
                            url:
                                'https://' +
                                host +
                                '/laowu_yun/renyuandaochudown?id=' +
                                this.bzid +
                                '&lichang=' +
                                this.lvalue, //要打开链接的地址
                            onSuccess: function (result) {},
                            onFail: function (err) {}
                        });
                    });
            } else if (this.workType == '2') {
                axios
                    .get('/laowu_yun/renyuandaochudown', {
                        params: {
                            newuid: this.$store.state.userData.uid,
                            xmid: toSnewXmid,
                            userids: this.newarr,
                            type: '1',
                            lichang: this.lvalue
                        }
                    })
                    .then((res) => {
                        dd.biz.util.openLink({
                            url:
                                'https://' +
                                host +
                                '/laowu_yun/renyuandaochudown?xmid=' +
                                toSnewXmid +
                                '&userids=' +
                                this.newarr +
                                '&type=1' +
                                '&lichang=' +
                                this.lvalue, //要打开链接的地址
                            onSuccess: function (result) {
                                /**/
                            },
                            onFail: function (err) {}
                        });
                    });
            }
        },
        //导出
        derive() {
            let host = window.location.host; //主机
            axios
                .get('/laowu_yun/renyuanmobandown', {
                    params: {
                        newuid: this.$store.state.userData.uid,
                        id: this.bzid,
                        userids: this.newarr
                    }
                })
                .then((res) => {
                    dd.biz.util.openLink({
                        url:
                            'https://' +
                            host +
                            '/laowu_yun/renyuanmobandown?id=' +
                            this.bzid +
                            '&userids=' +
                            this.newarr, //要打开链接的地址
                        onSuccess: function (result) {
                            // this.toggleSelection();
                        },
                        onFail: function (err) {}
                    });
                });
        },
        //导入
        dopen() {
            this.$refs.firstchild.get_signature();
        },
        lead() {
            this.leadFormVisible = true;
        }
    },

    mounted() {
        this.checkding();
    },
    activated() {
        this.getTable(1);
    },
    watch: {
        isTable: {
            handler(newValue, oldValue) {
                if (newValue.length > 0) {
                    this.warnPage = false;
                    this.viwePage = true;
                    this.searchform.name = '';
                    this.getTable(1);
                    this.isTable = [];
                    this.$emit('getChild', this.isTable);
                }
            },
            deep: true
        }
    }
};
</script>
<style lang="less">
body {
    .ctDrawer {
        .el-drawer {
            width: 500px !important;
            overflow-y: auto;
            height: 100%;
            .rightContent {
                padding: 20px 20px 0 20px;
                .title,
                .titleS,
                .titleB,
                .titleSex,
                .titleL {
                    display: flex;
                    margin-bottom: 10px;
                    div {
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        background-color: #3296fa;
                        margin-top: 5px;
                    }
                    p {
                        font-size: 18px;
                        margin-left: 10px;
                    }
                }
                .titleS {
                    div {
                        background-color: #ff943e;
                    }
                }
                .titleB {
                    div {
                        background-color: #44ec52;
                    }
                }
                .titleSex {
                    div {
                        background-color: #ce83ec;
                    }
                }
                .titleL {
                    div {
                        background-color: #e02323;
                    }
                }
                .titleList {
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    div {
                        width: 120px;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        background-color: #f4f4f4;
                        border-radius: 10px;
                        margin: 16px 10px;
                    }
                    .activeStepClass {
                        background-color: #e5f2fb;
                        color: #3296fa;
                    }
                    .activeIndexClass {
                        background-color: #fbf3ea;
                        color: #ff943e;
                    }
                    .activeStClass {
                        background-color: #e6fbd6;
                        color: #44ec52;
                    }
                    .activeSexClass {
                        background-color: #eeeefb;
                        color: #ce83ec;
                    }
                    .activeLearnClass {
                        background-color: #f3e9e9;
                        color: #e02323;
                    }
                }
            }
        }
    }
    .lichangdialog {
        .el-dialog {
            width: 500px;
            .el-dialog__body {
                .el-form-item {
                    margin-bottom: 18px;
                    .el-rate {
                        height: 40px;
                        line-height: 46px;
                    }
                }
            }
        }
    }
    .excelload {
        .el-dialog {
            width: 1100px;
            min-width: 1100px;
        }

        .warn {
            margin: 0 auto;
            border: 1px dashed #d9d9d9;
            margin-left: 80px;
            div {
                padding: 10px;
                p {
                    margin-bottom: 10px;
                }
            }
        }
        .newExcel {
            width: 80%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .leftForm {
                width: 50%;
                min-width: 400px;
                border: 1px solid #d9d9d9;
                padding: 30px;
                border-radius: 10px;
                .newtijiao {
                    .newcom {
                        text-align: center;
                        border: 1px dashed #d9d9d9;
                        background-color: #f5f5f5;
                        border-radius: 5px;
                        padding: 20px 0;
                    }
                    .el-form-item__content {
                        margin-left: 80px;
                    }
                }
            }
            .rightPic {
                img {
                    width: 320px;
                }
            }
        }
        .bottomBtn {
            margin-top: 20px;
            text-align: center;
        }
        .seconditem {
            .el-form-item__content {
                margin-left: 80px;
                border: 1px solid #d9d9d9;
                padding-left: 10px;
                border-radius: 6px;
            }
        }
    }
}
#ctable {
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow-y: auto;
    .ctable {
        .cdiv1 {
            .blue {
                background-color: #409eff;
                color: #fff;
            }
            .ctableNewClassSelect {
                .el-input__inner {
                    width: 100px;
                }
            }
            .el-button-group {
                margin-left: 0;
                height: 40px;
                margin-top: 0;
                .leftBtnGroup {
                    margin-left: 52px;
                }
            }
            .formSelect {
                .el-button {
                    padding-left: 10px;
                    padding-right: 10px;
                }
            }
        }
    }

    .el-dialog {
        width: 35%;
        .el-dialog__body {
            padding: 30px 30px;
            .el-table td {
                padding: 10px 0 !important;
            }
            .el-rate {
                height: 40px;
                line-height: 40px;
                .el-rate__item {
                    vertical-align: unset;
                }
            }
        }
    }

    .cdiv1 {
        display: inherit;
    }
}
</style>>



