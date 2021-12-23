<template>
    <div id="shenpi">
        <vue-scroll :ops="ops" style="width:100%;height:750px" class="scroll">
            <!-- <el-button type="primary" @click="back" style="float:right;margin-top:20px">返回</el-button> -->

            <el-form
                label-width="215px"
                :rules="creatProjectrules"
                :label-position="labelPosition"
                ref="creatProject"
                :model="ruleForm"
                style="width:50%;margin:30px auto"
            >
                <div style="width:100%;margin-bottom:20px;">
                    <div class="shenpi">
                        <span>审批人(最多可设置四个审批人)：</span>
                        <span>
                            <el-button
                                type="primary"
                                style="width:140px;text-align:center;"
                                @click="viewGroup"
                            >添加审批人</el-button>
                        </span>
                    </div>
                    <el-tag
                        v-for="tag in tagsData"
                        :key="tag.id"
                        closable
                        :type="tag.name"
                        style="margin:6px;"
                        @close="handleClose(tag)"
                    >{{tag.name}}</el-tag>
                </div>

                <!-- 抄送 -->

                <div style="width:100%;margin-bottom:20px;">
                    <div class="chaosong">
                        <span>抄送人(最多可设置四个抄送人)：</span>
                        <span>
                            <el-button
                                type="primary"
                                style="width:140px;text-align:center;"
                                @click="chaoviewGroup"
                            >添加抄送人</el-button>
                        </span>
                    </div>
                    <el-tag
                        v-for="ctag in chaotagsData"
                        :key="ctag.id"
                        closable
                        :type="ctag.name"
                        style="margin:6px;"
                        @close="chaohandleClose(ctag)"
                    >{{ctag.name}}</el-tag>
                </div>

                <!-- 上传 -->
                <el-form-item label="上传文件:">
                    <eupload
                        v-on:listenToChild="showe"
                        :upImgList2="upImgList2"
                        :licenceImg2="licenceImg2"
                        :isShow2="isShow2"
                    ></eupload>
                </el-form-item>

                <el-form-item label="审批内容:">
                    <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="textarea"
                        maxlength="30"
                        show-word-limit
                    ></el-input>
                </el-form-item>

                <div
                    v-if="isFail"
                    style="width:80%;margin:0 auto;height:40px;line-height:40px;text-align:center;color:red;"
                >{{failMsg}}</div>
                <el-form-item style="margin-top:60px; width:100%;">
                    <el-button
                        type="primary"
                        :loading="loaded"
                        @click="save"
                        style="width:200px;"
                    >提交审批</el-button>
                    <el-button type="primary" :loading="loaded" @click="black">取消</el-button>
                </el-form-item>
            </el-form>
        </vue-scroll>

        <!-- 审批人 -->

        <el-dialog
            title="添加审批人"
            :visible.sync="groupView"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
        >
            <div style="margin-bottom:20px;">
                <div style="margin-bottom:6px;">审批人</div>
                <el-tag
                    v-for="tag in tagsData"
                    :key="tag.id"
                    closable
                    :type="tag.name"
                    style="margin:6px;"
                    @close="handleClose(tag)"
                >{{tag.name}}</el-tag>
            </div>
            <mGroup
                @childFn2="parentFn2"
                @childFn="parentFn"
                @childFn3="parentFn3"
                @childFn4="parentFn4"
                v-bind:ManageName="ManageName"
                v-bind:ManageId="ManageId"
                v-bind:tagsData="tagsData"
                :neworgids="neworgids"
            ></mGroup>
            <span slot="footer" class="dialog-footer">
                <el-button @click="groupView = false">取 消</el-button>
                <el-button type="primary" @click="groupView = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 抄送人 -->
        <el-dialog
            title="添加抄送人"
            :visible.sync="chaogroupView"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
        >
            <div style="margin-bottom:20px;">
                <div style="margin-bottom:6px;">抄送人</div>
                <el-tag
                    v-for="ctag in chaotagsData"
                    :key="ctag.id"
                    closable
                    :type="ctag.name"
                    style="margin:6px;"
                    @close="chaohandleClose(ctag)"
                >{{ctag.name}}</el-tag>
            </div>
            <!-- <mGroup
                @childFn2="parentFn2"
                @childFn="parentFn"
                @childFn3="chaoparentFn3"
                @childFn4="chaoparentFn4"
                v-bind:ManageName="ManageName"
                v-bind:ManageId="ManageId"
                v-bind:tagsData="chaotagsData"
                :neworgids="chaoneworgids"
            ></mGroup>-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="chaogroupView = false">取 消</el-button>
                <el-button type="primary" @click="chaogroupView = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import eupload from '../public/excelUpload.vue';
import axios from 'axios';
import SingelGroup from '../public/singelGroup.vue';

import { setTimeout } from 'timers';

