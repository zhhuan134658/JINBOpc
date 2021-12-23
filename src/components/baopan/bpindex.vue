<template>
    <div id="baopan">
        <div class="cnav">
            <sideMenu2
                @childFn="parentFn"
                @childFn2="parentFn2"
                @childFn3="parentFn3"
                @childFn4="parentFn4"
                :isTest="isTest"
            ></sideMenu2>
        </div>
        <div class="content">
            <router-view
                @getChild="childFn"
                @getChild3="childFn3"
                :xmid="xmid"
                :isTable="isTable"
                :aname="aname"
                :newAtest="newAtest"
            ></router-view>
        </div>
    </div>
</template>
   
<script>
import axios from 'axios';
import sideMenu2 from '../common/sideMenu2.vue';

export default {
    components: { sideMenu2 },
    name: 'baopan',

    data() {
        return {
            newAtest: ['1'],
            listval: '',
            isTable: [],
            isTest: ['1'],
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            xmid: '',
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1 //默认开始页面
        };
    },

    methods: {
        parentFn(payload) {
            this.xmid = payload;
            console.log(this.xmid);
        },
        parentFn3(payload) {
            this.aname = payload;
            console.log(this.aname);
        },
        parentFn4(payload) {
            this.newAtest = [];
            console.log(this.newAtest);
        },
        parentFn2(payload) {
            this.isTable = payload;
            console.log(this.isTable);
        },
        childFn(payload) {
            this.isTable = payload;
        },
        childFn3() {
            this.isTest = [];
        }
        // getTable() {
        //     axios
        //         .post('/baopan/projectsbxinxilist', {
        //             corp_id: this.cid,
        //             xmid: this.xmid
        //         })
        //         .then(res => {
        //             if (res.data.status == 1) {
        //                 this.baopanData = res.data.content;
        //             } else {
        //             }
        //         })
        //         .catch(function(error) {
        //             console.log(error);
        //         });
        // }
    },

    mounted() {}
};
</script>
<style lang="less">
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
#baopan {
    margin-top: 17px;
    // margin-left: 217px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

#baopan .ctable {
    width: 100%;
    /* margin-left: 20px; */
    background-color: #fff;
    padding: 10px;
}
/* #baopan .right-topheader {
    display: flex;
    justify-content: space-between;
} */
#baopan .content {
    width: 100%;
    overflow-y: auto;
    background-color: #fff;
    .el-input-group__prepend {
        width: 160px;
        text-align: center;
    }
}
#baopan .content::-webkit-scrollbar {
    display: none;
}
</style>