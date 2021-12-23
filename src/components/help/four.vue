<template>
    <div id="one">
        <div class="title">身份证录入</div>
        <h2>身份证录入流程</h2>
        <p style="color:#000">1)人员查询--->2)选择项目--->3)选择班组--->4)补录身份证-->5)信息详情</p>
        <div v-for="(item , index) in titlelist" :key="index">
            <h3>{{item}}</h3>
            <div class="image">
                <el-image
                    style="width:100%; height: 100%"
                    :src="url[index]"
                    :preview-src-list="srcList[index]"
                ></el-image>
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
            titlelist: [
                '1)人员查询',
                '2)选择项目',
                '3)选择班组',
                '4)补录身份证',
                '5)信息详情'
            ],
            url: [
                'http://laowu.zzdingyun.com/app/static/images/renyuan1.png',
                'http://laowu.zzdingyun.com/app/static/images/renyuan2.png',
                'http://laowu.zzdingyun.com/app/static/images/renyuan3.png',
                'http://laowu.zzdingyun.com/app/static/images/bulu.png',
                'http://laowu.zzdingyun.com/app/static/images/xinxiluru.png'
            ],
            srcList: [
                ['http://laowu.zzdingyun.com/app/static/images/renyuan1.png'],
                ['http://laowu.zzdingyun.com/app/static/images/renyuan2.png'],
                ['http://laowu.zzdingyun.com/app/static/images/renyuan3.png'],
                ['http://laowu.zzdingyun.com/app/static/images/bulu.png'],
                ['http://laowu.zzdingyun.com/app/static/images/xinxiluru.png']
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="less" ></style>
