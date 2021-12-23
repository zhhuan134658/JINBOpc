<template>
    <div id="demo">
        <el-tabs :tab-position="tabPosition" style="height:100%;background:#ffffff" class="tab1">
            <el-tab-pane label="项目列表" style="over-flow:auto;" class="tab-item">
                <router-view></router-view>
            </el-tab-pane>

            <el-tab-pane label="基础信息设置" style="over-flow:auto;">
                <Basic></Basic>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import axios from 'axios';

import Basic from './basic.vue';

export default {
    name: 'demo',
    components: { Basic },
    data() {
        return {
            activeNames: '',
            tabPosition: 'left',
            labelPosition: 'left',
            n1: '',

            //添加外部参建
            form: {
                name: ''
            },

            restaurants: [],
            state4: '',
            timeout: null,
            input9: '',
            input10: '',
            input11: '',
            input12: '',
            value: [1],
            value2: '',
            value3: '',
            formInline: { user: '', region: '' },
            formInline1: { user: '', region: '' }, // 三级联动
            formInline2: { user: '', region: '' },
            creatFormVisible: false, //dialog值

            nodeQuery: {
                name: '' //编辑节点表单的model
            },

            cid: this.$store.state.userData.cid,
            isShowDlg: false, //是否显示编辑节点弹框
            tableData1: [
                {
                    company: '1',
                    abbreviation: '华业木工',
                    construction: '专业分包',
                    monitor: '张一',
                    number: '188s8181',
                    operation: '修改'
                },
                {
                    company: '2',
                    abbreviation: '华业木工',
                    construction: '专业分包',
                    monitor: '张er',
                    number: '18818181',
                    operation: '修改'
                }
            ]
        };
    },

    methods: {
        handleSelect: function(item) {
            this.supplierId = item.ACCOUNTNUM;
            this.supplierName = item.NAME;
        },
        handleChange: function(val) {
            console.log(val);
        },
        /// &event是实参，表示event对象
        get: function(ev) {
            // 如果按得键是上或者下，就不进行ajax
            if (ev.keyCode == 38 || ev.keyCode == 40) {
                return;
            }
            this.showList = true;
            axios
                .post('/aoi/laowu_yun/usersearch', {
                    name: this.keyword,
                      newuid:this.$store.state.userData.uid,
                    corp_id: this.cid
                })
                .then(res => {
                    this.searchData = res.data.content;
                });
        },
        search: function() {
            this.showList = true;
            axios
                .post('/aoi/laowu_yun/usersearch', {
                    name: this.keyword,
                      newuid:this.$store.state.userData.uid,
                    corp_id: this.cid
                })
                .then(res => {
                    this.searchData = res.data.content;
                });
        },
        selectClick: function(index) {
            this.keyword = this.searchData[index].user_name;
            this.keyid = this.searchData[index].userid;
            this.ruleForm2.pname = this.searchData[index].user_name;
            this.ruleForm2.ppersonid = this.searchData[index].userid;
            this.ruleForm2.projectuser = this.searchData[index].user_name;
            this.showList = false;
        },

        getIndex: function(index) {
            this.searchIndex = index;
        },

        creat() {
            // this.creatFormVisible = true;
            this.$router.push({ path: './Np' });
        },
        cancel() {
            this.isFail = false;
            this.failMsg = '';
            this.$refs.creatProject.resetFields(); // 清空表单
            this.creatFormVisible = false;
        },

        handleClick(tab, event) {
            console.log(tab, event);
        },
        //模糊查询

        selectManager(row, event, column) {
            this.ruleForm2.pname = row.user_name;
            this.ruleForm2.ppersonid = row.userid;
            this.ruleForm2.projectuser = row.user_name;
        },
        //创建项目
        save(formName) {
              this.ruleForm2. newuid=this.$store.state.userData.uid,
            this.loaded = true;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    axios
                        .post('/aoi/laowu_yun/createproject', this.ruleForm2)
                        .then(res => {
                            if (res.data.status == 1) {
                                this.loaded = false;
                                this.$refs.creatProject.resetFields(); // 清空表单
                                this.creatFormVisible = false;
                                this.isFail = false;
                                this.failMsg = '';
                            } else {
                                this.isFail = true;
                                this.failMsg = res.data.msg;
                                this.loaded = false;
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    created() {}
};
</script>

<style>
/* 侧边导航栏 */

/* #demo .tab1 .tab-item .el-tabs__nav-scroll {
    position: fixed;
    z-index: 10000;
    border-right: 2px solid #aaaaaa;
} */
#demo {
    width: 100%;
    height: 100%;
    background-color: #f2f6fc;
    margin-top: 66px;
}

#demo .el-tabs__item {
    text-align: center;
    color: #fff;
}
/* 侧边导航栏 */
#demo .el-tabs__item {
    text-align: left;
    color: #fff;
    padding-left: 40px;
}
#demo .el-tabs__nav-scroll {
    background-color: #3296fa;
}
#demo .el-tabs .el-tabs__header {
    width: 10%;
    margin-right: 1%;
}
#demo .el-tabs__item.is-active {
    background-color: #1b84e6;
    color: #ffffff;
    /* margin: 0 10px; */
    border-radius: 5px;
    box-sizing: border-box;
}

