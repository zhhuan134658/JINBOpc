<template>
    <div id="Cg">
        <router-link
            :to="{name: 'daddn'}"
            @click.native="routerRefresh"
            style="
            height: 40px;
            margin-bottom: 20px;
            margin-top: 10px;"
        >
            <el-button class="fr" type="primary" v-if="urid>4">添加项目</el-button>
        </router-link>
        <div class="sousuo">
            <el-form
                :inline="true"
                :model="searchform"
                class="demo-form-inline"
                @submit.native.prevent
            >
                <el-form-item label="项目单号:">
                    <el-input
                        v-model="searchform.name"
                        placeholder="请输入项目名"
                        @keyup.enter.native="search"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="search">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="tabList" border style="width:100%;">
            <!-- <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column> -->

            <el-table-column
                type="index"
                :index="(index)=>{return (index+1) + (currentPage-1)*pagesize  }"
                label="序号"
                width="100"
            ></el-table-column>
            <el-table-column prop="coname" label="任务单号"></el-table-column>
<!-- 
            <el-table-column prop="name" label="项目简称">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>{{ scope.row.name }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="pname" label="负责人名称"></el-table-column>
            <el-table-column prop="pphone" label="负责人电话"></el-table-column> -->

            <el-table-column prop="pnicheng" label="门店名称"></el-table-column>
            <el-table-column prop="cocode" label="施工经理"></el-table-column>
            <el-table-column prop="pstart" label="计划开工时间"></el-table-column>
            <el-table-column prop="pstop" label="计划竣工时间"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                {{ checkDate(scope.row.pstop) }}
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button
                        v-if="urid>4"
                        @click="handleDelete(scope.row)"
                        type="text"
                        size="small"
                        style="color:red;"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
        <el-dialog
            title="确定删除项目吗？"
            :visible.sync="cgDeleteisible"
            :append-to-body="true"
            @close="closeDialog"
            class="cgDeleteDialog"
        >
            <div class="itemDiv">
                <div style="margin-bottom:8px;color:#909291;">
                    <span>正在删除</span>
                    <span style="color:#409eff;color:#409eff;">{{deleteXmName}}</span>
                    <span>项目</span>
                </div>
                <div style="margin-bottom:27px;color:#909291;">项目一旦删除将无法找回，请谨慎删除！</div>
                <div style="margin-bottom:10px;color:#000;">
                    <span>请在下方输入</span>
                    <span style="color:#409eff;">"YES"</span>
                    <span>确认删除</span>
                </div>
                <el-input v-model="deleteText" maxlength="10"></el-input>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cgDeleteisible = false">取 消</el-button>
                <el-button type="primary" @click="deletePBtn" :loading="loaded">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import SingelGroup from '../public/singelGroup';
import newGroup from '../public/newGroup.vue';
export default {
    components: { newGroup, SingelGroup },
    data() {
        return {
            searchform: { name: '' },
            tabList: [],

            userid: this.$store.state.userData.uid,
            urid: this.$store.state.userData.urid,
            cid: this.$store.state.userData.cid,
            tabPosition: 'left',
            insideTableData: [],
            editLoading: false,
            routerAlive: true,
            loaded: false,
            watchFormVisible: false, //查看界面
            editFormVisible: false, //创建界面
            tagsData: [],
            groupView: false,
            editForm: {
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                name: '',
                bzpersonid: '',
                bzperson: '',
                urid: this.$store.state.userData.urid,
                bzname: '',
                cocode: '',
                bzphone: '',
                bztype: '',
                userids: '',
            }, //编辑数据
            editFormRules: {},
            //子组件传回的值
            ManageName: [],
            ManageId: [],
            MemberName: '',
            MemberId: '',
            failMsg: '',
            isFail: false,
            total: '', //默认数M²据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            cgDeleteisible: false,
            deleteText: '',
            deleteXmId: '',
            deleteXmName: '',
        };
    },

    methods: {
        // 项目分页递增
        indexMethod(index) {
            let curpage = this.page.pagination.pageData.page; //单前页码，具体看组件取值
            let limitpage = this.page.pagination.pageData.limit; //每页条数，具体是组件取值
            return index + 1 + (curpage - 1) * limitpage;
        },
        search() {
            this.getTab(this.searchform.name, 1);
        },
        routerRefresh() {
            this.routerAlive = false;
            this.$nextTick(() => {
                this.routerAlive = true;
            });
        },
        //打开删除项目覆盖层
        handleDelete(row) {
            this.deleteXmId = row.xmid;
            this.deleteXmName = row.name;
            this.cgDeleteisible = true;
        },
        closeDialog() {
            this.deleteText = '';
        },
        //删除项目
        deletePBtn() {
            const that = this;
            if (that.deleteText == 'YES') {
                axios
                    .post('/laowu_yun/deleteproject', {
                        xmid: that.deleteXmId,
                        newuid: that.$store.state.userData.uid,
                    })
                    .then((res) => {
                        if (res.data.status == 1) {
                            that.cgDeleteisible = false;
                            that.deleteText = '';
                            that.getTab(that.searchform.name, 1);
                            that.$message({
                                message: res.data.msg,
                                center: true,
                                duration: 1500,
                                type: 'success',
                            });
                        } else {
                            that.$message({
                                message: res.data.msg,
                                center: true,
                                duration: 2000,
                                type: 'warning',
                            });
                        }
                        that.loaded = false;
                    })
                    .catch(function (error) {
                        that.loaded = false;
                        that.$message({
                            message: error,
                            center: true,
                            duration: 2000,
                            type: 'warning',
                        });
                    });
            } else {
                that.$message({
                    message: '输入错误',
                    center: true,
                    duration: 2000,
                    type: 'warning',
                });
            }
        },
        //子组件传值
        parentFn(payload) {
            this.ManageName = this.dedupe(payload);
            // this.editForm.bzperson = this.ManageName;
        },
        parentFn2(payload) {
            this.ManageId = this.dedupe(payload);
            this.editForm.userids = this.ManageId;
        },
        parentFn3(payload) {
            this.tagsData = this.dedupe(payload);
        },
        //更改负责人子组件传值
        getSingel(msg) {
            this.MemberName = msg;
            this.editForm.bzperson = this.MemberName;
        },
        getSingel2(msg) {
            this.MemberId = msg;
            this.editForm.bzpersonid = this.MemberId;
        },
        indexMethod(index) {
            return index + 1;
        },

        viewSingel() {
            this.groupView = true;
        },
        current_change: function (currentPage) {
            this.currentPage = currentPage;
        },
        getTab(valname, num) {
            const that = this;
            axios
                .post('/laowu_yun/pcuserprojectteamlist', {
                    corp_id: that.$store.state.userData.cid,
                    current_page: num,
                    xmname: valname,
                    userid: that.userid,
                    newuid: that.$store.state.userData.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        that.tabList = res.data.content.list;
                        that.total = res.data.content.total;
                        that.pagesize = res.data.content.num;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTab(this.searchform.name, val);
        },

        //编辑界面
        handleEdit(row) {
            this.editFormVisible = true;
            this.$router.push({
                path: '/demobj',
                query: { xmid: row.xmid },
            });
        },
        creat() {
            // this.editFormVisible = true;
        },

        //去重
        dedupe(array) {
            return Array.from(new Set(array));
        },

      // 日期是否过期
      checkDate(endDate) {
        let date = new Date(endDate)
        let nowDate = new Date()
        console.log(date.getTime(), nowDate.getTime())
        if (nowDate.getTime() > date.getTime()) {
          return '延期'
        } else {
          return '正常'
        }
      }
    },
    created() {},
    mounted() {
        const that = this;
        that.getTab(that.searchform.name, 1);
    },
};
</script>
<style lang="less">
body {
    .cgDeleteDialog {
        .el-dialog {
            width: 500px;
            border-radius: 14px;
            .el-dialog__header {
                border-bottom: 0;
                .el-dialog__title {
                    font-weight: 700;
                }
            }
            .el-dialog__body {
                padding-top: 10px;
            }
        }
    }
}
#Cg {
    width: 100%;
    padding: 17px 10px;

    margin-top: 17px;
    background-color: #fff;
    overflow-y: auto;
}

#Iu #pane-1 {
    margin-left: 0;
}
#demo #Iu .el-tabs--left .el-tabs__nav-wrap.is-left {
    background-color: #f4f9fe;
}
#Cg .el-form {
    width: 100%;
}

#Cg .el-form-item .el-form-item__label {
    width: 30%;
}
#Cg .el-form-item__content {
    width: 30%;
}

#Cg .el-tabs__content {
    height: 100%;
}
#Cg .el-pagination {
    text-align: center;
}
#Cg .sousuo {
    float: right;
}
#Cg .sousuo .el-form-item__content {
    width: 70%;
}
</style>

