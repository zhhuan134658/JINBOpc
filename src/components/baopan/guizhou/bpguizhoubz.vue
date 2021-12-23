<template>
    <div id="bpguizhoubz">
        <el-button
            type="primary"
            @click="goback"
            style="float: right; margin-bottom: 10px; margin-left: 10px"
            >返回</el-button
        >

        <el-table :data="teamList" border style="width: 100%">
            <el-table-column
                type="index"
                label="序号"
                width="50"
            ></el-table-column>
            <el-table-column prop="name" label="班组名称">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>{{ scope.row.name }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="bzperson"
                label="班组长姓名"
            ></el-table-column>
            <el-table-column prop="count" label="班组人数"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        @click="handlebd(scope.row)"
                        type="primary"
                        plain
                        size="small"
                        >班组上报</el-button
                    >
                </template>
            </el-table-column>
            <el-table-column label="查看">
                <template slot-scope="scope">
                    <div v-if="scope.row.type == 1">
                        <el-button
                            @click="handleChakan(scope.$index, scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >人员上报</el-button
                        >
                        <el-button
                            @click="watchDetail(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >考勤查看</el-button
                        >
                    </div>
                    <div v-else>
                        <el-button
                            @click="NoChakan"
                            type="info"
                            plain
                            size="small"
                            >人员上报</el-button
                        >
                        <el-button
                            @click="NoChakan"
                            type="info"
                            plain
                            size="small"
                            >考勤查看</el-button
                        >
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="企业考勤记录"
            :visible.sync="watchDetailVisible"
            :append-to-body="true"
            class="corpkaoqin"
        >
            <div style="margin-bottom: 20px; text-align: center">
                <el-date-picker
                    v-model="searchTime"
                    type="month"
                    :picker-options="pickerStart"
                    format="yyyy 年 MM 月"
                    value-format="yyyy-MM"
                    placeholder="选择日期"
                    @change="timeChange"
                ></el-date-picker>
            </div>
            <el-table :data="watchDetailList" border style="width: 100%">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column
                    prop="usercode"
                    label="身份证号"
                ></el-table-column>
                <el-table-column prop="yuefen" label="月份"></el-table-column>
                <el-table-column prop="tianshu" label="天数"></el-table-column>
                <el-table-column label="查看">
                    <template slot-scope="scope">
                        <el-button
                            @click="watchSingelTitle(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >详情</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                class="bpbanzukaoqinDialog"
                title="企业考勤记录"
                :visible.sync="watchInnerVisible"
                :append-to-body="true"
            >
                <el-table :data="watchSingelList" border style="width: 100%">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column
                        prop="time"
                        label="打卡时间"
                    ></el-table-column>
                    <el-table-column
                        prop="yuefen"
                        label="考勤月份"
                    ></el-table-column>
                    <el-table-column
                        prop="jinchu"
                        label="进出状态"
                    ></el-table-column>
                </el-table>
            </el-dialog>
        </el-dialog>
        <el-dialog
            title="班组上报"
            :visible.sync="addVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="bpPublcDialog"
        >
            <el-form
                :model="addForm"
                label-width="120px"
                :rules="addFormRules"
                ref="addEditForm"
                label-position="right"
            >
                <el-form-item label="班组名称：" class="marginb" prop="name">
                    <el-input
                        placeholder="请输入班组名称"
                        readonly
                        v-model="addForm.name"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="班组长姓名："
                    class="marginb"
                    prop="bzperson"
                >
                    <el-input
                        placeholder="请输入班组长姓名"
                        readonly
                        v-model="addForm.bzperson"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="班组长身份证号码："
                    class="marginb"
                    prop="useridcode"
                >
                    <el-input
                        placeholder="身份证号码不能为空,请去人员管理补充信息"
                        readonly
                        :disabled="true"
                        v-model="addForm.useridcode"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="班组长电话："
                    class="marginb"
                    prop="bzphone"
                >
                    <el-input
                        placeholder="请输入班组长电话"
                        v-model="addForm.bzphone"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="班组所属企业名称："
                    class="marginb"
                    prop="bzname"
                >
                    <el-input
                        placeholder="请输入班组所属企业名称"
                        v-model="addForm.bzname"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="班组所属企业信用代码："
                    class="marginb"
                    prop="bzcode"
                >
                    <el-input
                        placeholder="请输入班组所属企业信用代码"
                        v-model="addForm.bzcode"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="班组工种："
                    class="marginb"
                    prop="workType"
                >
                    <el-select
                        v-model="addForm.workType"
                        placeholder="请选择班组工种"
                    >
                        <el-option
                            v-for="item in workTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="进场日期：" prop="entryDate">
                    <el-date-picker
                        v-model="addForm.entryDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item
                    label="是否有劳务合同："
                    class="marginb"
                    prop="hasContract"
                >
                    <el-select
                        v-model="addForm.hasContract"
                        placeholder="请选择"
                    >
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="是否购买工伤保险："
                    class="marginb"
                    prop="hasWorkInsurance"
                >
                    <el-select
                        v-model="addForm.hasWorkInsurance"
                        placeholder="请选择"
                    >
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="是否购买意外伤害保险："
                    class="marginb"
                    prop="hasAccidentInsurance"
                >
                    <el-select
                        v-model="addForm.hasAccidentInsurance"
                        placeholder="请选择"
                    >
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="是否参加城乡居民医疗保险："
                    class="marginb"
                    prop="miurInsurance"
                >
                    <el-select
                        v-model="addForm.miurInsurance"
                        placeholder="请选择"
                    >
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="是否参加城乡居民养老保险："
                    class="marginb"
                    prop="endowmentInsurance"
                >
                    <el-select
                        v-model="addForm.endowmentInsurance"
                        placeholder="请选择"
                    >
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="工资核定方式："
                    class="marginb"
                    prop="wageApprovedWay"
                >
                    <el-select
                        v-model="addForm.wageApprovedWay"
                        placeholder="请选择"
                    >
                        <el-option label="天" value="天"></el-option>
                        <el-option label="小时" value="小时"></el-option>
                        <el-option label="月" value="月"></el-option>
                        <el-option label="件" value="件"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="工资核定标准（元）："
                    class="marginb"
                    prop="wageCriterion"
                >
                    <el-input
                        v-model="addForm.wageCriterion"
                        placeholder="请输入金额"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="责任人："
                    class="marginb"
                    prop="principalName"
                >
                    <el-input
                        v-model="addForm.principalName"
                        placeholder="请输入责任人"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="责任人电话："
                    class="marginb"
                    prop="principalPhone"
                >
                    <el-input
                        v-model="addForm.principalPhone"
                        maxlength="11"
                        placeholder="请输入责任人电话"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="责任人身份证号："
                    class="marginb"
                    prop="principalIdCard"
                >
                    <el-input
                        v-model="addForm.principalIdCard"
                        maxlength="18"
                        placeholder="请输入责任人身份证号"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    style="margin-top: 60px; width: 100%"
                    class="bpBtn"
                >
                    <el-button
                        type="primary"
                        :loading="loaded"
                        @click="save('addEditForm')"
                        >上报</el-button
                    >
                    <el-button type="primary" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
   
<script>
import axios from 'axios';
export default {
    data() {
        var validatebzphone = (rule, value, callback) => {
            const reg = /^1\d{10}$/;
            if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        };
        var validateMoney = (rule, value, callback) => {
            const reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{2})))$/;
            if (!reg.test(value)) {
                callback(new Error('请输入正确的格式，最多保留小数点后两位'));
            } else {
                callback();
            }
        };
        return {
            addVisible: false,
            xmid: this.$route.query.xmid,
            teamList: [],
            cid: this.$store.state.userData.cid,
            corpList: [],
            bzid: '',
            cjid: '',
            addForm: {
                bzid: '',
                cjid: '',
                newuid: this.$store.state.userData.uid,
                name: '',
                bzphone: '',
                bzperson: '',
                useridcode: '',
                xmid: this.$route.query.xmid,
            },
            loaded: false,
            addFormRules: {
                bzphone: [
                    {
                        required: true,
                        validator: validatebzphone,
                        trigger: 'blur',
                    },
                ],
                name: [
                    {
                        required: true,
                        message: '班组名称不能为空',
                    },
                ],
                bzperson: [
                    {
                        required: true,
                        message: '班组长姓名不能为空',
                    },
                ],
                useridcode: [
                    {
                        required: true,
                        message: '身份证号不能为空，请去人员管理补充信息',
                    },
                ],
                bzname: [
                    {
                        required: true,
                        message: '班组所属企业名称不能为空',
                        trigger: 'blur',
                    },
                ],
                bzcode: [
                    {
                        required: true,
                        message: '班组所属企业信用代码不能为空',
                        trigger: 'blur',
                    },
                ],
                workType: [
                    {
                        required: true,
                        message: '班组工种不能为空',
                        trigger: ['blur', 'change'],
                    },
                ],
                entryDate: [
                    {
                        required: true,
                        message: '日期不能为空',
                        trigger: ['blur', 'change'],
                    },
                ],
                hasContract: [
                    {
                        required: true,
                        message: '请选择',
                        trigger: ['blur', 'change'],
                    },
                ],
                hasWorkInsurance: [
                    {
                        required: true,
                        message: '请选择',
                        trigger: ['blur', 'change'],
                    },
                ],
                hasAccidentInsurance: [
                    {
                        required: true,
                        message: '请选择',
                        trigger: ['blur', 'change'],
                    },
                ],
                miurInsurance: [
                    {
                        required: true,
                        message: '请选择',
                        trigger: ['blur', 'change'],
                    },
                ],
                endowmentInsurance: [
                    {
                        required: true,
                        message: '请选择',
                        trigger: ['blur', 'change'],
                    },
                ],
                wageApprovedWay: [
                    {
                        required: true,
                        message: '请选择',
                        trigger: ['blur', 'change'],
                    },
                ],
                wageCriterion: [
                    {
                        required: true,
                        validator: validateMoney,
                        trigger: 'blur',
                    },
                ],
                principalName: [
                    {
                        required: true,
                        message: '请输入责任人',
                        trigger: 'blur',
                    },
                ],
                principalPhone: [
                    {
                        required: true,
                        validator: validatebzphone,
                        trigger: 'blur',
                    },
                ],
                principalIdCard: [
                    {
                        required: true,
                        message: '请输入责任人身份证号',
                        trigger: 'blur',
                    },
                ],
            },
            watchBzId: '',
            watchDetailVisible: false,
            watchInnerVisible: false,
            watchDetailList: [],
            watchSingelList: [],
            searchTime: '',
            workTypeList: [
                { name: '砌筑工', id: '砌筑工' },
                { name: '钢筋工', id: '钢筋工' },
                { name: '架子工', id: '架子工' },
                { name: '混凝土工', id: '混凝土工' },
                { name: '模板工', id: '模板工' },
                { name: '机械设备安装工', id: '机械设备安装工' },
                { name: '通风工', id: '通风工' },
                { name: '安装起重工', id: '安装起重工' },
                { name: '安装钳工', id: '安装钳工' },
                { name: '电气设备安装调试工', id: '电气设备安装调试工' },
                { name: '管道工', id: '管道工' },
                { name: '变电安装工', id: '变电安装工' },
                { name: '建筑电工', id: '建筑电工' },
                { name: '司泵工', id: '司泵工' },
                {
                    name: '挖掘铲运和桩工机械司机',
                    id: '挖掘铲运和桩工机械司机',
                },
                { name: '桩机操作工', id: '桩机操作工' },
                { name: '起重信号工', id: '起重信号工' },
                {
                    name: '建筑起重机械安装拆卸工',
                    id: '建筑起重机械安装拆卸工',
                },
                { name: '装饰装修工', id: '装饰装修工' },
                { name: '室内成套设施安装工', id: '室内成套设施安装工' },
                { name: '建筑门窗幕墙安装工', id: '建筑门窗幕墙安装工' },
                { name: '幕墙制作工', id: '幕墙制作工' },
                { name: '防水工', id: '防水工' },
                { name: '木工', id: '木工' },
                { name: '石工', id: '石工' },
                { name: '电焊工', id: '电焊工' },
                { name: '爆破工', id: '爆破工' },
                { name: '除尘工', id: '除尘工' },
                { name: '测量放线工', id: '测量放线工' },
                { name: '线路架设工', id: '线路架设工' },
                { name: '古建筑传统石工', id: '古建筑传统石工' },
                { name: '古建筑传统瓦工', id: '古建筑传统瓦工' },
                { name: '古建筑传统彩画工', id: '古建筑传统彩画工' },
                { name: '古建筑传统木工', id: '古建筑传统木工' },
                { name: '古建筑传统油工', id: '古建筑传统油工' },
                { name: '金属工', id: '金属工' },
                { name: '管理人员', id: '管理人员' },
                { name: '杂工', id: '杂工' },
                { name: '铁路自轮运转设备工', id: '铁路自轮运转设备工' },
                { name: '铁路线桥工', id: '铁路线桥工' },
                { name: '筑路工', id: '筑路工' },
                { name: '公路养护工', id: '公路养护工' },
                { name: '桥隧工', id: '桥隧工' },
                { name: '凿岩工', id: '凿岩工' },
                { name: '水运工程施工工', id: '水运工程施工工' },
                {
                    name: '水工建构筑物维护检修工',
                    id: '水工建构筑物维护检修工',
                },
                { name: '电力电缆安装运维工', id: '电力电缆安装运维工' },
                { name: '送配电线路工', id: '送配电线路工' },
                {
                    name: '牵引电力线路安装维护工',
                    id: '牵引电力线路安装维护工',
                },
                { name: '舟桥工', id: '舟桥工' },
                { name: '电梯安装维修工', id: '电梯安装维修工' },
                {
                    name: '制冷空调系统安装维修工',
                    id: '制冷空调系统安装维修工',
                },
                { name: '锅炉设备安装工', id: '锅炉设备安装工' },
                { name: '发电设备安装工', id: '发电设备安装工' },
                { name: '轨道交通通信工', id: '轨道交通通信工' },
                { name: '轨道交通信号工', id: '轨道交通信号工' },
                { name: '照明工程施工员 ', id: '照明工程施工员 ' },
                { name: '其它 ', id: '其它 ' },
            ],
        };
    },

    methods: {
        watchSingelTitle(row) {
            this.watchInnerVisible = true;
            axios
                .post('/laowu_yun/kaoqingerenxiangqing', {
                    id: row.userid,
                    time: row.yuefen,
                    newuid: this.$store.state.userData.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.watchSingelList = res.data.list;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning',
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        timeChange(val) {
            this.searchTime = val;
            this.getDetailList();
        },
        watchDetail(row) {
            this.watchBzId = row.bzid;
            this.getDetailList();
            this.watchDetailVisible = true;
        },
        getDetailList() {
            axios
                .post('/laowu_yun/kaoqinshangbaolist', {
                    id: this.watchBzId,
                    time: this.searchTime,
                    newuid: this.$store.state.userData.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.watchDetailList = res.data.list;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning',
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        goback() {
            this.$router.push({
                name: 'bpguizhou',
                query: { xmid: this.xmid },
            });
        },
        handleChakan(index, row) {
            this.$router.push({
                path: '/bpchakan',
                query: {
                    bzid: row.bzid,
                    name: row.name,
                    xmid: this.xmid,
                    address: this.$route.query.address,
                },
            });
        },
        NoChakan() {
            this.$message({
                message: '请先上报班组',
                center: true,
                duration: 2000,
                type: 'warning',
            });
        },
        handlebd(row) {
            this.bzid = row.bzid;
            this.cjid = row.cjid;

            this.getMsg();
            this.addVisible = true;
        },
        cancel() {
            this.addVisible = false;
            this.loaded = false;
        },
        save(formName) {
            this.loaded = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/newbao/guizhoubaocunbzcontent', this.addForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.loaded = false;
                                this.addVisible = false;
                                this.getList();
                                this.$message({
                                    message: '上报成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success',
                                });
                            } else {
                                this.loaded = false;
                                this.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning',
                                });
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
        getList() {
            axios
                .post('/baopan/huquteamcontentlist', {
                    corp_id: this.cid,
                    xmid: this.$route.query.xmid,
                    newuid: this.$store.state.userData.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.teamList = res.data.content;
                    } else if (res.data.status == 2) {
                        this.$alert('错误');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        getMsg() {
            axios
                .post('/newbao/guizhoubzlist', {
                    corp_id: this.cid,
                    bzid: this.bzid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.addForm = res.data.list;
                        this.addForm.bzid = this.bzid;
                        this.addForm.corp_id = this.cid;
                    } else if (res.data.status == 2) {
                        this.$alert('参数错误！');
                    } else if (res.data.status == 3) {
                        this.$alert('无权限！');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.getList();
        // this.getCorpList();
    },
    computed: {
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.searchTime;
                    if (endDateVal) {
                        return time.getTime() > Date.now(); // 大于当前时间禁止选择
                    }
                },
            };
        },
    },
    created() {
        this.searchTime =
            new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1 < 10
                ? '0' + (new Date().getMonth() + 1)
                : new Date().getMonth() + 1);
    },
};
</script>
<style lang="less">
body {
    .corpkaoqin {
        .el-dialog {
            width: 80%;
        }
    }
    .bpbanzukaoqinDialog {
        .el-dialog {
            width: 600px;
        }
    }
    .banzubangdingDialog {
        .el-select {
            width: 100%;
        }
        .bpBtn {
            .el-form-item__content {
                margin-left: 0 !important;
                text-align: center;
            }
        }
    }
}
.cell {
    text-align: center;
}
#bpguizhoubz {
    padding: 10px;
    .marginb {
        margin-bottom: 15px;
    }
    .el-dialog {
        width: 30%;
        .el-select {
            width: 100%;
        }
        .bpBtn {
            .el-form-item__content {
                margin-left: 0 !important;
                text-align: center;
            }
        }
    }
}
</style>