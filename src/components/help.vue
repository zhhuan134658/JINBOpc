<template>
    <div id="helloHelp">
        <div class="black" @click="gob">
            <i class="el-icon-arrow-left">返回</i>
        </div>

        <el-tabs :tab-position="tabPosition" @tab-click="handleClick" style="height: 100%;">
            <el-tab-pane name="twelve" label="劳务实名制简介"></el-tab-pane>
            <el-tab-pane name="one" label="创建项目"></el-tab-pane>
            <el-tab-pane name="two" label="添加班组"></el-tab-pane>
            <el-tab-pane name="three" label="人员信息"></el-tab-pane>
            <el-tab-pane name="four" label="身份证硬件录入"></el-tab-pane>
            <el-tab-pane name="five" label="劳务合同录入"></el-tab-pane>
            <el-tab-pane name="six" label="安全培训"></el-tab-pane>
            <el-tab-pane name="seven" label="工资核算"></el-tab-pane>
            <!-- <el-tab-pane name="eight" label="报盘系统"></el-tab-pane> -->
            <el-tab-pane name="nine" label="大屏幕"></el-tab-pane>
            <el-tab-pane name="ten" label="黑名单"></el-tab-pane>
            <el-tab-pane name="eleven" label="权限管理"></el-tab-pane>
        </el-tabs>
        <router-view></router-view>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
export default {
    name: 'help',
    data() {
        return {
            tabPosition: 'left'
        };
    },
    methods: {
        gob() {
            console.log('4545');
            this.$router.push({ path: '/lw' });
        },
        handleClick(tab, event) {
            console.log(tab.name);
            if (tab.name == 'one') {
                this.$router.push({ path: '/one' });
            } else if (tab.name == 'two') {
                this.$router.push({ path: '/two' });
            } else if (tab.name == 'three') {
                this.$router.push({ path: '/three' });
            } else if (tab.name == 'four') {
                this.$router.push({ path: '/four' });
            } else if (tab.name == 'five') {
                this.$router.push({ path: '/five' });
            } else if (tab.name == 'six') {
                this.$router.push({ path: '/six' });
            } else if (tab.name == 'seven') {
                this.$router.push({ path: '/seven' });
            }
            // else if (tab.name == 'eight') {
            //     this.$router.push({ path: '/eight' });
            // }
            else if (tab.name == 'nine') {
                this.$router.push({ path: '/nine' });
            } else if (tab.name == 'ten') {
                this.$router.push({ path: '/ten' });
            } else if (tab.name == 'eleven') {
                this.$router.push({ path: '/eleven' });
            } else if (tab.name == 'twelve') {
                this.$router.push({ path: '/twelve' });
            }
        }
    },
    mounted() {}
};
</script>
<style lang="less" >
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}

a {
    color: #42b983;
}
#helloHelp {
    display: flex;
    width: 60%;
    background-color: #fff;
    // border: 2px solid #e8e8e8;
    height: 100%;
    margin: 66px auto;
    .black {
        margin-top: 20px;
        width: 75px;
        i {
            font-size: 20px;
            color: #409eff;
        }
    }
    .el-collapse {
        .el-collapse-item {
            .el-collapse-item__header {
                font-size: 20px;
                padding-left: 20px;
            }
            .el-collapse-item__content {
                font-size: 15px;
                padding-left: 30px;
            }
        }
    }
    .el-icon-circle-close:before {
        color: red;
    }
    .el-tabs--left {
        .el-tabs__item {
            text-align: left !important;
        }
    }
    .el-tabs {
        margin-top: 50px;
        width: 170px;
        .el-tabs__header {
            .el-tabs__nav-scroll {
                .el-tabs__nav-wrap {
                    .el-tabs__nav {
                        .el-tabs__active-bar {
                            display: none;
                        }
                    }
                }
            }
        }
    }
    .el-tabs--left .el-tabs__nav-wrap.is-left::after,
    .el-tabs--left .el-tabs__nav-wrap.is-right::after,
    .el-tabs--right .el-tabs__nav-wrap.is-left::after,
    .el-tabs--right .el-tabs__nav-wrap.is-right::after {
        display: none;
    }
    #one {
        box-sizing: border-box;
        margin-left: -15px;
        padding-left: 50px;
        width: 80%;
        margin-top: 30px;
        padding-bottom: 10px;
        border-left: 2px solid #e4e7ed;
        h2 {
            font-size: 18px;
            margin-top: 20px;
        }
        h3 {
            margin-bottom: 20px;
        }
        .title {
            font-size: 36px;

            font-weight: 700;
            color: #262626;
        }
        p {
            color: red;
            margin: 20px 0;
        }
        .image {
            width: 100%;
            height: 400px;
            img {
                width: 80%;
                height: 80%;
            }
        }
        .warn {
            p {
                margin: 0;
                margin-top: 20px;
            }
        }
    }
}
</style>
