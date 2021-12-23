<template>
    <div id="one">
        <div class="title">劳务实名制简介</div>
        <div class="jianjie">欢迎使用劳务实名制</div>
        <div
            class="jj"
        >劳务实名制是一款基于钉钉的在线数据管理工具，与阿里钉钉深度整合，帮助企业管理并挖掘数据的价值。目前用户可以在钉钉工作台pc版、钉钉工作台移动端这两个入口打开。</div>
        <div class="image">
            <!-- <img src="http://laowu.zzdingyun.com/app/static/images/page1.png" alt /> -->

            <el-image
                style="width:100%"
                src="http://laowu.zzdingyun.com/app/static/images/page1.png"
                :preview-src-list="srcList1"
            ></el-image>
        </div>
        <div class="jianjie">方案背景</div>
        <div
            class="jj"
        >传统管理方式下，建筑工人实名信息采集慢、统计繁、管理乱、考勤监管难等顽疾难以根除，进一步导致工程进度、材料消耗、用工成本和安全隐患等因素的不可控。同时，过往数据存在大量冗余，难以得到有效沉淀并为科学管理提供正向反馈。</div>
        <div class="jianjie">方案介绍</div>
        <div
            class="jj"
        >建筑企业实名制管理解决方案由企业管理端（pc管理端、移动管理端）、实名考勤设备、工人端组成，结合以物联网、人脸识别为核心技术的智能考勤硬件，与云技术深度融合，实现对工人信息的实时采集、数据统计、智能管理和数据共享。pc、移动管理端双端协作，随时随地切换工作场景，实现远程、移动办公，让管理更轻松，更高效！。</div>
        <div class="js">
            <div class="js_item">
                <div class="js_item1">
                    <h2>PC管理端</h2>
                    <p style="color:#000">PC管理端可以处理更复杂的管理内容，功能全面，充分满足管理需求</p>
                    <p style="color:#000">主要功能有：智能排班、考勤记录、智能报表、花名册、黑名单、安全教育、发布公告，环境监测、设备管理、薪资管理、权限管理</p>
                    <div class="js_item1">
                        <!-- <img style="width:100%;" src="http://laowu.zzdingyun.com/app/static/images/help12-1.png" alt=""> -->
                        <el-image
                            style="width:100%"
                            src="http://laowu.zzdingyun.com/app/static/images/help12-1.png"
                            :preview-src-list="srcList2"
                        ></el-image>
                    </div>
                </div>
            </div>

            <div class="js_item">
                <div class="js_item1">
                    <h2>移动端管理端</h2>
                    <p style="color:#000">针对项目管理者进行项目管理的便携性和实时性，下载移动管理端APP，一部手机在手，轻松实现远程办公</p>
                    <div class="js_item1" style="text-align:center">
                        <!-- <img style="width:40%; " src="http://laowu.zzdingyun.com/app/static/images/help12-2.png" alt=""> -->
                        <el-image
                            style="width:50%"
                            src="http://laowu.zzdingyun.com/app/static/images/help12-2.png"
                            :preview-src-list="srcList3"
                        ></el-image>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
export default {
    name: 'one',
    data() {
        return {
            srcList1: [
                'http://laowu.zzdingyun.com/app/static/images/page1.png'
            ],
            srcList2: [
                'http://laowu.zzdingyun.com/app/static/images/help12-1.png'
            ],
            srcList3: [
                'http://laowu.zzdingyun.com/app/static/images/help12-2.png'
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="less" >
#one {
    .jianjie {
        font-size: 20px;

        color: #000;
        margin: 28px 0;
        padding: 10px 0;
    }
    .fg {
        border: 1px solid #aaaaaa;
        width: 80%;
        margin: 15px auto;
    }
    .js {
        .js_item {
            > div {
                width: 100%;
            }
        }
    }
}
</style>
