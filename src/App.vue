<template>
    <div id="indexApp">
        <div class="appHeader">
            <div class="appheaderLeft">
                <div class="gssname">
                    <img
                        style="width: 59px"
                        src="../static/images/modianlogo.png"
                        alt
                    />
                    劳务实名制
                </div>

                <div style="margin-left: 220px; font-size: 22px">
                    {{ this.$store.state.userData.cname || cname }}
                </div>
            </div>
            <div class="appheaderRight">
                <div style="color: #ccc">版本号：4.2.0</div>
                <!-- <div @click="takeMoney">
                    <i
                        class="iconfont iconzuanshi"
                        style="
                            margin-right: 5px;
                            font-size: 14px;
                            line-height: 1;
                        "
                    ></i
                    >内购
                </div> -->
                <!-- <div @click="lianxi">
                    <i
                        class="el-icon-phone-outline"
                        style="margin-right: 5px"
                    ></i
                    >联系我们
                </div>
                <div @click="help">
                    <i class="el-icon-question" style="margin-right: 5px"></i
                    >帮助文档
                </div> -->
                <div class="aliyun-status" v-bind:class="{ aliyunStatusSuccess: zhifubao == '已认证', aliyunStatusPadding: zhifubao == '未认证', aliyunStatusError: zhifubao == '认证失败' }">{{ zhifubao }}</div>

                <div class="appd">
                    <el-popover placement="bottom" width="220" trigger="hover">
                        <div>{{ name }}</div>
                        <div>{{ corp_name }}</div>
                        <div slot="reference" class="touxiang">
                            <span>{{
                                name.length <= 2
                                    ? name
                                    : name.substr(name.length - 2, 2)
                            }}</span>
                        </div>
                    </el-popover>
                </div>
            </div>
        </div>
        <keep-alive :include="includePages">
            <router-view></router-view>
        </keep-alive>
        <el-dialog
            title="联系我们"
            :visible.sync="dialoglianxi"
            width="26%"
            :close-on-click-modal="false"
            :append-to-body="true"
        >
            <div class="image">
                <img
                    style="width: 100%"
                    src="../static/images/erweima.jpg"
                    alt
                />
            </div>
            <div class="imagefont">手机钉钉扫描二维码加入“用户服务群”</div>

            <div class="lianxifont">联系电话：0371-56775558</div>
        </el-dialog>

        <el-dialog
            title="提示"
            :visible.sync="warnVisible"
            width="800px"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :append-to-body="true"
        >
            <h1 style="margin-bottom: 30px">抱歉，您当前无法使用</h1>
            <p
                style="
                    margin: 10px 0;
                    line-height: 26px;
                    font-size: 16px;
                    color: #527190;
                "
            >
                贵公司（{{ corp_name }}）的试用期已于{{
                    corp_time
                }}到期，若需继续使用，请升级为正式版，给您带来的不便请谅解！如有疑问，请联系客服：0371-56775558
            </p>
        </el-dialog>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
