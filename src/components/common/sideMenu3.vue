<template>
    <div id="Sm">
        <div style="margin-top:10px;text-align: center;">
            <el-form ref="form" :model="projectList" label-width="80px">
                <el-select
                    v-model="projectList.pstatus"
                    placeholder="请选择活动区域"
                    @change="selectProject"
                >
                    <el-option label="建设中项目" value="1"></el-option>
                    <el-option label="筹建中项目" value="2"></el-option>
                    <el-option label="已完工项目" value="3"></el-option>
                </el-select>
            </el-form>
        </div>
        <el-divider style="width:98%"></el-divider>
        <!-- <vue-scroll :ops="ops" :style="{height:(screenHeight)+'px'}" class="scroll"> -->
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
        <!-- </vue-scroll> -->
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
                pstatus: '1'
            },
            newAtest: ['1'],
            listval: '2',
            watchPath: ''
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
        childTable(val, name, address) {
            this.$store.commit('setSalaryXmid', val);
            this.isTable = ['1'];
            if (
                this.watchPath == '/money_check' ||
                this.watchPath == '/money_he' ||
                this.watchPath == '/money_ding' ||
                this.watchPath == '/money_derive' ||
                this.watchPath == '/money_send' ||
                this.watchPath == '/money_send_right'
            ) {
                this.$router.push({ path: '/money_check' });
            } else if (
                this.watchPath == '/money' ||
                this.watchPath == '/money_tip_send'
            ) {
                this.$router.push({ path: '/money' });
            } else if (this.watchPath == '/money_leaf') {
                this.$router.push({ path: '/money_leaf' });
            }
            this.$emit('childFn2', this.isTable);
            this.$emit('childFn', val);
            this.$emit('childFn3', name);
            // this.getTab(this.listval);
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
    },
    watch: {
        isTest: {
            handler(newValue, oldValue) {
                if (newValue.length < 1) {
                    this.getTab(this.listval);
                }
            },
            deep: true
        },
        $route(to, from) {
            this.watchPath = to.path;
        }
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
#salary {
    #Sm {
        width: 240px;
        height: 100%;
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
            .el-menu-vertical-demo {
                height: 100%;
                overflow-y: scroll;
            }
            .el-menu-vertical-demo::-webkit-scrollbar {
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