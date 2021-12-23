<template>
    <div id="lwnext">
        <h1>匹配课程</h1>
        <div class="loi">
            <el-steps
                :active="2"
                align-center="true"
                finish-status="success"
                style="margin-bottom: 30px;"
            >
                <el-step title="选择课程"></el-step>
                <el-step title="匹配人员"></el-step>
                <!-- <el-step title="上传现场照片"></el-step> -->
            </el-steps>
            <el-table
                @selection-change="handleSelectionChange"
                @click="toggleSelection"
                :data="tableDataWW"
                border
                style="width: 100%"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="useridcode" label="身份证" width="180"></el-table-column>
                <el-table-column prop="pxtype" label="培训状态"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                layout="prev, pager, next, jumper"
                :total="total"
            ></el-pagination>

            <div style="margin-left:200px">
                <el-button type="danger" @click="golp">上一步</el-button>
                <el-button type="primary" @click="goll">推送</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            ceshi: this.$route.query.kclisted,
            _normalized: '',
            kclisted: this.$route.query.kclisted,
            kctime: this.$route.query.kctime,

            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            istag: true,
            kcid: this.$route.query.kclisted.kcid,
            cid: this.$store.state.userData.cid,
            // bzid:this.$route.params.bzid,
            bzid: this.$store.state.userData.kcbzid,

            tableDataWW: [],
            addarr: [],
            llist: [],
            addname: [],
            userid: []
        };
    },
    methods: {
        // 选中人员
        handleSelectionChange(val) {
            console.log(val);
            this.addarr = val;

            this.$store.commit('setkclisted', this.addarr);

            this.userid = this.addarr.map((item) => {
                if (!item.userid) return '';
                return item.userid;
            });
        },
        toggleSelection() {},

        getTable(num, val) {
            axios
                .post('/laowu_yun/userpexunlist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    bzid: this.bzid,
                    kcid: this.kcid,
                    current_page: val,
                    name: num,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.tableDataWW = res.data.content.list;
                        this.currentPage = res.data.content.current_page;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTable(this.tableDataWW.name, val);
        },
        golp() {
            this.$router.push({ path: '/LP' });
        },
        goll() {
            if (this.addarr.length > 0) {
                this.$store.commit('setkcids', this.$route.query.kclisted.kcid);
                // this.$router.push({
                //     path: '/LL',
                //     query: {
                //         kclisted: this.kclisted,
                //         kctime: this.kctime,
                //     },
                // });

                axios
                .post('/laowu_yun/useraddpx', {
                    corp_id: this.cid,
                    userids: this.userid,
                    kcid: this.kclisted,
                    bzid: this.bzid,
                })
                .then((res) => {
                    this.$router.push({ path: '/LS' });
                });
            } else {
                this.$alert('请先选择人员！');
            }
        },
    },
    created() {
        this.$store.commit('setvalue', 2);

        this.getTable();
    },
};
</script>
<style lang="less">
#lwnext {
    width: 100%;
    background-color: #fff;
    padding: 10px;
    height: 100%;
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
</style>


