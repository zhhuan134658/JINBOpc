<template>
    <div id="bphubei">
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
                <el-table-column label="项目上报">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleXiangmu(scope.$index, scope.row)"
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
                title="修改项目上报"
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
                        label-width="200px"
                    >
                        <el-form-item
                            class="marginb"
                            label="项目名称："
                            prop="projectName"
                        >
                            <el-input
                                placeholder="请输入项目名称"
                                v-model="manyForm.projectName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="资金来源："
                            prop="fundSource"
                        >
                            <el-select
                                v-model="manyForm.fundSource"
                                placeholder="请选择资金来源"
                            >
                                <el-option
                                    v-for="item in moneyTypeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开工时间：" prop="startTime">
                            <el-date-picker
                                v-model="manyForm.startTime"
                                @change="startTime"
                                :picker-options="pickerStart"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束日期：" prop="endTime">
                            <el-date-picker
                                v-model="manyForm.endTime"
                                @change="endTime"
                                :picker-options="pickerEnd"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="经度："
                            prop="locationX"
                        >
                            <el-input
                                placeholder="请输入经度"
                                v-model="manyForm.locationX"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="纬度："
                            prop="locationY"
                        >
                            <el-input
                                placeholder="请输入纬度"
                                v-model="manyForm.locationY"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="项目属地行政区划代码："
                            prop="areaCode"
                        >
                            <el-input
                                placeholder="请输入项目属地行政区划代码"
                                v-model="manyForm.areaCode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="项目地址："
                            prop="address"
                        >
                            <el-input
                                placeholder="请输入项目地址"
                                v-model="manyForm.address"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="建筑面积(㎡)："
                            prop="buildingArea"
                        >
                            <el-input
                                placeholder="请输入建筑面积"
                                v-model="manyForm.buildingArea"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="工程造价(万元)："
                            prop="totalContractAmt"
                        >
                            <el-input
                                placeholder="请输入工程造价(万元)"
                                v-model="manyForm.totalContractAmt"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="建设单位名称："
                            prop="ownerName"
                        >
                            <el-input
                                placeholder="请输入建设单位名称"
                                v-model="manyForm.ownerName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="建设单位社会信用代码："
                            prop="buildCorporationCode"
                        >
                            <el-input
                                placeholder="请输入建设单位社会信用代码"
                                v-model="manyForm.buildCorporationCode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="建设单位联系人："
                            prop="buildContacts"
                        >
                            <el-input
                                placeholder="请输入建设单位联系人"
                                v-model="manyForm.buildContacts"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="建设单位联系电话："
                            prop="buildPhone"
                        >
                            <el-input
                                placeholder="请输入建设单位联系电话"
                                v-model="manyForm.buildPhone"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="所属公司社会信用代码："
                            prop="contractorOrgCode"
                        >
                            <el-input
                                placeholder="请输入所属公司社会信用代码"
                                v-model="manyForm.contractorOrgCode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="所属地区（籍贯）编码："
                            prop="birthPlaceCode"
                        >
                            <el-input
                                placeholder="请输入所属地区（籍贯）编码"
                                v-model="manyForm.birthPlaceCode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="项目状态："
                            prop="projectStatus"
                        >
                            <el-select
                                v-model="manyForm.projectStatus"
                                placeholder="请选择"
                            >
                                <el-option label="筹建" value="2"></el-option>
                                <el-option label="在建" value="1"></el-option>
                                <el-option label="完工" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="施工许可证编号："
                            prop="projectPlanNum"
                        >
                            <el-input
                                placeholder="请输入施工许可证编号"
                                v-model="manyForm.projectPlanNum"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="项目类别："
                            prop="projectType"
                        >
                            <el-select
                                v-model="manyForm.projectType"
                                placeholder="请选择"
                            >
                                <el-option
                                    label="房屋建筑工程"
                                    value="房屋建筑工程"
                                ></el-option>
                                <el-option
                                    label="市政工程"
                                    value="市政工程"
                                ></el-option>
                                <el-option
                                    label="其他"
                                    value="其他"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="总承包单位名称："
                            prop="workCompanyName"
                        >
                            <el-input
                                placeholder="请输入总承包单位名称"
                                v-model="manyForm.workCompanyName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            class="marginb"
                            label="总承包单位企业信用代码："
                            prop="contractCode"
                        >
                            <el-input
                                placeholder="请输入总承包单位企业信用代码"
                                v-model="manyForm.contractCode"
                            ></el-input>
                        </el-form-item>
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
        </div>
    </div>
</template>
   
