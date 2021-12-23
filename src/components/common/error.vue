<template>
    <div id="error">
        <div class="errorMain">
            <img src="../../../static/images/outtime.png" alt="" />
            <h2>版本到期提醒</h2>
            <h4>
                您公司于<span style="color: #409eef">{{ start }}</span
                >使用的劳务实名制已到期，请及时购买升级
            </h4>
            <div class="bottomBtn">
                <el-popover placement="top" width="300" trigger="click">
                    <img
                        style="width: 100%"
                        src="../../../static/images/goumai.png"
                        alt
                    />
                    <el-button
                        type="primary"
                        style="margin-right: 30px"
                        round
                        slot="reference"
                        >购买升级</el-button
                    >
                </el-popover>
                <el-popover placement="top" width="300" trigger="click">
                    <img
                        style="width: 100%"
                        src="../../../static/images/erweima.jpg"
                        alt
                    />
                    <div style="text-align: center; margin: 0">
                        <div style="text-align: center">
                            手机钉钉扫描二维码加入“用户服务群”
                        </div> 

                        <div style="text-align: center">
                            联系电话：0371-56775558
                        </div>
                    </div>
                    <el-button type="primary" round slot="reference"
                        >联系客服</el-button
                    >
                </el-popover>
            </div>
            <el-dialog
                title="联系我们"
                :visible.sync="dialoglianxi"
                width="26%"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="errorDialogClass"
            >
                <div class="image">
                    <img
                        style="width: 100%"
                        src="../../../static/images/erweima.jpg"
                        alt
                    />
                </div>
                <div class="imagefont" style="text-align: center">
                    手机钉钉扫描二维码加入“用户服务群”
                </div>

                <div class="lianxifont" style="text-align: center">
                    联系电话：0371-56775558
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
    name: 'error',
    data() {
        return { dialoglianxi: false, start: '' };
    },
    methods: {
        lianxi() {
            this.dialoglianxi = true;
        },
        takeMoney() {
            dd.ready(function () {
                dd.biz.util.openLink({
                    url:
                        'https://h5.dingtalk.com/appcenter/index-pc.html?corpId=ding5addff8d69acfef835c2f4657eb6378f#/detail/DD_GOODS-101001037004', //打开侧边栏的url

                    onSuccess: function (result) {},
                    onFail: function () {},
                });
            });
        },
    },
    mounted() {
        this.start = localStorage.getItem('utime');
    },
};
</script>

<style lang="less">
body {
    #error {
        width: 100%;
        height: 90vh;
        .errorMain {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background-color: #fff;
            text-align: center;
            z-index: 1200;
            img {
                margin-top: 100px;
                width: 240px;
            }
            h2 {
                font-size: 22px;
                margin-bottom: 30px;
            }
            h4 {
                font-size: 16px;
                margin-bottom: 34px;
            }
            .bottomBtn {
                text-align: center;
            }
        }
    }
}
</style>