export default {
    data() {
        return {
            warnVisible: false,
            cname: '',
            name: '',
            corp_time: '',
            corp_name: '',
            dialoglianxi: false,
            includePages: ['lwguanli', 'lwsecurity'],
            activeName: 'first',
            tabPosition: 'left',
            dingdingValue: '',
            zhifubao: '未认证'
        };
    },

    methods: {
        takeMoney() {
            if (this.dingdingValue == 0) {
                this.$message({
                    message: '抱歉，您没有权限操作，请联系钉钉管理员',
                    center: true,
                    duration: 2000,
                    type: 'warning'
                });
            } else {
                axios
                    .post('/ding/getShopyeman', {
                        corp_id: this.cid,
                        shopcode: 'DD_GOODS-510003'
                    })
                    .then((res) => {
                        if (res.data.status == 1) {
                            dd.ready(function () {
                                dd.biz.util.openSlidePanel({
                                    url: res.data.content, //打开侧边栏的url
                                    title: '劳务实名制', //侧边栏顶部标题
                                    onSuccess: function (result) {},
                                    onFail: function () {}
                                });
                            });
                        } else {
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        lianxi() {
            this.dialoglianxi = true;
        },
        help() {
            dd.ready(function () {
                dd.biz.util.openLink({
                    url:
                        'https://www.yuque.com/books/share/1dc6c0f8-3570-4567-917f-4fecb487172f?#', //要打开链接的地址
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {}
                });
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
                                corp_id: cid,
                                code: code
                            })
                            .then((res) => {
                                // if (res.data.quanxian == '2') {
                                //     _this.warnVisible = true;
                                // }

                                _this.dingdingValue = res.data.dingding;
                                _this.name = res.data.content.user_name;
                                _this.corp_name = res.data.content.corp_name;
                                _this.corp_time = res.data.time;
                                _this.urid = res.data.status;
                                _this.cname = res.data.content.corp_name;
                                _this.zhifubao = res.data.zhifubao
                                _this.$store.commit(
                                  'setZhifubao',
                                  res.data.zhifubao
                                )
                                _this.$store.commit(
                                    'setquanxian',
                                    res.data.quanxian
                                );
                                _this.$store.commit(
                                    'setValue',
                                    res.data.content.corp_name
                                );
                                _this.$store.commit('setUrid', res.data.status);

                                _this.$store.commit(
                                    'setShifou',
                                    res.data.content.shifou
                                );

                                _this.$store.commit(
                                    'setUid',
                                    res.data.content.userid
                                );
                                _this.$store.commit(
                                    'setName',
                                    res.data.content.user_name
                                );
                                _this.$store.commit(
                                    'setManageName',
                                    res.data.corpname
                                );
                                localStorage.setItem(
                                    'utime',
                                    res.data.starttime
                                );
                                localStorage.setItem(
                                    'uding',
                                    res.data.dingding
                                );
                                localStorage.setItem(
                                    'ucode',
                                    res.data.quanxian
                                );
                                if (res.data.status < 3) {
                                    _this.$router.push({ path: '/states' });
                                } else {
                                    _this.$router.push({ path: '/lw' });
                                }
                            });
                    },
                    onFail: function (err) {
                        console.log(err);
                    }
                });
            });
        }
    },
    created() {
        const that = this;
        that.framework();
    }
};
</script>

