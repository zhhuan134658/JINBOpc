<template>
    <div id="order_list">
        <div class="order_list_title">订单列表</div>
        <el-divider></el-divider>
        <div class="order_list_table">
            <el-form
                :inline="true"
                :model="searchform"
                class="demo-form-inline"
                @submit.native.prevent
            >
                <el-form-item label="名称：" style="float: left">
                    <el-input
                        v-model="searchform.name"
                        placeholder="请输入名称"
                        @keyup.enter.native="search"
                    ></el-input>
                </el-form-item>
                <el-form-item style="float: left">
                    <el-button type="primary" plain @click="search"
                        >查询</el-button
                    >
                </el-form-item>
            </el-form>
            <div class="money_list">
                <div class="mlFlex">
                    <h3>{{ totalPeople }}</h3>
                    <p>公司可使用人数</p>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="mlFlex">
                    <h3>{{ usePeople }}</h3>
                    <p>公司已用人数</p>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="mlFlex">
                    <h3>{{ totalPeople - usePeople }}</h3>
                    <p>公司剩余人数</p>
                </div>
            </div>
            <el-table
                :data="orderList"
                border
                style="width: 100%; text-align: center; margin-bottom: 20px"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column
                    prop="shopname"
                    label="商品名称"
                ></el-table-column>
                <el-table-column
                    prop="orderId"
                    label="订单编号"
                ></el-table-column>
                <!-- <el-table-column prop="jine" label="金额（元）"></el-table-column> -->
                <el-table-column
                    prop="type"
                    label="类型"
                    :formatter="formatStatus"
                ></el-table-column>
                <el-table-column
                    prop="jiezhitime"
                    label="订单有效时间"
                ></el-table-column>
                <el-table-column prop="time" label="下单时间"></el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleWatch(scope.row)"
                            type="text"
                            size="small"
                            v-if="scope.row.type == 1"
                            >绑定</el-button
                        >
                        <el-button
                            type="text"
                            size="small"
                            v-if="scope.row.type == 3"
                            >已绑定</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: center">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="total"
                ></el-pagination>
            </div>
        </div>
        <el-dialog
            title="绑定"
            :visible.sync="addFormVisible"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
            class="dialogadd"
        >
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
            >
                <el-form-item label="绑定项目:">
                    <el-select
                        v-model="formInline.name"
                        placeholder="请选择项目"
                        @change="selectkecheng"
                    >
                        <el-option
                            v-for="(item, index) in projectlist"
                            :key="index"
                            :label="item.name"
                            :value="item.xmid"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div style="color: #f56c6c">提示：项目一旦绑定将不能修改</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            dingdanid: '',
            xiangmuid: '',
            projectlist: '',
            formInline: { xmname: '', xmid: '' },
            addFormVisible: false,
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            orderList: [],
            searchform: {
                name: '',
            },
            total: '', //默认数据总数
            currentPage: 1, //默认开始页面
            totalPeople: 0,
            usePeople: 0,
        };
    },
    methods: {
        formatStatus(row) {
            if (row.type == 1) {
                return '项目';
            } else if (row.type == 2) {
                return '人员';
            } else if (row.type == 3) {
                return '项目已绑定';
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList(val);
        },
        search() {
            this.getList(1);
        },
        getList(cpage) {
            axios
                .post('/ding/dingyun.huoquqiyedingdanliebiao', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    name: this.searchform.name,
                    current_page: cpage,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.orderList = res.data.content.list;
                        this.currentPage = res.data.content.current_page;
                        this.usePeople = res.data.corprenshu;
                        this.totalPeople = res.data.renshu;
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
        handleWatch(row) {
            this.getxmList();
            this.addFormVisible = true;
            this.dingdanid = row.id;

            // console.log(row)

            // this.$message({
            //     message: '暂未开放此功能',
            //     center: true,
            //     duration: 2000,
            //     type: 'warning'
            // });
        },
        selectkecheng(val) {
            console.log(val);
            this.xiangmuid = val;
        },
        //清空

        getxmList() {
            axios
                .post('/laowu_yun/userprojeclist', {
                    userid: this.$store.state.userData.uid,
                    newuid: this.$store.state.userData.uid,
                    // userid: '282809543527544043',
                    // corp_id: 'dingea47c602975497f935c2f4657eb6378f'
                    corp_id: this.$store.state.userData.cid,
                })
                .then((res) => {
                    this.projectlist = res.data.content;
                });
        },
        save() {
            if (!this.xiangmuid) {
                this.$message({
                    message: '未选择项目',
                    center: true,
                    duration: 2000,
                    type: 'warning',
                });
            } else {
                axios
                    .post('/laowu_yun/dingdanbangdingxiangmu', {
                        xmid: this.xiangmuid,
                        newuid: this.$store.state.userData.uid,
                        // userid: '282809543527544043',
                        // corp_id: 'dingea47c602975497f935c2f4657eb6378f'
                        did: this.dingdanid,
                    })
                    .then((res) => {
                        this.addFormVisible = false;

                        this.getList(this.currentPage);
                        this.$message({
                            message: '绑定成功',
                            center: true,
                            duration: 2000,
                            type: 'success',
                        });

                        console.log(res.data);
                    });
            }
        },
    },
    mounted() {
        this.getList(this.currentPage);
        // this.getxmList();
    },
    created() {},
};
</script>
<style lang="less">
#order_list {
    width: 100%;
    .order_list_table {
        padding-bottom: 20px;
    }
    .money_list {
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        justify-content: flex-start;
        background-color: rgb(64, 158, 255);
        color: #fff;
        padding: 10px 0;
        border-radius: 10px;
        .mlFlex {
            width: 33%;
            text-align: center;
            height: 60px;
            line-height: 28px;
            h3 {
                padding-bottom: 10px;
            }
            p {
                font-size: 16px;
            }
        }
        .el-divider--vertical {
            height: 65px;
        }
    }
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
    }
}
</style>