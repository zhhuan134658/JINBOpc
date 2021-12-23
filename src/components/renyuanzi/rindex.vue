<template>
    <div id="rindex">
        <div class="rindexCnav cnav">
            <sideMenu
                @childFn="parentFn"
                @childFn2="parentFn2"
                @childFn3="parentFn3"
                @childFn4="parentFn4"
                @childFn5="parentFn5"
            ></sideMenu>
        </div>

        <keep-alive :include="includePages">
            <router-view
                @getChild="childFn"
                :bzid="bzid"
                :isTable="isTable"
                :getbzname="getbzname"
                :newtest="newtest"
                :workType="workType"
            ></router-view>
        </keep-alive>
    </div>
</template>

<script>
import axios from 'axios';
import sideMenu from '../common/sideMenu4.vue';
export default {
    name: 'rindex',
    components: { sideMenu },
    data() {
        return {
            includePages: ['ctable'],
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            istag: true,
            searchform: { name: '' },
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            // xmid: '',
            bzid: '',
            idactiveNames: ['1'],
            peopleList: [],
            isTable: [],
            getbzname: '',
            newtest: ['1'],
            workType: ''
        };
    },

    methods: {
        parentFn(payload) {
            this.bzid = payload;
        },
        parentFn3(payload) {
            this.getbzname = payload;
        },
        parentFn4(payload) {
            this.newtest = [];
        },
        parentFn2(payload) {
            this.isTable = payload;
        },
        parentFn5(payload) {
            this.workType = payload;
        },
        childFn(payload) {
            this.isTable = payload;
        },
        created: function() {
            this.total = this.tableData.length;
        },
        current_change: function(currentPage) {
            this.currentPage = currentPage;
        },
        getTable(valname, num) {
            axios
                .post('/laowu_yun/teamxiangxiuserlist', {
                    corp_id: this.cid,
                     newuid:this.$store.state.userData.uid,
                    bzid: this.bzid,
                    current_page: num,
                    name: valname
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.peopleList = res.data.content.list;
                        this.currentPage = res.data.content.current_page;
                    } else {
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTable(this.searchform.name, val);
        },
        search() {
            this.getTable(this.searchform.name, 1);
        }
    },
    mounted() {
        // this.getTab();
    }
};
</script>
<style>
.bulu {
    padding: 12px 20px !important;
}

.el-collapse .el-collapse div {
    text-align: center;
    line-height: 40px;
}
.el-collapse .el-collapse div:hover {
    color: #409eff;
    background-color: #eeeeee;
}

.cdiv1 {
    width: 100% !important;
}
#rindex {
    width: 100%;
    height: 100%;
    /* overflow-y: auto; */
    /* margin-left: 217px; */
    margin-top: 17px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
}

#rindex .ctable {
    /* margin-left: 10px; */
    background-color: #fff;
    padding: 10px;
    border: 1px solid #dcdfe6;
}
.right-topheader {
    display: flex;
    justify-content: space-between;
}
</style>


