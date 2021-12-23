<template>
    <div id="bpbang">
        <div style="font-size: 30px">
            请绑定上报平台
            <span style="color: red; font-size: 12px">（因各省市住建平台所要数据不同，可先和我们联系）</span>
        </div>
        <div style="margin: 20px 0">
            <span style="color: red">请正确选择项目上报平台,上报平台一旦选定将无法修改。</span>下面 <span style="color: red">*</span>为必填
        </div>
        <el-form
            :model="ruleForm"
            :rules="formRules"
            ref="ruleFormRef"
            label-width="100px"
            class="bpbang-ruleForm"
        >
            <!-- <el-form-item label="请选择上报区域:" prop="province">
                <el-select v-model="ruleForm.province" placeholder="请选择上报区域">
                    <el-option label="全国" value="全国"></el-option>
                </el-select>
            </el-form-item>-->
            <el-form-item
                label="上报平台:"
                prop="address"
            >
                <el-select
                    v-model="ruleForm.address"
                    placeholder="请选择上报平台"
                    filterable
                >
                    <el-option
                        v-for="item in BDList"
                        :key="item.canshu"
                        :label="item.name"
                        :value="item.canshu"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    :loading="loaded"
                    @click="next('ruleFormRef')"
                >下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        xmid: {
            type: String
        },
        isTable: {
            type: Array
        },
        aname: {
            type: String
        }
    },
    data() {
        var validateadd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入上报平台'));
            } else {
                callback();
            }
        };
        // var validateprovince = (rule, value, callback) => {
        //     if (value === '') {
        //         callback(new Error('请输入上报区域'));
        //     } else {
        //         callback();
        //     }
        // };
        return {
            ruleForm: {
                newuid: this.$store.state.userData.uid,
                xmid: '',
                // province: '',
                address: ''
            },
            formRules: {
                address: [
                    {
                        required: true,
                        validator: validateadd,
                        trigger: ['blur', 'change']
                    }
                ]
            },
            updateDate: '1',
            loaded: false,
            BDList: []
        };
    },
    methods: {
        next(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/baopan/projectbdaddress', that.ruleForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.isShow = [];
                                that.loaded = false;
                                // this.$refs.ruleFormRef.resetFields(); // 清空表单
                                that.getRou(that.ruleForm.address);
                            } else {
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
        getRou(url) {
            const that = this;
            switch (url) {
                case '3':
                    that.$router.push({
                        name: 'bpxq',
                        query: { test: that.updateDate }
                    });
                    break;
                case '2':
                    that.$router.push({
                        name: 'bphenan',
                        query: { test: that.updateDate }
                    });
                    break;
                case '1':
                    that.$router.push({
                        name: 'bpall',
                        query: { test: that.updateDate }
                    });
                    break;
                case '4':
                    that.$router.push({
                        name: 'bplian',
                        query: { test: that.updateDate }
                    });
                    break;
                case '5':
                    that.$router.push({
                        name: 'bphefei',
                        query: { test: that.updateDate }
                    });
                    break;
                case '6':
                    that.$router.push({
                        name: 'bphubei',
                        query: { test: that.updateDate }
                    });
                    break;
                case '7':
                    that.$router.push({
                        name: 'bphunan',
                        query: { test: that.updateDate }
                    });
                    break;
                case '8':
                    that.$router.push({
                        name: 'bpfujian',
                        query: { test: that.updateDate }
                    });
                    break;
                case '10':
                    that.$router.push({
                        name: 'bpbeijing',
                        query: { test: that.updateDate }
                    });
                    break;
                case '11':
                    that.$router.push({
                        name: 'bpningbo',
                        query: { test: that.updateDate }
                    });
                    break;
                case '12':
                    that.$router.push({
                        name: 'bpwuhu',
                        query: { test: that.updateDate }
                    });
                    break;
                case '13':
                    that.$router.push({
                        name: 'bpdalian',
                        query: { test: that.updateDate }
                    });
                    break;
                case '14':
                    that.$router.push({
                        name: 'bphangzhou',
                        query: { test: that.updateDate }
                    });
                    break;
                case '15':
                    that.$router.push({
                        name: 'bpktp',
                        query: { test: that.updateDate }
                    });
                    break;
                case '16':
                    that.$router.push({
                        name: 'bpliaoning',
                        query: { test: that.updateDate }
                    });
                    break;
                case '17':
                    that.$router.push({
                        name: 'bpchuzhou',
                        query: { test: that.updateDate }
                    });
                    break;
                case '18':
                    that.$router.push({
                        name: 'bpsuzhong',
                        query: { test: that.updateDate }
                    });
                    break;
                case '19':
                    that.$router.push({
                        name: 'bpguizhou',
                        query: { test: that.updateDate }
                    });
                    break;
                case '20':
                    that.$router.push({
                        name: 'bpquanzhou',
                        query: { test: that.updateDate }
                    });
                    break;
                case '21':
                    that.$router.push({
                        name: 'bpsichuan',
                        query: { test: that.updateDate }
                    });
                    break;
                case '22':
                    that.$router.push({
                        name: 'bpfoshan',
                        query: { test: that.updateDate }
                    });
                    break;
                case '23':
                    that.$router.push({
                        name: 'bpyichang',
                        query: { test: that.updateDate }
                    });
                    break;
                case '24':
                    that.$router.push({
                        name: 'bphonghe',
                        query: { test: that.updateDate }
                    });
                    break;
                case '25':
                    that.$router.push({
                        name: 'bptianjin',
                        query: { test: that.updateDate }
                    });
                    break;
                case '26':
                    that.$router.push({
                        name: 'bphefeishi',
                        query: { test: that.updateDate }
                    });
                    break;
                case '27':
                    that.$router.push({
                        name: 'bpjiaxing',
                        query: { test: that.updateDate }
                    });
                    break;
                case '28':
                    that.$router.push({
                        name: 'bpjingzhou',
                        query: { test: that.updateDate }
                    });
                    break;                
                case '29':
                  that.$router.push({
                    name: 'bpxishuangbanna',
                    query: { test: that.updateDate }
                  });
                  break;
                case '':
                    that.$router.push({
                        name: 'bplr'
                    });
                    break;
            }
        },
        getBDList() {
            axios
                .post('/laowu_yun/baopanxilalist')
                .then((res) => {
                    if (res.data.status == 1) {
                        this.BDList = res.data.content;
                        // this.currentPage = res.data.list.current_page;
                    } else {
                        this.$alert('错误');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.ruleForm.xmid = this.xmid;
    },
    created() {
        this.getBDList();
    }
};
</script>
<style lang='less'>
    #bpbang {
        padding: 10px;
        .bpbang-ruleForm {
            .el-select {
                width: 30%;
            }
            .el-form-item__label {
                width: 150px !important;
                font-size: 16px;
                background-color: #fbfbfb;
                border: 1px solid #e6e6e6;
            }
        }
    }
</style>