<style lang="less">
body {
    overflow: hidden;
    .el-drawer {
        .el-drawer__header > :first-child:focus {
            outline: none;
        }
    }
    .sideMenuLeftTitle {
        padding: 6px 0 6px 6px;
        color: #4099ef;
        background-color: #e9ecf2;
        font-size: 16px;
    }
    .corpkaoqin {
        .el-dialog {
            width: 80%;
            .el-date-editor {
                width: 220px;
            }
        }
    }
    .bpbanzukaoqinDialog {
        .el-dialog {
            width: 600px;
        }
    }
    .banzubangdingDialog {
        .el-select {
            width: 100%;
        }
        .bpBtn {
            .el-form-item__content {
                margin-left: 0 !important;
                text-align: center;
            }
        }
    }
    .el-dialog {
        .marginb {
            margin-bottom: 15px;
        }
        .el-input-group__prepend {
            width: 160px;
            text-align: center;
        }
        .el-date-editor,
        .el-select {
            width: 100%;
        }
        .el-table th > .cell {
            font-size: 14px;
            color: #909399;
        }
        .el-table .cell .el-popover__reference {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .el-table .cell .el-tag {
            width: 100%;
            background-color: transparent;
            border: 0;
            color: #606266;
            font-size: 14px;
        }
    }
    .shangbaodelete {
        .el-dialog {
            width: 500px;
        }
    }
    .liancjDialog,
    .bpPublcDialog {
        .el-dialog {
            width: 600px;
        }
    }
}
#indexApp {
    font-family: 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', 'Avenir',
        Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;
    height: 100%;
    font-size: 14px;
    overflow-x: hidden;
    .el-image-viewer__close {
        color: red;
    }
    .el-pagination {
        text-align: center;
    }
    .el-textarea__inner {
        resize: none;
        height: 80px;
    }
    .el-dialog__header {
        border-bottom: 1px solid #eee;
    }
    .el-tree-node__expand-icon {
        font-size: 24px;
        padding: 0;
    }
    #Sm {
        .el-submenu__icon-arrow {
            right: 221px;
            font-size: 12px;
        }
        .el-menu-item {
            overflow: hidden;
            span {
                display: inline-block;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .el-submenu__title {
            padding: 0 20px;
            span {
                display: inline-block;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .el-submenu {
            .el-menu-item {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    .canv {
        .el-submenu__icon-arrow {
            right: 221px;
            font-size: 12px;
        }
    }

    .el-checkbox:last-of-type {
        margin-right: 6px;
    }
    .image {
        width: 180px;
        height: 180px;
        margin: auto;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .imagefont {
        margin-top: 20px;
        width: 100%;
        text-align: center;
        color: #999999;
        font-size: 15px;
    }
    .lianxifont {
        margin: auto;
        margin-top: 15px;
        width: 70%;
        text-align: center;
        color: #999999;
        font-size: 15px;
    }
}
.appHeader {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 66px;
    line-height: 66px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 999;
    border-bottom: 1px solid #e4e7ed;
    .el-tabs--card > .el-tabs__header {
        border: 0;
    }
    .appheaderRight {
        display: flex;
        justify-content: flex-start;
        margin-right: 20px;
        // div {
        //     padding: 0 10px;
        //     cursor: pointer;
        //     i {
        //         color: #409eff;
        //     }
        // }
        .appd {
            margin-top: 11px;
            line-height: 40px;
            padding: 0;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-left: 10px;
            span {
                .touxiang {
                    padding: 0;
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    background-color: #4099ef;
                    color: #fff;
                }
            }
        }
    }
}
.appHeader .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: 0;
}
.appHeader .el-tabs {
    overflow: hidden;
}
.el-tabs__item {
    font-size: 14px !important;
}
.gssname {
    background-color: #409eff;
    width: 200px;
    border: 1px solid #409eff;
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    color: #fff;
    text-align: center;
    font-size: 19px;
}
#indexApp .el-table th > .cell {
    font-size: 14px;
    color: #909399;
}
#indexApp .el-table .cell {
    font-size: 14px;
    color: #606266;
    .el-tag {
        width: 100%;
        background-color: transparent;
        border: 0;
        color: #606266;
        font-size: 14px;
    }
    .el-popover__reference {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

/*(1)清除默认样式*/
html,
body,
ul,
li,
ol,
dl,
dd,
dt,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
legend,
img,
input {
    margin: 0;
    padding: 0;
}
fieldset,
img,
input,
button {
    border: 0 none;
    padding: 0;
    margin: 0;
    outline-style: none;
} /*去掉input等聚焦时的蓝色边框*/
ul,
li,
ol {
    list-style: none;
}

/* 行内元素的垂直居中 */
/*
vertical-align：top
*/
select,
input {
    vertical-align: middle;
}
/*select, input, textarea { font-size:12px; margin:0; }*/
textarea {
    resize: none;
} /*防止拖动*/
img {
    border: 0;
    vertical-align: middle;
}
/*  去掉图片低测默认的3像素空白缝隙，或者用display：block也可以*/
/* table { border-collapse:collapse; } */

a {
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: normal;
    font-size: 1em;
} /*设置h标签的大小，设置跟父亲一样大的字体font-size:100%;*/
s,
i,
em {
    font-style: normal;
    text-decoration: none;
}

a {
    text-decoration: none;
    color: black;
}
a:hover {
    text-decoration: none;
}
</style>

<style lang="less" scoped>
.aliyun-status {
  padding: 5px 10px;
  color: #fff;
  border-radius: 15px;
  height: 16px;
  line-height: 16px;
  margin-left: 20px;
  margin-top: 19px;
}
.aliyunStatusSuccess {
  background: #1ED79B;
}
.aliyunStatusError {
  background: #FB602D;
}
.aliyunStatusPadding {
  background: #999;
}

</style>