#system .el-tabs__item.is-active {
    background-color: #1b84e6;
    color: #ffffff;
    /* margin: 0 10px; */
    border-radius: 5px;
    box-sizing: border-box;
}
.el-tabs__item.is-active {
    background-color: #fff;
    color: #1b84e6;
}
.router-link-active {
    color: #409eff;
    text-decoration: none;
}
.el-tabs {
    height: auto;
    /* overflow-y: auto; */
}
.body {
    width: 80%;
}
/*输入框*/
#demo .tab1 .el-tabs__header {
    width: 200px;
    height: 100%;
    position: fixed;
    background-color: #3296fa;
}
#demo .el-tabs--left {
    height: 100%;
    min-height: 500px;
}
#demo .el-tabs__content {
    padding-right: 20px;
    margin-left: 220px;
    height: 100%;
}
.el-date-editor.el-input {
    width: 100%;
}
.cell {
    text-align: center;
}
/*input*/
.input {
    display: flex;
    margin: 10px;
}
.input-1 {
    width: 100px;
    margin: auto;
}
.el-input__inner {
    height: 30px;
}
.demo-input-suffix {
    display: flex;
}
.demo-input-suffix .el-input__inner {
    width: 50%;
}

.inputdiv1,
.inputdiv2 {
    width: 50%;
}
.inputdiv1,
.inputdiv2 {
    display: flex;
}

/* 时间 */
.block {
    display: flex;
}
.el-input__prefix .el-input__icon {
    margin: auto;
}
.el-input__inner {
    height: 40px;
}
.demonstration {
    margin: auto 0;
    width: 90px;
}
.el-pagination {
    text-align: center;
}

.cnav {
    width: 12%;
    height: 800px;
    border: 1px solid #eeeeee;
    float: left;
    /* position: fixed; */
    /* top: 50px;
    left: 160px; */
}
.tcontent {
    width: 84%;
    position: relative;
    float: left;
    padding-left: 1%;
}
/* 参建单位 */
.canjian {
    border: 1px solid red;
    width: 80%;
}
.canjian .el-select {
    width: 70%;
}
#demo .search {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
}
#demo .search input {
    display: inline-block;
    width: 78%;
    border: 1px #eee solid;
    height: 37px;
    /* border-top: 0; */
}
#demo .search-btn {
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
.fl {
    float: left;
}
.fr {
    float: right;
}

ul,
li,
ol {
    list-style: none;
}
/* 主体*/
#demo .el-button {
    /* margin-left: 0; */
    margin: 2px 0;
}
.subject {
    width: 95%;
    margin: 20px auto;
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
    width: 78%;
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
    width: 20%;
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
#demo #Ad .el-form {
    width: 100%;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
