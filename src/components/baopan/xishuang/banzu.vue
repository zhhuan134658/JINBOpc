<template>
    <div id="bpbz">
        <!-- 福建班组 -->

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
            <el-table-column label="工资上报">
              <template slot-scope="scope">
                <el-button
                  @click="handelSalary(scope.row)"
                  type="primary"
                  plain
                  size="small"
                  >工资上报</el-button
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
                        <el-button
                            type="primary"
                            plain
                            size="small"
                            >工资单查看</el-button
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
            title="绑定参建单位"
            :visible.sync="addVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="banzubangdingDialog bpPublcDialog"
        >
            <el-form
                :model="addForm"
                label-width="200px"
                :rules="addFormRules"
                ref="addEditForm"
                label-position="right"
            >
                <el-form-item label="班组单位名称：" prop="bzname">
                    <el-input
                        placeholder="请输入"
                        readonly
                        v-model="addForm.bzname"
                    ></el-input>
                </el-form-item>
                <el-form-item label="班组名称：" class="marginb" prop="name">
                    <el-input
                        placeholder="请输入"
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
                        placeholder="请输入"
                        readonly
                        v-model="addForm.bzperson"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="班组长身份证号："
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
                <!-- <el-form-item
                    label="身份证住址："
                    class="marginb"
                    prop="userads"
                >
                    <el-input
                        placeholder="身份证住址不能为空,请去人员管理补充信息"
                        readonly
                        :disabled="true"
                        v-model="addForm.userads"
                    ></el-input>
                </el-form-item> -->
                <el-form-item
                    label="班组长联系电话："
                    class="marginb"
                    prop="bzphone"
                >
                    <el-input
                        placeholder="请输入"
                        v-model="addForm.bzphone"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="班组所在企业信用代码："
                    class="marginb"
                    prop="bzcode"
                >
                    <el-input
                        placeholder="请输入"
                        v-model="addForm.bzcode"
                    ></el-input>
                </el-form-item>
                <!-- <el-form-item label="进场时间：" class="marginb" prop="created">
                    <el-date-picker
                        v-model="addForm.created"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-form-item>-->
                <el-form-item label="班组参建单位类型" class="marginb" prop="corpType">
                  <el-select v-model="addForm.corpType" placeholder="请选择">
                      <el-option
                          v-for="item in corpOptions"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value"
                      ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否是管理组" class="marginb" prop="manageFlag">
                  <el-radio v-model="addForm.manageFlag" label="1">是</el-radio>
                  <el-radio v-model="addForm.manageFlag" label="2">否</el-radio>
                </el-form-item>
                <el-form-item
                    style="margin-top: 60px; width: 100%"
                    class="bpBtn"
                >
                    <el-button
                        type="primary"
                        :loading="loaded"
                        @click="save('addEditForm')"
                        >绑定</el-button
                    >
                    <el-button type="primary" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            title="工资上报"
            :visible.sync="salaryDetailVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="bpPublcDialog guizhoushangbao"
        >
            <div>
                <el-form
                    :model="salaryForm"
                    :rules="salaryFormRules"
                    ref="salaryForm"
                    label-width="150px"
                >
                  <el-form-item label="工资年份" prop="payYear">
                    <el-date-picker
                      v-model="salaryForm.payYear"
                      type="year"
                      placeholder="选择年">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="工资月份" prop="paymonth">
                    <el-date-picker
                      v-model="salaryForm.paymonth"
                      type="month"
                      format="MM"
                      placeholder="选择月">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="工资发放日" prop="sendDate">
                    <el-date-picker
                      v-model="salaryForm.sendDate"
                      type="date"
                      format="dd"
                      placeholder="选择日">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="发放人数" prop="peopleNumber">
                    <el-input v-model="salaryForm.peopleNumber" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item label="支付总金额" prop="paySum">
                    <el-input v-model="salaryForm.paySum" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item style="margin-top: 20px">
                    <el-button
                      type="primary"
                      :loading="loaded"
                      @click="salarySubmit"
                      >立即上报</el-button
                    >
                    <el-button @click="salaryCancel">返回</el-button>
                  </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
   