<script>
import axios from 'axios';
import sideMenu2 from '../common/sideMenu2.vue';
export default {
    components: { sideMenu2 },
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
        var validatenum = (rule, value, callback) => {
            const reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{5})))$/;
            if (value) {
                if (!reg.test(value)) {
                    callback(
                        new Error(
                            '请输入正确的格式(格式为数字,最多保留五位小数)'
                        )
                    );
                } else {
                    callback();
                }
            } else {
                callback(new Error('不能为空'));
            }
        };
        return {
            manyFormVisible: false,
            canjianVisible: false,
            baopanData: [],
            isTest: ['1'],
            viwePage: false,
            warnPage: true,
            manyForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                zhanghao: ''
            },
            cid: this.$store.state.userData.cid,
            isFail: false,
            failMsg: '',
            manyFormRules: {
                projectName: [
                    {
                        required: true,
                        message: '项目名称不能为空',
                        trigger: 'blur'
                    }
                ],
                fundSource: [
                    {
                        required: true,
                        message: '资金来源不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                startTime: [
                    {
                        required: true,
                        message: '开工时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                endTime: [
                    {
                        required: true,
                        message: '结束时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                locationX: [
                    {
                        required: true,
                        message: '经度不能为空',
                        trigger: 'blur'
                    }
                ],
                locationY: [
                    {
                        required: true,
                        message: '纬度不能为空',
                        trigger: 'blur'
                    }
                ],
                areaCode: [
                    {
                        required: true,
                        message: '项目属地行政区划代码不能为空',
                        trigger: 'blur'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '项目地址不能为空',
                        trigger: 'blur'
                    }
                ],
                buildingArea: [
                    {
                        required: true,
                        validator: validatenum,
                        trigger: 'blur'
                    }
                ],
                totalContractAmt: [
                    {
                        required: true,
                        validator: validatenum,
                        trigger: 'blur'
                    }
                ],
                ownerName: [
                    {
                        required: true,
                        message: '建设单位名称不能为空',
                        trigger: 'blur'
                    }
                ],
                buildCorporationCode: [
                    {
                        required: true,
                        message: '建设单位社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                buildContacts: [
                    {
                        required: true,
                        message: '建设单位联系人不能为空',
                        trigger: 'blur'
                    }
                ],
                buildPhone: [
                    {
                        required: true,
                        message: '建设单位联系电话不能为空',
                        trigger: 'blur'
                    }
                ],
                contractorOrgCode: [
                    {
                        required: true,
                        message: '所属公司社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                birthPlaceCode: [
                    {
                        required: true,
                        message: '所属地区（籍贯）编码不能为空',
                        trigger: 'blur'
                    }
                ],
                projectStatus: [
                    {
                        required: true,
                        message: '项目状态不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                projectPlanNum: [
                    {
                        required: true,
                        message: '施工许可证编号不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                projectType: [
                    {
                        required: true,
                        message: '项目类别不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                workCompanyName: [
                    {
                        required: true,
                        message: '总承包单位名称不能为空',
                        trigger: 'blur'
                    }
                ],
                contractCode: [
                    {
                        required: true,
                        message: '总承包单位企业信用代码不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            xmid: '',
            moneyTypeList: [
                { name: '各级政府财政资金投资', id: '各级政府财政资金投资' },
                { name: '国有企业资金投资', id: '国有企业资金投资' },
                { name: '私（民）营投资', id: '私（民）营投资' },
                { name: '集体经济组织投资', id: '集体经济组织投资' },
                { name: '外商（国）投资', id: '外商（国）投资' },
                { name: '其他资金来源', id: '其他资金来源' }
            ],
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            watchErrorDetailVisible: false,
            watchErrorDetailList: []
        };
    },

    methods: {
        handleCanjian(index, row) {
            this.$router.push({
                path: '/bphubeicj',
                query: { xmid: row.xmid }
            });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getErrorDataList();
        },
        watchErrorDetail(row) {
            this.getErrorDataList();
            this.watchErrorDetailVisible = true;
            this.xmid = row.xmid;
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
        handleBanzu(index, row) {
            if (!this.manyForm.projectName) {
                this.$alert('请先修改接口！');
            } else {
                this.$store.commit('setbpXmTable', row.address);
                this.$store.commit('setbpXmCode', this.manyForm.projectName);
                this.$router.push({
                    path: '/bpbanzuhubei',
                    query: {
                        xmid: row.xmid,
                        prcode: this.manyForm.projectName,
                        address: row.address
                    }
                });
            }
        },
        getDetailHb() {
            axios
                .post('/laowu_yun/huquxiangmucontent', {
                    corp_id: this.cid,
                    xmid: this.xmid,
                    newuid: this.$store.state.userData.uid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.manyForm = res.data.content;
                        this.manyForm.xmid = this.xmid;
                        this.manyForm.corp_id = this.cid;
                    } else {
                        this.$alert('错误');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getTable() {
            axios
                .post('/baopan/projectsbxinxilist', {
                    corp_id: this.cid,
                    xmid: this.xmid,
                    newuid: this.$store.state.userData.uid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.baopanData = res.data.content;

                        // if (res.data.content[0].projectcontent.length > 0) {
                        //     this.manyForm =
                        //         res.data.content[0].projectcontent[0];
                        // }

                        // this.manyForm.corp_id = this.$store.state.userData.cid;
                        // this.manyForm.xmid = this.xmid;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        upCancel() {
            // this.$refs.manyEditForm.resetFields();
            this.manyFormVisible = false;
            // this.manyForm = res.data.content.projectcontent;
            // this.manyForm.xmid = this.xmid;
            // this.manyForm.corp_id = this.$store.state.userData.cid;
        },
        upBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post(
                            '/laowu_yun/shangbaohubeixiangmuxinxi',
                            that.manyForm
                        )
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
                                that.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning'
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
    mounted() {
        // this.getTable();
        if (this.xmid) {
            this.warnPage = false;
            this.viwePage = true;
            this.getDetailHb();
            this.getTable();
        }
        if (this.$route.query.test) {
            this.isTest = [];
            this.$emit('getChild3', this.isTest);
        }
    },
    computed: {
        // 结束时间大于开始时间
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.manyForm.endTime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            };
        },
        pickerEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.manyForm.startTime;
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
    watch: {
        isTable: {
            handler(newValue, oldValue) {
                console.log('66++' + newValue);
                if (newValue.length > 0) {
                    this.warnPage = false;
                    this.viwePage = true;
                    // this.searchform.name = '';
                    this.getTable();
                    this.getDetailHb();
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
#bphubei {
    height: 100%;
    padding: 10px;
    .marginb {
        margin-bottom: 15px;
    }
}
</style>