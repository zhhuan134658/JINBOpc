<template>
    <div id="Sm">
        <!-- 班组管理使用 -->
        <div style="margin-top:10px;text-align: center;">
            <el-form ref="form" :model="projectList" label-width="80px">
                <div class="SMListTop" style="margin-bottom:10px;">
                    <el-input
                        v-model="projectList.name"
                        placeholder="请输入内容"
                        @keyup.enter.native="search"
                    ></el-input>
                    <el-button type="primary" plain @click="search">查询</el-button>
                </div>
                <div class="SMAllSelete">
                    <el-select
                        class="SMListSelect"
                        v-model="projectList.pstatus"
                        placeholder="组织架构"
                        @change="selectProject"
                    >
                        <el-option label="建设中" value="1"></el-option>
                        <el-option label="筹建中" value="2"></el-option>
                        <el-option label="已完工" value="3"></el-option>
                    </el-select>
                    <el-select
                        class="SMListSelect"
                        v-model="projectList.xmtype"
                        placeholder="项目状态"
                        @change="selectProjectType"
                    >
                        <el-option label="全部" value="全部"></el-option>
                        <el-option
                            v-for="item in projectType"
                            :label="item.type"
                            :value="item.type"
                            :key="item"
                        ></el-option>
                    </el-select>
                </div>
            </el-form>
        </div>
        <el-divider style="width:98%"></el-divider>
        <!-- <vue-scroll :ops="ops" :style="{height:(screenHeight)+'px'}" class="scroll"> -->
        <div class="sideMenuTab">
            <div class="sideMenuTabClass">
                <div
                    v-if="tabView[0].name == '暂无数据'"
                    style="text-align:center;color:red;height: 56px;line-height: 56px;"
                >暂无数据</div>
                <div v-if="tabList.length > 0">
                    <div class="sideMenuLeftTitle">项目列表：</div>
                    <el-menu
                        class="el-menu-vertical-demo"
                        background-color="#f2f6fc"
                        text-color="#000"
                        active-text-color="#409EFF"
                    >
                        <el-menu-item
                            v-for="list in tabList"
                            :index="list.xmid"
                            :key="list.xmid"
                            v-if="list.name != '暂无数据'"
                            @click="childTable(list.xmid,list.name,1)"
                        >
                            <span slot="title">{{list.name}}</span>
                        </el-menu-item>
                    </el-menu>
                </div>
                <div v-if="tabTeam.length > 0">
                    <div class="sideMenuLeftTitle">班组列表：</div>
                    <el-menu
                        class="el-menu-vertical-demo"
                        background-color="#f2f6fc"
                        text-color="#000"
                        active-text-color="#409EFF"
                    >
                        <el-menu-item
                            v-for="list in tabTeam"
                            :index="list.bzid"
                            :key="list.bzid"
                            v-if="list.name != '暂无数据'"
                            @click="childTable(list.bzid,list.name,2)"
                        >
                            <span slot="title">{{list.name}}</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </div>
            <!-- </vue-scroll> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        childbzid: {
            type: String
        },
        isTest: {
            type: Array
        }
    },
    data() {
        return {
            ops: {
                vuescroll: {},
                scrollPanel: {},
                rail: {
                    keepShow: true
                },
                bar: {
                    hoverStyle: true,
                    onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
                    background: 'rgba(64,158,255,0.4) '
                }
            },
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            xmid: '',
            tagsData: [], //班组列表,
            collapseList: [], //项目列表
            idactiveNames: ['1'],
            inum: '',
            isTable: [],
            isTest: ['1'],
            form: {
                egion: ''
            },
            tabList: [],
            screenHeight: '',
            projectList: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                pstatus: '1',
                name: '',
                xmtype: '全部',
                type: '',
                userid: this.$store.state.userData.uid
            },
            newAtest: ['1'],
            listval: '2',
            projectType: [],
            tabView: [{ name: '', title: [] }],
            tabTeam: []
        };
    },

    methods: {
        getSelectList() {
            axios
                .post('/ding_ermodule/getcorpsubject', {
                    corp_id: this.$store.state.userData.cid,
                    newuid: this.$store.state.userData.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.projectType = res.data.content[0].xmtype;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning'
                        });
                    }
                })
                .catch(function(error) {
                    this.$message({
                        message: res.data.msg,
                        center: true,
                        duration: 2000,
                        type: 'error'
                    });
                });
        },
        search() {
            this.getTab();
        },
        getTab() {
            const that = this;
            axios
                .post('/laowu_yun/corpsousuolist', this.projectList)
                .then(res => {
                    if (res.data.status == 1) {
                        that.tabList = res.data.content.project;
                        that.tabTeam = res.data.content.team;
                        if (
                            res.data.content.project.length > 0 ||
                            res.data.content.team.length > 0
                        ) {
                            that.tabView = [{ name: '', title: [] }];
                            that.xmid = that.tabList[0].xmid;
                        } else if (
                            res.data.content.project.length < 1 &&
                            res.data.content.team.length < 1
                        ) {
                            that.tabView = [{ name: '暂无数据', title: [] }];
                            that.newAtest = [];
                            that.$emit('childFn4', that.newAtest);
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        childTable(val, name, type) {
            this.isTable = ['1'];
            this.$emit('childFn7', type);
            if (type == '1') {
                axios
                    .post('/laowu_yun/xiangmuzijian', { xmid: val })
                    .then(res => {
                        if (res.data.status == 1) {
                            console.log(res.data.msg);
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                this.$emit('childFn', val);
            } else if (type == '2') {
                this.$emit('childFn8', val);
            }
            this.$emit('childFn2', this.isTable);

            this.$parent.getTeam(1);
        },
        selectProject(val) {
            this.listval = val;
            this.projectList.pstatus = val;
            // this.$emit('childFn5', val);
            this.getTab();
        },
        selectProjectType(val) {
            this.projectList.xmtype = val;
            // this.$emit('childFn5', val);
            this.getTab();
        }
    },
    created() {},
    mounted() {
        this.getTab(1);
        this.getSelectList();
    }
};
</script>
<style lang="less">
.el-collapse .el-collapse div {
    text-align: center;
    line-height: 40px;
}
.el-collapse .el-collapse div:hover {
    color: #eee;
    background-color: #409eff;
}

.cdiv1 {
    width: 100% !important;
}
#rindex {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
#Sm .el-collapse-item__content div {
    padding: 6px 0 6px 10px;
}
#insidezi {
    #Sm {
        width: 240px;
        .SMListTop {
            display: flex;
            width: 90%;
            margin: 0 auto;
            margin-bottom: 10px;
        }
        .SMAllSelete {
            display: flex;
            width: 90%;
            margin: 0 auto;
            .SMListSelect {
                width: 50%;
            }
        }

        .el-divider--horizontal {
            margin: 0;
            margin-top: 24px;
        }
        .el-menu-item:hover {
            background-color: #ecf5ff !important;
        }
        .el-menu-item {
            span {
                display: inline-block;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .sideMenuTab {
            height: 74%;
            overflow: hidden;
            .sideMenuTabClass {
                height: 100%;
                overflow-y: scroll;
            }
            .sideMenuTabClass::-webkit-scrollbar {
                display: none;
            }
        }
    }
}

#Sm .blue {
    background-color: #eaf5fc;
    color: #409eff;
}
#Sm .el-collapse-item__header {
    padding-left: 5px;
    background-color: #eff6ff;
}
#Sm .el-collapse-item__content div {
    padding: 6px 0 6px 20px;
}
#Sm .el-collapse-item__wrap {
    background-color: #eff6ff;
}
#Sm .el-menu-item.is-active {
    background-color: #eaf5fc !important;
}
#Sm .scroll {
    width: 100%;
}
</style>