<template>
    <div id="Sm">
        <div style="text-align:center;margin-top: 10px;">
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
        <el-divider></el-divider>
        <!-- <vue-scroll :ops="ops" style="width:100%;height:750px" class="scroll"> -->
        <div class="sideMenuTab">
            <el-menu
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#f2f6fc"
                text-color="#000"
                active-text-color="#409EFF"
                unique-opened="true"
                collapse-transition="true"
            >
                <el-submenu
                    :index="list.xmid"
                    v-for="list in tabList"
                    :key="list.xmid"
                    v-bind:class="{'Smnomath':list.title.length<1}"
                >
                    <template slot="title">
                        <span>{{list.name}}</span>
                    </template>
                    <el-menu-item-group v-if="list.title.length > 0">
                        <el-menu-item
                            :index="sub.bzid"
                            v-for="(sub,sindex) in list.title"
                            :key="sub.bzid"
                            @click="childTable(sub.bzid,sindex,sub.name)"
                        >{{sub.name}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <div
                    v-if="tabList[0].name == '暂无数据'"
                    style="text-align:center;color:red;height: 56px;line-height: 56px;"
                >暂无数据</div>
            </el-menu>
        </div>
        <!-- <el-collapse accordion v-model="activeNames" @change="handleChange" class="cheight" >
            <el-collapse-item
                v-for="(item, index) in collapseList"
                :key="index"
                :title="item.name"
                :name="item.xmid">
                <div v-for="(item, index) in tagsData"
                    :key="item.index"
                    @click="childTable(item.bzid,index,$event)"
                    :class="{blue:inum===index}"
                >{{item.name}}</div>
            </el-collapse-item>
        </el-collapse>-->
        <!-- </vue-scroll> -->

        <div class="bton">
            <router-link :to="{name:'LG'}">
                <el-button type="primary">课程管理</el-button>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'cenav',
    props: {
        childbzid: {
            type: String
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
            form: {
                region: ''
            },
            isTable: [],
            tabList: [{ name: '', title: [] }],
            projectList: {
                pstatus: '1'
            },
            cetest: ['1']
        };
    },

    methods: {
        getTab(val) {
            const that = this;
            axios
                .post('/laowu_yun/ssuserprojeclist', {
                    corp_id: that.cid,
                      newuid:that.$store.state.userData.uid,
                    userid: that.uid,
                    pstatus: val
                })
                .then(res => {
                    if (res.data.status == 1) {
                        if (res.data.content.list.length > 0) {
                            that.tabList = res.data.content.list;
                            that.xmid = that.tabList[0].xmid;
                        } else {
                            that.tabList = [{ name: '暂无数据', title: [] }];
                            this.cetest = [];
                            this.$emit('childFn4', this.cetest);
                        }
                    } else {
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        handleChange(val) {
            axios
                .post('/laowu_yun/huquteamcontentlist', {
                    corp_id: this.cid,
                      newuid:this.$store.state.userData.uid,
                    xmid: val
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.tagsData = res.data.content;
                    } else {
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        childTable(val, index, name) {
            var url = decodeURIComponent(location);
            var urla = url.split('#')[1];
            var ssss = this.$store.state.userData.tzurl;

            this.isTable = ['1'];
            this.$store.commit('setkcbzname', name);

            this.$emit('childFn2', this.isTable);
            this.$emit('childFn', val);
            this.$emit('kecheng', '', 1);
        },

        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        selectProject(val) {
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
el-divider {
    overflow: hidden;
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
    display: flex;
    justify-content: space-between;
}
#Sm {
    height: 100%;
    .el-divider--horizontal {
        margin: 0;
        margin-top: 24px;
    }
    .Smnomath {
        // display: none;
        .el-submenu__icon-arrow {
            visibility: hidden;
        }
    }
    .el-submenu__title:hover {
        background-color: #ecf5ff !important;
    }
    .el-menu-item:hover {
        background-color: #ecf5ff !important;
    }
    .__view {
        width: 100% !important;
        .el-submenu__title {
            span {
                display: inline-block;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .el-menu {
            .el-submenu {
                .el-menu-item {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
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
#Sm .ctable {
    width: 100%;
}
#Sm .cheight {
    height: 800px;
    overflow: auto;
}

#Sm .scroll {
    border: 1px solid rgba(238, 238, 238, 0.1);
}
#Sm .bton {
    text-align: center;
}
/* .el-divider--horizontal {
    width: 106% !important;
} */
.el-collapse-item__header {
    border-bottom: 0px !important;
}
.el-collapse-item__arrow {
    display: none !important;
}
</style>