export default {
    components: { SingelGroup, eupload },
    data() {
        return {
            upImgList2: '',
            licenceImg2: '',
            isShow2: ['1'],
            eurl: '',

            textarea: '',
            corp_id: this.$store.state.userData.cid,
            userid: this.$store.state.userData.uid,

            urid: this.$store.state.userData.urid,
            uid: this.$store.state.userData.uid,
            cid: this.$store.state.userData.cid,

            newid: [],
            newcid: [],

            groupView: false,
            chaogroupView: false,

            ManageName: [],
            ManageId: [],
            chaoManageName: [],
            chaoManageId: [],

            tagsData: [],
            chaotagsData: [],
            neworgids: [],
            chaoneworgids: [],
            tagsTitleDataName: [],
            tagsTitleDataId: [],
            tagsTitleData: [],

            ruleForm: {
                name: '',
                pname: '',
                title: '',
                paddress: '',
                ppersonid: '',
                corp_id: this.$store.state.userData.cid,
                urid: this.$store.state.userData.urid,
                pphone: '',
                pbulider: '',
                pbulidertime: '',
                ptype: '',
                pnumber: '',
                pstatus: '',
                pkey: '',
                pstart: '',
                pstop: '',
                cajianzhu: '',
                gongguimo: '',
                //施工
                coname: '',
                cocode: '',
                coqlevel: '',
                coleps: '',
                coperson: '',
                cophone: '',
                userids: [],
                chaouserids: [],
                orgids: [],
                chaoorgids: []
            }
        };
    },
    methods: {
        // 上传
        cancel() {
            this.licenceImg2 = '';
            this.upImgList2 = '';

            this.isShow2 = [];
        },

        black() {
            this.$router.go(-1);
            this.cancel;
        },
        showe(data) {
            this.eurl = data;
        },
        save() {
            // 审批人id
            this.newid = this.tagsData.map(item => {
                if (!item.id) return '';
                return item.id;
            });

            // 抄送人id
            this.newcid = this.chaotagsData.map(item => {
                if (!item.id) return '';
                return item.id;
            });

            axios
                .post('/laowu_yun/tijiaoxinzishenpi', {
                    corp_id: this.corp_id,
                      newuid:this.$store.state.userData.uid,
                    userid: this.userid,
                    yishen: this.newid[0],
                    ershen: this.newid[1],
                    sanshen: this.newid[2],
                    sishen: this.newid[3],
                    spurl: this.eurl,
                    chaosong: this.userids,
                    sptype: '薪资审批',
                    spcontent: this.textarea
                })
                .then(res => {
                    this.$router.go(-1);
                });
        },
        //去重

        // titFn(payload) {
        //     this.tagsTitleData = this.dedupe(payload);
        // },
        // titFn2(payload) {
        //     this.tagsTitleDataName = this.dedupe(payload);
        //     this.ruleForm.title = this.tagsTitleDataName;
        // },
        // titFn3(payload) {
        //     this.tagsTitleDataId = this.dedupe(payload);
        //     this.ruleForm.ptype = this.tagsTitleDataId;
        // },

        parentFn3(payload) {
            this.tagsData = this.dedupe(payload);
            this.ruleForm.userids = this.tagsData.map(item => {
                if (!item.id) return '';
                return item.id;
            });
        },
        parentFn4(payload) {
            this.neworgids = this.dedupe(payload);
            this.ruleForm.orgids = this.neworgids.map(item => {
                if (!item.org_id) return '';
                return item.org_id;
            });
        },
        chaoparentFn3(payload) {
            this.chaotagsData = this.dedupe(payload);
            this.ruleForm.chaouserids = this.chaotagsData.map(item => {
                if (!item.id) return '';
                return item.id;
            });
        },
        chaoparentFn4(payload) {
            this.chaoneworgids = this.dedupe(payload);
            this.ruleForm.chaoorgids = this.chaoneworgids.map(item => {
                if (!item.org_id) return '';
                return item.org_id;
            });
        },
        //更改负责人子组件传值
        // getSingel(msg) {
        //     this.MemberName = msg;
        //     this.ruleForm.pname = this.MemberName;
        // },
        // getSingel2(msg) {
        //     this.MemberId = msg;
        //     this.ruleForm.ppersonid = this.MemberId;
        // },
        // 删除
        handleClose(tag) {
            this.tagsData.splice(this.tagsData.indexOf(tag), 1);
            this.ruleForm.userids = this.tagsData.map(item => {
                if (!item.id) return '';
                return item.id;
            });
        },
        chaohandleClose(ctag) {
            this.chaotagsData.splice(this.chaotagsData.indexOf(ctag), 1);
            this.ruleForm.chaouserids = this.chaotagsData.map(item => {
                if (!item.id) return '';
                return item.id;
            });
        },
        dedupe(array) {
            return Array.from(new Set(array));
        },
        // handleCloseor(tag) {
        //     this.neworgids.splice(this.neworgids.indexOf(tag), 1);
        //     this.ruleForm.orgids = this.neworgids.map(item => {
        //         if (!item.org_id) return '';
        //         return item.org_id;
        //     });
        // },
        // handleClose2(tag) {
        //     this.tagsTitleData.splice(this.tagsTitleData.indexOf(tag), 1);
        //     this.tagsTitleDataName.splice(
        //         this.tagsTitleDataName.indexOf(tag.name),
        //         1
        //     );
        //     this.tagsTitleDataId.splice(
        //         this.tagsTitleDataId.indexOf(tag.id),
        //         1
        //     );
        // },
        viewGroup() {
            this.groupView = true;
        },
        chaoviewGroup() {
            this.chaogroupView = true;
        }
    },
    created() {},

    mounted() {}
};
</script>
<style>
#shenpi {
    width: 100%;
    background-color: #fff;
}
.splist {
    width: 98%;
    border: 1px solid red;
    height: 100px;
}
.chaosong {
    display: flex;
    justify-content: space-between;
}
.shenpi {
    display: flex;
    justify-content: space-between;
}
</style>


