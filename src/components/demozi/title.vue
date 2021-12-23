<template>
    <div id="title">
        <el-tag
            v-for="tag in newtagData"
            :key="tag.id"
            closable
            :type="tag.name"
            style="margin:6px;"
            @close="handleClose2(tag)"
        >{{tag.name}}</el-tag>
        <div style="text-align:center;width:80%;margin:0 auto;">
            <div style="margin:10px 0;color:red;">请在下方搜索或者选择标签</div>
            <div class="search">
                <div class="search-input">
                    <!-- <input
                        type="text"
                        v-model="keyword"
                        @keyup="getPeople($event)"
                        @keydown.enter="search()"
                    />-->
                    <!-- 这是一个小叉叉，点击它可清除输入框内容 -->
                    <!-- <span class="search-reset" @click="clearInput()">&times;</span> -->
                    <!-- <button class="search-btn" @click="search()">搜一下</button> -->
                    <div class="search-select" v-if="showList">
                        <!-- transition-group也是vue2.0中的新特性,tag='ul'表示用ul包裹v-for出来的li -->
                        <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>
                            <li
                                v-for="(value,index) in searchData"
                                class="search-select-option search-select-list"
                                @click="selectClick(index)"
                                :key="value.userid"
                            >{{value.user_name}}</li>
                        </transition-group>
                    </div>
                </div>
            </div>

            <vue-scroll :ops="ops" style="width:100%;height:400px" class="scroll">
                <div class="subject">
                    <div class="subList">
                        <div class="titleList" v-for="(list,index) in tabList" :key="index">
                            <el-button
                                type="primary"
                                plain
                                class="titleListTop"
                                :key="list.id"
                                style="margin-bottom:20px"
                                @click="selectTop(list,index)"
                            >{{list.name}}</el-button>
                            <el-row class="titleListBo" v-if="list.children">
                                <el-button
                                    v-for="(sub,sindex) in list.children"
                                    :key="sub.id"
                                    type="primary"
                                    plain
                                    @click="selectTitle(sub,sindex)"
                                >{{sub.name}}</el-button>
                            </el-row>
                        </div>
                    </div>
                </div>
            </vue-scroll>
        </div>
        <div>
            <el-button type="primary" @click="titleSure">确 定</el-button>
            <el-button @click="titleCancel">取 消</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
