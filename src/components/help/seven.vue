<template>
    <div id="one">
        <div class="title">工资核算</div>
        <h2>工资核算流程</h2>
        <p style="color:#000">1)工资核算--->2)选择项目--->3)选择班组--->4)上传工资--->5)下载模板--->6)下载工资表</p>

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
                '1)工资核算',
                '2)选择项目',
                '3)选择班组',
                '4)上传工资',
                '5)下载模板',
                '6)下载工资表'
            ],
            url: [
                'http://laowu.zzdingyun.com/app/static/images/gongzi1.png',
                'http://laowu.zzdingyun.com/app/static/images/gongzi2.png',
                'http://laowu.zzdingyun.com/app/static/images/gongzi3.png',
                'http://laowu.zzdingyun.com/app/static/images/gongzi6.png',
                'http://laowu.zzdingyun.com/app/static/images/gongzi4.png',
                'http://laowu.zzdingyun.com/app/static/images/gongzi5.png'
            ],
            srcList: [
                ['http://laowu.zzdingyun.com/app/static/images/gongzi1.png'],
                ['http://laowu.zzdingyun.com/app/static/images/gongzi2.png'],
                ['http://laowu.zzdingyun.com/app/static/images/gongzi3.png'],
                ['http://laowu.zzdingyun.com/app/static/images/gongzi6.png'],
                ['http://laowu.zzdingyun.com/app/static/images/gongzi4.png'],
                ['http://laowu.zzdingyun.com/app/static/images/gongzi5.png']
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="less" ></style>
