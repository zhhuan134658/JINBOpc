<template>
    <div id="money_send">
        <div class="msContent">
            <div class="mscList">
                <div class="left">发工资条</div>
                <div class="middle">
                    <div>
                        <h4>{{ msData.fasong }}/{{ msData.zong }}</h4>
                        <p>已发送</p>
                    </div>
                    <div>
                        <h4>{{ msData.chakan }}</h4>
                        <p>已查看</p>
                    </div>
                    <div>
                        <h4>{{ msData.queren }}</h4>
                        <p>已确认</p>
                    </div>
                </div>
                <el-button class="right" plain @click="msNext"
                    >前往发送</el-button
                >
            </div>
            <!-- <div class="mscList">
                <div class="left">银行转账报表</div>
                <div class="rright">
                    <p @click="deriveNext">去设置</p>
                    <el-button class="right" plain @click="moneyGo"
                        >导出</el-button
                    >
                </div>
            </div> -->
        </div>
        <el-dialog
            :rules="msdRules"
            title="导出模板"
            :visible.sync="msdVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="msdeditdialog"
        >
            <el-form
                :model="editmsForm"
                label-width="80px"
                :rules="editRules"
                ref="editnMewForm"
                label-position="right"
            >
                <el-form-item label="模板:" prop="id" style="width: 100%">
                    <el-select v-model="editmsForm.id">
                        <el-option
                            v-for="(item, index) in msdList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        :loading="loaded"
                        @click="edit('editnMewForm')"
                        >确认</el-button
                    >
                    <el-button @click="editCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
export default {
    name: 'money_send',
    data() {
        return {
            cid: this.$store.state.userData.cid,
            msBzid: this.$store.state.userData.salaryBzid,
            msBzTime: this.$store.state.userData.salaryMonth,
            msData: {},
            msatus: '',
            loaded: false,
            msdList: [],
            msdVisible: false,
            editRules: {
                id: [
                    {
                        required: true,
                        message: '请选择模板',
                        trigger: ['blur', 'change'],
                    },
                ],
            },
            editmsForm: {
                id: '',
            },
        };
    },
    methods: {
        getTMHList(val) {
            this.tableLoading = true;
            axios
                .post('/laowu_yun/xinzitiaoliebiao', {
                    yuefen: this.msBzTime,
                    newuid: this.$store.state.userData.uid,
                    corp_id: this.cid,
                    bzid: this.msBzid,
                    name: '',
                    current_page: val,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.msData = res.data.shuliang;
                        this.msatus = res.data.daochu;
                        this.msdList = res.data.daochulist;
                    } else {
                        this.$alert('错误');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        msNext() {
            this.$router.push({
                path: '/money_send_right',
            });
        },
        deriveNext() {
            this.$router.push({
                path: '/money_derive',
            });
        },
        moneyGo() {
            if (this.msatus == '1') {
                this.msdVisible = true;
            } else if (this.msatus == '2') {
                this.$alert('请先去设置模板');
            }
        },
        edit(formName) {
            const that = this;
            let host = window.location.host; //主机
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    that.msdVisible = false;
                    that.loaded = false;
                    let newUrl =
                        'https://' +
                        host +
                        '/laowu_yun/gongzixiazai?mbid=' +
                        that.editmsForm.id +
                        '&id=' +
                        that.msBzid +
                        '&corp_id=' +
                        that.cid +
                        '&yuefen=' +
                        that.msBzTime;
                    dd.ready(function () {
                        dd.biz.util.openLink({
                            url: newUrl,
                            onSuccess: function (result) {
                                that.$message({
                                    message: '导出成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success',
                                });
                            },
                            onFail: function (err) {
                                console.log('11++' + err);
                            },
                        });
                    });
                } else {
                    that.loaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        editCancel() {
            this.msdVisible = false;
        },
        checkding() {
            const that = this;
            axios
                .post('/ding/shoujitiongxun', {
                    corp_id: that.$store.state.userData.cid,
                    pc: '1',
                    newuid: this.$store.state.userData.uid,
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
                                'biz.util.openLink',
                            ], // 必填，需要使用的jsapi列表，注意：不要带dd。
                        });
                    }
                });
        },
    },

    mounted() {
        this.getTMHList(1);
    },
    activated() {
        this.getTMHList(1);
        this.checkding();
    },
};
</script>
<style lang="less">
body {
    .msdeditdialog {
        .el-dialog {
            width: 500px;
        }
    }
}
#money_send {
    .msContent {
        width: 72%;
        min-width: 740px;
        margin: 0 auto;
        margin-top: 60px;
        display: flex;
        justify-content: center;
        .mscList {
            width: 45%;
            padding: 20px;
            border-radius: 4px;
            border: 1px solid #dddddd;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .middle {
                display: flex;
                text-align: center;
                > div {
                    padding: 0 10px;
                    h4 {
                        font-size: 20px;
                        line-height: 28px;
                        margin-bottom: 10px;
                        font-weight: 600;
                    }
                    p {
                        line-height: 20px;
                    }
                }
            }
            .rright {
                display: flex;
                p {
                    line-height: 40px;
                    margin-right: 10px;
                    color: #4090ef;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>