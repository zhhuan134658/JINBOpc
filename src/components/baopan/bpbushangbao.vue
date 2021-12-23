<template>
    <div id="bzbushangbao">
        <div>
            <el-table :data="shangbapData" border style="width: 100%">
                <el-table-column type="index" label="编号" width="80"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="sex" :formatter="formatStatus" label="性别" width="55"></el-table-column>
                <el-table-column prop="time" label="时间"></el-table-column>
                <el-table-column prop="useridcode" label="身份证号"></el-table-column>
                <el-table-column prop="whtype" :formatter="formatWh" label="文化程度"></el-table-column>
                <el-table-column prop="workjineng" :formatter="formatWj" label="技能等级"></el-table-column>
                <el-table-column prop="xypingjia" :formatter="formatPj" label="企业评价"></el-table-column>
                <el-table-column label="工人操作">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleXiugai(scope.$index,scope.row)"
                            type="info"
                            plain
                        >工人上报</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align:center">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pagesize"
                    layout="prev, pager, next, jumper"
                    :total="total"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
   
<script>
import axios from 'axios';
export default {
    data() {
        return {
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            cid: this.$store.state.userData.cid,
            shangbapData: []
        };
    },

    methods: {
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTable(val);
        },
        formatStatus(row) {
            if (!row.sex) {
                return '男';
            } else {
                return row.sex;
            }
        },
        formatPj(row) {
            if (!row.xypingjia) {
                return '好';
            } else {
                return row.xypingjia;
            }
        },
        formatWh(row) {
            if (!row.whtype) {
                return '初中';
            } else {
                return row.whtype;
            }
        },
        formatWj(row) {
            if (!row.workjineng) {
                return '初级工';
            } else {
                return row.workjineng;
            }
        },
        getTable(num) {
            axios
                .post('/baopan/baopanteamxiangxilist', {
                    corp_id: this.cid,
                    bzid: this.$route.query.bzid,
                    current_page: num,
                    name: '',
                    status: '3',
                     newuid:this.$store.state.userData.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.shangbapData = res.data.content.list;
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.currentPage = res.data.content.current_page;
                    } else {
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getTable(1);
    }
};
</script>
<style >
</style>