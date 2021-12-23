<template>
  <div class="box">
    <!-- <div class="zhengshu">
      <el-button
        type="primary"
        style="margin-bottom: 20px"
        @click="addFormVisible = true"
      >上传证书</el-button>
      <el-button
        type="primary"
        style="margin-bottom: 20px; float: right"
        @click="warningSetingVisible = true"
      >预警设置</el-button>
    </div> -->
    <el-table :data="peopleList.list" border style="width: 100%" size="mini">
        <el-table-column
            prop="name"
            label="证书名称"
        ></el-table-column>
        <el-table-column
            prop="zhscord"
            label="证书编号"
        ></el-table-column>
        <el-table-column
          prop="zhsstart"
          label="到期日期"
        >
          <template slot-scope="scope">
            <span v-bind:class="{ red: timeExpire(scope.row.zhsstart) }">{{ scope.row.zhsstart }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="zhsdanwei"
            label="证书签发单位"
        ></el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="180"
        >
            <template slot-scope="scope">
                <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                >
                <el-button
                    @click="edit(scope.row)"
                    type="text"
                    size="small"
                    >修改</el-button
                >
                <el-button
                    @click="deleteClick(scope.row)"
                    type="text"
                    size="small"
                    style="color: red"
                    >删除</el-button
                >
            </template>
        </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="peopleList.total"
        :page-size="peopleList.num"
        @current-change="currentChange">
      </el-pagination>
    </div>
    <el-dialog
            title="上传证书"
            :visible.sync="addFormVisible"
            v-if="addFormVisible"
            :before-close="handleClose"
            :append-to-body="true"
            class="chakanDialog"
        >
            <el-form
                :model="addForm"
                label-width="130px"
                :rules="addFormRules"
                ref="addEditForm"
                label-position="right"
            >
                <el-form-item label="技能证书：" prop="name">
                    <el-input
                        v-model="addForm.name"
                        placeholder="请输入技能证书名称"
                        :maxlength="20"
                    ></el-input>
                </el-form-item>
                <el-form-item label="证书编号：" prop="zhscord">
                    <el-input
                        v-model="addForm.zhscord"
                        :maxlength="20"
                        placeholder="请输入证书编号"
                    ></el-input>
                </el-form-item>
                <el-form-item label="证书发放单位：" prop="zhsdanwei">
                    <el-input
                        v-model="addForm.zhsdanwei"
                        :maxlength="20"
                        placeholder="请输入证书发放单位"
                    ></el-input>
                </el-form-item>
                <el-form-item label="到期日期：" prop="zhsstart">
                    <el-date-picker
                        v-model="addForm.zhsstart"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item prop="zhsurl" ref="uploadpic" label="证书文件：">
                    <!-- <upload
                        v-on:listenToChildEvent="show"
                        :upImgList="upImgList"
                        :licenceImg="licenceImg"
                        :isShow="isShow"
                    ></upload>-->
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
                        :loading="loaded"
                        @click="jsave('addEditForm')"
                        >保存</el-button
                    >
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
          title="预警设置"
          :visible.sync="warningSetingVisible"
          :close-on-click-modal="false"
          :append-to-body="true"
          width="600px"
        >
          <el-form
            :model="warningSetingForm"
            ref="warningSetingForm"
            :rules="warningSetingFormRules"
            label-width="120px"
            label-position="right"
          >
            <el-form-item label="天数" prop="tian">
              <el-input-number v-model="warningSetingForm.tian" size="mini" max="90" />
            </el-form-item>
            <el-form-item label="提醒人员" prop="users">
              <select-leaders :max="false" :data="leaderList" @handelLeaders="handelLeaders" />
            </el-form-item>
          </el-form>
          <div style="display: flex;flex-direction: row;justify-content: center;">
            <div>
              <el-button :loading="loaded" @click="waringSetingSubmit" type="primary" size="mini">确定</el-button>
            </div>
          </div>
        </el-dialog>
        <el-dialog
            title="查看证书"
            :visible.sync="wFormVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="dialogadd"
        >
            <!-- <img
                style="width:100%;margin-bottom:10px;"
                v-for="(item,index) in picList"
                :src="item"
                :key="index"
                alt
            />-->
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
            title="修改证书"
            :visible.sync="certificateVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="dialogadd"
        >
            <el-form
              :model="certificateForm"
              ref="certificateForm"
              :rules="certificateFormRules"
              label-position="right"
              label-width="140px"
            >
              <el-form-item label="证书名称：" prop="name">
                <el-input v-model="certificateForm.name" size="mini" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="证书编号：" prop="zhscord">
                <el-input v-model="certificateForm.zhscord" size="mini" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="证书到期时间：" prop="zhsstart">
                <el-date-picker
                  v-model="certificateForm.zhsstart"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  size="mini"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="证书单位：" prop="zhsdanwei">
                <el-input v-model="certificateForm.zhsdanwei" size="mini" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="证书图片：" prop="zhsurl">
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
                <pdfupload-two
                    v-if="FileType"
                    ref="mychild"
                    :upImgList="certificatepdfupImgList"
                    :licenceImg="certificatepdflicenceImg"
                    :isShow="certificatepdfisShow"
                    @listenToChildEvent="certificatepdfshow"
                ></pdfupload-two>
                <upload-two
                  v-else
                  :upImgList="certificateImgList"
                  :licenceImg="certificatelicenceImg"
                  :isShow="certificateisShow"
                  @listenToChildEvent="certificateshow"
                ></upload-two>
              </el-form-item>
              <div class="submit">
                <div class="item">
                  <el-button :loading="loaded" type="primary" @click="certificateSubmit" >提交</el-button>
                </div>
              </div>
            </el-form>
        </el-dialog>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import upload from '@/components/public/upload.vue';
import UploadTwo from '@/components/public/uploadTwo.vue';
import pdfupload from '@/components/common/pdfUpload.vue';
import pdfuploadTwo from '@/components/common/pdfUploadTwo.vue';
import SelectLeaders from '@/liucomponents/leader';

export default {
  components: { upload, pdfupload, SelectLeaders, UploadTwo, pdfuploadTwo },
  data() {
    return {
      loaded: false,
      peopleList: {
        list: [],
        total: 0,
        num: 0
      },
      isPdf: '',
      wFormVisible: false,
      addFormVisible: false,
      addForm: {
          newuid: this.$store.state.userData.uid,
          corp_id: this.$store.state.userData.cid,
          userid: this.$route.query.userid,
          bzid: this.$route.query.bzid,
          name: '',
          zhscord: '',
          zhsstart: '',
          zhsdanwei: '',
          zhsurl: []
      },
      // 预警设置
      warningSetingVisible: false,
      warningSetingForm: {
        tian: 0,
        users: []
      },
      warningSetingFormRules: {
        tian: [
          { required: true, message: '请输入天数', trigger: 'blur' }
        ],
        users: [
          { required: true, message: '请输入提醒人员', trigger: 'blur' }
        ]
      },
      leaderList: {
        leaderList: []
      },
      // 修改证书
      certificateVisible: false,
      certificateForm: {
        zsid: 0,
        zhsurl: [],
        name: '',
        zhscord: '',
        zhsstart: '',
        zhsdanwei: ''
      },
      certificateImgList: [],
      certificatelicenceImg: [],
      certificateisShow: ['1'],
      certificatepdfupImgList: [],
      certificatepdflicenceImg: [],
      certificatepdfisShow: ['1'],
      certificateFormRules: {
        zhsurl: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 20, message: '长度超出', trigger: 'change' }
        ],
        zhscord: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 30, message: '长度超出', trigger: 'change' }
        ],
        zhsstart: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        zhsdanwei: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 20, message: '长度超出', trigger: 'change' }
        ]
      },
      // 查询参数
      params: {
        current_page: 1,
        corp_id: this.$store.state.userData.cid
      }
    }
  },
  created() {
    this.getPeople();
  },
  methods: {
    // 校验是否到期
    timeExpire(val) {
      if (!val) return false;
      let getDate = new Date();
      let time = getDate.getTime();
      let date = new Date(val);
      let expireTime = date.getTime();

      if (time > expireTime) {
        return true;
      }

      return false;
    },
    handleClick(row) {
        this.isPdf = row.zhsurl[0].substr(row.zhsurl[0].length - 3);
        this.picList = row.zhsurl;
        if (this.isPdf != 'pdf') {
            this.lookimg1(this.picList);
        } else {
            this.wFormVisible = true;
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
    // 修改
    edit(row) {
      console.log(row);
      this.certificateForm = row;
      this.certificatelicenceImg = row.zhsurl;
      // this.certificatepdflicenceImg = [row.zhsurl];
      this.certificateVisible = true;
    },
    // 修改图片
    certificateshow(data) {
      this.certificateForm.zhsurl = data;
    },
    certificatepdfshow(data) {
      this.certificateForm.zhsurl = data;
    },
    // 修改提交
    certificateSubmit() {
      this.loaded = true;
      this.$refs.certificateForm.validate((valid) => {
        if (valid) {
          axios.post(
            '/laowu_yun/userzhengshuupdate',
            this.certificateForm
          )
          .then((res) => {
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
              this.$refs.certificateForm.resetFields();
              this.loaded = false;
              this.certificateVisible = false;
              this.getPeople();
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
      })
    },
    deleteClick(row) {
        axios
            .post('/laowu_yun/userzhengshudelete', {
                zsid: row.zsid,
                newuid: this.$store.state.userData.uid
            })
            .then((res) => {
                if (res.data.status == 1) {
                    this.getPeople();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    //证书列表
    getPeople() {
        axios
            .post(
              '/laowu_yun/corpzhengshulist', 
              this.params
            )
            .then((res) => {
                if (res.data.status == 1) {
                    this.peopleList = res.data.content;
                    this.ddd = true;
                    this.fff = false;
                } else {
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    // 钉钉通讯录
    handelLeaders(val) {
      this.warningSetingForm.users = [];

      val.forEach(item => {
        this.warningSetingForm.users.push(item.emplId);
      });
    },
    waringSetingSubmit() {
      this.loaded = true;
      this.$refs.warningSetingForm.validate((valid) => {
        if (valid) {
          axios.post(
            '/laowu_yun/addzhengshuyujing',
            this.warningSetingForm
          )
          .then((res) => {
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
              this.$refs.warningSetingForm.resetFields();
              this.loaded = false;
              this.warningSetingVisible = false;
              this.leaderList = {
                leaderList: []
              }
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
      })
    },
    // 切换页面
    currentChange(val) {
      this.params.current_page = val;
      this.getPeople();
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  margin-left: 10px;
  background-color: #fff;
  padding: 10px;
  overflow-y: auto;
  .page {
    margin: 10px 0px;
  }
}
</style>
