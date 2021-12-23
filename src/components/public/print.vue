<template>
    <div id="contract">
        <div class="cnav">
            <sideMenu
                @childFn="parentFn"
                @childFn3="parentFn3"
                @childFn4="parentFn4"
                @childFn5="parentFn5"
            ></sideMenu>
        </div>
        <div
            style="width: 100%; position: relative; background-color: #fff"
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
                <div style="line-height: 40px; height: 40px">
                    <span
                        style="
                            font-size: 14px;
                            color: #606266;
                            line-height: 40px;
                        "
                        >打印管理</span
                    >
                </div>
            </div>
            <el-divider></el-divider>
            <div class="cdiv1">
                <div class="printTitle">
                    <el-button
                        type="primary"
                        plain
                        v-for="(item, index) in radioList"
                        @click="statusPClick(index, item)"
                        :class="activeTop == index ? 'blue' : ''"
                        :key="index"
                        >{{ item.name }}</el-button
                    >
                </div>
                <div class="cdivHeader">
                    <el-form
                        :inline="true"
                        :model="searchform"
                        class="demo-form-inline"
                        @submit.native.prevent
                    >
                        <el-form-item label="姓名：">
                            <el-input
                                v-model="searchform.name"
                                placeholder="请输入姓名"
                                @keyup.enter.native="search"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" plain @click="search"
                                >搜索</el-button
                            >
                        </el-form-item>
                    </el-form>
                </div>
                <div class="mainTable">
                    <div class="scroTable">
                        <el-table
                            ref="multipleTable"
                            @selection-change="handleSelectionChange"
                            :data="peopleList"
                            border
                            max-height="650"
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
                            <el-table-column
                                type="selection"
                                width="55"
                            ></el-table-column>
                            <el-table-column
                                type="index"
                                :index="indexMethod"
                                label="序号"
                                width="100"
                            ></el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                            ></el-table-column>
                            <el-table-column
                                prop="sex"
                                width="100"
                                label="性别"
                            ></el-table-column>
                            <el-table-column
                                prop="phone"
                                label="手机号"
                            ></el-table-column>
                            <el-table-column
                                prop="projectname"
                                label="部门"
                            ></el-table-column>
                            <el-table-column
                                prop="usertype"
                                label="人员类型"
                            ></el-table-column>
                            <el-table-column
                                prop="zhuangtai"
                                label="人员状态"
                            ></el-table-column>
                        </el-table>
                        <div>
                            <el-button-group style="width: 100%">
                                <el-button
                                    type="primary"
                                    v-for="(item, index) in statusList"
                                    @click="statusClick(index, item.id)"
                                    :key="index"
                                    >{{ item.name }}</el-button
                                >
                            </el-button-group>
                        </div>
                        <div style="text-align: center">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage"
                                :page-sizes="[10, 50, 100, 200]"
                                :page-size="pagesize"
                                layout="sizes,prev, pager, next, jumper"
                                :total="total"
                            ></el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                        label-width="100px"
                        :rules="leadFormRules"
                        ref="leadEditForm"
                        label-position="right"
                    >
                        <el-form-item
                            label="班组名称："
                            style="margin-bottom: 0"
                        >
                            <p>{{ newbzname }}</p>
                        </el-form-item>
                        <el-form-item label="合同类型：" prop="number">
                            <p>{{ activeName }}</p>
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
                                <wordUpload
                                    ref="firstchild"
                                    @listenToChild="show2"
                                    :upImgList2="upImgList2"
                                    :licenceImg2="licenceImg2"
                                    :isShow2="isShow2"
                                ></wordUpload>
                            </div>
                        </el-form-item>
                        <div class="warn">
                            <div>
                                <p>注意：</p>
                                <p>
                                    导入文件以下载的模板为准，否则将无法读取数据，重复上传数据将被覆盖
                                </p>
                                <span
                                    @click="wordCheckDown"
                                    style="color: #3a99f2; cursor: pointer"
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
                            <el-button @click="leadcancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="rightPic">
                    <img src="../../../static/images/indexWord.png" alt />
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import upload from './upload.vue';
import pdfupload from '../common/pdfUpload.vue';
import sideMenu from '../public/sideMenu.vue';
import wordUpload from '../common/wordUpload.vue';
import OSS from 'ali-oss';

