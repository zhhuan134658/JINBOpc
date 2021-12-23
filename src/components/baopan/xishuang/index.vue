<template>
    <div id="bpFujian">
        <!-- 西双版纳报盘 -->
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
                    src="@/assets/images/write.png"
                    alt
                />
                <div style="font-size: 16px">请选择项目</div>
            </div>
        </div>
        <!-- 添加公司信息 -->
        <div v-show="viwePage">
            <el-table :data="baopanData" border style="width: 100%">
                <el-table-column prop="name" label="项目名称">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.name }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{
                                    scope.row.name
                                }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ptname"
                    label="绑定平台"
                ></el-table-column>
                <el-table-column label="上报接口设置">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleXiangmu(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >接口信息</el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column label="项目上报">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleProject(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >项目上报</el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column label="参建单位操作">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleCanjian(scope.$index, scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >参建单位上报</el-button
                        >
                    </template>
                </el-table-column>
                <!-- <el-table-column label="工资专户设值">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleMoney(scope.$index,scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >工资专户上报</el-button>
                    </template>
                </el-table-column>-->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleBanzu(scope.$index, scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >班组上报</el-button
                        >
                        <el-button
                            @click="watchErrorDetail(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >考勤再次上报</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog
                title="修改上报接口"
                :visible.sync="manyFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="bpPublcDialog"
            >
                <div>
                    <el-form
                        :model="manyForm"
                        :rules="manyFormRules"
                        ref="manyEditForm"
                    >
                        <el-form-item class="marginb" prop="zhanghao">
                            <el-input
                                placeholder="请输入项目编码"
                                v-model="manyForm.zhanghao"
                            >
                                <template slot="prepend">
                                    <span style="color: red">*</span> 项目编码
                                </template>
                            </el-input>
                        </el-form-item>
                        <!-- <el-form-item class="marginb" prop="zongbaoname">
                            <el-input
                                placeholder="请输入账号"
                                v-model="manyForm.zongbaoname"
                            >
                                <template slot="prepend">
                                    <span style="color: red">*</span>
                                    账号(AppID)
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="marginb" prop="password">
                            <el-input
                                placeholder="请输入密钥"
                                v-model="manyForm.password"
                            >
                                <template slot="prepend">
                                    <span style="color: red">*</span>
                                    密钥(SecretKey)
                                </template>
                            </el-input>
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
                                @click="upBtn('manyEditForm')"
                                >立即上报</el-button
                            >
                            <el-button @click="upCancel">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <!-- <el-dialog
                title="工资专户上报"
                :visible.sync="moneyView"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="bpPublcDialog"
            >
                <div>
                    <el-form :model="moneyForm" :rules="moneyFormRules" ref="moneyEditForm">
                        <el-form-item prop="CorpName" label="施工总承包单位名称：">
                            <el-input placeholder="请输入施工总承包单位名称" v-model="moneyForm.CorpName"></el-input>
                        </el-form-item>
                        <el-form-item prop="CorpCode" label="施工总承包单位统一社会信用代码：">
                            <el-input placeholder="请输入施工总承包单位统一社会信用代码" v-model="moneyForm.CorpCode"></el-input>
                        </el-form-item>
                        <el-form-item prop="SpecialAccount" label="农民工工资专用账户名称：">
                            <el-input
                                placeholder="请输入农民工工资专用账户名称"
                                v-model="moneyForm.SpecialAccount"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="BankName" label="农民工工资专用账户开户行名称：">
                            <el-input placeholder="请输入农民工工资专用账户开户行名称" v-model="moneyForm.BankName"></el-input>
                        </el-form-item>
                        <el-form-item prop="PayBankCode" label="农民工工资专用账户开户行银行代码：">
                            <el-select v-model="moneyForm.PayBankCode" filterable placeholder="请选择">
                                <el-option
                                    v-for="item in bankCodeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="SpecialAccountNo" label="农民工工资专用账户账号：">
                            <el-input
                                placeholder="请输入农民工工资专用账户账号"
                                v-model="moneyForm.SpecialAccountNo"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="AccountSum" label="建设单位拨款到帐金额（元）：">
                            <el-input placeholder="请输入建设单位拨款到帐金额" v-model="moneyForm.AccountSum"></el-input>
                        </el-form-item>
                        <el-form-item label="建设单位拨款到帐时间：" prop="AccountTime">
                            <el-date-picker
                                v-model="moneyForm.AccountTime"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item prop="AccountBalance" label="农民工工资专用账户余额（元）：">
                            <el-input
                                placeholder="请输入农民工工资专用账户余额金额"
                                v-model="moneyForm.AccountBalance"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="upMoneyBtn('moneyEditForm')"
                            >立即上报</el-button>
                            <el-button @click="moneyCancel">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>-->
            <el-dialog
                title="今日考勤失败记录"
                :visible.sync="watchErrorDetailVisible"
                :append-to-body="true"
                class="corpkaoqin"
            >
                <div style="margin-bottom: 20px">
                    <el-button type="primary" plain @click="upAgain"
                        >再次上报</el-button
                    >
                </div>
                <el-table
                    :data="watchErrorDetailList"
                    border
                    style="width: 100%"
                >
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column
                        prop="date"
                        label="打卡时间"
                    ></el-table-column>
                    <el-table-column
                        prop="type"
                        label="上报结果"
                    ></el-table-column>
                </el-table>
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
            </el-dialog>

            <el-dialog
                title="项目上报"
                :visible.sync="projectVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="bpPublcDialog guizhoushangbao"
            >
                <div>
                    <el-form
                        :model="projectForm"
                        :rules="projectFormRules"
                        ref="projectForm"
                        label-width="250px"
                    >
                      <el-form-item label="总承包单位统一社会信用代码" prop="contractorCorpCode">
                        <el-input v-model="projectForm.contractorCorpCode" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="总承包单位名称" prop="contractorCorpName">
                        <el-input v-model="projectForm.contractorCorpName" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="项目名称" prop="projectName">
                        <el-input v-model="projectForm.projectName" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="项目状态" prop="prjStatus">
                        <el-select v-model="projectForm.prjStatus" placeholder="请选择">
                          <el-option value="001" label="筹备"></el-option>
                          <el-option value="002" label="立项"></el-option>
                          <el-option value="003" label="在建"></el-option>
                          <el-option value="004" label="完工"></el-option>
                          <el-option value="005" label="停工"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="施工许可证号" prop="builderLicenseNum">
                        <el-input v-model="projectForm.builderLicenseNum" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="项目劳资员姓名" prop="labourManName">
                        <el-input v-model="projectForm.labourManName" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="项目劳资员电话" prop="labourManPhone">
                        <el-input v-model="projectForm.labourManPhone" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="建筑单位工资专管员姓名" prop="salaryManName">
                        <el-input v-model="projectForm.salaryManName" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="建筑单位工资专管员电话" prop="salaryManPhone">
                        <el-input v-model="projectForm.salaryManPhone" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="行业主管部门项目监督员姓名" prop="projectManName">
                        <el-input v-model="projectForm.projectManName" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="行业主管部门项目监督员电话" prop="projectManPhone">
                        <el-input v-model="projectForm.projectManPhone" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="劳动保障监察员姓名" prop="ensureManName">
                        <el-input v-model="projectForm.ensureManName" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="劳动保障监察员电话" prop="ensureManPhone">
                        <el-input v-model="projectForm.ensureManPhone" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="劳动法律监督员姓名" prop="legalManName">
                        <el-input v-model="projectForm.legalManName" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="劳动法律监督员电话" prop="legalManPhone">
                        <el-input v-model="projectForm.legalManPhone" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item label="五员监管告示牌" prop="warnImageUrl">
                        <upload1
                            ref="mychild1"
                            :upImgList="upImgList1"
                            :licenceImg="licenceImg1"
                            :isShow="isShow1"
                            @listenToChildEvent1="show1"
                        ></upload1>
                      </el-form-item>
                      <el-form-item label="企业用工信息告示牌" prop="infoImageUrl">
                        <upload2
                            ref="mychild2"
                            :upImgList="upImgList2"
                            :licenceImg="licenceImg2"
                            :isShow="isShow2"
                            @listenToChildEvent2="show2"
                        ></upload2>
                      </el-form-item>
                      <el-form-item style="margin-top: 20px">
                        <el-button
                          type="primary"
                          :loading="loaded"
                          @click="projectSubmit"
                          >立即上报</el-button
                        >
                        <el-button @click="projectCancel">返回</el-button>
                      </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
   
<script>
import axios from 'axios';
import upload1 from './components/GuiUpload1';
import upload2 from './components/GuiUpload2';
export default {
    components: { upload1, upload2 },
    props: {
        xmid: {
            type: String
        },
        isTable: {
            type: Array
        },
        aname: {
            type: String
        },
        newAtest: {
            type: Array
        }
    },
    data() {
      const validatePhone = (rule, value, callback) => {
        let reg = /^1[3456789]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error('格式错误'));
        } else {
          callback();
        }
      }
        return {
          loaded: false,
          projectVisible: false,
            manyFormVisible: false,
            canjianVisible: false,
            moneyView: false,
            baopanData: [],
            isTest: ['1'],
            viwePage: false,
            warnPage: true,
            manyForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                zhanghao: '',
                zongbaoname: '',
                password: ''
            },
            cid: this.$store.state.userData.cid,
            isFail: false,
            failMsg: '',
            manyFormRules: {
                zhanghao: [
                    {
                        required: true,
                        message: '项目编码不能为空',
                        trigger: 'blur'
                    }
                ]
                // zongbaoname: [
                //     {
                //         required: true,
                //         message: '账号(AppID)不能为空',
                //         trigger: 'blur'
                //     }
                // ],
                // password: [
                //     {
                //         required: true,
                //         message: '密钥(SecretKey)不能为空',
                //         trigger: 'blur'
                //     }
                // ]
            },
            xmid: '',
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            watchErrorDetailVisible: false,
            watchErrorDetailList: [],
            /**
             * 项目上报
             */
            projectForm: {
              corp_id: this.$store.state.userData.cid, // 企业id
              xmid: this.xmid, // 项目ID
              contractorCorpCode: '', // 总承包单位统一社会信用代码
              contractorCorpName: '', // 总承包单位名称
              projectName: '', // 项⽬名称
              prjStatus: '', // 项目状态字典表
              builderLicenseNum: '', //        施工许可证号（此字段住建部要求上报,考虑到目前有的项目没有,可不必传.后期必须补上）
              labourManName: '', //      项目劳资员姓名
              labourManPhone: '', // 项目劳资员电话
              salaryManName: '', // 建筑单位工资专管员姓名
              salaryManPhone: '', // 建筑单位工资专管员电话
              projectManName: '', // 行业主管部门项目监督员姓名
              projectManPhone: '', // 行业主管部门项目监督员电话
              ensureManName: '', //  劳动保障监察员姓名
              ensureManPhone: '', // 劳动保障监察员电话
              legalManName: '', // 劳动法律监督员姓名
              legalManPhone: '', // 劳动法律监督员电话
              warnImageUrl: '', // 五员监管告示牌url
              infoImageUrl: '', // 企业用工信息告示牌url
            },
            projectFormRules: {
              contractorCorpCode: [
                { required: true, message: '不能为空', trigger: 'bulr' },
                { type: 'string', max: 30, message: '长度超出', trigger: 'change' },
              ], // 总承包单位统一社会信用代码
              contractorCorpName: [
                { required: true, message: '不能为空', trigger: 'bulr' },
                { type: 'string', max: 20, message: '长度超出', trigger: 'change' },
              ], // 总承包单位名称
              projectName: [
                { required: true, message: '不能为空', trigger: 'bulr' },
                { type: 'string', max: 20, message: '长度超出', trigger: 'change' },
              ], // 项⽬名称
              prjStatus: [
                { required: true, message: '不能为空', trigger: 'bulr' }
              ], // 项目状态字典表
              builderLicenseNum: [
                // { required: true, message: '不能为空', trigger: 'bulr' },
                { type: 'string', max: 20, message: '长度超出', trigger: 'change' },
              ], //        施工许可证号（此字段住建部要求上报,考虑到目前有的项目没有,可不必传.后期必须补上）
              labourManName: [
                { required: true, message: '不能为空', trigger: 'bulr' },
                { type: 'string', max: 20, message: '长度超出', trigger: 'change' },
              ], //      项目劳资员姓名
              labourManPhone: [
                { required: true, message: '不能为空', trigger: 'bulr' },
                { trigger: 'bulr', validator: validatePhone },
              ], // 项目劳资员电话
              salaryManName: [
                { required: true, message: '不能为空', trigger: 'bulr' },
                { type: 'string', max: 20, message: '长度超出', trigger: 'change' },
              ], // 建筑单位工资专管员姓名
              salaryManPhone: [
                { required: true, message: '不能为空', trigger: 'bulr' },
                { trigger: 'bulr', validator: validatePhone },
              ], // 建筑单位工资专管员电话
              projectManName: [
                { required: true, message: '不能为空', trigger: 'bulr' },
                { type: 'string', max: 20, message: '长度超出', trigger: 'change' },
              ], // 行业主管部门项目监督员姓名
              projectManPhone: [
                { required: true, message: '不能为空', trigger: 'bulr' },
                { trigger: 'bulr', validator: validatePhone },
              ], // 行业主管部门项目监督员电话
              ensureManName: [
                { required: true, message: '不能为空', trigger: 'bulr' },
                { type: 'string', max: 20, message: '长度超出', trigger: 'change' },
              ], //  劳动保障监察员姓名
              ensureManPhone: [
                { required: true, message: '不能为空', trigger: 'bulr' },
                { trigger: 'bulr', validator: validatePhone },
              ], // 劳动保障监察员电话
              legalManName: [
                { required: true, message: '不能为空', trigger: 'bulr' },
                { type: 'string', max: 20, message: '长度超出', trigger: 'change' },
              ], // 劳动法律监督员姓名
              legalManPhone: [
                { required: true, message: '不能为空', trigger: 'bulr' },
                { trigger: 'bulr', validator: validatePhone },
              ], // 劳动法律监督员电话
              warnImageUrl: [
                { required: true, message: '请上传', trigger: 'bulr' }
              ], // 五员监管告示牌url
              infoImageUrl: [
                { required: true, message: '请上传', trigger: 'bulr' }
              ], // 企业用工信息告示牌url
            },
            upImgList1: '',
            licenceImg1: '',
            isShow1: ['1'],
            upImgList2: '',
            licenceImg2: '',
            isShow2: ['1'],
        };
    },

    methods: {
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getErrorDataList();
        },
        watchErrorDetail(row) {
            this.getErrorDataList();
            this.watchErrorDetailVisible = true;
            this.xmid = row.xmid;
        },
        handelSalary(row) {
          this.salaryDetailVisible = true;
        },
        // 再次上报考勤
        upAgain() {
            axios
                .post('/newbao/kaoqinerrorupdate', {
                    corp_id: this.cid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.currentPage = 1;
                        this.getErrorDataList();
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
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
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //获取考勤失败记录
        getErrorDataList() {
            axios
                .post('/newbao/kaoqinerror', {
                    current_page: this.currentPage,
                    corp_id: this.cid,
                    xmid: this.xmid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.watchErrorDetailList = res.data.content.list;
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.currentPage = res.data.content.current_page;
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
                    console.log(error);
                });
        },
        handleXiangmu(row) {
            this.manyFormVisible = true;
        },
        handleProject(row) {
          this.projectVisible = true;
        },
        handleCanjian(index, row) {
            this.$router.push({
                path: '/bpxishuangbannacanjian',
                query: { xmid: row.xmid }
            });
        },
        handleMoney(index, row) {
            this.moneyView = true;
        },
        handleBanzu(index, row) {
            this.$router.push({
                path: '/bpxishuangbannabanzu',
                query: {
                    xmid: row.xmid,
                    prcode: this.manyForm.zhanghao,
                    address: row.address
                }
            });
            // if (!this.manyForm.zhanghao) {
            //     this.$alert('请先修改接口！');
            // } else {
            //     this.$store.commit('setbpXmTable', row.address);
            //     this.$store.commit('setbpXmCode', this.manyForm.zhanghao);
            //     this.$router.push({
            //         path: '/bpxishuangbannabanzu',
            //         query: {
            //             xmid: row.xmid,
            //             prcode: this.manyForm.zhanghao,
            //             address: row.address
            //         }
            //     });
            // }
        },
        getTable() {
            this.manyForm.xmid = this.xmid;
            axios
                .post('/baopan/projectsbxinxilist', {
                    corp_id: this.cid,
                    xmid: this.xmid,
                    newuid: this.$store.state.userData.uid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.baopanData = res.data.content;

                        if (res.data.content[0].projectcontent.length > 0) {
                            this.manyForm =
                                res.data.content[0].projectcontent[0];
                        } else {
                            this.manyForm.zhanghao = '';
                        }

                        this.manyForm.corp_id = this.$store.state.userData.cid;
                        this.manyForm.xmid = this.xmid;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        upCancel() {
            this.manyFormVisible = false;
        },
        projectCancel() {
          this.projectVisible = false;
        },
        upBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/baopan/projectaddsbuser', that.manyForm)
                        .then((res) => {
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
        // 保存项目数据
        projectSubmit() {
          const that = this;
          const formName = 'projectForm';
            that.loaded = true;
            that.$refs[formName].validate(valid => {
                if (valid) {
                    axios
                        .post(
                            '/baopan/sbxsbnProjectContent',
                            that.projectForm
                        )
                        .then(res => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.$refs[formName].resetFields();
                                that.manyFormVisible = false;
                                that.getTable();
                                that.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'success'
                                });
                            } else {
                                that.loaded = false;
                                // that.$refs[formName].resetFields();
                                that.$message({
                                    message: res.data.msg,
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
        show1(data) {
          console.log('upload1');
          this.projectForm.warnImageUrl = data;
          return false;
        },
        show2(data) {
          console.log('upload2');
          this.projectForm.infoImageUrl = data;
          return false;
        }
    },
    mounted() {
        if (this.xmid) {
            this.warnPage = false;
            this.viwePage = true;
            this.$message({
                message: '上报前请上传人员的身份证照片，如有疑问请联系服务商',
                type: 'success'
            });
            this.getTable();
        }
        if (this.$route.query.test) {
            this.isTest = [];
            this.$emit('getChild3', this.isTest);
        }
    },
    watch: {
        isTable: {
            handler(newValue, oldValue) {
                if (newValue.length > 0) {
                    this.warnPage = false;
                    this.viwePage = true;
                    // this.searchform.name = '';
                    this.getTable();
                    // this.isTable = ['1'];
                    this.$emit('getChild2', this.isTable);
                }
            },
            deep: true
        }
    }
};
</script>
<style lang="less">
.cell {
    text-align: center;
}
#bpFujian {
    height: 100%;
    padding: 10px;
    .marginb {
        margin-bottom: 15px;
    }
}
</style>