<template>
    <div id="money_set">
        <div class="msContent">
            <div class="msTop">
                <div class="msLeft">
                    <el-button type="primary" plain @click="back">返回</el-button>
                    <div class="msLeftWord">
                        <h3>{{bzname}}</h3>
                        <p>{{moneyMonth.replace(/-/,'年')}}月</p>
                    </div>
                </div>
                <div class="msTopNav">
                    <el-menu
                        :default-active="$route.path"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#fff"
                        text-color="#000"
                        active-text-color="#fff"
                        router
                    >
                        <el-menu-item index="/money_ding">
                            <span>1</span>人员定薪
                        </el-menu-item>
                        <el-menu-item index="/money_he">
                            <span>2</span>两薪核对
                        </el-menu-item>
                        <el-menu-item index="/money_send">
                            <span>3</span>发送薪资条
                        </el-menu-item>
                    </el-menu>
                </div>
            </div>
            <div class="msMain">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'money_set',
    // props: {
    //     xmid: {
    //         type: String
    //     },
    //     isTable: {
    //         type: Array
    //     },
    //     aname: {
    //         type: String
    //     },
    //     newAtest: {
    //         type: Array
    //     }
    // },
    data() {
        return {
            cid: this.$store.state.userData.cid,
            bzname: this.$store.state.userData.salaryBzName,
            bzid: this.$store.state.userData.salaryBzid,
            xmid: '',
            activeIndex2: '/money_ding',
            moneyMonth: this.$store.state.userData.salaryMonth
        };
    },
    methods: {
        back() {
            this.$router.push({
                path: '/money_check'
            });
        }
    },
    mounted() {
        // this.xmid = this.$route.query.xmid;
        // this.bzname = this.$route.query.bzname;
        // this.moneyMonth = this.$route.query.time;
        // this.bzid = this.$route.query.bzid;
        // this.objBZM.bzid = this.$route.query.bzid;
        // this.objBZM.moneyMonth = this.$route.query.time;
    },
    created() {},
    activated() {
        this.bzname = this.$store.state.userData.salaryBzName;
    },
    computed: {
        // activeIndex2(){
        //     if(this.$route.path == )
        // }
    }
    // watch: {
    //     aname(val) {
    //         this.aname = val;
    //     },
    //     xmid(val) {
    //         this.xmid = val;
    //     }
    // }
};
</script>
<style lang="less">
#money_set {
    height: 100%;
    overflow-y: auto;
    .msContent {
        .msTop {
            height: 60px;
            position: relative;
            border-bottom: 1px solid #e6e6e6;
            .msLeft {
                position: absolute;
                top: 0;
                left: 10px;
                display: flex;
                .el-button {
                    margin-top: 11px;
                }
                .msLeftWord {
                    padding-top: 15px;
                    margin-left: 10px;
                    h3 {
                        padding-bottom: 6px;
                        font-size: 14px;
                    }
                    p {
                        font-size: 12px;
                    }
                }
            }
            .msTopNav {
                width: 430px;
                margin: 0 auto;
                height: 60px;
                line-height: 60px;
                .el-menu--horizontal > .el-menu-item {
                    // height: 40px;
                    // line-height: 40px;
                    padding: 0 30px;
                    border: 0;
                    span {
                        display: inline-block;
                        margin: 0 6px;
                        height: 60px;
                        line-height: 63px;
                    }
                }
                .is-active {
                    background-color: #4090ef !important;
                }
            }
        }
    }
}
</style>