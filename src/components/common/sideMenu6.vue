<template>
    <div id="Sm">
        <!-- 备用侧边栏 -->
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
                    <el-button
                        type="primary"
                        plain
                        v-for="(item,index) in statusList"
                        @click="statusClick(index,item.id)"
                        :class="active==index ? 'blue' : '' "
                        :key="index"
                    >{{item.name}}</el-button>
                </div>
            </el-form>
        </div>
        <el-divider style="width:98%"></el-divider>
        <div class="sideMenuTab">
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
                    @click="childTable(list.xmid,list.name,list.address)"
                >
                    <span slot="title">{{list.name}}</span>
                </el-menu-item>
            </el-menu>
            <div
                v-if="tabList[0].name == '暂无数据'"
                style="text-align:center;color:red;height: 56px;line-height: 56px;"
            >暂无数据</div>
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
            tabList: [{ name: '', title: [] }],
            screenHeight: '',
            projectList: {
                pstatus: '1',
                name: '',
                type: ''
            },
            newAtest: ['1'],
            listval: '2',
            active: 0,
            lvalue: 1,
            statusList: [
                { id: '1', name: '组织架构' },
                { id: '2', name: '项目状态' }
            ]
        };
    },

    methods: {
        getTab(val) {
            const that = this;
            axios
                .post('/laowu_yun/ssuserprojeclist', {
                    corp_id: that.cid,
                    userid: that.uid,
                    pstatus: val,
                     newuid:that.$store.state.userData.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        if (res.data.content.list.length > 0) {
                            that.tabList = res.data.content.list;
                            that.xmid = that.tabList[0].xmid;
                        } else {
                            that.tabList = [{ name: '暂无数据', title: [] }];
                            that.newAtest = [];
                            that.$emit('childFn4', that.newAtest);
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        statusClick(index, value) {
            this.active = index;
            this.lvalue = value;
        },
        childTable(val, name, address) {
            this.isTable = ['1'];
            this.$emit('childFn2', this.isTable);
            this.$emit('childFn', val);
            this.$emit('childFn3', name);
            this.$parent.getTeam();
        },
        selectProject(val) {
            this.listval = val;
            this.$emit('childFn5', val);
            this.getTab(val);
        }
    },
    created() {},
    mounted() {
        this.getTab(1);
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
            .el-button {
                width: 50%;
                margin-left: 0;
                border-radius: 0;
            }
            .el-button:nth-child(1) {
                border-top-left-radius: 16px;
                border-bottom-left-radius: 16px;
            }
            .el-button:nth-child(2) {
                border-top-right-radius: 16px;
                border-bottom-right-radius: 16px;
                margin-left: -1px;
            }

            .blue {
                background-color: #409eff;
                color: #fff;
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
            // .el-menu-vertical-demo {
            //     height: 100%;
            //     overflow-y: scroll;
            // }
            // .el-menu-vertical-demo::-webkit-scrollbar {
            //     display: none;
            // }
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