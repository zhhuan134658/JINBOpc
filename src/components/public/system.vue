<template>
    <div id="system">
        <router-view></router-view>
    </div>
</template>
<script>
import Add from './addpower.vue';
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import qs from 'qs';

export default {
    components: { Add },
    data() {
        return {
            tablePeople: [],

            //q权限人员
            rolename: [],
            urid: this.$store.state.userData.urid, //权限id

            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,

            tabPosition: 'left',
            agentid: '', //微应用id
            timeStamp: '', //时间戳
            noncestr: '', //签名随机串
            signature: '', //签名
        };
    },

    methods: {
        // 权限
        handleChange() {},

        handleClick() {},
        handleNodeClick() {
            this.tableDataq = this.newarr;
        },
        /*biaoge*/

        checkding() {
            const that = this;
            axios
                .post('/ding/shoujitiongxun', {
                    newuid: that.$store.state.userData.uid,
                    corp_id: that.$store.state.userData.cid,
                    pc: '1',
                })
                .then((res) => {
                    if (res.data.status == '1') {
                        that.agentid = res.data.content.agentId;
                        that.timeStamp = res.data.content.timeStamp;
                        that.noncestr = res.data.content.nonceStr;
                        that.signature = res.data.content.signature;
                        dd.config({
                            agentId: that.agentid, // 必填，微应用ID
                            corpId: that.$store.state.userData.cid, //必填，企业ID
                            timeStamp: that.timeStamp, // 必填，生成签名的时间戳
                            nonceStr: that.noncestr, // 必填，生成签名的随机串
                            signature: that.signature, // 必填，签名
                            type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                            jsApiList: [
                                'biz.contact.complexPicker',
                                'biz.contact.choose',
                                'runtime.info',
                                'device.notification.confirm',
                                'device.notification.alert',
                                'device.notification.prompt',
                                'biz.ding.post',
                                'biz.util.openLink',
                            ], // 必填，需要使用的jsapi列表，注意：不要带dd。
                        });
                        dd.error(function (err) {
                            //验证失败
                            console.log('dd error: ' + JSON.stringify(err));
                        });
                    }
                });
        },
        addSingP() {
            const that = this;

            dd.ready(function () {
                dd.biz.contact.complexPicker({
                    title: '通讯录', //标题
                    corpId: that.$store.state.userData.cid, //企业的corpId
                    multiple: false, //是否多选
                    limitTips: '超出了', //超过限定人数返回提示
                    maxUsers: 1, //最大可选人数
                    pickedUsers: [], //已选用户
                    pickedDepartments: [], //已选部门
                    disabledUsers: [], //不可选用户
                    disabledDepartments: [], //不可选部门
                    requiredUsers: [], //必选用户（不可取消选中状态）
                    requiredDepartments: [], //必选部门（不可取消选中状态）
                    appId: that.agentid, //微应用的Id
                    permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
                    responseUserOnly: true, //返回人，或者返回人和部门
                    startWithDepartmentId: 0, //仅支持0和-1
                    onSuccess: function (result) {
                        that.ruleForm.pname = result.users[0].name;
                        that.ruleForm.ppersonid = result.users[0].emplId;
                    },
                    onFail: function (err) {
                        console.log(err);
                    },
                });
            });
            dd.error(function (err) {
                console.log(err);
            });
        },
        framework() {
            var url = decodeURIComponent(location.search); //获取url中"?"符后的字串
            var cid = url.split('?corpid=')[1];
            this.cid = cid;

            var _this = this;

            _this.$store.commit('setCid', cid);

            dd.ready(function () {
                dd.runtime.permission.requestAuthCode({
                    corpId: cid, // 企业id
                    onSuccess: function (info) {
                        var code = info.code; // 通过该免登授权码可以获取用户身份             console.log(code)

                        axios
                            .post('/dingyun/getuserrole', {
                                newuid: _this.$store.state.userData.uid,
                                corp_id: cid,
                                code: code,
                            })
                            .then((res) => {
                                _this.name = res.data.content.user_name;
                                _this.manager = res.data.bieming;
                                _this.corp_name = res.data.content.corp_name;
                                _this.urid = res.data.status;

                                var corp_name = res.data.content.corp_name;
                                var urid = res.data.status;

                                _this.$store.commit('setValue', corp_name);
                                _this.$store.commit('setUrid', urid);

                                _this.$store.commit(
                                    'setValue',
                                    res.data.content.corp_name
                                );
                                _this.$store.commit('setUrid', res.data.status);

                                _this.$store.commit(
                                    'setUid',
                                    res.data.content.userid
                                );
                                _this.$store.commit(
                                    'setName',
                                    res.data.content.user_name
                                );

                                _this.$store.commit(
                                    'setUid',
                                    res.data.content.userid
                                );
                                _this.$store.commit(
                                    'setManageName',
                                    res.data.corpname
                                );
                            });
                    },
                    onFail: function (err) {
                        console.log(err);
                    },
                });
            });
        },
    },
    mounted() {},
    created() {
        this.framework();
        this.checkding();
        // this.userrolelist();
    },
};
</script>
<style lang="less" lang="less">
.el-collapse-item__header {
    font-size: 20px !important;
}
.level {
    font-size: 17px !important;
}