var that = {};
export default {
    props: {
        tagsTitleDataId: {
            type: Array
        },
        tagsTitleDataName: {
            type: Array
        },
        tagsData: {
            type: Array
        },
        tagsTitleData: {
            type: Array
        },
        childbzid: {
            type: String
        },
        xmid: {
            type: String
        },
        newview: {
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
            tabList: [],
            tabList2: [],
            userid: this.$store.state.userData.uid,
            cid: this.$store.state.userData.cid,
            tabPosition: 'left',

            tagsname: [],
            //模糊查询
            showList: false,
            searchData: [], //用来接收ajax得到的数据
            keyword: '', //v-model绑定的输入框的value
            keyid: '', //选择id
            searchIndex: 0,

            editFormRules: {},
            //树
            defaultProps: {
                id: 'org_id',
                label: 'org_name',
                children: 'content.org',
                isLeaf: 'leaf'
            },
            treeExpandedKeys: [], //记录打开节点的数据

            many: [],
            orgids: [], //多选班组,
            needJson: { name: '', id: '' },
            tagView: false,
            newtagData: [],
            saveData: []
        };
    },

    methods: {
        search() {
            axios
                .post('/laowu_yun/useraddjclist', {
                    name: this.keyword,
                      newuid:this.$store.state.userData.uid,
                    corp_id: this.cid
                })
                .then(res => {
                    this.tabList = res.data.content.list;
                });
        },
        getPeople: function(ev) {
            // 如果按得键是上或者下，就不进行ajax
            if (ev.keyCode == 38 || ev.keyCode == 40) {
                return;
            }
            this.showList = true;
            axios
                .post('/laowu_yun/useraddjclist', {
                    name: this.keyword, 
                     newuid:this.$store.state.userData.uid,
                    corp_id: this.cid
                    
                })
                .then(res => {
                    this.tabList = res.data.content.list;
                });
        },

        //去重
        dedupe(array) {
            return Array.from(new Set(array));
        },

        //获取父
        getOne: async function() {
            const that = this;
            await axios
                .post('/laowu_yun/useraddjclist', {
                    name: that.keyword,
                    corp_id: that.cid,
                      newuid:that.$store.state.userData.uid,
                })
                .then(res => {
                    that.tabList = res.data.content.list;
                    for (let i = 0; i < that.tabList.length; i++) {
                        that.getTwo(that.tabList[i].id, i, that);
                    }
                });
        },
        getTwo: async function(val, index, _that) {
            await axios
                .post('/laowu_yun/useraddjcgengduolist', {
                    jcid: val,
                    corp_id: _that.cid,
                      newuid:_that.$store.state.userData.uid,
                })
                .then(res => {
                    _that.tabList[index].children = res.data.content;
                    _that.tabList = JSON.parse(JSON.stringify(_that.tabList));
                });
        },
        selectTop(list, index) {
            this.addP(list, index);
        },
        selectTitle(list, index) {
            this.addP(list, index);
        },
        //去重
        unique(arr) {
            const res = new Map();
            return arr.filter(arr => !res.has(arr.id) && res.set(arr.id, 1));
        },
        addP(list, index) {
            const that = this;
            that.newtagData.push({ name: list.name, id: list.id });

            that.newtagData = that.unique(that.newtagData);
        },
        handleClose2(tag) {
            this.newtagData.splice(this.newtagData.indexOf(tag), 1);
        },
        titleCancel() {
            this.newview = ['1'];
            if (this.xmid) {
                axios
                    .post('/laowu_yun/projectcontent', {
                        corp_id: this.cid,
                          newuid:this.$store.state.userData.uid,
                        xmid: this.$route.query.xmid
                    })
                    .then(res => {
                        if (res.data.status == 1) {
                            this.tagsTitleData = res.data.content.ptype;

                            this.newtagData = res.data.content.ptype;
                            this.$emit('getTitle', this.newtagData);
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }

            this.$emit('getTit2', this.newview);
        },
        titleSure() {
            this.newview = ['1'];
            this.$emit('getTitle', this.newtagData);
            this.$emit('getTit2', this.newview);
        }
    },
    created() {
        this.getOne();
    },
    mounted() {
        this.newtagData = this.tagsTitleData;
    }
};
</script>
<style>
#Iu #pane-1 {
    margin-left: 0;
}
#Iu .el-tabs--left .el-tabs__nav-wrap.is-left {
    background-color: #f4f9fe;
}
#title .selectback {
    background-color: #eee !important;
    cursor: pointer;
}
#title .search {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
}
#title .search input {
    display: inline-block;
    width: 100%;
    border: 1px #eee solid;
    height: 37px;
}
#title .search-btn {
    width: 20%;
    border: 1px #66b1ff solid;
    background-color: #66b1ff;
    color: #fff;
    height: 37px;
    float: left;
}
.tab1 .tab-item .selectName .el-tabs__nav-scroll {
    position: relative;
}
.selectName {
    width: 100%;
    position: relative;
}
.selectName .el-tabs__header {
    width: 20%;
    float: left;
}
.selectName .el-tabs__content {
    float: right;
    width: 76%;
}
.subject .bg-purple {
    border: 1px solid #ebeef5;
}
.subject .bg-purple-light {
    border: 1px solid #ebeef5;
    padding: 0;
}
.subject .grid-content {
    border-radius: 4px;
    min-height: 36px;
}
/*查询*/
.search-input {
    height: 45px;
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
    position: relative;
}

.search-input input {
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    width: 500px;
    height: 45px;
    font-size: 18px;
    float: left;
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
}

.search-btn {
    height: 45px;
    width: 100px;
    border: 1px solid mediumseagreen;
    background-color: mediumseagreen;
    color: white;
    font-size: 16px;
    font-weight: bold;
    float: left;
}

.search-btn {
    cursor: pointer;
}

.search-select {
    position: absolute;
    top: 45px;
    width: 100%;
    box-sizing: border-box;
    z-index: 999;
    background-color: #fff;
}
.search-select ul {
    border-left: 1px solid #666;
    border-right: 1px solid #666;
    width: 100%;
    background-color: #fff;
}
.search-select li {
    border: 1px solid #d4d4d4;
    background-color: #fff;
    width: 70px;
    float: left;
    margin: 4px;
    text-align: center;
}

.search-select-option {
    box-sizing: border-box;
    padding: 7px 10px;
}

.selectback {
    background-color: #eee !important;
    cursor: pointer;
}

input::-ms-clear {
    display: none;
}

.search-reset {
    width: 21px;
    height: 21px;
    position: absolute;
    display: block;
    line-height: 21px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    right: 110px;
    top: 12px;
}

.search-select-list {
    transition: all 0.5s;
}

.itemfade-enter,
.itemfade-leave-active {
    opacity: 0;
}

.itemfade-leave-active {
    position: absolute;
}

.selectback {
    background-color: #eee !important;
    cursor: pointer;
}
.search-select ul {
    margin: 0;
    text-align: left;
}
#title .titleList {
    margin-bottom: 30px;
}
#title .titleListBo {
    padding: 16px;
    border: 1px solid #eee;
}
#title .subject {
    text-align: left;
}
#title .titleListBo button {
    margin: 10px;
}
</style>

<style scoped>
#Iu #pane-1 {
    margin-left: 0;
}
#Iu .tab1 .el-tabs__header {
    background-color: #f4f9fe;
}
</style>