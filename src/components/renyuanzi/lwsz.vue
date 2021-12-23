<template>
    <div id="train">
        <div class="trainSide">
            <sideMenu
                @childFn="parentFn"
                @childFn2="parentFn2"
                @childFn3="parentFn3"
                @childFn4="parentFn4"
            ></sideMenu>
        </div>

        <keep-alive :include="includePages">
            <router-view
                @getChild="childFn"
                :bzid="bzid"
                :isTable="isTable"
                :getbzname="getbzname"
                :newtest="newtest"
            ></router-view>
        </keep-alive>
    </div>
</template>
<script>
import axios from 'axios';
import sideMenu from '../common/sideMenu7.vue';
export default {
    name: 'train',
    components: { sideMenu },
    data() {
        return {
            includePages: ['LS'],
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
            newtest: ['1']
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
        childFn(payload) {
            this.isTable = payload;
        },
        getTable(type, num) {
            axios
                .post('/laowu_yun/teamxiangxiuserlist', {
                    corp_id: this.cid,
                     newuid:this.$store.state.userData.uid,
                    bzid: this.bzid,
                    current_page: num
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
        }
    },
    mounted() {
        // this.getTab();
    }
};
</script>
<style lang="less">
#train {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 17px;
    overflow: hidden;
}
</style>

