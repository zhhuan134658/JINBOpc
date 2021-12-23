<template>
    <div id="appLaowu">
        <div id="laowu">
            <div class="cebian">
                <el-menu
                    class="el-menu-vertical-demo lwmenu"
                    @open="handleOpen"
                    mode="vertical"
                    @close="handleClose"
                    background-color="#409EFF"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :unique-opened="uopen"
                    :collapse-transition="ctran"
                    :router="true"
                    :default-active="activeIndex"
                    @select="selectItems"
                >
                    <el-menu-item index="/appIndex">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="/cg">
                        <i class="el-icon-menu"></i>
                        <span slot="title">项目管理</span>
                    </el-menu-item>
                    <el-menu-item index="/inside">
                        <i class="el-icon-s-release"></i>
                        <span slot="title">班组管理</span>
                    </el-menu-item>
                    <el-menu-item index="/rindex">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">人员管理</span>
                    </el-menu-item>
                    <el-menu-item index="/contract">
                        <i class="el-icon-s-management"></i>
                        <span slot="title">劳动合同</span>
                    </el-menu-item>
                    <el-menu-item index="/LS">
                        <i class="el-icon-message-solid"></i>
                        <span slot="title">安全培训</span>
                    </el-menu-item>
                    <el-submenu index="/salary">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>薪资管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/money_check">薪资核算</el-menu-item>
                            <el-menu-item index="/money">工资条</el-menu-item>
                            <!-- <el-menu-item index="/money_leaf">离场结算</el-menu-item> -->
                            <el-menu-item index="/gongzi">薪资报表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="/attence">
                        <i class="el-icon-data-line"></i>
                        <span slot="title">考勤数据</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="/baopan">
                        <i class="el-icon-upload"></i>
                        <span slot="title">报盘系统</span>
                    </el-menu-item> -->
                    <el-menu-item index="/screen">
                        <i class="el-icon-s-platform"></i>
                        <span slot="title">大屏幕</span>
                    </el-menu-item>
                    <el-menu-item index="/blackp">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">黑名单</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="/order">
                        <i class="el-icon-finished"></i>
                        <span slot="title">订单详情</span>
                    </el-menu-item> -->
                    <el-menu-item index="/print">
                        <i class="el-icon-printer"></i>
                        <span slot="title">打印管理</span>
                    </el-menu-item>
                    <el-menu-item index="/system">
                        <i class="el-icon-key"></i>
                        <span slot="title">权限管理</span>
                    </el-menu-item>
                    <el-menu-item index="/warningcertificates">
                        <i class="el-icon-key"></i>
                        <span slot="title">预警证书</span>
                    </el-menu-item>
                    <el-menu-item index="/player">
                        <i class="el-icon-key"></i>
                        <span slot="title">课程test</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div id="appLaowuContent">
                <keep-alive :include="include">
                    <router-view :saView="saView"></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';