export default {
    name: 'print',
    components: { upload, sideMenu, pdfupload, wordUpload },
    data() {
        return {
            activeName: '工人退场确认书',
            radioList: [
                { name: '工人退场确认书', id: '1' },
                { name: '简易劳动合同书', id: '2' },
                { name: '工人工资结清确认书', id: '3' },
                { name: '工人劳动合同签单', id: '4' },
                { name: '工人知情反馈书', id: '5' },
                { name: '工人进场承诺书', id: '6' },
                { name: '班组长退场承诺书', id: '7' },
                { name: '班组长进场承诺书', id: '8' }
            ],
            wordDownVisible: false,
            stoptime: '',
            record: '',
            dialogVisible: false,
            newarr: [],
            newarrbzname: [],
            workType: '',
            timeshow: true,
            val2: 1,
            FileType: true,
            radio: '1',
            warnPage: true,
            viwePage: false,
            total: '', //默认数据总数
            pagesize: 10, //每页的数据条数
            currentPage: 1, //默认开始页面
            istag: true,
            wFormVisible: false,
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            wordChangeVisible: false,
            // xmid: '',
            bzid: '',
            idactiveNames: ['1'],
            peopleList: [],
            peopleList: [],
            addFormVisible: false,
            addForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                userid: '',
                htriqi: '',
                sxhtriqi: '',
                hturl: [],
                htimgurl: [],
                htstatus: '',
                bzid: ''
            },

            uploadForm: {
                key: '',
                policy: '',
                OSSAccessKeyId: '',
                success_action_status: '200', //让服务端返回200,不然，默认会返回204
                callback: '',
                signature: ''
            },
            fileList: [
                { value: '1', label: 'PDF文件' },
                { value: '2', label: '图片' }
            ],
            url: '',
            upImgList: [],
            licenceImg: [],
            isShow: ['1'],
            upImgListPdf: [],
            licenceImgPdf: [],
            isShowPdf: ['1'],
            currentShow: ['1'],
            searchform: { name: '', yinhang: '', age: '' },
            leadFormRules: {
                number: [
                    {
                        required: true,
                        message: '合同类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            addFormRules: {
                htriqi: [
                    {
                        required: true,
                        message: '时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                sxhtriqi: [
                    {
                        required: true,
                        message: '时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                htstatus: [
                    {
                        required: true,
                        message: '合同类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            statusList: [
                { id: '1', name: '模板修改' },
                { id: '3', name: '预览模板' },
                { id: '2', name: '批量打印' }
            ],
            active: 0,
            activeTop: 0,
            activeVal: '1',
            lvalue: 1,
            picList: [],
            saveUrl: [],
            selectPeopleData: [],
            isPdf: '',
            newXmid: [],
            leadFormVisible: false,
            upImgList2: '',
            licenceImg2: '',
            isShow2: ['1'],
            leadForm: {
                corp_id: this.$store.state.userData.cid,
                url: '',
                number: ''
            },
            newbzname: '',
            downRadio: '1',
            dowanCheck: ['1']
        };
    },

    methods: {
        wordCheckCancel() {
            this.wordDownVisible = false;
            this.dowanCheck = ['1'];
        },
        wordCheckDown() {
            let host = window.location.host; //主机
            axios
                .get('/ding/downloadMb', {
                    params: {
                        number: this.activeVal,
                        corp_id: this.cid
                    }
                })
                .then((res) => {
                    dd.biz.util.openLink({
                        url:
                            'https://' +
                            host +
                            '/ding/downloadMb?number=' +
                            this.activeVal +
                            '&corp_id=' +
                            this.cid, //要打开链接的地址
                        onSuccess: function (result) {
                            // this.toggleSelection();
                        },
                        onFail: function (err) {}
                    });
                });
        },
        wordDown() {
            const _this = this;
            if (_this.peopleList.length > 0) {
                let newId;
                if (_this.selectPeopleData.length > 0) {
                    newId = _this.selectPeopleData[0].xmid;
                } else {
                    newId = _this.peopleList[0].xmid;
                }

                let toSBzid = _this.bzid.toString();
                let toSNewarr = _this.newarr.toString();
                let host = window.location.host; //主机

                dd.biz.util.openLink({
                    url:
                        'https://' +
                        host +
                        '/ding/GenDocuments?bzid=' +
                        toSBzid +
                        '&teamname=' +
                        _this.newbzname +
                        '&corp_id=' +
                        _this.$store.state.userData.cid +
                        '&userid=' +
                        toSNewarr +
                        '&number=' +
                        _this.activeVal +
                        '&xmid=' +
                        newId, //要打开链接的地址
                    onSuccess: function (result) {},
                    onFail: function (err) {}
                });
            } else {
                _this.$message({
                    showClose: true,
                    message: '该班组下暂无人员',
                    type: 'warning'
                });
            }
        },
        wordCancel() {
            this.wordChangeVisible = false;
            this.toggleSelection();
        },
        show2(msg) {
            this.leadForm.url = msg;
        },
        editExcel() {
            this.leadFormVisible = true;
        },
        leadcancel() {
            this.licenceImg2 = '';
            this.upImgList2 = '';
            this.failMsg2 = '';
            this.isShow2 = [];
            this.leadFormVisible = false;
        },
        leadsave(formName) {
            const that = this;
            that.leadForm.number = that.activeVal;
            if (that.leadForm.url != '') {
                that.loaded = true;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios
                            .post('/ding/upContemp', that.leadForm)
                            .then((res) => {
                                if (res.data.status == 1) {
                                    that.loaded = false;
                                    that.isShow2 = [];
                                    that.licenceImg2 = '';
                                    that.upImgList2 = '';
                                    that.leadForm.url = '';
                                    that.leadFormVisible = false;
                                    that.getTable();
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
        formatStatus(row) {
            if (row.htstatus == '1') {
                return '完成一定工作';
            } else if (row.htstatus == '0') {
                return '固定合同时间';
            } else {
                return '其他';
            }
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

        mdHtBtn() {
            const _this = this;
            switch (_this.activeVal) {
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                    if (_this.selectPeopleData.length > 0) {
                        _this.wordDown();
                    } else {
                        _this.$message({
                            message: '请您先多选',
                            center: true,
                            duration: 4000,
                            type: 'warning'
                        });
                    }
                    break;
                case '7':
                case '8':
                    _this.wordDown();
                    break;
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
        },
        setContenr(row) {
            this.dialogVisible = true;
            this.record = row;
            console.log(this.record);
        },
        show(msg) {
            this.addForm.hturl = msg;
        },
        showPdf(msg) {
            this.addForm.hturl = msg;
        },
        parentFn(payload) {
            this.bzid = payload;
        },
        parentFn3(msg) {
            this.newbzname = msg;
        },
        parentFn5(payload) {
            this.workType = payload;
        },
        current_change: function (currentPage) {
            this.currentPage = currentPage;
        },
        //检测是否上传过模板
        checkUp() {
            axios
                .post('/ding/checkMb', {
                    corp_id: this.cid
                })
                .then((res) => {
                    console.log(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getTable() {
            axios
                .post('/laowu_yun/teamxiangxiuserlist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    bzid: this.bzid,
                    current_page: this.currentPage,
                    name: this.searchform.name,
                    yinhang: this.searchform.yinhang,
                    age: this.searchform.age,
                    lichang: '1',
                    num: this.pagesize
                })
                .then((res) => {
                    this.checkUp();
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.peopleList = res.data.content.list;
                        if (this.total > 0 && this.peopleList.length < 1) {
                            this.currentPage = res.data.content.page;
                            this.getTable();
                        }
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg,
                            duration: 2000
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleSizeChange(val) {
            this.pagesize = val;
            this.getTable();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTable();
        },
        handleWatch(row) {
            if (row.hturl.length > 0) {
                this.isPdf = row.hturl[0].substr(row.hturl[0].length - 3);
            }

            this.addFormVisible = true;
            this.addForm.bzid = row.bzid;
            this.addForm.userid = row.userid;
            this.addForm.htriqi = row.htriqi;
            this.addForm.sxhtriqi = row.sxhtriqi;
            this.addForm.htstatus = row.htstatus;
            this.picList = row.hturl;
            this.saveUrl = row.hturl;
        },

        search() {
            this.currentPage = 1;
            this.getTable();
        },
        statusClick(index, value) {
            switch (value) {
                case '1':
                    this.leadFormVisible = true;
                    break;
                case '2':
                    this.mdHtBtn();
                    break;
                case '3':
                    this.previewWord();
                    break;
            }
        },
        previewWord() {
            let host = window.location.host; //主机
            axios
                .post('/ding/PreviewTemplate', {
                    number: this.activeVal,
                    corp_id: this.cid
                })
                .then((res) => {
                    window.open(
                        'https://view.officeapps.live.com/op/view.aspx?src=' +
                            res.data.message
                        // '_blank'
                    );
                    // window.open(
                    //     'https://view.xdocin.com/xdoc?_xdoc=' + res.data.message
                    // );
                });
        },
        statusPClick(index, item) {
            this.activeTop = index;
            this.activeVal = item.id;
            this.activeName = item.name;
        }
    },
    mounted() {},
    computed: {},
    watch: {
        newData(val, oldVal) {
            if (val == 1) {
                this.timeshow = false;
            } else {
                this.timeshow = true;
            }
        },
        bzid: function (newVal, oldVal) {
            if (newVal) {
                this.warnPage = false;
                this.viwePage = true;
            }
        }
    }
};
</script>
<style lang="less">
body {
    .contractDialogadd {
        .el-dialog {
            width: 600px;
            .saveImgClass {
                .el-form-item__content {
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    > div {
                        margin: 4px 4px 4px 0;
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        img {
                            width: 100%;
                            height: 60px !important;
                        }
                    }
                    .dialogPdfList {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 6px;
                        > div {
                            width: 60%;
                        }
                    }
                }
            }
        }
        .wFormPdfList {
            display: flex;
            justify-content: space-between;
            height: 40px;
            overflow: hidden;
            margin-bottom: 20px;
            .pdfleft {
                width: 323px;
            }
        }
        .viewPdf {
            padding: 6px;
            border: 1px solid #ccc;
            border-radius: 5px;
            .viewPdfDiv {
                display: flex;
                justify-content: space-between;
            }
        }
    }
    .downWordClass {
        .el-radio {
            display: block;
            margin-bottom: 10px;
            .el-radio__label {
                font-size: 16px;
            }
        }
        .el-checkbox {
            display: block;
            margin-bottom: 10px;
            font-size: 18px;
        }
    }
}
.el-collapse .el-collapse div {
    text-align: center;
    line-height: 40px;
}
.el-collapse .el-collapse div:hover {
    color: #409eff;
    background-color: #eeeeee;
}

.cdiv1 {
    width: 100% !important;
}
#contract {
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
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
    .el-button-group {
        margin-left: 0;
        margin-top: 0;
        height: 40px;
        .leftBtnGroup {
            margin-left: 52px;
        }
    }
    .printTitle {
        display: flex;
        justify-content: flex-start;

        width: 90%;
        flex-wrap: wrap;
        margin: 0 auto;
        margin-bottom: 20px !important;
        .el-button {
            margin-bottom: 10px;
            background-color: #fff;
            color: #000;
        }
    }
}

#contract .ctable {
    width: 100%;
    background-color: #fff;
    padding: 10px 10px 0 10px;
    border: 1px solid #dcdfe6;
    overflow-y: auto;
}
#contract .right-topheader {
    display: flex;
    justify-content: space-between;
}
#contract {
    .printTitle {
        .blue {
            background-color: #409eff;
            color: #fff;
        }
    }
    .cdivHeader {
        display: flex;
        justify-content: space-between;
        .blue {
            background-color: #409eff;
            color: #fff;
        }
    }
    .xiaoshi1 {
        display: none;
    }
}
</style>