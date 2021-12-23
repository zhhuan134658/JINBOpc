<template>
    <div id="one">
        <div class="title">黑名单</div>
        <h2>黑名单流程</h2>

        <p style="color:#000">1)黑名单--->2)添加黑名单--->3)*号为必填 之后保存</p>

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
            titlelist: ['1)黑名单', '2)添加黑名单', '3)*号为必填 之后保存'],
            url: [
                'http://laowu.zzdingyun.com/app/static/images/mingdan1.png',
                'http://laowu.zzdingyun.com/app/static/images/mingdan2.png',
                'http://laowu.zzdingyun.com/app/static/images/mingdan3.png'
            ],
            srcList: [
                ['http://laowu.zzdingyun.com/app/static/images/mingdan1.png'],
                ['http://laowu.zzdingyun.com/app/static/images/mingdan2.png'],
                ['http://laowu.zzdingyun.com/app/static/images/mingdan3.png']
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="less" ></style>