export default {
    name: 'laowu',
    props: {
        Needname: {
            type: String,
        },
    },
    data() {
        return {
            include: ['lwsecurity', 'rindex', 'insidezi', 'salary', 'baopan'],
            tabPosition: 'left',
            activeName: 'first',

            saView: ['1'],
            uopen: true,
            ctran: true,
            cid: this.$store.state.userData.cid,
            corp_name: '',
            leftList: [
                { name: 'twelve', label: '首页', icon: 'el-icon-s-home' },
                { name: 'nine', label: '项目管理', icon: 'el-icon-menu' },
                { name: 'two', label: '班组管理', icon: 'el-icon-s-release' },
                { name: 'one', label: '人员管理', icon: 'el-icon-s-custom' },
                {
                    name: 'four',
                    label: '劳动合同',
                    icon: 'el-icon-s-management',
                },
                {
                    name: 'three',
                    label: '安全培训',
                    icon: 'el-icon-message-solid',
                },
                {
                    name: 'seven',
                    label: '工资核算',
                    icon: 'iconfont iconqian2',
                },
                {
                    name: 'eight',
                    label: '工资发放情况',
                    icon: 'iconfont iconqian2',
                },
                // {
                //     name: 'attence',
                //     label: '考勤数据',
                //     icon: 'el-icon-data-line'
                // },
                { name: 'ten', label: '报盘系统', icon: 'el-icon-upload' },
                { name: 'six', label: '大屏幕', icon: 'el-icon-s-platform' },
                { name: 'five', label: '黑名单', icon: 'el-icon-s-order' },
                { name: 'eleven', label: '权限管理', icon: 'el-icon-key' },
            ],
            activityIndex: 0,
            activeIndex: '/appIndex',
        };
    },
    methods: {
        created: function () {
            this.total = this.tableData.length;
        },
        current_change: function (currentPage) {
            this.currentPage = currentPage;
        },
        getBasic(val) {
            axios
                .post('/laowu_yun/morenaddjc', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    name: '',
                    module: '1',
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.peopleList = res.data.content.list;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        selectItems(index, ikey) {
            if (index == '/gongzi') {
                this.saView = [];
            } else {
                this.saView = ['2'];
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
    },
    mounted() {
        //高亮
        // if (this.$route.matched[0].path == '/lw') {
        //     this.activeIndex == '/appIndex';
        // } else {
        //     this.activeIndex = this.$route.matched[0].path;
        // }
        this.getBasic();
    },
    watch: {
        $route(to, from) {
            // this.activeIndex = to.path;
            console.log('1456+++' + to.path);
        },
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        },
        // activeIndex() {
        //     console.log('555++' + this.$route.path);
        //     // this.$store.commit('setRouterUrl', this.$route.path);
        //     // }
        //     if (
        //         this.$route.path == '/system' ||
        //         this.$route.path == '/Qxfour' ||
        //         this.$route.path == '/Qxthree' ||
        //         this.$route.path == '/Qxtwo' ||
        //         this.$route.path == '/Qxone'
        //     ) {
        //         return '/system';
        //     } else if (
        //         this.$route.path == '/inside' ||
        //         this.$route.path == '/inz' ||
        //         this.$route.path == '/staff' ||
        //         this.$route.path == '/addt' ||
        //         this.$route.path == '/editteam'
        //     ) {
        //         return '/inside';
        //     } else if (
        //         this.$route.path == '/rindex' ||
        //         this.$route.path == '/ctable' ||
        //         this.$route.path == '/duqu' ||
        //         this.$route.path == '/chakan' ||
        //         this.$route.path == '/lichang' ||
        //         this.$route.path == '/leaf'
        //     ) {
        //         return '/rindex';
        //     } else if (
        //         this.$route.path == '/blackp' ||
        //         this.$route.path == '/black' ||
        //         this.$route.path == '/share'
        //     ) {
        //         return '/blackp';
        //     } else if (
        //         this.$route.path == '/LS' ||
        //         this.$route.path == '/LG' ||
        //         this.$route.path == '/LP' ||
        //         this.$route.path == '/LN' ||
        //         this.$route.path == '/LL'
        //     ) {
        //         return '/LS';
        //     } else if (
        //         this.$route.path == '/baopan' ||
        //         this.$route.path == '/bpxq' ||
        //         this.$route.path == '/bpbang' ||
        //         this.$route.path == '/bplr' ||
        //         this.$route.path == '/bpcj' ||
        //         this.$route.path == '/bpbz' ||
        //         this.$route.path == '/bphenan' ||
        //         this.$route.path == '/bpbanzuhenan' ||
        //         this.$route.path == '/bpall' ||
        //         this.$route.path == '/bpbplianlr' ||
        //         this.$route.path == '/bpbanzulian' ||
        //         this.$route.path == '/bpcanjianlian' ||
        //         this.$route.path == '/bpallcj' ||
        //         this.$route.path == '/bpbanzuall' ||
        //         this.$route.path == '/bpchakan' ||
        //         this.$route.path == '/bpshang' ||
        //         this.$route.path == '/bpbushang' ||
        //         this.$route.path == '/bpyshang' ||
        //         this.$route.path == '/bphefei' ||
        //         this.$route.path == '/bpbanzuhefei' ||
        //         this.$route.path == '/bphubei' ||
        //         this.$route.path == '/bphubeicj' ||
        //         this.$route.path == '/bpbanzuhubei'
        //     ) {
        //         return '/baopan';
        //     } else if (this.$route.path == '/appIndex') {
        //         return '/appIndex';
        //     } else if (
        //         this.$route.path == '/cg' ||
        //         this.$route.path == '/demobj' ||
        //         this.$route.path == '/daddn'
        //     ) {
        //         return '/cg';
        //     } else if (this.$route.path == '/contract') {
        //         return '/contract';
        //     } else if (this.$route.path == '/screen') {
        //         return '/screen';
        //     } else if (this.$route.path == '/attence') {
        //         return '/attence';
        //     } else if (
        //         this.$route.path == '/money' ||
        //         this.$route.path == '/money_tip_send'
        //     ) {
        //         return '/money';
        //     } else if (this.$route.path == '/gongzi') {
        //         return '/gongzi';
        //     } else if (
        //         this.$route.path == '/money_check' ||
        //         this.$route.path == '/money_set' ||
        //         this.$route.path == '/money_ding' ||
        //         this.$route.path == '/money_he' ||
        //         this.$route.path == '/money_send' ||
        //         this.$route.path == '/money_send_right' ||
        //         this.$route.path == '/money_derive'
        //     ) {
        //         return '/money_check';
        //     } else if (this.$route.path == '/money_leaf') {
        //         return '/money_leaf';
        //     }
        // }
    },
};
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
}
.el-collapse-item__wrap {
    border-bottom: 0;
}
.el-collapse-item__content {
    padding-bottom: 0;
    color: #606266 !important;
}
#appLaowu {
    height: 100%;
    width: 100%;
    margin-top: 66px;
    background-color: #409eff;
    #appLaowuContent {
        width: 90%;
        // height: 100%;
        background-color: #f2f6fc;
        display: flex;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 200px;
        margin-top: 66px;
        overflow: hidden;
    }
    @media screen and (min-width: 1700px) and (max-width: 1920px) {
        #appLaowuContent {
            width: 90%;
        }
    }
    @media screen and (min-width: 1500px) and (max-width: 1700px) {
        #appLaowuContent {
            width: 88%;
        }
    }
    @media screen and (max-width: 1500px) {
        #appLaowuContent {
            width: 86%;
        }
    }
}
#laowu {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    // background-color: #f2f6fc;
}
.lwmenu {
    .el-submenu,
    .el-menu-item {
        width: 100%;
    }
}
.lwmenu .el-submenu__title i,
.lwmenu .el-menu-item i {
    color: #fff;
}

