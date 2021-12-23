<template>
    <div id="lwlast">
        <h1>匹配课程</h1>
        <div class="loi">
            <el-steps
                :active="3"
                align-center="true"
                finish-status="success"
                style="margin-bottom: 30px;"
            >
                <el-step title="选择课程"></el-step>
                <el-step title="匹配人员"></el-step>
                <el-step title="上传现场照片"></el-step>
            </el-steps>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="班组:">
                    <el-input v-model="formLabelAlign.n1" disabled></el-input>
                </el-form-item>
                <el-form-item label="培训课程:">
                    <el-input v-model="formLabelAlign.n2" disabled></el-input>
                </el-form-item>
                <el-form-item label="培训人员:">
                    <el-input v-model="formLabelAlign.n3" disabled></el-input>
                </el-form-item>
                <el-form-item label="培训时间:">
                    <el-input v-model="formLabelAlign.n4" disabled></el-input>
                </el-form-item>
                <el-form-item label="现场图片:">
                    <upload
                        :upImgList="upImgList"
                        :licenceImg="licenceImg"
                        :isShow="isShow"
                        v-on:listenToChildEvent="show"
                    ></upload>
                </el-form-item>
            </el-form>

            <div style="margin-left:200px;">
                <el-button type="danger" @click="goup">上一步</el-button>
                <el-button type="primary" @click="addpx">保存</el-button>

                <!-- :to='{name:"LS"}' -->
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import upload from '../public/upload.vue';
export default {
    components: { upload },
    props: {
        bzid: {
            type: String,
        },
    },
    data() {
        return {
            kclisted: this.$route.query.kclisted,

            upImgList: [],
            licenceImg: [],
            cid: this.$store.state.userData.cid,
            _normalized: '',
            addname: [],
            labelPosition: 'right',
            formLabelAlign: {
                n1: this.$store.state.userData.kcbzname,
                n2: this.$route.query.kclisted.kcname,
                n3: this.$store.state.userData.kclisted,
                // n4: this.$route.query.kctime,
                n4: this.$store.state.userData.kctime,

                n6: '',
            },
            userid: [],
            pxurl: '',
        };
    },

    methods: {
        // cancel() {
        //     this.isFail = false;
        //     this.failMsg = '';
        //     this.$refs.addEditForm.resetFields(); // 清空表单
        //     this.licenceImg = [];
        //     this.upImgList = [];
        //     this.addForm.hturl = [];
        //     this.isShow = [];
        //     this.addFormVisible = false;
        // },
        goup() {
            this.$router.push({
                path: '/LN',
                query: { kclisted: this.kclisted },
            });
        },
        show(data) {
            this.pxurl = data;
        },
        addpx() {
            axios
                .post('/laowu_yun/useraddpx', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    userid: this.userid,
                    pxurl: this.pxurl,
                    pxtime: this.formLabelAlign.n4,
                    kcid: this.$route.query.kclisted.kcid,
                    bzid: this.bzid,
                })
                .then((res) => {
                    this.$store.commit('setkctime', '');
                    this.$store.commit('setkkklist', []);
                    this.$router.push({ path: '/LS' });
                    this.upImgList = [];
                    this.licenceImg = [];
                });
        },
    },
    created() {
        console.log(this.$route.query.kcid); //课程id
        this.userid = this.$store.state.userData.kclisted.map((item) => {
            if (!item.userid) return '';
            return item.userid;
        });

        this.userid = this.$store.state.userData.kclisted.map((item) => {
            if (!item.userid) return '';
            return item.userid;
        });

        this.formLabelAlign.n3 = this.$store.state.userData.kclisted.map(
            (item) => {
                if (!item.name) return '';
                return item.name;
            }
        );
    },
};
</script>
<style lang="less">
#lwlast {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 10px;
    overflow-y: auto;
    .el-input .el-input__inner {
        background-color: #fff;
        color: #000;
    }
    h1 {
        font-size: 16px;
        color: #409eff;
    }
    .loi {
        width: 700px;
        // height: 700px;
        margin: 0 auto;
        margin-top: 60px;
        padding-bottom: 40px;
    }
}
.cdiv1 {
    width: 100% !important;
}
.imge {
    width: 100%;
    height: 100px;
    border: 1px solid red;
}
</style>


