<template>
    <div class="spcs">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="spsbody">
            <el-table :data="spstable" border style="width: 100%" @row-click="rowclick">
                <el-table-column prop="spcontent" label="审批内容"></el-table-column>
                <el-table-column prop="created" label="审批时间"></el-table-column>
                <el-table-column prop="sptype" label="审批类型"></el-table-column>
                <el-table-column prop="spstatus" label="审批状态"></el-table-column>
            </el-table>
        </div>
        <!-- 抽屉 -->
        <!-- 抽屉 -->
        <el-drawer
            :title="tt"
            :visible.sync="drawerf"
            :direction="direction"
            :before-close="handleClose"
        >
            <div>
                <el-divider></el-divider>
                <div class="fq">
                    <div class="name">{{username}}</div>
                    <div class="status">{{spstatus}}</div>
                    <div style="margin-top:20px;margin-left:10px">审批内容： {{spcontent}}</div>
                </div>
                <el-divider></el-divider>
                <div class="neirong">
                    <el-timeline>
                        <el-timeline-item
                            :hide-timestamp="true"
                            :icon="icon"
                            :color="color"
                            v-for="(item,index) in splist"
                            :key="index"
                        >
                            <div class="spname">{{titlelist[index]}}</div>
                            <div>{{item.name}}</div>
                            <div :class="item.zhung=='未通过'?'weicolor':'yicolor'">{{item.zhung}}</div>
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            created: '', //发起时间
            spcontent: '', //审批内容
            spid: '', //审批id
            spstatus: '', //审批状态
            sptype: '', //审批类型

            spstable: '',

            icon: 'el-icon-star-off',
            color: '#409EFF',

            username: '',
            yishen: '',
            ershen: '',
            sanshen: '',
            sishen: '',

            jindu: '',
            quxian: '',

            spcolor: '',
            splist: [],
            titlelist: [],

            tt: this.$store.state.userData.uname + '发起的审批',
            username: this.$store.state.userData.uname,
            userid: this.$store.state.userData.uid,
            cid: this.$store.state.userData.cid,

            drawerf: false
        };
    },
    methods: {
        black() {
            this.$router.go(-1);
        },
        rowclick(row) {
            console.log(row);
            this.drawers = true;
        },
        rowclick(row) {
            console.log(row);
            this.created = row.created;
            this.spcontent = row.spcontent;
            this.spid = row.spid;

            this.sptype = row.sptype;

            this.drawerf = true;
            axios
                .post('/laowu_yun/shenpixiangqing', {
                    corp_id: this.cid,
                    id: this.spid,
                    userid: this.userid
                })
                .then(res => {
                    var content = res.data.content;
                    this.username = content.userid.name; //发起name
                    this.yishen = content.yishen; //一审
                    this.ershen = content.ershen; //二审
                    this.sanshen = content.sanshen; //三审
                    this.sishen = content.sishen; //三审
                    this.splist = [];
                    if (content.ershen.length == 0) {
                        this.titlelist = ['发起人', '一级审批人'];

                        this.splist.splice(
                            1,
                            0,
                            content.userid,
                            this.yishen
                            // this.ershen,
                            // this.sanshen,
                            // this.sishen
                        );
                    } else if (content.sanshen.length == 0) {
                        this.titlelist = ['发起人', '一级审批人', '二级审批人'];

                        this.splist.splice(
                            1,
                            0,
                            content.userid,
                            this.yishen,
                            this.ershen
                        );
                    } else if (content.sishen.length == 0) {
                        this.titlelist = [
                            '发起人',
                            '一级审批人',
                            '二级审批人',
                            '三级审批人'
                        ];
                        this.splist.splice(
                            1,
                            0,
                            content.userid,
                            this.yishen,
                            this.ershen,
                            this.sishen
                        );
                    } else {
                        this.titlelist = [
                            '发起人',
                            '一级审批人',
                            '二级审批人',
                            '三级审批人',
                            '四级审批人'
                        ];
                        this.splist.splice(
                            1,
                            0,
                            content.userid,
                            this.yishen,
                            this.ershen,
                            this.sanshen,
                            this.sishen
                        );
                    }
                    this.spstatus = content.spstatus; //总审批状态
                    this.jindu = content.jindu;
                    this.quxian = content.quxian;

                    console.log(this.splist);

                    console.log(res);
                });
        },
        handleClose(done) {
            this.drawerf = false;

            // this.$confirm('确认关闭？')
            // .then(_ => {
            //     done();
            //   })
            //   .catch(_ => {});
        }
    },
    created() {
        console.log(this.userid);
        console.log(this.cid);
        axios
            .post('/laowu_yun/shenpiliebiao', {
                corp_id: this.cid,
                csuserid: this.userid
            })
            .then(res => {
                this.spstable = res.data.content;
                console.log(res);
            });
    }
};
</script>
<style >
.spcs {
    margin-left: 250px;
    width: 100%;
    margin: 17px auto;

    background-color: #fff;
}
.black {
    height: 50px;
    font-size: 20px;
}
.spcs .input-with {
    width: 500px;
    margin-bottom: 20px;
}
</style>