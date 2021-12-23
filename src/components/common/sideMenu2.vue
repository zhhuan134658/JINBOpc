<template>
    <!-- 报盘左侧选择项目 -->
    <div id="Sm">
        <div style="margin-top: 10px; text-align: center">
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
        <el-divider style="width: 98%"></el-divider>
        <div class="sideMenuTab">
            <div
                v-if="tabList[0].name == '暂无数据'"
                style="
                    text-align: center;
                    color: red;
                    height: 56px;
                    line-height: 56px;
                "
            >
                暂无数据
            </div>
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
                    @click="childTable(list.xmid, list.name, list.address)"
                >
                    <span slot="title">{{ list.name }}</span>
                </el-menu-item>
            </el-menu>
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
                pstatus: '1'
            },
            newAtest: ['1'],
            listval: '1'
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
                    newuid: that.$store.state.userData.uid
                })
                .then((res) => {
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
                .catch(function (error) {
                    console.log(error);
                });
        },
        childTable(val, name, address) {
            this.isTable = ['1'];
            this.$emit('childFn2', this.isTable);
            this.$emit('childFn', val);
            this.$emit('childFn3', name);
            if (address) {
                this.sendMsg(val, address);
                switch (address) {
                    case '3':
                        this.$router.push({
                            name: 'bpxq',
                            query: { xmid: val }
                        });
                        break;
                    case '2':
                        this.$router.push({
                            name: 'bphenan',
                            query: { xmid: val }
                        });
                        break;
                    case '1':
                        this.$router.push({
                            name: 'bpall',
                            query: { xmid: val }
                        });
                        break;
                    case '4':
                        this.$router.push({
                            name: 'bplian',
                            query: { xmid: val }
                        });
                        break;
                    case '5':
                        this.$router.push({
                            name: 'bphefei',
                            query: { xmid: val }
                        });
                        break;
                    case '6':
                        this.$router.push({
                            name: 'bphubei',
                            query: { xmid: val }
                        });
                        break;
                    case '7':
                        this.$router.push({
                            name: 'bphunan',
                            query: { xmid: val }
                        });
                        break;
                    case '8':
                        this.$router.push({
                            name: 'bpfujian',
                            query: { xmid: val }
                        });
                        break;
                    case '10':
                        this.$router.push({
                            name: 'bpbeijing',
                            query: { xmid: val }
                        });
                        break;
                    case '11':
                        this.$router.push({
                            name: 'bpningbo',
                            query: { xmid: val }
                        });
                        break;
                    case '12':
                        this.$router.push({
                            name: 'bpwuhu',
                            query: { xmid: val }
                        });
                        break;
                    case '13':
                        this.$router.push({
                            name: 'bpdalian',
                            query: { xmid: val }
                        });
                        break;
                    case '14':
                        this.$router.push({
                            name: 'bphangzhou',
                            query: { xmid: val }
                        });
                        break;
                    case '15':
                        this.$router.push({
                            name: 'bpktp',
                            query: { xmid: val }
                        });
                        break;
                    case '16':
                        this.$router.push({
                            name: 'bpliaoning',
                            query: { xmid: val }
                        });
                        break;
                    case '17':
                        this.$router.push({
                            name: 'bpchuzhou',
                            query: { xmid: val }
                        });
                        break;
                    case '18':
                        this.$router.push({
                            name: 'bpsuzhong',
                            query: { xmid: val }
                        });
                        break;
                    case '19':
                        this.$router.push({
                            name: 'bpguizhou',
                            query: { xmid: val }
                        });
                        break;
                    case '20':
                        this.$router.push({
                            name: 'bpquanzhou',
                            query: { xmid: val }
                        });
                        break;
                    case '21':
                        this.$router.push({
                            name: 'bpsichuan',
                            query: { xmid: val }
                        });
                        break;
                    case '22':
                        this.$router.push({
                            name: 'bpfoshan',
                            query: { xmid: val }
                        });
                        break;
                    case '23':
                        this.$router.push({
                            name: 'bpyichang',
                            query: { xmid: val }
                        });
                        break;
                    case '24':
                        this.$router.push({
                            name: 'bphonghe',
                            query: { xmid: val }
                        });
                        break;
                    case '25':
                        this.$router.push({
                            name: 'bptianjin',
                            query: { xmid: val }
                        });
                        break;
                    case '26':
                        this.$router.push({
                            name: 'bphefeishi',
                            query: { xmid: val }
                        });
                        break;
                    case '27':
                        this.$router.push({
                            name: 'bpjiaxing',
                            query: { xmid: val }
                        });
                        break;
                         case '28':
                        this.$router.push({
                            name: 'bpjingzhou',
                            query: { xmid: val }
                        });
                        break;
                    case '29':
                      this.$router.push({
                        name: 'bpxishuangbanna',
                        query: { xmid: val }
                      });
                      break;
                }
            } else {
                this.$router.push({
                    name: 'bpbang',
                    query: { xmid: val }
                });
            }
        },
        sendMsg(xid, id) {
            const that = this;
            axios
                .post('/laowu_yun/tipsnews', {
                    corp_id: that.cid,
                    xmid: xid,
                    ptid: id
                })
                .then((res) => {
                    if (res.data.status == 0 || res.data.status == 2) {
                        that.$notify.error({
                            title: '错误',
                            message: res.data.msg,
                            duration: 2000
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getOne: async function () {
            const that = this;
            await axios
                .post('/laowu_yun/ssuserprojeclist', {
                    corp_id: that.cid,
                    userid: that.uid,
                    newuid: that.$store.state.userData.uid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        that.tabList = res.data.content;
                        that.xmid = that.tabList[0].xmid;
                        for (let i = 0; i < that.tabList.length; i++) {
                            that.getTwo(that.tabList[i].xmid, i, that);
                        }
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getTwo: async function (val, index, _that) {
            await axios
                .post('/laowu_yun/huquteamcontentlist', {
                    corp_id: _that.cid,
                    xmid: val,
                    newuid: _that.$store.state.userData.uid
                })
                .then((res) => {
                    _that.tabList[index].child = res.data.content;
                    _that.tabList = JSON.parse(JSON.stringify(_that.tabList));
                });
        },
        selectProject(val) {
            this.listval = val;
            this.$emit('childFn5', val);
            this.getTab(val);
        }
    },
    created() {},
    activated() {
        this.projectList.pstatus = '1';
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
#baopan {
    #Sm {
        width: 240px;
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