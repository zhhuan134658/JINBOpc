<template>
    <div id="one">
        <div class="title">劳务合同录入</div>

        <h2>劳务合同流程</h2>
        <p style="color:#000">1)人员信息）--->2)选择项目--->3)选择班组--->4)查看-->5)详情</p>
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
                '1)人员信息',
                '2)选择项目',
                '3)选择班组',
                '4)查看',
                '5)详情'
            ],
            url: [
                'http://laowu.zzdingyun.com/app/static/images/hetong1.png',
                'http://laowu.zzdingyun.com/app/static/images/hetong2.png',
                'http://laowu.zzdingyun.com/app/static/images/hetong3.png',
                'http://laowu.zzdingyun.com/app/static/images/hetong4.png',
                'http://laowu.zzdingyun.com/app/static/images/hetong5.png'
            ],
            srcList: [
                ['http://laowu.zzdingyun.com/app/static/images/hetong1.png'],
                ['http://laowu.zzdingyun.com/app/static/images/hetong2.png'],
                ['http://laowu.zzdingyun.com/app/static/images/hetong3.png'],
                ['http://laowu.zzdingyun.com/app/static/images/hetong4.png'],
                ['http://laowu.zzdingyun.com/app/static/images/hetong5.png']
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="less" >
</style>
