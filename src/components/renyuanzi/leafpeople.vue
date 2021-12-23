<template>
    <div id="leafPeople">
        <div id="renyuan">
            <div class="cheard">
                <span style="font-size: 14px;color:#606266; line-height: 40px">人员资料</span>
                <el-button type="primary" style="float:right" @click="back">返回</el-button>
            </div>
            <el-divider></el-divider>

            <div class="cry">
                <el-tabs :tab-position="tabPosition" @tab-click="cryTabClick">
                    <el-tab-pane label="基本信息">
                        <el-row class="tanxing">
                            <el-col :span="16">
                                <div class="grid-content bg-purple">
                                    <div class="jiben">
                                        <H3>基本信息</H3>
                                    </div>
                                    <el-row class="jbxinxi">
                                        <el-col :span="4">
                                            <div class="grid-content bg-purple">
                                                <div class="el-item el-item1">姓名</div>
                                                <div class="el-item el-item1">出生日期</div>
                                                <div class="el-item el-item1">年龄</div>
                                                <div class="el-item el-item1">签发单位</div>
                                                <div class="el-item el-item1">身份证住址</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="6">
                                            <div class="grid-content bg-purple-light">
                                                <div
                                                    class="el-item"
                                                    style="text-align:left"
                                                >{{this.editForm.name}}</div>
                                                <div
                                                    class="el-item"
                                                    style="text-align:left"
                                                >{{this.editForm.birthday}}</div>
                                                <div
                                                    class="el-item"
                                                    style="text-align:left"
                                                >{{this.editForm.age}}</div>
                                                <div
                                                    class="el-item"
                                                    style="text-align:left"
                                                >{{this.editForm.issuing}}</div>
                                                <div
                                                    class="el-item"
                                                    style="width:333% ;text-align:left"
                                                >{{this.editForm.userads}}</div>
                                            </div>
                                        </el-col>

                                        <el-col :span="4">
                                            <div class="grid-content bg-purple">
                                                <div class="el-item el-item1">性别</div>
                                                <div class="el-item el-item1">汉族</div>
                                                <div class="el-item el-item1">身份证号</div>
                                                <div class="el-item el-item1">有效期限</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="6">
                                            <div class="grid-content bg-purple-light">
                                                <div
                                                    class="el-item"
                                                    style="text-align:left"
                                                >{{this.editForm.sex}}</div>
                                                <div
                                                    class="el-item"
                                                    style="text-align:left"
                                                >{{this.editForm.nation}}</div>
                                                <div
                                                    class="el-item"
                                                    style="text-align:left"
                                                >{{this.editForm.useridcode}}</div>
                                                <div
                                                    class="el-item"
                                                    style="text-align:left"
                                                >{{this.editForm.codestop}}</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <div class="grid-content bg-purple-light">
                                                <div class="el-item el-item1" style="height:126px">
                                                    <img
                                                        style="    max-width: 100px;
    max-height: 150px;"
                                                        :src="this.editForm.headurl"
                                                        alt
                                                    />
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <!-- 身份证 -->
                            <el-col :span="8">
                                <div class="grid-content bg-purple-light" style="margin-left:20px;">
                                    <img :src="this.editForm.headurl" alt width="150" height="170" />
                                </div>
                            </el-col>
                        </el-row>
                        <!-- 重要信息 -->
                        <div class="zhongyao">
                            <H3>重要信息</H3>
                        </div>
                        <el-form
                            :model="editForm"
                            :label-position="labelPosition"
                            label-width="100px"
                            ref="inEditForm"
                            class="content"
                            :rules="inEditFormRules"
                        >
                            <el-form-item label="手机号码：" prop="phone">
                                <div>{{editForm.phone}}</div>
                            </el-form-item>
                            <el-form-item label="人员类型：" prop="usertype">
                                <div>{{editForm.usertype}}</div>
                            </el-form-item>
                            <el-form-item label="工人工种：" prop="region">
                                <div>{{editForm.worktype}}</div>
                            </el-form-item>
                            <el-form-item label="文化程度：" prop="region">
                                <div>{{editForm.whtype}}</div>
                            </el-form-item>
                            <el-form-item label="政治面貌：" prop="zzstatus">
                                <div>{{editForm.zzstatus}}</div>
                            </el-form-item>
                            <el-form-item label="诚信评价：" prop="xypingjia">
                                <div>{{editForm.xypingjia}}</div>
                            </el-form-item>
                            <el-form-item label="工人技能：" prop="region">
                                <div>{{editForm.workjineng}}</div>
                            </el-form-item>
                            <el-form-item label="重要人员：" prop="region">
                                <div>{{editForm.userkey}}</div>
                            </el-form-item>
                            <el-form-item label="开户银行：">
                                <div>{{editForm.useryinhang}}</div>
                            </el-form-item>
                            <el-form-item label="银行卡号：">
                                <div>{{editForm.yhcord}}</div>
                            </el-form-item>
                            <el-form-item label="进场时间：">
                                <div>{{editForm.jcstart}}</div>
                            </el-form-item>
                            <el-form-item label="紧急联系人：" prop="jinjuser">
                                <div>{{editForm.jinjuser}}</div>
                            </el-form-item>
                            <el-form-item label="联系方式：" prop="jinjphone">
                                <div>{{editForm.jinjphone}}</div>
                            </el-form-item>
                            <el-form-item label="家庭电话：" prop="jiatphone">
                                <div>{{editForm.jiatphone}}</div>
                            </el-form-item>
                            <el-form-item label="家庭住址：">
                                <div>{{editForm.jiataddress}}</div>
                            </el-form-item>
                            <el-form-item label="亲属姓名：" :maxlength="10">
                                <div>{{editForm.qinsuser}}</div>
                            </el-form-item>
                            <el-form-item label="亲属关系：" :maxlength="10">
                                <div>{{editForm.qinsguanxi}}</div>
                            </el-form-item>
                        </el-form>
                        <div class="zhongyao">
                            <H3>身份证信息</H3>
                        </div>
                        <div class="idcard">
                            <div>
                                <img :src="editForm.justurl" alt />
                            </div>
                            <div>
                                <img :src="editForm.agturl" alt />
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="技能证书">
                        <el-table :data="peopleList" border style="width: 100%">
                            <el-table-column prop="name" label="证书名称"></el-table-column>
                            <el-table-column prop="zhscord" label="证书编号"></el-table-column>
                            <el-table-column prop="zhsstart" label="发证日期"></el-table-column>
                            <el-table-column prop="zhsdanwei" label="证书签发单位"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                        v-if="scope.row.zhsurl.length>0"
                                        @click="watchBook(scope.row)"
                                        type="text"
                                        size="small"
                                    >查看</el-button>
                                    <el-button v-else type="text" disabled size="small">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="评价">
                        <el-table :data="rateList.list" border style="width: 100%">
                            <el-table-column prop="xmdwname" label="单位名称"></el-table-column>
                            <el-table-column prop="xmname" label="项目名称"></el-table-column>
                            <el-table-column prop="bzname" label="班组名称"></el-table-column>
                            <el-table-column prop="pjname" label="评价人"></el-table-column>
                            <el-table-column prop="pjcontent" label="评价内容"></el-table-column>
                            <el-table-column prop="pjtype" label="评价等级"></el-table-column>
                            <el-table-column prop="time" label="评价日期"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                        v-if="scope.row.pjurl.length>0"
                                        @click="watchPj(scope.row)"
                                        type="text"
                                        size="small"
                                    >查看</el-button>
                                    <el-button v-else type="text" disabled size="small">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="page">
                          <el-pagination
                            small
                            background
                            layout="prev, pager, next"
                            :total="rateList.total"
                            :page-size="rateList.num"
                            @current-change="currentChange">
                          </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <el-dialog
            title="查看证书"
            :visible.sync="wFormPdfVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="dialogadd"
        >
            <div class="wFormPdf" v-if="isPdf == 'pdf'">
                <div v-for="item in pdfList" class="wFormPdfList" :key="item">
                    <div class="pdfleft">
                        <span>{{item}}</span>
                    </div>
                    <el-button plain @click="watchPdf(item)">查看</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            title="查看评价"
            :visible.sync="wFormPicVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="dialogadd"
        >
            <div class="wFormPdf" v-if="isPdfS == 'pdf'">
                <div v-for="item in picList" class="wFormPdfList" :key="item">
                    <div class="pdfleft">
                        <span>{{item}}</span>
                    </div>
                    <el-button plain @click="watchPdf(item)">查看</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import { setTimeout } from 'timers';
