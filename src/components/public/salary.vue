<template>
    <div id="salary">
        <div class="cnav" v-if="moneyView">
            <sideMenu
                @childFn="parentFn"
                @childFn2="parentFn2"
                @childFn3="parentFn3"
                @childFn4="parentFn4"
                :isTest="isTest"
            ></sideMenu>
        </div>
        <div class="content">
            <keep-alive :include="kInclude">
                <router-view
                    @getChild="childFn"
                    @getChild3="childFn3"
                    :xmid="xmid"
                    :isTable="isTable"
                    :aname="aname"
                    :newtest="newtest"
                ></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import sideMenu from '../common/sideMenu3';
export default {
    name: 'salary',
    components: { sideMenu },
    props: {
        saView: {
            type: Array
        }
    },
    data() {
        return {
            kInclude: [
                'money_check',
                'money_set',
                'money_leaf',
                'money',
                'gongzi'
            ],
            newAtest: ['1'],
            listval: '',
            isTable: [],
            isTest: ['1'],
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            xmid: '',
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            aname: '',
            moneyView: true
        };
    },

    methods: {
        parentFn(payload) {
            this.xmid = payload;
        },
        parentFn3(payload) {
            this.aname = payload;
        },
        parentFn4(payload) {
            this.newAtest = [];
        },
        parentFn2(payload) {
            this.isTable = payload;
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

    mounted() {},
    watch: {
        saView: {
            handler(newValue, oldValue) {
                if (newValue.length < 1 || oldValue.length < 1) {
                    this.moneyView = false;
                } else {
                    this.moneyView = true;
                }
            },
            deep: true,
            immediate: true
        },
        $route(to, from) {
            if (to.path == '/gongzi') {
                this.moneyView = false;
            } else {
                this.moneyView = true;
            }
        }
    }
};
</script>
<style lang="less">
#salary {
    // margin-left: 217px;
    margin-top: 17px;
    height: 100%;
    width: 100%;
    display: flex;
    .content {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #fff;
    }
}
#salary #money_check::-webkit-scrollbar,
#salary #money::-webkit-scrollbar,
#salary #money_leaf::-webkit-scrollbar，#salary #gongzi::-webkit-scrollbar,
#salary .content::-webkit-scrollbar {
    display: none;
}
</style>