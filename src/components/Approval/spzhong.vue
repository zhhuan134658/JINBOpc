<template>
    <div class="spzhong">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="spzbody">
            <el-table :data="spztable" border style="width:100%" @row-click="rowclick">
                <el-table-column prop="spcontent" label="审批内容"></el-table-column>
                <el-table-column prop="created" label="审批时间"></el-table-column>
                <el-table-column prop="sptype" label="审批类型"></el-table-column>
                <el-table-column prop="spstatus" label="审批状态"></el-table-column>
            </el-table>
        </div>
        <!-- 抽屉 -->
        <el-drawer
            title="到我审批"
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose"
        >
            <el-divider style="width:90%;text-align:center"></el-divider>
            <div>
                <div class="zhong">
                    <div class="name">{{username}}</div>
                    <div class="status">{{spstatus}}</div>
                    <div style="margin-top:20px;margin-left:10px">审批内容： {{spcontent}}</div>
                </div>
                <el-divider></el-divider>
                <div class="zhcontent">
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

                    <div v-show="quxian==1">
                        <el-button type="primary" @click="sure()">同意</el-button>
                        <el-button type="primary" @click="refuse()">拒绝</el-button>
                    </div>
                </div>
            </div>
        </el-drawer>
        <el-dialog title="拒绝意见" :visible.sync="ChildVisible" :close-on-click-modal="false">
            <div class="spzdialog">
                <el-input
                    style="width:100%"
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="text"
                    maxlength="30"
                    show-word-limit
                ></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ChildVisible = false">取 消</el-button>
                <el-button type="primary" @click="stroy">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="同意意见" :visible.sync="addChildVisible" :close-on-click-modal="false">
            <div class="spzdialog">
                <el-input
                    style="width:100%"
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="textarea"
                    maxlength="30"
                    show-word-limit
                ></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addChildVisible = false">取 消</el-button>
                <el-button type="primary" @click="destroy">确 定</el-button>
            </span>
        </el-dialog>
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
            addChildVisible: false,
            ChildVisible: false,

            textarea: '',
            text: '',

            icon: 'el-icon-star-off',
            color: '#409EFF',

            username: '',
            yishen: '',
            ershen: '',
            sanshen: '',
            sishen: '',

            jindu: '',
            quxian: '',
            status: '',

            spcolor: '',
            splist: [],
            titlelist: [
                // '发起人',
                // '一级审批人',
                // '二级审批人',
                // '三级审批人',
                // '四级审批人'
            ],

            username: this.$store.state.userData.uname,
            userid: this.$store.state.userData.uid,
            cid: this.$store.state.userData.cid,
            drawer: false,

            spztable: []
        };
    },
    methods: {
        black() {
            this.drawer = false;
        },
        sure() {
            this.addChildVisible = true;
        },
        refuse() {
            this.ChildVisible = true;
        },

        rowclick(row) {
            console.log(row);
            this.created = row.created;
            this.spcontent = row.spcontent;
            this.spid = row.spid;

            this.sptype = row.sptype;
            this.drawer = true;
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
                    console.log(this.splist);
                    this.spstatus = content.spstatus; //总审批状态
                    this.status = content.status;

                    this.jindu = content.jindu;
                    this.quxian = content.quxian;

                    console.log(res);
                });
        },
        handleClose(done) {
            this.drawer = false;
        },
        //审批通过
        destroy() {
            axios
                .post('/laowu_yun/shenpitongguo', {
                    jindu: this.jindu,
                    spid: this.spid,
                    status: this.status,
                    content: this.textarea
                })
                .then(res => {
                    this.addChildVisible = false;
                    this.drawer = false;
                    this.created();

                    console.log(res);
                });
        },
        //拒绝审批
        stroy() {
            axios
                .post('/laowu_yun/shenpijujue', {
                    jindu: this.jindu,
                    spid: this.spid,
                    status: this.status,
                    content: this.text,
                    userid: this.userid
                })
                .then(res => {
                    this.drawer = false;
                    ChildVisible = false;
                    this.created();
                    console.log(res);
                });
        }
    },
    created() {
        console.log(this.username);
        console.log(this.userid);
        console.log(this.cid);
        axios
            .post('/laowu_yun/shenpiliebiao', {
                corp_id: this.cid,
                spuserid: this.userid
            })
            .then(res => {
                console.log(res);
                this.spztable = res.data.content;
                console.log(this.spztable);
            });
    }
};
</script>

<style >
.spzhong {
    margin-left: 250px;
    width: 100%;
    margin: 17px auto;

    background-color: #fff;
}
.spzbody {
    width: 100%;
    height: 700px;
}
.cell {
    text-align: center;
}
.black {
    height: 50px;
    font-size: 20px;
}
.spzhong .input-with {
    width: 500px;
    margin-bottom: 20px;
}
.zhong .name {
    margin-left: 30px;
    font-size: 30px;
    color: #409eff;
}
.zhong .status {
    margin-left: 30px;
    font-size: 16px;
    color: #f56c6c;
}
.zhcontent {
    height: 300px;
}
.spbu {
    text-align: center;
    margin-top: 20px;
}
.zhcontent {
    margin-left: 5%;
    width: 90%;
    height: 100%;
}
.spname {
    font-size: 16px;
    color: #409eff;
}
.weicolor {
    color: #f66c6c;
}
.yicolor {
    color: #aad0a7;
}
.spzdialog {
    width: 100%;
    height: 250px;
}
</style>