a {
    text-decoration: none;
}
.router-link-active {
    color: #409eff;
    text-decoration: none;
}

p {
    margin: 0;
}
ul {
    list-style: none;
}

#system {
    background-color: #fff;
    width: 100%;
    height: 100%;
    margin-top: 17px;
    overflow-y: auto;
}
/* 侧边导航栏 */
#system .el-tabs__item {
    text-align: left;
    color: #fff;
    padding-left: 40px;
}
#system .el-tabs__nav-scroll {
    background-color: #409eff;
}
#system .el-tabs .el-tabs__header {
    width: 200px;
    position: fixed;
}

/* #system .el-tabs__item:hover {
   
   background-color: #ffffff;
    color: #409EFF;
    cursor: pointer;
    margin:0 10px;
    border-radius: 5px;
    box-sizing: border-box
} */
#system .el-tabs__item.is-active {
    color: #ffffff;
    border-radius: 5px;
    box-sizing: border-box;
}

.el-tree-node__label {
    font-size: 16px !important;
}
#system .cell {
    color: rgba(49, 165, 247, 0.7);
    font-size: 16px;
    text-align: center;
}

#system .s-font {
    font-family: 'Hiragino Sans GB';
    margin-top: 50px;
}
#system .s-font1 {
    font-family: 'Hiragino Sans GB';
    font-size: 12px;
    color: #909399;
    margin-left: 100px;
}

/*栅格布局*/
#system .grid-content .el-row {
    margin-bottom: 20px;
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #99a9bf;
}

#system .bg-purple-light {
    background: #ffffff;
    padding-left: 10%;
    padding-bottom: 10px;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

/*下拉菜单*/
.el-dropdown {
    vertical-align: top;
}
/*下拉尺寸*/
.el-button-group {
    width: 200px;
    height: 70px;
    margin-left: 60px;
    margin-top: 20px;
}
#system .el-button {
    width: 150px;
}
.el-dropdown__caret-button {
    width: 50px;
    height: 70px;
}
.el-dropdown + .el-dropdown {
    margin-left: 15px;
}
.el-icon-arrow-down {
    font-size: 12px;
}
/*框架组织*/

.frame .tips {
    width: 100%;
    margin: auto;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    .rightBtn {
        display: flex;
        justify-content: flex-start;
    }
}
#system .frame .tips .el-button {
    height: 32px;
    line-height: 32px;
    padding: 0;
}
/* 主体*/
.subject {
    width: 95%;
    margin: 20px auto;
}

.subject .bg-purple-light {
    padding: 0;
}
.subject .grid-content {
    border-radius: 4px;
    min-height: 36px;
}

/* 订单中心 */
/*表头*/
#system .el-table {
    margin: auto;
}
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}

/* 权限 */
.back_c {
    width: 90%;
    margin: auto;
}
.qxtishi {
    background-color: #eaf7ff;
    width: 90%;
    padding: 10px;
    margin: 20px auto;
}
.qxtishi p {
    margin-left: 30px;
}

.row-m {
    padding: 0;
}

a:focus {
    color: #409eff;
}
a {
    color: black;
}

.level {
    margin-top: 20px;
    margin-left: 20px;
    font-size: 15px;
}

#system .back_c .grid-content {
    height: 500px;
    overflow-y: auto;
}
#system .el-tabs__content {
    margin-left: 200px;
    background-color: #fff;
}
#system .el-table th > .cell {
    color: #000;
}
#system .el-table thead tr th {
    background-color: #fafafa;
}
</style>