<script>
import axios from 'axios';
import corpConfig from './config/corpOptions';
export default {
    data() {
      const corpOptions = corpConfig;
        var validatebzphone = (rule, value, callback) => {
            const reg = /^1\d{10}$/;
            if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        };

        const validateNumerice = (rule, value, callback) => {
            const reg = /^[0-9]+$/;
            if (!reg.test(value)) {
                callback(new Error('格式错误'));
            } else {
                callback();
            }
        };

        const validateDecimal = (rule, value, callback) => {
          const reg = /^(0\.(?!0+$)\d{1,4}|^[1-9][0-9]{0,11}(\.\d{0,2})?)$/;
          if(value == "0") {
            callback();
          }
          if (value == "0.00") {
            callback();
          }
          if (!reg.test(value)) {
            callback(new Error('格式错误'));
          } else {
            callback();
          }
      }
        return {
          corpOptions: corpOptions,
            addVisible: false,
            xmid: this.$route.query.xmid,
            teamList: [],
            cid: this.$store.state.userData.cid,
            corpList: [],
            bzid: '',
            cjid: '',
            addForm: {
                bzid: '',
                xmid: this.$route.query.xmid,
                name: '', //        班组名称
                bzname: '', //         班组单位名称
                bzphone: '', //        班组长联系电话
                bzcode: '', //         班组所在企业信用代码
                bzperson: '', //       班组长姓名
                useridcode: '', //       班组长身份证号
                corpType: '', //        班组参建单位类型
                manageFlag: '1', //        是否是管理组:参考是 否字典表.同个类型同个企业,只有一个管理组
            },
            loaded: false,
            addFormRules: {
              corpType: [
                { required: true, message: '不能为空', trigger: 'bulr' }
              ],
              manageFlag: [
                { required: true, message: '不能为空', trigger: 'bulr' }
              ],
                // created: [
                //     {
                //         required: true,
                //         message: '日期不能为空',
                //         trigger: ['blur', 'change']
                //     }
                // ],
                bzphone: [
                    {
                        required: true,
                        validator: validatebzphone,
                        trigger: 'blur',
                    },
                ],
                bzcode: [
                    {
                        required: true,
                        message: '企业信用代码不能为空',
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
                // userads: [
                //     {
                //         required: true,
                //         message: '身份证住址不能为空，请去人员管理补充信息',
                //     },
                // ],
                bzname: [
                    {
                        required: true,
                        message: '参建单位不能为空',
                    },
                ]
            },
            watchBzId: '',
            watchDetailVisible: false,
            watchInnerVisible: false,
            watchDetailList: [],
            watchSingelList: [],
            searchTime: '',
            /**
             * 工资上报
             */
            salaryDetailVisible: false,
            salaryForm: {
              corp_id: this.$store.state.userData.cid, //企业ID
              bzid: '', //  班组ID
              sendDate: '', //     工资发放日
              payYear: '', // 工资年份
              paymonth: '', //   工资月份
              peopleNumber: '', //  发放人数
              paySum: '', //   支付总金额
            },
            salaryFormRules: {
              sendDate: [
                { required: true, message: '不能为空', trigger: 'blur' }
              ], //     工资发放日
              payYear: [
                { required: true, message: '不能为空', trigger: 'blur' }
              ], // 工资年份
              paymonth: [
                { required: true, message: '不能为空', trigger: 'blur' }
              ], //   工资月份
              peopleNumber: [
                { required: true, message: '不能为空', trigger: 'blur' },
                { trigger: 'blur', validator: validateNumerice }
              ], //  发放人数
              paySum: [
                { required: true, message: '不能为空', triggerblur: 'blur' },
                { trigger: 'blur', validator: validateDecimal }
              ], //   支付总金额
            }
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
          this.$router.go(-1);
        },
        handleChakan(index, row) {
            this.$store.commit('setshangbaoXmid', this.xmid);
            this.$store.commit('setshangbaoBzid', row.bzid);

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
        handlebd(row) {
            this.bzid = row.bzid;
            this.cjid = row.cjid;
            this.addForm.bzid = row.bzid;
            this.getMsg();
            this.addVisible = true;
        },
        cancel() {
            this.addVisible = false;
        },
        save(formName) {
            this.loaded = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/baopan/sbxsbnteamcontent', this.addForm)
                        .then((res) => {
                          console.log(res);
                            if (res.data.status == 1) {
                                this.loaded = false;
                                this.addVisible = false;
                                that.$refs[formName].resetFields();
                                this.getList();
                                this.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'success',
                                });
                            }else if (res.data.status == 2) {
                              this.loaded = false;
                              this.$message({
                                message: res.data.msg,
                                center: true,
                                duration: 2000,
                                type: 'warning',
                              });
                            } else {
                                this.loaded = false;
                                // that.$refs[formName].resetFields();
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
                .post('/laowu_yun/projectteamcontent', {
                    corp_id: this.cid,
                    bzid: this.bzid,
                    newuid: this.$store.state.userData.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.addForm = res.data.content;
                        delete this.addForm.users;
                        this.addForm.bzid = this.bzid;
                        this.addForm.cjid = this.cjid;
                    } else if (res.data.status == 2) {
                        alert('参数错误！');
                    } else if (res.data.status == 3) {
                        alert('无权限！');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        NoChakan() {
            this.$message({
                message: '请先绑定参建单位',
                center: true,
                duration: 2000,
                type: 'warning',
            });
        },
        /**
         * 工资上报
         */
        handelSalary(row) {
          this.salaryForm.bzid = row.bzid;
          this.salaryDetailVisible = true;
        },
        salaryCancel() {
          this.salaryDetailVisible = false;
        },
        salarySubmit() {
          const that = this;
          const formName = 'salaryForm';
          that.loaded = true;
          that.$refs[formName].validate(valid => {
            if (valid) {
                axios.post(
                  '/baopan/sbxsbngzdContent',
                  that.salaryForm
                ).then(res => {
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
              console.log('error submit!!!');
              return false;
            }
            });
        }
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
    mounted() {
        this.getList();
        // this.getCorpList();
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
#bpbz {
    padding: 10px;
    .marginb {
        margin-bottom: 15px;
    }
    .el-dialog {
        width: 30%;
    }
}
</style>