export default {
    name: 'leafPeople',
    data() {
        return {
            editForm: {},
            labelPosition: 'right',
            name: '',
            region: '',
            type: '',
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            loaded: false,
            addFormVisible: false,
            manyFormVisible: false,
            wFormVisible: false,
            wFormPdfVisible: false,
            wFormPicVisible: false,
            bookVisible: false,
            ratenum: null,
            addForm: {
                corp_id: this.$store.state.userData.cid,
                userid: this.$route.query.userid,
                name: '',
                zhscord: '',
                zhsstart: '',
                zhsdanwei: '',
                zhsurl: [],
            },
            upImgList: [],
            licenceImg: [],
            isShow: ['1'],
            manyForm: {
                corp_id: this.$store.state.userData.cid,
                userid: this.$route.query.userid,
                pjtype: null,
                pjcontent: '',
                pjname: '',
                pjurl: '',
            },
            peopleList: [],
            bookcontent: '',
            rateList: [],
            isPdf: '',
            isPdfS: '',
            picList: [],
            pdfList: [],
        };
    },
    methods: {
        show(msg) {
            this.addForm.zhsurl = msg;
        },

        back() {
            this.$router.go(-1);
        },
        getMsg() {
            axios
                .post('/laowu_yun/huoqucontentinput', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    bzid: this.$route.query.bzid,
                    userid: this.$route.query.userid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        // that.editForm.xmid = value;
                        this.editForm = res.data.content;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        //证书列表
        getPeople() {
            axios
                .post('/laowu_yun/userzhengshulist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    userid: this.$route.query.userid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.peopleList = res.data.content;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //评分列表
        getRate() {
            axios
                .post('/laowu_yun/userpingjialist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    userid: this.$route.query.userid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.rateList = res.data.content;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        watchBook(row) {
            this.isPdf = row.zhsurl[0].substr(row.zhsurl[0].length - 3);
            this.pdfList = row.zhsurl;
            if (this.isPdf != 'pdf') {
                this.lookimg1(this.pdfList);
            } else {
                this.wFormPdfVisible = true;
            }
        },
        watchPj(row) {
            this.isPdfS = row.pjurl[0].substr(row.pjurl[0].length - 3);
            this.picList = row.pjurl;
            if (this.isPdfS != 'pdf') {
                this.lookimg1(this.picList);
            } else {
                this.wFormPicVisible = true;
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
                    onFail: function (err) {},
                });
            });
        },
        watchPdf(item) {
            dd.ready(function () {
                dd.biz.util.openLink({
                    url: item, //要打开链接的地址
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {},
                });
            });
        },
        deleteClick(row) {
            axios
                .post('/laowu_yun/userzhengshudelete', {
                    zsid: row.zsid,
                    newuid: this.$store.state.userData.uid,
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
        cryTabClick() {
            this.getMsg();
            this.getPeople();
            this.getRate();
        },
    },
    mounted() {
        this.getMsg();
        this.getPeople();
        this.getRate();
    },
};
</script>

<style lang="less">
body {
    .dialogadd {
        .el-dialog {
            width: 500px;
            .saveImgClass {
                .el-form-item__content {
                    display: flex;
                    justify-content: flex-start;
                    > div {
                        width: 86px;
                        height: 60px;
                        margin: 4px 4px 4px 0;
                        .el-image {
                            width: 100%;
                            height: 100%;
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
    }
}
#leafPeople {
    width: 100%;
    margin-left: 10px;
    background-color: #fff;
    padding: 10px;
    overflow-y: auto;
}
#leafPeople #renyuan {
    width: 100%;
}
#leafPeople #renyuan .cheard {
    height: 40px;
}

#leafPeople #renyuan .cheard span {
    margin-top: 10px;
}

#leafPeople#renyuan .cry .el-tabs__content {
    margin-top: 50px;
}
#leafPeople #renyuan .cry .el-tabs__nav-scroll {
    border: 0;
    height: 50px;
}

#leafPeople .renyuan .cry .el-tabs__nav {
    position: static;
}

#leafPeople .bg-purple .jiben {
    border-left: 5px solid #409eff;
    margin-bottom: 10px;
}
#leafPeople .jbxinxi {
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
}
#leafPeople .jbxinxi .el-col .el-item {
    margin: 0;
    padding: 0;
    border: 1px solid #eeeeee;
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
}
#leafPeople .jbxinxi .el-col .el-item1 {
    background-color: #f4f4f4;
}
#leafPeople .jbxinxi .el-col .el-item1 img {
    width: 100%;
    height: 100%;
}
#leafPeople .zhongyao {
    border-left: 5px solid #409eff;
    margin: 10px 0;
}
#leafPeople .zyxinxi {
    width: 100%;
}
#laowu #leafPeople .el-tab-pane {
    display: block;
}
#leafPeople .bg-purple-light {
    padding: 0;
}
#laowu #leafPeople .el-tabs .el-tabs__header {
    width: 100%;
    position: relative;
}
#leafPeople #renyuan .cry .el-tabs__nav-scroll {
    background-color: #fff;
}
#laowu #leafPeople .el-tabs__item {
    color: #000;
}
#laowu #leafPeople .el-tabs__item.is-active {
    margin: 0;
    padding: 0 10px;
    color: #fff;
}
#laowu #leafPeople .content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
#laowu #leafPeople .content .el-form-item {
    width: 33%;
}
#laowu #leafPeople .content .el-form-item .el-input {
    width: 93%;
}
.idcard {
    display: flex;
    justify-content: flex-start;
    min-height: 400px;
}
.idcard img {
    max-width: 400px;
    max-height: 400px;
}
#leafPeople h3 {
    margin-left: 10px;
}
#indexApp .el-textarea__inner {
    resize: none;
    height: 80px;
}

.cry .el-tabs {
    padding: 10px;
}
.cry .el-select {
    width: 100%;
}
#leafPeople .el-rate {
    height: 40px;
    line-height: 40px;
}
#leafPeople .el-rate .el-rate__item {
    vertical-align: unset;
}
</style>

<style lang="less" scoped>
.page {
  margin: 10px 0px;
}
</style>