/* 侧边导航栏 */
#laowu .el-collapse-item__header {
    font-size: 15px !important;
    color: #606266 !important;
    line-height: 2.5;
    height: auto;
}
#laowu .el-tabs__item {
    text-align: left;
    color: #fff;
    padding-left: 40px;
}
#laowu .el-tabs__nav-scroll {
    background-color: #409eff;
}
#laowu .el-tabs .el-tabs__header {
    width: 200px;
    margin-right: 0;
    position: fixed;
    /* padding-right: 1%; */
}
#laowu .el-tabs__item.is-active {
    background-color: #1b84e6;
    color: #ffffff;
    /* margin: 0 10px; */
    border-radius: 5px;
    box-sizing: border-box;
}

#laowu .is-left .el-tabs__nav-scroll {
    width: 200px;
    /* position: fixed; */
    z-index: 999;
}
#laowu .cnav {
    width: 240px;
    height: 100%;
    border: 1px solid #eeeeee;
}

.body {
    width: 80%;
}
/*输入框*/
#laowu .el-tab-pane {
    display: flex;
    height: 100%;
    overflow: hidden;
}
#laowu .el-tab-pane .cnav {
    width: 240px;
    height: 100%;
    border: 1px solid #eee;
    background-color: #eff6ff;
}

.el-collapse .el-collapse div {
    text-align: center;
    line-height: 40px;
}
.el-collapse .el-collapse div:hover {
    color: #409eff;
    background-color: #eee;
}

.cdiv1 {
    width: 100% !important;
}

/* 次级树状 */
#laowu .el-tree-node__label {
    font-size: 17px !important;
}

#laowu .xianshi {
    width: 100%;

    height: 40px;
    line-height: 40px;
}

.fdiv {
    height: 40px;
    border: 1px solid blue;
}
.anquan #Sm {
    width: 15%;
}
#contract {
    // margin-left: 217px;
    margin-top: 17px;
}
#black,
#screen,
#attence {
    // margin-left: 200px;
    margin-top: 17px;
}
#laowu .cebian {
    width: 200px;
    margin-top: 66px;
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: #409eff;
    color: #fff;
    overflow: hidden;
    ul {
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
    ul::-webkit-scrollbar {
        display: none;
    }
}
// #laowu .cebian::-webkit-scrollbar {
//     display: none;
// }
// #laowu .cebian

// #laowu .cebian li {
//     width: 100%;
//     height: 50px;
//     line-height: 50px;
//     padding-left: 40px;
//     padding-right: 20px;
//     cursor: pointer;
// }
// #laowu .cebian li .iconfont {
//     font-size: 14px;
// }
// .activityCss {
//     background-color: #1b84e6;
//     color: #fff;
//     border-radius: 5px;
//     box-sizing: border-box;
// }
</style>
