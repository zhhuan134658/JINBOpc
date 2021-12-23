<template>
  <div id="contract">
    <div class="ctable" v-show="viwePage">
        <div class="cdiv1">
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
                        :data="contractList"
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
                            prop="xmname"
                            label="项目名称"
                        ></el-table-column>
                        <el-table-column
                            prop="phone"
                            label="联系方式"
                        ></el-table-column>
                        <el-table-column
                            prop="usercode"
                            label="身份证号"
                            show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="httype"
                            label="合同状态"
                            show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="htstatus"
                            :formatter="formatStatus"
                            label="类型"
                            show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="htriqi"
                            label="开始日期"
                            show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="sxhtriqi"
                            label="结束日期"
                            show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="180">
                            <template slot-scope="scope">
                                <el-button
                                    v-if="scope.row.httype == '未签署' || scope.row.httype == '拒绝签署'"
                                    @click="signContract(scope.row)"
                                    type="text"
                                    size="small"
                                >签署合同</el-button>
                                <el-button
                                    v-else
                                    type="text"
                                    disabled
                                    size="small"
                                >签署合同</el-button>
                                <el-button
                                    v-if="scope.row.htstatus == 1"
                                    @click="setContenr(scope.row)"
                                    type="text"
                                    size="small"
                                    >设置合同</el-button
                                >
                                <el-button
                                    v-else
                                    type="text"
                                    disabled
                                    size="small"
                                    >设置合同</el-button
                                >

                                <el-button
                                    v-if="scope.row.httype == '签署中' || scope.row.httype == '已签署'"
                                    @click="handleClick(scope.row)"
                                    type="text"
                                    size="small"
                                    >查看</el-button
                                >
                                <el-button
                                    v-else
                                    type="text"
                                    disabled
                                    size="small"
                                    >查看</el-button
                                >
                                <el-button
                                    :class="val1 == val2 ? 'xiaoshi1' : ''"
                                    @click="handleWatch(scope.row)"
                                    type="text"
                                    size="small"
                                >编辑合同</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div>
                        <el-button-group style="width: 100%">
                            <el-button
                                v-if="contractGetType == '1'"
                                class="leftBtnGroup"
                                @click="PeopleDerive"
                                size="small"
                                type="primary"
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
        </div>
    </div>
    <!-- :close-on-click-modal="false" -->
    <el-dialog
        title="添加合同"
        :visible.sync="addFormVisible"
        class="contractDialogadd"
        :before-close="handleClose"
        :append-to-body="true"
    >
        <el-form
            :model="addForm"
            label-width="160px"
            :rules="addFormRules"
            ref="addEditForm"
            label-position="right"
        >
            <el-form-item label="合同类型：" prop="htstatus">
                <el-select v-model="addForm.htstatus" placeholder="请选择">
                    <el-option label="固定期限合同" value="0"></el-option>
                    <el-option label="完成一定工作" value="1"></el-option>
                    <el-option label="项目合同" value="4"></el-option>
                    <el-option label="其他" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-show="addForm.htstatus == 4" label="选择项目：" prop="">
              <el-select v-model="addForm.xmid" placeholder="请选择">
                <el-option
                  v-for="(item, index) in projectOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="addForm.htstatus != 4" label="合同开始时间：" prop="htriqi">
                <el-date-picker
                    v-model="addForm.htriqi"
                    :picker-options="pickerStart"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>
            <el-form-item
              v-show="addForm.htstatus != 4"
                label="合同结束时间："
                prop="sxhtriqi"
                v-if="timeshow"
            >
                <el-date-picker
                    v-model="addForm.sxhtriqi"
                    :picker-options="pickerEnd"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>

            <el-form-item
                label="已有合同附件："
                prop="htimgurl"
                v-if="JSON.stringify(picList) != '[]'"
                class="saveImgClass"
            >
                <div v-if="isPdf != 'pdf'">
                    <div
                        v-for="(item, index) in picList"
                        :key="index"
                        style="width: 22%; margin: 0 5px 5px 0"
                    >
                        <img
                            style="width: 100%; height: 100%"
                            @click="lookimg2(picList[index])"
                            :src="picList[index]"
                            alt
                        />
                    </div>
                </div>
                <div v-else>
                    <div
                        v-for="(item, index) in picList"
                        :key="index"
                        class="dialogPdfList"
                    >
                        <div>
                            {{ item.substring(item.lastIndexOf('/') + 1) }}
                        </div>
                        <el-button type="text" @click="watchPdf(item)"
                            >查看</el-button
                        >
                    </div>
                </div>
            </el-form-item>
            <el-form-item
                prop="hturl"
                ref="uploadpic"
                label="添加合同附件："
            >
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
                    ref="mychild"
                    :upImgList="upImgList"
                    :licenceImg="licenceImg"
                    :isShow="isShow"
                    @listenToChildEvent="show"
                ></upload>
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
            <el-form-item>
                <el-button
                    type="primary"
                    :loading="butLoaded"
                    @click="save('addEditForm')"
                    >保存</el-button
                >
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog
        title="查看合同"
        :visible.sync="wFormVisible"
        :close-on-click-modal="false"
        :append-to-body="true"
        class="contractDialogadd"
    >
        <div class="wFormPdf" v-if="isPdf == 'pdf'">
            <div v-for="item in picList" class="wFormPdfList" :key="item">
                <div class="pdfleft">
                    <span>{{ item }}</span>
                </div>
                <el-button plain @click="watchPdf(item)">查看</el-button>
            </div>
        </div>
    </el-dialog>
    <el-dialog
        title="下载合同"
        :visible.sync="wordChangeVisible"
        :close-on-click-modal="false"
        :append-to-body="true"
        class="contractDialogadd downWordClass"
    >
        <div>
            <el-radio-group v-model="downRadio">
                <el-radio
                    v-for="(item, index) in radioList"
                    :key="index"
                    :label="item.id"
                    >{{ item.name }}</el-radio
                >
            </el-radio-group>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="wordCancel">取 消</el-button>
            <el-button type="primary" @click="wordDown">下 载</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="下载合同"
        :visible.sync="wordDownVisible"
        :close-on-click-modal="false"
        :append-to-body="true"
        class="contractDialogadd downWordClass"
    >
        <div>
            <el-checkbox-group v-model="dowanCheck">
                <el-checkbox
                    v-for="(item, index) in radioList"
                    :key="index"
                    :label="item.id"
                    >{{ item.name }}</el-checkbox
                >
            </el-checkbox-group>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="wordCheckCancel">取 消</el-button>
            <el-button type="primary" @click="wordCheckDown"
                >下 载</el-button
            >
        </span>
    </el-dialog>
    <el-dialog
        title="设置合同"
        class="contractDialogadd"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        :append-to-body="true"
    >
        <span>目前合同类型为完成一定工作时间，请确认是否完成工作</span>
        <el-form
            label-width="160px"
            ref="addEditForm"
            label-position="right"
        >
            <el-form-item
                label="完成工作时间："
                prop="sxhtriqi"
                v-if="timeshow"
            >
                <el-date-picker
                    v-model="stoptime"
                    :picker-options="pickerEnd"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="queding">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <span style="text-algin: center">{{ centerDialogVisibleMessage }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisibleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import upload from '@/components/public/upload.vue';
import pdfupload from '@/components/common/pdfUpload.vue';
import sideMenu from '@/components/public/sideMenu.vue';
import wordUpload from '@/components/common/wordUpload.vue';
import OSS from 'ali-oss';

export default {
    name: 'contract',
    components: { upload, sideMenu, pdfupload, wordUpload },
    data() {
        return {
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
            contractGetType: '',
            timeshow: true,
            val2: 1,
            FileType: true,
            radio: '1',
            warnPage: true,
            viwePage: true,
            total: '', //默认数据总数
            pagesize: 10, //每页的数据条数
            currentPage: 1, //默认开始页面
            istag: true,
            wFormVisible: false,
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            wordChangeVisible: false,
            // xmid: '',
            bzid: '1',
            idactiveNames: ['1'],
            contractList: [],
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
                bzid: '',
                xmid: ''
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
            searchform: { name: '' },
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
                // htriqi: [
                //     {
                //         required: true,
                //         message: '时间不能为空',
                //         trigger: ['blur', 'change']
                //     }
                // ],
                // sxhtriqi: [
                //     {
                //         required: true,
                //         message: '时间不能为空',
                //         trigger: ['blur', 'change']
                //     }
                // ],
                htstatus: [
                    {
                        required: true,
                        message: '合同类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            statusList: [
                { id: '1', name: '在场' },
                { id: '2', name: '离场' }
            ],
            active: 0,
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
            dowanCheck: ['1'],
            projectOptions: [],
            centerDialogVisible: false,
            centerDialogVisibleMessage: '',
            centerDialogVisibleHerf: '',
            butLoaded: false
        };
    },
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
    },
    computed: {
        newData() {
            return this.addForm.htstatus;
        },

        // 结束时间大于开始时间
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.addForm.sxhtriqi;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    } else {
                        return time.getTime() > Date.now(); // 大于当前时间禁止选择
                    }
                }
            };
        },
        pickerEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.addForm.htriqi;
                    if (beginDateVal) {
                        return (
                            // time.getTime() < Date.now() - 8.64e7 ||
                            time.getTime() <
                            new Date(beginDateVal).getTime() - 8.64e7
                        );
                    }
                }
            };
        }
    },
    created() {
      this.search()
      this.getProjects()
    },
    methods: {
      centerDialogVisibleConfirm() {
        this.centerDialogVisible = false
        window.location.href = this.centerDialogVisibleHerf
      },
      // 项目列表
      getProjects() {
        axios.post('/laowu_yun/huquxiangmulist', {
            corp_id: this.cid,
            newuid: this.$store.state.userData.uid,
            userid: this.uid,
        }).then(res => {
          this.projectOptions = res.data.content.map(item => {
            return { label: item.name, name: item.xmid }
          })
        })
      },
        wordCheckCancel() {
            this.wordDownVisible = false;
            this.dowanCheck = ['1'];
        },
        wordCheckDown() {
            let newid = this.dowanCheck.join(',');
            let host = window.location.host; //主机
            axios
                .get('/ding/downloadMb', {
                    params: {
                        number: newid
                    }
                })
                .then((res) => {
                    dd.biz.util.openLink({
                        url:
                            'https://' +
                            host +
                            '/ding/downloadMb?number=' +
                            newid, //要打开链接的地址
                        onSuccess: function (result) {
                            // this.toggleSelection();
                        },
                        onFail: function (err) {}
                    });
                });
        },
        wordDown() {
            const _this = this;
            let newId = _this.selectPeopleData[0].xmid;
            let toSBzid = _this.bzid.toString();
            let toSNewarr = _this.newarr.toString();
            let host = window.location.host; //主机
            axios
                .get('/ding/GenDocuments', {
                    params: {
                        bzid: toSBzid,
                        teamname: _this.newbzname,
                        corp_id: _this.$store.state.userData.cid,
                        userid: toSNewarr,
                        number: _this.downRadio,
                        xmid: newId
                    }
                })
                .then((res) => {
                    if (res.data.status == 0) {
                        _this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'warning'
                        });
                    } else {
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
                                _this.downRadio +
                                '&xmid=' +
                                newId, //要打开链接的地址
                            onSuccess: function (result) {},
                            onFail: function (err) {}
                        });
                    }
                });
        },
        wordCancel() {
            this.wordChangeVisible = false;
            this.toggleSelection();
        },
        show2(msg) {
            this.leadForm.url = msg;
        },
        excelDerive() {
            this.wordDownVisible = true;
        },
        formatStatus(row) {
            if (row.htstatus == '1') {
                return '完成一定工作';
            } else if (row.htstatus == '0') {
                return '固定合同时间';
            } else if (row.htstatus == '4') {
                return '项目合同';
            } else {
                return '其他';
            }
        },
        queding() {
            if (this.stoptime == '') {
                this.$message({
                    message: '请您选择时间',
                    center: true,
                    duration: 4000,
                    type: 'warning'
                });
            } else {
                axios
                    .post('/laowu_yun/useraddht', {
                        corp_id: this.cid,
                        newuid: this.$store.state.userData.uid,
                        bzid: this.bzid,
                        userid: this.record.userid,
                        htriqi: this.record.htriqi,
                        htstatus: 1,
                        // hturl: this.record.hturl,
                        sxhtriqi: this.stoptime
                    })
                    .then((res) => {
                        this.dialogVisible = false;
                        this.getTable();
                        this.stoptime = '';
                    });
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
        PeopleDerive() {
            let host = window.location.host; //主机
            let toSnewXmid = this.newXmid.toString();
            if (this.contractGetType == '1') {
                axios
                    .get('/laowu_yun/laodonghetongmobandown', {
                        params: {
                            id: this.bzid,
                            lichang: this.lvalue
                        }
                    })
                    .then((res) => {
                        window.location.href =
                            'https://' +
                            host +
                            '/laowu_yun/laodonghetongmobandown?id=' +
                            this.bzid +
                            '&lichang=' +
                            this.lvalue;
                    });
            } else if (this.contractGetType == '2') {
                axios
                    .get('/laowu_yun/laodonghetongmobandown', {
                        params: {
                            xmid: toSnewXmid,
                            userids: this.newarr,
                            type: '2',
                            lichang: this.lvalue
                        }
                    })
                    .then((res) => {
                        window.location.href =
                            'https://' +
                            host +
                            '/laowu_yun/laodonghetongmobandown?xmid=' +
                            toSnewXmid +
                            '&userids=' +
                            this.newarr +
                            '&type=2' +
                            '&lichang=' +
                            this.lvalue;
                    });
            }
        },
        fileChange() {
            if (this.radio == '1') {
                this.FileType = true;
            } else if (this.radio == '2') {
                this.FileType = false;
            }
            this.licenceImg = [];
            this.upImgList = [];
            this.addForm.hturl = [];
            this.isShow = [];
        },
        selectDerive() {
            let toSBzid = this.bzid.toString();
            let toSNewarr = this.newarr.toString();
            let toSnewXmid = this.newXmid.toString();
            let host = window.location.host; //主机
            if (this.contractGetType == '1') {
                axios
                    .get('/laowu_yun/laodonghetongmobandown', {
                        params: {
                            id: toSBzid,
                            newuid: this.$store.state.userData.uid,
                            userids: toSNewarr,
                            lichang: this.lvalue
                        }
                    })
                    .then((res) => {
                        window.location.href =
                            'https://' +
                            host +
                            '/laowu_yun/laodonghetongmobandown?id=' +
                            toSBzid +
                            '&userids=' +
                            toSNewarr +
                            '&lichang=' +
                            this.lvalue;
                        this.toggleSelection();
                    });
            } else if (this.contractGetType == '2') {
                axios
                    .get('/laowu_yun/laodonghetongmobandown', {
                        params: {
                            userids: toSNewarr,
                            xmid: toSnewXmid,
                            newuid: this.$store.state.userData.uid,
                            type: '2',
                            lichang: this.lvalue
                        }
                    })
                    .then((res) => {
                        window.location.href =
                            'https://' +
                            host +
                            '/laowu_yun/laodonghetongmobandown?xmid=' +
                            toSnewXmid +
                            '&userids=' +
                            toSNewarr +
                            '&type=2' +
                            '&lichang=' +
                            this.lvalue;
                        this.toggleSelection();
                    });
            }
        },
        mdBzBtn() {
            if (this.selectPeopleData.length > 0) {
                this.selectDerive();
            } else {
                this.$message({
                    message: '请您先多选',
                    center: true,
                    duration: 4000,
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
            if (this.contractGetType == '2') {
                this.newXmid = val.map((item) => {
                    if (!item.xmid) return '';
                    return item.xmid;
                });
            }
        },
        lookimg1(val) {
            dd.ready(function () {
                dd.biz.util.previewImage({
                    urls: val, //图片地址列表
                    current: val[0], //当前显示的图片链接
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {}
                });
            });
        },
        lookimg2(val) {
            let newImgArr = [val];
            dd.ready(function () {
                dd.biz.util.previewImage({
                    urls: newImgArr, //图片地址列表
                    current: newImgArr[0], //当前显示的图片链接
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {}
                });
            });
        },
        handleClose() {
            this.isFail = false;
            this.failMsg = '';
            this.licenceImg = [];
            this.upImgList = [];
            this.licenceImgPdf = [];
            this.upImgListPdf = [];
            this.addForm.hturl = [];
            this.$refs.addEditForm.resetFields(); // 清空表单
            this.isShow = [];
            this.isShowPdf = [];
            this.addFormVisible = false;
        },
        watchPdf(item) {
            dd.ready(function () {
                dd.biz.util.openLink({
                    url: item, //要打开链接的地址
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {}
                });
            });
        },
        signContract(row) {
          axios.post('/eqianbao/esignprocessestart', {
            corp_id: this.cid,
            userid: this.$store.state.userData.uid,
            htid: row.htid
          }).then(res => {
            if (res.data.code == 1) {
              this.$message.success(res.data.msg)
              this.getTable()
              // window.location.href = res.data.content
            } else if (res.data.code == 2) {
              this.$message(res.data.msg)
              // this.centerDialogVisibleMessage = res.data.msg
              // this.centerDialogVisible = true
              // this.centerDialogVisibleHerf = res.data.content
            }
          })
        },
        setContenr(row) {
            this.dialogVisible = true;
            this.record = row;
            console.log(this.record);
        },
        handleClick(row) {
            this.isPdf = row.hturl[0].substr(row.hturl[0].length - 3);
            this.picList = row.hturl;
            if (this.isPdf != 'pdf') {
                this.lookimg1(this.picList);
            } else {
                this.wFormVisible = true;
            }
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
            this.contractGetType = payload;
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
            this.xiaoshi = this.lvalue;
            this.checkUp();
            if (this.contractGetType == '1') {
                axios
                    .post('/laowu_yun/useraddhtlist', {
                        // corp_id: this.cid,
                        // newuid: this.$store.state.userData.uid,
                        // bzid: this.bzid,
                        current_page: this.currentPage,
                        name: this.searchform.name,
                        // lichang: this.lvalue
                    })
                    .then((res) => {
                        if (res.data.status == 1) {
                            this.total = res.data.content.total;
                            this.contractList = res.data.content.list;
                            // this.currentPage = res.data.content.current_page;
                            if (
                                this.total > 0 &&
                                this.contractList.length < 1
                            ) {
                                this.currentPage = res.data.content.page;
                                this.getTable();
                            }
                        } else {
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                axios
                    .post('/laowu_yun/useraddhtlist', {
                        // corp_id: this.cid,
                        // userid: this.bzid,
                        // newuid: this.$store.state.userData.uid,
                        current_page: this.currentPage,
                        name: this.searchform.name,
                        // lichang: this.lvalue
                    })
                    .then((res) => {
                        if (res.data.status == 1) {
                            this.total = res.data.content.total;
                            this.contractList = res.data.content.list;
                            // this.currentPage = res.data.content.current_page;
                            if (
                                this.total > 0 &&
                                this.contractList.length < 1
                            ) {
                                this.currentPage = res.data.content.page;
                                this.getTable();
                            }
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
        save(formName) {
            let newString = JSON.stringify(this.addForm.htimgurl);

            if (newString != '[]') {
                this.butLoaded = true;
                if (this.addForm.hturl.length < 1) {
                    delete this.addForm.hturl;
                }

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        delete this.addForm.htimgurl;
                        axios
                            .post('/laowu_yun/useraddht', this.addForm)
                            .then((res) => {
                                if (res.data.status == 1) {
                                    this.isShow = [];
                                    this.butLoaded = false;
                                    this.licenceImg = [];
                                    this.upImgList = [];
                                    this.isShowPdf = [];
                                    this.licenceImgPdf = [];
                                    this.upImgListPdf = [];
                                    this.addForm.hturl = [];
                                    this.$refs.addEditForm.resetFields(); // 清空表单
                                    this.addFormVisible = false;
                                    this.getTable();

                                    this.isFail = false;
                                    this.failMsg = '';
                                } else {
                                    this.butLoaded = false;
                                    this.isFail = true;
                                    this.failMsg = res.data.msg;
                                }
                            })
                            .catch(function (error) {
                                this.butLoaded = false;
                                console.log(error);
                            });
                    } else {
                        this.addForm.htimgurl = this.saveUrl;
                        this.butLoaded = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            } else {
              this.butLoaded = true;
                let newString2 = JSON.stringify(this.addForm.hturl);
                if (newString2 == '[]') {
                    this.$message({
                        message: '请添加合同附件',
                        center: true,
                        duration: 4000,
                        type: 'warning'
                    });
                } else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            delete this.addForm.htimgurl;
                            axios
                                .post('/laowu_yun/useraddht', this.addForm)
                                .then((res) => {
                                    if (res.data.status == 1) {
                                        this.isShow = [];
                                        this.isShowPdf = [];
                                        this.butLoaded = false;
                                        this.licenceImg = [];
                                        this.upImgList = [];
                                        this.licenceImgPdf = [];
                                        this.upImgListPdf = [];
                                        this.addForm.hturl = [];
                                        this.$refs.addEditForm.resetFields(); // 清空表单
                                        this.addFormVisible = false;
                                        this.getTable();

                                        this.isFail = false;
                                        this.failMsg = '';
                                    } else {
                                        this.butLoaded = false;
                                        this.isFail = true;
                                        this.failMsg = res.data.msg;
                                    }
                                })
                                .catch(function (error) {
                                    this.butLoaded = false;
                                    console.log(error);
                                });
                        } else {
                            this.addForm.htimgurl = this.saveUrl;
                            this.butLoaded = false;
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
            }
        },
        cancel() {
            this.dialogVisible = false;
            this.isFail = false;
            this.failMsg = '';
            this.licenceImg = [];
            this.upImgList = [];
            this.addForm.hturl = [];
            this.isShow = [];
            this.$refs.addEditForm.resetFields(); // 清空表单

            this.addFormVisible = false;
        },
        statusClick(index, value) {
            this.val1 = index;
            this.currentPage = 1;
            this.active = index;
            this.lvalue = value;
            this.getTable();
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
